"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import {
    ArrowLeft,
    Save,
    Image as ImageIcon,
    Loader2,
    Globe,
    Calendar,
    Link as LinkIcon,
    Youtube as YoutubeIcon
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Event } from "@/types/events"
import { RichTextEditor } from "./rich-text-editor"
import { ImageDropzone } from "./image-dropzone"

interface EventFormProps {
    initialData?: Event
}

export function EventForm({ initialData }: EventFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)

    const [formData, setFormData] = useState<Partial<Event>>(
        initialData || {
            title: "",
            description: "",
            date: "",
            time: "",
            location: "",
            chapter: "Bangladesh",
            category: "",
            banner_image: "",
            gallery_images: [],
            registration_link: "",
            youtube_url: "",
            slug: "",
            is_published: false,
            is_featured: false,
        }
    )

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "")
    }

    const handleTitleChange = (e: any) => {
        const title = e.target.value
        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug || generateSlug(title)
        }))
    }

    const handleInputChange = (field: keyof Event, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const uploadImage = async (file: File): Promise<string> => {
        const data = new FormData()
        data.append("file", file)
        data.append("type", "events")

        const response = await fetch("/api/upload", {
            method: "POST",
            body: data,
        })

        if (!response.ok) throw new Error("Upload failed")
        const result = await response.json()
        return result.url
    }

    const handleBannerUpload = async (file: File) => {
        try {
            setUploading(true)
            const url = await uploadImage(file)
            handleInputChange("banner_image", url)
            return url
        } catch {
            toast.error("Failed to upload image")
            throw new Error("Upload failed")
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!formData.title || !formData.date || !formData.chapter) {
            toast.error("Please fill in required fields")
            return
        }

        setLoading(true)
        const supabase = createClient()

        try {
            const payload = {
                ...formData,
                updated_at: new Date().toISOString(),
            }

            let error
            if (initialData?.id) {
                ({ error } = await supabase
                    .from("events")
                    .update(payload)
                    .eq("id", initialData.id))
            } else {
                ({ error } = await supabase
                    .from("events")
                    .insert([payload]))
            }

            if (error) throw error

            toast.success(initialData ? "Event updated" : "Event created")
            router.push("/admin/events")
            router.refresh()
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    const getYoutubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
        const match = url.match(regExp)
        return (match && match[2].length === 11) ? match[2] : null
    }

    const youtubeId = formData.youtube_url ? getYoutubeId(formData.youtube_url) : null

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/events">
                        <Button variant="ghost" size="icon" type="button" className="rounded-full hover:bg-slate-100">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {initialData ? "Edit Event" : "Create New Event"}
                    </h1>
                </div>
                <div className="flex gap-3">
                    <Button
                        type="submit"
                        disabled={loading || uploading}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200"
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {initialData ? "Update Event" : "Save Event"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Basic Info */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-slate-200/60 shadow-sm overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                General Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-slate-700 font-medium">Event Title <span className="text-red-500">*</span></Label>
                                <Input
                                    id="title"
                                    value={formData.title || ""}
                                    onChange={handleTitleChange}
                                    placeholder="e.g. Annual Youth Leadership Summit"
                                    className="h-11 border-slate-200 focus:ring-emerald-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="slug" className="text-slate-700 font-medium tracking-tight flex items-center gap-1.5">
                                        URL Slug
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">/events/</span>
                                        <Input
                                            id="slug"
                                            value={formData.slug || ""}
                                            onChange={(e) => handleInputChange("slug", e.target.value)}
                                            placeholder="event-slug-here"
                                            className="pl-16 h-11 border-slate-200 focus:ring-emerald-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-slate-700 font-medium">Category</Label>
                                    <Input
                                        id="category"
                                        value={formData.category || ""}
                                        onChange={(e) => handleInputChange("category", e.target.value)}
                                        placeholder="e.g. Workshop, Seminar, Charity"
                                        className="h-11 border-slate-200 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-700 font-medium">Description</Label>
                                <RichTextEditor
                                    content={formData.description || ""}
                                    onChange={(content) => handleInputChange("description", content)}
                                />
                                <p className="text-[10px] text-slate-400 mt-1 italic">Professional WYSIWYG editor - changes are saved automatically to the form state.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200/60 shadow-sm overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                Media & Gallery
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-8">
                            <div className="space-y-4">
                                <Label className="text-slate-700 font-medium">Event Gallery</Label>
                                <ImageDropzone
                                    images={formData.gallery_images || []}
                                    onUpdate={(urls) => handleInputChange("gallery_images", urls)}
                                    onUpload={uploadImage}
                                    uploading={uploading}
                                    label="Drag and drop gallery images"
                                />
                            </div>

                            <div className="pt-6 border-t border-slate-100 space-y-4">
                                <Label htmlFor="youtube" className="text-slate-700 font-medium flex items-center gap-2">
                                    <YoutubeIcon className="h-4 w-4 text-red-600" /> YouTube Video Link
                                </Label>
                                <Input
                                    id="youtube"
                                    value={formData.youtube_url || ""}
                                    onChange={(e) => handleInputChange("youtube_url", e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="h-11 border-slate-200 focus:ring-emerald-500"
                                />
                                {youtubeId && (
                                    <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 aspect-video shadow-inner relative group">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${youtubeId}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                        <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                            Video Preview
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Settings & Details */}
                <div className="space-y-6">
                    <Card className="border-slate-200/60 shadow-sm overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                                Logistics & Location
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="chapter" className="text-slate-700 font-medium flex items-center gap-2">
                                    <Globe className="h-4 w-4" /> Organization Chapter
                                </Label>
                                <Select
                                    value={formData.chapter}
                                    onValueChange={(v) => handleInputChange("chapter", v)}
                                >
                                    <SelectTrigger className="h-11 border-slate-200">
                                        <SelectValue placeholder="Select Chapter" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                                        <SelectItem value="US">United States</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-slate-700 font-medium flex items-center gap-2">
                                    <Calendar className="h-4 w-4" /> Event Date
                                </Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.date || ""}
                                    onChange={(e) => handleInputChange("date", e.target.value)}
                                    className="h-11 border-slate-200 focus:ring-emerald-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="time" className="text-slate-700 font-medium">Time</Label>
                                    <Input
                                        id="time"
                                        value={formData.time || ""}
                                        onChange={(e) => handleInputChange("time", e.target.value)}
                                        placeholder="10:00 AM"
                                        className="h-11 border-slate-200 focus:ring-emerald-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location" className="text-slate-700 font-medium">Location</Label>
                                    <Input
                                        id="location"
                                        value={formData.location || ""}
                                        onChange={(e) => handleInputChange("location", e.target.value)}
                                        placeholder="City, Hall or Online"
                                        className="h-11 border-slate-200 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reg_link" className="text-slate-700 font-medium flex items-center gap-2">
                                    <LinkIcon className="h-4 w-4" /> Registration Link
                                </Label>
                                <Input
                                    id="reg_link"
                                    value={formData.registration_link || ""}
                                    onChange={(e) => handleInputChange("registration_link", e.target.value)}
                                    placeholder="https://..."
                                    className="h-11 border-slate-200 focus:ring-emerald-500"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200/60 shadow-sm overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                                Featured Banner
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                <div className="relative group">
                                    <div
                                        className={`
                                            relative aspect-video rounded-xl bg-slate-50 border-2 border-dashed border-slate-100 flex flex-col items-center justify-center overflow-hidden transition-all
                                            ${!formData.banner_image ? 'hover:bg-slate-100/50 hover:border-emerald-300' : ''}
                                        `}
                                    >
                                        {formData.banner_image ? (
                                            <>
                                                <Image src={formData.banner_image} alt="Banner" fill className="object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() => handleInputChange("banner_image", "")}
                                                    >
                                                        Remove Image
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <div
                                                className="text-center p-4 cursor-pointer w-full h-full flex flex-col items-center justify-center"
                                                onClick={() => {
                                                    const input = document.createElement('input')
                                                    input.type = 'file'
                                                    input.accept = 'image/*'
                                                    input.onchange = (e: any) => {
                                                        const file = e.target.files?.[0]
                                                        if (file) handleBannerUpload(file)
                                                    }
                                                    input.click()
                                                }}
                                            >
                                                {uploading ? (
                                                    <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mx-auto" />
                                                ) : (
                                                    <ImageIcon className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                                                )}
                                                <p className="text-xs font-medium text-slate-500">
                                                    {uploading ? "Uploading banner..." : "Upload banner image (1200x630)"}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200/60 shadow-sm overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                                Visibility Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50/50 transition-colors">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-semibold text-slate-900">Featured Event</Label>
                                    <p className="text-[10px] text-slate-500">Promote on homepage</p>
                                </div>
                                <Switch
                                    checked={formData.is_featured}
                                    onCheckedChange={(v) => handleInputChange("is_featured", v)}
                                    className="data-[state=checked]:bg-emerald-500"
                                />
                            </div>

                            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-emerald-50/30 border-emerald-100">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-semibold text-slate-900">Publish to Site</Label>
                                    <p className="text-[10px] text-slate-500">Make visible to public</p>
                                </div>
                                <Switch
                                    checked={formData.is_published}
                                    onCheckedChange={(v) => handleInputChange("is_published", v)}
                                    className="data-[state=checked]:bg-emerald-600"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}
