import { ReactNode } from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

export default async function AdminLayout({
    children,
}: {
    children: ReactNode
}) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/admin/login")
    }

    // Check the dedicated 'admin' table
    const { data: adminData, error } = await supabase
        .from("admin")
        .select("*")
        .eq("id", user.id)
        .single()

    // Strict admin check - if not in 'admin' table, redirect to login
    if (error || !adminData) {
        // Sign out to clear the session if it's not an admin
        await supabase.auth.signOut()
        redirect("/admin/login?error=unauthorized")
    }

    // Adapt adminData to the profile format expected by components, or we could update components
    // For now, let's just pass adminData
    const adminProfile = {
        ...adminData,
        first_name: adminData.full_name?.split(' ')[0] || "Admin",
        last_name: adminData.full_name?.split(' ').slice(1).join(' ') || "",
        role: "admin"
    }

    return (
        <div className="h-full bg-slate-50">
            <DashboardSidebar profile={adminProfile as any} />
            <div className="lg:pl-72 flex flex-col min-h-screen">
                <DashboardHeader profile={adminProfile as any} />
                <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-slate-50">{children}</main>
            </div>
        </div>
    )
}
