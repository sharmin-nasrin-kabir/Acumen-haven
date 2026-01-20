import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Globe, Heart, Shield, Award } from "lucide-react"

export default function MissionPage() {
  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section - Consistent with homepage */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Foundation
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 mb-6">Mission & Vision</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our purpose, goals, and the future we&apos;re working toward together.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-gradient-to-br from-emerald-50 to-white">
              <CardHeader className="text-center">
                <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Target className="h-10 w-10 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-700 text-lg mb-4 leading-relaxed">
                  We help people and communities take action on climate change through knowledge, innovation, and
                  research.
                </p>
                <p className="text-slate-700 font-semibold text-lg">
                  Our goal: real solutions to real problems — building a just, sustainable future for all.
                </p>
              </CardContent>
            </Card>

            <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="text-center">
                <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Globe className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-slate-700 text-lg mb-4 leading-relaxed">
                  To nurture a new generation of leaders who build a better world while tackling climate change head-on.
                </p>
                <p className="text-slate-700 font-semibold text-lg">
                  We believe in empowering individuals with the tools and mindset to create lasting change — for people
                  and planet.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <div className="text-center mb-12 animate-fade-in">
              <Badge className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Core Values
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">What Drives Us</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">We lead with integrity and impact through:</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Heart className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-orange-600 text-xl font-bold group-hover:text-orange-700 transition-colors duration-300">
                    Empathy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">We lead by listening and understanding.</p>
                </CardContent>
              </Card>

              <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Shield className="h-8 w-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-emerald-600 text-xl font-bold group-hover:text-emerald-700 transition-colors duration-300">
                    Transparency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">We share truthfully and operate openly.</p>
                </CardContent>
              </Card>

              <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-blue-600 text-xl font-bold group-hover:text-blue-700 transition-colors duration-300">
                    Empowerment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">We uplift youth to lead, not follow.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* SDGs and Three Zeros */}
          <div className="bg-gradient-to-br from-slate-50 to-white p-12 rounded-3xl shadow-lg">
            <div className="text-center mb-8">
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Guiding Principles
              </Badge>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Our North Star</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <h4 className="text-xl font-bold text-emerald-600 mb-4">Sustainable Development Goals (SDGs)</h4>
                <p className="text-slate-700 leading-relaxed">
                  We align our work with the United Nations Sustainable Development Goals, focusing on climate action,
                  quality education, reduced inequalities, and partnerships for the goals.
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-blue-600 mb-4">Three Zeros Vision</h4>
                <p className="text-slate-700 leading-relaxed">
                  Inspired by Nobel Laureate Muhammad Yunus, we work toward a world with zero poverty, zero emissions,
                  and zero inequality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
