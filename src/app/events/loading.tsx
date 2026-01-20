export default function EventsLoading() {
    return (
        <div className="w-full min-h-screen bg-slate-50">
            {/* Hero Skeleton */}
            <section className="relative min-h-[40vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden py-20 bg-slate-900">
                <div className="max-w-5xl mx-auto text-center relative z-10 px-6 mt-8 md:mt-16 animate-pulse">
                    <div className="h-8 w-48 bg-white/10 rounded-full mx-auto mb-8"></div>
                    <div className="h-16 md:h-24 bg-white/10 rounded-2xl max-w-2xl mx-auto mb-8"></div>
                    <div className="h-6 md:h-12 bg-white/10 rounded-xl max-w-xl mx-auto"></div>
                </div>
            </section>

            {/* Content Skeleton */}
            <section className="pt-20 pb-20 md:pt-32 md:pb-32 px-4 sm:px-6 relative z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white/40 backdrop-blur-sm rounded-3xl md:rounded-[3rem] p-4 md:p-10 border border-white/60">
                        {/* Tabs Skeleton */}
                        <div className="flex flex-col items-center mb-12">
                            <div className="h-14 w-64 bg-slate-200 rounded-full animate-pulse"></div>
                        </div>

                        {/* Grid Skeleton */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white rounded-3xl p-4 shadow-md space-y-4 animate-pulse">
                                    <div className="aspect-video bg-slate-100 rounded-2xl w-full"></div>
                                    <div className="h-6 bg-slate-100 rounded-lg w-3/4"></div>
                                    <div className="h-4 bg-slate-50 rounded-lg w-full"></div>
                                    <div className="h-4 bg-slate-50 rounded-lg w-5/6"></div>
                                    <div className="h-10 bg-slate-100 rounded-xl w-full mt-4"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
