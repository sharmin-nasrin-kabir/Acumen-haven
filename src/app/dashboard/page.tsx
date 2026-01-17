import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, Users, MessageSquare, PenTool, CheckSquare } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) return null

  const isAdmin = ["admin", "super_admin"].includes(profile.role)

  // Get stats based on role
  let stats = []

  if (isAdmin) {
    // Admin stats
    const [eventsResult, blogsResult, usersResult, contactResult] = await Promise.all([
      supabase.from("events").select("id", { count: "exact" }),
      supabase.from("blogs").select("id", { count: "exact" }),
      supabase.from("profiles").select("id", { count: "exact" }),
      supabase.from("contact_submissions").select("id", { count: "exact" }).eq("status", "unread"),
    ])

    stats = [
      {
        name: "Total Events",
        value: eventsResult.count || 0,
        icon: Calendar,
        description: "Published events",
      },
      {
        name: "Total Blogs",
        value: blogsResult.count || 0,
        icon: FileText,
        description: "All blog posts",
      },
      {
        name: "Total Users",
        value: usersResult.count || 0,
        icon: Users,
        description: "Registered users",
      },
      {
        name: "Unread Messages",
        value: contactResult.count || 0,
        icon: MessageSquare,
        description: "Contact submissions",
      },
    ]
  } else {
    // User stats
    const [userBlogsResult, pendingBlogsResult] = await Promise.all([
      supabase.from("blogs").select("id", { count: "exact" }).eq("author_id", user.id),
      supabase.from("blogs").select("id", { count: "exact" }).eq("author_id", user.id).eq("status", "pending"),
    ])

    stats = [
      {
        name: "My Blogs",
        value: userBlogsResult.count || 0,
        icon: PenTool,
        description: "Total blog posts",
      },
      {
        name: "Pending Approval",
        value: pendingBlogsResult.count || 0,
        icon: CheckSquare,
        description: "Awaiting review",
      },
    ]
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {profile.first_name || "User"}!</h1>
        <p className="mt-2 text-gray-600">
          {isAdmin
            ? "Manage your organization's content and users from this dashboard."
            : "Create and manage your blog posts from this dashboard."}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              {isAdmin ? "Common administrative tasks" : "Get started with your content"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isAdmin ? (
              <>
                <a
                  href="/dashboard/admin/events/new"
                  className="flex items-center p-3 text-sm font-medium text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <Calendar className="h-5 w-5 mr-3 text-emerald-600" />
                  Create New Event
                </a>
                <a
                  href="/dashboard/admin/blogs"
                  className="flex items-center p-3 text-sm font-medium text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <CheckSquare className="h-5 w-5 mr-3 text-emerald-600" />
                  Review Blog Posts
                </a>
                <a
                  href="/dashboard/admin/contact"
                  className="flex items-center p-3 text-sm font-medium text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <MessageSquare className="h-5 w-5 mr-3 text-emerald-600" />
                  Check Messages
                </a>
              </>
            ) : (
              <>
                <a
                  href="/dashboard/blogs/new"
                  className="flex items-center p-3 text-sm font-medium text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <PenTool className="h-5 w-5 mr-3 text-emerald-600" />
                  Write New Blog Post
                </a>
                <a
                  href="/dashboard/blogs"
                  className="flex items-center p-3 text-sm font-medium text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <FileText className="h-5 w-5 mr-3 text-emerald-600" />
                  Manage My Blogs
                </a>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Account created</p>
                  <p className="text-xs text-gray-500">Welcome to Acumen Haven!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
