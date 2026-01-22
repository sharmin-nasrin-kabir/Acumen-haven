import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, User, ArrowLeft, Clock, MessageSquare, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { getBlogUrl } from "@/lib/utils/slug"
import { BlogRenderer } from "@/components/blog/blog-renderer"
import { BlogShare } from "@/components/blog/blog-share"
import { Metadata } from "next"

export const revalidate = 60

interface Blog {
  id: string
  title: string
  content: string
  excerpt: string
  featured_image: string | null
  slug: string | null
  status: string
  published_at: string | null
  created_at: string
  updated_at: string
  author_name: string | null
  banner_position: string | null
  category?: string
}

interface RelatedBlog {
  id: string
  title: string
  excerpt: string
  featured_image: string | null
  slug: string | null
  published_at: string | null
  created_at: string
  author_name: string | null
  banner_position?: string | null
}

async function getBlog(slug: string) {
  const supabase = await createClient()
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);

  const { data: blogData, error: blogError } = await supabase
    .from("blogs")
    .select(`
      id,
      title,
      content,
      excerpt,
      featured_image,
      slug,
      status,
      is_published,
      published_at,
      created_at,
      author_name,
      contact_email,
      social_facebook,
      social_twitter,
      social_instagram,
      social_linkedin,
      youtube_url,
      banner_position,
      category
    `)
    .or(isUuid ? `slug.eq."${slug}",id.eq."${slug}"` : `slug.eq."${slug}"`)
    .single()

  if (blogError || !blogData) {
    return null
  }

  return blogData as unknown as Blog
}

async function getRelatedBlogs(excludeId: string) {
  const supabase = await createClient()
  const { data: relatedData } = await supabase
    .from("blogs")
    .select(`
            id,
            title,
            excerpt,
            featured_image,
            slug,
            published_at,
            created_at,
            author_name,
            banner_position
        `)
    .eq("status", "Published")
    .neq("id", excludeId)
    .order("published_at", { ascending: false })
    .limit(3)

  return (relatedData as unknown as RelatedBlog[]) || []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlog(slug)

  if (!blog) return { title: "Blog Not Found | Acumen Haven" }

  return {
    title: `${blog.title} | Acumen Haven Blog`,
    description: blog.excerpt || "Read our latest story from Acumen Haven.",
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.featured_image ? [blog.featured_image] : [],
      type: "article",
    }
  }
}

function calculateReadingTime(content: string) {
  const wordsPerMinute = 200;
  const words = content.split(/\s/g).length;
  return Math.ceil(words / wordsPerMinute);
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = await getBlog(slug)

  if (!blog) {
    notFound()
  }

  const relatedBlogs = await getRelatedBlogs(blog.id)
  const currentUrl = getBlogUrl(blog.slug || blog.id)
  const readingTime = calculateReadingTime(blog.content)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section with Glassmorphism */}
      <header className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {blog.featured_image && (
          <Image
            src={blog.featured_image}
            alt={blog.title}
            fill
            priority
            className="object-cover scale-105"
            style={{ objectPosition: blog.banner_position || 'center' }}
          />
        )}
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        {/* Sticky Back Button - Always accessible */}
        <div className="fixed top-8 left-8 z-[100]">
          <Link
            href="/blog"
            className="group flex items-center gap-2 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-full border border-slate-200 shadow-2xl transition-all hover:scale-110 active:scale-95 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em]"
          >
            <ArrowLeft className="h-4 w-4 text-emerald-600 group-hover:-translate-x-1 transition-transform" />
            GO BACK
          </Link>
        </div>

        {/* Title Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 py-16 px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-emerald-500 text-white border-0 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                {blog.category || "Community Story"}
              </Badge>
              <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                <Clock className="h-3.5 w-3.5" />
                <span>{readingTime} MIN READ</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight animate-in slide-in-from-bottom-4 duration-700 break-words">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-500/20 backdrop-blur-md border border-white/10 flex items-center justify-center overflow-hidden">
                  <User className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm tracking-tight">{blog.author_name || "Acumen Contributor"}</p>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Author</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm tracking-tight">
                    {new Date(blog.published_at || blog.created_at).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric"
                    })}
                  </p>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Published</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <main className="relative -mt-16 md:-mt-12 z-20 pb-24">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
            {/* Summary Box */}
            {blog.excerpt && (
              <div className="p-6 md:p-12 border-b border-slate-50 bg-slate-50/50">
                <div className="flex items-center gap-3 mb-4 opacity-40">
                  <div className="h-1 w-8 bg-emerald-500 rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">EXCERPT</span>
                </div>
                <p className="text-xl md:text-3xl text-slate-800 font-medium leading-relaxed italic">
                  &ldquo;{blog.excerpt}&rdquo;
                </p>
              </div>
            )}

            {/* Article Content */}
            <div className="p-6 md:p-16">
              <BlogRenderer content={blog.content} />

              {/* Author Bio Simple */}
              <div className="mt-20 pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center gap-8">
                <div className="h-20 w-20 rounded-[2rem] bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-xl shadow-emerald-500/20">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Written by {blog.author_name || "Acumen Contributor"}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                    Dedicated to sharing positive community updates and climate action initiatives across the Acumen Haven network.
                  </p>
                </div>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-8 md:pt-0 md:border-t-0">
                  <BlogShare url={currentUrl} title={blog.title} />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA Overlay */}
          <div className="mt-12 flex items-center justify-between p-8 rounded-[2rem] bg-emerald-900 border border-emerald-800 text-white shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-colors" />
            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <MessageSquare className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold">Have thoughts on this story?</h4>
                <p className="text-emerald-300/60 text-sm">Join the conversation or share your own experience with us.</p>
              </div>
            </div>
            <Button className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-8 h-12 rounded-xl shrink-0 group/cta">
              Contact Us <ChevronRight className="ml-2 h-4 w-4 group-hover/cta:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </main>

      {/* Related Stories */}
      {relatedBlogs.length > 0 && (
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic underline decoration-emerald-500 decoration-8 underline-offset-[-2px]">Continue Reading</h2>
                <p className="text-slate-500 mt-2 font-medium">Discover more stories from our changemaker community.</p>
              </div>
              <Link href="/blog" className="hidden md:flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all pr-4">
                VIEW ALL <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedBlogs.map((post) => (
                <Card
                  key={post.id}
                  className="group rounded-[2.5rem] border-0 shadow-lg hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-4 overflow-hidden bg-slate-50 cursor-pointer"
                >
                  <Link href={`/blog/${post.slug || post.id}`}>
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={post.featured_image || "/placeholder.svg?height=300&width=400"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        style={{ objectPosition: post.banner_position || 'center' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-emerald-500/10 text-emerald-700 border-0 text-[10px] font-black uppercase tracking-widest">STORY</Badge>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {new Date(post.published_at || post.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">
                        {post.title}
                      </h3>
                      <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">READ STORY</span>
                        <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <ChevronRight className="h-5 w-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
