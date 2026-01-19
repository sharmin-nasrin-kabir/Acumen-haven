"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import * as Icons from "lucide-react"
import {
  ArrowRight,
  TrendingUp,
  Calendar,
  MapPin,
  FlaskConical,
  BookOpen,
  Globe,
  Target,
} from "lucide-react"
import type { Event } from "@/types/events"
import CountUp from "@/components/CountUp"
import { cn } from "@/lib/utils"

interface HomeClientProps {
  heroSlides: any[]
  impactStats: any[]
  sdgs: any[]
  testimonials: any[]
  featuredEvents: Event[]
}

export default function HomeClient({
  heroSlides: dbHeroSlides,
  impactStats: dbImpactStats,
  sdgs: dbSdgs,
  testimonials: dbTestimonials,
  featuredEvents
}: HomeClientProps) {

  // Use DB data if available, fallback to empty to avoid crashes (though server should provide)
  const heroSlides = dbHeroSlides?.length > 0 ? dbHeroSlides : []
  const impactStats = dbImpactStats?.length > 0 ? dbImpactStats : []
  const sdgs = dbSdgs?.length > 0 ? dbSdgs : []
  const testimonials = dbTestimonials?.length > 0 ? dbTestimonials : []

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(heroSlides.length).fill(false))

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
    }
  ]

  // Preload images
  useEffect(() => {
    if (heroSlides.length === 0) return
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
          img.onerror = () => resolve()
          img.src = slide.image
        })
      })
      await Promise.all(imagePromises)
    }
    preloadImages()
  }, [heroSlides])

  useEffect(() => {
    if (heroSlides.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % heroSlides.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [heroSlides])

  const handleIndicatorClick = (index: number) => setCurrentSlideIndex(index)
  const currentSlide = heroSlides[currentSlideIndex] || { title: '', color_class: '', link: '' }

  // Testimonial slider logic
  const testimonialsPerPage = Math.min(testimonials.length, 3)
  const maxPages = Math.ceil(testimonials.length / testimonialsPerPage)
  const canSlide = testimonials.length > 3

  const getVisibleTestimonials = () => {
    if (!canSlide) return testimonials
    const start = testimonialIndex * testimonialsPerPage
    return testimonials.slice(start, start + testimonialsPerPage)
  }

  // Dynamic Icon Helper
  const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
    const Icon = (Icons as any)[name] || Icons.HelpCircle
    return <Icon className={className} />
  }

  if (heroSlides.length === 0) return <div className="min-h-screen bg-white" />

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section */}
      <section className="relative pt-36 sm:pt-44 lg:pt-52 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id || index}
              className={`absolute inset-0 transition-opacity duration-[4000ms] ease-in-out ${index === currentSlideIndex ? "opacity-100" : "opacity-0"}`}
            >
              <Image src={slide.image || "/placeholder.svg"} alt={slide.alt || ""} fill className="object-cover" priority={index === 0} quality={90} sizes="100vw" />
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f22]/20 via-transparent to-black/20" />
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="w-full space-y-6 md:space-y-8 animate-fade-in text-center">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.15] tracking-tight">
                <span className="text-white drop-shadow-lg">Where emerging </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 drop-shadow-lg">changemakers</span>
                <span className="text-white drop-shadow-lg"> lead the fight against </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500 drop-shadow-lg">climate change</span>
                <span className="text-white drop-shadow-lg"> and </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 drop-shadow-lg">inequality</span>
              </h1>
              <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-light max-w-4xl mx-auto leading-relaxed drop-shadow-md">
                Empowering the next generation to drive sustainable solutions and social justice through science-based action and community leadership.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 sm:mt-10">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-5 sm:px-10 sm:py-6 lg:px-14 lg:py-8 rounded-full font-bold shadow-2xl transition-all duration-300 hover:scale-105 group text-lg sm:text-xl md:text-2xl lg:text-3xl min-w-[280px]" asChild>
              <Link href="/get-involved">Join Our Movement <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" /></Link>
            </Button>

            <Button size="lg" className={`bg-gradient-to-r ${currentSlide.color_class} hover:opacity-90 text-white px-8 py-5 sm:px-10 sm:py-6 lg:px-14 lg:py-8 rounded-full font-bold shadow-2xl transition-all duration-300 hover:scale-105 group text-lg sm:text-xl md:text-2xl lg:text-3xl min-w-[280px]`} asChild>
              <Link href={currentSlide.link}>
                <div className="flex items-center justify-center">
                  <span className="block text-center leading-tight">{currentSlide.title}</span>
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform flex-shrink-0" />
                </div>
              </Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex justify-center space-x-4">
            {heroSlides.map((slide, index) => (
              <button key={slide.id} onClick={() => handleIndicatorClick(index)} className="relative group">
                <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-300 ${currentSlideIndex === index ? `${slide.bg_color_class} shadow-lg ring-2 ring-white/50` : "bg-white/60 hover:bg-white/80"}`} />
                {currentSlideIndex === index && <div className={`absolute inset-0 w-full h-full rounded-full ${slide.bg_color_class} animate-ping opacity-30`} />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="text-emerald-700 rounded-full font-semibold mb-4 bg-primary-100 px-6 py-3 border border-emerald-200/50 shadow-lg">
              <TrendingUp className="h-5 w-5 mr-2" /> Our Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Making a Real Difference</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => {
              const colors = [
                { bg: "bg-primary-50", text: "text-primary-600", bar: "bg-primary-600" },
                { bg: "bg-emerald-50", text: "text-emerald-600", bar: "bg-emerald-600" },
                { bg: "bg-un-50", text: "text-un-600", bar: "bg-un-600" },
                { bg: "bg-youth-50", text: "text-youth-600", bar: "bg-youth-600" },
              ]
              const color = colors[index % colors.length]
              return (
                <Card key={stat.id} className={`group relative p-6 rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${color.bg} overflow-hidden`}>
                  <CardContent className="p-0 relative z-10">
                    <div className={`text-4xl lg:text-5xl font-black ${color.text} mb-2`}>
                      <CountUp from={0} to={parseInt(stat.number.replace(/[^\d]/g, ''))} duration={2} delay={index * 0.1} />
                      {stat.number.includes('+') ? '+' : ''}
                    </div>
                    <div className={`text-lg font-bold ${color.text} mb-4`}>{stat.label}</div>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">{stat.description}</p>
                  </CardContent>
                  <div className={`absolute bottom-0 left-0 h-1 ${color.bar} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left w-full`} />
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Events Widget */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-100 text-emerald-800 rounded-full font-semibold px-6 py-3 border border-emerald-200/50 shadow-lg">
              <Calendar className="h-5 w-5 mr-2" /> Latest Events
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Upcoming & Recent Events</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg rounded-3xl overflow-hidden">
                <div className="relative overflow-hidden h-48">
                  <Image src={event.banner_image || "/placeholder.svg"} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-4 left-4"><Badge className="bg-emerald-100 text-emerald-700">{event.category}</Badge></div>
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-slate-800 min-h-[3.5rem] line-clamp-2">{event.title}</h3>
                  <div className="flex items-center text-sm text-slate-600"><Calendar className="h-4 w-4 mr-2" />{new Date(event.date).toLocaleDateString()}</div>
                  <div className="flex items-center text-sm text-slate-600"><MapPin className="h-4 w-4 mr-2" />{event.location}</div>
                  <Button asChild className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white"><Link href={`/events/${event.id}`}>View Details</Link></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-un-100 text-un-800 rounded-full font-semibold px-6 py-3 border border-un-200/50 shadow-lg">
              <Globe className="h-5 w-5 mr-2" /> SDG Alignment
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">United Nations Sustainable Development Goals</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {sdgs.map((sdg, index) => {
              const colors = ["bg-primary-50", "bg-un-50", "bg-youth-50", "bg-emerald-50"]
              const tColors = ["text-primary-700", "text-un-700", "text-youth-700", "text-emerald-700"]
              const iColors = ["bg-primary-600", "bg-un-600", "bg-youth-600", "bg-emerald-600"]
              const cIndex = index % 4
              return (
                <div key={sdg.id} className={`p-6 rounded-3xl ${colors[cIndex]} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center h-full flex flex-col items-center`}>
                  <div className={`w-16 h-16 rounded-2xl ${iColors[cIndex]} flex items-center justify-center mb-4 shadow-lg`}><DynamicIcon name={sdg.icon_name} className="h-8 w-8 text-white" /></div>
                  <h3 className={`text-xl ${tColors[cIndex]} font-bold mb-2 min-h-[3rem]`}>{sdg.title}</h3>
                  <p className="text-slate-700 text-sm leading-relaxed line-clamp-4">{sdg.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-6 py-3 text-lg md:text-xl rounded-full">Voices of Change</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mt-6">Inspiring Climate Action</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <Card key={t.id} className="bg-white/5 border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-0 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-blue-500/50">
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{t.name}</h4>
                      <p className="text-blue-400 text-sm font-medium">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 italic leading-relaxed text-lg">"{t.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
