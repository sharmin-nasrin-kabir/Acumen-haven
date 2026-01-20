"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { EventForm } from "@/components/admin/event-form"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import type { Event } from "@/types/events"

export default function EditEventPage() {
    const { id } = useParams()
    const [event, setEvent] = useState<Event | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        async function fetchEvent() {
            try {
                const { data, error } = await supabase
                    .from("events")
                    .select("*")
                    .eq("id", id)
                    .single()

                if (error) throw error
                setEvent(data)
            } catch {
                toast.error("Failed to load event")
                router.push("/admin/events")
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchEvent()
    }, [id, router, supabase])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
        )
    }

    if (!event) return null

    return (
        <div className="max-w-7xl mx-auto pb-20">
            <EventForm initialData={event} />
        </div>
    )
}
