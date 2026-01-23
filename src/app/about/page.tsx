import AboutClient from "./AboutClient"
import { getAboutContent, getTeamMembers } from "@/lib/cms"
import type { Metadata } from "next"
import Link from "next/link"

// ISR Configuration: Regenerate page every 5 minutes (300 seconds)
// This provides a good balance between fresh content and performance
export const revalidate = 300

// Dynamic metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  try {
    const content = await getAboutContent()
    return {
      title: `${content.header.title} | Acumen Haven`,
      description: content.header.description,
      openGraph: {
        title: `${content.header.title} | Acumen Haven`,
        description: content.header.description,
        images: content.collageImages.slice(0, 1), // Use first image as OG image
      },
      twitter: {
        card: 'summary_large_image',
        title: `${content.header.title} | Acumen Haven`,
        description: content.header.description,
      },
    }
  } catch {
    return {
      title: "About Us | Acumen Haven",
      description: "Learn about our mission, vision, and the incredible team at Acumen Haven.",
    }
  }
}

export default async function AboutPage() {
  // Parallel data fetching for optimal performance
  const [content, teamMembers] = await Promise.all([
    getAboutContent(),
    getTeamMembers()
  ])

  // Check if data loaded successfully
  if (!content || !teamMembers) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">About Us</h1>
          <p className="text-slate-600 mb-6">We&apos;re having trouble loading this page. Please try again later.</p>
          <Link href="/" className="text-emerald-600 hover:text-emerald-700 font-bold">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return <AboutClient content={content} teamMembers={teamMembers} />
}
