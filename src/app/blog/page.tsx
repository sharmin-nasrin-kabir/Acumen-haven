import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: blogs, error } = await supabase
    .from("blogs")
    .select(`
      id,
      title,
      content,
      excerpt,
      featured_image,
      slug,
      status,
      published_at,
      created_at,
      author_name
    `)
    .eq("status", "approved")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching blogs:", error.message, error.details, error.hint)
  }

  const publishedBlogs = blogs || []

  const categories = [
    "All",
    ...Array.from(
      new Set(
        publishedBlogs.map((blog) =>
          blog.excerpt?.includes("Program")
            ? "Programs"
            : blog.excerpt?.includes("Impact")
              ? "Impact"
              : blog.excerpt?.includes("Climate")
                ? "Climate Action"
                : "Youth Leadership",
        ),
      ),
    ),
  ]

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section - Consistent with homepage */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Stories
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 mb-6">Stories & Updates</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real stories from our community, program updates, and insights on climate action and youth leadership.
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center space-x-2 mr-4">
              <Filter className="h-5 w-5 text-slate-600" />
              <span className="text-slate-600 font-medium">Filter by:</span>
            </div>
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="font-semibold rounded-full border-2 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
              >
                {category}
              </Button>
            ))}
          </div>

          {publishedBlogs.length === 0 ? (
            <div className="text-center py-16">
              <Card className="max-w-2xl mx-auto rounded-3xl border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="font-bold">No Stories Yet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-6">
                    We&apos;re working on bringing you inspiring stories from our community. Check back soon for updates!
                  </p>
                  <Button
                    variant="outline"
                    className="font-semibold rounded-full border-2 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
                    asChild
                  >
                    <Link href="/get-involved">Share Your Story</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {publishedBlogs[0] && (
                <Card className="mb-16 overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 card-hover bg-white">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={
                          publishedBlogs[0].featured_image ||
                          "/placeholder.svg"
                        }
                        alt={publishedBlogs[0].title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-600 text-white shadow-lg">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
                        <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                          Latest Story
                        </span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(
                              publishedBlogs[0].published_at || publishedBlogs[0].created_at,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>
                            {publishedBlogs[0].author_name || "Community Member"}
                          </span>
                        </div>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{publishedBlogs[0].title}</h2>
                      <p className="text-slate-600 mb-6 leading-relaxed">{publishedBlogs[0].excerpt}</p>
                      <div>
                        <Button
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                          asChild
                        >
                          <Link href={`/blog/${publishedBlogs[0].id}`}>
                            Read Full Story
                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Blog Posts Grid */}
              {publishedBlogs.length > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {publishedBlogs.slice(1).map((post) => (
                    <Card
                      key={post.id}
                      className="group rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden card-hover bg-white"
                    >
                      <div className="relative h-48">
                        <Image
                          src={
                            post.featured_image || "/placeholder.svg?height=300&width=400&query=climate action story"
                          }
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-2 py-1 rounded-full text-xs font-medium shadow-lg bg-emerald-600 text-white">
                            Story
                          </span>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.published_at || post.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-slate-500">
                            <User className="h-3 w-3" />
                            <span>
                              {post.author_name || "Community Member"}
                            </span>
                          </div>
                        </div>
                        <CardTitle className="text-lg line-clamp-2 font-bold group-hover:text-emerald-600 transition-colors duration-300">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant="outline"
                          className="w-full font-semibold rounded-full border-2 hover:bg-emerald-50 hover:border-emerald-300 group/btn bg-transparent"
                          asChild
                        >
                          <Link href={`/blog/${post.id}`}>
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-br from-slate-50 to-white p-12 rounded-3xl shadow-lg mt-16">
            <div className="text-center">
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Stay Connected
              </Badge>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Stay Updated</h3>
              <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
                Get the latest stories, program updates, and climate action insights delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border-2 border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto rounded-3xl border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="font-bold">More Stories Coming Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-6">
                  As we launch our programs and expand our impact, we&apos;ll be sharing more stories from our community of
                  changemakers. Check back regularly for updates!
                </p>
                <Button
                  variant="outline"
                  className="font-semibold rounded-full border-2 hover:bg-emerald-50 hover:border-emerald-300 bg-transparent"
                  asChild
                >
                  <Link href="/get-involved">Share Your Story</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
