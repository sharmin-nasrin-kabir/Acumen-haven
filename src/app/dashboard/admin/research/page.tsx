import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Edit, Eye } from "lucide-react"
import { ResearchDeleteButton } from "@/components/dashboard/research-delete-button"

export default async function ResearchPage() {
  const supabase = await createClient()

  // Get all research
  const { data: research, error } = await supabase
    .from("research")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching research:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Research</h1>
          <p className="mt-2 text-gray-600">Manage research publications and studies.</p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/dashboard/admin/research/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Research
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {research && research.length > 0 ? (
          research.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={item.is_published ? "default" : "secondary"}>
                      {item.is_published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    {item.category && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Category:</span> {item.category}
                      </p>
                    )}
                    {item.authors && item.authors.length > 0 && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Authors:</span> {item.authors.join(", ")}
                      </p>
                    )}
                    {item.publication_date && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Published:</span>{" "}
                        {new Date(item.publication_date).toLocaleDateString()}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">Created {new Date(item.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.is_published && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/research/${item.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/admin/research/${item.id}/edit`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <ResearchDeleteButton researchId={item.id} researchTitle={item.title} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 mb-4">No research found.</p>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/dashboard/admin/research/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Research
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
