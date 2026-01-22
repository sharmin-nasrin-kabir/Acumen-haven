"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { BlogForm } from "@/components/admin/blog-form"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import type { Blog } from "@/types/blog"

export default function EditBlogPage() {
    const { id } = useParams()
    const [blog, setBlog] = useState<Blog | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        async function fetchBlog() {
            try {
                const { data, error } = await supabase
                    .from("blogs")
                    .select("*")
                    .eq("id", id)
                    .single()

                if (error) throw error
                setBlog(data)
            } catch {
                toast.error("Failed to load story")
                router.push("/admin/blogs")
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchBlog()
    }, [id, router, supabase])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
        )
    }

    if (!blog) return null

    return (
        <div className="max-w-7xl mx-auto pb-20">
            <BlogForm initialData={blog} />
        </div>
    )
}
