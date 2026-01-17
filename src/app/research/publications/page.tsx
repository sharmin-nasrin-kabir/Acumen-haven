
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, ExternalLink, Calendar, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Sample publications data - in a real app, this would come from a database
const publications = [
  {
    id: 1,
    title: "Urban Transport and Air Quality: A Youth-Led Assessment in Dhaka",
    authors: ["Dr. Sharmin Nasrin", "S.M. Ferdous", "Research Team"],
    year: 2024,
    type: "Research Paper",
    description:
      "Comprehensive analysis of air pollution from urban transportation systems in Dhaka, Bangladesh, with recommendations for sustainable mobility solutions.",
    downloadUrl: "#",
    externalUrl: "#",
    tags: ["Transport", "Air Quality", "Urban Planning", "Bangladesh"],
  },
  {
    id: 2,
    title: "Climate Education Impact Assessment: School-Based Programs",
    authors: ["Acumen Haven Research Team"],
    year: 2023,
    type: "Survey Report",
    description:
      "Evaluation of climate education programs in schools across the US and Bangladesh, measuring knowledge retention and behavioral changes.",
    downloadUrl: "#",
    externalUrl: "#",
    tags: ["Education", "Climate Awareness", "Youth", "Impact Assessment"],
  },
  {
    id: 3,
    title: "Community Perceptions of Traffic Management Solutions",
    authors: ["Dr. Sharmin Nasrin", "Field Research Team"],
    year: 2023,
    type: "Case Study",
    description:
      "Multi-stakeholder analysis of traffic management perceptions including police, drivers, public, and student volunteers.",
    downloadUrl: "#",
    externalUrl: "#",
    tags: ["Traffic Management", "Community Engagement", "Policy", "Stakeholder Analysis"],
  },
  {
    id: 4,
    title: "Youth Leadership in Climate Action: A Cross-Cultural Study",
    authors: ["Syeda Fatima", "International Research Collaborators"],
    year: 2023,
    type: "Research Paper",
    description:
      "Comparative analysis of youth-led climate initiatives in the United States and Bangladesh, identifying success factors and barriers.",
    downloadUrl: "#",
    externalUrl: "#",
    tags: ["Youth Leadership", "Climate Action", "Cross-Cultural", "Comparative Study"],
  },
  {
    id: 5,
    title: "Sustainable Waste Management in Educational Institutions",
    authors: ["S.M. Ferdous", "Environmental Research Team"],
    year: 2022,
    type: "Infographic Series",
    description:
      "Visual guide to implementing sustainable waste management practices in schools and universities, with practical implementation steps.",
    downloadUrl: "#",
    externalUrl: "#",
    tags: ["Waste Management", "Education", "Sustainability", "Implementation Guide"],
  },
]

export default function PublicationsPage() {
  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-emerald-50/30">
      {/* Back Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="text-slate-600 hover:text-emerald-600">
            <Link href="/research">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Research
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-emerald-100 rounded-full">
              <BookOpen className="h-12 w-12 text-emerald-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">Research</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our collection of research papers, reports, and case studies that contribute to climate knowledge
            and inform evidence-based solutions.
          </p>
        </div>
      </section>

      {/* Research Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {publications.map((publication) => (
              <Card
                key={publication.id}
                className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-emerald-300"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-emerald-600 border-emerald-200">
                      {publication.type}
                    </Badge>
                    <div className="flex items-center text-sm text-slate-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {publication.year}
                    </div>
                  </div>

                  <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight">
                    {publication.title}
                  </CardTitle>

                  <div className="flex items-center text-sm text-slate-600">
                    <Users className="h-4 w-4 mr-2" />
                    {publication.authors.join(", ")}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {publication.description}
                  </CardDescription>

                  <div className="flex flex-wrap gap-2">
                    {publication.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button size="sm" className="flex-1 group/btn">
                      <Download className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      Download PDF
                    </Button>

                    <Button size="sm" variant="outline" className="flex-1 group/btn bg-transparent">
                      <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      View Online
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white">Contribute to Our Research</h3>
                <p className="text-emerald-100 text-lg">
                  Have research findings or data that could contribute to climate solutions? We welcome collaborations
                  and submissions from researchers worldwide.
                </p>
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">
                  <Link href="/contact" className="flex items-center">
                    Submit Research
                    <ExternalLink className="ml-2 h-4 w-4" />
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
