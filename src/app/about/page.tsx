import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, Heart, Shield, ArrowRight, Download, Users, Globe, Lightbulb } from "lucide-react"
import Link from "next/link"
import TeamMemberCard from "@/components/TeamMemberCard"

const teamMembers = [
  {
    name: "Sharmin Nasrin, PhD",
    role: "President and CEO",
    description:
      "Dr. Sharmin Nasrin is a researcher, educator, and global advocate for climate justice. With a PhD in Transport Planning and a master's in environmental engineering, she bridges science, data, and policy to create real-world impact. Dr. Sharmin leads with a vision to empower youth through knowledge, equity, and grassroots action—mobilizing the next generation to build a sustainable, just future.",
    initials: "SN",
    bgColor: "bg-emerald-500",
    image: "/placeholder-user.jpg", // You can replace with actual profile image
    email: "sharmin@acumenhaven.org",
    linkedin: "https://linkedin.com/in/sharmin-nasrin",
    twitter: "https://twitter.com/sharmin_nasrin",
  },
  {
    name: "Syeda Fatima",
    role: "Vice President & Secretary",
    description:
      "Supports organizational operations and strategic decision-making. With HR and youth leadership background, ensures transparency and alignment with our mission. She brings strategic thinking and operational excellence to drive organizational growth.",
    initials: "SF",
    bgColor: "bg-blue-500",
    image: "/placeholder-user.jpg", // You can replace with actual profile image
    email: "syeda@acumenhaven.org",
    linkedin: "https://linkedin.com/in/syeda-fatima",
    twitter: "https://twitter.com/syeda_fatima",
  },
  {
    name: "S.M. Ferdous",
    role: "Field Coordinator (Bangladesh)",
    description:
      "With a Bachelor's degree in English, S.M. Ferdous leads grassroots implementation of Acumen Haven's initiatives in Bangladesh. He coordinates volunteer teams, builds school partnerships, and ensures impactful community engagement around climate awareness and sustainable behavior.",
    initials: "SF",
    bgColor: "bg-orange-500",
    image: "https://res.cloudinary.com/dj4f7f52a/image/upload/v1759690939/doasetjczuin8nsndrg8.jpg",
    email: "ferdous@acumenhaven.org",
    linkedin: "https://linkedin.com/in/sm-ferdous",
    twitter: "https://twitter.com/sm_ferdous",
  },
]

export default function AboutPage() {
  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
      {/* Hero Section - Enhanced with better visual elements */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-white to-blue-50/40"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="bg-emerald-500/10 text-emerald-700 border border-emerald-200 px-6 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            Who We Are
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 mb-6 tracking-tight">
            About Acumen Haven
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A youth-powered nonprofit where emerging changemakers lead the fight against climate change and inequality.
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Our Story</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Through knowledge, innovation, and local action, we help communities build solutions that matter — from
              classrooms to neighborhoods.
            </p>
          </div>

          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <p className="text-lg text-slate-600 leading-relaxed">
                  Acumen Haven is a youth-powered nonprofit where emerging changemakers lead the fight against climate
                  change and inequality. Through knowledge, innovation, and local action, we help communities build
                  solutions that matter — from classrooms to neighborhoods.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  We are guided by the Sustainable Development Goals (SDGs) and inspired by the vision of "Three Zeros"
                  — zero poverty, zero emissions, zero inequality.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-6">
                  <div className="text-center p-4 bg-emerald-50 rounded-xl">
                    <div className="text-2xl font-bold text-emerald-600">2+</div>
                    <div className="text-sm text-slate-600">Countries</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-youth-600">100+</div>
                    <div className="text-sm text-slate-600">Youth Leaders</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg"
                    alt="About Acumen Haven"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent" />
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <Lightbulb className="h-12 w-12 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Team Section - Enhanced with profile images */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-3xl mb-8 shadow-lg">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                Meet the Changemakers
              </h3>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Our passionate leaders driving climate action and youth empowerment across communities.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {teamMembers.map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
            </div>
          </div>

          {/* Quick Links Section - Refined design */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-6">
              <Target className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              Explore Our Foundation
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <Target className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-emerald-700 font-bold text-lg group-hover:text-emerald-600 transition-colors duration-300">
                  Mission & Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Learn about our purpose, goals, and the future we're working toward.
                </p>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl px-6 py-2 group/btn transition-all duration-300"
                  asChild
                >
                  <Link href="/about/mission">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700 font-bold text-lg group-hover:text-blue-600 transition-colors duration-300">
                  Legal & Governance
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Our nonprofit status, organizational bylaws, and governance structure.
                </p>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl px-6 py-2 group/btn transition-all duration-300"
                  asChild
                >
                  <Link href="/about/legal">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-orange-700 font-bold text-lg group-hover:text-orange-600 transition-colors duration-300">
                  Culture & Values
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-600 mb-8 leading-relaxed">
                  How we work together, communicate, and build our community.
                </p>
                <Button
                  className="bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl px-6 py-2 group/btn transition-all duration-300"
                  asChild
                >
                  <a href="/culture-code.pdf" download>
                    <Download className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                    Download
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
