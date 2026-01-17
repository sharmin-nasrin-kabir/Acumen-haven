"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Users,
  BookOpen,
  Heart,
  FileText,
  MessageCircle,
  Handshake,
  DollarSign,
  ArrowRight,
  Target,
  Calendar,
  FlaskConical,
  LogIn,
  Mail,
  MapPin,
  Globe,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Consistent menu items for both desktop and mobile
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check if header should be transparent (only on home page when not scrolled)
  const isTransparent = isHomePage && !isScrolled

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isTransparent
          ? "bg-transparent py-2"
          : "bg-white shadow-xl py-0 border-b border-slate-100"
      )}
    >
      {/* Top Info Bar - Professional NGO Style */}
      <div
        className={cn(
          "hidden lg:block border-b transition-all duration-500 overflow-hidden",
          isTransparent
            ? "h-auto py-2 bg-emerald-900/50 backdrop-blur-sm border-white/10"
            : "h-0 opacity-0 py-0 overflow-hidden"
        )}
      >
        <div className="max-w-[1600px] mx-auto px-6 flex justify-between items-center text-[13px] text-white/90 font-light">
          <div className="flex items-center space-x-6">
            <a href="mailto:contact@acumenhaven.com" className="flex items-center hover:text-white transition-colors">
              <Mail className="h-3.5 w-3.5 mr-2 text-emerald-300" />
              contact@acumenhaven.com
            </a>
            <span className="flex items-center cursor-default">
              <Globe className="h-3.5 w-3.5 mr-2 text-emerald-300" />
              501(c)(3) Status: Applied
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="italic font-medium text-emerald-200">Youth-led. Climate-focused. Impact-driven.</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={cn(
        "max-w-[1600px] mx-auto px-4 sm:px-6 transition-all duration-500",
        isTransparent ? "h-20 md:h-24" : "h-16 md:h-20"
      )}>
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center group transition-all duration-300 shrink-0">
            <div className="relative">
              <Image
                src="/AH-Logo-Name.png"
                alt="Acumen Haven"
                width={180}
                height={40}
                priority
                className={cn(
                  "transition-all duration-500 group-hover:scale-105 h-auto",
                  isTransparent ? "brightness-0 invert w-40 md:w-48" : "brightness-100 invert-0 w-36 md:w-44"
                )}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-1">
            <nav className="flex items-center space-x-0.5">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "font-medium transition-all duration-300 rounded-lg whitespace-nowrap",
                    isTransparent
                      ? "px-4 py-2 text-[16px] text-white hover:text-emerald-100 hover:bg-white/10"
                      : "px-3 py-2 text-[15px] text-slate-700 hover:text-emerald-700 hover:bg-emerald-50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 ml-4">
              <Link
                href="/auth/login"
                className={cn(
                  "flex items-center justify-center rounded-full transition-all duration-300 shrink-0",
                  isTransparent
                    ? "h-11 w-11 text-white hover:bg-white/10"
                    : "h-10 w-10 text-slate-600 hover:bg-slate-100"
                )}
                title="Login"
              >
                <LogIn className="h-5 w-5" />
              </Link>

              <Button
                asChild
                className={cn(
                  "rounded-full font-bold shadow-lg transition-all duration-500 hover:scale-105 px-6 shrink-0",
                  isTransparent
                    ? "bg-white text-emerald-700 hover:bg-emerald-50 h-12 text-base"
                    : "bg-emerald-600 text-white hover:bg-emerald-700 h-10 text-sm"
                )}
              >
                <Link href="/donate">
                  <Heart className="mr-2 h-4 w-4 fill-current" />
                  Donate
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="xl:hidden flex items-center space-x-3">
            <Button
              asChild
              className={cn(
                "rounded-full font-bold shadow-lg transition-all duration-500 h-9 px-4 text-xs",
                isTransparent
                  ? "bg-white text-emerald-700"
                  : "bg-emerald-600 text-white"
              )}
            >
              <Link href="/donate">Donate</Link>
            </Button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-full transition-all duration-300",
                    isTransparent ? "text-white hover:bg-white/10" : "text-slate-700"
                  )}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-[400px] bg-white border-l-0 p-0"
              >
                <div className="flex flex-col h-full bg-white">
                  <div className="p-6 border-b border-slate-100">
                    <Image
                      src="/AH-Logo-Name.png"
                      alt="Acumen Haven"
                      width={160}
                      height={36}
                      className="h-auto w-auto max-h-9"
                    />
                  </div>

                  <nav className="flex-1 overflow-y-auto p-6 space-y-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 ml-3">Navigation</div>
                    {mainNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-emerald-50 transition-all duration-300 text-slate-700 hover:text-emerald-700 group"
                      >
                        <div className="p-3 rounded-xl bg-slate-50 group-hover:bg-emerald-100 transition-colors duration-300">
                          {item.icon}
                        </div>
                        <span className="font-semibold text-lg">{item.label}</span>
                        <ArrowRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Link>
                    ))}
                  </nav>

                  <div className="p-6 border-t border-slate-100 space-y-3">
                    <Button
                      variant="outline"
                      className="w-full border-2 border-emerald-100 text-emerald-700 hover:bg-emerald-50 rounded-2xl h-14 font-bold text-lg transition-all"
                      asChild
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href="/auth/login">
                        <LogIn className="mr-2 h-5 w-5" /> Login
                      </Link>
                    </Button>
                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-14 font-bold text-lg shadow-emerald-200 shadow-xl transition-all"
                      asChild
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href="/donate">
                        <Heart className="mr-2 h-5 w-5 fill-current" /> Donate Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
