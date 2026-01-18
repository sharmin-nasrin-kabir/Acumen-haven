"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <Card className="group rounded-[2rem] border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white relative">
      {/* Profile Image Section */}
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

        {/* Social Links */}
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

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </Card>
  )
}
