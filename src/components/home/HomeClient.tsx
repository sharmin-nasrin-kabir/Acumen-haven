"use client"

import { useState, useEffect, useMemo } from "react"
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
  Globe,
} from "lucide-react"
import type { Event } from "@/types/events"
import CountUp from "@/components/CountUp"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog"

interface HomeClientProps {
  heroSlides: any[]
  impactStats: any[]
  sdgs: any[]
  testimonials: any[]
  featuredEvents: Event[]
  latestBlogs: any[]
}

export default function HomeClient({
  heroSlides: dbHeroSlides,
  impactStats: dbImpactStats,
  sdgs: dbSdgs,
  testimonials: dbTestimonials,
  featuredEvents,
  latestBlogs
}: HomeClientProps) {

  // Use DB data if available, fallback to empty to avoid crashes (though server should provide)
  const heroSlides = useMemo(() => dbHeroSlides?.length > 0 ? dbHeroSlides : [], [dbHeroSlides])
  const impactStats = useMemo(() => dbImpactStats?.length > 0 ? dbImpactStats : [], [dbImpactStats])
  const sdgs = useMemo(() => dbSdgs?.length > 0 ? dbSdgs : [], [dbSdgs])
  const testimonials = useMemo(() => dbTestimonials?.length > 0 ? dbTestimonials : [], [dbTestimonials])

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // Preload images
  useEffect(() => {
    if (heroSlides.length === 0) return
    const preloadImages = async () => {
      const imagePromises = heroSlides.map((slide) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image()
          img.onload = () => resolve()
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

  // Dynamic Icon Helper
  const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
    const Icon = (Icons as any)[name] || Icons.HelpCircle
    return <Icon className={className} />
  }

  const stripHtml = (html: string) => {
    return html?.replace(/<[^>]*>/g, '') || ""
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

      {/* Latest Stories Section - Added for functional parity */}
      {latestBlogs.length > 0 && (
        <section className="py-24 px-4 sm:px-6 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-50/50 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <Badge className="bg-emerald-100 text-emerald-800 rounded-full font-bold px-5 py-2 mb-6 border border-emerald-200">
                  Stories of Change
                </Badge>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[0.9]">
                  Latest from <br />
                  <span className="text-emerald-600">our blog</span>
                </h2>
                <p className="text-slate-500 text-lg mt-6 leading-relaxed">
                  Insights, updates, and inspiring stories from our community members and program participants.
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-full h-14 px-8 border-2 font-bold group">
                <Link href="/blog">
                  View All Stories <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestBlogs.map((blog) => (
                <Card key={blog.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-[2.5rem] overflow-hidden bg-white">
                  <div className="relative h-64">
                    <Image
                      src={blog.featured_image || "/placeholder.svg?height=400&width=600"}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      style={{ objectPosition: blog.banner_position || 'center center' }}
                    />
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-white/90 backdrop-blur-sm text-emerald-800 border-none shadow-lg">Blog Post</Badge>
                    </div>
                  </div>
                  <CardContent className="p-8 space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {new Date(blog.published_at || blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-600 line-clamp-3 leading-relaxed">
                      {stripHtml(blog.excerpt || "")}
                    </p>
                    <div className="pt-4">
                      <Link
                        href={`/blog/${blog.slug || blog.id}`}
                        className="inline-flex items-center font-bold text-emerald-600 group/link"
                      >
                        Read Story <ArrowRight className="ml-2 h-4 w-4 group-link-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* Community Voices - Infinite Carousel */}
      <section className="py-24 px-0 bg-white overflow-hidden border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-16 text-center">
          <Badge className="bg-emerald-50 text-emerald-700 px-6 py-3 text-lg rounded-full border border-emerald-100 shadow-sm font-bold">
            Community Voices
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mt-6 tracking-tight">Voices of Change</h2>
          <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto mt-6 leading-relaxed">
            Stories of impact and inspiration from the dedicated individuals driving our mission forward.
          </p>
        </div>

        <div className="relative flex overflow-hidden">
          {/* Main scrolling wrapper */}
          <div
            className="flex gap-8 animate-scroll whitespace-nowrap py-10 px-8 hover:[animation-play-state:paused] cursor-pointer"
            style={{ animationDuration: '60s' }}
          >
            {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, idx) => (
              <Dialog key={`${t.id}-${idx}`}>
                <DialogTrigger asChild>
                  <Card className="w-[450px] flex-shrink-0 bg-white border border-slate-200/60 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 hover:border-emerald-200 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] group">
                    <CardContent className="p-0 space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-emerald-50 bg-slate-50 shadow-inner">
                          {t.image === "default:male" ? (
                            <div className="w-full h-full flex items-center justify-center bg-blue-50"><Icons.User className="h-8 w-8 text-blue-500" /></div>
                          ) : t.image === "default:female" ? (
                            <div className="w-full h-full flex items-center justify-center bg-pink-50"><Icons.CircleUser className="h-8 w-8 text-pink-500" /></div>
                          ) : (
                            <Image src={t.image || "/placeholder.svg"} alt={t.name} fill className="object-cover" />
                          )}
                        </div>
                        <div className="whitespace-normal">
                          <h4 className="font-bold text-slate-900 text-xl tracking-tight">{t.name}</h4>
                          <p className="text-emerald-600 text-xs font-black uppercase tracking-[0.2em]">{t.role}</p>
                        </div>
                      </div>
                      <div className="relative">
                        <Icons.Quote className="absolute -top-4 -left-2 h-12 w-12 text-slate-100/80 z-0" />
                        <p className="relative z-10 text-slate-600 italic leading-relaxed text-lg whitespace-normal line-clamp-4 font-medium">
                          &quot;{t.content}&quot;
                        </p>
                      </div>
                      <div className="pt-2">
                        <span className="text-emerald-600 text-sm font-bold flex items-center group-hover:underline">
                          Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
                  <div className="bg-emerald-900 px-8 py-10 text-white relative">
                    <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                    <div className="flex items-center space-x-6 relative z-10">
                      <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                        {t.image === "default:male" ? (
                          <div className="w-full h-full flex items-center justify-center bg-blue-100"><Icons.User className="h-12 w-12 text-blue-600" /></div>
                        ) : t.image === "default:female" ? (
                          <div className="w-full h-full flex items-center justify-center bg-pink-100"><Icons.CircleUser className="h-12 w-12 text-pink-600" /></div>
                        ) : (
                          <Image src={t.image || "/placeholder.svg"} alt={t.name} fill className="object-cover" />
                        )}
                      </div>
                      <div>
                        <DialogTitle className="text-3xl font-black tracking-tight">{t.name}</DialogTitle>
                        <p className="text-emerald-400 font-bold uppercase tracking-widest text-sm mt-1">{t.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 md:p-12 bg-white relative">
                    <Icons.Quote className="absolute top-8 left-8 h-20 w-20 text-slate-50 z-0" />
                    <div className="relative z-10">
                      <p className="text-slate-600 text-xl leading-relaxed italic font-medium">
                        &quot;{t.content}&quot;
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {/* Subtle side fades */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>
      </section>

      {/* CTA Section: Ready to make a real difference? */}
      <section className="py-28 px-6 bg-[#0f172a] text-white relative overflow-hidden">
        {/* Background Gradients removed */}

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-5 py-2.5 rounded-full mb-10 backdrop-blur-md">
            <Icons.Lightbulb className="w-5 h-5 text-emerald-400 group-hover:animate-pulse" />
            <span className="text-sm font-bold text-emerald-400 tracking-wider">Join the Movement</span>
          </div>

          <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[1] tracking-tighter">
            Ready to make a <br />
            <span className="text-emerald-400">real difference?</span>
          </h2>

          <p className="text-slate-400 text-xl md:text-2xl mb-14 max-w-2xl mx-auto leading-relaxed font-medium">
            Join a global community of young changemakers transforming their ideas into impactful action. Your journey starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 h-16 sm:h-20 rounded-full font-bold text-2xl shadow-[0_0_50px_rgba(16,185,129,0.3)] transition-all hover:scale-105 group active:scale-95" asChild>
              <Link href="/get-involved">Get Started <ArrowRight className="ml-3 h-7 w-7 group-hover:translate-x-2 transition-transform" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white px-12 h-16 sm:h-20 rounded-full font-bold text-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95" asChild>
              <Link href="/about">Read Our Story</Link>
            </Button>
          </div>

          <p className="text-slate-500 text-xs font-black tracking-[0.5em] uppercase">
            Trusted by communities across <span className="text-white">Bangladesh</span> and the <span className="text-white">US</span>
          </p>
        </div>
      </section>
    </div>
  )
}
