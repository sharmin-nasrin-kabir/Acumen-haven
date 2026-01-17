"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  Save,
  Eye,
  X,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  ImageIcon,
  Quote,
  Code,
} from "lucide-react"
import NextLink from "next/link"
import type { Profile } from "@/types/auth"

interface Blog {
  id?: string
  title: string
  excerpt: string
  content: string
  featured_image?: string
  author_id?: string
  status: "draft" | "pending" | "approved"
  published_at?: string
}

interface BlogFormProps {
  blog?: Blog
}

export function BlogForm({ blog }: BlogFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)

  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [contentImages, setContentImages] = useState<File[]>([])

  const [formData, setFormData] = useState<Blog>({
    title: blog?.title || "",
    excerpt: blog?.excerpt || "",
    content: blog?.content || "",
    featured_image: blog?.featured_image || "",
    status: blog?.status || "draft",
  })

  // Rich text editor state
  const [selectedText, setSelectedText] = useState("")
  const [contentRef, setContentRef] = useState<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single()
        setProfile(profileData)
      }
    }

    loadProfile()
  }, [])

  const uploadImage = async (file: File): Promise<string> => {
    const formDataUpload = new FormData()
    formDataUpload.append("file", file)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formDataUpload,
    })

    if (!response.ok) {
      throw new Error("Failed to upload image")
    }

    const data = await response.json()
    return data.url
  }

  const handleSubmit = async (publishNow = false) => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create a blog post.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      setUploadingImage(true)

      let featuredImageUrl = formData.featured_image || ""

      // Upload new featured image if selected
      if (featuredImage) {
        featuredImageUrl = await uploadImage(featuredImage)
      }

      // Upload content images and replace placeholders in content
      let updatedContent = formData.content
      if (contentImages.length > 0) {
        for (let i = 0; i < contentImages.length; i++) {
          const imageUrl = await uploadImage(contentImages[i])
          // Replace placeholder with actual URL
          updatedContent = updatedContent.replace(`[IMAGE_${i}]`, `![Image](${imageUrl})`)
        }
      }

      setUploadingImage(false)

      // Determine final status
      let finalStatus = formData.status
      if (publishNow) {
        finalStatus = profile?.auto_approve_blogs ? "approved" : "pending"
      }
      if (finalStatus === "pending" && profile?.auto_approve_blogs) {
        finalStatus = "approved"
      }

      const blogData: any = {
        title: formData.title,
        excerpt: formData.excerpt || null,
        content: updatedContent,
        featured_image: featuredImageUrl || null,
        author_id: user.id,
        status: finalStatus,
        updated_at: new Date().toISOString(),
      }

      // If auto-approved, set published_at
      if (finalStatus === "approved") {
        blogData.published_at = new Date().toISOString()
      }

      let result
      if (blog?.id) {
        // Update existing blog
        result = await supabase.from("blogs").update(blogData).eq("id", blog.id)
      } else {
        // Create new blog
        result = await supabase.from("blogs").insert([
          {
            ...blogData,
            created_at: new Date().toISOString(),
          },
        ])
      }

      if (result.error) throw result.error

      toast({
        title: blog?.id ? "Blog updated" : "Blog created",
        description:
          finalStatus === "approved"
            ? "Your blog post has been published."
            : finalStatus === "pending"
              ? "Your blog post has been submitted for review."
              : "Your blog post has been saved as a draft.",
      })

      router.push("/dashboard/blogs")
      router.refresh()
    } catch (error) {
      console.error("Error saving blog:", error)
      toast({
        title: "Error",
        description: `Failed to ${blog?.id ? "update" : "create"} blog post. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setUploadingImage(false)
    }
  }

  const handleInputChange = (field: keyof Blog, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFeaturedImage(file)
    }
  }

  const handleContentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setContentImages((prev) => [...prev, ...files])

    // Add placeholders to content for each new image
    let updatedContent = formData.content
    files.forEach((_, index) => {
      const placeholder = `[IMAGE_${contentImages.length + index}]`
      updatedContent += `\n\n${placeholder}\n\n`
    })
    handleInputChange("content", updatedContent)
  }

  const removeContentImage = (index: number) => {
    const imageToRemove = contentImages[index]
    setContentImages((prev) => prev.filter((_, i) => i !== index))

    // Remove placeholder from content
    const placeholder = `[IMAGE_${index}]`
    const updatedContent = formData.content.replace(new RegExp(`\\n*\\[IMAGE_${index}\\]\\n*`, "g"), "")
    handleInputChange("content", updatedContent)
  }

  // Rich text formatting functions
  const formatText = (format: string) => {
    if (!contentRef) return

    const start = contentRef.selectionStart
    const end = contentRef.selectionEnd
    const selectedText = contentRef.value.substring(start, end)

    let formattedText = ""
    let newCursorPos = start

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        newCursorPos = start + 2
        break
      case "italic":
        formattedText = `*${selectedText}*`
        newCursorPos = start + 1
        break
      case "underline":
        formattedText = `<u>${selectedText}</u>`
        newCursorPos = start + 3
        break
      case "list":
        formattedText = `\n- ${selectedText}`
        newCursorPos = start + 3
        break
      case "orderedList":
        formattedText = `\n1. ${selectedText}`
        newCursorPos = start + 4
        break
      case "link":
        formattedText = `[${selectedText}](url)`
        newCursorPos = start + selectedText.length + 3
        break
      case "quote":
        formattedText = `> ${selectedText}`
        newCursorPos = start + 2
        break
      case "code":
        formattedText = `\`${selectedText}\``
        newCursorPos = start + 1
        break
      default:
        return
    }

    const newContent = contentRef.value.substring(0, start) + formattedText + contentRef.value.substring(end)

    handleInputChange("content", newContent)

    // Set cursor position after formatting
    setTimeout(() => {
      if (contentRef) {
        contentRef.focus()
        contentRef.setSelectionRange(newCursorPos, newCursorPos)
      }
    }, 0)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <NextLink href="/dashboard/blogs">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Blogs
          </Button>
        </NextLink>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{blog?.id ? "Edit Blog Post" : "Write New Blog Post"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter your blog post title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "draft" | "pending" | "approved") => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">
                    {profile?.auto_approve_blogs ? "Publish Now" : "Submit for Review"}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => handleInputChange("excerpt", e.target.value)}
              placeholder="Brief summary of your blog post"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="featured_image">Featured Image</Label>
            {formData.featured_image && !featuredImage && (
              <div className="mb-2">
                <img
                  src={formData.featured_image || "/placeholder.svg"}
                  alt="Current featured image"
                  className="w-32 h-20 object-cover rounded border"
                />
                <p className="text-sm text-muted-foreground mt-1">Current featured image</p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Input
                id="featured_image"
                type="file"
                accept="image/*"
                onChange={handleFeaturedImageChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {featuredImage && (
                <Button type="button" variant="outline" size="sm" onClick={() => setFeaturedImage(null)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {featuredImage && <p className="text-sm text-muted-foreground">Selected: {featuredImage.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>

            {/* Rich Text Toolbar */}
            <div className="flex flex-wrap gap-1 p-2 border rounded-t-md bg-muted/50">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => formatText("bold")}
                className="h-8 w-8 p-0"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => formatText("italic")}
                className="h-8 w-8 p-0"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => formatText("underline")}
                className="h-8 w-8 p-0"
              >
                <Underline className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-border mx-1" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => formatText("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => formatText("orderedList")}
                className="h-8 w-8 p-0"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-border mx-1" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => formatText("link")}
                className="h-8 w-8 p-0"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => formatText("quote")}
                className="h-8 w-8 p-0"
              >
                <Quote className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => formatText("code")}
                className="h-8 w-8 p-0"
              >
                <Code className="h-4 w-4" />
              </Button>
            </div>

            <Textarea
              id="content"
              ref={setContentRef}
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="Write your blog post content here... Use the toolbar above for formatting!"
              rows={20}
              required
              className="rounded-t-none font-mono text-sm"
            />

            <div className="text-xs text-muted-foreground">
              <p className="mb-1">Formatting tips:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>**bold text** for bold formatting</li>
                <li>*italic text* for italic formatting</li>
                <li>- item for bullet lists</li>
                <li>1. item for numbered lists</li>
                <li>[link text](url) for links</li>
                <li>&gt; text for quotes</li>
                <li>`code` for inline code</li>
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content_images">Content Images (Optional)</Label>
            <Input
              id="content_images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleContentImageChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/90"
            />

            {contentImages.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-sm text-muted-foreground">Images to add to content:</p>
                {contentImages.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted px-2 py-1 rounded">
                    <span className="text-sm">{file.name}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeContentImage(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground">
                  Images will be inserted as placeholders in your content. They'll be uploaded when you save.
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <Button
              onClick={() => handleSubmit(false)}
              disabled={isLoading || uploadingImage || !formData.title || !formData.content}
              className="bg-slate-600 hover:bg-slate-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : uploadingImage ? "Uploading..." : "Save as Draft"}
            </Button>

            <Button
              onClick={() => handleSubmit(true)}
              disabled={isLoading || uploadingImage || !formData.title || !formData.content}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              {isLoading
                ? "Publishing..."
                : uploadingImage
                  ? "Uploading..."
                  : profile?.auto_approve_blogs
                    ? "Publish Now"
                    : "Submit for Review"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
