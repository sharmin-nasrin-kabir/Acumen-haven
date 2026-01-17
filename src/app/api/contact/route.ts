import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    // Insert contact submission
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      subject: subject || null,
      message,
      status: "unread",
    })

    if (error) {
      console.error("Error inserting contact submission:", error)
      return NextResponse.json({ error: "Failed to submit message" }, { status: 500 })
    }

    return NextResponse.json({ message: "Message submitted successfully" })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
