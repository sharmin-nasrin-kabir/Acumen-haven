import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { blogId, status, rejectionReason } = await request.json()

    if (!blogId || !status) {
      return NextResponse.json({ error: "Blog ID and status are required" }, { status: 400 })
    }

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

    // Verify user is authenticated and is admin
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (!profile || profile.role === "user") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Prepare update data
    const updateData: any = {
      status,
      updated_at: new Date().toISOString(),
    }

    // If approving, set published_at
    if (status === "approved") {
      updateData.published_at = new Date().toISOString()
    }

    // If rejecting, clear published_at and add rejection reason
    if (status === "rejected") {
      updateData.published_at = null
      if (rejectionReason) {
        updateData.rejection_reason = rejectionReason
      }
    }

    // If resetting to pending, clear published_at and rejection_reason
    if (status === "pending") {
      updateData.published_at = null
      updateData.rejection_reason = null
    }

    // Update the blog
    const { error } = await supabase.from("blogs").update(updateData).eq("id", blogId)

    if (error) {
      console.error("Error updating blog:", error)
      return NextResponse.json({ error: "Failed to update blog status" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in blog approval API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
