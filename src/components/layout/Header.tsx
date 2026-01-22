"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { createClient } from "@/lib/supabase/client"
import {
  Menu,
  Users,
  BookOpen,
  Heart,
  MessageCircle,
  Handshake,
  ArrowRight,
  Calendar,
  FlaskConical,
  Mail,
  Globe,
} from "lucide-react"
import { cn } from "@/lib/utils"

const mainNavItems = [
  { href: "/about", label: "About Us", icon: <Heart className="h-4 w-4" /> },
  { href: "/programs", label: "What We Do", icon: <BookOpen className="h-4 w-4" /> },
  { href: "/get-involved", label: "Join Us", icon: <Users className="h-4 w-4" /> },
  { href: "/events", label: "Events", icon: <Calendar className="h-4 w-4" /> },
  { href: "/research", label: "Research", icon: <FlaskConical className="h-4 w-4" /> },
  { href: "/resources", label: "Resources", icon: <BookOpen className="h-4 w-4" /> },
  { href: "/blog", label: "Stories", icon: <MessageCircle className="h-4 w-4" /> },
  { href: "/contact", label: "Contact", icon: <Handshake className="h-4 w-4" /> },
]

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [topBar, setTopBar] = useState({
    email: "contact@acumenhaven.com",
    status: "501(c)(3) Status: Applied",
    slogan: "Youth-led. Climate-focused. Impact-driven."
  })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener("scroll", handleScroll)

    // Fetch top bar settings from CMS
    const supabase = createClient()
    supabase.from('site_settings').select('value').eq('key', 'top_bar').single().then(({ data }) => {
      if (data?.value) setTopBar(data.value)
    })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isTransparent = isHomePage && !isScrolled

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500", isTransparent ? "bg-transparent py-2" : "bg-white shadow-xl py-0 border-b border-slate-100")}>
      {/* Top Info Bar */}
      <div className={cn("hidden lg:block border-b transition-all duration-500 overflow-hidden", isTransparent ? "h-auto py-2 bg-emerald-900/50 backdrop-blur-sm border-white/10" : "h-0 opacity-0 py-0 overflow-hidden")}>
        <div className="max-w-[1600px] mx-auto px-6 flex justify-between items-center text-[13px] text-white/90 font-light">
          <div className="flex items-center space-x-6">
            <a href={`mailto:${topBar.email}`} className="flex items-center hover:text-white transition-colors">
              <Mail className="h-3.5 w-3.5 mr-2 text-emerald-300" />
              {topBar.email}
            </a>
            <span className="flex items-center cursor-default">
              <Globe className="h-3.5 w-3.5 mr-2 text-emerald-300" />
              {topBar.status}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="italic font-medium text-emerald-200">{topBar.slogan}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={cn("max-w-[1600px] mx-auto px-4 sm:px-6 transition-all duration-500", isTransparent ? "h-16 md:h-20" : "h-14 md:h-16")}>
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center group transition-all shrink-0">
            <Image
              src="/AH-Logo-Name.png"
              alt="Acumen Haven"
              width={160} height={36}
              priority
              loading="eager"
              className={cn("transition-all duration-500", isTransparent ? "brightness-0 invert w-32 md:w-40" : "brightness-100 invert-0 w-28 md:w-36")}
            />
          </Link>

          <div className="hidden xl:flex items-center space-x-1">
            <nav className="flex items-center space-x-0.5">
              {mainNavItems.map((item) => (
                <Link key={item.href} href={item.href} className={cn("font-medium transition-all duration-300 rounded-lg whitespace-nowrap", isTransparent ? "px-3 py-1.5 text-[15px] text-white hover:bg-white/10" : "px-2.5 py-1.5 text-[14px] text-slate-700 hover:bg-emerald-50")}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-3 ml-4">
              <Button asChild className={cn("rounded-full font-bold shadow-lg transition-all duration-500 hover:scale-105 px-5", isTransparent ? "bg-white text-emerald-700 hover:bg-emerald-50 h-10 text-sm" : "bg-emerald-600 text-white hover:bg-emerald-700 h-9 text-xs")}>
                <Link href="/donate"><Heart className="mr-2 h-3.5 w-3.5 fill-current" /> Donate</Link>
              </Button>
            </div>
          </div>

          <div className="xl:hidden flex items-center space-x-3">
            <Button asChild className={cn("rounded-full font-bold shadow-lg h-9 px-4 text-xs", isTransparent ? "bg-white text-emerald-700" : "bg-emerald-600 text-white")}>
              <Link href="/donate">Donate</Link>
            </Button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn("rounded-full", isTransparent ? "text-white" : "text-slate-700")}>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 border-0 bg-white">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b"><Image src="/AH-Logo-Name.png" alt="Acumen Haven" width={160} height={36} priority loading="eager" /></div>
                  <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    {mainNavItems.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-emerald-50 text-slate-700 group transition-all">
                        <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-emerald-100">{item.icon}</div>
                        <span className="font-semibold text-lg">{item.label}</span>
                        <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100" />
                      </Link>
                    ))}
                  </nav>
                  <div className="p-6 border-t"><Button className="w-full bg-emerald-600 text-white rounded-2xl h-14 font-bold text-lg" asChild><Link href="/donate"><Heart className="mr-2 h-5 w-5 fill-current" /> Donate Now</Link></Button></div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
