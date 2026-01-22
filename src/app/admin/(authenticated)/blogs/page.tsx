"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Loader2,
    Plus,
    Search,
    Calendar,
    User,
    MoreVertical,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    FileText,
    ExternalLink
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import type { Blog } from "@/types/blog"

export default function BlogsAdminPage() {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const supabase = createClient()

    const fetchBlogs = useCallback(async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from("blogs")
                .select("*")
                .order("created_at", { ascending: false })

            if (error) throw error
            setBlogs(data || [])
        } catch (err: any) {
            toast.error(err.message || "Failed to load blogs")
        } finally {
            setLoading(false)
        }
    }, [supabase])

    useEffect(() => {
        fetchBlogs()
    }, [fetchBlogs])

    async function togglePublished(id: string, currentStatus: boolean) {
        try {
            const { error } = await supabase
                .from("blogs")
                .update({
                    is_published: !currentStatus,
                    status: !currentStatus ? "Published" : "Draft"
                })
                .eq("id", id)

            if (error) throw error
            setBlogs(blogs.map(b => b.id === id ? { ...b, is_published: !currentStatus, status: !currentStatus ? "Published" : "Draft" } : b))
            toast.success(`Blog ${!currentStatus ? 'published' : 'moved to draft'}`)
        } catch (err: any) {
            toast.error(err.message)
        }
    }

    async function deleteBlog(id: string) {
        if (!confirm("Are you sure you want to delete this story?")) return
        try {
            const { error } = await supabase.from("blogs").delete().eq("id", id)
            if (error) throw error
            setBlogs(blogs.filter(b => b.id !== id))
            toast.success("Blog deleted successfully")
        } catch (err: any) {
            toast.error(err.message)
        }
    }

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.author_name?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-slate-900 uppercase italic">Blog Engine</h2>
                    <p className="text-slate-500 mt-2 font-medium">Manage your community stories and program updates.</p>
                </div>
                <Link href="/admin/blogs/new">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-200 h-12 px-8 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95">
                        <Plus className="mr-2 h-5 w-5" /> Write New Story
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search stories by title or author..."
                        className="pl-10 h-12 rounded-xl border-slate-100 bg-slate-50/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                    <Card key={blog.id} className="overflow-hidden border-slate-200/60 hover:shadow-2xl transition-all group rounded-3xl bg-white border">
                        <div className="relative h-48 w-full bg-slate-100">
                            <Image
                                src={blog.featured_image || "/placeholder-blog.png"}
                                alt={blog.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 left-4 flex gap-2">
                                <Badge className={blog.is_published ? "bg-emerald-500" : "bg-slate-400"}>
                                    {blog.is_published ? "Live" : "Draft"}
                                </Badge>
                                {blog.is_featured && <Badge className="bg-amber-500">Featured</Badge>}
                            </div>
                            <div className="absolute top-4 right-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/90 shadow-sm">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="rounded-xl">
                                        <DropdownMenuItem asChild>
                                            <Link href={`/admin/blogs/${blog.id}/edit`} className="flex items-center">
                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => togglePublished(blog.id, blog.is_published)}>
                                            {blog.is_published ? <div className="flex items-center text-amber-600"><XCircle className="mr-2 h-4 w-4" /> Move to Draft</div> : <div className="flex items-center text-emerald-600"><CheckCircle className="mr-2 h-4 w-4" /> Publish</div>}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600" onClick={() => deleteBlog(blog.id)}>
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-tight">
                                {blog.title}
                            </h3>
                            <div className="space-y-2 pt-2 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    {blog.author_name || "Community Member"}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(blog.created_at).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                <Link
                                    href={`/blog/${blog.slug || blog.id}`}
                                    target="_blank"
                                    className="text-xs font-bold text-slate-400 hover:text-emerald-600 flex items-center gap-2"
                                >
                                    <ExternalLink className="h-3.5 w-3.5" /> PREVIEW
                                </Link>
                                <Link href={`/admin/blogs/${blog.id}/edit`}>
                                    <Button variant="ghost" size="sm" className="font-bold text-emerald-600 hover:bg-emerald-50">MANAGE</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {filteredBlogs.length === 0 && (
                    <div className="col-span-full py-24 text-center bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-200">
                        <FileText className="h-10 w-10 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-black text-slate-900">No stories found</h3>
                        <p className="text-slate-500 mt-2">Start by crafting your first amazing story.</p>
                        <Link href="/admin/blogs/new" className="mt-6 inline-block">
                            <Button className="bg-emerald-600 text-white font-bold h-12 px-8 rounded-2xl">Write First Post</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
