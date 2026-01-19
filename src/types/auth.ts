export interface Admin {
  id: string
  email: string
  full_name: string | null
  created_at: string
}

export interface Profile {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  role: "user" | "admin"
  auto_approve_blogs: boolean
  created_at: string
  updated_at: string
}

export interface Blog {
  id: string
  title: string
  content: string
  excerpt: string | null
  featured_image: string | null
  author_id: string
  status: "draft" | "pending" | "approved" | "rejected"
  published_at: string | null
  created_at: string
  updated_at: string
  author?: Profile
}

export interface Resource {
  id: string
  title: string
  description: string | null
  content: string | null
  category: string | null
  featured_image: string | null
  file_url: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface Research {
  id: string
  title: string
  description: string | null
  content: string | null
  category: string | null
  featured_image: string | null
  publication_date: string | null
  authors: string[] | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  status: "unread" | "read" | "responded"
  created_at: string
}
