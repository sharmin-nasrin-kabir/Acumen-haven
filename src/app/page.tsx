"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  TreePine,
  Lightbulb,
  Target,
  TrendingUp,
  Zap,
  Recycle,
  GraduationCap,
  CloudRain,
  Building,
  HeartPulse,
  Handshake,
  Scale,
  Briefcase,
  Globe,
  Quote,
  User,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  FlaskConical,
  BookOpen,
  MessageCircle,
  Clock,
} from "lucide-react"
import { impactStats, testimonials } from "@/data/content"
import { createClient as createSupabaseClient } from "@/lib/supabase/client"
import { eventsApi } from "@/lib/api/events"
import type { Event } from "@/types/events"
import CountUp from "@/components/CountUp"
import { cn } from "@/lib/utils"

// Hero background images with their corresponding focus areas and colors
const heroSlides = [
  {
    image: "/hero-transport-mobility.png",
    title: "Transport & Mobility",
    link: "/programs/transport-mobility",
    alt: "Sustainable urban transport with green buses, cyclists, and pedestrians on eco-friendly streets",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500",
  },
  {
    image: "/hero-education-youth.png",
    title: "Education & Youth Empowerment",
    link: "/programs/education-empowerment",
    alt: "Students learning outdoors in sustainable school environment with solar panels and gardens",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-500",
  },
  {
    image: "/hero-tree-planting.png",
    title: "Tree Planting & Urban Greening",
    link: "/programs/tree-planting",
    alt: "Hands protecting a small plant seedling growing from soil in forest setting",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500",
  },
  {
    image: "/hero-waste-management.png",
    title: "Waste Management & Circular Economy",
    link: "/programs/waste-management",
    alt: "Isometric sustainable city with recycling facilities, solar panels, and circular economy systems",
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-500",
  },
  {
    image: "/hero-exhibition-competition.png",
    title: "Exhibition and Competition",
    link: "/programs/exhibition-competition",
    alt: "Large indoor art exhibition hall with displays and visitors exploring climate-focused artwork",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500",
  },
]

const latestResearch = [
  {
    id: 1,
    title: "Urban Transport and Air Quality: A Youth-Led Assessment in Dhaka",
    type: "Research Paper",
    year: 2024,
    description: "Comprehensive analysis of air pollution from urban transportation systems in Dhaka, Bangladesh.",
    image: "/research-traffic-study.png",
  },
  {
    id: 2,
    title: "Climate Education Impact Assessment: School-Based Programs",
    type: "Survey Report",
    year: 2023,
    description: "Evaluation of climate education programs in schools across the US and Bangladesh.",
    image: "/research-youth-leadership.png",
  },
  {
    id: 3,
    title: "Community Perceptions of Traffic Management Solutions",
    type: "Case Study",
    year: 2023,
    description: "Multi-stakeholder analysis of traffic management perceptions including police, drivers, and public.",
    image: "/research-community-action.png",
  },
]

interface HomeBlogItem {
  id: string
  title: string
  excerpt: string | null
  featured_image: string | null
  slug: string | null
  published_at: string | null
  created_at: string
  profiles?: {
    first_name: string | null
    last_name: string | null
  } | null
}

