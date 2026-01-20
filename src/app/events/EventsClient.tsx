"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Event } from "@/types/events"

function EventCard({ event, isPast = false }: { event: Event; isPast?: boolean }) {
    return (
        <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg rounded-3xl overflow-hidden">
            <div className="relative aspect-video overflow-hidden">
                <Image
                    src={event.banner_image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 z-10">
                    <Badge
                        variant={isPast ? "secondary" : "default"}
                        className={
                            isPast ? "bg-slate-100 text-slate-600 rounded-full" : "bg-emerald-100 text-emerald-700 rounded-full"
                        }
                    >
                        {event.category || "Event"}
                    </Badge>
                </div>
                {isPast && (
                    <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-white/90 text-slate-600 border-slate-300 rounded-full">
                            Completed
                        </Badge>
                    </div>
                )}
            </div>

            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {event.title}
                </CardTitle>
                <CardDescription className="text-slate-600 line-clamp-2">{event.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>

                <div className="flex items-center text-sm text-slate-600">
                    <Clock className="h-4 w-4 mr-2 text-emerald-600" />
                    {event.time || "Time TBD"}
                </div>

                <div className="flex items-center text-sm text-slate-600">
                    <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                    {event.location || "Location TBD"}
                </div>
            </CardContent>

            <CardFooter className="pt-0">
                <Button
                    asChild
                    className="w-full group/btn bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-white"
                >
                    <Link href={`/events/${event.slug || event.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

function EventSection({ events, title, isPast = false }: { events: Event[]; title: string; isPast?: boolean }) {
    const [currentPage, setCurrentPage] = useState(1)
    const eventsPerPage = 6
    const totalPages = Math.ceil(events.length / eventsPerPage)
    const startIndex = (currentPage - 1) * eventsPerPage
    const currentEvents = events.slice(startIndex, startIndex + eventsPerPage)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
                <Badge variant="outline" className="text-sm">
                    {events.length} {events.length === 1 ? "event" : "events"}
                </Badge>
            </div>

            {events.length === 0 ? (
                <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-500 text-lg">No {isPast ? "past" : "upcoming"} events at this time.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentEvents.map((event) => (
                            <EventCard key={event.id} event={event} isPast={isPast} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-2 mt-8">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="bg-transparent border-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 rounded-2xl font-semibold"
                            >
                                Previous
                            </Button>

                            <div className="flex space-x-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 rounded-2xl font-semibold ${currentPage === page
                                            ? "bg-emerald-600 hover:bg-emerald-700"
                                            : "bg-transparent border-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300"
                                            }`}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>

                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="bg-transparent border-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 rounded-2xl font-semibold"
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

interface EventsClientProps {
    initialUsEvents: Event[];
    initialBangladeshEvents: Event[];
    settings: {
        events_page_bg: string;
        events_page_title: string;
        events_page_description: string;
    };
}

export default function EventsClient({ initialUsEvents, initialBangladeshEvents, settings }: EventsClientProps) {
    const separateEventsByStatus = (events: Event[]) => {
        const upcoming = events.filter((event) => event.status === "Upcoming")
        const past = events.filter((event) => event.status === "Past")
        return { upcoming, past }
    }

    const { upcoming: bangladeshUpcoming, past: bangladeshPast } = separateEventsByStatus(initialBangladeshEvents)
    const { upcoming: usUpcoming, past: usPast } = separateEventsByStatus(initialUsEvents)

    return (
        <div className="w-full bg-slate-50">
            {/* Flexible Hero Section */}
            <section className="relative min-h-[40vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden py-20">
                {/* Dynamic Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={settings.events_page_bg}
                        alt="Events Background"
                        fill
                        className="object-cover scale-100 animate-slow-zoom"
                        priority
                        quality={85}
                        sizes="100vw"
                    />
                    {/* Cinematic Dark Overlay - Extremely Subtle */}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10 px-6 mt-8 md:mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <Badge className="bg-emerald-500/20 backdrop-blur-md text-emerald-100 border-emerald-500/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full text-[10px] md:text-sm font-bold mb-4 md:mb-8 tracking-widest uppercase">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                        Empowering Communities
                    </Badge>
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-black leading-tight mb-6 md:mb-10 tracking-tighter filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        <span className="bg-clip-text text-transparent bg-[linear-gradient(to_right,#34d399,#3b82f6,#a855f7,#ec4899,#34d399)] bg-[length:200%_auto] animate-rgb-text">
                            {settings.events_page_title}
                        </span>
                    </h1>
                    <div className="relative inline-block">
                        <div className="absolute -inset-4 bg-emerald-950/20 blur-2xl rounded-full" />
                        <p className="relative text-lg md:text-2xl lg:text-3xl text-emerald-50 max-w-4xl mx-auto leading-relaxed font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                            {settings.events_page_description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Events Content */}
            <section className="pt-20 pb-20 md:pt-32 md:pb-32 px-4 sm:px-6 relative z-20">
                <div className="max-w-7xl mx-auto">
                    <Tabs defaultValue="bangladesh" className="w-full space-y-16">
                        <div className="bg-white/40 backdrop-blur-sm rounded-3xl md:rounded-[3rem] p-4 md:p-10 border border-white/60">
                            <div className="flex flex-col items-center mb-12">
                                <TabsList className="inline-flex p-1 bg-white/60 backdrop-blur-xl shadow-lg rounded-2xl md:rounded-[2rem] border border-white/40 w-full max-w-md md:max-w-none md:w-auto">
                                    <TabsTrigger
                                        value="bangladesh"
                                        className="flex-1 md:flex-none px-4 md:px-10 py-3 md:py-4 text-sm md:text-lg font-black rounded-xl md:rounded-[1.5rem] transition-all data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-600/20 uppercase tracking-widest"
                                    >
                                        Bangladesh
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="us"
                                        className="flex-1 md:flex-none px-4 md:px-10 py-3 md:py-4 text-sm md:text-lg font-black rounded-xl md:rounded-[1.5rem] transition-all data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-emerald-600/20 uppercase tracking-widest"
                                    >
                                        US
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="bangladesh" className="space-y-24 mt-0 outline-none">
                                <EventSection events={bangladeshUpcoming} title="Upcoming in Bangladesh" isPast={false} />
                                <div className="pt-16 border-t border-slate-200/60">
                                    <EventSection events={bangladeshPast} title="Success Stories & Past Events" isPast={true} />
                                </div>
                            </TabsContent>

                            <TabsContent value="us" className="space-y-24 mt-0 outline-none">
                                <EventSection events={usUpcoming} title="Upcoming in United States" isPast={false} />
                                <div className="pt-16 border-t border-slate-200/60">
                                    <EventSection events={usPast} title="Success Stories & Past Events" isPast={true} />
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </section>

            <style jsx global>{`
        @keyframes rgb-text {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-rgb-text {
          animation: rgb-text 6s linear infinite;
        }
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
      `}</style>
        </div>
    )
}
