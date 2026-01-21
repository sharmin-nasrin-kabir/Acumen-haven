import type { Event, CreateEventData, UpdateEventData } from "@/types/events"

const API_BASE = "/api/events"

// Client-side API functions for events
export const eventsApi = {
  // Get all events with optional filters
  async getAll(params?: {
    featured?: boolean
    limit?: number
  }): Promise<Event[]> {
    const searchParams = new URLSearchParams()


    if (params?.featured) searchParams.set("featured", "true")
    if (params?.limit) searchParams.set("limit", params.limit.toString())

    const url = `${API_BASE}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Failed to fetch events")
    }

    const data = await response.json()
    return data.events
  },

  // Get single event by ID
  async getById(id: string): Promise<Event> {
    const response = await fetch(`${API_BASE}/${id}`)
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Event not found")
      }
      throw new Error("Failed to fetch event")
    }

    const data = await response.json()
    return data.event
  },

  // Create new event
  async create(eventData: CreateEventData): Promise<Event> {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to create event")
    }

    const data = await response.json()
    return data.event
  },

  // Update event
  async update(id: string, eventData: Partial<UpdateEventData>): Promise<Event> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to update event")
    }

    const data = await response.json()
    return data.event
  },

  // Delete event
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to delete event")
    }
  },
}
