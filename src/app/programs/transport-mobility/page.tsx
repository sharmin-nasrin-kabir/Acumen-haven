"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Bus,
  Target,
  Users,
  BookOpen,
  Calendar,
  CheckCircle,
  TrendingUp,
  MapPin,
  BarChart3,
  Lightbulb,
  Phone,
} from "lucide-react"

export default function TransportMobilityPage() {
  const upcomingProjects = [
    {
      title: "Student-Led Traffic Mapping & Problem Solving",
      duration: "6-week hands-on workshop",
      description:
        "Empowers students to become civic-minded data analysts through real-world traffic mapping, survey design, and statistical techniques.",
      goals: [
        "Build Data Literacy: Teach students data collection, cleaning, and analysis using Google Forms, Excel, and visualizations",
        "Link Traffic to Climate Change: Help students understand how local traffic patterns influence air pollution and CO₂ emissions",
        "Empower Local Action: Guide students to propose real, low-cost interventions based on their findings",
        "Promote Critical Thinking: Develop students' ability to use evidence, logic, and statistics",
        "Foster Civic Engagement: Encourage students to present insights to school authorities or local officials",
      ],
      icon: BarChart3,
      bgColor: "bg-blue-50",
      iconColor: "bg-blue-600",
    },
  ]

  const ongoingProjects = [
    {
      title: "Teachers' Training Program on Traffic Awareness",
      subtitle: "Empowering Educators to Create Safer Roads and Climate-Conscious Students",
      description:
        "This program builds traffic awareness among school teachers, positioning them as change agents in their communities through engaging, activity-based learning sessions.",
      goals: [
        "Raise awareness of traffic safety, road rules, and mobility behavior among teachers",
        "Use interactive, hands-on activities to deepen understanding",
        "Equip teachers with tools and lesson ideas to educate students",
        "Create a multiplier effect—turning each trained teacher into a mentor for dozens of students",
        "Connect traffic awareness to climate change and sustainable transport choices",
      ],
      icon: Users,
      bgColor: "bg-emerald-50",
      iconColor: "bg-emerald-600",
    },
    {
      title: "Online Youth Training on Traffic Laws & Civic Responsibility",
      subtitle: "Empowering Young Minds for Safer Streets and a Sustainable Future",
      description:
        "An interactive online training program to educate youth on traffic laws, civic responsibility, and the environmental impact of urban mobility.",
      goals: [
        "Increase Legal Awareness: Equip young participants with clear understanding of traffic laws and pedestrian safety",
        "Promote Responsible Behavior: Encourage climate-positive commuting choices like walking, cycling, or public transport",
        "Foster Civic Engagement: Enable youth to recognize their role in traffic safety and urban sustainability",
        "Build a Culture of Peer Education: Inspire participants to share knowledge with friends, families, and schools",
      ],
      icon: BookOpen,
      bgColor: "bg-green-50",
      iconColor: "bg-green-600",
    },
  ]

  const pastProjects = [
    {
      title: "Traffic Perception Survey",
      subtitle: "Understanding Public Insight to Build Climate-Resilient Urban Mobility",
      description:
        "A comprehensive traffic perception survey targeting traffic police, drivers, and the general public to understand how key stakeholders perceive traffic management challenges.",
      impact:
        "This survey provides vital insights into community attitudes, challenges, and gaps—paving the way for more inclusive and sustainable transport solutions that reduce congestion, improve air quality, and support long-term climate goals.",
      note: "If you are interested in accessing the survey data for research, planning, or collaboration purposes, please contact us directly.",
      icon: MapPin,
      bgColor: "bg-teal-50",
      iconColor: "bg-teal-600",
    },
  ]

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "-2s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="outline" asChild className="group bg-transparent">
              <Link href="/programs">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                Back to Programs
              </Link>
            </Button>
          </div>

          <div className="text-center space-y-6 md:space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-blue-100/80 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full border border-blue-200/50 shadow-lg">
              <Bus className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
              <span className="text-blue-700 font-semibold text-sm sm:text-base md:text-lg">Focus Area</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-slate-900">Transport & </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
                  Mobility
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Climate Connection Section */}
      <section className="py-16 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                How it's connected to climate change:
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                The transport sector is one of the fastest-growing sources of greenhouse gas emissions globally. Daily
                commuting by fossil-fuel-powered vehicles significantly contributes to CO₂ emissions, air pollution, and
                traffic congestion. These effects not only worsen the climate crisis but also harm public health and
                reduce the quality of life, especially for vulnerable communities.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Why Acumen Haven is working in this area:
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                At Acumen Haven, we believe transforming urban mobility is key to a climate-resilient future. That's why
                we educate students, teachers, rickshaw pullers, and drivers about sustainable transport choices. We
                connect traffic awareness with climate awareness, empowering people to adopt low-emission behaviors like
                walking, cycling, carpooling, or using public transport. Our programs also emphasize understanding and
                reducing personal carbon footprints from daily travel. By shifting mindsets and behaviors through
                grassroots education, we reduce emissions while building safer, more equitable cities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Projects Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 rounded-full font-semibold mb-4 px-4 py-2 text-lg">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Project
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">What's Coming Next</h2>
          </div>

          <div className="space-y-8">
            {upcomingProjects.map((project, index) => {
              const IconComponent = project.icon
              return (
                <Card key={index} className={`p-8 rounded-3xl border-0 shadow-lg ${project.bgColor}`}>
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="lg:w-1/3">
                        <div
                          className={`w-16 h-16 rounded-2xl ${project.iconColor} flex items-center justify-center mb-6 shadow-lg`}
                        >
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{project.title}</h3>
                        <p className="text-blue-600 font-semibold mb-4">{project.duration}</p>
                        <p className="text-slate-700 leading-relaxed">{project.description}</p>
                      </div>

                      <div className="lg:w-2/3">
                        <h4 className="text-xl font-bold text-slate-900 mb-4">Key Goals:</h4>
                        <div className="space-y-3">
                          {project.goals.map((goal, goalIndex) => (
                            <div key={goalIndex} className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                              <p className="text-slate-700">{goal}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Ongoing Projects Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-blue-100/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-100 text-emerald-800 rounded-full font-semibold mb-4 px-4 py-2 text-lg">
              <TrendingUp className="h-5 w-5 mr-2" />
              Ongoing Projects
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Current Initiatives</h2>
          </div>

          <div className="grid gap-8">
            {ongoingProjects.map((project, index) => {
              const IconComponent = project.icon
              return (
                <Card
                  key={index}
                  className={`p-8 rounded-3xl border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 ${project.bgColor}`}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="lg:w-1/3">
                        <div
                          className={`w-16 h-16 rounded-2xl ${project.iconColor} flex items-center justify-center mb-6 shadow-lg`}
                        >
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{project.title}</h3>
                        <p className="text-emerald-600 font-semibold mb-4 text-sm">{project.subtitle}</p>
                        <p className="text-slate-700 leading-relaxed">{project.description}</p>
                      </div>

                      <div className="lg:w-2/3">
                        <h4 className="text-xl font-bold text-slate-900 mb-4">🎯 Key Goals:</h4>
                        <div className="space-y-3">
                          {project.goals.map((goal, goalIndex) => (
                            <div key={goalIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                              <p className="text-slate-700">{goal}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Past Projects Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-teal-100 text-teal-800 rounded-full font-semibold mb-4 px-4 py-2 text-lg">
              <Target className="h-5 w-5 mr-2" />
              Past Projects
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Completed Work</h2>
          </div>

          <div className="space-y-8">
            {pastProjects.map((project, index) => {
              const IconComponent = project.icon
              return (
                <Card key={index} className={`p-8 rounded-3xl border-0 shadow-lg ${project.bgColor}`}>
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="lg:w-1/3">
                        <div
                          className={`w-16 h-16 rounded-2xl ${project.iconColor} flex items-center justify-center mb-6 shadow-lg`}
                        >
                          <IconComponent className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{project.title}</h3>
                        <p className="text-teal-600 font-semibold mb-4 text-sm">{project.subtitle}</p>
                        <p className="text-slate-700 leading-relaxed">{project.description}</p>
                      </div>

                      <div className="lg:w-2/3">
                        <div className="space-y-4">
                          <p className="text-slate-700 leading-relaxed">{project.impact}</p>
                          <div className="bg-white/50 p-4 rounded-xl border border-teal-200">
                            <p className="text-sm text-teal-700">
                              🔍 <strong>Research Access:</strong> {project.note}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-500 relative overflow-hidden">
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
              <Lightbulb className="h-4 w-4 mr-2" />
              Get Involved
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6">
              Join Our Transport Revolution
            </h2>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Be part of the movement to create sustainable, climate-friendly transportation systems in your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group text-lg"
                asChild
              >
                <Link href="/get-involved">
                  Get Involved
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 text-lg bg-transparent"
                asChild
              >
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
