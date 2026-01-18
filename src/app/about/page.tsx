"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Globe, X } from "lucide-react"
import TeamMemberCard from "@/components/TeamMemberCard"
import Image from "next/image"
import { teamMembers as teamData } from "@/data/content"

// Enriching the data from content.ts for the UI
const members = [
  {
    ...teamData[0],
    initials: "SN",
    bgColor: "bg-emerald-500",
    image: "https://res.cloudinary.com/dj4f7f52a/image/upload/v1737184649/IMG_0126_f4vpgi.jpg",
    email: "sharmin@acumenhaven.org",
    linkedin: "https://linkedin.com/in/sharmin-nasrin",
    twitter: "https://twitter.com/sharmin_nasrin",
  },
  {
    ...teamData[1],
    initials: "SF",
    bgColor: "bg-blue-500",
    image: "/placeholder-user.jpg",
    email: "syeda@acumenhaven.org",
    linkedin: "https://linkedin.com/in/syeda-fatima",
    twitter: "https://twitter.com/syeda_fatima",
  },
  {
    ...teamData[2],
    initials: "SF",
    bgColor: "bg-orange-500",
    image: "https://res.cloudinary.com/dj4f7f52a/image/upload/v1737184518/ferdous_vpxp2s.jpg",
    email: "ferdous@acumenhaven.org",
    linkedin: "https://linkedin.com/in/sm-ferdous",
    twitter: "https://twitter.com/sm_ferdous",
  },
  {
    ...teamData[3],
    initials: "SI",
    bgColor: "bg-purple-500",
    image: "/placeholder-user.jpg",
    email: "saira@acumenhaven.org",
    linkedin: "https://linkedin.com/in/saira-islam",
    twitter: "https://twitter.com/saira_islam",
  },
]

// Adding some key volunteers/ambassadors data based on project history
const volunteers = [
  {
    name: "Razin Ibn Asad Molla",
    role: "Core Volunteer",
    description: "Leads local school workshops and community climate awareness campaigns.",
    initials: "RM",
    bgColor: "bg-teal-500",
    image: "/placeholder-user.jpg",
    email: "volunteer@acumenhaven.org",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Sarah Johnson",
    role: "Student Leader",
    description: "Drives recycling initiatives and youth climate circles in the US chapter.",
    initials: "SJ",
    bgColor: "bg-amber-500",
    image: "/placeholder-user.jpg",
    email: "sarah@acumenhaven.org",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Michael Thompson",
    role: "Program Alumni",
    description: "Mentors new climate ambassadors and supports outreach events.",
    initials: "MT",
    bgColor: "bg-indigo-500",
    image: "/placeholder-user.jpg",
    email: "michael@acumenhaven.org",
    linkedin: "#",
    twitter: "#",
  },
]

export default function AboutPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const collageImages = [
    "https://res.cloudinary.com/dj4f7f52a/image/upload/v1768730227/543452742_122143475276631699_8398914069928845342_n_ndagxn.jpg",
    "https://res.cloudinary.com/dj4f7f52a/image/upload/v1768731410/496026435_122135457596631699_7113958457378391658_n_omkp2i.jpg",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop"
  ]

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Fullscreen Lightbox - Only opens on click */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setActiveImage(null)}
          >
            <button className="absolute top-6 right-6 text-white p-2 z-[110]">
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative w-full h-[85vh] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={activeImage} alt="Full View" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slanted Multi-Image Header Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end justify-center pb-8 md:pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0 flex w-[150%] md:w-[120%] -left-[25%] md:-left-[10%]">
          {collageImages.map((url, idx) => (
            <motion.div
              key={idx}
              animate={{
                flex: hoveredIdx === idx ? 4 : (typeof window !== 'undefined' && window.innerWidth < 768 && idx === 2 && hoveredIdx === null) ? 2 : 1
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setActiveImage(url)}
              className="relative h-full transition-all duration-500 overflow-hidden cursor-pointer border-r-2 md:border-r-4 border-white -skew-x-12"
            >
              <div className="absolute inset-0 skew-x-12 scale-150 md:scale-125 h-full w-full">
                <Image
                  src={url}
                  alt={`Team ${idx}`}
                  fill
                  className="object-cover object-center"
                  priority
                />
                {/* 5% Overlay as requested */}
                <div className={`absolute inset-0 transition-opacity duration-300 ${hoveredIdx !== null && hoveredIdx !== idx ? 'bg-black/40' : 'bg-black/5'}`}></div>
              </div>
            </motion.div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none"></div>
        </div>

        {/* Text over the slanted images */}
        <div className="max-w-7xl mx-auto text-center relative z-20 pointer-events-none px-4 md:px-6 pb-4 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-emerald-500 text-white border-none px-3 py-1 md:px-6 md:py-1.5 rounded-full mb-3 md:mb-6 shadow-xl leading-none text-xs md:text-sm">
              Our Growing Family
            </Badge>
            <h1 className="text-4xl md:text-8xl font-black text-white mb-3 md:mb-6 tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_10px_rgba(0,0,0,0.5)]">
              Meet the Team
            </h1>
            <p className="text-sm md:text-2xl text-white max-w-3xl mx-auto font-bold leading-relaxed drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] opacity-90">
              A collective of visionaries & changemakers working for a resilient future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="group rounded-[2.5rem] border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-emerald-50 to-white overflow-hidden">
              <CardContent className="p-10 text-center">
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  We empower communities to take action on climate change through knowledge, innovation, and research,
                  building a just and sustainable future for all.
                </p>
              </CardContent>
            </Card>

            <Card className="group rounded-[2.5rem] border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
              <CardContent className="p-10 text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  To nurture a new generation of leaders who build a better world while tackling climate change head-on
                  with innovative and local solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership & Core Team */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 border-l-4 border-emerald-500 pl-6">
            <h2 className="text-2xl font-bold text-slate-900">Core Leadership</h2>
            <p className="text-slate-500">Distinguished professionals driving our vision forward.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TeamMemberCard member={member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteers & Community Leaders */}
      <section className="py-20 px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 border-l-4 border-blue-500 pl-6">
            <h2 className="text-2xl font-bold text-slate-900">Key Volunteers & Ambassadors</h2>
            <p className="text-slate-500">The grassroots force making local impact possible.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {volunteers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TeamMemberCard member={member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Note */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">And Hundreds of Volunteers Globally</h3>
          <p className="text-slate-500 leading-relaxed mb-8">
            Our movement is powered by the collective action of students, educators, and activists in multiple countries.
            Every hand helps in building a sustainable and equitable future.
          </p>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full"></div>
        </div>
      </section>
    </div>
  )
}
