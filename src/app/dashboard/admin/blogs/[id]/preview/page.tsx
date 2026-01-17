import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect, notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BlogApprovalActions } from "@/components/dashboard/blog-approval-actions"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Eye } from "lucide-react"
import Image from "next/image"

interface BlogPreviewPageProps {
  params: {
    id: string
  }
}

export default async function BlogPreviewPage({ params }: BlogPreviewPageProps) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role === "user") {
    redirect("/dashboard")
  }

  // Get blog with author information
  const { data: blog, error } = await supabase
    .from("blogs")
    .select(`
      *,
      profiles!blogs_author_id_fkey (
        full_name,
        email
      )
    `)
    .eq("id", params.id)
    .single()

  if (error || !blog) {
    notFound()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "pending":
        return "secondary"
      case "rejected":
        return "destructive"
      case "draft":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Published"
      case "pending":
        return "Pending Review"
      case "rejected":
        return "Rejected"
      case "draft":
        return "Draft"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/admin/blogs">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Blog Management
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Blog Preview</h1>
            <p className="text-gray-600">Review this blog post before making a decision</p>
          </div>
        </div>
        <Badge variant={getStatusColor(blog.status)} className="text-sm">
          {getStatusText(blog.status)}
        </Badge>
      </div>

      {/* Blog Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-500">Author:</span>
              <p>{blog.profiles?.full_name || blog.profiles?.email || "Unknown Author"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-500">Created:</span>
              <p>{new Date(blog.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="font-medium text-gray-500">Status:</span>
              <p>{getStatusText(blog.status)}</p>
            </div>
            {blog.published_at && (
              <div>
                <span className="font-medium text-gray-500">Published:</span>
                <p>{new Date(blog.published_at).toLocaleDateString()}</p>
              </div>
            )}
            {blog.rejection_reason && (
              <div className="md:col-span-2">
                <span className="font-medium text-gray-500">Rejection Reason:</span>
                <p className="text-red-600 mt-1">{blog.rejection_reason}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            {blog.status === "approved" && (
              <Link href={`/blog/${blog.id}`}>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-1" />
                  View Live
                </Button>
              </Link>
            )}
            <BlogApprovalActions blogId={blog.id} currentStatus={blog.status} />
          </div>
        </CardContent>
      </Card>

      {/* Blog Content Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Content Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <article className="prose prose-lg max-w-none">
            {/* Featured Image */}
            {blog.featured_image && (
              <div className="mb-8">
                <Image
                  src={blog.featured_image || "/placeholder.svg"}
                  alt={blog.title}
                  width={800}
                  height={400}
                  className="rounded-lg object-cover w-full"
                />
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>

            {/* Meta Information */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 not-prose">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {blog.profiles?.full_name || blog.profiles?.email || "Unknown Author"}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(blog.created_at).toLocaleDateString()}
              </div>
            </div>

            {/* Excerpt */}
            {blog.excerpt && <div className="text-lg text-gray-600 italic mb-6 not-prose">{blog.excerpt}</div>}

            {/* Content */}
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
          </article>
        </CardContent>
      </Card>
    </div>
  )
}
