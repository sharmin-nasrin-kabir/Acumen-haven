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
import { Metadata } from "next"

export const revalidate = 60
async function getEvent(slug: string) {
  const supabase = await createClient()

  // Try by slug first
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

  return eventData as Event | null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const event = await getEvent(slug)

  if (!event) return { title: "Event Not Found | Acumen Haven" }

  return {
    title: `${event.title} | Acumen Haven Events`,
    description: event.description?.replace(/<[^>]*>/g, '').substring(0, 160) || "Join us for our upcoming event.",
    openGraph: {
      title: event.title,
      description: event.description?.replace(/<[^>]*>/g, '').substring(0, 160),
      images: event.banner_image ? [event.banner_image] : [],
      type: "article",
    }
  }
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEvent(slug)

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
              <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl">
                <Image
                  src={event.banner_image || "/placeholder.svg?height=400&width=800&text=Event+Banner"}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                  style={{
                    objectPosition: event.banner_position || 'center center'
                  }}
                />
                <div className="absolute top-6 left-6">
                  <Badge className={isUpcoming ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}>
                    {event.category || "Event"}
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
                        <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                          <Image
                            src={imageUrl || "/placeholder.svg?height=200&width=300&query=gallery image"}
                            alt={`${event.title} gallery image ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
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
                          href={`mailto:${event.contact_email || "info@acumenhaven.org"}`}
                          className="text-slate-700 hover:text-emerald-600 font-medium transition-colors"
                        >
                          {event.contact_email || "info@acumenhaven.org"}
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
