export interface Event {
  id: string
  title: string
  description: string | null
  date: string
  time: string | null
  location: string | null
  category: string | null
  banner_image: string | null
  banner_position: string | null
  gallery_images: string[] | null
  registration_link: string | null
  youtube_url: string | null
  slug: string | null
  is_featured: boolean
  is_published: boolean
  status: "Upcoming" | "Past"
  contact_email: string | null
  social_facebook: string | null
  social_twitter: string | null
  social_instagram: string | null
  social_linkedin: string | null
  created_at: string
  updated_at: string
}

export interface CreateEventData {
  title: string
  description?: string
  date: string
  time?: string
  location?: string
  status: "Upcoming" | "Past"
  category?: string
  banner_image?: string
  gallery_images?: string[]
  registration_link?: string
  youtube_url?: string
  is_featured?: boolean
  is_published?: boolean
  contact_email?: string
  social_facebook?: string
  social_twitter?: string
  social_instagram?: string
  social_linkedin?: string
}

export interface UpdateEventData extends Partial<CreateEventData> {
  id: string
}
