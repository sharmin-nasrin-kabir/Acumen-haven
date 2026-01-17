import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Edit, Eye } from "lucide-react"
import { BlogDeleteButton } from "@/components/dashboard/blog-delete-button"

export default async function UserBlogsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Get user's blogs
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("author_id", user.id)
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
        return "secondary"
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Blogs</h1>
          <p className="mt-2 text-gray-600">Create and manage your blog posts.</p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/dashboard/blogs/new">
            <Plus className="h-4 w-4 mr-2" />
            Write New Post
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Card key={blog.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{blog.title}</CardTitle>
                    <CardDescription>{blog.excerpt}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusColor(blog.status)}>{getStatusText(blog.status)}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Created {new Date(blog.created_at).toLocaleDateString()}</p>
                    {blog.published_at && (
                      <p className="text-sm text-gray-500">
                        Published {new Date(blog.published_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {blog.status === "approved" && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${blog.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/blogs/${blog.id}/edit`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <BlogDeleteButton blogId={blog.id} blogTitle={blog.title} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 mb-4">No blog posts found.</p>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/dashboard/blogs/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Write Your First Post
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
