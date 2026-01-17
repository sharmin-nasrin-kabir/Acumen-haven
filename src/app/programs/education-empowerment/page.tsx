"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  Users,
  BookOpen,
  Calendar,
  CheckCircle,
  TrendingUp,
  GraduationCap,
  Lightbulb,
  Phone,
  Heart,
  Leaf,
  UserCheck,
} from "lucide-react"

export default function EducationEmpowermentPage() {
  const upcomingProjects = [
    {
      title: "Sorok Sathi Education Program",
      subtitle: "A Student-Led Initiative for Traffic Awareness and Climate-Responsive Problem Solving",
      duration: "2–3 month period",
      description:
        "A student-centered civic and climate education initiative that empowers students from Grades 6 to 10 to explore and solve real-world traffic challenges in their communities.",
      goals: [
        "Raise student awareness of local traffic and mobility challenges",
        "Build understanding of how traffic congestion contributes to climate change",
        "Develop critical thinking, research, and creative problem-solving skills",
        "Position schools as catalysts for community-level environmental education and action",
      ],
      icon: BookOpen,
      bgColor: "bg-emerald-50",
      iconColor: "bg-emerald-600",
    },
    {
      title: "Pusti Party (Nutrients Fiesta)",
      subtitle: "Healthy Eating for Fighting Climate Change",
      description:
        "A joyful and practical initiative designed to educate students, parents, and teachers about climate-friendly nutrition and sustainable food habits through hands-on workshops and competitions.",
      goals: [
        "Promote Climate-Smart Food Choices: Teach students how food habits like reduced meat consumption can help combat climate change",
        "Encourage Waste Reduction & Composting: Introduce practices like reuse, plastic-free packaging, and composting food waste",
        "Build a Culture of Healthy Eating: Educate families and schools on the value of balanced, local, and affordable nutrition",
        "Launch Sustainable Canteens: Pilot 'Nutritious Canteens' in schools that serve eco-friendly meals",
        "Strengthen School-Home Partnerships: Engage parents and students together to create lasting food and climate awareness",
        "Empower Students Through Participation: Let students showcase homemade meals and integrate winning dishes into school canteen menus",
      ],
      icon: Heart,
      bgColor: "bg-green-50",
      iconColor: "bg-green-600",
    },
    {
      title: "Parents as Protectors",
      subtitle: "Child & Earth Monthly Awareness Program",
      description:
        "A monthly school-based program that brings parents and children together to combat screen addiction, foster moral and creative growth, and build environmental awareness.",
      goals: [
        "Reduce children's dependency on screens through creative and eco-friendly alternatives",
        "Equip parents with tools to guide moral, intellectual, and environmental development",
        "Foster family-based climate action by addressing technology's environmental impact",
        "Cultivate a generation of ethical, curious, and climate-conscious students",
        "Strengthen school communities through active family participation and shared learning",
      ],
      icon: Users,
      bgColor: "bg-blue-50",
      iconColor: "bg-blue-600",
    },
    {
      title: "Green Sathi Fellowship",
      subtitle: "Empowering Bangladeshi Youth as Grassroots Climate Leaders",
      duration: "3 months",
      description:
        "A flagship program designed to empower Bangladeshi youth aged 18–35 to become grassroots climate leaders through school-based climate workshops, hands-on sustainability projects, and community education.",
      goals: [
        "Develop a network of youth climate champions who raise environmental awareness",
        "Implement local sustainability solutions aligned with global SDGs",
        "Act as catalysts for climate justice and community resilience",
        "Create real-world environmental impact in underserved communities",
      ],
      icon: UserCheck,
      bgColor: "bg-teal-50",
      iconColor: "bg-teal-600",
    },
  ]

  const ongoingProjects = [
    {
      title: "Earth Avengers",
      subtitle: "Youth-driven Awareness and Tree Planting Initiative for School Children",
      description:
        "A youth-led climate education and tree-planting initiative that empowers school children in Bangladesh (ages 5–14) to understand climate change and take local action.",
      goals: [
        "Raise Climate Awareness: Deliver fun, interactive workshops that educate 200+ students in 10 schools about climate change",
        "Promote Youth Leadership: Train 10–20 young volunteers to lead sessions and inspire climate action",
        "Drive Sustainable Behavior Change: Use activities and storytelling to teach low-carbon habits and plant trees",
        "Build School-Based Climate Action Models: Position schools as hubs of climate awareness",
        "Foster Scalable Impact: Monitor behavior shifts with pre/post assessments and build long-term engagement",
      ],
      icon: Leaf,
      bgColor: "bg-emerald-50",
      iconColor: "bg-emerald-600",
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
            <div className="inline-flex items-center space-x-2 bg-emerald-100/80 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full border border-emerald-200/50 shadow-lg">
              <GraduationCap className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold text-sm sm:text-base md:text-lg">Focus Area</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-slate-900">Education & </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">
                  Youth Empowerment
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
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Education is the foundation of empowerment. When people, especially youth, understand the causes,
                consequences, and solutions to climate change, they are more likely to take meaningful action. Education
                builds awareness, fosters critical thinking, and equips individuals with the skills to challenge
                unsustainable systems and lead community change.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Empowerment turns awareness into action. Empowered students, teachers, and citizens can organize,
                innovate, and advocate for sustainable solutions—whether it's reducing plastic use, improving
                transportation systems, or promoting renewable energy.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Without education, there is no lasting climate solution. Climate action starts not with policy, but with
                informed, motivated people.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                🌱 Why is Acumen Haven working in this area?
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Acumen Haven believes climate change is not just an environmental issue; it's a justice issue. It
                affects the most vulnerable communities first and hardest. By helping individuals understand their
                carbon footprints—from daily travel to energy use—our programs turn abstract climate issues into
                concrete, actionable change. In Bangladesh and beyond, we see a need for grassroots education that
                connects daily life—like traffic, food, water, and energy—to the bigger climate picture.
              </p>
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
                <h3 className="text-xl font-bold text-emerald-800 mb-4">We focus on:</h3>
                <ul className="space-y-2 text-emerald-700">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Empowering Youth as changemakers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Bringing climate education into schools</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Engaging communities through real-life solutions</span>
                  </li>
                </ul>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed mt-4">
                By combining education, research, and community-based action, Acumen Haven is building a new generation
                of climate-resilient citizens—starting from the ground up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Projects Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-100 text-emerald-800 rounded-full font-semibold mb-4 px-4 py-2 text-lg">
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
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{project.title}</h3>
                        {project.subtitle && (
                          <p className="text-emerald-600 font-semibold mb-4 text-sm">{project.subtitle}</p>
                        )}
                        {project.duration && <p className="text-blue-600 font-semibold mb-4">{project.duration}</p>}
                        <p className="text-slate-700 leading-relaxed">{project.description}</p>
                      </div>

                      <div className="lg:w-2/3">
                        <h4 className="text-xl font-bold text-slate-900 mb-4">🎯 Core Objectives:</h4>
                        <div className="space-y-3">
                          {project.goals.map((goal, goalIndex) => (
                            <div key={goalIndex} className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0" />
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
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-emerald-100/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-green-100 text-green-800 rounded-full font-semibold mb-4 px-4 py-2 text-lg">
              <TrendingUp className="h-5 w-5 mr-2" />
              Ongoing Project
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Current Initiative</h2>
          </div>

          <div className="space-y-8">
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
                        <p className="text-green-600 font-semibold mb-4 text-sm">{project.subtitle}</p>
                        <p className="text-slate-700 leading-relaxed">{project.description}</p>
                      </div>

                      <div className="lg:w-2/3">
                        <h4 className="text-xl font-bold text-slate-900 mb-4">🎯 Key Goals of the Program:</h4>
                        <div className="space-y-3">
                          {project.goals.map((goal, goalIndex) => (
                            <div key={goalIndex} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
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
              <Lightbulb className="h-4 w-4 mr-2" />
              Get Involved
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6">Empower the Next Generation</h2>
            <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
              Join us in building climate-resilient citizens through education, empowerment, and community action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group text-lg"
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
