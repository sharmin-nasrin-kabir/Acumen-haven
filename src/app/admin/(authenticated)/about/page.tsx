"use client"

import { useState, useEffect, useCallback, ChangeEvent, DragEvent } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Loader2, Plus, Trash2, Image as ImageIcon,
    Save, History, Target, Globe, User, CircleUser, Upload,
    Mail, Linkedin, Twitter, Search, Filter
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const supabase = createClient()

// --- Sub-components ---

interface CollageUploadProps {
    index: number
    url: string
    isUploading: boolean
    onFileSelect: (idx: number, f: File) => void // eslint-disable-line no-unused-vars
}

const CollageUpload = ({ index, url, isUploading, onFileSelect }: CollageUploadProps) => {
    const [isDragging, setIsDragging] = useState(false)

    const handleDrag = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true)
        else setIsDragging(false)
    }

    const handleDrop = (e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) onFileSelect(index, file)
    }

    return (
        <div
            className={cn(
                "relative aspect-[16/10] rounded-2xl border-2 border-dashed transition-all duration-300 group overflow-hidden",
                isDragging ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-slate-50 hover:border-slate-300",
                !url && "flex flex-col items-center justify-center"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            {url ? (
                <>
                    <Image src={url} alt={`Collage ${index + 1}`} fill className="object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <label className="cursor-pointer bg-white text-slate-900 px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
                            <Upload className="h-3 w-3" /> Change Image
                            <input type="file" className="hidden" accept="image/*" onChange={e => {
                                const file = e.target.files?.[0]
                                if (file) onFileSelect(index, file)
                            }} />
                        </label>
                    </div>
                </>
            ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer p-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-2 group-hover:bg-slate-200 transition-colors">
                        <Plus className="h-5 w-5 text-slate-400" />
                    </div>
                    <span className="text-xs font-medium text-slate-500">Drop image or click</span>
                    <input type="file" className="hidden" accept="image/*" onChange={e => {
                        const file = e.target.files?.[0]
                        if (file) onFileSelect(index, file)
                    }} />
                </label>
            )}
            {isUploading && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
                </div>
            )}
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur-md rounded-md text-[10px] text-white font-bold tracking-widest uppercase">
                Pos {index + 1}
            </div>
        </div>
    )
}

