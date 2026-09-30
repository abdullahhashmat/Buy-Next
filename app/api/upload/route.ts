import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        {
          success: false,
          message: "Image file is required",
        },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return Response.json(
        {
          success: false,
          message: "Only image files are allowed",
        },
        { status: 400 }
      );
    }

    // Maximum 5MB
    if (file.size > 5 * 1024 * 1024) {
      return Response.json(
        {
          success: false,
          message: "Image must be less than 5MB",
        },
        { status: 400 }
      );
    }

    const extension = file.name.split(".").pop()?.toLowerCase();

    const allowedExtensions = ["jpg", "jpeg", "png", "webp"];

    if (!extension || !allowedExtensions.includes(extension)) {
      return Response.json(
        {
          success: false,
          message: "Only JPG, JPEG, PNG and WEBP images are allowed",
        },
        { status: 400 }
      );
    }

    const uploadFolder = path.join(
      process.cwd(),
      "public",
      "uploads"
    );

    await mkdir(uploadFolder, {
      recursive: true,
    });

    const fileName = `${randomUUID()}.${extension}`;

    const filePath = path.join(
      uploadFolder,
      fileName
    );

    const bytes = await file.arrayBuffer();

    await writeFile(
      filePath,
      Buffer.from(bytes)
    );

    return Response.json({
      success: true,
      message: "Image uploaded successfully",
      url: `/uploads/${fileName}`,
    });
  } catch (error) {
    console.error("IMAGE UPLOAD ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to upload image",
      },
      { status: 500 }
    );
  }
}