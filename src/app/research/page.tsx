import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FlaskConical, BookOpen, BarChart3, Database, Users, Target, ArrowRight, Mail } from "lucide-react"
import Link from "next/link"

export default function ResearchPage() {
  const researchAreas = [
    {
      title: "Climate Change is Complex",
      description:
        "From rising emissions to policy gaps, climate change touches transport, health, food, energy, and education. Research helps untangle this complexity to reveal actionable insights.",
      icon: <Target className="h-6 w-6" />,
      color: "emerald",
    },
    {
      title: "Data Drives Impact",
      description:
        "By collecting and analyzing field-level data — whether through school-based CO₂ tracking, urban mobility surveys, or waste audits — we empower young people and communities to solve real problems with real information.",
      icon: <BarChart3 className="h-6 w-6" />,
      color: "blue",
    },
    {
      title: "Local Voices, Global Relevance",
      description:
        "Acumen Haven prioritizes youth- and community-led research, ensuring that those most affected by climate issues are also those generating the solutions. Our findings inform not just programs — but policies, partnerships, and public understanding.",
      icon: <Users className="h-6 w-6" />,
      color: "orange",
    },
  ]

  const dataHubItems = [
    "Perception of traffic police towards traffic management",
    "Perception of the public towards traffic management",
    "Perception of drivers towards traffic management",
    "Perception of student volunteers who managed traffic",
  ]

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FlaskConical className="h-4 w-4 mr-2" />
            Climate Research
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 mb-6">
            Advancing Climate Justice Through Data, Insight, and Innovation
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            At Acumen Haven, we believe that meaningful climate action begins with understanding — and understanding
            requires research.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Introduction */}
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              Our Research Department serves as the knowledge engine of our mission, focused on uncovering the root
              causes, behavioral patterns, and systemic challenges that fuel the climate crisis. Whether it's air
              pollution from urban transport, food systems and waste, or the social dimensions of environmental
              injustice, research allows us to design smarter interventions and empower communities with evidence-based
              solutions.
            </p>
          </div>

          {/* Why We Do Research */}
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Why Acumen Haven is involved in research
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Research is the foundation of effective climate action, helping us understand complex challenges and
                develop targeted solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {researchAreas.map((area, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg rounded-3xl overflow-hidden"
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`inline-flex p-4 rounded-2xl mb-4 mx-auto shadow-lg ${
                        area.color === "emerald"
                          ? "bg-emerald-100 text-emerald-600"
                          : area.color === "blue"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {area.icon}
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      {area.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 leading-relaxed">{area.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* What You'll Find Here */}
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">What You'll Find Here</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Explore our research outputs, educational programs, and data resources designed to advance climate
                knowledge and action.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Research */}
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg rounded-3xl overflow-hidden bg-emerald-50">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      Research
                    </CardTitle>
                  </div>
                  <CardDescription className="text-slate-600">
                    Original research papers, survey reports, infographics, and case studies — turning field data into
                    open knowledge.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full group/btn bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-white"
                  >
                    <Link href="/research/publications">
                      View Research
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Data Analysis Course */}
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg rounded-3xl overflow-hidden bg-blue-50">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg">
                      <BarChart3 className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      Data Analysis Course
                    </CardTitle>
                  </div>
                  <CardDescription className="text-slate-600">
                    A hands-on learning program teaching students to use real-world environmental data for analysis,
                    interpretation, and climate-conscious decision making.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    className="w-full group/btn bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-white"
                  >
                    <Link href="/research/data-course">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Data Hub */}
              <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg rounded-3xl overflow-hidden bg-orange-50">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-orange-600 text-white rounded-2xl shadow-lg">
                      <Database className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      Data Hub
                    </CardTitle>
                  </div>
                  <CardDescription className="text-slate-600 mb-4">
                    If you want the following data, please contact us:
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {dataHubItems.map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-slate-600">{item}</p>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    className="w-full group/btn bg-orange-600 hover:bg-orange-700 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-white"
                  >
                    <Link href="/contact">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact for Data Access
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-center shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            </div>
            <div className="max-w-3xl mx-auto space-y-6 relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white">Join Our Research Community</h3>
              <p className="text-emerald-100 text-lg">
                Whether you're a student, researcher, or community leader, there are many ways to get involved in our
                research initiatives and contribute to climate solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link href="/get-involved">
                    Get Involved
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 bg-transparent"
                  asChild
                >
                  <Link href="/contact">
                    Contact Research Team
                    <Mail className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