export default function HomePage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(heroSlides.length).fill(false))
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([])
  const [eventsLoading, setEventsLoading] = useState(true)
  const [latestBlogs, setLatestBlogs] = useState<HomeBlogItem[]>([])
  const [blogsLoading, setBlogsLoading] = useState(true)

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = heroSlides.map((slide, index) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image()
          img.onload = () => {
            setImagesLoaded((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
            resolve()
          }
          img.onerror = () => {
            console.error(`Failed to load image: ${slide.image}`)
            resolve()
          }
          img.src = slide.image
        })
      })

      await Promise.all(imagePromises)
    }

    preloadImages()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % heroSlides.length)
    }, 8000) // Change slide every 8 seconds for ultra-smooth experience

    return () => clearInterval(interval)
  }, [])

  const handleIndicatorClick = (index: number) => {
    setCurrentSlideIndex(index)
  }

  // Get current slide info
  const currentSlide = heroSlides[currentSlideIndex]

  // Testimonial slider logic
  const testimonialsPerPage = Math.min(testimonials.length, 3)
  const maxPages = Math.ceil(testimonials.length / testimonialsPerPage)
  const canSlide = testimonials.length > 3

  const nextTestimonial = () => {
    if (canSlide) {
      setTestimonialIndex((prev) => (prev + 1) % maxPages)
    }
  }

  const prevTestimonial = () => {
    if (canSlide) {
      setTestimonialIndex((prev) => (prev - 1 + maxPages) % maxPages)
    }
  }

  const getVisibleTestimonials = () => {
    if (!canSlide) return testimonials
    const start = testimonialIndex * testimonialsPerPage
    return testimonials.slice(start, start + testimonialsPerPage)
  }

  // Dynamic grid classes based on testimonial count
  const getGridClass = () => {
    const count = Math.min(testimonials.length, 3)
    if (count === 1) return "grid-cols-1 max-w-md mx-auto"
    if (count === 2) return "md:grid-cols-2 max-w-4xl mx-auto"
    return "md:grid-cols-2 lg:grid-cols-3"
  }

  // SDG data with all 8 SDGs using only our 4 colors
  const sdgData = [
    {
      number: "13",
      title: "SDG 13 – Climate Action",
      description:
        "Empowers communities to combat climate change through education, awareness, and local initiatives that reduce carbon footprints.",
      icon: CloudRain,
      bgColor: "bg-primary-50",
      textColor: "text-primary-700",
      iconColor: "bg-primary-600",
    },
    {
      number: "4",
      title: "SDG 4 – Quality Education",
      description:
        "Offer hands-on climate education and workshops that equip students and young people with practical knowledge and sustainable skills.",
      icon: GraduationCap,
      bgColor: "bg-un-50",
      textColor: "text-un-700",
      iconColor: "bg-un-600",
    },
    {
      number: "11",
      title: "SDG 11 – Sustainable Cities",
      description: "Our climate awareness programs promote safer, cleaner, and more livable cities.",
      icon: Building,
      bgColor: "bg-youth-50",
      textColor: "text-youth-700",
      iconColor: "bg-youth-600",
    },
    {
      number: "3",
      title: "SDG 3 – Good Health",
      description:
        "By addressing pollution, traffic risks, disaster preparedness, and the importance of a balanced diet, we contribute to healthier environments and safer communities.",
      icon: HeartPulse,
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      iconColor: "bg-emerald-600",
    },
    {
      number: "17",
      title: "SDG 17 – Partnerships",
      description:
        "We collaborate with schools, local authorities, and grassroots organizations to amplify impact through shared action.",
      icon: Handshake,
      bgColor: "bg-un-50",
      textColor: "text-un-700",
      iconColor: "bg-un-600",
    },
    {
      number: "12",
      title: "SDG 12 – Responsible Consumption",
      description:
        "Through climate footprint education, we encourage mindful consumption and promote low-impact lifestyles.",
      icon: Recycle,
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      iconColor: "bg-emerald-600",
    },
    {
      number: "5",
      title: "SDG 5 – Gender Equality",
      description:
        "We ensure that girls and young women are equally involved in climate education, leadership, and action.",
      icon: Scale,
      bgColor: "bg-primary-50",
      textColor: "text-primary-700",
      iconColor: "bg-primary-600",
    },
    {
      number: "8",
      title: "SDG 8 – Decent Work",
      description:
        "Our programs build green skills in youth, laying the foundations for future employment in sustainability and community development.",
      icon: Briefcase,
      bgColor: "bg-youth-50",
      textColor: "text-youth-700",
      iconColor: "bg-youth-600",
    },
  ]

  // Three Zeros data using only our 4 colors
  const threeZerosData = [
    {
      title: "Zero Net Carbon Emissions",
      description:
        "Acumen Haven contributes by educating communities on carbon footprints, reducing emissions through behavior change, and tree planting.",
      icon: CloudRain,
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      iconColor: "bg-emerald-600",
    },
    {
      title: "Zero Wealth Concentration",
      description:
        "Through grassroots climate action and youth empowerment, Acumen Haven promotes equal opportunities and local leadership.",
      icon: Scale,
      bgColor: "bg-un-50",
      textColor: "text-un-700",
      iconColor: "bg-un-600",
    },
    {
      title: "Zero Unemployment",
      description:
        "By training youth and volunteers in climate skills, education, and civic engagement, Acumen Haven supports purposeful community roles.",
      icon: Briefcase,
      bgColor: "bg-youth-50",
      textColor: "text-youth-700",
      iconColor: "bg-youth-600",
    },
  ]

  useEffect(() => {
    const loadFeaturedEvents = async () => {
      try {
        setEventsLoading(true)
        const events = await eventsApi.getAll({ featured: true, limit: 3 })
        events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setFeaturedEvents(events)
      } catch (error) {
        console.error("[v0] Failed to load featured events:", error)
        setFeaturedEvents([]) // Set empty array on error
      } finally {
        setEventsLoading(false)
      }
    }

    loadFeaturedEvents()
  }, [])

  useEffect(() => {
    const loadLatestBlogs = async () => {
      try {
        setBlogsLoading(true)
        const supabase = createSupabaseClient()
        const { data, error } = await supabase
          .from("blogs")
          .select(
            `id,title,excerpt,featured_image,slug,published_at,created_at,profiles:profiles!blogs_author_id_fkey(first_name,last_name)`,
          )
          .eq("status", "approved")
          .order("published_at", { ascending: false, nullsFirst: false })
          .limit(3)

        if (error) throw error
        const normalized: HomeBlogItem[] = (data || []).map((row: any) => ({
          id: row.id,
          title: row.title,
          excerpt: row.excerpt ?? null,
          featured_image: row.featured_image ?? null,
          slug: row.slug ?? null,
          published_at: row.published_at ?? null,
          created_at: row.created_at,
          profiles: Array.isArray(row.profiles)
            ? (row.profiles[0]
              ? { first_name: row.profiles[0].first_name ?? null, last_name: row.profiles[0].last_name ?? null }
              : null)
            : row.profiles ?? null,
        }))
        setLatestBlogs(normalized)
      } catch (err) {
        console.error("[home] Failed to load latest blogs:", err)
        setLatestBlogs([])
      } finally {
        setBlogsLoading(false)
      }
    }

    loadLatestBlogs()
  }, [])

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section with Full Background Slider */}
      <section className="relative pt-36 sm:pt-44 lg:pt-52 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden min-h-screen flex items-center">
        {/* Background Image Layer with Pure Smooth Crossfade */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[4000ms] ease-in-out ${index === currentSlideIndex ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
                quality={90}
                sizes="100vw"
              />
              {/* Deeper overlay for professional text readability */}
              <div className="absolute inset-0 bg-black/60" />
              {/* Smooth bottom gradient to blend with the next section */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f22]/20 via-transparent to-black/20" />
            </div>
          ))}
        </div>

        {/* Content - Full width for left content */}
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          {/* Main Content - Full Width */}
          <div className="w-full space-y-6 md:space-y-8 animate-fade-in text-center">


            {/* Main Heading - Refined Standard NGO Size (~15% smaller) */}
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.15] tracking-tight">
                <span className="text-white drop-shadow-lg">Where emerging </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 drop-shadow-lg">
                  changemakers
                </span>
                <span className="text-white drop-shadow-lg"> lead the fight against </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500 drop-shadow-lg">
                  climate change
                </span>
                <span className="text-white drop-shadow-lg"> and </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 drop-shadow-lg">
                  inequality
                </span>
              </h1>

              {/* Professional Sub-heading */}
              <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-light max-w-4xl mx-auto leading-relaxed drop-shadow-md">
                Empowering the next generation to drive sustainable solutions and social justice through science-based action and community leadership.
              </p>
            </div>
          </div>

          {/* Buttons Row - Side by Side */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 sm:mt-10">
            {/* Join Our Movement Button */}
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-5 sm:px-10 sm:py-6 md:px-12 md:py-7 lg:px-14 lg:py-8 rounded-full font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group text-lg sm:text-xl md:text-2xl lg:text-3xl backdrop-blur-sm min-w-[280px] sm:min-w-[320px] md:min-w-[360px]"
              asChild
            >
              <Link href="/get-involved">
                Join Our Movement
                <ArrowRight className="ml-2 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </Button>

            {/* Focus Area Button - Colorful */}
            <Button
              size="lg"
              className={`bg-gradient-to-r ${currentSlide.color} hover:opacity-90 text-white px-8 py-5 sm:px-10 sm:py-6 md:px-12 md:py-7 lg:px-14 lg:py-8 rounded-full font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group text-lg sm:text-xl md:text-2xl lg:text-3xl backdrop-blur-sm min-w-[280px] sm:min-w-[320px] md:min-w-[360px]`}
              asChild
            >
              <Link href={currentSlide.link}>
                <div className="flex items-center justify-center">
                  <span className="block text-center leading-tight">{currentSlide.title}</span>
                  <ArrowRight className="ml-2 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0" />
                </div>
              </Link>
            </Button>
          </div>
        </div>

        {/* Stylized Slide Indicators - Positioned at Bottom */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex justify-center space-x-4">
            {heroSlides.map((slide, index) => (
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`relative transition-all duration-300 ${currentSlideIndex === index ? "scale-110" : "hover:scale-105"
                  }`}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              >
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full transition-all duration-300 ${currentSlideIndex === index
                    ? `${slide.bgColor} shadow-lg ring-2 ring-white/50`
                    : "bg-white/60 hover:bg-white/80"
                    }`}
                />
                {currentSlideIndex === index && (
                  <div
                    className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full ${slide.bgColor} animate-ping opacity-30`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="text-emerald-700 rounded-full font-semibold mb-4 items-center space-x-2 bg-primary-100 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 border border-emerald-200/50 shadow-lg">
              <TrendingUp className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              <span className="text-emerald-700 font-semibold text-lg md:text-xl">Our Impact</span>
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Making a Real Difference</h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Our actions are climate-focused, and our main mission is to{" "}
              <span className="text-emerald-600">discover, learn, and transform </span>
            </p>
          </div>

          {/* Masonry Grid Layout for Impact Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => {
              let label
              if (stat.description.includes("Teachers trained in traffic awareness workshops")) {
                label = "Teachers Trained"
              } else if (stat.description.includes("Drivers surveyed to inform sustainable traffic planning")) {
                label = "Drivers Surveyed"
              } else if (stat.description.includes("Students are trained in academic research methods")) {
                label = "Students Trained"
              } else if (stat.description.includes("Participants trained in fire safety")) {
                label = "Fire Safety Trained"
              } else if (stat.description.includes("Volunteers from diverse groups were surveyed")) {
                label = "Volunteers Surveyed"
              } else if (stat.description.includes("School children participated in hands-on workshops")) {
                label = "School Children Participated"
              } else if (stat.description.includes("By planting 200+ lentil seeds")) {
                label = "Lentil Seeds Planted"
              } else if (stat.description.includes("Youth volunteers trained to teach climate")) {
                label = "Youth Volunteers Trained"
              } else {
                label = "Impact"
              }

              const colors = [
                { bg: "bg-primary-50", text: "text-primary-600", bar: "bg-primary-600" },
                { bg: "bg-emerald-50", text: "text-emerald-600", bar: "bg-emerald-600" },
                { bg: "bg-un-50", text: "text-un-600", bar: "bg-un-600" },
                { bg: "bg-youth-50", text: "text-youth-600", bar: "bg-youth-600" },
              ]
              const color = colors[index % colors.length]

              return (
                <Card
                  key={index}
                  className={`group relative p-6 rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${color.bg} overflow-hidden flex flex-col`}
                >
                  <CardContent className="p-0 relative z-10 flex-grow flex flex-col">
                    <div className="mb-6">
                      <div className={`text-5xl lg:text-6xl font-black ${color.text} leading-none mb-2 group-hover:scale-105 transition-transform duration-500`}>
                        <CountUp
                          from={0}
                          to={parseInt(stat.number.replace(/[^\d]/g, ''))}
                          duration={2}
                          delay={index * 0.1}
                          className="inline-block"
                        />
                        {stat.number.includes('+') ? '+' : ''}
                      </div>
                      <div className={`text-lg font-bold ${color.text} mb-4`}>{label}</div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed flex-grow">{stat.description}</p>
                  </CardContent>
                  {/* Bottom bar animation */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 ${color.bar} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left w-full mt-auto`}
                  ></div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <div className="max-w-7xl mx-auto">
          {/* Latest Events Widget - moved after Our Impacts section */}
          <div className="space-y-8">
            <div className="text-center">
              <Badge className="bg-emerald-100 text-emerald-800 rounded-full font-semibold mb-4 items-center space-x-2 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 border border-emerald-200/50 shadow-lg">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                <span className="text-lg md:text-xl">Latest Events</span>
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Upcoming & Recent Events</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Join us at our latest events across the US and Bangladesh chapters.
              </p>
            </div>

            {eventsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Loading events...</p>
              </div>
            ) : featuredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg rounded-3xl overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={event.banner_image || "/placeholder.svg"}
                        alt={event.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-emerald-100 text-emerald-700 rounded-full">
                          {event.category || "Event"}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-white/90 rounded-full">
                          {event.chapter}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-3">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {event.title}
                      </h3>

                      <div className="flex items-center text-sm text-slate-600">
                        <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>

                      <div className="flex items-center text-sm text-slate-600">
                        <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
                        {event.location || "Location TBD"}
                      </div>

                      <Button
                        asChild
                        size="sm"
                        className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-white"
                      >
                        <Link href={`/events/${event.id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">No featured events at this time.</p>
              </div>
            )}

            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-transparent border-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 rounded-2xl font-semibold"
              >
                <Link href="/events">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SDG Alignment & Three Zeros Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* SDG Section */}
          <div className="mb-20">
            <div className="text-center mb-16 animate-fade-in">
              <Badge className="bg-un-100 text-un-800 rounded-full font-semibold mb-4 items-center space-x-2 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 border border-un-200/50 shadow-lg">
                <Globe className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                <span className="text-lg md:text-xl">SDG Alignment</span>
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                United Nations Sustainable Development Goals
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                We align our work with the UN Sustainable Development Goals to create a just and sustainable future.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sdgData.map((sdg, index) => (
                <div
                  key={index}
                  className={`overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 rounded-3xl ${sdg.bgColor} flex flex-col items-center justify-center p-6 shadow-lg text-center`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl ${sdg.iconColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto`}
                  >
                    <sdg.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className={`text-xl ${sdg.textColor} font-bold mb-2`}>{sdg.title}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">{sdg.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Research Widget - moved after SDG alignment */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <Badge className="bg-blue-100 text-blue-800 rounded-full font-semibold mb-4 items-center space-x-2 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 border border-blue-200/50 shadow-lg">
                <FlaskConical className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                <span className="text-lg md:text-xl">Latest Research</span>
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Research</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Discover our latest research findings and publications on climate action and sustainability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestResearch.map((research) => (
                <Card
                  key={research.id}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg rounded-3xl overflow-hidden bg-blue-50"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-blue-600 border-blue-200 rounded-full">
                        {research.type}
                      </Badge>
                      <span className="text-sm text-slate-500">{research.year}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors line-clamp-2">
                      {research.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{research.description}</p>

                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-white"
                    >
                      <Link href="/research/publications">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Read More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-transparent border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-2xl font-semibold"
              >
                <Link href="/research">
                  View All Research
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Three Zeros Section */}
          <div>
            <div className="text-center mb-16 animate-fade-in">
              <Badge className="bg-youth-100 text-youth-800 rounded-full font-semibold mb-4 items-center space-x-2 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 border border-youth-200/50 shadow-lg text-lg md:text-xl">
                <Target className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                Three Zeros Initiative
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Building a World of Three Zeros
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
                Inspired by Nobel Laureate Muhammad Yunus, we work toward a world with zero poverty, zero emissions, and
                zero inequality.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {threeZerosData.map((zero, index) => {
                const IconComponent = zero.icon
                return (
                  <Card
                    key={index}
                    className={`group relative p-8 rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${zero.bgColor} overflow-hidden text-center`}
                  >
                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 rounded-2xl ${zero.iconColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg mx-auto`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className={`text-2xl font-bold ${zero.textColor} mb-4`}>{zero.title}</h3>
                      <p className="text-slate-700 leading-relaxed">{zero.description}</p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Latest Blogs Widget - moved after Three Zeros */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <Badge className="bg-orange-100 text-orange-800 rounded-full font-semibold mb-4 items-center space-x-2 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 border border-orange-200/50 shadow-lg">
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                <span className="text-lg md:text-xl">Latest Blogs</span>
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">From Our Blog</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Read insights, stories, and updates from our team and community members.
              </p>
            </div>

            {blogsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Loading blogs...</p>
              </div>
            ) : latestBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {latestBlogs.map((blog) => (
                  <Card
                    key={blog.id}
                    className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg rounded-3xl overflow-hidden bg-orange-50"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={blog.featured_image || "/placeholder.svg"}
                        alt={blog.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <CardContent className="p-6 space-y-3">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-orange-700 transition-colors line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{blog.excerpt || ""}</p>

                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <span>{`${blog.profiles?.first_name ?? "Acumen"} ${blog.profiles?.last_name ?? "Haven"}`.trim()}</span>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {new Date(blog.published_at || blog.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>

                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-orange-600 hover:bg-orange-700 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-white"
                      >
                        <Link href={`/blog/${blog.slug || blog.id}`}>Read Article</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-500 text-lg">No blog posts yet. Check back soon.</p>
              </div>
            )}

            <div className="text-center mt-8">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-transparent border-2 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 rounded-2xl font-semibold"
              >
                <Link href="/blog">
                  View All Posts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-emerald-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="bg-emerald-100 text-emerald-800 rounded-full font-semibold mb-4 items-center space-x-2 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 border border-emerald-200/50 shadow-lg text-lg md:text-xl">
              <TreePine className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Voices of Change</h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Hear from the young leaders and educators who are making a difference through our programs.
            </p>
          </div>

          <div className="relative">
            {canSlide && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-slate-600 hover:text-primary-600 hover:shadow-2xl transition-all duration-300 hover:scale-110 hidden md:flex"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-slate-600 hover:text-primary-600 hover:shadow-2xl transition-all duration-300 hover:scale-110 hidden md:flex"
                  aria-label="Next testimonials"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <div className={`grid gap-8 ${getGridClass()}`}>
              {getVisibleTestimonials().map((testimonial, index) => (
                <Card
                  key={`${testimonialIndex}-${index}`}
                  className="group relative p-8 rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-slate-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-6 right-6 text-emerald-300 group-hover:text-emerald-500 transition-colors duration-500">
                    <Quote className="h-16 w-16" fill="currentColor" />
                  </div>
                  <CardContent className="p-0 space-y-6 relative z-10">
                    <blockquote className="text-slate-700 leading-relaxed text-lg font-light italic pr-12">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center space-x-4 pt-4 border-t border-slate-100">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center shadow-inner">
                        <User className="h-7 w-7 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 text-lg">{testimonial.author}</div>
                        <div className="text-emerald-600 font-medium text-sm">{testimonial.role}</div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <TreePine key={i} className="h-4 w-4 text-emerald-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {canSlide && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: maxPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setTestimonialIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${testimonialIndex === index ? "bg-primary-600 scale-110" : "bg-slate-300 hover:bg-slate-400"
                      }`}
                    aria-label={`Go to testimonial page ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-emerald-600 to-emerald-500 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-10 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "-3s" }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          <div className="space-y-8">
            <Badge className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
              <Lightbulb className="h-4 w-4 mr-2" />
              Join the Movement
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
            <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
              Join thousands of young changemakers who are already creating positive impact in their communities and
              beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group text-lg"
                asChild
              >
                <Link href="/get-involved">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 text-lg bg-transparent"
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
