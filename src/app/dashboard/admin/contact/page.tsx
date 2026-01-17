import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ContactStatusButton } from "@/components/dashboard/contact-status-button"
import { ContactDeleteButton } from "@/components/dashboard/contact-delete-button"
import { Mail, Calendar, User } from "lucide-react"

export default async function ContactPage() {
  const supabase = await createClient()

  // Get all contact submissions
  const { data: submissions, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching contact submissions:", error)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "destructive"
      case "read":
        return "secondary"
      case "responded":
        return "default"
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "unread":
        return "Unread"
      case "read":
        return "Read"
      case "responded":
        return "Responded"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="mt-2 text-gray-600">Manage contact form submissions from your website.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{submissions?.filter((s) => s.status === "unread").length || 0}</span> unread
            messages
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {submissions && submissions.length > 0 ? (
          submissions.map((submission) => (
            <Card key={submission.id} className={submission.status === "unread" ? "border-red-200 bg-red-50/30" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{submission.subject || "No Subject"}</CardTitle>
                      <Badge variant={getStatusColor(submission.status)}>{getStatusText(submission.status)}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{submission.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{submission.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(submission.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900 whitespace-pre-wrap">{submission.message}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Submitted {new Date(submission.created_at).toLocaleString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <ContactStatusButton
                        submissionId={submission.id}
                        currentStatus={submission.status}
                        submissionEmail={submission.email}
                      />
                      <ContactDeleteButton submissionId={submission.id} submissionName={submission.name} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Mail className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 mb-2">No contact messages found.</p>
              <p className="text-sm text-gray-400">Messages from your contact form will appear here.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
