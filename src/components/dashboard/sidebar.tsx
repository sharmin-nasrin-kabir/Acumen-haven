"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Users,
  MessageSquare,
  Settings,
  Menu,
  PenTool,
  Database,
  CheckSquare,
} from "lucide-react"
import type { Profile } from "@/types/auth"

interface DashboardSidebarProps {
  profile: Profile
}

const userNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Blogs", href: "/dashboard/blogs", icon: PenTool },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

const adminNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Events", href: "/dashboard/admin/events", icon: Calendar },
  { name: "Resources", href: "/dashboard/admin/resources", icon: Database },
  { name: "Research", href: "/dashboard/admin/research", icon: BookOpen },
  { name: "Blog Approval", href: "/dashboard/admin/blogs", icon: CheckSquare },
  { name: "Contact Messages", href: "/dashboard/admin/contact", icon: MessageSquare },
  { name: "User Management", href: "/dashboard/admin/users", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar({ profile }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = ["admin", "super_admin"].includes(profile.role) ? adminNavigation : userNavigation

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
        <Image src="/AH-Logo-Name.png" alt="Acumen Haven" width={150} height={40} className="h-8 w-auto" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col px-6 py-6">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      pathname === item.href
                        ? "bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600"
                        : "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50",
                      "group flex gap-x-3 rounded-l-md p-3 text-sm leading-6 font-medium transition-colors",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon
                      className={cn(
                        pathname === item.href ? "text-emerald-600" : "text-gray-400 group-hover:text-emerald-600",
                        "h-5 w-5 shrink-0",
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          {/* Role Badge */}
          <li className="mt-auto">
            <div className="px-3 py-2 bg-gray-100 rounded-md">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Role</p>
              <p className="text-sm font-medium text-gray-900 capitalize">{profile.role.replace("_", " ")}</p>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="lg:hidden fixed top-4 left-4 z-40">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
