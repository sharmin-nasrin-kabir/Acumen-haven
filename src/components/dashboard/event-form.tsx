"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Eye, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Event {
  id?: string
  title: string
  description: string
  date: string
  time: string
  location: string
  chapter?: string
  category?: string
  banner_image?: string
  gallery_images?: string[]
  registration_link?: string
  is_published: boolean
  is_featured: boolean
  contact_email?: string
  social_facebook?: string
  social_twitter?: string
  social_instagram?: string
  social_linkedin?: string
}

interface EventFormProps {
  event?: Event
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)

  const [bannerImage, setBannerImage] = useState<File | null>(null)
  const [galleryImages, setGalleryImages] = useState<File[]>([])

  const [formData, setFormData] = useState<Event>({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date || "",
    time: event?.time || "",
    location: event?.location || "",
    chapter: event?.chapter || "",
    category: event?.category || "",
    banner_image: event?.banner_image || "",
    gallery_images: event?.gallery_images || [],
    registration_link: event?.registration_link || "",
    is_published: event?.is_published || false,
    is_featured: event?.is_featured || false,
    contact_email: (event as any)?.contact_email || "",
    social_facebook: (event as any)?.social_facebook || "",
    social_twitter: (event as any)?.social_twitter || "",
    social_instagram: (event as any)?.social_instagram || "",
    social_linkedin: (event as any)?.social_linkedin || "",
  })

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
      setUploadingImages(true)

      let bannerUrl = formData.banner_image || ""
      let galleryUrls = formData.gallery_images || []

      // Upload new banner image if selected
      if (bannerImage) {
        bannerUrl = await uploadImage(bannerImage)
      }

      // Upload new gallery images if selected
      if (galleryImages.length > 0) {
        const newGalleryUrls = await Promise.all(galleryImages.map(uploadImage))
        galleryUrls = [...galleryUrls, ...newGalleryUrls]
      }

      setUploadingImages(false)

      const eventData = {
        ...formData,
        banner_image: bannerUrl,
        gallery_images: galleryUrls,
        is_published: publishNow || formData.is_published,
        updated_at: new Date().toISOString(),
      }

      let result
      if (event?.id) {
        // Update existing event
        result = await supabase.from("events").update(eventData).eq("id", event.id)
      } else {
        // Create new event
        result = await supabase.from("events").insert([
          {
            ...eventData,
            created_at: new Date().toISOString(),
          },
        ])
      }

      if (result.error) throw result.error

      toast({
        title: event?.id ? "Event updated" : "Event created",
        description: `The event has been ${event?.id ? "updated" : "created"} successfully.`,
      })

      router.push("/dashboard/admin/events")
      router.refresh()
    } catch (error) {
      console.error("Error saving event:", error)
      toast({
        title: "Error",
        description: `Failed to ${event?.id ? "update" : "create"} event. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setUploadingImages(false)
    }
  }

  const handleInputChange = (field: keyof Event, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBannerImage(file)
    }
  }

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setGalleryImages((prev) => [...prev, ...files])
  }

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index))
  }

  const removeExistingGalleryImage = (index: number) => {
    const updatedGallery = formData.gallery_images?.filter((_, i) => i !== index) || []
    handleInputChange("gallery_images", updatedGallery)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/admin/events">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter event title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                placeholder="e.g., Leadership, Education"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your event"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
                placeholder="e.g., 10:00 AM - 4:00 PM"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Event location"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chapter">Chapter *</Label>
              <Select value={formData.chapter} onValueChange={(value) => handleInputChange("chapter", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Chapter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">US</SelectItem>
                  <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={formData.contact_email}
                onChange={(e) => handleInputChange("contact_email", e.target.value)}
                placeholder="info@acumenhaven.org"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social_facebook">Facebook URL</Label>
              <Input
                id="social_facebook"
                value={formData.social_facebook}
                onChange={(e) => handleInputChange("social_facebook", e.target.value)}
                placeholder="https://facebook.com/..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="social_twitter">Twitter URL</Label>
              <Input
                id="social_twitter"
                value={formData.social_twitter}
                onChange={(e) => handleInputChange("social_twitter", e.target.value)}
                placeholder="https://twitter.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social_instagram">Instagram URL</Label>
              <Input
                id="social_instagram"
                value={formData.social_instagram}
                onChange={(e) => handleInputChange("social_instagram", e.target.value)}
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="social_linkedin">LinkedIn URL</Label>
              <Input
                id="social_linkedin"
                value={formData.social_linkedin}
                onChange={(e) => handleInputChange("social_linkedin", e.target.value)}
                placeholder="https://linkedin.com/..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="banner_image">Banner Image *</Label>
            {formData.banner_image && !bannerImage && (
              <div className="mb-2">
                <div className="relative w-32 h-20">
                  <Image
                    src={formData.banner_image || "/placeholder.svg"}
                    alt="Current banner"
                    fill
                    className="object-cover rounded border"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Current banner image</p>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Input
                id="banner_image"
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {bannerImage && (
                <Button type="button" variant="outline" size="sm" onClick={() => setBannerImage(null)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            {bannerImage && <p className="text-sm text-muted-foreground">Selected: {bannerImage.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gallery_images">Gallery Images (Optional)</Label>

            {/* Show existing gallery images */}
            {formData.gallery_images && formData.gallery_images.length > 0 && (
              <div className="mb-2">
                <p className="text-sm text-muted-foreground mb-2">Current gallery images:</p>
                <div className="grid grid-cols-4 gap-2">
                  {formData.gallery_images.map((imageUrl, index) => (
                    <div key={index} className="relative">
                      <div className="relative w-full h-16">
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={`Gallery ${index + 1}`}
                          fill
                          className="object-cover rounded border"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-1 -right-1 h-5 w-5 p-0"
                        onClick={() => removeExistingGalleryImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Input
              id="gallery_images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/90"
            />

            {galleryImages.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-sm text-muted-foreground">New images to add:</p>
                {galleryImages.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted px-2 py-1 rounded">
                    <span className="text-sm">{file.name}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeGalleryImage(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="registration_link">Registration Link</Label>
            <Input
              id="registration_link"
              value={formData.registration_link}
              onChange={(e) => handleInputChange("registration_link", e.target.value)}
              placeholder="https://example.com/register"
            />
          </div>

          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="is_featured" className="text-base font-medium">
                  Featured Event
                </Label>
                <p className="text-sm text-muted-foreground">Display this event prominently on the homepage</p>
              </div>
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-400"
                onCheckedChange={(checked) => handleInputChange("is_featured", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="is_published" className="text-base font-medium">
                  Published
                </Label>
                <p className="text-sm text-muted-foreground">Make this event visible to the public</p>
              </div>
              <Switch
                id="is_published"
                checked={formData.is_published}
                className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-400"
                onCheckedChange={(checked) => handleInputChange("is_published", checked)}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <Button
              onClick={() => handleSubmit(false)}
              disabled={
                isLoading ||
                uploadingImages ||
                !formData.title ||
                !formData.description ||
                !formData.date ||
                !formData.time ||
                !formData.location ||
                !formData.chapter
              }
              className="bg-un-400 hover:bg-un-400/90 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : uploadingImages ? "Uploading..." : "Save as Draft"}
            </Button>

            <Button
              onClick={() => handleSubmit(true)}
              disabled={
                isLoading ||
                uploadingImages ||
                !formData.title ||
                !formData.description ||
                !formData.date ||
                !formData.time ||
                !formData.location ||
                !formData.chapter
              }
              className="bg-emerald-500 hover:bg-emerald-500/90 text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              {isLoading ? "Publishing..." : uploadingImages ? "Uploading..." : "Publish Now"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
