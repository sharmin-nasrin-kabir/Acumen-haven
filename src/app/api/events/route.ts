import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import type { CreateEventData } from "@/types/events"

// GET /api/events - Get all events with optional filtering
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { searchParams } = new URL(request.url)

    // Build query with optional filters
    let query = supabase.from("events").select("*").eq("is_published", true).order("date", { ascending: true })

    // Filter by chapter if specified
    const chapter = searchParams.get("chapter")
    if (chapter && (chapter === "US" || chapter === "Bangladesh")) {
      query = query.eq("chapter", chapter)
    }

    // Filter by featured status if specified
    const featured = searchParams.get("featured")
    if (featured === "true") {
      query = query.eq("is_featured", true)
    }

    // Limit results if specified
    const limit = searchParams.get("limit")
    if (limit) {
      const limitNum = Number.parseInt(limit, 10)
      if (!isNaN(limitNum) && limitNum > 0) {
        query = query.limit(limitNum)
      }
    }

    const { data: events, error } = await query

    if (error) {
      console.error("Error fetching events:", error)
      return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
    }

    return NextResponse.json({ events })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST /api/events - Create new event
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const body: CreateEventData = await request.json()

    // Validate required fields
    if (!body.title || !body.date || !body.chapter) {
      return NextResponse.json({ error: "Missing required fields: title, date, chapter" }, { status: 400 })
    }

    // Validate chapter value
    if (body.chapter !== "US" && body.chapter !== "Bangladesh") {
      return NextResponse.json({ error: 'Chapter must be either "US" or "Bangladesh"' }, { status: 400 })
    }

    const { data: event, error } = await supabase
      .from("events")
      .insert([
        {
          ...body,
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Error creating event:", error)
      return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
    }

    return NextResponse.json({ event }, { status: 201 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
