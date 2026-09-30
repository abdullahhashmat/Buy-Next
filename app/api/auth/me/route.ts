import { cookies } from "next/headers";
import { verifyAuthToken } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return Response.json(
        {
          success: false,
          authenticated: false,
        },
        { status: 401 }
      );
    }

    const payload = await verifyAuthToken(token);

    if (!payload) {
      return Response.json(
        {
          success: false,
          authenticated: false,
        },
        { status: 401 }
      );
    }

    return Response.json({
      success: true,
      authenticated: true,
      user: {
        email: payload.email,
        role: payload.role,
      },
    });
  } catch (error) {
    console.error("AUTH CHECK ERROR:", error);

    return Response.json(
      {
        success: false,
        authenticated: false,
      },
      { status: 401 }
    );
  }
}