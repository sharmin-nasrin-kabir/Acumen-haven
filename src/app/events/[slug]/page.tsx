import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import type { Event } from "@/types/events"
import { EventActions } from "@/components/events/event-actions"
import { Facebook, Twitter, Instagram, Linkedin, Mail as MailIcon } from "lucide-react"

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params // AWAIT params first!
  let event: Event | null = null
  let error: string | null = null
  let debugInfo: any = null

  try {
    const supabase = await createClient()

    // Simple: Try by slug first, then by ID
    let { data: eventData } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .maybeSingle()

    // If not found by slug, try by ID
    if (!eventData) {
      const result = await supabase
        .from("events")
        .select("*")
        .eq("id", slug)
        .maybeSingle()
      eventData = result.data
    }

    if (!eventData) {
      notFound()
    }

    event = eventData
  } catch (err) {
    if (err instanceof Error && err.message === "Event not found") {
      notFound()
    }
    error = err instanceof Error ? err.message : "Failed to load event"
    console.error("Error fetching event:", error, debugInfo)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-slate-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Event Not Found</h1>
          <p className="text-slate-600 mb-6">
            {error === "Failed to load event"
              ? "This event could not be loaded. It may not exist or you may not have permission to view it."
              : error}
          </p>
          {debugInfo && (
            <div className="mb-6 p-4 bg-slate-50 rounded-lg text-left text-xs">
              <p className="font-semibold text-slate-700 mb-2">Debug Information:</p>
              <p className="text-slate-600">Error Code: {debugInfo.code}</p>
              <p className="text-slate-600">Slug: {debugInfo.slug}</p>
              <p className="text-slate-600">User Status: {debugInfo.user}</p>
              {debugInfo.hint && <p className="text-slate-600 mt-2">Hint: {debugInfo.hint}</p>}
            </div>
          )}
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
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
                  src={event.banner_image || "/placeholder.svg?height=400&width=800&text=Event+Banner"}
                  alt={event.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-80 object-cover"
                  style={{
                    objectPosition: event.banner_position || 'center center'
                  }}
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
                    <div className="text-xl text-slate-600 leading-relaxed rich-text-content" dangerouslySetInnerHTML={{ __html: event.description }} />
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
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MailIcon className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</p>
                        <a
                          href={`mailto:${event.contact_email || (event.chapter === "US" ? "us@acumenhaven.org" : "bangladesh@acumenhaven.org")}`}
                          className="text-slate-700 hover:text-emerald-600 font-medium transition-colors"
                        >
                          {event.contact_email || (event.chapter === "US" ? "us@acumenhaven.org" : "bangladesh@acumenhaven.org")}
                        </a>
                      </div>
                    </div>

                    {(event.social_facebook || event.social_twitter || event.social_instagram || event.social_linkedin) && (
                      <div className="pt-2">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Social Media</p>
                        <div className="flex flex-wrap gap-2">
                          {event.social_facebook && (
                            <Button variant="outline" size="icon" className="h-9 w-9 bg-transparent" asChild>
                              <Link href={event.social_facebook} target="_blank" rel="noopener noreferrer">
                                <Facebook className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                          {event.social_twitter && (
                            <Button variant="outline" size="icon" className="h-9 w-9 bg-transparent" asChild>
                              <Link href={event.social_twitter} target="_blank" rel="noopener noreferrer">
                                <Twitter className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                          {event.social_instagram && (
                            <Button variant="outline" size="icon" className="h-9 w-9 bg-transparent" asChild>
                              <Link href={event.social_instagram} target="_blank" rel="noopener noreferrer">
                                <Instagram className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                          {event.social_linkedin && (
                            <Button variant="outline" size="icon" className="h-9 w-9 bg-transparent" asChild>
                              <Link href={event.social_linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-4 w-4" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
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

                <EventActions event={event} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
