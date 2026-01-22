export interface Blog {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featured_image: string;
    banner_position: string;
    category: string;
    tags: string[];

    // Author Info
    author_name: string;
    author_id: string;

    // Social & Contact
    contact_email: string;
    social_facebook: string;
    social_twitter: string;
    social_instagram: string;
    social_linkedin: string;

    // Media
    youtube_url: string;

    // Status & Controls
    status: "Draft" | "Published" | "Archived";
    is_published: boolean;
    is_featured: boolean;

    // Timestamps
    published_at: string;
    created_at: string;
    updated_at: string;
}
