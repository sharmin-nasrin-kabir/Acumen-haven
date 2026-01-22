"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Check, Copy } from "lucide-react"
import { toast } from "sonner"

interface BlogShareProps {
    url: string
    title?: string
}

export function BlogShare({ url, title }: BlogShareProps) {
    const [copied, setCopied] = useState(false)

    const handleShare = async () => {
        const shareData = {
            title: title || "Check out this story from Acumen Haven",
            text: `Read this amazing story: ${title || "Community Update"}`,
            url: url,
        }

        try {
            if (typeof navigator !== 'undefined' && navigator.share) {
                await navigator.share(shareData)
            } else {
                await navigator.clipboard.writeText(url)
                setCopied(true)
                toast.success("Link copied to clipboard!")
                setTimeout(() => setCopied(false), 2000)
            }
        } catch (err) {
            // Only show error if it's not a user cancellation
            if (err instanceof Error && err.name !== 'AbortError') {
                toast.error("Failed to share link")
            }
        }
    }

    const handleCopyOnly = async () => {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            toast.success("Link copied to clipboard!")
            setTimeout(() => setCopied(false), 2000)
        } catch {
            toast.error("Failed to copy link")
        }
    }

    return (
        <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
                variant="outline"
                className="w-full sm:w-auto min-w-[160px] rounded-full bg-white border-slate-200 hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300 shadow-sm flex items-center gap-2 group"
                onClick={handleShare}
            >
                {copied ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                    <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                )}
                <span className="font-bold text-xs uppercase tracking-widest">
                    {copied ? "Copied!" : "Share Story"}
                </span>
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-all"
                title="Copy Link"
                onClick={handleCopyOnly}
            >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
        </div>
    )
}
