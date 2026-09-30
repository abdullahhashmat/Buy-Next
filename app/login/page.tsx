"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      // Admin
      if (data.role === "admin") {
        router.push("/admin/products");
        return;
      }

      // Customer
      router.push("/");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-[#F5F5F5]">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="text-xl font-bold tracking-[5px] transition hover:text-[#C6A15B]"
          >
            BUY NEXT
          </Link>

          <p className="mt-4 text-xs uppercase tracking-[3px] text-[#777777]">
            Account Login
          </p>
        </div>

        {/* Login Box */}
        <div className="border border-[#252525] bg-[#111111] p-8 md:p-10">

          <h1 className="text-2xl font-semibold">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-[#777777]">
            Login to continue shopping.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[2px] text-[#A1A1A1]">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full border border-[#333333] bg-[#050505] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#555555] focus:border-[#C6A15B]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[2px] text-[#A1A1A1]">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full border border-[#333333] bg-[#050505] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#555555] focus:border-[#C6A15B]"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="border border-red-900 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C6A15B] px-5 py-3.5 text-xs font-bold uppercase tracking-[2px] text-black transition hover:bg-[#D4B875] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          {/* Signup */}
          <div className="mt-8 border-t border-[#252525] pt-6 text-center">

            <p className="text-sm text-[#777777]">
              Don&apos;t have an account?
            </p>

            <Link
              href="/signup"
              className="mt-2 inline-block text-xs font-semibold uppercase tracking-[2px] text-[#C6A15B] transition hover:text-[#D4B875]"
            >
              Create Account
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}