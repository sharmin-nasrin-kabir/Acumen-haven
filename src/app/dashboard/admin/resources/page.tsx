import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Edit, Eye } from "lucide-react"
import { ResourceDeleteButton } from "@/components/dashboard/resource-delete-button"

export default async function ResourcesPage() {
  const supabase = await createClient()

  // Get all resources
  const { data: resources, error } = await supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching resources:", error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
          <p className="mt-2 text-gray-600">Manage educational resources and materials.</p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/dashboard/admin/resources/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {resources && resources.length > 0 ? (
          resources.map((resource) => (
            <Card key={resource.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={resource.is_published ? "default" : "secondary"}>
                      {resource.is_published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    {resource.category && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Category:</span> {resource.category}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      Created {new Date(resource.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {resource.is_published && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/resources/${resource.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/admin/resources/${resource.id}/edit`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <ResourceDeleteButton resourceId={resource.id} resourceTitle={resource.title} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 mb-4">No resources found.</p>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/dashboard/admin/resources/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Resource
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
