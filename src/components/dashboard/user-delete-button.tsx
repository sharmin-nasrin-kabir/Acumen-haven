"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { createBrowserClient } from "@supabase/ssr"
import { toast } from "sonner"

interface UserDeleteButtonProps {
  children: React.ReactNode
  userId: string
  userName: string
}

export function UserDeleteButton({ children, userId, userName }: UserDeleteButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const handleDelete = async () => {
    setLoading(true)
    try {
      // Note: In a real application, you might want to soft delete or deactivate
      // rather than hard delete to preserve data integrity
      const { error } = await supabase.from("profiles").delete().eq("id", userId)

      if (error) throw error

      toast.success("User deactivated successfully!")
      router.refresh()
    } catch (error: any) {
      console.error("Error deactivating user:", error)
      toast.error(error.message || "Failed to deactivate user")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deactivate User</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to deactivate <strong>{userName}</strong>? This action cannot be undone and will
            permanently remove their account and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading} className="bg-red-600 hover:bg-red-700">
            {loading ? "Deactivating..." : "Deactivate User"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
