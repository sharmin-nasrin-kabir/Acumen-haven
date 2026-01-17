export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim()
}

export function getBaseUrl(): string {
  // Use production URL if available, otherwise fall back to site URL or localhost
  if (typeof window !== "undefined") {
    return window.location.origin
  }

  return process.env.NEXT_PUBLIC_PRODUCTION_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
}

export function getBlogUrl(slug: string): string {
  return `${getBaseUrl()}/blog/${slug}`
}

export function getEventUrl(slug: string): string {
  return `${getBaseUrl()}/events/${slug}`
}
