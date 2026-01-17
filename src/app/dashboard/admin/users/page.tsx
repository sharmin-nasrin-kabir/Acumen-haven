import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Mail, Calendar, Shield, UserCheck, UserX, Plus } from "lucide-react"
import { UserCreateDialog } from "@/components/dashboard/user-create-dialog"
import { UserEditDialog } from "@/components/dashboard/user-edit-dialog"
import { UserDeleteButton } from "@/components/dashboard/user-delete-button"

export default async function AdminUsersPage() {
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

  if (!profile || !["admin", "super_admin"].includes(profile.role)) {
    redirect("/dashboard")
  }

  // Get all users
  const { data: users, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching users:", error)
  }

  const adminUsers = users?.filter((u) => ["admin", "super_admin"].includes(u.role)) || []
  const regularUsers = users?.filter((u) => u.role === "user") || []
  const totalUsers = users?.length || 0

  const getRoleColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "destructive"
      case "admin":
        return "default"
      case "user":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Super Admin"
      case "admin":
        return "Admin"
      case "user":
        return "User"
      default:
        return role
    }
  }

  const getInitials = (firstName?: string, lastName?: string, email?: string) => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    }
    if (email) {
      return email.charAt(0).toUpperCase()
    }
    return "U"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="mt-2 text-gray-600">Manage user accounts and permissions across the platform.</p>
        </div>
        <UserCreateDialog>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="h-4 w-4 mr-2" />
            Create New User
          </Button>
        </UserCreateDialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Regular Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{regularUsers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Administrators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{adminUsers.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Users ({totalUsers})</h2>
        {users && users.length > 0 ? (
          <div className="space-y-4">
            {users.map((userProfile) => (
              <Card key={userProfile.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-emerald-100 text-emerald-700">
                          {getInitials(userProfile.first_name, userProfile.last_name, userProfile.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {userProfile.first_name && userProfile.last_name
                            ? `${userProfile.first_name} ${userProfile.last_name}`
                            : userProfile.email}
                        </CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {userProfile.email}
                        </CardDescription>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Joined {new Date(userProfile.created_at).toLocaleDateString()}
                          </div>
                          {userProfile.auto_approve_blogs && (
                            <div className="flex items-center gap-1">
                              <UserCheck className="h-4 w-4" />
                              Auto-approve blogs
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getRoleColor(userProfile.role)}>
                        <Shield className="h-3 w-3 mr-1" />
                        {getRoleText(userProfile.role)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <UserEditDialog user={userProfile}>
                      <Button variant="outline" size="sm">
                        Edit User
                      </Button>
                    </UserEditDialog>
                    {userProfile.role === "user" && (
                      <form action={`/api/users/${userProfile.id}/promote`} method="POST">
                        <Button type="submit" variant="outline" size="sm">
                          Promote to Admin
                        </Button>
                      </form>
                    )}
                    {userProfile.id !== user.id && (
                      <UserDeleteButton
                        userId={userProfile.id}
                        userName={
                          userProfile.first_name && userProfile.last_name
                            ? `${userProfile.first_name} ${userProfile.last_name}`
                            : userProfile.email || "Unknown User"
                        }
                      >
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <UserX className="h-4 w-4 mr-1" />
                          Deactivate
                        </Button>
                      </UserDeleteButton>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No users found.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
