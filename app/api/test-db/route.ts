import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    return Response.json({
      success: true,
      message: "MongoDB Connected Successfully",
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error);

    return Response.json(
      {
        success: false,
        message: String(error),
      },
      { status: 500 }
    );
  }
}