"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Loader2, Upload, FileText } from "lucide-react"
import Link from "next/link"

const RESOURCE_CATEGORIES = ["All", "Legal", "Education", "Training", "Culture", "Planning"]

interface EditResourcePageProps {
  params: {
    id: string
  }
}

export default function EditResourcePage({ params }: EditResourcePageProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [currentPdfUrl, setCurrentPdfUrl] = useState("")
  const [isPublished, setIsPublished] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingData, setIsLoadingData] = useState(true)

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchResource = async () => {
      const supabase = createClient()

      try {
        const { data: resource, error } = await supabase.from("resources").select("*").eq("id", params.id).single()

        if (error) throw error

        if (resource) {
          setTitle(resource.title || "")
          setDescription(resource.description || "")
          setCategory(resource.category || "")
          setCurrentPdfUrl(resource.pdf_file || "")
          setIsPublished(resource.is_published || false)
        }
      } catch (error) {
        console.error("Error fetching resource:", error)
        toast({
          title: "Error",
          description: "Failed to load resource. Please try again.",
          variant: "destructive",
        })
        router.push("/dashboard/admin/resources")
      } finally {
        setIsLoadingData(false)
      }
    }

    fetchResource()
  }, [params.id, router, toast])

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
      let pdfUrl = currentPdfUrl

      if (pdfFile) {
        const formData = new FormData()
        formData.append("file", pdfFile)
        formData.append("type", "resources")

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

      const { error } = await supabase
        .from("resources")
        .update({
          title,
          description: description || null,
          category: category || null,
          pdf_file: pdfUrl,
          is_published: isPublished,
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)

      if (error) throw error

      toast({
        title: "Resource updated",
        description: "The resource has been updated successfully.",
      })

      router.push("/dashboard/admin/resources")
    } catch (error) {
      console.error("Error updating resource:", error)
      toast({
        title: "Error",
        description: "Failed to update resource. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading resource...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/admin/resources">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Resources
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Resource</h1>
          <p className="mt-2 text-gray-600">Update the resource information.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resource Details</CardTitle>
          <CardDescription>Update the information for this resource.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter resource title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the resource"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {RESOURCE_CATEGORIES.filter((cat) => cat !== "All").map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdfFile">PDF File</Label>
              {currentPdfUrl && (
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-md">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Current file uploaded</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(currentPdfUrl, "_blank")}
                  >
                    View Current PDF
                  </Button>
                </div>
              )}
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
              {pdfFile && <p className="text-sm text-gray-600">New file selected: {pdfFile.name}</p>}
              <p className="text-sm text-gray-500">Upload a new PDF file to replace the current one (optional)</p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="published" checked={isPublished} onCheckedChange={setIsPublished} />
              <Label htmlFor="published">Published</Label>
            </div>

            <div className="flex items-center space-x-4">
              <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
                {isLoading ? "Updating..." : "Update Resource"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/admin/resources">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
