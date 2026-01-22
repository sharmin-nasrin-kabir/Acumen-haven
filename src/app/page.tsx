import HomeClient from "@/components/home/HomeClient"
import { getSiteContent } from "@/lib/cms"
import { createClient } from "@/lib/supabase/server"

// Next.js ISR: Revalidate the page every 60 seconds
export const revalidate = 60

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch all required data in parallel to maximize performance
  const [siteContent, eventsResult, blogsResult] = await Promise.all([
    getSiteContent(),
    supabase
      .from('events')
      .select('*')
      .eq('is_featured', true)
      .eq('is_published', true)
      .order('date', { ascending: false })
      .limit(3),
    supabase
      .from('blogs')
      .select('id, title, excerpt, featured_image, slug, author_name, published_at, created_at, banner_position')
      .eq('status', 'Published')
      .order('published_at', { ascending: false })
      .limit(3)
  ])

  const { heroSlides, impactStats, sdgs, testimonials } = siteContent
  const events = eventsResult.data
  const blogs = blogsResult.data

  return (
    <HomeClient
      heroSlides={heroSlides}
      impactStats={impactStats}
      sdgs={sdgs}
      testimonials={testimonials}
      featuredEvents={events || []}
      latestBlogs={blogs || []}
    />
  )
}
