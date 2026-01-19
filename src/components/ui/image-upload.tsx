"use client"

import React, { useState, useRef } from "react"
import { Upload, X, Loader2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
    value?: string
    // eslint-disable-next-line no-unused-vars
    onChange: (url: string) => void
    onRemove: () => void
    folder?: string
}

export function ImageUpload({
    value,
    onChange,
    onRemove,
    folder = "site"
}: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const files = e.dataTransfer.files
        if (files && files[0]) {
            uploadFile(files[0])
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files[0]) {
            uploadFile(files[0])
        }
    }

    const uploadFile = async (file: File) => {
        try {
            setIsUploading(true)
            const formData = new FormData()
            formData.append("file", file)
            formData.append("type", folder)

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                throw new Error("Upload failed")
            }

            const data = await response.json()
            onChange(data.url)
        } catch (error) {
            console.error("Upload error:", error)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="space-y-4 w-full">
            <div
                className={cn(
                    "relative border-2 border-dashed rounded-xl p-4 transition-all duration-200 flex flex-col items-center justify-center text-center",
                    isDragging ? "border-emerald-500 bg-emerald-50/50" : "border-slate-200 bg-slate-50",
                    !value && "py-12"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />

                {value ? (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden group">
                        <Image
                            src={value}
                            alt="Uploaded image"
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-white text-sm font-medium">Click to change</p>
                        </div>
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 rounded-full h-8 w-8 shadow-lg"
                            onClick={(e) => {
                                e.stopPropagation()
                                onRemove()
                            }}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                            {isUploading ? (
                                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                            ) : (
                                <Upload className="h-8 w-8 text-slate-400" />
                            )}
                        </div>
                        <div>
                            <p className="text-slate-900 font-semibold mb-1">
                                {isUploading ? "Uploading..." : "Click or drag to upload"}
                            </p>
                            <p className="text-slate-500 text-sm">
                                SVG, PNG, JPG (max. 5MB)
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
