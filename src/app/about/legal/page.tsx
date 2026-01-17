import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, FileText, Download, Building, CheckCircle, Clock, Globe } from "lucide-react"

export default function LegalPage() {
  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section - Consistent with homepage */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Governance
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 mb-6">Legal Status</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Information about our nonprofit status, registration, and governance structure.
          </p>
        </div>
      </section>

      {/* Legal Information */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Nonprofit Status */}
            <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-gradient-to-br from-blue-50 to-white">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Building className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300 text-center">
                  Nonprofit Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span className="text-slate-700">Registered nonprofit organization in Arizona</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span className="text-slate-700">501(c)(3) status: Applied (IRS approval pending)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="text-slate-700">EIN: 39-2475418</span>
                </div>
              </CardContent>
            </Card>

            {/* Governance */}
            <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-gradient-to-br from-emerald-50 to-white">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Shield className="h-10 w-10 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300 text-center">
                  Governance Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Board of Directors</h4>
                  <p className="text-slate-600 text-sm">
                    Our board provides strategic oversight and ensures accountability to our mission and stakeholders.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Executive Leadership</h4>
                  <p className="text-slate-600 text-sm">
                    Day-to-day operations led by our President & CEO with support from our leadership team.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Operating Principles */}
          <div className="mb-16">
            <div className="text-center mb-12 animate-fade-in">
              <Badge className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Our Principles
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">How We Operate</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Shield className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-orange-600 text-xl font-bold group-hover:text-orange-700 transition-colors duration-300">
                    Transparency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    We operate with full transparency in our finances, governance, and impact reporting.
                  </p>
                </CardContent>
              </Card>

              <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                  <CardTitle className="text-emerald-600 text-xl font-bold group-hover:text-emerald-700 transition-colors duration-300">
                    Accountability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    We are accountable to our donors, beneficiaries, and the communities we serve.
                  </p>
                </CardContent>
              </Card>

              <Card className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Globe className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-blue-600 text-xl font-bold group-hover:text-blue-700 transition-colors duration-300">
                    Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    We comply with all applicable laws and regulations in our areas of operation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Documents & Downloads */}
          <div className="bg-gradient-to-br from-slate-50 to-white p-12 rounded-3xl shadow-lg">
            <div className="text-center mb-8">
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Downloads
              </Badge>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Legal Documents & Downloads</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="rounded-2xl border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center font-bold">
                    <FileText className="h-6 w-6 mr-2 text-emerald-600" />
                    Organizational Bylaws
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Our bylaws outline the governance structure, board responsibilities, and operational procedures.
                  </p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Bylaws
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center font-bold">
                    <Shield className="h-6 w-6 mr-2 text-blue-600" />
                    Code of Conduct
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Our code of conduct establishes ethical standards for all staff, volunteers, and partners.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Code
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-4">501(c)(3) Status Update</h4>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-orange-600 mt-1" />
                <div>
                  <p className="text-slate-700 mb-2">
                    We have submitted our application for 501(c)(3) tax-exempt status with the IRS. This process
                    typically takes 3-9 months for approval.
                  </p>
                  <p className="text-sm text-slate-600">
                    Once approved, this document will be available for download here.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact for Legal Matters */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto rounded-3xl border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="font-bold">Legal Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">
                  For legal matters, partnership agreements, or compliance questions, please contact our legal team
                  directly.
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Contact Legal Team
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
