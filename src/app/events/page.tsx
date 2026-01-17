"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { eventsApi } from "@/lib/api/events"
import type { Event } from "@/types/events"

function EventCard({ event, isPast = false }: { event: Event; isPast?: boolean }) {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg rounded-3xl overflow-hidden">
      <div className="relative overflow-hidden">
        <Image
          src={event.banner_image || "/placeholder.svg"}
          alt={event.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
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
          <Link href={`/events/${event.id}`}>
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
                    className={`w-10 rounded-2xl font-semibold ${
                      currentPage === page
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

export default function EventsPage() {
  const [usEvents, setUsEvents] = useState<Event[]>([])
  const [bangladeshEvents, setBangladeshEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true)
        const [usEventsData, bangladeshEventsData] = await Promise.all([
          eventsApi.getAll({ chapter: "US" }),
          eventsApi.getAll({ chapter: "Bangladesh" }),
        ])

        setUsEvents(usEventsData)
        setBangladeshEvents(bangladeshEventsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load events")
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  const separateEventsByDate = (events: Event[]) => {
    const now = new Date()
    const upcoming = events.filter((event) => new Date(event.date) >= now)
    const past = events.filter((event) => new Date(event.date) < now)
    return { upcoming, past }
  }

  const { upcoming: usUpcoming, past: usPast } = separateEventsByDate(usEvents)
  const { upcoming: bangladeshUpcoming, past: bangladeshPast } = separateEventsByDate(bangladeshEvents)

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            Community Events
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 mb-6">Our Events</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join us in our mission to create positive change through community engagement, education, and climate action
            across the US and Bangladesh.
          </p>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading events...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 mb-4">Error loading events: {error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="us" className="w-full">
              <div className="flex justify-center mb-12">
                <TabsList className="grid w-full max-w-md grid-cols-2 h-12 bg-white shadow-lg rounded-2xl border border-slate-200">
                  <TabsTrigger
                    value="us"
                    className="text-base font-semibold rounded-xl data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                  >
                    US Chapter
                  </TabsTrigger>
                  <TabsTrigger
                    value="bangladesh"
                    className="text-base font-semibold rounded-xl data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                  >
                    Bangladesh Chapter
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="us" className="space-y-12">
                <EventSection events={usUpcoming} title="Upcoming Events" isPast={false} />
                <EventSection events={usPast} title="Past Events" isPast={true} />
              </TabsContent>

              <TabsContent value="bangladesh" className="space-y-12">
                <EventSection events={bangladeshUpcoming} title="Upcoming Events" isPast={false} />
                <EventSection events={bangladeshPast} title="Past Events" isPast={true} />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </section>
    </div>
  )
}
