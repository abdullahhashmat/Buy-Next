import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { createAuthToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    const loginEmail = email.toLowerCase().trim();

    // =========================
    // ADMIN LOGIN
    // =========================

    const adminEmail =
      process.env.ADMIN_EMAIL?.toLowerCase().trim();

    const adminPassword =
      process.env.ADMIN_PASSWORD;

    if (
      loginEmail === adminEmail &&
      password === adminPassword
    ) {
      const token = await createAuthToken(
        loginEmail,
        "admin"
      );

      const cookieStore = await cookies();

      cookieStore.set(
        "auth_token",
        token,
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        }
      );

      return Response.json({
        success: true,
        message: "Admin login successful",
        role: "admin",
        redirect: "/admin/products",
      });
    }

    // =========================
    // CUSTOMER LOGIN
    // =========================

    const user = await User.findOne({
      email: loginEmail,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message:
            "Account not found. Please Sign Up first.",
        },
        { status: 401 }
      );
    }

    if (user.password !== password) {
      return Response.json(
        {
          success: false,
          message: "Incorrect password",
        },
        { status: 401 }
      );
    }

    const token = await createAuthToken(
      user.email,
      "customer"
    );

    const cookieStore = await cookies();

    cookieStore.set(
      "auth_token",
      token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }
    );

    return Response.json({
      success: true,
      message: "Login successful",
      role: "customer",
      redirect: "/",
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Login failed",
      },
      { status: 500 }
    );
  }
}