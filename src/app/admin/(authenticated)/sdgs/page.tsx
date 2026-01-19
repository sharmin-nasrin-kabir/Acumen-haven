"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plus, Trash2, Globe, Save } from "lucide-react"

export default function SDGGoalsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [sdgs, setSdgs] = useState<any[]>([])

    const supabase = createClient()

    useEffect(() => {
        fetchSdgs()
    }, [])

    async function fetchSdgs() {
        try {
            const { data, error } = await supabase
                .from('sdg_alignment')
                .select('*')
                .order('order_index', { ascending: true })
            if (error) throw error
            setSdgs(data || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const addSdg = () => {
        setSdgs([...sdgs, {
            id: crypto.randomUUID(),
            sdg_number: "13",
            title: "SDG 13 – Climate Action",
            description: "Empowers communities to combat climate change...",
            icon_name: "CloudRain",
            order_index: sdgs.length + 1,
            isNew: true
        }])
    }

    const deleteSdg = async (id: string, isNew?: boolean) => {
        if (!confirm("Remove this SDG goal?")) return
        if (isNew) {
            setSdgs(sdgs.filter(s => s.id !== id))
            return
        }
        try {
            const { error } = await supabase.from('sdg_alignment').delete().eq('id', id)
            if (error) throw error
            setSdgs(sdgs.filter(s => s.id !== id))
        } catch (err: any) {
            setError(err.message)
        }
    }

    const updateSdg = (id: string, field: string, value: any) => {
        setSdgs(sdgs.map(s => s.id === id ? { ...s, [field]: value } : s))
    }

    async function handleSave() {
        setSaving(true)
        setError(null)
        try {
            const dataToSave = sdgs.map(({ isNew, ...rest }, index) => ({
                ...rest,
                order_index: index + 1
            }))
            const { error } = await supabase.from('sdg_alignment').upsert(dataToSave)
            if (error) throw error
            setSuccess("SDG Alignment updated!")
            fetchSdgs()
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
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">SDG Alignment</h2>
                    <p className="text-slate-500 mt-2">Manage United Nations Sustainable Development Goals alignment.</p>
                </div>
                <div className="flex space-x-4">
                    <Button variant="outline" onClick={addSdg}><Plus className="mr-2 h-4 w-4" /> Add Goal</Button>
                    <Button onClick={handleSave} disabled={saving} className="bg-orange-600 hover:bg-orange-700">
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save All
                    </Button>
                </div>
            </div>

            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
            {success && <Alert className="bg-orange-50 text-orange-700 border-orange-200"><AlertDescription>{success}</AlertDescription></Alert>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sdgs.map((sdg, index) => (
                    <Card key={sdg.id} className="border-slate-200/60 shadow-sm relative group bg-white border-0">
                        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 h-8 w-8 p-0" onClick={() => deleteSdg(sdg.id, sdg.isNew)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <CardContent className="p-8 space-y-4">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-orange-100 rounded-2xl">
                                    <Globe className="h-6 w-6 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <Input
                                        value={sdg.sdg_number}
                                        onChange={e => updateSdg(sdg.id, 'sdg_number', e.target.value)}
                                        className="text-2xl font-black text-orange-700 border-0 p-0 h-auto focus-visible:ring-0"
                                        placeholder="13"
                                    />
                                    <Input
                                        value={sdg.title}
                                        onChange={e => updateSdg(sdg.id, 'title', e.target.value)}
                                        className="text-sm font-bold text-slate-900 border-0 p-0 h-auto focus-visible:ring-0"
                                        placeholder="SDG Goal Name"
                                    />
                                </div>
                            </div>
                            <Textarea
                                value={sdg.description}
                                onChange={e => updateSdg(sdg.id, 'description', e.target.value)}
                                className="bg-slate-50 border-0 resize-none min-h-[100px] text-sm text-slate-600"
                                placeholder="Goal description..."
                            />
                            <div className="pt-2">
                                <Label className="text-[10px] uppercase tracking-widest text-slate-400">Icon Name (Lucide)</Label>
                                <Input
                                    value={sdg.icon_name}
                                    onChange={e => updateSdg(sdg.id, 'icon_name', e.target.value)}
                                    className="text-xs mt-1 p-2 h-8 bg-slate-50 border-0"
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
