"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  TreePine,
  Calendar,
  CheckCircle,
  Lightbulb,
  Phone,
  Droplets,
  Wind,
  Shield,
  Leaf,
  MapPin,
  Building2,
} from "lucide-react"

export default function TreePlantingPage() {
  const climateBenefits = [
    {
      title: "Carbon Sequestration",
      description:
        "Trees absorb CO₂ from the atmosphere through photosynthesis, effectively reducing greenhouse gases responsible for global warming.",
      icon: Leaf,
      bgColor: "bg-green-50",
      iconColor: "bg-green-600",
    },
    {
      title: "Temperature Regulation",
      description:
        "Trees mitigate the urban heat island effect, providing natural cooling in densely populated areas where concrete and asphalt absorb heat.",
      icon: Wind,
      bgColor: "bg-blue-50",
      iconColor: "bg-blue-600",
    },
    {
      title: "Air Quality Improvement",
      description:
        "Trees act as natural air filters, capturing harmful pollutants like PM2.5 and nitrogen oxides commonly emitted by vehicles and industry.",
      icon: Shield,
      bgColor: "bg-emerald-50",
      iconColor: "bg-emerald-600",
    },
    {
      title: "Stormwater Management",
      description:
        "Tree roots and soil absorb excess rainwater, reducing flood risks—an increasingly important climate adaptation measure.",
      icon: Droplets,
      bgColor: "bg-teal-50",
      iconColor: "bg-teal-600",
    },
  ]

  const upcomingProjects = [
    {
      title: "Urban Green Map by Students",
      description:
        "Empowers students to become environmental planners by identifying tree-sparse areas in their communities using simple tools like paper maps or Google Maps.",
      goal: "To involve students in mapping urban greening needs and drive community-led action for climate resilience through data-driven proposals.",
      activities: [
        "Students mark areas lacking greenery—schools, busy streets, rooftops",
        "Propose potential planting locations based on findings",
        "Present findings to local authorities",
        "Build awareness of urban heat, air pollution, and green space importance",
      ],
      icon: MapPin,
      bgColor: "bg-emerald-50",
      iconColor: "bg-emerald-600",
    },
    {
      title: "Street-Side Greening & Micro Forests Initiative",
      description:
        "Transforms neglected urban spaces into green, climate-resilient areas by identifying small unused plots and creating micro forests or children's playgrounds.",
      goal: "To reduce air pollution, sequester carbon, and lower urban heat through low-cost greening while creating safe, healthy spaces for children.",
      activities: [
        "Identify unused plots beside streets, near schools, or underutilized corners",
        "Clean spaces and plant fast-growing native trees (Rain Tree, Neem, Akashmoni)",
        "Maintain areas with community volunteers",
        "Develop into micro forests or children's playgrounds",
      ],
      icon: Building2,
      bgColor: "bg-green-50",
      iconColor: "bg-green-600",
    },
  ]

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-green-50/30">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-green-200/30 rounded-full blur-3xl animate-float"></div>
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
            <div className="inline-flex items-center space-x-2 bg-green-100/80 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full border border-green-200/50 shadow-lg">
              <TreePine className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
              <span className="text-green-700 font-semibold text-sm sm:text-base md:text-lg">Focus Area</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-slate-900">Tree Planting & </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">
                  Urban Greening
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
                How it&apos;s connected to climate change:
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Tree planting and urban greening are powerful tools in the fight against climate change. One of the most
                direct benefits is carbon sequestration—trees absorb carbon dioxide (CO₂) from the atmosphere through
                photosynthesis, effectively reducing the buildup of greenhouse gases responsible for global warming.
                Additionally, trees help in temperature regulation by mitigating the urban heat island effect, in this
                phenomenon, cities become significantly hotter than surrounding rural areas due to the heat-absorbing
                nature of concrete and asphalt. This cooling effect is significant in densely populated regions.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Urban greenery also plays a crucial role in improving air quality. Trees act as natural air filters,
                capturing harmful pollutants like PM2.5 and nitrogen oxides (NOx), which are commonly emitted by
                vehicles and industrial sources. This directly benefits public health, especially in urban areas where
                air pollution is a major concern. Moreover, stormwater management is enhanced through green spaces, as
                tree roots and soil absorb excess rainwater, reducing the risk of flooding. This climate risk is
                increasingly affecting regions like Bangladesh.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Lastly, urban greening promotes biodiversity and ecosystem balance by creating habitats for birds,
                insects, and other wildlife. This ecological richness contributes to more resilient urban environments
                capable of adapting to climate shocks. Together, these benefits highlight the essential role of tree
                planting and greening efforts in building climate-resilient, livable cities.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">🌱 Why Acumen Haven Works on This:</h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Acumen Haven believes that climate action starts with local, tangible steps. Tree planting is:
              </p>
              <div className="bg-green-50 p-6 rounded-2xl border border-green-200 mb-4">
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Low-cost, high impact</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Community-engaging and educational</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>
                      Directly tied to climate justice, especially in underserved, polluted urban neighborhoods
                    </span>
                  </li>
                </ul>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed">
                Through school-based programs, youth-led planting drives, and urban greening campaigns, Acumen Haven
                empowers students and communities to understand the science of climate change, take visible long-term
                action, and build ownership in creating healthier, greener cities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Climate Benefits Grid */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-100 text-emerald-800 rounded-full font-semibold mb-4 px-4 py-2 text-lg">
              <Shield className="h-5 w-5 mr-2" />
              Climate Benefits
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Four Key Climate Impacts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {climateBenefits.map((benefit) => {
              const IconComponent = benefit.icon
              return (
                <Card
                  key={benefit.title}
                  className={`p-8 rounded-3xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${benefit.bgColor}`}
                >
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-6">
                      <div
                        className={`w-16 h-16 rounded-2xl ${benefit.iconColor} flex items-center justify-center flex-shrink-0 shadow-lg`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold text-slate-900">{benefit.title}</h3>
                        <p className="text-slate-700 leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Projects Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-green-100/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 rounded-full font-semibold mb-4 px-4 py-2 text-lg">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Projects
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">What&apos;s Coming Next</h2>
          </div>

          <div className="grid gap-8">
            {upcomingProjects.map((project) => {
              const IconComponent = project.icon
              return (
                <Card
                  key={project.title}
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
                        <p className="text-slate-700 leading-relaxed mb-4">{project.description}</p>
                        <div className="bg-white/50 p-4 rounded-xl border border-green-200">
                          <p className="text-sm font-semibold text-green-800 mb-2">Core Goal:</p>
                          <p className="text-sm text-green-700">{project.goal}</p>
                        </div>
                      </div>

                      <div className="lg:w-2/3">
                        <h4 className="text-xl font-bold text-slate-900 mb-4">Key Activities:</h4>
                        <div className="space-y-3">
                          {project.activities.map((activity, activityIndex) => (
                            <div key={activityIndex} className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                              <p className="text-slate-700">{activity}</p>
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
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-green-600 to-green-500 relative overflow-hidden">
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
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6">Plant Seeds of Change</h2>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
              Join our urban greening initiatives and help create climate-resilient, livable cities for future
              generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-green-50 hover:text-green-700 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group text-lg"
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
