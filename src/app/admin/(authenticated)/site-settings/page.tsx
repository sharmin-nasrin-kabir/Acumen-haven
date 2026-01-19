"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save, Globe, Mail, Info } from "lucide-react"

export default function SiteSettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const [topBar, setTopBar] = useState({
        email: "contact@acumenhaven.com",
        status: "501(c)(3) Status: Applied",
        slogan: "Youth-led. Climate-focused. Impact-driven."
    })

    const [footerInfo, setFooterInfo] = useState({
        description: "Youth-led. Climate-focused. Impact-driven. We equip young changemakers to lead on climate, sustainability, and human rights — globally and locally.",
        address: "Arizona, USA & Dhaka, Bangladesh",
        copyright: "© 2025 Acumen Haven | 501(c)(3) Status: Applied | Registered Nonprofit in Arizona | EIN: 39-2475418"
    })

    const supabase = createClient()

    useEffect(() => {
        fetchSettings()
    }, [])

    async function fetchSettings() {
        try {
            const { data, error } = await supabase.from('site_settings').select('*')
            if (error) throw error

            data?.forEach(item => {
                if (item.key === 'top_bar') setTopBar(item.value)
                if (item.key === 'footer_info') setFooterInfo(item.value)
            })
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleSave() {
        setSaving(true)
        setError(null)
        setSuccess(null)

        try {
            const updates = [
                { key: 'top_bar', value: topBar },
                { key: 'footer_info', value: footerInfo }
            ]

            const { error } = await supabase.from('site_settings').upsert(updates)
            if (error) throw error

            setSuccess("Settings updated successfully!")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Site Settings</h2>
                    <p className="text-slate-500 mt-2">Manage global header, footer and identification info.</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 px-8"
                >
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
                </Button>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    <AlertDescription>{success}</AlertDescription>
                </Alert>
            )}

            <div className="grid gap-8 pb-20">
                {/* Top Bar Config */}
                <Card className="border-slate-200/60 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                        <div className="flex items-center space-x-2">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Info className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Top Information Bar</CardTitle>
                                <CardDescription>The small bar above the main navigation</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Support Email</Label>
                            <Input
                                value={topBar.email}
                                onChange={e => setTopBar({ ...topBar, email: e.target.value })}
                                placeholder="e.g. contact@acumenhaven.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Alt Status (applied/approved)</Label>
                            <Input
                                value={topBar.status}
                                onChange={e => setTopBar({ ...topBar, status: e.target.value })}
                                placeholder="e.g. 501(c)(3) Status: Applied"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Global Slogan</Label>
                            <Input
                                value={topBar.slogan}
                                onChange={e => setTopBar({ ...topBar, slogan: e.target.value })}
                                placeholder="e.g. Youth-led. Climate-focused. Impact-driven."
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Footer Info */}
                <Card className="border-slate-200/60 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                        <div className="flex items-center space-x-2">
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <Globe className="h-4 w-4 text-emerald-600" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Footer Identification</CardTitle>
                                <CardDescription>Address, copyright, and brand mission</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                        <div className="space-y-2">
                            <Label>Foundation Description</Label>
                            <Textarea
                                value={footerInfo.description}
                                onChange={e => setFooterInfo({ ...footerInfo, description: e.target.value })}
                                rows={3}
                                className="resize-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Physical Address / Office Hubs</Label>
                            <Input
                                value={footerInfo.address}
                                onChange={e => setFooterInfo({ ...footerInfo, address: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Copyright Footer Line</Label>
                            <Textarea
                                value={footerInfo.copyright}
                                onChange={e => setFooterInfo({ ...footerInfo, copyright: e.target.value })}
                                rows={2}
                                className="resize-none text-xs"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
