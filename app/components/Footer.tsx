"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Admin pages par footer hide rahega
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-[#252525] bg-[#050505] text-[#F5F5F5]">

      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-4">

          {/* BRAND */}

          <div className="md:col-span-2">

            <Link
              href="/"
              className="text-xl font-bold tracking-[4px] transition hover:text-[#C6A15B]"
            >
              BUY NEXT
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#777777]">
              Modern fashion for every style.
              Discover premium clothing designed
              for everyday confidence.
            </p>

          </div>

          {/* QUICK LINKS */}

          <div>

            <h3 className="text-xs font-semibold uppercase tracking-[2px] text-[#C6A15B]">
              Quick Links
            </h3>

            <div className="mt-5 space-y-3">

              <Link
                href="/"
                className="block text-sm text-[#777777] transition hover:text-[#F5F5F5]"
              >
                Home
              </Link>

              <Link
                href="/shop"
                className="block text-sm text-[#777777] transition hover:text-[#F5F5F5]"
              >
                Shop
              </Link>

              <Link
                href="/about"
                className="block text-sm text-[#777777] transition hover:text-[#F5F5F5]"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="block text-sm text-[#777777] transition hover:text-[#F5F5F5]"
              >
                Contact
              </Link>

            </div>

          </div>

          {/* CUSTOMER */}

          <div>

            <h3 className="text-xs font-semibold uppercase tracking-[2px] text-[#C6A15B]">
              Customer
            </h3>

            <div className="mt-5 space-y-3">

              <Link
                href="/signup"
                className="block text-sm text-[#777777] transition hover:text-[#F5F5F5]"
              >
                Account
              </Link>

              <Link
                href="/cart"
                className="block text-sm text-[#777777] transition hover:text-[#F5F5F5]"
              >
                Cart
              </Link>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="mt-12 flex flex-col justify-between gap-5 border-t border-[#252525] pt-6 md:flex-row md:items-center">

          <p className="text-xs text-[#555555]">
            © {new Date().getFullYear()} BUY NEXT. All rights reserved.
          </p>

          <div className="flex gap-5">

            <span className="text-xs text-[#666666]">
              IG
            </span>

            <span className="text-xs text-[#666666]">
              FB
            </span>

          </div>

        </div>

      </div>

    </footer>
  );
}