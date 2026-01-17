"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ContactFormData } from "@/types"
import { Mail, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit message")
      }

      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Error submitting contact form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section - Consistent with homepage */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Get in Touch
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 mb-6">Contact Us</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Ready to partner, volunteer, or learn more? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="rounded-3xl border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Get in Touch</CardTitle>
                <CardDescription>
                  Ready to partner, volunteer, or learn more? We'd love to hear from you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-slate-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl">
                      <p className="text-emerald-700">Thank you! Your message has been sent successfully.</p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                      <p className="text-red-700">Sorry, there was an error sending your message. Please try again.</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="rounded-3xl border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center font-bold">
                    <Mail className="h-6 w-6 mr-2 text-emerald-600" />
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-2">General inquiries:</p>
                  <a
                    href="mailto:contact@acumenhaven.com"
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    contact@acumenhaven.com
                  </a>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="font-bold">Connect with Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">Social Media</h4>
                      <div className="flex space-x-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-semibold rounded-full border-2 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
                        >
                          LinkedIn
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-semibold rounded-full border-2 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
                        >
                          Instagram
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-semibold rounded-full border-2 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
                        >
                          Twitter
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">Community</h4>
                      <div className="flex space-x-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-semibold rounded-full border-2 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
                        >
                          WhatsApp
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-semibold rounded-full border-2 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
                        >
                          Skool
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="font-bold">Media & Press</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">Interested in featuring our work or interviewing our team?</p>
                  <Button
                    variant="outline"
                    className="font-semibold rounded-full border-2 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
                  >
                    Media Kit & Press Resources
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center font-bold">
                    <MapPin className="h-6 w-6 mr-2 text-emerald-600" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Registered in Arizona, USA
                    <br />
                    Operating globally with focus on US and Bangladesh
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
