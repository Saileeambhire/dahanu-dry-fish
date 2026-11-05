import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { isSupabaseConfigured, supabaseAdmin, supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, error: "No image file provided." },
        { status: 400 }
      );
    }

    const mimeType = file.type || "";
    const originalName = file.name || "upload.jpg";
    const ext = path.extname(originalName).toLowerCase() || ".jpg";
    const allowedExts = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];

    if (!allowedExts.includes(ext) && !mimeType.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type. Only JPG, PNG, WEBP, GIF, and AVIF images are supported.",
        },
        { status: 400 }
      );
    }

    // Limit to 10MB
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (buffer.length > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "Image size exceeds 10MB limit." },
        { status: 400 }
      );
    }

    // Clean unique filename
    const cleanBase = path
      .basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 35) || "product";

    const uniqueName = `${cleanBase}-${Date.now()}${ext}`;

    // 1. SUPABASE STORAGE (If configured)
    if (isSupabaseConfigured()) {
      try {
        const client = supabaseAdmin || supabase;
        const bucket = "product-images";

        const { data, error } = await client.storage
          .from(bucket)
          .upload(uniqueName, buffer, {
            contentType: mimeType || "image/jpeg",
            upsert: true,
          });

        if (error) {
          console.warn("Supabase storage upload error, falling back to local:", error.message);
        } else {
          const { data: publicData } = client.storage
            .from(bucket)
            .getPublicUrl(uniqueName);

          return NextResponse.json({
            success: true,
            storage: "supabase",
            url: publicData.publicUrl,
            fileName: uniqueName,
            size: buffer.length,
            message: "Image uploaded to Supabase Storage bucket successfully",
          });
        }
      } catch (sbError) {
        console.warn("Supabase upload exception:", sbError);
      }
    }

    // 2. LOCAL PUBLIC STORAGE (Fallback)
    const uploadDir = path.join(process.cwd(), "public", "uploads", "products");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/products/${uniqueName}`;

    return NextResponse.json({
      success: true,
      storage: "local",
      url: publicUrl,
      fileName: uniqueName,
      size: buffer.length,
      message: "Image saved to local server storage (/public/uploads/products/)",
    });
  } catch (error) {
    console.error("Image upload fatal error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process image upload." },
      { status: 500 }
    );
  }
}
