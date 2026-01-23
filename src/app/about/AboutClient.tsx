"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Globe, X, History } from "lucide-react"
import TeamMemberCard from "@/components/TeamMemberCard"
import Image from "next/image"

interface AboutClientProps {
    content: {
        story: { title: string; content: string }
        mission: { title: string; content: string }
        vision: { title: string; content: string }
        header: { badge: string; title: string; description: string }
        collageImages: string[]
    }
    teamMembers: any[]
}

export default function AboutClient({ content, teamMembers }: AboutClientProps) {
    const [activeImage, setActiveImage] = useState<string | null>(null)
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

    const { story, mission, vision, header, collageImages } = content

    const coreTeam = teamMembers.filter(m => m.category === 'Core Leadership')
    const volunteers = teamMembers.filter(m => m.category === 'Volunteer')

    return (
        <div className="w-full bg-slate-50 min-h-screen">
            {/* Fullscreen Lightbox */}
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
            <section className="relative h-[65vh] md:h-[75vh] flex items-end justify-center pb-8 md:pb-20 overflow-hidden bg-slate-900">
                {/* Desktop: 4 slanted images */}
                <div className="hidden md:flex absolute inset-0 z-0 w-[115%] -left-[7.5%]">
                    {collageImages.map((url, idx) => (
                        <motion.div
                            key={idx}
                            animate={{
                                flex: hoveredIdx === idx ? 3.5 : 1
                            }}
                            onMouseEnter={() => setHoveredIdx(idx)}
                            onMouseLeave={() => setHoveredIdx(null)}
                            onClick={() => setActiveImage(url)}
                            className="relative h-full transition-all duration-500 overflow-hidden cursor-pointer border-r-4 border-white/20 -skew-x-6"
                        >
                            <div className="absolute inset-0 skew-x-6 scale-110 h-full w-full">
                                <Image
                                    src={url}
                                    alt={`Team ${idx}`}
                                    fill
                                    className="object-cover object-[center_30%]"
                                    priority
                                />
                                <div className={`absolute inset-0 transition-all duration-300 ${hoveredIdx !== null && hoveredIdx !== idx ? 'bg-black/50' : 'bg-black/10'}`}></div>
                            </div>
                        </motion.div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
                </div>

                {/* Mobile: Grid of 4 images */}
                <div className="md:hidden absolute inset-0 z-0 grid grid-cols-2 gap-1">
                    {collageImages.map((url, idx) => (
                        <div
                            key={idx}
                            onClick={() => setActiveImage(url)}
                            className="relative h-full overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={url}
                                alt={`Team ${idx}`}
                                fill
                                className="object-cover object-[center_35%]"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/15"></div>
                        </div>
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"></div>
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-20 pointer-events-none px-4 md:px-6 pb-4 md:pb-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge className="bg-emerald-500 text-white border-none px-4 py-1.5 md:px-6 md:py-2 rounded-full mb-4 md:mb-6 shadow-xl leading-none text-xs md:text-sm font-bold">
                            {header.badge}
                        </Badge>
                        <h1 className="text-5xl md:text-8xl font-black text-white mb-4 md:mb-6 tracking-tighter drop-shadow-[0_10px_15px_rgba(0,0,0,0.9)] [text-shadow:_3px_3px_12px_rgba(0,0,0,0.7)]">
                            {header.title}
                        </h1>
                        <p className="text-base md:text-2xl text-white max-w-3xl mx-auto font-bold leading-relaxed drop-shadow-[0_5px_8px_rgba(0,0,0,0.9)] opacity-95">
                            {header.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story, Mission & Vision Section */}
            <section className="py-20 px-6 bg-white/50 backdrop-blur-sm border-b border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        <div className="lg:col-span-7 space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full font-bold text-sm mb-2 shadow-sm uppercase tracking-wider">
                                <History className="w-4 h-4" />
                                Our Story
                            </div>
                            <div className="prose prose-slate max-w-none">
                                <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">{story.title}</h2>
                                <div className="space-y-6 text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">
                                    {story.content}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 grid md:grid-cols-2 lg:grid-cols-1 gap-8">
                            <Card className="group rounded-[2.5rem] border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-emerald-50 to-white overflow-hidden h-full">
                                <CardContent className="p-10 text-center lg:text-left">
                                    <div className="mx-auto lg:mx-0 w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                        <Target className="h-8 w-8 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">{mission.title}</h2>
                                    <p className="text-slate-600 leading-relaxed text-lg">
                                        {mission.content}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="group rounded-[2.5rem] border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-blue-50 to-white overflow-hidden h-full">
                                <CardContent className="p-10 text-center lg:text-left">
                                    <div className="mx-auto lg:mx-0 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                        <Globe className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">{vision.title}</h2>
                                    <p className="text-slate-600 leading-relaxed text-lg">
                                        {vision.content}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership & Core Team */}
            {coreTeam.length > 0 && (
                <section className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-12 border-l-4 border-emerald-500 pl-6">
                            <h2 className="text-2xl font-bold text-slate-900">Core Leadership</h2>
                            <p className="text-slate-500">Distinguished professionals driving our vision forward.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {coreTeam.map((member, index) => (
                                <TeamMemberCard
                                    key={member.id || index}
                                    member={{
                                        ...member,
                                        image: member.image_url || `default:${member.gender || 'male'}`,
                                        linkedin: member.linkedin_url || '#',
                                        twitter: member.twitter_url || '#',
                                        initials: member.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2),
                                        bgColor: member.gender === 'female' ? 'bg-pink-500' : 'bg-emerald-500'
                                    }}
                                    variant="premium"
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Volunteers & Community Leaders */}
            {volunteers.length > 0 && (
                <section className="py-20 px-6 bg-white border-y border-slate-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-12 border-l-4 border-blue-500 pl-6">
                            <h2 className="text-2xl font-bold text-slate-900">Key Volunteers & Ambassadors</h2>
                            <p className="text-slate-500">The grassroots force making local impact possible.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {volunteers.map((member, index) => (
                                <TeamMemberCard
                                    key={member.id || index}
                                    member={{
                                        ...member,
                                        image: member.image_url || `default:${member.gender || 'male'}`,
                                        linkedin: member.linkedin_url || '#',
                                        twitter: member.twitter_url || '#',
                                        initials: member.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2),
                                        bgColor: member.gender === 'female' ? 'bg-blue-500' : 'bg-teal-500'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

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
