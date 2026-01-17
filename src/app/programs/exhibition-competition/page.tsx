"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Trophy,
  Target,
  Calendar,
  CheckCircle,
  Lightbulb,
  Phone,
  Palette,
  Brain,
  Users,
  Megaphone,
} from "lucide-react"

export default function ExhibitionCompetitionPage() {
  const upcomingProjects = [
    {
      title: 'Student Art Exhibition – "Visions for a Greener Future"',
      description:
        "This student-centered art exhibition will showcase climate and environmental artwork created by school students. In partnership with professional art galleries and event organizers, selected submissions will be professionally exhibited to amplify youth voices on climate issues.",
      goals: [
        "Amplify youth perspectives on climate change through visual expression",
        "Build partnerships with the art and culture sector for climate advocacy",
        "Inspire community dialogue around environmental challenges and solutions",
        "Recognize and celebrate creative student contributions",
      ],
      icon: Palette,
      bgColor: "bg-purple-50",
      iconColor: "bg-purple-600",
    },
    {
      title: 'Environmental Quiz Competition – "Green Minds Challenge"',
      description:
        "A dynamic quiz competition designed to boost environmental knowledge and climate literacy among students and youth. The quiz will cover topics like climate science, sustainability, biodiversity, and current global challenges.",
      goals: [
        "Improve environmental awareness and critical thinking",
        "Encourage student curiosity about climate science and global issues",
        "Foster healthy competition and recognition for knowledge-based engagement",
        "Reach diverse participants through flexible online/offline formats",
      ],
      icon: Brain,
      bgColor: "bg-blue-50",
      iconColor: "bg-blue-600",
    },
    {
      title: "Eco Fair – Environmental Awareness Festival",
      description:
        "An engaging, interactive public event that combines education, entertainment, and community action. The Eco Fair will host climate-themed stalls, student project showcases, green product vendors, mini workshops, games, and performances.",
      goals: [
        "Raise climate and environmental awareness among students and the public",
        "Promote sustainable practices and local green innovations",
        "Provide a platform for student-led projects and eco-entrepreneurship",
        "Build a community culture of environmental responsibility",
      ],
      icon: Users,
      bgColor: "bg-emerald-50",
      iconColor: "bg-emerald-600",
    },
  ]

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-float"></div>
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
            <div className="inline-flex items-center space-x-2 bg-purple-100/80 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full border border-purple-200/50 shadow-lg">
              <Trophy className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
              <span className="text-purple-700 font-semibold text-sm sm:text-base md:text-lg">Focus Area</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-slate-900">Exhibition and </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-600">
                  Competition
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Megaphone className="h-12 w-12 text-purple-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Amplifying Youth Voices</h2>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              Through exhibitions and competitions, we create platforms for young people to express their environmental
              concerns, showcase their creativity, and inspire community action. These events celebrate youth innovation
              while building awareness around climate challenges and solutions.
            </p>
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
              <p className="text-purple-700 font-semibold">
                Every piece of art, every competition entry, every exhibition becomes a catalyst for environmental
                dialogue and community engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Projects Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 rounded-full font-semibold mb-4 px-4 py-2 text-lg">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Projects
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Creative Platforms for Change
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Celebrating creativity while building environmental awareness through art, knowledge, and community
              engagement.
            </p>
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
                        <h4 className="text-xl font-bold text-slate-900 mb-4">Core Goals:</h4>
                        <div className="space-y-3">
                          {project.goals.map((goal, goalIndex) => (
                            <div key={goalIndex} className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
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

      {/* Impact Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-purple-100/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-100 text-emerald-800 rounded-full font-semibold mb-4 px-4 py-2 text-lg">
              <Target className="h-5 w-5 mr-2" />
              Our Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Building Environmental Culture
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center mb-6 shadow-lg mx-auto">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Creative Expression</h3>
                <p className="text-slate-700 leading-relaxed">
                  Providing platforms for youth to express environmental concerns through art, fostering creativity
                  while building climate awareness.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg mx-auto">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Knowledge Building</h3>
                <p className="text-slate-700 leading-relaxed">
                  Competitions that challenge students to deepen their understanding of climate science and
                  environmental solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 rounded-3xl border-0 shadow-lg bg-white/80 backdrop-blur-sm text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center mb-6 shadow-lg mx-auto">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Community Engagement</h3>
                <p className="text-slate-700 leading-relaxed">
                  Events that bring together students, families, and communities to celebrate environmental
                  responsibility and innovation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-purple-500 relative overflow-hidden">
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
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6">Showcase Your Voice</h2>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
              Join our exhibitions and competitions to express your environmental vision and inspire others to take
              climate action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-purple-50 hover:text-purple-700 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group text-lg"
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
