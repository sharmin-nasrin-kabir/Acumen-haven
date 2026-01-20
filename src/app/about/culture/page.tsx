import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, MonitorIcon as Mirror, Handshake, Star, Download, Users, Heart, Shield } from "lucide-react"
import Link from "next/link"

export default function CulturePage() {
  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section - Consistent with homepage */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            How We Work
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 mb-6">Culture Code</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            This is how we lead, build, collaborate, and grow together.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              At Acumen Haven, culture isn&apos;t just what we believe — it&apos;s how we show up. How we communicate, give
              feedback, handle conflict, and celebrate effort defines everything we do.
            </p>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="#download">
                <Download className="mr-2 h-4 w-4" />
                Download the Full Culture Code
              </Link>
            </Button>
          </div>

          {/* Culture Principles */}
          <div className="grid gap-8 mb-16">
            {/* How We Communicate */}
            <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-gradient-to-br from-orange-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-orange-600 font-bold group-hover:text-orange-700 transition-colors duration-300">
                  <MessageCircle className="h-8 w-8 mr-3" />
                  🗣️ How We Communicate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-slate-900 mb-2">Clear & Simple</h4>
                    <p className="text-slate-600">We speak clearly and simply — no fluff, no fear.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-slate-900 mb-2">Ask Before Assuming</h4>
                    <p className="text-slate-600">We ask before assuming to avoid misunderstandings.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-slate-900 mb-2">Listen to Understand</h4>
                    <p className="text-slate-600">We listen to understand, not just to reply.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Manage Feedback */}
            <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-gradient-to-br from-emerald-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-emerald-600 font-bold group-hover:text-emerald-700 transition-colors duration-300">
                  <Mirror className="h-8 w-8 mr-3" />🪞 How We Manage Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-slate-900 mb-2">Quick & Direct</h4>
                    <p className="text-slate-600">We give feedback quickly, directly, and kindly.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-slate-900 mb-2">Seek Clarity</h4>
                    <p className="text-slate-600">We seek clarity, not blame.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-slate-900 mb-2">Tool for Growth</h4>
                    <p className="text-slate-600">Feedback is a tool for growth — not criticism.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Resolve Conflict */}
            <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-blue-600 font-bold group-hover:text-blue-700 transition-colors duration-300">
                  <Handshake className="h-8 w-8 mr-3" />🤝 How We Resolve Conflict
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-slate-900 mb-2">Address Early</h4>
                    <p className="text-slate-600">We address conflict early — directly and respectfully.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-slate-900 mb-2">No Gossip</h4>
                    <p className="text-slate-600">We don&apos;t gossip, ghost, or manipulate.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-slate-900 mb-2">Create Space</h4>
                    <p className="text-slate-600">We create space for honesty, empathy, and repair.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Reward Effort */}
            <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-gradient-to-br from-slate-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-slate-600 font-bold group-hover:text-slate-700 transition-colors duration-300">
                  <Star className="h-8 w-8 mr-3" />🌟 How We Reward Effort
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-slate-900 mb-2">Celebrate Initiative</h4>
                    <p className="text-slate-600">We celebrate initiative and progress — not just results.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-slate-900 mb-2">Spotlight Leaders</h4>
                    <p className="text-slate-600">We spotlight quiet leaders and consistent doers.</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-slate-900 mb-2">Meaningful Recognition</h4>
                    <p className="text-slate-600">
                      Recognition can be a thank-you, a shout-out, or new responsibility.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Our Values in Action */}
          <div className="bg-gradient-to-br from-slate-50 to-white p-12 rounded-3xl shadow-lg">
            <div className="text-center mb-8">
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Values in Action
              </Badge>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">How We Show Up</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="text-xl font-bold text-orange-600 mb-2">Empathy</h4>
                <p className="text-slate-600">Every interaction starts with understanding and compassion.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="h-8 w-8 text-emerald-600" />
                </div>
                <h4 className="text-xl font-bold text-emerald-600 mb-2">Transparency</h4>
                <p className="text-slate-600">Open communication builds trust and stronger relationships.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-blue-600 mb-2">Empowerment</h4>
                <p className="text-slate-600">We create opportunities for everyone to lead and grow.</p>
              </div>
            </div>
          </div>

          {/* Download Section */}
          <div id="download" className="text-center mt-16">
            <Card className="max-w-2xl mx-auto rounded-3xl border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-center text-2xl font-bold">
                  <Download className="h-6 w-6 mr-3 text-emerald-600" />
                  Download Our Complete Culture Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">
                  Get the full document with detailed guidelines, examples, and practical tools for building a positive,
                  productive culture in your own organization.
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
