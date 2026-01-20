import { EventForm } from "@/components/admin/event-form"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export default function NewEventPage() {
    return (
        <div className="max-w-7xl mx-auto pb-20 px-4">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6 py-2">
                <Link href="/admin" className="hover:text-emerald-600 flex items-center gap-1 transition-colors">
                    <Home className="h-3 w-3" /> Dashboard
                </Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/admin/events" className="hover:text-emerald-600 transition-colors">
                    Events
                </Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-slate-900">New Event</span>
            </nav>
            <EventForm />
        </div>
    )
}
