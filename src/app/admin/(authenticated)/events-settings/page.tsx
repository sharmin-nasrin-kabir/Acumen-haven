"use client"

import { useState, useEffect, useCallback, ChangeEvent } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Save, Image as ImageIcon, Sparkles } from "lucide-react"
import Image from "next/image"

const supabase = createClient()

export default function EventsAdminSettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [settings, setSettings] = useState({
        events_page_bg: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
        events_page_title: "Our Events",
        events_page_description: "Join us in our mission to create positive change through community engagement, education, and climate action across the US and Bangladesh."
    })
    const [initialSettings, setInitialSettings] = useState<any>(null)

    const fetchSettings = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .in('key', ['events_page_bg', 'events_page_title', 'events_page_description'])

            if (error) throw error

            const fetchedSettings: any = { ...settings }
            data?.forEach(item => {
                fetchedSettings[item.key] = item.value
            })
            setSettings(fetchedSettings)
            setInitialSettings(fetchedSettings)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [settings])

    useEffect(() => {
        fetchSettings()
    }, [fetchSettings])

    const updateSetting = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }))
    }

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("type", "settings")

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        })

        if (!response.ok) {
            throw new Error("Failed to upload image")
        }

        const data = await response.json()
        return data.url
    }

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setSaving(true)
            const url = await uploadImage(file)
            updateSetting('events_page_bg', url)
            setSuccess("Background image uploaded!")
            setTimeout(() => setSuccess(null), 3000)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    async function handleSave() {
        setSaving(true)
        setError(null)
        setSuccess(null)

        try {
            const dataToSave = Object.entries(settings).map(([key, value]) => ({
                key,
                value
            }))

            const { error } = await supabase.from('site_settings').upsert(dataToSave)
            if (error) throw error

            setSuccess("Settings updated successfully!")
            setInitialSettings({ ...settings })
            setTimeout(() => setSuccess(null), 3000)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    const settingsChanged = initialSettings ? (
        settings.events_page_bg !== initialSettings.events_page_bg ||
        settings.events_page_title !== initialSettings.events_page_title ||
        settings.events_page_description !== initialSettings.events_page_description
    ) : false;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Events Page Settings</h2>
                    <p className="text-slate-500 mt-2">Customize the appearance and content of your main events page.</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving || !settingsChanged}
                    className={`px-8 rounded-xl shadow-lg ${saving || !settingsChanged
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none border border-slate-200"
                        : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                        }`}
                >
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
                </Button>
            </div>

            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
            {success && <Alert className="bg-emerald-50 text-emerald-700 border-emerald-200"><AlertDescription>{success}</AlertDescription></Alert>}

            <div className="grid grid-cols-1 gap-8">
                {/* Visual Settings */}
                <Card className="border-slate-200/60 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                        <div className="flex items-center space-x-2">
                            <ImageIcon className="h-5 w-5 text-emerald-600" />
                            <CardTitle className="text-xl">Hero Presentation</CardTitle>
                        </div>
                        <CardDescription>Setup the background and main visual elements of the events page.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        <div className="space-y-4">
                            <Label className="text-slate-700 font-bold">Background Image</Label>
                            <div className="relative h-64 w-full rounded-3xl overflow-hidden border-2 border-dashed border-slate-200 group hover:border-emerald-300 transition-colors bg-slate-50">
                                <Image
                                    src={settings.events_page_bg}
                                    alt="Background Preview"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <label className="cursor-pointer bg-white text-slate-900 px-6 py-3 rounded-2xl text-sm font-bold shadow-2xl flex items-center transform hover:scale-105 transition-transform">
                                        <ImageIcon className="h-4 w-4 mr-2" />
                                        Replace Background
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1 space-y-2">
                                    <Label className="text-xs font-bold text-slate-400 uppercase">Image URL (Manual Override)</Label>
                                    <Input
                                        value={settings.events_page_bg}
                                        onChange={e => updateSetting('events_page_bg', e.target.value)}
                                        placeholder="https://..."
                                        className="rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Content Settings */}
                <Card className="border-slate-200/60 shadow-sm">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100">
                        <div className="flex items-center space-x-2">
                            <Sparkles className="h-5 w-5 text-emerald-600" />
                            <CardTitle className="text-xl">Header Content</CardTitle>
                        </div>
                        <CardDescription>Customize the text displayed in the events hero section.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-slate-700 font-bold">Main Title</Label>
                            <Input
                                id="title"
                                value={settings.events_page_title}
                                onChange={e => updateSetting('events_page_title', e.target.value)}
                                className="text-lg font-bold rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-slate-700 font-bold">Description Text</Label>
                            <Input
                                id="description"
                                value={settings.events_page_description}
                                onChange={e => updateSetting('events_page_description', e.target.value)}
                                className="rounded-xl min-h-[100px]"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
