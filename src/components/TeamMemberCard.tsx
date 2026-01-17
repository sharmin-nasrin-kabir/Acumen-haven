"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Linkedin, Twitter } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

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
    <Card className="group rounded-3xl border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-white/90 backdrop-blur-sm relative">
      {/* Profile Image Section */}
      <div className="relative pt-8 pb-4 text-center">
        <div className="relative mx-auto w-48 h-48 mb-8">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full shadow-xl"></div>
          <div className="absolute inset-3 bg-white rounded-full shadow-inner overflow-hidden">
            {!imageError ? (
              <Image
                src={member.image}
                alt={`${member.name} profile picture`}
                width={180}
                height={180}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className={`w-full h-full ${member.bgColor} rounded-full flex items-center justify-center`}>
                <span className="text-5xl font-bold text-white">{member.initials}</span>
              </div>
            )}
          </div>
          {/* Online status indicator */}
          <div className="absolute bottom-3 right-3 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white shadow-lg"></div>
        </div>
        
        <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors duration-300 mb-2">
          {member.name}
        </CardTitle>
        <CardDescription className="font-semibold text-emerald-600 text-base mb-4">
          {member.role}
        </CardDescription>
      </div>

      <CardContent className="px-8 pb-8">
        <p className="text-sm text-slate-600 leading-relaxed mb-6 text-center">
          {member.description}
        </p>
        
        {/* Social Links */}
        <div className="flex justify-center space-x-4">
          <a
            href={`mailto:${member.email}`}
            className="w-10 h-10 bg-slate-100 hover:bg-emerald-100 rounded-full flex items-center justify-center transition-all duration-300 group/link"
            aria-label={`Email ${member.name}`}
          >
            <Mail className="h-5 w-5 text-slate-600 group-hover/link:text-emerald-600 transition-colors duration-300" />
          </a>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-slate-100 hover:bg-blue-100 rounded-full flex items-center justify-center transition-all duration-300 group/link"
            aria-label={`${member.name} LinkedIn`}
          >
            <Linkedin className="h-5 w-5 text-slate-600 group-hover/link:text-blue-600 transition-colors duration-300" />
          </a>
          <a
            href={member.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-slate-100 hover:bg-sky-100 rounded-full flex items-center justify-center transition-all duration-300 group/link"
            aria-label={`${member.name} Twitter`}
          >
            <Twitter className="h-5 w-5 text-slate-600 group-hover/link:text-sky-600 transition-colors duration-300" />
          </a>
        </div>
      </CardContent>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
    </Card>
  )
}
