"use client"

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

interface ImageDropzoneProps {
    images: string[]
    onUpdate: (urls: string[]) => void // eslint-disable-line no-unused-vars
    onUpload: (file: File) => Promise<string> // eslint-disable-line no-unused-vars
    uploading: boolean
    label?: string
    maxFiles?: number
}

export function ImageDropzone({
    images,
    onUpdate,
    onUpload,
    uploading,
    label = "Upload Images",
    maxFiles = 10
}: ImageDropzoneProps) {

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return

        if (images.length + acceptedFiles.length > maxFiles) {
            toast.error(`You can only upload up to ${maxFiles} images`)
            return
        }

        try {
            const urls = await Promise.all(acceptedFiles.map(onUpload))
            onUpdate([...images, ...urls])
            toast.success(`${urls.length} images uploaded`)
        } catch (err: any) {
            toast.error(err.message || "Failed to upload some images")
        }
    }, [images, onUpdate, onUpload, maxFiles])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        disabled: uploading,
        maxFiles: maxFiles - images.length
    })

    const removeImage = (index: number) => {
        const newImages = [...images]
        newImages.splice(index, 1)
        onUpdate(newImages)
    }

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`
          border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center justify-center cursor-pointer
          ${isDragActive ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 hover:border-emerald-400 hover:bg-slate-50/50'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
            >
                <input {...getInputProps()} />
                {uploading ? (
                    <Loader2 className="h-10 w-10 animate-spin text-emerald-600 mb-4" />
                ) : (
                    <Upload className={`h-10 w-10 mb-4 ${isDragActive ? 'text-emerald-500' : 'text-slate-400'}`} />
                )}
                <p className="text-sm font-medium text-slate-700">{label}</p>
                <p className="text-xs text-slate-500 mt-1">Drag and drop or click to select</p>
            </div>

            {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {images.map((url, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden group shadow-sm border border-slate-100">
                            <Image src={url} alt={`Image ${index}`} fill className="object-cover" />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    removeImage(index)
                                }}
                                className="absolute top-1 right-1 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600 shadow-md"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
