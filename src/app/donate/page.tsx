"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { donationTiers } from "@/data/content"
import { Heart, DollarSign, Users, CheckCircle, CreditCard, Building, Gift } from "lucide-react"

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time")

  const quickAmounts = [25, 50, 100, 250, 500]

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section - Consistent with homepage */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Support Us
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 mb-6">Support Our Mission</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Your donation empowers young changemakers to lead on climate action, sustainability, and human rights. Every
            contribution creates lasting impact in communities worldwide.
          </p>
        </div>
      </section>

      {/* Impact Tiers */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Your Impact
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">See Your Impact</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">See how your donation creates real change</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {donationTiers.map((tier) => (
              <Card
                key={tier.amount}
                className={`group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover cursor-pointer bg-white text-center ${selectedAmount === tier.amount ? "ring-4 ring-emerald-500 shadow-2xl" : ""
                  }`}
                onClick={() => setSelectedAmount(tier.amount)}
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <DollarSign className="h-8 w-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-2xl text-emerald-600 font-bold group-hover:text-emerald-700 transition-colors duration-300">
                    ${tier.amount}
                  </CardTitle>
                  <CardDescription className="font-bold text-lg">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">{tier.impact}</p>
                  <Button
                    className={`w-full font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${selectedAmount === tier.amount ? "bg-emerald-600" : "bg-emerald-500"} hover:bg-emerald-700 text-white`}
                  >
                    Select ${tier.amount}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Donation Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="rounded-3xl border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold">
                  <CreditCard className="h-6 w-6 mr-3 text-emerald-600" />
                  Make Your Donation
                </CardTitle>
                <CardDescription>Choose your donation amount and frequency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Donation Type */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Donation Type</label>
                  <div className="flex space-x-4">
                    <Button
                      variant={donationType === "one-time" ? "default" : "outline"}
                      onClick={() => setDonationType("one-time")}
                      className={`font-semibold px-6 py-2 rounded-full ${donationType === "one-time" ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "border-2 hover:bg-emerald-50 hover:border-emerald-300"}`}
                    >
                      One-time
                    </Button>
                    <Button
                      variant={donationType === "monthly" ? "default" : "outline"}
                      onClick={() => setDonationType("monthly")}
                      className={`font-semibold px-6 py-2 rounded-full ${donationType === "monthly" ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "border-2 hover:bg-emerald-50 hover:border-emerald-300"}`}
                    >
                      Monthly
                    </Button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Amount</label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {quickAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount("")
                        }}
                        className={`font-semibold px-4 py-2 rounded-full ${selectedAmount === amount ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "border-2 hover:bg-emerald-50 hover:border-emerald-300"}`}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                    <input
                      type="number"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setSelectedAmount(null)
                      }}
                      className="w-full pl-8 pr-3 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Donor Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                {/* Payment Button */}
                <Button className="w-full text-lg py-4 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <Heart className="mr-2 h-5 w-5" />
                  Donate {selectedAmount ? `$${selectedAmount}` : customAmount ? `$${customAmount}` : ""}{" "}
                  {donationType === "monthly" ? "Monthly" : "Now"}
                </Button>

                <p className="text-sm text-slate-600 text-center">
                  Your donation is secure and encrypted. You&apos;ll receive a receipt via email.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              More Ways to Help
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Other Ways to Support Us</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">There are many ways to make a difference</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Gift className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-orange-600 font-bold group-hover:text-orange-700 transition-colors duration-300">
                  In-Kind Donations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">
                  Donate supplies, materials, or services to support our programs directly.
                </p>
                <Button
                  variant="outline"
                  className="font-semibold rounded-full border-2 hover:bg-orange-50 hover:border-orange-300 bg-transparent"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <CardTitle className="text-emerald-600 font-bold group-hover:text-emerald-700 transition-colors duration-300">
                  Volunteer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">Give your time and skills to help us expand our reach and impact.</p>
                <Button
                  variant="outline"
                  className="font-semibold rounded-full border-2 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
                >
                  Get Involved
                </Button>
              </CardContent>
            </Card>

            <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-600 font-bold group-hover:text-blue-700 transition-colors duration-300">
                  Corporate Partnership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">
                  Partner with us for employee engagement and corporate social responsibility.
                </p>
                <Button
                  variant="outline"
                  className="font-semibold rounded-full border-2 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                >
                  Partner With Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tax Information */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <Card className="rounded-3xl border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-center font-bold">Tax Deductibility Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Current Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <span className="text-slate-700">Registered nonprofit in Arizona</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="text-slate-700">501(c)(3) application submitted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <span className="text-slate-700">EIN: 39-2475418</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-3">Tax Deductibility</h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    We have applied for 501(c)(3) tax-exempt status. Once approved, donations will be tax-deductible to
                    the full extent allowed by law. We will provide proper documentation for all donations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
