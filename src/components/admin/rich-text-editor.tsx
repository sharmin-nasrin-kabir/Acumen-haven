"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import ImageExtension from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Undo,
    Redo,
    Link as LinkIcon,
    Heading1,
    Heading2,
    Heading3,
    Youtube as YoutubeIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect } from 'react'

interface RichTextEditorProps {
    content: string
    onChange: (value: string) => void
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
            ImageExtension,
            Youtube.configure({
                width: 640,
                height: 360,
            }),
        ],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    // Update editor content if content prop changes externally
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content)
        }
    }, [content, editor])

    if (!editor) {
        return null
    }

    const addYoutubeVideo = () => {
        const url = prompt('Enter YouTube URL')
        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
            })
        }
    }

    const toggleLink = () => {
        const previousUrl = editor.getAttributes('link').href
        const url = prompt('Enter URL', previousUrl)

        if (url === null) {
            return
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all">
            <div className="bg-slate-50/80 border-b border-slate-200 p-1.5 flex flex-wrap gap-1 sticky top-0 z-10">
                <TooltipProvider>
                    <div className="flex items-center gap-1 pr-2 border-r border-slate-200 mx-1">
                        <MenuButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            active={editor.isActive('heading', { level: 1 })}
                            tooltip="Heading 1"
                        >
                            <Heading1 className="h-4 w-4" />
                        </MenuButton>
                        <MenuButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            active={editor.isActive('heading', { level: 2 })}
                            tooltip="Heading 2"
                        >
                            <Heading2 className="h-4 w-4" />
                        </MenuButton>
                        <MenuButton
                            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                            active={editor.isActive('heading', { level: 3 })}
                            tooltip="Heading 3"
                        >
                            <Heading3 className="h-4 w-4" />
                        </MenuButton>
                    </div>

                    <div className="flex items-center gap-1 px-2 border-r border-slate-200">
                        <MenuButton
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            active={editor.isActive('bold')}
                            tooltip="Bold"
                        >
                            <Bold className="h-4 w-4" />
                        </MenuButton>
                        <MenuButton
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            active={editor.isActive('italic')}
                            tooltip="Italic"
                        >
                            <Italic className="h-4 w-4" />
                        </MenuButton>
                    </div>

                    <div className="flex items-center gap-1 px-2 border-r border-slate-200">
                        <MenuButton
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            active={editor.isActive('bulletList')}
                            tooltip="Bullet List"
                        >
                            <List className="h-4 w-4" />
                        </MenuButton>
                        <MenuButton
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            active={editor.isActive('orderedList')}
                            tooltip="Numbered List"
                        >
                            <ListOrdered className="h-4 w-4" />
                        </MenuButton>
                    </div>

                    <div className="flex items-center gap-1 px-2 border-r border-slate-200">
                        <MenuButton
                            onClick={toggleLink}
                            active={editor.isActive('link')}
                            tooltip="Insert Link"
                        >
                            <LinkIcon className="h-4 w-4" />
                        </MenuButton>
                        <MenuButton
                            onClick={addYoutubeVideo}
                            tooltip="Insert YouTube Video"
                        >
                            <YoutubeIcon className="h-4 w-4" />
                        </MenuButton>
                    </div>

                    <div className="flex items-center gap-1 px-2">
                        <MenuButton
                            onClick={() => editor.chain().focus().undo().run()}
                            tooltip="Undo"
                        >
                            <Undo className="h-4 w-4" />
                        </MenuButton>
                        <MenuButton
                            onClick={() => editor.chain().focus().redo().run()}
                            tooltip="Redo"
                        >
                            <Redo className="h-4 w-4" />
                        </MenuButton>
                    </div>
                </TooltipProvider>
            </div>

            <EditorContent
                editor={editor}
                className="prose prose-sm max-w-none p-4 min-h-[250px] focus:outline-none bg-white"
            />

            <style jsx global>{`
        .ProseMirror {
          min-height: 250px;
          outline: none;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror iframe {
            border-radius: 0.5rem;
            max-width: 100%;
        }
      `}</style>
        </div>
    )
}

function MenuButton({
    onClick,
    active = false,
    children,
    tooltip
}: {
    onClick: () => void,
    active?: boolean,
    children: any,
    tooltip: string
}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onClick}
                    className={`h-8 w-8 p-0 ${active ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'text-slate-600 hover:bg-slate-200'}`}
                >
                    {children}
                </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-[10px] py-1 px-2">
                {tooltip}
            </TooltipContent>
        </Tooltip>
    )
}
