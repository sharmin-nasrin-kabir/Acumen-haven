import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = formData.get("type") as string // "research", "resources", or undefined for events

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    let uploadsDir: string
    let allowedTypes: string[]

    if (type && ["research", "resources"].includes(type)) {
      // New PDF upload system
      allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"]
      uploadsDir = join(process.cwd(), "public", "uploads", type)
    } else {
      // Legacy event image uploads (no type parameter)
      allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
      uploadsDir = join(process.cwd(), "public", "uploads", "events")
    }

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    // Generate unique filename
    const fileExtension = file.name.split(".").pop()
    const fileName = `${uuidv4()}.${fileExtension}`

    // Create uploads directory
    await mkdir(uploadsDir, { recursive: true })

    // Save file
    const filePath = join(uploadsDir, fileName)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    await writeFile(filePath, buffer)

    // Return the public URL
    const folderName = type || "events"
    const publicUrl = `/uploads/${folderName}/${fileName}`

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
