"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { ChevronDown, Mail, MailOpen, CheckCircle, ExternalLink } from "lucide-react"

interface ContactStatusButtonProps {
  submissionId: string
  currentStatus: string
  submissionEmail: string
}

export function ContactStatusButton({ submissionId, currentStatus, submissionEmail }: ContactStatusButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const updateStatus = async (newStatus: string) => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("contact_submissions").update({ status: newStatus }).eq("id", submissionId)

      if (error) throw error

      toast({
        title: "Status updated",
        description: `Message marked as ${newStatus}.`,
      })

      router.refresh()
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReply = () => {
    window.open(`mailto:${submissionEmail}`, "_blank")
    // Automatically mark as responded when reply is clicked
    if (currentStatus !== "responded") {
      updateStatus("responded")
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button onClick={handleReply} size="sm" className="bg-emerald-600 hover:bg-emerald-700">
        <ExternalLink className="h-4 w-4 mr-1" />
        Reply
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={isLoading}>
            Status
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => updateStatus("unread")} disabled={currentStatus === "unread"}>
            <Mail className="h-4 w-4 mr-2" />
            Mark as Unread
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateStatus("read")} disabled={currentStatus === "read"}>
            <MailOpen className="h-4 w-4 mr-2" />
            Mark as Read
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateStatus("responded")} disabled={currentStatus === "responded"}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark as Responded
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
