import HomeClient from "@/components/home/HomeClient"
import { getSiteContent } from "@/lib/cms"
import { createClient } from "@/lib/supabase/server"

// Next.js ISR: Revalidate the page every 60 seconds
export const revalidate = 60

export default async function HomePage() {
  const { heroSlides, impactStats, sdgs, testimonials } = await getSiteContent()

  // Fetch featured events separately for now or add to getSiteContent
  const supabase = await createClient()
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('is_featured', true)
    .eq('is_published', true)
    .order('date', { ascending: false })
    .limit(3)

  return (
    <HomeClient
      heroSlides={heroSlides}
      impactStats={impactStats}
      sdgs={sdgs}
      testimonials={testimonials}
      featuredEvents={events || []}
    />
  )
}
