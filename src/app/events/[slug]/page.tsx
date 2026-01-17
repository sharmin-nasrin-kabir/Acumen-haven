import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Clock, ArrowLeft, Share2, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import type { Event } from "@/types/events"

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  let event: Event | null = null
  let error: string | null = null

  try {
    const supabase = await createClient()

    const { data: eventData, error: eventError } = await supabase
      .from("events")
      .select("*")
      .or(`slug.eq.${params.slug},id.eq.${params.slug}`)
      .eq("is_published", true)
      .single()

    if (eventError) {
      if (eventError.code === "PGRST116") {
        notFound()
      }
      throw eventError
    }

    event = eventData
  } catch (err) {
    if (err instanceof Error && err.message === "Event not found") {
      notFound()
    }
    error = err instanceof Error ? err.message : "Failed to load event"
    console.error("Error fetching event:", error)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Error Loading Event</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <Button asChild>
            <Link href="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!event) {
    notFound()
  }

  const isUpcoming = new Date(event.date) >= new Date()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30">
      {/* Back Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="text-slate-600 hover:text-emerald-600">
            <Link href="/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>
        </div>
      </div>

      {/* Event Header */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={event.banner_image || "/placeholder.svg?height=400&width=800&query=event banner"}
                  alt={event.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-6 left-6">
                  <Badge className={isUpcoming ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}>
                    {event.category || "Event"}
                  </Badge>
                </div>
                <div className="absolute top-6 right-6">
                  <Badge variant="outline" className="bg-white/90">
                    {event.chapter} Chapter
                  </Badge>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{event.title}</h1>
                </div>

                <div className="prose prose-slate max-w-none">
                  {event.description ? (
                    <p className="text-xl text-slate-600 leading-relaxed whitespace-pre-line">{event.description}</p>
                  ) : (
                    <p className="text-slate-600 italic">
                      More details about this event will be available soon. Please check back later or contact us for
                      more information.
                    </p>
                  )}
                </div>

                {event.gallery_images && event.gallery_images.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-800">Photo Gallery</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {event.gallery_images.map((imageUrl, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg">
                          <Image
                            src={imageUrl || "/placeholder.svg?height=200&width=300&query=gallery image"}
                            alt={`${event.title} gallery image ${index + 1}`}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Info Card */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Event Information</h3>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">Date</p>
                        <p className="text-slate-600">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">Time</p>
                        <p className="text-slate-600">{event.time || "Time TBD"}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-800">Location</p>
                        <p className="text-slate-600">{event.location || "Location TBD"}</p>
                      </div>
                    </div>

                    {event.is_featured && (
                      <div className="flex items-start space-x-3">
                        <div className="h-5 w-5 bg-emerald-600 rounded-full mt-0.5 flex items-center justify-center">
                          <div className="h-2 w-2 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">Featured Event</p>
                          <p className="text-slate-600">This is a highlighted event</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Contact Information</h3>
                  <div className="space-y-2">
                    <p className="text-slate-600">
                      <span className="font-medium">Chapter:</span> {event.chapter}
                    </p>
                    <p className="text-slate-600">
                      <span className="font-medium">Email:</span>{" "}
                      {event.chapter === "US" ? "us@acumenhaven.org" : "bangladesh@acumenhaven.org"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                {isUpcoming && event.registration_link && (
                  <Button className="w-full" size="lg" asChild>
                    <Link href={event.registration_link} target="_blank" rel="noopener noreferrer">
                      Register for Event
                    </Link>
                  </Button>
                )}

                {isUpcoming && !event.registration_link && (
                  <Button className="w-full" size="lg" disabled>
                    Registration Coming Soon
                  </Button>
                )}

                <Button variant="outline" className="w-full bg-transparent">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Event
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Download Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
