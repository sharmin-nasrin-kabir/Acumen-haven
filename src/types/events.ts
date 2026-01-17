export interface Event {
  id: string
  title: string
  description: string | null
  date: string
  time: string | null
  location: string | null
  chapter: "US" | "Bangladesh"
  category: string | null
  banner_image: string | null
  gallery_images: string[] | null
  registration_link: string | null
  is_featured: boolean
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface CreateEventData {
  title: string
  description?: string
  date: string
  time?: string
  location?: string
  chapter: "US" | "Bangladesh"
  category?: string
  banner_image?: string
  gallery_images?: string[]
  registration_link?: string
  is_featured?: boolean
  is_published?: boolean
}

export interface UpdateEventData extends Partial<CreateEventData> {
  id: string
}
