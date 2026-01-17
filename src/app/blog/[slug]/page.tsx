"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ArrowLeft, Share2, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { getBlogUrl } from "@/lib/utils/slug"

interface Blog {
  id: string
  title: string
  content: string
  excerpt: string
  featured_image: string | null
  slug: string | null
  status: string
  published_at: string | null
  created_at: string
  updated_at: string
  profiles: {
    first_name: string | null
    last_name: string | null
    email: string
  } | null
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const supabase = createClient()

        const { data: blogData, error: blogError } = await supabase
          .from("blogs")
          .select(`
            id,
            title,
            content,
            excerpt,
            featured_image,
            slug,
            status,
            published_at,
            created_at,
            updated_at,
            profiles (
              first_name,
              last_name,
              email
            )
          `)
          .or(`slug.eq.${params.slug},id.eq.${params.slug}`)
          .eq("status", "approved")
          .single()

        if (blogError) {
          console.error("Error fetching blog:", blogError.message, blogError.details, blogError.hint)
          if (blogError.code === "PGRST116") {
            notFound()
          }
          throw blogError
        }

        setBlog(blogData)

        // Fetch related blogs
        const { data: relatedData, error: relatedError } = await supabase
          .from("blogs")
          .select(`
            id,
            title,
            excerpt,
            featured_image,
            slug,
            published_at,
            created_at,
            profiles (
              first_name,
              last_name
            )
          `)
          .eq("status", "approved")
          .neq("id", blogData.id)
          .order("published_at", { ascending: false })
          .limit(3)

        if (relatedError) {
          console.error("Error fetching related blogs:", relatedError.message, relatedError.details, relatedError.hint)
        }

        setRelatedBlogs(relatedData || [])
      } catch (err) {
        console.error("Catch block error:", err)
        setError(err instanceof Error ? err.message : "Failed to load blog")
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [params.slug])

  const handleShare = async () => {
    const url = getBlogUrl(blog?.slug || blog?.id || "")

    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.excerpt,
          url: url,
        })
      } catch (err) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Blog Post Not Found</h1>
          <p className="text-slate-600 mb-6">{error || "The blog post you're looking for doesn't exist."}</p>
          <Button asChild>
            <Link href="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30">
      {/* Back Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="text-slate-600 hover:text-emerald-600">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Blog Content */}
      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full">Blog Post</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">{blog.title}</h1>
              <div className="flex items-center justify-center space-x-6 text-slate-600">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>
                    {blog.profiles?.first_name} {blog.profiles?.last_name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(blog.published_at || blog.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
              {blog.excerpt && (
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">{blog.excerpt}</p>
              )}
            </div>

            {/* Featured Image */}
            {blog.featured_image && (
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
                <Image src={blog.featured_image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg prose-slate max-w-none">
              <div className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>

            {/* Share Button */}
            <div className="flex justify-center pt-8">
              <Button
                onClick={handleShare}
                variant="outline"
                className="bg-white hover:bg-emerald-50 border-emerald-200 hover:border-emerald-300"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Article
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <section className="py-16 px-4 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Related Stories</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <Card
                  key={relatedBlog.id}
                  className="group rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="relative h-48">
                    <Image
                      src={
                        relatedBlog.featured_image ||
                        "/placeholder.svg?height=300&width=400&query=blog post" ||
                        "/placeholder.svg"
                      }
                      alt={relatedBlog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">{relatedBlog.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-slate-500">
                        <User className="h-3 w-3" />
                        <span>
                          {relatedBlog.profiles?.first_name} {relatedBlog.profiles?.last_name}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/blog/${relatedBlog.id}`}>Read More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
