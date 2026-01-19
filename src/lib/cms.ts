import { createClient } from "./supabase/server"
import { cache } from "react"

// Revalidation time in seconds (e.g., 60 seconds)
const REVALIDATE_TIME = 60

/**
 * Shared function to fetch data from Supabase with high performance
 * This uses React cache for per-request deduplication and Next.js ISR for global caching
 */
export const getSiteContent = cache(async () => {
    const supabase = await createClient()

    // Fetch everything in parallel for maximum speed
    const [
        { data: settings },
        { data: heroSlides },
        { data: impactStats },
        { data: sdgs },
        { data: testimonials },
        { data: links }
    ] = await Promise.all([
        supabase.from('site_settings').select('*'),
        supabase.from('hero_slides').select('*').order('order_index', { ascending: true }),
        supabase.from('impact_stats').select('*').order('order_index', { ascending: true }),
        supabase.from('sdg_alignment').select('*').order('order_index', { ascending: true }),
        supabase.from('testimonials').select('*').order('order_index', { ascending: true }),
        supabase.from('site_links').select('*').order('order_index', { ascending: true })
    ])

    // Convert settings array to a more useful key-value object
    const settingsMap: Record<string, any> = {}
    settings?.forEach(s => {
        settingsMap[s.key] = s.value
    })

    return {
        settings: settingsMap,
        heroSlides: heroSlides || [],
        impactStats: impactStats || [],
        sdgs: sdgs || [],
        testimonials: testimonials || [],
        links: links || []
    }
})

// Function to fetch specific sections if needed
export const getHeroSlides = cache(async () => {
    const supabase = await createClient()
    const { data } = await supabase.from('hero_slides').select('*').order('order_index', { ascending: true })
    return data || []
})

export const getImpactStats = cache(async () => {
    const supabase = await createClient()
    const { data } = await supabase.from('impact_stats').select('*').order('order_index', { ascending: true })
    return data || []
})
