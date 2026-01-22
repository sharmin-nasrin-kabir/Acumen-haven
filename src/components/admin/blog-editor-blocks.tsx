"use client"

import { useState, useEffect } from "react"
import {
    Plus,
    Type,
    Image as ImageIcon,
    Youtube as YoutubeIcon,
    MoveUp,
    MoveDown,
    Type as TypeIcon,
    UploadCloud,
    X,
    Loader2,
    Bold,
    Italic,
    Link as LinkIcon,
    Code,
    List,
    ListOrdered,
    Quote,
    Palette,
    Trash2,
    Underline as UnderlineIcon,
    ChevronDown
} from "lucide-react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import { Color } from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import { Underline } from "@tiptap/extension-underline"
import { Placeholder } from "@tiptap/extension-placeholder"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import Image from "next/image"
import { cn } from "@/lib/utils"

export type BlockType = 'heading' | 'paragraph' | 'image' | 'youtube'

export interface EditorBlock {
    id: string
    type: BlockType
    value: string
    caption?: string
}

interface BlogBlockEditorProps {
    initialContent: string
    onChange: (_value: string) => void
}

export function BlogBlockEditor({ initialContent, onChange }: BlogBlockEditorProps) {
    const [blocks, setBlocks] = useState<EditorBlock[]>([])
    const [loading, setLoading] = useState(false)

    // Initial parse of HTML to blocks
    useEffect(() => {
        try {
            if (initialContent && initialContent.startsWith('[') && initialContent.endsWith(']')) {
                setBlocks(JSON.parse(initialContent))
            } else if (initialContent) {
                setBlocks([{ id: 'init', type: 'paragraph', value: initialContent }])
            }
        } catch {
            setBlocks([{ id: 'init', type: 'paragraph', value: initialContent }])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Only run once on mount to avoid loops

    // Notify parent of changes ONLY when blocks change from user interaction
    useEffect(() => {
        const json = JSON.stringify(blocks)
        if (json !== initialContent) {
            onChange(json)
        }
    }, [blocks, onChange, initialContent])

    const getYoutubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url?.match(regExp)
        return (match && match[2].length === 11) ? match[2] : null
    }

    const addBlock = (type: BlockType) => {
        const newBlock: EditorBlock = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            value: '',
            caption: type === 'image' ? '' : undefined
        }
        setBlocks(prev => [...prev, newBlock])
    }

    const updateBlock = (id: string, value: string, caption?: string) => {
        setBlocks(prev => prev.map(b => b.id === id ? { ...b, value, caption } : b))
    }

    const deleteBlock = (id: string) => {
        setBlocks(prev => prev.filter(b => b.id !== id))
    }

    const moveBlock = (index: number, direction: 'up' | 'down') => {
        setBlocks(prev => {
            const newBlocks = [...prev]
            const targetIndex = direction === 'up' ? index - 1 : index + 1
            if (targetIndex < 0 || targetIndex >= newBlocks.length) return prev;
            [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]]
            return newBlocks
        })
    }

    const handleImageUpload = async (id: string, file: File) => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("file", file)
            formData.append("type", "blogs")

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            const result = await response.json()
            if (!response.ok) throw new Error(result.error || "Upload failed")

            updateBlock(id, result.url)
            toast.success("Image uploaded")
        } catch (err: any) {
            toast.error(err.message || "Failed to upload image")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Post Storytelling</h3>
                    <p className="text-sm text-slate-500 font-medium">Drag and drop blocks to craft your narrative.</p>
                </div>
                <div className="bg-emerald-50 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold border border-emerald-100">
                    {blocks.length} Blocks
                </div>
            </div>

            <div className="space-y-4 min-h-[100px] border-2 border-dashed border-slate-100 rounded-[2rem] p-4 bg-slate-50/30">
                {blocks.map((block, index) => (
                    <Card key={block.id} className="group relative border-none shadow-sm hover:shadow-md transition-all rounded-3xl bg-white border border-slate-100">
                        {/* Control Bar */}
                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
                            <Button type="button" variant="secondary" size="icon" className="h-8 w-8 rounded-full" onClick={() => moveBlock(index, 'up')} disabled={index === 0}>
                                <MoveUp className="h-3 w-3" />
                            </Button>
                            <Button type="button" variant="secondary" size="icon" className="h-8 w-8 rounded-full" onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1}>
                                <MoveDown className="h-3 w-3" />
                            </Button>
                            <Button type="button" variant="destructive" size="icon" className="h-8 w-8 rounded-full" onClick={() => deleteBlock(block.id)}>
                                <X className="h-3 w-3" />
                            </Button>
                        </div>

                        <div className="p-6">
                            {block.type === 'heading' && (
                                <div className="flex items-start gap-4">
                                    <div className="mt-2 p-2 bg-blue-50 rounded-xl text-blue-600">
                                        <TypeIcon className="h-4 w-4" />
                                    </div>
                                    <Input
                                        value={block.value}
                                        onChange={(e) => updateBlock(block.id, e.target.value)}
                                        placeholder="Enter Heading..."
                                        className="text-2xl font-black border-none focus-visible:ring-0 p-0 h-auto bg-transparent placeholder:text-slate-200"
                                    />
                                </div>
                            )}

                            {block.type === 'paragraph' && (
                                <RichParagraphEditor
                                    value={block.value}
                                    onChange={(val) => updateBlock(block.id, val)}
                                    onDelete={() => deleteBlock(block.id)}
                                />
                            )}

                            {block.type === 'image' && (
                                <div className="space-y-4">
                                    {block.value ? (
                                        <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-100">
                                            <Image src={block.value} alt="Block Image" fill className="object-cover" />
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                className="absolute top-4 right-4 rounded-full h-10 w-10 shadow-xl"
                                                onClick={() => updateBlock(block.id, '')}
                                            >
                                                <X className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center aspect-video rounded-[2rem] border-4 border-dashed border-slate-100 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer group/upload">
                                            <div className="bg-white p-4 rounded-full shadow-lg mb-3 group-hover/upload:scale-110 transition-transform">
                                                <UploadCloud className="h-8 w-8 text-emerald-600" />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">Drop image here or click to upload</span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => e.target.files?.[0] && handleImageUpload(block.id, e.target.files[0])}
                                            />
                                        </label>
                                    )}
                                    <Input
                                        value={block.caption}
                                        onChange={(e) => updateBlock(block.id, block.value, e.target.value)}
                                        placeholder="Add a caption for this image..."
                                        className="text-sm border-none focus-visible:ring-0 h-auto bg-transparent text-center text-slate-500 italic"
                                    />
                                </div>
                            )}

                            {block.type === 'youtube' && (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 bg-red-50 p-3 rounded-2xl border border-red-100/50">
                                        <YoutubeIcon className="h-5 w-5 text-red-600" />
                                        <Input
                                            value={block.value}
                                            onChange={(e) => updateBlock(block.id, e.target.value)}
                                            placeholder="Paste YouTube Video URL..."
                                            className="border-none focus-visible:ring-0 h-auto p-0 bg-transparent placeholder:text-red-200 font-medium"
                                        />
                                    </div>
                                    {getYoutubeId(block.value) && (
                                        <div className="aspect-video rounded-[2rem] overflow-hidden shadow-2xl bg-black border-4 border-white">
                                            <iframe
                                                width="100%" height="100%"
                                                src={`https://www.youtube.com/embed/${getYoutubeId(block.value)}`}
                                                title="YouTube Preview" frameBorder="0" allowFullScreen
                                            ></iframe>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </Card>
                ))}

                {blocks.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="bg-white inline-flex p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 mb-6">
                            <Plus className="h-12 w-12 text-slate-200" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-400 italic">Your story board is empty</h4>
                    </div>
                )}
            </div>

            {/* Content Inserter - Matching User Image */}
            <div className="relative py-10 flex items-center justify-center">
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <div className="relative bg-white/80 backdrop-blur-xl border border-white p-2 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center gap-2">
                    <span className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Add Content</span>

                    <InserterButton onClick={() => addBlock('heading')} icon={Heading1Icon} label="Heading" />
                    <InserterButton onClick={() => addBlock('paragraph')} icon={ParagraphIcon} label="Paragraph" />
                    <InserterButton onClick={() => addBlock('image')} icon={ImageIcon} label="Image" />
                    <InserterButton onClick={() => addBlock('youtube')} icon={YoutubeIcon} label="YouTube" />
                </div>
            </div>

            {
                loading && (
                    <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-[3rem] shadow-2xl flex flex-col items-center">
                            <Loader2 className="h-12 w-12 text-emerald-600 animate-spin mb-4" />
                            <p className="font-black text-slate-900 uppercase italic tracking-widest">Uploading Media...</p>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

function InserterButton({ onClick, icon: Icon, label }: { onClick: () => void, icon: any, label: string }) {
    return (
        <Button
            type="button"
            variant="ghost"
            onClick={onClick}
            className="h-12 px-5 rounded-full hover:bg-slate-50 transition-all flex items-center gap-3 group"
        >
            <Icon className="h-5 w-5 text-slate-600 group-hover:text-emerald-600 transition-colors" />
            <span className="text-sm font-bold text-slate-700">{label}</span>
        </Button>
    )
}

function Heading1Icon({ className }: { className?: string }) {
    return (
        <div className={className}>
            <span className="text-[10px] font-black align-top">H1</span>
        </div>
    )
}

function ParagraphIcon({ className }: { className?: string }) {
    return (
        <div className={className}>
            <span className="text-[14px] font-black align-top">¶</span>
        </div>
    )
}

function RichParagraphEditor({ value, onChange, onDelete }: { value: string, onChange: (_val: string) => void, onDelete: () => void }) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-600 underline cursor-pointer',
                },
            }),
            TextStyle,
            Color,
            Underline,
            Placeholder.configure({
                placeholder: 'Type your story here...',
            })
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: "prose prose-slate max-w-none focus:outline-none min-h-[100px] text-lg leading-relaxed text-slate-700",
            },
        },
    })

    if (!editor) return null

    return (
        <div className="relative group/editor border-2 border-transparent focus-within:border-blue-500/30 rounded-2xl transition-all p-2 -m-2">
            {/* Floating Toolbar */}
            <div className={cn(
                "absolute -top-16 left-0 right-0 transform transition-all z-[100] pointer-events-none",
                editor.isFocused ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2"
            )}>
                <div className="bg-white border border-slate-200 shadow-[0_15px_50px_rgba(0,0,0,0.15)] rounded-xl p-1 flex items-center gap-0.5 max-w-fit mx-auto md:ml-0 bg-white/95 backdrop-blur-sm">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        active={editor.isActive('bold')}
                        icon={Bold}
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        active={editor.isActive('italic')}
                        icon={Italic}
                    />
                    <ToolbarButton
                        onClick={() => {
                            const url = window.prompt('URL')
                            if (url) editor.chain().focus().setLink({ href: url }).run()
                        }}
                        active={editor.isActive('link')}
                        icon={LinkIcon}
                    />
                    <div className="w-px h-6 bg-slate-100 mx-1" />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        active={editor.isActive('underline')}
                        icon={UnderlineIcon}
                    />
                    <div className="w-px h-6 bg-slate-100 mx-1" />
                    <ToolbarButton
                        onClick={() => {
                            if (editor.isActive('link')) {
                                editor.chain().focus().unsetLink().run()
                            } else {
                                const url = window.prompt('Professional Link URL (e.g., https://example.com)')
                                if (url) {
                                    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
                                }
                            }
                        }}
                        active={editor.isActive('link')}
                        icon={LinkIcon}
                    />
                    <div className="w-px h-6 bg-slate-100 mx-1" />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        active={editor.isActive('code')}
                        icon={Code}
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        active={editor.isActive('bulletList')}
                        icon={List}
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        active={editor.isActive('orderedList')}
                        icon={ListOrdered}
                    />
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        active={editor.isActive('blockquote')}
                        icon={Quote}
                    />
                    <div className="w-px h-6 bg-slate-100 mx-1" />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button type="button" className="p-2 rounded-lg transition-all hover:bg-slate-100 flex items-center gap-1 text-slate-600">
                                <Palette className="h-4 w-4" />
                                <ChevronDown className="h-3 w-3 opacity-50" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48 p-2" side="top" align="center">
                            <div className="grid grid-cols-5 gap-1">
                                {[
                                    '#000000', '#EF4444', '#3B82F6', '#10B981', '#F59E0B',
                                    '#8B5CF6', '#EC4899', '#6B7280', '#064E3B', '#F97316'
                                ].map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        className="w-8 h-8 rounded-full border border-slate-100 transition-transform hover:scale-110 shadow-sm"
                                        style={{ backgroundColor: color }}
                                        onClick={() => editor.chain().focus().setColor(color).run()}
                                    />
                                ))}
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full mt-2 text-[10px] font-bold uppercase tracking-widest h-7 hover:bg-slate-100"
                                onClick={() => editor.chain().focus().unsetColor().run()}
                            >
                                Reset Color
                            </Button>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="ml-4 pl-4 border-l border-slate-100">
                        <button
                            type="button"
                            onClick={onDelete}
                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-4">
                <div className="mt-2 p-2 bg-emerald-50 rounded-xl text-emerald-600">
                    <Type className="h-4 w-4" />
                </div>
                <div className="flex-1">
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    )
}

function ToolbarButton({ onClick, active, icon: Icon }: { onClick: () => void, active?: boolean, icon: any }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "p-2 rounded-lg transition-all hover:bg-slate-100",
                active ? "text-blue-600 bg-blue-50" : "text-slate-600"
            )}
        >
            <Icon className="h-4 w-4" />
        </button>
    )
}
