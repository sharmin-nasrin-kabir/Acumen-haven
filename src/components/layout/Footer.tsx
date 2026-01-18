"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/profile.php?id=61568950987067", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/acumenhaven", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/106837339/", label: "LinkedIn" },
    { icon: Youtube, href: "https://www.youtube.com/@AcumenHaven", label: "YouTube" },
  ]

  // Dynamic colors based on route
  const maskColor = isHomePage ? "#0f172a" : "#ffffff" // Slate-900 vs White

  // Wave colors: [Top/Back, Middle, Bottom/Front]
  const waveColors = isHomePage
    ? ["#064e3b", "#065f46", "#10b981"] // Deep Emerald -> Bright Emerald Accents
    : ["#dcfce7", "#4ade80", "#166534"]

  const waveOpacities = isHomePage
    ? ["0.6", "0.8", "0.3"] // Higher opacity for dark mode richness
    : ["0.5", "0.7", "0.85"]

  return (
    <footer className="text-white relative overflow-hidden" style={{ marginTop: "-2px" }}>
      {/* Top Transition: Wave Mountains */}
      <div className="relative w-full overflow-hidden z-20" style={{ marginBottom: "-1px" }}>
        <svg
          className="relative block w-full h-[80px] md:h-[150px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ backgroundColor: maskColor, transition: "background-color 0.3s ease" }}
        >
          {/* Artistic Wave Layers */}
          <path
            d="M0,40 C200,100 450,20 600,20 C750,20 1000,100 1200,40 L1200,120 L0,120 Z"
            fill={waveColors[0]}
            opacity={waveOpacities[0]}
          ></path>

          <path
            d="M0,60 C250,110 500,40 600,40 C700,40 950,110 1200,60 L1200,120 L0,120 Z"
            fill={waveColors[1]}
            opacity={waveOpacities[1]}
          ></path>

          <path
            d="M0,80 C300,130 550,60 600,60 C650,60 900,130 1200,80 L1200,120 L0,120 Z"
            fill={waveColors[2]}
            opacity={waveOpacities[2]}
          ></path>

          {/* Final layer matching the footer body color exactly (#1f1f22) */}
          <path
            d="M0,100 C350,140 550,80 600,80 C650,80 850,140 1200,100 L1200,120 L0,120 Z"
            fill="#1f1f22"
          ></path>
        </svg>
      </div>

      {/* Main Footer Body with Dark Background and Map */}
      <div className="relative bg-[#1f1f22]" style={{ marginTop: "-1px" }}>
        {/* Background Map Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/dj4f7f52a/image/upload/v1768661267/Summer_Sports_Games_Coloring_Worksheet_in_Blue_White_Simple_Style_1_gstmbm.png)",
              backgroundSize: "contain",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              opacity: 0.2,
              width: "51%",
              height: "100%",
              top: "-5%",
              left: "24.5%",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40"></div>
        </div>

        <div className="relative z-10 pt-4 pb-12 md:pb-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Logo and Description */}
              <div className="lg:col-span-2 md:-translate-x-[10%]">
                <Link href="/" className="flex items-center group transition-all duration-300 mb-5">
                  <div className="relative">
                    <Image
                      src="/AH-Logo-Name.png"
                      alt="Acumen Haven"
                      width={160}
                      height={32}
                      className="transition-all duration-500 group-hover:scale-105 brightness-0 invert h-auto w-auto max-h-10"
                    />
                    <div className="absolute inset-0 bg-white/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>

                <p className="text-[#EDEDED] mb-10 max-w-md leading-[1.75] text-[17px] font-light">
                  Youth-led. Climate-focused. Impact-driven. We equip young changemakers to lead on climate,
                  sustainability, and human rights — globally and locally.
                </p>

                {/* Social Media Links */}
                <div className="mb-10">
                  <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-wider">Connect With Us</h3>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => {
                      const IconComponent = social.icon
                      return (
                        <a
                          key={index}
                          href={social.href}
                          aria-label={social.label}
                          className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group focus:outline-none focus:ring-2 focus:ring-white/50"
                        >
                          <IconComponent className="h-6 w-6 text-white/80 group-hover:text-white transition-colors duration-300" />
                        </a>
                      )
                    })}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-5">
                  <div className="flex items-center space-x-4 text-[#EDEDED]">
                    <Mail className="h-6 w-6 text-green-400" />
                    <a href="mailto:contact@acumenhaven.com" className="hover:text-white transition-colors font-light text-[17px] leading-[1.75]">
                      contact@acumenhaven.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-4 text-[#EDEDED]">
                    <MapPin className="h-6 w-6 text-green-400" />
                    <span className="font-light text-[17px] leading-[1.75]">Arizona, USA & Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-wider">Quick Links</h3>
                <ul className="space-y-5">
                  {[
                    { href: "/about", label: "About Us" },
                    { href: "/programs", label: "What We Do" },
                    { href: "/get-involved", label: "Join Us" },
                    { href: "/resources", label: "Resources" },
                    { href: "/blog", label: "Stories" },
                    { href: "/partners", label: "Partners" },
                  ].map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-[#EDEDED] hover:text-white hover:translate-x-2 transition-all duration-300 font-light text-[17px] leading-[1.75] flex items-center group"
                      >
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-4 group-hover:bg-white transition-colors duration-300"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Get Involved Section */}
              <div className="md:translate-x-[15%]">
                <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-wider">Get Involved</h3>
                <ul className="space-y-5">
                  {[
                    { href: "/get-involved", label: "Become an Ambassador" },
                    { href: "/get-involved", label: "Volunteer" },
                    { href: "/donate", label: "Donate" },
                    { href: "/contact", label: "Contact Us" },
                  ].map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-[#EDEDED] hover:text-white hover:translate-x-2 transition-all duration-300 font-light text-[17px] leading-[1.75] flex items-center group"
                      >
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-4 group-hover:bg-white transition-colors duration-300"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-800/30 py-8 px-6 relative z-10 bg-black/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[#EDEDED]">
              <div className="text-[15px] font-light text-center md:text-left leading-relaxed">
                © 2025 Acumen Haven | 501(c)(3) Status: Applied | Registered Nonprofit in Arizona | EIN: 39-2475418
              </div>
              <div className="flex space-x-8 text-[15px]">
                <Link href="/about/legal" className="hover:text-white transition-colors font-light">
                  Privacy Policy
                </Link>
                <Link href="/about/legal" className="hover:text-white transition-colors font-light">
                  Terms of Service
                </Link>
                <Link href="/about/legal" className="hover:text-white transition-colors font-light">
                  Legal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
