import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: "Cloudinary credentials not configured" }, { status: 500 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`

    // Create signature for signed upload
    const timestamp = Math.round(new Date().getTime() / 1000)
    const folder = "rental-properties"

    const signatureString = `folder=${folder}&timestamp=${timestamp}${apiSecret}`
    const signature = crypto.createHash("sha1").update(signatureString).digest("hex")

    // Prepare form data for Cloudinary
    const cloudinaryFormData = new FormData()
    cloudinaryFormData.append("file", base64Image)
    cloudinaryFormData.append("api_key", apiKey)
    cloudinaryFormData.append("timestamp", timestamp.toString())
    cloudinaryFormData.append("signature", signature)
    cloudinaryFormData.append("folder", folder)

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: cloudinaryFormData,
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("Cloudinary error:", result)
      throw new Error(`Cloudinary upload failed: ${result.error?.message || "Unknown error"}`)
    }

    return NextResponse.json({
      secure_url: result.secure_url,
      public_id: result.public_id,
    })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Error uploading image",
      },
      { status: 500 },
    )
  }
}
