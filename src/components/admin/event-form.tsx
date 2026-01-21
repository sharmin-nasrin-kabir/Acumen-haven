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
    Youtube as YoutubeIcon,
    Clock,
    MapPin
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

    const [formData, setFormData] = useState<Partial<Event>>({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "",
        banner_image: "",
        gallery_images: [],
        registration_link: "",
        youtube_url: "",
        slug: "",
        is_published: false,
        is_featured: false,
        status: "Upcoming",
        contact_email: "",
        social_facebook: "",
        social_twitter: "",
        social_instagram: "",
        social_linkedin: "",
        banner_position: "center center",
        ...initialData
    })


    const handleTitleChange = (e: any) => {
        const title = e.target.value
        setFormData(prev => ({
            ...prev,
            title,
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

        const result = await response.json()
        if (!response.ok) throw new Error(result.error || "Upload failed")
        return result.url
    }

    const handleBannerUpload = async (file: File) => {
        try {
            setUploading(true)
            const url = await uploadImage(file as File)
            handleInputChange("banner_image", url)
            toast.success("Banner uploaded")
        } catch (err: any) {
            toast.error(err.message || "Failed to upload banner")
        } finally {
            setUploading(false)
        }
    }

    const handleGalleryUpdate = (urls: string[]) => {
        handleInputChange("gallery_images", urls)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        // Final validation
        if (!formData.title?.trim()) {
            toast.error("Event title is required")
            return
        }
        if (!formData.date) {
            toast.error("Event date is required")
            return
        }

        if (!formData.status) {
            toast.error("Event status is required")
            return
        }

        setLoading(true)
        const supabase = createClient()

        try {
            // 1. Prepare clean payload
            // Use underscores to avoid unused variable lint warnings
            const { id, created_at, updated_at, ...rawFormData } = formData as any;
            void id; void created_at; void updated_at;

            // 2. Clean fields: convert empty strings to null for optional DB columns
            const cleanPayload: any = {}
            Object.keys(rawFormData).forEach(key => {
                const val = rawFormData[key]
                cleanPayload[key] = (typeof val === 'string' && val.trim() === '') ? null : val
            })

            const payload = {
                ...cleanPayload,
                updated_at: new Date().toISOString(),
            }

            console.log("Saving event with payload:", payload)

            let error
            if (initialData?.id) {
                const { error: updateError } = await supabase
                    .from("events")
                    .update(payload)
                    .eq("id", initialData.id)
                error = updateError
            } else {
                const { error: insertError } = await supabase
                    .from("events")
                    .insert([payload])
                error = insertError
            }

            if (error) {
                console.error("Supabase Error Details:", error)
                throw error
            }

            toast.success(initialData ? "Event updated successfully" : "Event created successfully")

            // Give a small delay for Supabase propagation before redirecting
            setTimeout(() => {
                router.push("/admin/events")
                router.refresh()
            }, 800)

        } catch (err: any) {
            console.error("Full Error Object:", err)
            const errorMsg = err.message || "An unexpected error occurred while saving"
            const errorDetail = err.details ? ` - ${err.details}` : ""
            // Specific check for RLS policy violation
            if (errorMsg.includes("policy") || err.code === "42501") {
                toast.error("Permission denied. You are not authorized to manage events.", {
                    description: "Please check your admin status in the 'admin' table.",
                    duration: 6000
                })
            } else {
                toast.error(`${errorMsg}${errorDetail}`, {
                    duration: 5000
                })
            }
        } finally {
            setLoading(false)
        }
    }

    const getYoutubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        return (match && match[2].length === 11) ? match[2] : null
    }

    const youtubeId = formData.youtube_url ? getYoutubeId(formData.youtube_url) : null

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 bg-white/80 backdrop-blur-md py-4 border-b border-slate-100 mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/events">
                        <Button variant="outline" size="icon" type="button" className="rounded-full hover:bg-emerald-50 hover:border-emerald-200 group transition-all">
                            <ArrowLeft className="h-4 w-4 text-slate-600 group-hover:text-emerald-600" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            {initialData ? "Edit Event" : "Create New Event"}
                        </h1>
                        <p className="text-sm text-slate-500">
                            {initialData ? "Update the details of your existing event." : "Fill in the details to launch a new event on the platform."}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        type="submit"
                        disabled={loading || uploading}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 h-11 px-6 min-w-[140px] transition-all active:scale-95"
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {initialData ? "Update Event" : "Save Event"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Basic Info */}
                <div className="lg:col-span-8 space-y-8">
                    <Card className="border-none shadow-[0_20px_40px_rgba(0,0,0,0.03)] bg-white overflow-hidden rounded-3xl border border-slate-100/50">
                        <div className="p-5 flex items-center justify-between border-b border-slate-50/80">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-600">
                                    <ImageIcon className="h-4 w-4" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-800">Featured Banner</h3>
                                    <p className="text-[10px] text-slate-400 font-medium">Click on image to set focal point</p>
                                </div>
                            </div>
                        </div>
                        <CardContent className="p-5">
                            <div className="space-y-4">
                                <div
                                    className={`
                                        relative aspect-video rounded-2xl bg-slate-50 border-2 border-dashed transition-all duration-300 overflow-hidden group
                                        ${!formData.banner_image ? 'border-slate-200 hover:bg-emerald-50/30 hover:border-emerald-300' : 'border-emerald-100'}
                                    `}
                                    onDragOver={(e) => {
                                        e.preventDefault()
                                        e.currentTarget.classList.add('border-emerald-500', 'bg-emerald-50/30', 'shadow-inner')
                                    }}
                                    onDragLeave={(e) => {
                                        e.currentTarget.classList.remove('border-emerald-500', 'bg-emerald-50/30', 'shadow-inner')
                                    }}
                                    onDrop={(e) => {
                                        e.preventDefault()
                                        e.currentTarget.classList.remove('border-emerald-500', 'bg-emerald-50/30', 'shadow-inner')
                                        const file = e.dataTransfer.files?.[0]
                                        if (file && file.type.startsWith('image/')) {
                                            handleBannerUpload(file)
                                        } else {
                                            toast.error('Please upload an image file')
                                        }
                                    }}
                                >
                                    {formData.banner_image ? (
                                        <div
                                            className="relative w-full h-full group cursor-crosshair"
                                            onClick={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const x = ((e.clientX - rect.left) / rect.width) * 100;
                                                const y = ((e.clientY - rect.top) / rect.height) * 100;
                                                handleInputChange("banner_position", `${Math.round(x)}% ${Math.round(y)}%`);
                                            }}
                                        >
                                            <Image
                                                src={formData.banner_image}
                                                alt="Banner"
                                                fill
                                                className="object-cover transition-all duration-700"
                                                style={{
                                                    objectPosition: formData.banner_position || 'center center'
                                                }}
                                            />
                                            {/* Visual Focal Point Indicator */}
                                            <div
                                                className="absolute w-6 h-6 border-2 border-white rounded-full bg-emerald-500/40 backdrop-blur-sm -translate-x-1/2 -translate-y-1/2 shadow-xl pointer-events-none transition-all duration-300 ease-out"
                                                style={{
                                                    left: formData.banner_position?.includes('%') ? formData.banner_position.split(' ')[0] : (formData.banner_position === 'center center' ? '50%' : '50%'),
                                                    top: formData.banner_position?.includes('%') ? formData.banner_position.split(' ')[1] : (formData.banner_position === 'center center' ? '50%' : '50%'),
                                                }}
                                            >
                                                <div className="absolute inset-0 m-auto w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                                            </div>

                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <p className="text-[10px] text-white/90 font-medium">Click anywhere to set focus</p>
                                                <div className="flex gap-2">
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                        size="sm"
                                                        className="h-7 text-[10px] bg-white/20 hover:bg-white/40 text-white border-none backdrop-blur-md"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
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
                                                        Change
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        className="h-7 text-[10px] bg-red-500/80 hover:bg-red-600 backdrop-blur-md"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleInputChange("banner_image", "")
                                                            handleInputChange("banner_position", "center center")
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            className="text-center p-6 cursor-pointer w-full h-full flex flex-col items-center justify-center group"
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
                                                <div className="flex flex-col items-center gap-3">
                                                    <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
                                                    <p className="text-sm font-bold text-emerald-600">Uploading...</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-12 h-12 bg-white shadow-sm rounded-xl flex items-center justify-center text-slate-300 mb-3 group-hover:scale-110 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all duration-300 border border-slate-100">
                                                        <ImageIcon className="h-5 w-5" />
                                                    </div>
                                                    <p className="text-xs font-bold text-slate-700">Featured Banner</p>
                                                    <p className="text-[10px] text-slate-400 mt-1 px-6 text-center">
                                                        Drag & drop or <span className="text-emerald-600 underline">browse</span>
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-2xl">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100/60 px-8 py-6">
                            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                    <Globe className="h-4 w-4" />
                                </div>
                                General Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="space-y-3">
                                <Label htmlFor="title" className="text-slate-700 font-semibold text-sm">Event Title <span className="text-red-500">*</span></Label>
                                <Input
                                    id="title"
                                    value={formData.title || ""}
                                    onChange={handleTitleChange}
                                    placeholder="e.g. Annual Youth Leadership Summit"
                                    className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-slate-50/30 transition-all rounded-xl"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="category" className="text-slate-700 font-semibold text-sm flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        Category
                                    </Label>
                                    <Input
                                        id="category"
                                        value={formData.category || ""}
                                        onChange={(e) => handleInputChange("category", e.target.value)}
                                        placeholder="e.g. Workshop, Seminar, Charity"
                                        className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-slate-50/30 transition-all rounded-xl"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="slug" className="text-slate-700 font-semibold text-sm flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        URL Slug (Custom)
                                    </Label>
                                    <Input
                                        id="slug"
                                        value={formData.slug || ""}
                                        onChange={(e) => handleInputChange("slug", e.target.value)}
                                        placeholder="e.g. youth-summit-2024"
                                        className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-slate-50/30 transition-all rounded-xl"
                                    />
                                    <p className="text-[11px] text-slate-400 italic px-1">
                                        Leave blank to auto-generate from title. Lowercase, numbers, and hyphens only.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-slate-700 font-semibold text-sm flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    Description
                                </Label>
                                <RichTextEditor
                                    content={formData.description || ""}
                                    onChange={(content) => handleInputChange("description", content)}
                                />
                                <p className="text-[11px] text-slate-500 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100 border-dashed">
                                    Tip: Use headings and bullet points to make the event page more readable for visitors.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-2xl">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100/60 px-8 py-6">
                            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                    <ImageIcon className="h-4 w-4" />
                                </div>
                                Media & Gallery
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-10">
                            <div className="space-y-4">
                                <Label className="text-slate-700 font-semibold text-sm">Event Gallery</Label>
                                <div className="p-1 rounded-2xl bg-slate-50/50 border border-slate-100">
                                    <ImageDropzone
                                        images={formData.gallery_images || []}
                                        onUpdate={handleGalleryUpdate}
                                        onUpload={uploadImage}
                                        uploading={uploading}
                                        label="Drag and drop gallery images"
                                    />
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-100 space-y-4">
                                <Label htmlFor="youtube" className="text-slate-700 font-semibold text-sm flex items-center gap-2">
                                    <YoutubeIcon className="h-4 w-4 text-red-600" /> YouTube Video Link
                                </Label>
                                <Input
                                    id="youtube"
                                    value={formData.youtube_url || ""}
                                    onChange={(e) => handleInputChange("youtube_url", e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-slate-50/30 transition-all rounded-xl"
                                />
                                {youtubeId && (
                                    <div className="mt-6 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-slate-50 aspect-video relative group ring-1 ring-slate-100">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src={`https://www.youtube.com/embed/${youtubeId}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-[11px] font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                            Video Preview Available
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Settings & Details */}
                <div className="lg:col-span-4 space-y-8">
                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-2xl">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100/60 p-6">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                Logistics & Location
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">


                            <div className="space-y-2.5">
                                <Label htmlFor="status" className="text-slate-700 font-semibold text-sm flex items-center gap-2">
                                    <div className="h-4 w-4 rounded-full border-2 border-emerald-400 flex items-center justify-center p-0.5">
                                        <div className="w-full h-full rounded-full bg-emerald-400" />
                                    </div>
                                    Event Status <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(v) => handleInputChange("status", v)}
                                    required
                                >
                                    <SelectTrigger className="h-11 border-slate-200 focus:ring-emerald-500 rounded-xl bg-slate-50/30">
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                                        <SelectItem value="Upcoming" className="focus:bg-emerald-50 focus:text-emerald-700">Upcoming Event</SelectItem>
                                        <SelectItem value="Past" className="focus:bg-emerald-50 focus:text-emerald-700">Past Event</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="date" className="text-slate-700 font-semibold text-sm flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-emerald-600" /> Event Date <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.date || ""}
                                    onChange={(e) => handleInputChange("date", e.target.value)}
                                    className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-slate-50/30 transition-all rounded-xl"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2.5">
                                    <Label htmlFor="time" className="text-slate-700 font-semibold text-sm flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-emerald-600" /> Time
                                    </Label>
                                    <Input
                                        id="time"
                                        value={formData.time || ""}
                                        onChange={(e) => handleInputChange("time", e.target.value)}
                                        placeholder="e.g. 10:00 AM"
                                        className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-slate-50/30 transition-all rounded-xl"
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <Label htmlFor="location" className="text-slate-700 font-semibold text-sm flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-emerald-600" /> Location
                                    </Label>
                                    <Input
                                        id="location"
                                        value={formData.location || ""}
                                        onChange={(e) => handleInputChange("location", e.target.value)}
                                        placeholder="City, Hall or Online"
                                        className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-slate-50/30 transition-all rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                <Label htmlFor="reg_link" className="text-slate-700 font-semibold text-sm flex items-center gap-2">
                                    <LinkIcon className="h-4 w-4 text-emerald-600" /> Registration Link
                                </Label>
                                <Input
                                    id="reg_link"
                                    value={formData.registration_link || ""}
                                    onChange={(e) => handleInputChange("registration_link", e.target.value)}
                                    placeholder="https://..."
                                    className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-slate-50/30 transition-all rounded-xl"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden rounded-2xl">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100/60 p-6">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                Contact & Social Media
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="contact_email" className="text-slate-700 font-semibold text-sm">Contact Email</Label>
                                <Input
                                    id="contact_email"
                                    type="email"
                                    value={formData.contact_email || ""}
                                    onChange={(e) => handleInputChange("contact_email", e.target.value)}
                                    placeholder="info@acumenhaven.org"
                                    className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-slate-50/30 transition-all rounded-xl"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="social_facebook" className="text-slate-700 font-semibold text-xs">Facebook</Label>
                                    <Input
                                        id="social_facebook"
                                        value={formData.social_facebook || ""}
                                        onChange={(e) => handleInputChange("social_facebook", e.target.value)}
                                        placeholder="URL"
                                        className="h-10 border-slate-200 focus:ring-emerald-500 rounded-lg bg-slate-50/30"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="social_twitter" className="text-slate-700 font-semibold text-xs">Twitter</Label>
                                    <Input
                                        id="social_twitter"
                                        value={formData.social_twitter || ""}
                                        onChange={(e) => handleInputChange("social_twitter", e.target.value)}
                                        placeholder="URL"
                                        className="h-10 border-slate-200 focus:ring-emerald-500 rounded-lg bg-slate-50/30"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="social_instagram" className="text-slate-700 font-semibold text-xs">Instagram</Label>
                                    <Input
                                        id="social_instagram"
                                        value={formData.social_instagram || ""}
                                        onChange={(e) => handleInputChange("social_instagram", e.target.value)}
                                        placeholder="URL"
                                        className="h-10 border-slate-200 focus:ring-emerald-500 rounded-lg bg-slate-50/30"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="social_linkedin" className="text-slate-700 font-semibold text-xs">LinkedIn</Label>
                                    <Input
                                        id="social_linkedin"
                                        value={formData.social_linkedin || ""}
                                        onChange={(e) => handleInputChange("social_linkedin", e.target.value)}
                                        placeholder="URL"
                                        className="h-10 border-slate-200 focus:ring-emerald-500 rounded-lg bg-slate-50/30"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>


                    <Card className="border-none shadow-[0_12px_40px_rgba(16,185,129,0.08)] bg-emerald-50/20 overflow-hidden rounded-2xl border-emerald-100/30 border">
                        <CardHeader className="bg-emerald-50/50 border-b border-emerald-100/50 p-6">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-emerald-700 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Publishing Controls
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white hover:shadow-md transition-all">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-bold text-slate-800">Featured Event</Label>
                                    <p className="text-[11px] text-slate-500">Highlight this event on the homepage</p>
                                </div>
                                <Switch
                                    checked={formData.is_featured}
                                    onCheckedChange={(v) => handleInputChange("is_featured", v)}
                                    className="data-[state=checked]:bg-emerald-500"
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-bold text-white">Publish to Public Site</Label>
                                    <p className="text-[11px] text-emerald-100">Make this event visible to all visitors</p>
                                </div>
                                <Switch
                                    checked={formData.is_published}
                                    onCheckedChange={(v) => handleInputChange("is_published", v)}
                                    className="data-[state=checked]:bg-white data-[state=checked]:dark:bg-white data-[state=unchecked]:bg-emerald-800"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}
