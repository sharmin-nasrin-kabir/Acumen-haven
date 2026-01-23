import { createClient } from "./supabase/server"
import { cache } from "react"

// Revalidation time in seconds (e.g., 60 seconds)


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

export const getAboutContent = cache(async () => {
    const supabase = await createClient()
    const { data: settings } = await supabase
        .from('site_settings')
        .select('*')
        .in('key', ['about_story', 'about_mission', 'about_vision', 'about_collage_images', 'about_header'])

    const settingsMap: Record<string, any> = {}
    settings?.forEach(s => {
        settingsMap[s.key] = s.value
    })

    return {
        story: settingsMap.about_story || {
            title: "How It All Started",
            content: "Acumen Haven was born from a simple but powerful idea..."
        },
        mission: settingsMap.about_mission || {
            title: "Our Mission",
            content: "We empower communities to take action on climate change..."
        },
        vision: settingsMap.about_vision || {
            title: "Our Vision",
            content: "To nurture a new generation of leaders..."
        },
        header: settingsMap.about_header || {
            badge: "Our Growing Family",
            title: "Meet the Team",
            description: "A collective of visionaries & changemakers working for a resilient future."
        },
        collageImages: settingsMap.about_collage_images || [
            "https://res.cloudinary.com/dj4f7f52a/image/upload/v1768730227/543452742_122143475276631699_8398914069928845342_n_ndagxn.jpg",
            "https://res.cloudinary.com/dj4f7f52a/image/upload/v1768731410/496026435_122135457596631699_7113958457378391658_n_omkp2i.jpg",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1470&auto=format&fit=crop"
        ]
    }
})

export const getTeamMembers = cache(async () => {
    const supabase = await createClient()
    const { data } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index', { ascending: true })
    return data || []
})
