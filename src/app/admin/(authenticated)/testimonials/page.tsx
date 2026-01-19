"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plus, Trash2, Quote, Save, User } from "lucide-react"
import Image from "next/image"

export default function TestimonialsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [testimonials, setTestimonials] = useState<any[]>([])

    const supabase = createClient()

    useEffect(() => {
        fetchTestimonials()
    }, [])

    async function fetchTestimonials() {
        try {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('order_index', { ascending: true })
            if (error) throw error
            setTestimonials(data || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const addTestimonial = () => {
        setTestimonials([...testimonials, {
            id: crypto.randomUUID(),
            name: "Full Name",
            role: "Role (e.g. Volunteer)",
            content: "Share the impact storiy here...",
            image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
            order_index: testimonials.length + 1,
            isNew: true
        }])
    }

    const deleteTestimonial = async (id: string, isNew?: boolean) => {
        if (!confirm("Remove this testimonial?")) return
        if (isNew) {
            setTestimonials(testimonials.filter(t => t.id !== id))
            return
        }
        try {
            const { error } = await supabase.from('testimonials').delete().eq('id', id)
            if (error) throw error
            setTestimonials(testimonials.filter(t => t.id !== id))
        } catch (err: any) {
            setError(err.message)
        }
    }

    const updateTestimonial = (id: string, field: string, value: any) => {
        setTestimonials(testimonials.map(t => t.id === id ? { ...t, [field]: value } : t))
    }

    async function handleSave() {
        setSaving(true)
        setError(null)
        try {
            const dataToSave = testimonials.map(({ isNew, ...rest }, index) => ({
                ...rest,
                order_index: index + 1
            }))
            const { error } = await supabase.from('testimonials').upsert(dataToSave)
            if (error) throw error
            setSuccess("Voices of Change updated!")
            fetchTestimonials()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="flex items-center justify-center min-h-[400px]"><Loader2 className="h-8 w-8 animate-spin text-emerald-600" /></div>

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Voices of Change</h2>
                    <p className="text-slate-500 mt-2">Manage impact stories and community testimonials.</p>
                </div>
                <div className="flex space-x-4">
                    <Button variant="outline" onClick={addTestimonial}><Plus className="mr-2 h-4 w-4" /> Add Testimonial</Button>
                    <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save All
                    </Button>
                </div>
            </div>

            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
            {success && <Alert className="bg-blue-50 text-blue-700 border-blue-200"><AlertDescription>{success}</AlertDescription></Alert>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t, index) => (
                    <Card key={t.id} className="border-slate-200/60 shadow-sm relative group overflow-hidden bg-white">
                        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 h-8 w-8 p-0" onClick={() => deleteTestimonial(t.id, t.isNew)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="relative h-14 w-14 rounded-full overflow-hidden bg-slate-100 border-2 border-slate-50">
                                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1">
                                    <Input
                                        value={t.name}
                                        onChange={e => updateTestimonial(t.id, 'name', e.target.value)}
                                        className="font-bold text-slate-900 border-0 p-0 h-auto focus-visible:ring-0"
                                        placeholder="Name"
                                    />
                                    <Input
                                        value={t.role}
                                        onChange={e => updateTestimonial(t.id, 'role', e.target.value)}
                                        className="text-sm text-blue-600 border-0 p-0 h-auto focus-visible:ring-0"
                                        placeholder="Role"
                                    />
                                </div>
                            </div>
                            <div className="relative">
                                <Quote className="absolute -top-1 -left-2 h-8 w-8 text-slate-100 z-0" />
                                <Textarea
                                    value={t.content}
                                    onChange={e => updateTestimonial(t.id, 'content', e.target.value)}
                                    className="relative z-10 bg-transparent border-0 p-0 resize-none min-h-[120px] text-sm italic text-slate-600 focus-visible:ring-0"
                                    placeholder="Impact content..."
                                />
                            </div>
                            <div className="pt-4 border-t border-slate-50">
                                <Label className="text-[10px] uppercase tracking-widest text-slate-400">Profile Image URL</Label>
                                <Input
                                    value={t.image}
                                    onChange={e => updateTestimonial(t.id, 'image', e.target.value)}
                                    className="text-[10px] mt-1 p-2 h-8 bg-slate-50 border-0"
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
