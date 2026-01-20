"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Plus, Trash2, TrendingUp, Save } from "lucide-react"

const supabase = createClient()

export default function ImpactStatsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [stats, setStats] = useState<any[]>([])

    const fetchStats = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('impact_stats')
                .select('*')
                .order('order_index', { ascending: true })

            if (error) throw error
            setStats(data || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchStats()
    }, [fetchStats])

    const addStat = () => {
        const newStat = {
            id: crypto.randomUUID(),
            number: "0+",
            label: "Impact Category",
            description: "A professional description of the change we created in the community.",
            order_index: stats.length + 1,
            isNew: true
        }
        setStats([...stats, newStat])
    }

    const deleteStat = async (id: string, isNew?: boolean) => {
        if (!confirm("Delete this impact record?")) return
        if (isNew) {
            setStats(stats.filter(s => s.id !== id))
            return
        }
        try {
            const { error } = await supabase.from('impact_stats').delete().eq('id', id)
            if (error) throw error
            setStats(stats.filter(s => s.id !== id))
        } catch (err: any) {
            setError(err.message)
        }
    }

    const updateStat = (id: string, field: string, value: any) => {
        setStats(stats.map(s => s.id === id ? { ...s, [field]: value } : s))
    }

    async function handleSave() {
        setSaving(true)
        setError(null)
        try {
            const dataToSave = stats.map((stat, index) => {
                const rest = { ...stat }
                delete rest.isNew
                return {
                    ...rest,
                    order_index: index + 1
                }
            })
            const { error } = await supabase.from('impact_stats').upsert(dataToSave)
            if (error) throw error
            setSuccess("Impact stats updated!")
            fetchStats()
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
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Making a Real Difference</h2>
                    <p className="text-slate-500 mt-2">Manage the statistics and impact stories displayed in the home page grid.</p>
                </div>
                <div className="flex space-x-4">
                    <Button variant="outline" onClick={addStat}><Plus className="mr-2 h-4 w-4" /> Add Record</Button>
                    <Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-700">
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save All
                    </Button>
                </div>
            </div>

            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
            {success && <Alert className="bg-emerald-50 text-emerald-700 border-emerald-200"><AlertDescription>{success}</AlertDescription></Alert>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.id} className="border-slate-200/60 shadow-sm relative group overflow-hidden">
                        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 h-8 w-8 p-0" onClick={() => deleteStat(stat.id, stat.isNew)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <CardContent className="p-8 space-y-4">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="p-3 bg-emerald-100 rounded-2xl">
                                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                    <Input
                                        value={stat.number}
                                        onChange={e => updateStat(stat.id, 'number', e.target.value)}
                                        className="text-2xl font-black text-emerald-700 border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                                        placeholder="200+"
                                    />
                                    <Input
                                        value={stat.label}
                                        onChange={e => updateStat(stat.id, 'label', e.target.value)}
                                        className="text-sm font-bold text-slate-400 uppercase tracking-widest border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                                        placeholder="Teachers Trained"
                                    />
                                </div>
                            </div>
                            <Textarea
                                value={stat.description}
                                onChange={e => updateStat(stat.id, 'description', e.target.value)}
                                className="resize-none text-slate-600 border-slate-100 focus:border-emerald-200 min-h-[100px]"
                                placeholder="Describe the impact..."
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
