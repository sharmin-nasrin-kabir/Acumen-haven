import { createClient } from "@/lib/supabase/server"
import { Users, FileText, Calendar, BookOpen, Activity, ArrowUpRight } from "lucide-react"

export default async function AdminDashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    // Fetch from the new 'admin' table
    const { data: adminData } = await supabase
        .from("admin")
        .select("full_name")
        .eq("id", user.id)
        .single()

    // Fetch stats (Note: keep profiles for user count if profiles table is still used for regular users)
    const { count: usersCount } = await supabase.from("profiles").select("*", { count: "exact", head: true })
    const { count: blogsCount } = await supabase.from("blogs").select("*", { count: "exact", head: true })
    const { count: eventsCount } = await supabase.from("events").select("*", { count: "exact", head: true })
    const { count: resourcesCount } = await supabase.from("resources").select("*", { count: "exact", head: true })

    const stats = [
        {
            name: "Total Users",
            value: usersCount || 0,
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-500/10",
        },
        {
            name: "Published Blogs",
            value: blogsCount || 0,
            icon: FileText,
            color: "text-emerald-600",
            bgColor: "bg-emerald-500/10",
        },
        {
            name: "Upcoming Events",
            value: eventsCount || 0,
            icon: Calendar,
            color: "text-purple-600",
            bgColor: "bg-purple-500/10",
        },
        {
            name: "Resources",
            value: resourcesCount || 0,
            icon: BookOpen,
            color: "text-amber-600",
            bgColor: "bg-amber-500/10",
        },
    ]

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-slate-900">System Overview</h2>
                    <p className="text-slate-500 mt-2 font-medium">
                        Welcome back, <span className="text-slate-900 font-bold">{adminData?.full_name?.split(' ')[0] || "Admin"}</span>. Control center operational.
                    </p>
                </div>
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm text-sm font-bold text-slate-600">
                    <Activity className="h-4 w-4 text-emerald-500 animate-pulse" />
                    <span>Live status: Online</span>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="group bg-white rounded-3xl border border-slate-200/60 p-7 shadow-sm hover:shadow-xl hover:border-emerald-500/20 transition-all duration-500 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="h-5 w-5 text-slate-300" />
                        </div>
                        <div className="flex flex-col space-y-6 relative z-10">
                            <div className={`p-4 rounded-2xl w-fit ${stat.bgColor} ${stat.color} transition-transform duration-500 group-hover:scale-110`}>
                                <stat.icon className="h-7 w-7" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.name}</p>
                                <p className="text-4xl font-black text-slate-900 mt-1 tracking-tighter">{stat.value}</p>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full" />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 rounded-[2.5rem] border border-slate-200/60 bg-white p-10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from- emerald-50/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Management Tools</h3>
                        <p className="text-slate-500 mb-10 font-medium">Experience advanced control over your platform contents and user interactions.</p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            {['Events', 'Blogs', 'Resources', 'Research', 'Users', 'Messages'].map((item) => (
                                <div key={item} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all cursor-pointer group/item">
                                    <p className="text-sm font-bold text-slate-600 group-hover/item:text-emerald-700">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="rounded-[2.5rem] border border-emerald-100 bg-emerald-900 p-10 text-white relative flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-4 opacity-80 italic italic">Quick Tip</h3>
                        <p className="text-lg font-medium leading-relaxed">System logs show high engagement on current blogs. Consider reviewing 'Blog Approvals' for new entries.</p>
                    </div>
                    <div className="relative z-10 pt-10">
                        <div className="h-1 w-20 bg-emerald-500 rounded-full mb-4" />
                        <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Acumen Haven Intel</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
