import { createServerSupabaseClient } from "@/lib/supabase"
import EventsClient from "./EventsClient"
import type { Event } from "@/types/events"

export const revalidate = 60 // Revalidate every 60 seconds

export default async function EventsPage() {
  const supabase = await createServerSupabaseClient()

  // Fetch settings and events in parallel to prevent waterfalls
  const [settingsResult, usEventsResult, bangladeshEventsResult] = await Promise.all([
    supabase
      .from("site_settings")
      .select("*")
      .in("key", ["events_page_bg", "events_page_title", "events_page_description"]),
    supabase.from("events").select("*").eq("chapter", "US").order("date", { ascending: true }),
    supabase.from("events").select("*").eq("chapter", "Bangladesh").order("date", { ascending: true })
  ])

  const settings = {
    events_page_bg: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
    events_page_title: "Our Events",
    events_page_description: "Join us in our mission to create positive change through community engagement, education, and climate action across the US and Bangladesh."
  }

  if (settingsResult.data) {
    settingsResult.data.forEach((s: any) => {
      // @ts-ignore
      settings[s.key] = s.value
    })
  }

  const usEvents = (usEventsResult.data || []) as Event[]
  const bangladeshEvents = (bangladeshEventsResult.data || []) as Event[]

  return (
    <EventsClient
      initialUsEvents={usEvents}
      initialBangladeshEvents={bangladeshEvents}
      settings={settings}
    />
  )
}
