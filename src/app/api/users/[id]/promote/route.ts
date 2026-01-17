import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
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

  try {
    // Check if current user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (!profile || !["admin", "super_admin"].includes(profile.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Promote user to admin
    const { error } = await supabase
      .from("profiles")
      .update({
        role: "admin",
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)

    if (error) throw error

    return NextResponse.redirect(new URL("/dashboard/admin/users", request.url))
  } catch (error: any) {
    console.error("Error promoting user:", error)
    return NextResponse.json({ error: error.message || "Failed to promote user" }, { status: 500 })
  }
}
