"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
    Loader2,
    Plus,
    Search,
    MapPin,
    Calendar,
    Clock,
    ExternalLink,
    MoreVertical,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Globe
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import type { Event } from "@/types/events"

export default function EventsAdminPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterChapter, setFilterChapter] = useState<string>("all")

    const supabase = createClient()

    useEffect(() => {
        fetchEvents()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function fetchEvents() {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from("events")
                .select("*")
                .order("date", { ascending: false })

            if (error) throw error
            setEvents(data || [])
        } catch (err: any) {
            toast.error(err.message || "Failed to load events")
        } finally {
            setLoading(false)
        }
    }

    async function togglePublished(id: string, currentStatus: boolean) {
        try {
            const { error } = await supabase
                .from("events")
                .update({ is_published: !currentStatus })
                .eq("id", id)

            if (error) throw error

            setEvents(events.map(e => e.id === id ? { ...e, is_published: !currentStatus } : e))
            toast.success(`Event ${!currentStatus ? 'published' : 'unpublished'}`)
        } catch (err: any) {
            toast.error(err.message)
        }
    }

    async function deleteEvent(id: string) {
        if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) return

        try {
            const { error } = await supabase
                .from("events")
                .delete()
                .eq("id", id)

            if (error) throw error

            setEvents(events.filter(e => e.id !== id))
            toast.success("Event deleted successfully")
        } catch (err: any) {
            toast.error(err.message)
        }
    }

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesChapter = filterChapter === "all" || event.chapter === filterChapter
        return matchesSearch && matchesChapter
    })

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Events Management</h2>
                    <p className="text-slate-500 mt-2">Create, edit and manage upcoming organization events.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/events/new">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200 transition-all">
                            <Plus className="mr-2 h-4 w-4" /> Add New Event
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search events title or location..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={filterChapter === "all" ? "default" : "outline"}
                        onClick={() => setFilterChapter("all")}
                        size="sm"
                    >
                        All
                    </Button>
                    <Button
                        variant={filterChapter === "Bangladesh" ? "default" : "outline"}
                        onClick={() => setFilterChapter("Bangladesh")}
                        size="sm"
                    >
                        Bangladesh
                    </Button>
                    <Button
                        variant={filterChapter === "US" ? "default" : "outline"}
                        onClick={() => setFilterChapter("US")}
                        size="sm"
                    >
                        US
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden border-slate-200/60 hover:shadow-xl transition-all group">
                        <div className="relative h-48 w-full bg-slate-100">
                            <Image
                                src={event.banner_image || "/placeholder-event.png"}
                                alt={event.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-4 left-4 flex gap-2">
                                <Badge variant={event.is_published ? "default" : "secondary"} className={event.is_published ? "bg-emerald-500 hover:bg-emerald-600" : "bg-slate-500 text-white"}>
                                    {event.is_published ? "Published" : "Draft"}
                                </Badge>
                                <Badge variant="outline" className={event.status === "Upcoming" ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-slate-50 text-slate-600 border-slate-200"}>
                                    {event.status}
                                </Badge>
                                {event.is_featured && (
                                    <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                                        Featured
                                    </Badge>
                                )}
                            </div>
                            <div className="absolute top-4 right-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/90 hover:bg-white border-0 shadow-sm">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40">
                                        <DropdownMenuItem asChild>
                                            <Link href={`/admin/events/${event.id}/edit`} className="flex items-center">
                                                <Edit className="mr-2 h-4 w-4" /> Edit Event
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => togglePublished(event.id, event.is_published)}>
                                            {event.is_published ? (
                                                <>
                                                    <XCircle className="mr-2 h-4 w-4 text-amber-500" /> Unpublish
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" /> Publish
                                                </>
                                            )}
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => deleteEvent(event.id)}>
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete Event
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <CardContent className="p-5 space-y-4">
                            <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-emerald-600 gap-2">
                                <Globe className="h-3 w-3" />
                                {event.chapter} Chapter
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1">
                                {event.title}
                            </h3>

                            <div className="space-y-2 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-slate-400" />
                                    {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                                {event.time && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-slate-400" />
                                        {event.time}
                                    </div>
                                )}
                                {event.location && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-slate-400" />
                                        <span className="line-clamp-1">{event.location}</span>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-slate-50 flex items-center justify-between mt-auto">
                                <Link
                                    href={`/events/${event.slug || event.id}`}
                                    target="_blank"
                                    className="text-xs font-medium text-slate-400 hover:text-emerald-600 flex items-center gap-1 transition-colors"
                                >
                                    <ExternalLink className="h-3 w-3" /> View Public Page
                                </Link>
                                <div className="flex gap-2">
                                    <Link href={`/admin/events/${event.id}/edit`}>
                                        <Button variant="ghost" size="sm" className="h-8 px-2 text-slate-400 hover:text-emerald-600">
                                            Edit
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {filteredEvents.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                        <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-sm mb-4">
                            <Calendar className="h-8 w-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">No events found</h3>
                        <p className="text-slate-500 max-w-xs mx-auto mt-2">
                            {searchQuery ? "Try adjusting your search query or filters." : "Start by creating your first organization event."}
                        </p>
                        {!searchQuery && (
                            <Link href="/admin/events/new" className="mt-6 inline-block">
                                <Button variant="outline">
                                    <Plus className="mr-2 h-4 w-4" /> Create Event
                                </Button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