export default function AboutManagementPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [uploadingCollage, setUploadingCollage] = useState<number | null>(null)

    // Page Content State
    const [pageContent, setPageContent] = useState<any>({
        story: { title: "", content: "" },
        mission: { title: "", content: "" },
        vision: { title: "", content: "" },
        header: { badge: "", title: "", description: "" },
        collageImages: []
    })
    const [initialPageContent, setInitialPageContent] = useState<string>("")

    // Team Members State
    const [members, setMembers] = useState<any[]>([])
    const [initialMembers, setInitialMembers] = useState<string>("")
    const [searchQuery, setSearchQuery] = useState("")
    const [categoryFilter, setCategoryFilter] = useState("All")

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const { data: settingsData } = await supabase
                .from('site_settings')
                .select('*')
                .in('key', ['about_story', 'about_mission', 'about_vision', 'about_collage_images', 'about_header'])

            const smap: any = {}
            settingsData?.forEach(s => smap[s.key] = s.value)

            const contentState = {
                story: smap.about_story || { title: "How It All Started", content: "" },
                mission: smap.about_mission || { title: "Our Mission", content: "" },
                vision: smap.about_vision || { title: "Our Vision", content: "" },
                header: smap.about_header || { badge: "Our Growing Family", title: "Meet the Team", description: "" },
                collageImages: smap.about_collage_images || ["", "", "", ""]
            }
            setPageContent(contentState)
            setInitialPageContent(JSON.stringify(contentState))

            const { data: membersData } = await supabase
                .from('team_members')
                .select('*')
                .order('order_index', { ascending: true })

            const membersList = membersData || []
            setMembers(membersList)
            setInitialMembers(JSON.stringify(membersList))
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    // --- Image Upload Logic ---
    const uploadImage = async (file: File, type: string): Promise<string> => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("type", type)
        const res = await fetch("/api/upload", { method: "POST", body: formData })
        if (!res.ok) throw new Error("Upload failed")
        const data = await res.json()
        return data.url
    }

    const handleCollageFile = async (index: number, file: File) => {
        try {
            setUploadingCollage(index)
            const url = await uploadImage(file, "about-collage")
            const newImages = [...pageContent.collageImages]
            newImages[index] = url
            setPageContent((prev: any) => ({ ...prev, collageImages: newImages }))
            setSuccess(`Image ${index + 1} uploaded`)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setUploadingCollage(null)
        }
    }

    // --- Content Handlers ---
    const updateContent = (section: string, field: string, value: any) => {
        setPageContent((prev: any) => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }))
    }

    const isContentDirty = JSON.stringify(pageContent) !== initialPageContent

    const saveContent = async () => {
        setSaving(true)
        setError(null)
        setSuccess(null)
        try {
            const updates = [
                { key: 'about_story', value: pageContent.story },
                { key: 'about_mission', value: pageContent.mission },
                { key: 'about_vision', value: pageContent.vision },
                { key: 'about_header', value: pageContent.header },
                { key: 'about_collage_images', value: pageContent.collageImages }
            ]
            const { error } = await supabase.from('site_settings').upsert(updates)
            if (error) throw error
            setInitialPageContent(JSON.stringify(pageContent))
            setSuccess("Page content saved successfully!")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    // --- Team Handlers ---
    const addMember = () => {
        const newMember = {
            id: crypto.randomUUID(),
            name: "",
            role: "",
            description: "",
            image_url: "",
            gender: "male",
            category: "Core Leadership",
            email: "",
            linkedin_url: "",
            twitter_url: "",
            order_index: members.length + 1,
            isNew: true
        }
        setMembers([newMember, ...members])
    }

    const updateMember = (id: string, field: string, value: any) => {
        setMembers(members.map(m => m.id === id ? { ...m, [field]: value } : m))
    }

    const deleteMember = async (id: string, isNew?: boolean) => {
        if (!confirm("Delete this member?")) return
        if (isNew) {
            setMembers(members.filter(m => m.id !== id))
            return
        }
        try {
            const { error } = await supabase.from('team_members').delete().eq('id', id)
            if (error) throw error
            setMembers(members.filter(m => m.id !== id))
            setSuccess("Member removed")
        } catch (err: any) {
            setError(err.message)
        }
    }

    const handleMemberFile = async (e: ChangeEvent<HTMLInputElement>, memberId: string) => {
        const file = e.target.files?.[0]
        if (!file) return
        try {
            setSaving(true)
            const url = await uploadImage(file, "team")
            updateMember(memberId, 'image_url', url)
            setSuccess("Profile picture updated")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    const isTeamDirty = JSON.stringify(members) !== initialMembers

    const saveMembers = async () => {
        setSaving(true)
        setError(null)
        try {
            const toSave = members.map((m, i) => {
                const updated = { ...m }
                delete updated.isNew
                return { ...updated, order_index: i + 1 }
            })
            const { error } = await supabase.from('team_members').upsert(toSave)
            if (error) throw error
            setInitialMembers(JSON.stringify(members))
            setSuccess("Team changes saved!")
            fetchData()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
    )

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-32 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-slate-900">About Us CMS</h2>
                    <p className="text-slate-500 mt-2 font-medium">Control the visual legacy and human connection of your brand.</p>
                </div>
                <div className="flex items-center gap-3">
                    {saving && <span className="text-xs font-bold text-emerald-600 animate-pulse flex items-center gap-2"><Loader2 className="h-3 w-3 animate-spin" /> Syncing...</span>}
                </div>
            </div>

            {error && <Alert variant="destructive" className="rounded-2xl border-red-100 bg-red-50 text-red-600 shadow-sm"><AlertDescription className="font-bold">{error}</AlertDescription></Alert>}
            {success && <Alert className="bg-emerald-50 text-emerald-700 border-emerald-100 shadow-sm rounded-2xl"><AlertDescription className="font-bold flex items-center gap-2">✓ {success}</AlertDescription></Alert>}

            <Tabs defaultValue="content" className="space-y-8">
                <TabsList className="bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200 shadow-inner w-fit">
                    <TabsTrigger value="content" className="rounded-xl px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md font-bold text-slate-600 transition-all">Page Sections</TabsTrigger>
                    <TabsTrigger value="team" className="rounded-xl px-8 py-3 data-[state=active]:bg-white data-[state=active]:shadow-md font-bold text-slate-600 transition-all">Team Registry</TabsTrigger>
                </TabsList>

                {/* --- Page Content Tab --- */}
                <TabsContent value="content" className="space-y-8">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {/* Header & Collage */}
                        <div className="space-y-8">
                            <Card className="rounded-[2.5rem] border-0 shadow-xl shadow-slate-200/50 overflow-hidden">
                                <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-2xl font-black flex items-center gap-3">
                                                <div className="p-2 bg-emerald-100 rounded-xl"><ImageIcon className="h-6 w-6 text-emerald-600" /></div>
                                                Header & Visuals
                                            </CardTitle>
                                            <CardDescription className="mt-2 font-medium">Define the hero section and slanted collage.</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-8 space-y-8">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="font-bold text-slate-700">Badge Label</Label>
                                            <Input className="rounded-xl border-slate-200" value={pageContent.header.badge} onChange={e => updateContent('header', 'badge', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="font-bold text-slate-700">Primary Heading</Label>
                                            <Input className="rounded-xl border-slate-200" value={pageContent.header.title} onChange={e => updateContent('header', 'title', e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-bold text-slate-700">Summary Description</Label>
                                        <Textarea className="rounded-[1.5rem] border-slate-200 h-24" value={pageContent.header.description} onChange={e => updateContent('header', 'description', e.target.value)} />
                                    </div>

                                    <div className="pt-4">
                                        <Label className="font-black text-slate-900 block mb-6 px-1 flex items-center justify-between">
                                            <span>Draggable Collage Layout</span>
                                            <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-full text-slate-500 uppercase tracking-tighter">4 Slots Required</span>
                                        </Label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[0, 1, 2, 3].map(idx => (
                                                <CollageUpload
                                                    key={idx}
                                                    index={idx}
                                                    url={pageContent.collageImages[idx]}
                                                    isUploading={uploadingCollage === idx}
                                                    onFileSelect={handleCollageFile}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Copywriting Areas */}
                        <div className="space-y-8">
                            <Card className="rounded-[2.5rem] border-0 shadow-xl shadow-slate-200/50">
                                <CardHeader className="p-8 border-b border-slate-100">
                                    <CardTitle className="text-2xl font-black flex items-center gap-3">
                                        <div className="p-2 bg-orange-100 rounded-xl"><History className="h-6 w-6 text-orange-600" /></div>
                                        Our Narrative
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 space-y-6">
                                    <Input className="text-xl font-bold rounded-xl h-14" value={pageContent.story.title} onChange={e => updateContent('story', 'title', e.target.value)} placeholder="Story Title" />
                                    <Textarea className="rounded-[2rem] h-[350px] leading-relaxed" value={pageContent.story.content} onChange={e => updateContent('story', 'content', e.target.value)} />
                                </CardContent>
                            </Card>

                            <div className="grid grid-cols-2 gap-6">
                                <Card className="rounded-[2rem] border-0 shadow-lg">
                                    <CardHeader className="p-6">
                                        <CardTitle className="text-lg font-black flex items-center gap-2 text-emerald-700"><Target className="h-5 w-5" /> Mission</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6 pt-0 space-y-4">
                                        <Input className="font-bold text-sm" value={pageContent.mission.title} onChange={e => updateContent('mission', 'title', e.target.value)} />
                                        <Textarea className="h-32 text-sm" value={pageContent.mission.content} onChange={e => updateContent('mission', 'content', e.target.value)} />
                                    </CardContent>
                                </Card>
                                <Card className="rounded-[2rem] border-0 shadow-lg">
                                    <CardHeader className="p-6">
                                        <CardTitle className="text-lg font-black flex items-center gap-2 text-blue-700"><Globe className="h-5 w-5" /> Vision</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6 pt-0 space-y-4">
                                        <Input className="font-bold text-sm" value={pageContent.vision.title} onChange={e => updateContent('vision', 'title', e.target.value)} />
                                        <Textarea className="h-32 text-sm" value={pageContent.vision.content} onChange={e => updateContent('vision', 'content', e.target.value)} />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center bg-white/80 backdrop-blur-md p-6 border-t fixed bottom-0 left-0 right-0 z-40 lg:left-72 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                        <Button onClick={saveContent} disabled={saving || !isContentDirty} className="bg-emerald-600 hover:bg-emerald-700 shadow-2xl px-12 h-16 rounded-2xl text-xl font-black transition-all hover:scale-105 active:scale-95 group disabled:opacity-50 disabled:hover:scale-100">
                            {saving ? <Loader2 className="mr-3 h-6 w-6 animate-spin" /> : <Save className="mr-3 h-6 w-6" />}
                            {!isContentDirty ? "No Changes Found" : "Publish Page Changes"}
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="team" className="space-y-8">
                    <div className="flex flex-col xl:flex-row items-center justify-between gap-6 bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                        <div className="flex-1 min-w-[300px] w-full xl:w-auto">
                            <h3 className="text-2xl font-black text-slate-900">Global Registry</h3>
                            <p className="text-slate-500 font-medium mb-4">Add or manage core members and volunteers.</p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Search by name or role..."
                                        className="pl-10 rounded-xl bg-slate-50 border-slate-200"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-slate-400" />
                                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                        <SelectTrigger className="w-[180px] rounded-xl bg-slate-50 border-slate-200">
                                            <SelectValue placeholder="Filter Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">All Categories</SelectItem>
                                            <SelectItem value="Core Leadership">Core leadership</SelectItem>
                                            <SelectItem value="Volunteer">Volunteers</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-4 w-full xl:w-auto self-end xl:self-center">
                            <Button variant="outline" onClick={addMember} className="rounded-xl h-14 px-8 font-bold border-2 border-slate-200 hover:border-emerald-500 transition-all flex-1">
                                <Plus className="mr-2 h-5 w-5" /> New Member
                            </Button>
                            <Button onClick={saveMembers} disabled={saving || !isTeamDirty} className="bg-emerald-600 hover:bg-emerald-700 rounded-xl h-14 px-8 font-black shadow-lg shadow-emerald-600/20 flex-1 disabled:opacity-50">
                                {saving ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                                {!isTeamDirty ? "No Changes" : "Sync Changes"}
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {members
                            .filter(m => {
                                const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    m.role.toLowerCase().includes(searchQuery.toLowerCase())
                                const matchesCategory = categoryFilter === "All" || m.category === categoryFilter
                                return matchesSearch && matchesCategory
                            })
                            .map((member) => (
                                <Card key={member.id} className="rounded-[2.5rem] border-0 shadow-xl shadow-slate-200/40 group overflow-hidden bg-white hover:ring-2 hover:ring-emerald-500/10 transition-all duration-300">
                                    <CardContent className="p-0">
                                        <div className="flex flex-col xl:flex-row h-full">
                                            {/* Profile Media Side */}
                                            <div className="xl:w-[280px] bg-slate-50/50 p-8 flex flex-col items-center border-b xl:border-b-0 xl:border-r border-slate-100 space-y-6">
                                                <div
                                                    className={cn(
                                                        "relative w-40 h-40 rounded-[2.5rem] overflow-hidden bg-white shadow-2xl ring-4 ring-white transition-all duration-300",
                                                        "border-2 border-transparent"
                                                    )}
                                                    onDragOver={(e) => {
                                                        e.preventDefault()
                                                        e.currentTarget.classList.add('ring-emerald-500', 'ring-offset-2')
                                                    }}
                                                    onDragLeave={(e) => {
                                                        e.preventDefault()
                                                        e.currentTarget.classList.remove('ring-emerald-500', 'ring-offset-2')
                                                    }}
                                                    onDrop={(e) => {
                                                        e.preventDefault()
                                                        e.currentTarget.classList.remove('ring-emerald-500', 'ring-offset-2')
                                                        const file = e.dataTransfer.files?.[0]
                                                        if (file) {
                                                            const event = { target: { files: [file] } } as any
                                                            handleMemberFile(event, member.id)
                                                        }
                                                    }}
                                                >
                                                    {member.image_url ? (
                                                        <Image src={member.image_url} alt="" fill className="object-cover" />
                                                    ) : (
                                                        <div className={cn("w-full h-full flex items-center justify-center transition-colors", member.gender === 'female' ? "bg-pink-50" : "bg-blue-50")}>
                                                            {member.gender === 'female' ? <CircleUser className="h-16 w-16 text-pink-300" /> : <User className="h-16 w-16 text-blue-300" />}
                                                        </div>
                                                    )}
                                                    <label className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-sm">
                                                        <Upload className="text-white h-8 w-8 mb-2" />
                                                        <span className="text-white text-[10px] font-black uppercase tracking-widest">Update Photo</span>
                                                        <input type="file" className="hidden" accept="image/*" onChange={e => handleMemberFile(e, member.id)} />
                                                    </label>
                                                </div>

                                                <div className="w-full space-y-4">
                                                    <div className="flex bg-white/80 backdrop-blur-md p-1 rounded-xl border shadow-sm">
                                                        <Button
                                                            variant="ghost"
                                                            className={cn("flex-1 h-10 rounded-lg text-xs font-bold gap-2", member.gender === 'male' ? "bg-slate-900 text-white hover:bg-slate-800" : "hover:bg-slate-100 text-slate-500")}
                                                            onClick={() => updateMember(member.id, 'gender', 'male')}
                                                        >
                                                            <User className="h-3.5 w-3.5" /> Male
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            className={cn("flex-1 h-10 rounded-lg text-xs font-bold gap-2", member.gender === 'female' ? "bg-slate-900 text-white hover:bg-slate-800" : "hover:bg-slate-100 text-slate-500")}
                                                            onClick={() => updateMember(member.id, 'gender', 'female')}
                                                        >
                                                            <CircleUser className="h-3.5 w-3.5" /> Female
                                                        </Button>
                                                    </div>

                                                    <Select value={member.category} onValueChange={v => updateMember(member.id, 'category', v)}>
                                                        <SelectTrigger className="w-full h-12 rounded-xl text-xs font-black uppercase tracking-[0.1em] border-slate-200 bg-white">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Core Leadership" className="font-bold">Core Leadership</SelectItem>
                                                            <SelectItem value="Volunteer" className="font-bold">Community Volunteer</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            {/* Form Interaction Side */}
                                            <div className="flex-1 p-8 md:p-10 bg-white space-y-8">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <Label className="text-slate-400 font-bold uppercase text-[10px] tracking-widest ml-1">Full Identity</Label>
                                                        <Input
                                                            value={member.name}
                                                            onChange={e => updateMember(member.id, 'name', e.target.value)}
                                                            className="text-2xl font-black h-14 border-0 border-b-2 border-slate-100 rounded-none px-1 focus:border-emerald-500 transition-colors shadow-none"
                                                            placeholder="Member Full Name"
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <Label className="text-slate-400 font-bold uppercase text-[10px] tracking-widest ml-1">Professional Role</Label>
                                                        <Input
                                                            value={member.role}
                                                            onChange={e => updateMember(member.id, 'role', e.target.value)}
                                                            className="text-xl font-bold h-14 border-0 border-b-2 border-slate-100 rounded-none px-1 focus:border-emerald-500 transition-colors shadow-none text-emerald-600"
                                                            placeholder="e.g. Executive Director"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <Label className="text-slate-400 font-bold uppercase text-[10px] tracking-widest ml-1">Profile Statement / Bio</Label>
                                                    <Textarea
                                                        value={member.description}
                                                        onChange={e => updateMember(member.id, 'description', e.target.value)}
                                                        className="rounded-[1.5rem] bg-slate-50/50 border-slate-100 focus:bg-white transition-all h-24 p-4 text-slate-600 leading-relaxed font-medium"
                                                        placeholder="Briefly describe the individual's mission or background..."
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                                                    <div className="space-y-3">
                                                        <Label className="flex items-center gap-2 text-slate-500 font-bold text-xs"><Mail className="h-3.5 w-3.5" /> Email</Label>
                                                        <Input value={member.email} onChange={e => updateMember(member.id, 'email', e.target.value)} className="rounded-xl border-slate-100 bg-slate-50/30" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <Label className="flex items-center gap-2 text-slate-500 font-bold text-xs"><Linkedin className="h-3.5 w-3.5" /> LinkedIn</Label>
                                                        <Input value={member.linkedin_url} onChange={e => updateMember(member.id, 'linkedin_url', e.target.value)} className="rounded-xl border-slate-100 bg-slate-50/30" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <Label className="flex items-center gap-2 text-slate-500 font-bold text-xs"><Twitter className="h-3.5 w-3.5" /> Twitter</Label>
                                                        <Input value={member.twitter_url} onChange={e => updateMember(member.id, 'twitter_url', e.target.value)} className="rounded-xl border-slate-100 bg-slate-50/30" />
                                                    </div>
                                                </div>

                                                <div className="pt-6 flex items-center justify-between border-t border-slate-50">
                                                    <div className="flex items-center gap-4 text-slate-400 font-black text-[10px] tracking-widest uppercase">
                                                        <span className="flex items-center gap-2">UID: <span className="text-slate-300 font-mono">{member.id.split('-')[0]}</span></span>
                                                        {member.isNew && <span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded shadow-sm">New Entry</span>}
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl px-4 font-black text-xs uppercase transition-all"
                                                        onClick={() => deleteMember(member.id, member.isNew)}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" /> Expunge Record
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>

                    {members.length === 0 && (
                        <div className="text-center py-32 bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-200">
                            <Users className="h-20 w-20 text-slate-200 mx-auto mb-6" />
                            <h4 className="text-2xl font-black text-slate-300">No Registry Entries Found</h4>
                            <p className="text-slate-400 font-medium mb-8">Begin populating your team database.</p>
                            <Button onClick={addMember} className="bg-slate-900 text-white rounded-2xl h-16 px-10 font-black">
                                <Plus className="mr-2 h-6 w-6" /> Initialize First Record
                            </Button>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}

function Users({ className, ...props }: any) {
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
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}
