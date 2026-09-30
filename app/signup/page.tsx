"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch (error) {
      console.error("SIGNUP ERROR:", error);
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
            Create Account
          </p>
        </div>

        {/* Signup Box */}
        <div className="border border-[#252525] bg-[#111111] p-8 md:p-10">

          <h1 className="text-2xl font-semibold">
            Create Your Account
          </h1>

          <p className="mt-2 text-sm text-[#777777]">
            Sign up to continue shopping.
          </p>

          <form onSubmit={handleSignup} className="mt-8 space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[2px] text-[#A1A1A1]">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full border border-[#333333] bg-[#050505] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#555555] focus:border-[#C6A15B]"
              />
            </div>

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
                placeholder="Create a password"
                required
                className="w-full border border-[#333333] bg-[#050505] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#555555] focus:border-[#C6A15B]"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[2px] text-[#A1A1A1]">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
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

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C6A15B] px-5 py-3.5 text-xs font-bold uppercase tracking-[2px] text-black transition hover:bg-[#D4B875] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <div className="mt-8 border-t border-[#252525] pt-6 text-center">
            <p className="text-sm text-[#777777]">
              Already have an account?
            </p>

            <Link
              href="/login"
              className="mt-2 inline-block text-xs font-semibold uppercase tracking-[2px] text-[#C6A15B] transition hover:text-[#D4B875]"
            >
              Login
            </Link>
          </div>

        </div>

      </div>

    </main>
  );
}