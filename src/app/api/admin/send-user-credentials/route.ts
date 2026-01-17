import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, password } = await request.json()

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

    // Verify admin permissions
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

    if (!profile || !["admin", "super_admin"].includes(profile.role)) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    // Send email with credentials (this would typically use a service like Resend, SendGrid, etc.)
    // For now, we'll just log the credentials and return success
    console.log("User credentials to be sent:", {
      email,
      firstName,
      lastName,
      password,
      loginUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/login`,
    })

    // In a real implementation, you would send an email here
    // Example with a hypothetical email service:
    /*
    await emailService.send({
      to: email,
      subject: 'Welcome to Acumen Haven - Your Account Details',
      template: 'user-credentials',
      data: {
        firstName,
        lastName,
        email,
        password,
        loginUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/login`
      }
    })
    */

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending user credentials:", error)
    return NextResponse.json({ error: "Failed to send credentials" }, { status: 500 })
  }
}
