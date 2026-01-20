"use client"

import { useState, useEffect, FormEvent } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Lock, ShieldCheck } from "lucide-react"
import Image from "next/image"

export default function AdminLoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const searchParams = useSearchParams()
    const supabase = createClient()

    useEffect(() => {
        const errorType = searchParams.get("error")
        if (errorType === "unauthorized") {
            setError("Unauthorized access. Administrator credentials required.")
        }
    }, [searchParams])

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (signInError) {
                throw signInError
            }

            if (data.user) {
                // Check the dedicated 'admin' table
                const { data: adminEntry, error: adminError } = await supabase
                    .from("admin")
                    .select("id")
                    .eq("id", data.user.id)
                    .single()

                if (adminError || !adminEntry) {
                    await supabase.auth.signOut()
                    throw new Error("Access denied. This account is not listed as an administrator.")
                }

                // If check passes, redirect to admin dashboard
                window.location.href = "/admin"
            }
        } catch (err: any) {
            setError(err.message || "An error occurred during login")
            await supabase.auth.signOut()
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 selection:bg-emerald-500/30">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-md space-y-8 relative z-10">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                        <div className="relative w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center border border-white/10">
                            <Image src="/AH-Logo-NoName.png" alt="Acumen Haven" width={48} height={48} className="w-12 h-12 object-contain brightness-0 invert" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-white tracking-tight">Admin Console</h1>
                        <p className="text-slate-400 text-sm">Authorized Access Only</p>
                    </div>
                </div>

                <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 shadow-2xl">
                    <CardHeader className="space-y-1 pb-6 text-center">
                        <div className="flex justify-center mb-2">
                            <ShieldCheck className="h-10 w-10 text-emerald-500" />
                        </div>
                        <CardTitle className="text-xl font-semibold text-white">System Identification</CardTitle>
                        <CardDescription className="text-slate-400">Please provide your security credentials</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-5">
                            {error && (
                                <Alert variant="destructive" className="bg-red-500/10 text-red-400 border-red-500/20 py-3">
                                    <AlertDescription className="text-sm font-medium">{error}</AlertDescription>
                                </Alert>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-300 ml-1">Admin Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="acumenhaven2025@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-300 ml-1">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98]"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Authenticating...
                                    </>
                                ) : (
                                    <>
                                        <Lock className="mr-2 h-4 w-4" />
                                        Login to Admin
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t border-white/5 py-6">
                        <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                            <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                            <span>Secure Environment</span>
                            <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                        </div>
                    </CardFooter>
                </Card>

                <div className="text-center">
                    <button
                        onClick={() => router.push("/")}
                        className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200"
                    >
                        ← Back to Site
                    </button>
                </div>
            </div>
        </div>
    )
}
