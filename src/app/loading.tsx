
import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
                <p className="text-sm font-medium text-emerald-600 animate-pulse">Loading...</p>
            </div>
        </div>
    )
}
