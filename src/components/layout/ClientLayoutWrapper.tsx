"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Layout from "@/components/layout/Layout"

// <CHANGE> Added function to check if route should exclude main website layout
function shouldExcludeLayout(pathname: string) {
  return pathname.startsWith("/dashboard") || pathname.startsWith("/auth")
}

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (shouldExcludeLayout(pathname)) {
    return <>{children}</>
  }

  return <Layout>{children}</Layout>
}
