"use client"

import { useState, useEffect, useCallback, ChangeEvent } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plus, Trash2, Image as ImageIcon, Link as LinkIcon } from "lucide-react"
import Image from "next/image"

const supabase = createClient()

export default function HeroSliderPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [slides, setSlides] = useState<any[]>([])

    const fetchSlides = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('hero_slides')
                .select('*')
                .order('order_index', { ascending: true })

            if (error) throw error
            setSlides(data || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchSlides()
    }, [fetchSlides])

    const addSlide = () => {
        const newSlide = {
            id: crypto.randomUUID(),
            title: "New Focus Area",
            link: "/programs",
            image: "/placeholder.svg",
            alt: "A professional image describing our impact",
            color_class: "from-emerald-500 to-emerald-600",
            bg_color_class: "bg-emerald-500",
            order_index: slides.length + 1,
            isNew: true
        }
        setSlides([...slides, newSlide])
    }

    const deleteSlide = async (id: string, isNew?: boolean) => {
        if (!confirm("Are you sure you want to delete this slide?")) return

        if (isNew) {
            setSlides(slides.filter(s => s.id !== id))
            return
        }

        try {
            const { error } = await supabase.from('hero_slides').delete().eq('id', id)
            if (error) throw error
            setSlides(slides.filter(s => s.id !== id))
            setSuccess("Slide deleted")
        } catch (err: any) {
            setError(err.message)
        }
    }

    const updateSlide = (id: string, field: string, value: any) => {
        setSlides(slides.map(s => s.id === id ? { ...s, [field]: value } : s))
    }

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("type", "hero")

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

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, slideId: string) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setSaving(true)
            const url = await uploadImage(file)
            updateSlide(slideId, 'image', url)
            setSuccess("Image uploaded successfully")
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
            // Remove 'isNew' flag and send to Supabase
            const dataToSave = slides.map((slide, index) => {
                const rest = { ...slide }
                delete rest.isNew
                return {
                    ...rest,
                    order_index: index + 1
                }
            })

            const { error } = await supabase.from('hero_slides').upsert(dataToSave)
            if (error) throw error

            setSuccess("Slider updated successfully!")
            fetchSlides() // Refresh with real IDs
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
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Hero Slider</h2>
                    <p className="text-slate-500 mt-2">Customize the main landing slides, focus areas and calls to action.</p>
                </div>
                <div className="flex space-x-4">
                    <Button variant="outline" onClick={addSlide} className="border-slate-300">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Slide
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20"
                    >
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save Order & Content
                    </Button>
                </div>
            </div>

            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
            {success && <Alert className="bg-emerald-50 text-emerald-700 border-emerald-200"><AlertDescription>{success}</AlertDescription></Alert>}

            <div className="space-y-6 pb-20">
                {slides.map((slide, index) => (
                    <Card key={slide.id} className="border-slate-200/60 shadow-sm group hover:border-emerald-200 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Slide Preview */}
                                <div className="lg:w-64 space-y-4">
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                                        <Image
                                            src={slide.image}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <label className="cursor-pointer bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-xl">
                                                Change Image
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={e => handleFileChange(e, slide.id)}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between px-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Slide {index + 1}</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                            onClick={() => deleteSlide(slide.id, slide.isNew)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Slide Data */}
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-slate-600">Focus Area Title</Label>
                                            <Input
                                                value={slide.title}
                                                onChange={e => updateSlide(slide.id, 'title', e.target.value)}
                                                className="font-bold text-lg"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-slate-600 flex items-center">
                                                <LinkIcon className="h-3.5 w-3.5 mr-2" />
                                                Action Link (URL)
                                            </Label>
                                            <Input
                                                value={slide.link}
                                                onChange={e => updateSlide(slide.id, 'link', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-slate-600 flex items-center">
                                                <ImageIcon className="h-3.5 w-3.5 mr-2" />
                                                Background Image URL
                                            </Label>
                                            <Input
                                                value={slide.image}
                                                onChange={e => updateSlide(slide.id, 'image', e.target.value)}
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-slate-600">Color Gradient</Label>
                                                <Input
                                                    value={slide.color_class}
                                                    onChange={e => updateSlide(slide.id, 'color_class', e.target.value)}
                                                    className="text-xs font-mono"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-slate-600">Indicator Color</Label>
                                                <Input
                                                    value={slide.bg_color_class}
                                                    onChange={e => updateSlide(slide.id, 'bg_color_class', e.target.value)}
                                                    className="text-xs font-mono"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

function Save({ className, ...props }: any) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
        </svg>
    )
}
