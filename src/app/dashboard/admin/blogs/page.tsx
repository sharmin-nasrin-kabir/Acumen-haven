import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BlogApprovalActions } from "@/components/dashboard/blog-approval-actions"
import Link from "next/link"
import { Eye, Calendar, User } from "lucide-react"

export default async function AdminBlogsPage() {
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

  if (!profile || profile.role === "user" ) {
    redirect("/dashboard")
  }

  // Get all blogs with author information
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select(`
      *,
      profiles!blogs_author_id_fkey (
        first_name,
        last_name,
        email
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blogs:", error)
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

  const pendingBlogs = blogs?.filter((blog) => blog.status === "pending") || []
  const approvedBlogs = blogs?.filter((blog) => blog.status === "approved") || []
  const rejectedBlogs = blogs?.filter((blog) => blog.status === "rejected") || []
  const draftBlogs = blogs?.filter((blog) => blog.status === "draft") || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
        <p className="mt-2 text-gray-600">Review and manage all blog posts across the platform.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingBlogs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedBlogs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejectedBlogs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{draftBlogs.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Reviews Section */}
      {pendingBlogs.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Reviews ({pendingBlogs.length})</h2>
          <div className="space-y-4">
            {pendingBlogs.map((blog) => (
              <Card key={blog.id} className="border-orange-200 bg-orange-50/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{blog.title}</CardTitle>
                      <CardDescription className="mt-1">{blog.excerpt}</CardDescription>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {blog.profiles?.first_name && blog.profiles?.last_name
                            ? `${blog.profiles.first_name} ${blog.profiles.last_name}`
                            : blog.profiles?.email || "Unknown Author"}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(blog.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(blog.status)}>{getStatusText(blog.status)}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/admin/blogs/${blog.id}/preview`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                    </Link>
                    <BlogApprovalActions blogId={blog.id} currentStatus={blog.status} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Blogs Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Blog Posts ({blogs?.length || 0})</h2>
        {blogs && blogs.length > 0 ? (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <Card key={blog.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{blog.title}</CardTitle>
                      <CardDescription className="mt-1">{blog.excerpt}</CardDescription>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {blog.profiles?.first_name && blog.profiles?.last_name
                            ? `${blog.profiles.first_name} ${blog.profiles.last_name}`
                            : blog.profiles?.email || "Unknown Author"}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Created {new Date(blog.created_at).toLocaleDateString()}
                        </div>
                        {blog.published_at && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Published {new Date(blog.published_at).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge variant={getStatusColor(blog.status)}>{getStatusText(blog.status)}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/admin/blogs/${blog.id}/preview`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                    </Link>
                    {blog.status === "approved" && (
                      <Link href={`/blog/${blog.id}`}>
                        <Button variant="outline" size="sm">
                          View Live
                        </Button>
                      </Link>
                    )}
                    <BlogApprovalActions blogId={blog.id} currentStatus={blog.status} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500 mb-4">No blog posts found.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
