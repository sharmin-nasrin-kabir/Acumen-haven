"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Plus, X, Upload } from "lucide-react"
import Link from "next/link"

export default function NewResearchPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [paperLink, setPaperLink] = useState("")
  const [publicationDate, setPublicationDate] = useState("")
  const [authors, setAuthors] = useState<string[]>([])
  const [newAuthor, setNewAuthor] = useState("")
  const [isPublished, setIsPublished] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()

  const addAuthor = () => {
    if (newAuthor.trim() && !authors.includes(newAuthor.trim())) {
      setAuthors([...authors, newAuthor.trim()])
      setNewAuthor("")
    }
  }

  const removeAuthor = (authorToRemove: string) => {
    setAuthors(authors.filter((author) => author !== authorToRemove))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a PDF file.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()

    try {
      let pdfUrl = null
      if (pdfFile) {
        const formData = new FormData()
        formData.append("file", pdfFile)
        formData.append("type", "research")

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file")
        }

        const uploadResult = await uploadResponse.json()
        pdfUrl = uploadResult.url
      }

      const { error } = await supabase.from("research").insert({
        title,
        description: description || null,
        category: category || null,
        pdf_file: pdfUrl,
        paper_link: paperLink || null,
        publication_date: publicationDate || null,
        authors: authors.length > 0 ? authors : null,
        is_published: isPublished,
      })

      if (error) throw error

      toast({
        title: "Research created",
        description: "The research has been created successfully.",
      })

      router.push("/dashboard/admin/research")
    } catch (error) {
      console.error("Error creating research:", error)
      toast({
        title: "Error",
        description: "Failed to create research. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/admin/research">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Research
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Research</h1>
          <p className="mt-2 text-gray-600">Add a new research publication or study.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Research Details</CardTitle>
          <CardDescription>Fill in the information for your new research.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter research title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the research"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Climate Change, Education, Social Impact"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="publicationDate">Publication Date</Label>
              <Input
                id="publicationDate"
                type="date"
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Authors</Label>
              <div className="flex space-x-2">
                <Input
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="Enter author name"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAuthor())}
                />
                <Button type="button" onClick={addAuthor} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {authors.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {authors.map((author) => (
                    <div
                      key={author}
                      className="flex items-center space-x-1 bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md text-sm"
                    >
                      <span>{author}</span>
                      <button type="button" onClick={() => removeAuthor(author)} className="text-emerald-600">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdfFile">PDF File</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="pdfFile"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
                <Upload className="h-4 w-4 text-gray-400" />
              </div>
              {pdfFile && <p className="text-sm text-gray-600">Selected: {pdfFile.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="paperLink">Published Paper Link</Label>
              <Input
                id="paperLink"
                value={paperLink}
                onChange={(e) => setPaperLink(e.target.value)}
                placeholder="https://journal.example.com/paper"
                type="url"
              />
              <p className="text-sm text-gray-500">Link to the published paper or journal article</p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="published" checked={isPublished} onCheckedChange={setIsPublished} />
              <Label htmlFor="published">Publish immediately</Label>
            </div>

            <div className="flex items-center space-x-4">
              <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
                {isLoading ? "Creating..." : "Create Research"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/admin/research">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
