"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Check, X, RotateCcw } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface BlogApprovalActionsProps {
  blogId: string
  currentStatus: string
}

export function BlogApprovalActions({ blogId, currentStatus }: BlogApprovalActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const { toast } = useToast()

  const updateBlogStatus = async (status: string, reason?: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/blogs/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId,
          status,
          rejectionReason: reason,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update blog status")
      }

      toast({
        title: "Blog status updated",
        description: `Blog has been ${status === "approved" ? "approved and published" : status === "rejected" ? "rejected" : "updated"}.`,
      })

      // Refresh the page to show updated status
      window.location.reload()
    } catch (error) {
      console.error("Error updating blog status:", error)
      toast({
        title: "Error",
        description: "Failed to update blog status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = () => {
    updateBlogStatus("approved")
  }

  const handleReject = () => {
    updateBlogStatus("rejected", rejectionReason)
    setRejectionReason("")
  }

  const handleResetToPending = () => {
    updateBlogStatus("pending")
  }

  return (
    <div className="flex items-center gap-2">
      {currentStatus === "pending" && (
        <>
          <Button onClick={handleApprove} disabled={isLoading} size="sm" className="bg-green-600 hover:bg-green-700">
            <Check className="h-4 w-4 mr-1" />
            Approve
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={isLoading}>
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reject Blog Post</AlertDialogTitle>
                <AlertDialogDescription>
                  Please provide a reason for rejecting this blog post. This will help the author understand what needs
                  to be improved.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-2">
                <Label htmlFor="rejection-reason">Rejection Reason</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Explain why this blog post is being rejected..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={4}
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleReject}
                  className="bg-red-600 hover:bg-red-700"
                  disabled={!rejectionReason.trim()}
                >
                  Reject Blog Post
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}

      {(currentStatus === "approved" || currentStatus === "rejected") && (
        <Button onClick={handleResetToPending} disabled={isLoading} size="sm" variant="outline">
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset to Pending
        </Button>
      )}
    </div>
  )
}
