"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Trash2,
  Calendar,
  CheckCircle,
  Lightbulb,
  Phone,
  Recycle,
  Leaf,
  Zap,
  Building,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"

export default function WasteManagementPage() {
  const upcomingProjects = [
    {
      title: "School-Based Composting Initiative",
      description:
        "This student-led project empowers schools to manage organic waste through simple, low-cost composting methods. Students are trained to segregate biodegradable materials, maintain compost bins, and use the finished compost in gardens.",
      goals: [
        "Educate students on waste segregation and composting",
        "Divert organic waste from landfills to reduce methane emissions",
        "Produce natural fertilizer for school or community use",
        "Promote zero-waste habits and climate-positive behaviors through practice",
      ],
      icon: Leaf,
      bgColor: "bg-emerald-50",
      iconColor: "bg-emerald-600",
    },
    {
      title: "Community Biogas Pilot Initiative",
      description:
        "This pilot project transforms kitchen waste and animal dung into clean, renewable cooking gas through small-scale biogas plants. Implemented in schools or urban low-income areas.",
      goals: [
        "Convert organic waste into clean, low-emission biogas for cooking",
        "Reduce indoor air pollution and dependence on firewood or LPG",
        "Promote methane capture to cut greenhouse gas emissions",
        "Produce organic fertilizer to reduce chemical inputs and enhance soil health",
        "Empower communities through hands-on circular economy education",
      ],
      icon: Zap,
      bgColor: "bg-blue-50",
      iconColor: "bg-blue-600",
    },
    {
      title: "Upcycling Workshop",
      description:
        "The upcycling workshop empowers students to extend the life of everyday items through creative reuse, basic repair skills, and awareness campaigns.",
      goals: [
        "Promote waste reduction through reuse and basic repairs",
        "Encourage sustainable consumption habits among youth",
        "Build student-led leadership in circular economic action",
        "Track impact through item reuse, participation, and behavior change",
        "Use storytelling and data to engage communities and donors",
      ],
      icon: Recycle,
      bgColor: "bg-teal-50",
      iconColor: "bg-teal-600",
    },
    {
      title: "Recycling Project Implementation Plan",
      description:
        "Acumen Haven will implement a recycling project aimed at protecting the local environment in partnership with the community.",
      goals: [
        "Reduce environmental pollution by promoting proper waste separation and recycling practices",
        "Empower the community through training and active participation in sustainable waste management",
        "Recover valuable materials to minimize landfill use and support a circular economy",
        "Foster behavior change through awareness campaigns and education",
        "Establish sustainable systems for ongoing collection, sorting, and recycling",
        "Build partnerships with local authorities and NGOs to ensure long-term impact and scalability",
      ],
      icon: Building,
      bgColor: "bg-green-50",
      iconColor: "bg-green-600",
    },
  ]

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl animate-float"></div>
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
            <div className="inline-flex items-center space-x-2 bg-teal-100/80 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full border border-teal-200/50 shadow-lg">
              <Trash2 className="h-4 w-4 md:h-5 md:w-5 text-teal-600" />
              <span className="text-teal-700 font-semibold text-sm sm:text-base md:text-lg">Focus Area</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-slate-900">Waste Management & </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-teal-600">
                  Circular Economy
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Climate Crisis Section */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start space-x-4 mb-6">
            <AlertTriangle className="h-8 w-8 text-red-600 mt-1 flex-shrink-0" />
            <h2 className="text-2xl md:text-3xl font-bold text-red-800">A Climate Action Imperative</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Why Does It Matter to Climate Change?</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Poor waste management is a hidden but major driver of climate change. When organic waste ends up in
                landfills, it decomposes anaerobically and releases methane — a greenhouse gas over 80 times more potent
                than CO₂ in the short term. Open burning of waste, common in many low-income areas, releases carbon
                dioxide, black carbon, and toxic pollutants. Additionally, a linear "take–make–dispose" economy leads to
                constant extraction of resources, fueling more emissions and environmental degradation.
              </p>
              <p className="text-lg text-red-700 font-semibold">
                Every piece of improperly managed waste—especially organic waste—directly increases our collective
                carbon footprint, making everyday disposal habits a critical climate issue.
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
              <p className="text-lg text-slate-700 leading-relaxed">
                The circular economy flips this model. It keeps materials in use through reuse, repair, recycling, and
                composting — reducing both raw material extraction and waste-related emissions.{" "}
                <span className="font-semibold text-emerald-700">Waste is no longer a burden, but a resource.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Acumen Haven Section */}
      <section className="py-16 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Why Acumen Haven is Committed:</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                At Acumen Haven, we believe true climate resilience begins with behavior change and systems thinking.
                Waste touches every household, every school, every street — making it one of the most accessible and
                impactful entry points for climate education and local action.
              </p>

              <div className="bg-teal-50 p-6 rounded-2xl border border-teal-200">
                <h3 className="text-xl font-bold text-teal-800 mb-4">
                  By working on waste segregation, composting, recycling initiatives, and community education, we aim
                  to:
                </h3>
                <ul className="space-y-2 text-teal-700">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span>Cut methane emissions at the source</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span>Promote zero-waste schools and households</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span>Empower youth and communities to adopt circular practices</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span>Create dignified green jobs through localized waste ecosystems</span>
                  </li>
                </ul>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed mt-4">
                <span className="font-semibold">
                  This is not just about managing waste — it's about redesigning our relationship with the environment
                  to build a low-carbon, sustainable future.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Highlight */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-teal-600 to-teal-500">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <TrendingUp className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">From Climate Problem to Climate Solution</h2>
            <p className="text-xl text-teal-100 leading-relaxed">
              Every ton of organic waste diverted from landfills prevents approximately 1 ton of CO₂ equivalent in
              methane emissions. Through our programs, we're turning waste management into direct climate action.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Projects Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-teal-100 text-teal-800 rounded-full font-semibold mb-4 px-4 py-2 text-lg">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Projects
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">What's Coming Next</h2>
          </div>

          <div className="grid gap-8">
            {upcomingProjects.map((project, index) => {
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
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">{project.title}</h3>
                        <p className="text-slate-700 leading-relaxed">{project.description}</p>
                      </div>

                      <div className="lg:w-2/3">
                        <h4 className="text-xl font-bold text-slate-900 mb-4">🎯 Core Goals:</h4>
                        <div className="space-y-3">
                          {project.goals.map((goal, goalIndex) => (
                            <div key={goalIndex} className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-teal-600 mt-1 flex-shrink-0" />
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-teal-600 to-teal-500 relative overflow-hidden">
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
              Turn Waste Into Climate Action
            </h2>
            <p className="text-lg md:text-xl text-teal-100 max-w-2xl mx-auto leading-relaxed">
              Join our circular economy initiatives and help transform waste management from a climate problem into a
              climate solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-white text-teal-600 hover:bg-teal-50 hover:text-teal-700 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group text-lg"
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
