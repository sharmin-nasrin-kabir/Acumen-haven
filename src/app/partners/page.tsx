import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, Handshake, Users, Globe, Target, Heart, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function PartnersPage() {
  const partnershipTypes = [
    {
      title: "Educational Institutions",
      icon: Building,
      color: "emerald",
      description: "Schools, universities, and educational organizations",
      benefits: ["Student engagement programs", "Curriculum integration", "Teacher training", "Research collaboration"],
      examples: ["High schools in Arizona", "Universities with sustainability programs", "Educational NGOs"],
    },
    {
      title: "Youth Organizations",
      icon: Users,
      color: "orange",
      description: "Youth-led groups and organizations worldwide",
      benefits: ["Program co-development", "Resource sharing", "Joint events", "Peer learning networks"],
      examples: ["Student climate groups", "Youth leadership organizations", "Environmental clubs"],
    },
    {
      title: "NGOs & Nonprofits",
      icon: Heart,
      color: "blue",
      description: "Organizations working on climate and social justice",
      benefits: ["Collaborative programming", "Shared expertise", "Amplified impact", "Resource optimization"],
      examples: ["Environmental organizations", "Human rights groups", "Community development NGOs"],
    },
    {
      title: "Corporate Partners",
      icon: Target,
      color: "slate",
      description: "Businesses committed to sustainability and social impact",
      benefits: [
        "CSR program development",
        "Employee engagement",
        "Funding opportunities",
        "Skills-based volunteering",
      ],
      examples: ["Sustainable businesses", "Tech companies", "Social enterprises"],
    },
  ]

  const currentPartners = [
    {
      name: "Inspire and Educate",
      type: "Educational Partner",
      description: "Collaborative traffic safety training programs in Bangladesh",
      color: "emerald",
    },
    {
      name: "Local Schools Network",
      type: "Educational Partner",
      description: "Partner schools in Dhaka for youth workshops and training",
      color: "orange",
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
            Collaboration
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 mb-6">
            Partners & Collaborations
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We believe in the power of collaboration. Together with our partners, we're building a global network of
            changemakers working toward a sustainable and just future.
          </p>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Opportunities
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Partnership Opportunities</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover how we can work together to create lasting impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {partnershipTypes.map((type, index) => {
              const IconComponent = type.icon
              return (
                <Card
                  key={type.title}
                  className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white"
                >
                  <CardHeader>
                    <div
                      className={`w-16 h-16 bg-${type.color}-100 rounded-full flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <IconComponent className={`h-8 w-8 text-${type.color}-600`} />
                    </div>
                    <CardTitle
                      className={`text-${type.color}-600 text-xl font-bold group-hover:text-${type.color}-700 transition-colors duration-300`}
                    >
                      {type.title}
                    </CardTitle>
                    <CardDescription className="text-lg">{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h4 className="font-bold text-slate-900 mb-3">Partnership Benefits</h4>
                      <ul className="space-y-2">
                        {type.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-slate-700">
                            <CheckCircle className="h-4 w-4 text-emerald-600 mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-bold text-slate-900 mb-3">Examples</h4>
                      <div className="flex flex-wrap gap-2">
                        {type.examples.map((example, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 rounded-full text-xs bg-${type.color}-100 text-${type.color}-700`}
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group/btn">
                      Explore Partnership
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Our Network
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Our Current Partners</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">Organizations we're proud to work with</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {currentPartners.map((partner, index) => (
              <Card
                key={partner.name}
                className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl font-bold">{partner.name}</CardTitle>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium bg-${partner.color}-100 text-${partner.color}-700`}
                    >
                      {partner.type}
                    </span>
                  </div>
                  <CardDescription className="text-slate-700">{partner.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Card className="max-w-2xl mx-auto rounded-3xl border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="font-bold">Growing Our Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">
                  We're actively seeking new partnerships to expand our reach and impact. As we launch our programs in
                  Fall 2025, we'll be announcing more exciting collaborations.
                </p>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/contact">Become a Partner</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Process
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">How to Partner With Us</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">Simple steps to start our collaboration</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {[
              {
                step: "1",
                title: "Initial Contact",
                description: "Reach out through our contact form or email",
                icon: Globe,
              },
              {
                step: "2",
                title: "Discovery Call",
                description: "We discuss your goals and explore synergies",
                icon: Users,
              },
              {
                step: "3",
                title: "Proposal",
                description: "We develop a customized partnership proposal",
                icon: Target,
              },
              { step: "4", title: "Launch", description: "We begin our collaboration and create impact", icon: Heart },
            ].map((item, index) => {
              const IconComponent = item.icon
              return (
                <Card
                  key={item.step}
                  className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white text-center"
                >
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 relative shadow-lg">
                      <IconComponent className="h-8 w-8 text-emerald-600" />
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-orange-600 text-white rounded-full text-xs flex items-center justify-center font-bold">
                        {item.step}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-bold group-hover:text-emerald-600 transition-colors duration-300">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="max-w-3xl mx-auto bg-gradient-to-br from-slate-50 to-white rounded-3xl border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Ready to Make a Difference Together?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-6 text-lg">
                  Whether you're an educational institution, youth organization, NGO, or business, we'd love to explore
                  how we can collaborate to create positive change.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                    asChild
                  >
                    <Link href="/contact">
                      <Handshake className="mr-2 h-5 w-5" />
                      Start a Partnership
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-semibold rounded-full border-2 hover:bg-emerald-50 hover:border-emerald-300 px-8 py-3 bg-transparent"
                  >
                    Download Partnership Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
