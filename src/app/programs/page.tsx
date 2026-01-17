"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Lightbulb, Target, Zap, Bus, Users, Leaf, Trash2, Trophy } from "lucide-react"

export default function ProgramsPage() {
  const focusAreas = [
    {
      title: "Transport & Mobility",
      description:
        "Transforming urban mobility through education and sustainable transport choices. We connect traffic awareness with climate awareness, empowering communities to adopt low-emission behaviors.",
      icon: Bus,
      link: "/programs/transport-mobility",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      iconColor: "bg-blue-600",
      hoverColor: "hover:bg-blue-100",
    },
    {
      title: "Education & Youth Empowerment",
      description:
        "Building climate-resilient citizens through grassroots education that connects daily life to climate action. Empowering youth as changemakers and community leaders.",
      icon: Users,
      link: "/programs/education-empowerment",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      iconColor: "bg-emerald-600",
      hoverColor: "hover:bg-emerald-100",
    },
    {
      title: "Tree Planting & Urban Greening",
      description:
        "Creating climate-resilient cities through carbon sequestration, temperature regulation, and community-led greening initiatives that improve air quality and biodiversity.",
      icon: Leaf,
      link: "/programs/tree-planting",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      iconColor: "bg-green-600",
      hoverColor: "hover:bg-green-100",
    },
    {
      title: "Waste Management & Circular Economy",
      description:
        "Turning waste from a climate problem into a climate solution through composting, recycling, and circular economy education that reduces methane emissions.",
      icon: Trash2,
      link: "/programs/waste-management",
      bgColor: "bg-teal-50",
      textColor: "text-teal-700",
      iconColor: "bg-teal-600",
      hoverColor: "hover:bg-teal-100",
    },
    {
      title: "Exhibition and Competition",
      description:
        "Amplifying youth voices through creative expression, competitions, and public exhibitions that inspire community dialogue around environmental challenges.",
      icon: Trophy,
      link: "/programs/exhibition-competition",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      iconColor: "bg-purple-600",
      hoverColor: "hover:bg-purple-100",
    },
  ]

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "-2s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-100/20 to-blue-100/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6 md:space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-emerald-100/80 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full border border-emerald-200/50 shadow-lg">
              <Target className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold text-sm sm:text-base md:text-lg">What We Do</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-slate-900">Empowering </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">
                  Climate Action
                </span>
                <span className="text-slate-900"> Through </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
                  Youth Leadership
                </span>
              </h1>
            </div>

            {/* Description */}
            <div className="max-w-4xl mx-auto">
              <p className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed">
                Acumen Haven empowers young people to take action on climate, sustainability, and human rights — both
                locally and globally. We design programs that are{" "}
                <span className="text-emerald-600 font-semibold">youth-led</span>,{" "}
                <span className="text-blue-600 font-semibold">low-cost</span>, and{" "}
                <span className="text-orange-600 font-semibold">high-impact</span>, focusing on education, carbon
                footprint awareness, and grassroots outreach. Through workshops and hands-on projects, we help
                communities understand and reduce their carbon footprint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="bg-primary-100 text-primary-800 rounded-full font-semibold mb-4 items-center space-x-2 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 border border-primary-200/50 shadow-lg">
              <Lightbulb className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              <span className="text-lg md:text-xl">Our Focus Areas</span>
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Five Pillars of Change</h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Each focus area addresses critical climate challenges while empowering communities to create lasting,
              positive change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {focusAreas.map((area, index) => {
              const IconComponent = area.icon
              return (
                <Link
                  key={index}
                  href={area.link}
                  className="block"
                >
                  <Card
                    className={`group relative p-8 rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${area.bgColor} ${area.hoverColor} overflow-hidden cursor-pointer h-full`}
                  >
                    <CardContent className="p-0 relative z-10">
                      <div className="space-y-6">
                        <div
                          className={`w-16 h-16 rounded-2xl ${area.iconColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>

                        <div className="space-y-4">
                          <h3
                            className={`text-2xl font-bold ${area.textColor} group-hover:text-opacity-80 transition-colors duration-300`}
                          >
                            {area.title}
                          </h3>
                          <p className="text-slate-700 leading-relaxed text-sm">{area.description}</p>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <span className={`text-sm font-semibold ${area.textColor} opacity-70`}>Learn More</span>
                          <ArrowRight
                            className={`h-5 w-5 ${area.textColor} group-hover:translate-x-2 transition-transform duration-300`}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-emerald-600 to-emerald-500 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-10 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "-3s" }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          <div className="space-y-8">
            <Badge className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold">
              <Zap className="h-4 w-4 mr-2" />
              Get Involved
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6">Ready to Create Change?</h2>
            <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
              Join our programs and become part of a global movement of young changemakers working toward a sustainable
              future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group text-lg"
                asChild
              >
                <Link href="/get-involved">
                  Join Our Programs
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 text-lg bg-transparent"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
