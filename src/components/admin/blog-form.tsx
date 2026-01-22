"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import {
    Save,
    Image as ImageIcon,
    Loader2,
    Youtube as YoutubeIcon,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    ArrowLeft,
    Link as LinkIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import type { Blog } from "@/types/blog"
import { BlogBlockEditor } from "./blog-editor-blocks"
import { generateSlug } from "@/lib/utils/slug"

interface BlogFormProps {
    initialData?: Blog
}

export function BlogForm({ initialData }: BlogFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)

    const [formData, setFormData] = useState<Partial<Blog>>({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        featured_image: "",
        banner_position: "center center",
        category: "",
        tags: [],
        author_name: "",
        contact_email: "",
        social_facebook: "",
        social_twitter: "",
        social_instagram: "",
        social_linkedin: "",
        youtube_url: "",
        status: "Draft",
        is_published: false,
        is_featured: false,
        ...initialData
    })

    const isChanged = (() => {
        if (!initialData) return true;
        const fields: (keyof Blog)[] = [
            "title", "slug", "content", "excerpt", "featured_image", "banner_position",
            "category", "author_name", "contact_email", "social_facebook",
            "social_twitter", "social_instagram", "social_linkedin", "youtube_url",
            "status", "is_published", "is_featured"
        ];
        return fields.some(field => {
            const currentVal = formData[field];
            const initialVal = initialData[field];
            const normalize = (val: any) => (val === null || val === undefined) ? "" : val;
            if (typeof currentVal === 'boolean' || typeof initialVal === 'boolean') {
                return !!currentVal !== !!initialVal;
            }
            return normalize(currentVal) !== normalize(initialVal);
        });
    })();

    const handleTitleChange = (e: any) => {
        const title = e.target.value
        setFormData(prev => {
            const currentSlug = prev.slug || "";
            const autoSlug = generateSlug(prev.title || "");
            // Only auto-generate slug if it currently matches the generated slug from previous title
            const shouldAutoUpdate = !currentSlug || currentSlug === autoSlug;

            return {
                ...prev,
                title,
                slug: shouldAutoUpdate ? generateSlug(title) : currentSlug
            }
        })
    }

    const handleInputChange = useCallback((field: keyof Blog, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }, [])

    const uploadImage = async (file: File): Promise<string> => {
        const data = new FormData()
        data.append("file", file)
        data.append("type", "blogs")
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
            const url = await uploadImage(file)
            handleInputChange("featured_image", url)
            toast.success("Blog banner uploaded")
        } catch (err: any) {
            toast.error(err.message || "Failed to upload banner")
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!formData.title?.trim()) {
            toast.error("Blog title is required")
            return
        }
        setLoading(true)
        const supabase = createClient()
        try {
            const payload: any = {
                updated_at: new Date().toISOString(),
                published_at: formData.is_published && !initialData?.published_at ? new Date().toISOString() : initialData?.published_at
            }

            // Map standard fields explicitly to ensure they are included correctly
            const fieldsToSave = [
                "title", "slug", "content", "excerpt", "featured_image", "banner_position",
                "category", "author_name", "contact_email", "social_facebook",
                "social_twitter", "social_instagram", "social_linkedin", "youtube_url",
                "status", "is_published", "is_featured"
            ]

            fieldsToSave.forEach(field => {
                const val = (formData as any)[field]
                payload[field] = (typeof val === 'string' && val.trim() === '') ? null : (val ?? null)
            })

            let error
            if (initialData?.id) {
                const { error: updateError } = await supabase
                    .from("blogs")
                    .update(payload)
                    .eq("id", initialData.id)
                error = updateError
            } else {
                const { error: insertError } = await supabase
                    .from("blogs")
                    .insert([payload])
                error = insertError
            }

            if (error) throw error
            toast.success(initialData ? "Blog updated successfully" : "Blog created successfully")
            setTimeout(() => {
                router.push("/admin/blogs")
                router.refresh()
            }, 800)
        } catch (err: any) {
            toast.error(err.message || "An error occurred while saving")
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
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 bg-white/90 backdrop-blur-xl py-4 border-b border-gray-200 mb-8 -mx-4 px-4 md:mx-0 md:px-0">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs">
                        <Button variant="ghost" size="icon" type="button" className="rounded-full hover:bg-gray-100 transition-all">
                            <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
                            {initialData ? "Edit Post" : "New Post"}
                            <span className="text-xs font-normal text-gray-400 px-2 py-0.5 bg-gray-100 rounded-full border border-gray-200">
                                {formData.status || "Draft"}
                            </span>
                        </h1>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        type="submit"
                        disabled={loading || uploading || (initialData && !isChanged)}
                        className={cn(
                            "h-10 px-6 min-w-[120px] font-medium transition-all",
                            loading || uploading || (initialData && !isChanged)
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-black hover:bg-gray-800 text-white shadow-sm"
                        )}
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {initialData ? "Update" : "Publish"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
                {/* Main Content - Left Column */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Title & Editor */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
                        <div className="space-y-2">
                            <Input
                                id="title"
                                value={formData.title || ""}
                                onChange={handleTitleChange}
                                placeholder="Post Title"
                                className="h-14 text-2xl font-bold border-transparent px-0 placeholder:text-gray-300 focus-visible:ring-0 focus-visible:border-gray-200 rounded-none border-b transition-all"
                            />
                        </div>

                        <div className="space-y-4 pt-2">
                            <div className="flex items-center gap-2 text-gray-400 group-within:text-emerald-600 transition-colors">
                                <LinkIcon className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase tracking-widest">URL Slug</span>
                            </div>
                            <Input
                                value={formData.slug || ""}
                                onChange={(e) => handleInputChange("slug", generateSlug(e.target.value))}
                                placeholder="url-slug-example"
                                className="h-10 bg-gray-50/50 border-gray-200 rounded-xl text-sm font-medium focus:bg-white transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <BlogBlockEditor
                                initialContent={formData.content || "[]"}
                                onChange={(content) => handleInputChange("content", content)}
                            />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
                        <Label htmlFor="excerpt" className="text-sm font-semibold text-gray-700">Summary / Excerpt</Label>
                        <textarea
                            id="excerpt"
                            value={formData.excerpt || ""}
                            onChange={(e) => handleInputChange("excerpt", e.target.value)}
                            placeholder="Write a brief summary showing on blog cards..."
                            className="w-full min-h-[100px] p-3 text-sm border border-gray-200 rounded-lg focus:border-gray-400 focus:ring-0 transition-all resize-y placeholder:text-gray-400"
                        />
                    </div>

                    {/* Media */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <ImageIcon className="h-4 w-4 text-gray-500" /> Featured Media
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* Banner Image */}
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Banner Image</Label>
                                <div className="relative aspect-[21/9] rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden group hover:border-gray-300 transition-all">
                                    {formData.featured_image ? (
                                        <>
                                            <Image
                                                src={formData.featured_image}
                                                alt="Banner"
                                                fill
                                                className="object-cover"
                                                style={{ objectPosition: formData.banner_position || 'center center' }}
                                            />
                                            {/* Positioning Hints */}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                <p className="text-white text-xs font-medium">Click to set focal point</p>
                                            </div>

                                            {/* Focal Point Indicator */}
                                            <div className="absolute w-4 h-4 border-2 border-white rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-20"
                                                style={{
                                                    left: formData.banner_position?.includes('%') ? formData.banner_position.split(' ')[0] : '50%',
                                                    top: formData.banner_position?.includes('%') ? formData.banner_position.split(' ')[1] : '50%',
                                                }}
                                            />

                                            {/* Click Area for Positioning */}
                                            <div
                                                className="absolute inset-0 cursor-crosshair z-10"
                                                onClick={(e) => {
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                                                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                                                    handleInputChange("banner_position", `${Math.round(x)}% ${Math.round(y)}%`);
                                                    toast.info("Focal point selected - save to apply");
                                                }}
                                            />

                                            {/* Actions */}
                                            <div className="absolute top-2 right-2 z-20 flex gap-2">
                                                <Button type="button" variant="secondary" size="sm" className="h-8 bg-white/90 hover:bg-white text-xs shadow-sm backdrop-blur-sm" onClick={() => {
                                                    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*';
                                                    input.onchange = (e: any) => { if (e.target.files?.[0]) handleBannerUpload(e.target.files[0]) };
                                                    input.click();
                                                }}>Replace</Button>
                                                <Button type="button" variant="destructive" size="sm" className="h-8 text-xs shadow-sm" onClick={() => {
                                                    handleInputChange("featured_image", ""); handleInputChange("banner_position", "center center");
                                                }}>Remove</Button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center w-full h-full cursor-pointer" onClick={() => {
                                            const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*';
                                            input.onchange = (e: any) => { if (e.target.files?.[0]) handleBannerUpload(e.target.files[0]) };
                                            input.click();
                                        }}>
                                            {uploading ? <Loader2 className="h-8 w-8 animate-spin text-gray-400" /> : (
                                                <div className="text-center space-y-2">
                                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                                                        <ImageIcon className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium text-gray-600">Click to upload banner</p>
                                                        <p className="text-xs text-gray-400">Recommended: 1920x1080px</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* YouTube */}
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Video Embed</Label>
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <YoutubeIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <Input
                                            value={formData.youtube_url || ""}
                                            onChange={(e) => handleInputChange("youtube_url", e.target.value)}
                                            placeholder="YouTube URL"
                                            className="pl-9 h-9 text-sm"
                                        />
                                    </div>
                                </div>
                                {youtubeId && (
                                    <div className="mt-2 rounded-lg overflow-hidden bg-black aspect-video">
                                        <iframe
                                            width="100%" height="100%"
                                            src={`https://www.youtube.com/embed/${youtubeId}`}
                                            title="Preview" frameBorder="0" allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Publishing Card */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden text-sm">
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-semibold text-gray-700">Publishing Details</h3>
                        </div>
                        <div className="p-4 space-y-5">
                            <div className="space-y-3">
                                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Visibility & Status</Label>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Published</span>
                                    <Switch checked={formData.is_published} onCheckedChange={(v) => handleInputChange("is_published", v)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Featured</span>
                                    <Switch checked={formData.is_featured} onCheckedChange={(v) => handleInputChange("is_featured", v)} />
                                </div>

                                <div className="pt-2">
                                    <Select value={formData.status} onValueChange={(v) => handleInputChange("status", v)}>
                                        <SelectTrigger className="h-9 w-full">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Draft">Draft</SelectItem>
                                            <SelectItem value="Published">Published</SelectItem>
                                            <SelectItem value="Archived">Archived</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100" />

                            <div className="space-y-3">
                                <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Classification</Label>
                                <div className="space-y-3">
                                    <div>
                                        <Label className="text-xs text-gray-500 mb-1.5 block">Author</Label>
                                        <Input
                                            value={formData.author_name || ""}
                                            onChange={(e) => handleInputChange("author_name", e.target.value)}
                                            placeholder="Author Name"
                                            className="h-9"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-500 mb-1.5 block">Category</Label>
                                        <Input
                                            value={formData.category || ""}
                                            onChange={(e) => handleInputChange("category", e.target.value)}
                                            placeholder="Category"
                                            className="h-9"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social / Contact */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden text-sm">
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-semibold text-gray-700">Contact & Social</h3>
                        </div>
                        <div className="p-4 space-y-4">
                            <div>
                                <Label className="text-xs text-gray-500 mb-1.5 block">Contact Email</Label>
                                <Input
                                    value={formData.contact_email || ""}
                                    onChange={(e) => handleInputChange("contact_email", e.target.value)}
                                    placeholder="Email"
                                    className="h-9"
                                />
                            </div>
                            <div className="space-y-3 pt-2">
                                <div className="relative">
                                    <Facebook className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                                    <Input value={formData.social_facebook || ""} onChange={(e) => handleInputChange("social_facebook", e.target.value)} placeholder="Facebook URL" className="pl-9 h-9 text-xs" />
                                </div>
                                <div className="relative">
                                    <Twitter className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                                    <Input value={formData.social_twitter || ""} onChange={(e) => handleInputChange("social_twitter", e.target.value)} placeholder="Twitter URL" className="pl-9 h-9 text-xs" />
                                </div>
                                <div className="relative">
                                    <Instagram className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                                    <Input value={formData.social_instagram || ""} onChange={(e) => handleInputChange("social_instagram", e.target.value)} placeholder="Instagram URL" className="pl-9 h-9 text-xs" />
                                </div>
                                <div className="relative">
                                    <Linkedin className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
                                    <Input value={formData.social_linkedin || ""} onChange={(e) => handleInputChange("social_linkedin", e.target.value)} placeholder="LinkedIn URL" className="pl-9 h-9 text-xs" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
