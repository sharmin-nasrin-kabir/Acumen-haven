"use client"

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Mail, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { motion } from "motion/react"

interface TeamMember {
  name: string
  role: string
  description: string
  initials: string
  bgColor: string
  image: string
  email: string
  linkedin: string
  twitter: string
}

interface TeamMemberCardProps {
  member: TeamMember
  variant?: "default" | "premium"
}

export default function TeamMemberCard({ member, variant = "default" }: TeamMemberCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  if (variant === "premium") {
    return (
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="group relative rounded-[2.5rem] border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white overflow-hidden h-full">
          {/* Animated Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full -ml-12 -mb-12 group-hover:scale-150 transition-transform duration-700"></div>

          {/* Profile Header */}
          <div className="relative pt-12 text-center z-10">
            <div className="relative mx-auto w-48 h-48 mb-8">
              {/* Outer Glow/Ring */}
              <div className={`absolute -inset-2 rounded-[2.5rem] opacity-20 group-hover:opacity-40 blur-xl transition-all duration-500 ${member.bgColor}`}></div>

              {/* Image Frame */}
              <div className="absolute inset-0 bg-white rounded-[2.2rem] shadow-inner overflow-hidden border-4 border-white z-20 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
                {!imageError ? (
                  <Image
                    src={member.image}
                    alt={`${member.name}`}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    onError={handleImageError}
                  />
                ) : (
                  <div className={`w-full h-full ${member.bgColor} flex items-center justify-center`}>
                    <span className="text-5xl font-black text-white">{member.initials}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="px-8 space-y-2">
              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                {member.name}
              </h3>
              <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest border border-emerald-100/50">
                {member.role}
              </div>
            </div>
          </div>

          <CardContent className="px-10 py-8 relative z-10 text-center">
            <p className="text-slate-500 leading-relaxed font-medium text-sm mb-8">
              &quot;{member.description}&quot;
            </p>

            {/* Premium Glass Social Bar */}
            <div className="flex justify-center items-center gap-3 p-2 bg-slate-50/50 backdrop-blur-md rounded-2xl border border-slate-100 w-fit mx-auto transition-all duration-500 group-hover:bg-white group-hover:shadow-md">
              <a
                href={`mailto:${member.email}`}
                className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm hover:bg-emerald-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label={`Email ${member.name}`}
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label={`${member.name} LinkedIn`}
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm hover:bg-sky-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                aria-label={`${member.name} Twitter`}
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </CardContent>

          {/* Luxury border indicator */}
          <div className={`absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-1000 ease-in-out ${member.bgColor}`}></div>
        </Card>
      </motion.div>
    )
  }

  // Default variant (Standard Team / Volunteers)
  return (
    <Card className="group rounded-[2rem] border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white relative">
      <div className="relative pt-10 pb-4 text-center">
        <div className="relative mx-auto w-40 h-40 mb-6">
          <div className="absolute inset-0 bg-slate-100 rounded-2xl group-hover:rotate-6 transition-transform duration-500"></div>
          <div className="absolute inset-0 bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100 group-hover:-rotate-3 transition-transform duration-500">
            {!imageError ? (
              <Image
                src={member.image}
                alt={`${member.name} profile picture`}
                width={160}
                height={160}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                onError={handleImageError}
              />
            ) : (
              <div className={`w-full h-full ${member.bgColor} flex items-center justify-center`}>
                <span className="text-4xl font-bold text-white tracking-tighter">{member.initials}</span>
              </div>
            )}
          </div>
        </div>

        <div className="px-6">
          <CardTitle className="text-xl font-black text-slate-900 mb-1">
            {member.name}
          </CardTitle>
          <CardDescription className="font-bold text-emerald-600 text-sm uppercase tracking-widest mb-4">
            {member.role}
          </CardDescription>
        </div>
      </div>

      <CardContent className="px-8 pb-10">
        <p className="text-sm text-slate-500 leading-relaxed mb-8 text-center font-light">
          {member.description}
        </p>

        <div className="flex justify-center space-x-3">
          <a
            href={`mailto:${member.email}`}
            className="w-10 h-10 border border-slate-100 hover:border-emerald-500 hover:bg-emerald-50 rounded-full flex items-center justify-center transition-all duration-300 group/link"
            aria-label={`Email ${member.name}`}
          >
            <Mail className="h-4 w-4 text-slate-400 group-hover/link:text-emerald-600 transition-colors duration-300" />
          </a>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-slate-100 hover:border-blue-500 hover:bg-blue-50 rounded-full flex items-center justify-center transition-all duration-300 group/link"
            aria-label={`${member.name} LinkedIn`}
          >
            <Linkedin className="h-4 w-4 text-slate-400 group-hover/link:text-blue-600 transition-colors duration-300" />
          </a>
          <a
            href={member.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-slate-100 hover:border-sky-500 hover:bg-sky-50 rounded-full flex items-center justify-center transition-all duration-300 group/link"
            aria-label={`${member.name} Twitter`}
          >
            <Twitter className="h-4 w-4 text-slate-400 group-hover/link:text-sky-600 transition-colors duration-300" />
          </a>
        </div>
      </CardContent>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </Card>
  )
}
