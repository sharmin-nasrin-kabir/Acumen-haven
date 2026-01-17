"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, Building, Briefcase, ArrowRight, CheckCircle, Globe, Target, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function GetInvolvedPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const roles = [
    {
      id: "ambassador",
      title: "Climate Ambassador",
      icon: Target,
      color: "orange",
      description: "Lead workshops and educate peers about climate action",
      commitment: "2-4 hours/week",
      benefits: ["Leadership training", "Certificate of completion", "Networking opportunities"],
      requirements: ["Ages 14-25", "Passion for climate action", "Basic communication skills"],
    },
    {
      id: "volunteer",
      title: "Community Volunteer",
      icon: Heart,
      color: "emerald",
      description: "Support events, outreach, and program implementation",
      commitment: "1-3 hours/week",
      benefits: ["Flexible schedule", "Skill development", "Community impact"],
      requirements: ["Any age welcome", "Reliable commitment", "Team player attitude"],
    },
    {
      id: "partner",
      title: "Organizational Partner",
      icon: Building,
      color: "blue",
      description: "Collaborate with your school, NGO, or organization",
      commitment: "Project-based",
      benefits: ["Mutual impact", "Resource sharing", "Joint programming"],
      requirements: ["Aligned mission", "Established organization", "Commitment to youth"],
    },
    {
      id: "team",
      title: "Join Our Team",
      icon: Briefcase,
      color: "slate",
      description: "Full-time and part-time positions for experienced professionals",
      commitment: "Full/Part-time",
      benefits: ["Competitive compensation", "Professional growth", "Mission-driven work"],
      requirements: ["Relevant experience", "Passion for our mission", "Professional skills"],
    },
  ]

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section - Consistent with homepage */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Join Us
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 mb-6">Get Involved</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Join our community of changemakers working to create a sustainable future. Whether you're a student,
            professional, or organization, there's a place for you here.
          </p>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Your Path
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Choose Your Path</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Find the perfect way to contribute to our mission
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {roles.map((role, index) => {
              const IconComponent = role.icon
              const isSelected = selectedRole === role.id

              return (
                <Card
                  key={role.id}
                  className={`group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover cursor-pointer bg-white ${
                    isSelected ? "ring-4 ring-emerald-500 shadow-2xl" : ""
                  }`}
                  onClick={() => setSelectedRole(isSelected ? null : role.id)}
                >
                  <CardHeader className="text-center">
                    <div
                      className={`mx-auto w-16 h-16 bg-${role.color}-100 rounded-full flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <IconComponent className={`h-8 w-8 text-${role.color}-600`} />
                    </div>
                    <CardTitle
                      className={`text-${role.color}-600 text-lg font-bold group-hover:text-${role.color}-700 transition-colors duration-300`}
                    >
                      {role.title}
                    </CardTitle>
                    <CardDescription>{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-slate-600 mb-4">
                      <strong>Commitment:</strong> {role.commitment}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-semibold rounded-full border-2 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Detailed Information */}
          {selectedRole && (
            <div className="mb-16">
              {roles
                .filter((role) => role.id === selectedRole)
                .map((role) => {
                  const IconComponent = role.icon
                  return (
                    <Card key={role.id} className="rounded-3xl border-0 shadow-lg bg-white">
                      <CardHeader>
                        <CardTitle className="flex items-center text-2xl font-bold">
                          <IconComponent className={`h-8 w-8 mr-3 text-${role.color}-600`} />
                          {role.title} Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-8">
                          <div>
                            <h4 className="font-bold text-slate-900 mb-3">What You'll Do</h4>
                            <p className="text-slate-700 mb-4">{role.description}</p>
                            <p className="text-sm text-slate-600">
                              <strong>Time Commitment:</strong> {role.commitment}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-bold text-slate-900 mb-3">Benefits</h4>
                            <ul className="space-y-2">
                              {role.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center text-slate-700">
                                  <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-bold text-slate-900 mb-3">Requirements</h4>
                            <ul className="space-y-2 mb-6">
                              {role.requirements.map((requirement, index) => (
                                <li key={index} className="flex items-center text-slate-700">
                                  <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                                  {requirement}
                                </li>
                              ))}
                            </ul>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group/btn">
                              Apply Now
                              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          )}

          {/* Quick Application */}
          <div className="bg-gradient-to-br from-slate-50 to-white p-12 rounded-3xl shadow-lg">
            <div className="text-center mb-8">
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Get Started
              </Badge>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Ready to Get Started?</h3>
              <p className="text-lg text-slate-600">
                Fill out our quick interest form and we'll match you with the perfect opportunity.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Lightbulb className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-orange-600 font-bold group-hover:text-orange-700 transition-colors duration-300">
                    Express Interest
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">Tell us about your interests and availability</p>
                  <Button
                    variant="outline"
                    className="font-semibold rounded-full border-2 hover:bg-orange-50 hover:border-orange-300 bg-transparent"
                  >
                    Interest Form
                  </Button>
                </CardContent>
              </Card>

              <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-emerald-600 font-bold group-hover:text-emerald-700 transition-colors duration-300">
                    Join Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">Connect with other changemakers in our community</p>
                  <Button
                    variant="outline"
                    className="font-semibold rounded-full border-2 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
                  >
                    Join WhatsApp
                  </Button>
                </CardContent>
              </Card>

              <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-blue-600 font-bold group-hover:text-blue-700 transition-colors duration-300">
                    Learn More
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">Attend an info session or schedule a call</p>
                  <Button
                    variant="outline"
                    className="font-semibold rounded-full border-2 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                    asChild
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Every Action Counts</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of young people worldwide who are taking action on climate change. Your voice and your
            actions can make a real difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-emerald-900 hover:bg-emerald-50 px-8 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-emerald-900 px-8 font-semibold rounded-full bg-transparent"
              asChild
            >
              <Link href="/programs">Learn About Our Programs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
