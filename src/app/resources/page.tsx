import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, BookOpen, Users, Shield, Camera, Award, Lightbulb, Target, Globe } from "lucide-react"
import CountUp from "@/components/CountUp"

export default function ResourcesPage() {
  const resources = [
    {
      title: "Organizational Bylaws",
      description: "Our governance structure and operational procedures",
      icon: FileText,
      category: "Legal",
      color: "blue",
      format: "PDF",
    },
    {
      title: "Culture Code",
      description: "How we work together, communicate, and grow",
      icon: Users,
      category: "Culture",
      color: "orange",
      format: "PDF",
    },
    {
      title: "Climate Workshop Slide Deck",
      description: "Ready-to-use presentation for climate education",
      icon: BookOpen,
      category: "Education",
      color: "emerald",
      format: "PPTX",
    },
    {
      title: "Ambassador Handbook",
      description: "Complete guide for climate literacy ambassadors",
      icon: Award,
      category: "Training",
      color: "slate",
      format: "PDF",
    },
    {
      title: "Event Planning Checklist",
      description: "Step-by-step guide for organizing climate events",
      icon: Target,
      category: "Planning",
      color: "orange",
      format: "PDF",
    },
    {
      title: "Code of Conduct",
      description: "Ethical standards for all participants",
      icon: Shield,
      category: "Legal",
      color: "blue",
      format: "PDF",
    },
  ]

  const categories = ["All", "Legal", "Education", "Training", "Culture", "Planning"]

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section - Consistent with homepage */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Free Resources
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 mb-6">Resources & Downloads</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Free resources for schools, teachers, youth organizations, and changemakers. Everything you need to start
            your own climate action initiatives.
          </p>
          
          {/* Animated Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                <CountUp from={0} to={6} duration={1.5} />
              </div>
              <p className="text-slate-600 font-medium">Free Resources</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                <CountUp from={0} to={500} duration={2} separator="," />
              </div>
              <p className="text-slate-600 font-medium">Downloads This Month</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                <CountUp from={0} to={50} duration={1.8} />
              </div>
              <p className="text-slate-600 font-medium">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="font-semibold rounded-full border-2 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon
              return (
                <Card
                  key={index}
                  className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white"
                >
                  <CardHeader>
                    <div
                      className={`w-16 h-16 bg-${resource.color}-100 rounded-full flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <IconComponent className={`h-8 w-8 text-${resource.color}-600`} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium bg-${resource.color}-100 text-${resource.color}-700`}
                      >
                        {resource.category}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{resource.format}</span>
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-emerald-600 transition-colors duration-300">
                      {resource.title}
                    </CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>


          {/* Additional Resources */}
          <div className="bg-gradient-to-br from-slate-50 to-white p-12 rounded-3xl shadow-lg">
            <div className="text-center mb-8">
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Coming Soon
              </Badge>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Additional Resources</h3>
              
              {/* Coming Soon Stats */}
              <div className="flex justify-center gap-6 mb-6">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-600">
                    <CountUp from={0} to={3} duration={1.8} />
                  </div>
                  <p className="text-sm text-slate-600">New Categories</p>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-emerald-600">
                    <CountUp from={0} to={25} duration={2.2} />
                  </div>
                  <p className="text-sm text-slate-600">Planned Resources</p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Lightbulb className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-orange-600 font-bold group-hover:text-orange-700 transition-colors duration-300">
                    Research Templates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">Templates and guides for conducting climate research</p>
                  <Button
                    variant="outline"
                    className="font-semibold rounded-full border-2 hover:bg-orange-50 hover:border-orange-300 bg-transparent"
                  >
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Target className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-emerald-600 font-bold group-hover:text-emerald-700 transition-colors duration-300">
                    Action Toolkits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">Practical tools for community climate action</p>
                  <Button
                    variant="outline"
                    className="font-semibold rounded-full border-2 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
                  >
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-blue-600 font-bold group-hover:text-blue-700 transition-colors duration-300">
                    Global Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">International climate action resources and partnerships</p>
                  <Button
                    variant="outline"
                    className="font-semibold rounded-full border-2 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                  >
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Request Resources */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto rounded-3xl border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="font-bold">Need Something Specific?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">
                  Can't find what you're looking for? Let us know what resources would be helpful for your climate
                  action initiatives.
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Request Resources
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
