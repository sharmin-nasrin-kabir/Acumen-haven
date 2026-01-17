import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Acumen Haven - Youth-led Climate Action",
  description:
    "Youth-led. Climate-focused. Impact-driven. We equip young changemakers to lead on climate, sustainability, and human rights — globally and locally.",
  keywords: "climate action, youth leadership, sustainability, nonprofit, environmental education",
  authors: [{ name: "Acumen Haven" }],
  openGraph: {
    title: "Acumen Haven - Youth-led Climate Action",
    description:
      "Youth-led. Climate-focused. Impact-driven. We equip young changemakers to lead on climate, sustainability, and human rights — globally and locally.",
    url: "https://acumenhaven.com",
    siteName: "Acumen Haven",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acumen Haven - Youth-led Climate Action",
    description:
      "Youth-led. Climate-focused. Impact-driven. We equip young changemakers to lead on climate, sustainability, and human rights — globally and locally.",
  },
  icons: {
    icon: "/AH-Logo-Icon.png",
    shortcut: "/AH-Logo-Icon.png",
    apple: "/AH-Logo-Icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/AH-Logo-Icon.png" sizes="any" />
        <link rel="icon" href="/AH-Logo-Icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/AH-Logo-Icon.png" />
      </head>
      <body className={`${outfit.className} antialiased`}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  )
}
