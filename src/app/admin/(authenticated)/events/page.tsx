"use client"

import { useState, useEffect, useCallback } from "react"
import { useDropzone } from 'react-dropzone'
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
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
    Image as ImageIcon,
    Save,
    Sparkles
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
    const [savingSettings, setSavingSettings] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [settings, setSettings] = useState({
        events_page_bg: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
        events_page_title: "Our Events",
        events_page_description: "Join us in our mission to create positive change through community engagement, education, and climate action."
    })
    const [initialSettings, setInitialSettings] = useState<any>(null)

    const supabase = createClient()

    useEffect(() => {
        const loadAllData = async () => {
            setLoading(true)
            await Promise.all([fetchEvents(), fetchSettings()])
            setLoading(false)
        }
        loadAllData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function fetchSettings() {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .in('key', ['events_page_bg', 'events_page_title', 'events_page_description'])

            if (error) throw error

            if (data && data.length > 0) {
                const fetchedSettings: any = { ...settings }
                data.forEach(item => {
                    fetchedSettings[item.key] = item.value
                })
                setSettings(fetchedSettings)
                setInitialSettings(fetchedSettings)
            }
        } catch (err: any) {
            console.error("Error fetching settings:", err.message)
        }
    }

    async function fetchEvents() {
        try {
            const { data, error } = await supabase
                .from("events")
                .select("*")
                .order("date", { ascending: false })

            if (error) throw error
            setEvents(data || [])
        } catch (err: any) {
            toast.error(err.message || "Failed to load events")
        }
    }

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("type", "settings")

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        })

        if (!response.ok) {
            throw new Error("Failed to upload image")
        }

        const data = await response.json()
        return data.url
    }

    const processFile = async (file: File) => {
        try {
            setSavingSettings(true)
            const url = await uploadImage(file)
            setSettings(prev => ({ ...prev, events_page_bg: url }))
            toast.success("Image uploaded. Click 'Update Identity Settings' to save.")
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setSavingSettings(false)
        }
    }

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (file) await processFile(file)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: false,
        disabled: savingSettings
    })

    async function handleSaveSettings() {
        setSavingSettings(true)
        try {
            const dataToSave = Object.entries(settings).map(([key, value]) => ({
                key,
                value
            }))

            const { error } = await supabase.from('site_settings').upsert(dataToSave)
            if (error) throw error

            toast.success("Page settings updated successfully!")
            setInitialSettings({ ...settings })
        } catch (err: any) {
            toast.error(err.message)
        } finally {
            setSavingSettings(false)
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

    const settingsChanged = initialSettings ? (
        settings.events_page_bg !== initialSettings.events_page_bg ||
        settings.events_page_title !== initialSettings.events_page_title ||
        settings.events_page_description !== initialSettings.events_page_description
    ) : false;

    const filteredEvents = events.filter(event => {
        return event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location?.toLowerCase().includes(searchQuery.toLowerCase())
    })

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-slate-900">Events Engine</h2>
                    <p className="text-slate-500 mt-2 font-medium">Control the visual identity and listing of your community gatherings.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/admin/events/new">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-200 h-12 px-8 rounded-2xl font-bold transition-all transform hover:scale-105 active:scale-95">
                            <Plus className="mr-2 h-5 w-5" /> New Event
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Background Management Section */}
            <Card className="border-slate-200/60 shadow-sm overflow-hidden rounded-[2.5rem] bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="p-8 lg:p-12 space-y-8">
                        <div>
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-4">
                                Page Visuals
                            </Badge>
                            <h3 className="text-2xl font-bold text-slate-900">Events Landing Identity</h3>
                            <p className="text-slate-500 mt-2">Manage how users see the events page header.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold flex items-center">
                                    <Sparkles className="h-4 w-4 mr-2 text-emerald-500" />
                                    Main Page Title
                                </Label>
                                <Input
                                    value={settings.events_page_title}
                                    onChange={(e) => setSettings(prev => ({ ...prev, events_page_title: e.target.value }))}
                                    className="rounded-xl border-slate-200 focus:ring-emerald-500 h-12 font-bold"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-700 font-bold flex items-center">
                                    <Sparkles className="h-4 w-4 mr-2 text-emerald-500" />
                                    Hero Description
                                </Label>
                                <Input
                                    value={settings.events_page_description}
                                    onChange={(e) => setSettings(prev => ({ ...prev, events_page_description: e.target.value }))}
                                    className="rounded-xl border-slate-200 focus:ring-emerald-500 h-12"
                                />
                            </div>

                            <Button
                                onClick={handleSaveSettings}
                                disabled={savingSettings || !settingsChanged}
                                className={`w-full h-12 rounded-xl font-bold transition-all shadow-lg ${savingSettings || !settingsChanged
                                    ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none border border-slate-200"
                                    : "bg-slate-900 hover:bg-slate-800 text-white"
                                    }`}
                            >
                                {savingSettings ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                Update Identity Settings
                            </Button>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-8 lg:p-12 flex flex-col items-center justify-center">
                        <div
                            {...getRootProps()}
                            className={`
                                relative w-full aspect-video rounded-3xl overflow-hidden border-4 transition-all duration-300 shadow-2xl group cursor-pointer
                                ${isDragActive ? 'border-emerald-500 scale-[1.02] bg-emerald-50' : 'border-white'}
                                ${savingSettings ? 'opacity-50' : 'hover:border-emerald-200'}
                            `}
                        >
                            <input {...getInputProps()} />
                            <Image
                                src={settings.events_page_bg}
                                alt="Background Preview"
                                fill
                                className={`object-cover transition-transform duration-700 ${isDragActive ? 'scale-110 blur-[2px]' : 'group-hover:scale-105'}`}
                            />

                            <div className={`
                                absolute inset-0 flex flex-col items-center justify-center transition-all duration-300
                                ${isDragActive ? 'bg-emerald-600/20 opacity-100' : 'bg-black/40 opacity-0 group-hover:opacity-100'}
                            `}>
                                <div className="bg-white text-slate-900 px-6 py-3 rounded-2xl text-sm font-bold shadow-2xl flex items-center transform transition-transform group-hover:scale-105">
                                    {savingSettings ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <ImageIcon className="h-4 w-4 mr-2" />
                                            {isDragActive ? 'Drop image here' : 'Change Hero Background'}
                                        </>
                                    )}
                                </div>
                                {!isDragActive && !savingSettings && (
                                    <p className="text-white text-[10px] mt-3 font-bold uppercase tracking-[0.2em] drop-shadow-md">
                                        or drag and drop anywhere in this area
                                    </p>
                                )}
                            </div>
                        </div>
                        <p className="text-slate-400 text-xs mt-4 font-bold uppercase tracking-widest text-center">
                            Hero Background Preview
                        </p>
                    </div>
                </div>
            </Card>

            <div className="pt-8 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center uppercase tracking-tighter">
                        <Calendar className="mr-3 h-6 w-6 text-emerald-600" />
                        Event Listings
                    </h3>
                </div>

                <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search events title or location..."
                            className="pl-10 h-12 rounded-xl border-slate-100 bg-slate-50/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <Card key={event.id} className="overflow-hidden border-slate-200/60 hover:shadow-xl transition-all group rounded-3xl">
                            <div className="relative h-48 w-full bg-slate-100">
                                <Image
                                    src={event.banner_image || "/placeholder-event.png"}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <Badge variant={event.is_published ? "default" : "secondary"} className={event.is_published ? "bg-emerald-500 hover:bg-emerald-600 rounded-full" : "bg-slate-500 text-white rounded-full"}>
                                        {event.is_published ? "Published" : "Draft"}
                                    </Badge>
                                    <Badge variant="outline" className={event.status === "Upcoming" ? "bg-blue-50 text-blue-600 border-blue-200 rounded-full" : "bg-slate-50 text-slate-600 border-slate-200 rounded-full"}>
                                        {event.status}
                                    </Badge>
                                </div>
                                <div className="absolute top-4 right-4 text-white">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/90 hover:bg-white border-0 shadow-sm text-slate-900">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-44 rounded-2xl p-2 shadow-2xl border-slate-100">
                                            <DropdownMenuItem asChild className="rounded-xl">
                                                <Link href={`/admin/events/${event.id}/edit`} className="flex items-center">
                                                    <Edit className="mr-2 h-4 w-4" /> Edit Event
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => togglePublished(event.id, event.is_published)} className="rounded-xl">
                                                {event.is_published ? (
                                                    <div className="flex items-center text-amber-600">
                                                        <XCircle className="mr-2 h-4 w-4" /> Unpublish
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center text-emerald-600">
                                                        <CheckCircle className="mr-2 h-4 w-4" /> Publish Now
                                                    </div>
                                                )}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600 focus:text-red-600 rounded-xl" onClick={() => deleteEvent(event.id)}>
                                                <Trash2 className="mr-2 h-4 w-4" /> Delete Permanently
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            <CardContent className="p-6 space-y-4">


                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 leading-tight">
                                    {event.title}
                                </h3>

                                <div className="space-y-3 pt-2 text-sm text-slate-500 font-medium">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-slate-100 p-2 rounded-lg">
                                            <Calendar className="h-4 w-4 text-slate-600" />
                                        </div>
                                        {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </div>
                                    {event.time && (
                                        <div className="flex items-center gap-3">
                                            <div className="bg-slate-100 p-2 rounded-lg">
                                                <Clock className="h-4 w-4 text-slate-600" />
                                            </div>
                                            {event.time}
                                        </div>
                                    )}
                                    {event.location && (
                                        <div className="flex items-center gap-3">
                                            <div className="bg-slate-100 p-2 rounded-lg">
                                                <MapPin className="h-4 w-4 text-slate-600" />
                                            </div>
                                            <span className="line-clamp-1">{event.location}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                    <Link
                                        href={`/events/${event.slug || event.id}`}
                                        target="_blank"
                                        className="text-xs font-bold text-slate-400 hover:text-emerald-600 flex items-center gap-2 transition-all group/link"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5 group-hover/link:scale-110 transition-transform" />
                                        VISIT PUBLIC PAGE
                                    </Link>
                                    <Link href={`/admin/events/${event.id}/edit`}>
                                        <Button variant="ghost" size="sm" className="h-9 px-4 text-slate-600 hover:text-emerald-600 font-bold rounded-xl hover:bg-emerald-50">
                                            EDIT
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {filteredEvents.length === 0 && (
                        <div className="col-span-full py-24 text-center bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-200">
                            <div className="bg-white p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-xl mb-6">
                                <Calendar className="h-10 w-10 text-slate-300" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">No events found</h3>
                            <p className="text-slate-500 max-w-sm mx-auto mt-3 font-medium">
                                {searchQuery ? "Try adjusting your search query or filters to find what you're looking for." : "Your events engine is idle. Start by creating your first community gathering."}
                            </p>
                            {!searchQuery && (
                                <Link href="/admin/events/new" className="mt-8 inline-block">
                                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white h-12 px-8 rounded-2xl font-bold shadow-lg shadow-emerald-200">
                                        <Plus className="mr-2 h-5 w-5" /> Launch First Event
                                    </Button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
