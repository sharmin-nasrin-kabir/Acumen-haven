"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, MapPin } from 'lucide-react'
import { createClient } from "@/lib/supabase/client"

const Footer = () => {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [footerInfo, setFooterInfo] = useState({
    description: "Youth-led. Climate-focused. Impact-driven. We equip young changemakers to lead on climate, sustainability, and human rights — globally and locally.",
    address: "Arizona, USA & Dhaka, Bangladesh",
    copyright: "© 2025 Acumen Haven | 501(c)(3) Status: Applied | Registered Nonprofit in Arizona | EIN: 39-2475418"
  })

  useEffect(() => {
    const supabase = createClient()
    supabase.from('site_settings').select('value').eq('key', 'footer_info').single().then(({ data }) => {
      if (data?.value) setFooterInfo(data.value)
    })
  }, [])

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/profile.php?id=61568950987067", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/acumenhaven", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/106837339/", label: "LinkedIn" },
    { icon: Youtube, href: "https://www.youtube.com/@AcumenHaven", label: "YouTube" },
  ]

  const maskColor = isHomePage ? "#0f172a" : "#ffffff"
  const waveColors = isHomePage ? ["#064e3b", "#065f46", "#10b981"] : ["#dcfce7", "#4ade80", "#166534"]
  const waveOpacities = isHomePage ? ["0.6", "0.8", "0.3"] : ["0.5", "0.7", "0.85"]

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
          <path d="M0,40 C200,100 450,20 600,20 C750,20 1000,100 1200,40 L1200,120 L0,120 Z" fill={waveColors[0]} opacity={waveOpacities[0]} />
          <path d="M0,60 C250,110 500,40 600,40 C700,40 950,110 1200,60 L1200,120 L0,120 Z" fill={waveColors[1]} opacity={waveOpacities[1]} />
          <path d="M0,80 C300,130 550,60 600,60 C650,60 900,130 1200,80 L1200,120 L0,120 Z" fill={waveColors[2]} opacity={waveOpacities[2]} />
          <path d="M0,100 C350,140 550,80 600,80 C650,80 850,140 1200,100 L1200,120 L0,120 Z" fill="#1f1f22" />
        </svg>
      </div>

      <div className="relative bg-[#1f1f22]" style={{ marginTop: "-1px" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: "url(https://res.cloudinary.com/dj4f7f52a/image/upload/v1768661267/Summer_Sports_Games_Coloring_Worksheet_in_Blue_White_Simple_Style_1_gstmbm.png)", backgroundSize: "contain", backgroundPosition: "center top", backgroundRepeat: "no-repeat", opacity: 0.2, width: "51%", height: "100%", top: "-5%", left: "24.5%" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40" />
        </div>

        <div className="relative z-10 pt-4 pb-12 md:pb-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              <div className="lg:col-span-2">
                <Link href="/" className="flex items-center group mb-5">
                  <Image src="/AH-Logo-Name.png" alt="Acumen Haven" width={160} height={32} className="brightness-0 invert h-auto w-auto max-h-10" />
                </Link>
                <p className="text-[#EDEDED] mb-10 max-w-md leading-[1.75] text-[17px] font-light">{footerInfo.description}</p>
                <div className="mb-10">
                  <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-wider">Connect With Us</h3>
                  <div className="flex space-x-3">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon
                      return (
                        <a key={index} href={social.href} className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all group">
                          <Icon className="h-6 w-6 text-white/80 group-hover:text-white" />
                        </a>
                      )
                    })}
                  </div>
                </div>
                <div className="space-y-5">
                  <div className="flex items-center space-x-4 text-[#EDEDED]"><Mail className="h-6 w-6 text-green-400" /><a href="mailto:contact@acumenhaven.com" className="hover:text-white font-light text-[17px]">contact@acumenhaven.com</a></div>
                  <div className="flex items-center space-x-4 text-[#EDEDED]"><MapPin className="h-6 w-6 text-green-400" /><span className="font-light text-[17px]">{footerInfo.address}</span></div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-wider">Quick Links</h3>
                <ul className="space-y-5">
                  {[{ href: "/about", label: "About Us" }, { href: "/programs", label: "What We Do" }, { href: "/get-involved", label: "Join Us" }, { href: "/resources", label: "Resources" }, { href: "/blog", label: "Stories" }].map((link, index) => (
                    <li key={index}><Link href={link.href} className="text-[#EDEDED] hover:text-white hover:translate-x-2 transition-all font-light text-[17px] flex items-center group"><span className="w-2 h-2 bg-green-400 rounded-full mr-4 group-hover:bg-white transition-colors"></span>{link.label}</Link></li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-8 text-white uppercase tracking-wider">Get Involved</h3>
                <ul className="space-y-5">
                  {[{ href: "/get-involved", label: "Become an Ambassador" }, { href: "/get-involved", label: "Volunteer" }, { href: "/donate", label: "Donate" }, { href: "/contact", label: "Contact Us" }].map((link, index) => (
                    <li key={index}><Link href={link.href} className="text-[#EDEDED] hover:text-white hover:translate-x-2 transition-all font-light text-[17px] flex items-center group"><span className="w-2 h-2 bg-green-400 rounded-full mr-4 group-hover:bg-white transition-colors"></span>{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800/30 py-8 px-6 relative z-10 bg-black/10 text-center">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[#EDEDED] text-sm">
            <div className="max-w-xl font-light">{footerInfo.copyright}</div>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <Link href="/about/legal">Privacy</Link><Link href="/about/legal">Terms</Link><Link href="/about/legal">Legal</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
