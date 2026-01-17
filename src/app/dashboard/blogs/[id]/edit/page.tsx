"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { BlogForm } from "@/components/dashboard/blog-form"
import type { Blog } from "@/types/auth"

interface EditBlogPageProps {
  params: {
    id: string
  }
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const loadBlog = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      const { data: blogData, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", params.id)
        .eq("author_id", user.id)
        .single()

      if (error || !blogData) {
        toast({
          title: "Error",
          description: "Blog post not found or you don't have permission to edit it.",
          variant: "destructive",
        })
        router.push("/dashboard/blogs")
        return
      }

      setBlog(blogData)
      setIsLoading(false)
    }

    loadBlog()
  }, [params.id, router, toast])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
          <p className="mt-2 text-gray-600">Loading your blog post...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Not Found</h1>
          <p className="mt-2 text-gray-600">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return <BlogForm blog={blog} />
}
