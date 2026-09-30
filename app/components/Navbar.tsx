"use client";

import Link from "next/link";
import { ShoppingBag, Search, User, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart();

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Admin pages par customer navbar hide rahega
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    router.push(`/shop?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setSearch("");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#252525] bg-[#050505] text-[#F5F5F5]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <Link
          href="/"
          className="text-xl font-bold tracking-[4px] transition hover:text-[#C6A15B]"
        >
          BUY NEXT
        </Link>

        {/* NAVIGATION */}
        <nav className="hidden items-center gap-10 md:flex">

          <Link
            href="/men"
            className="text-xs font-semibold uppercase tracking-[2px] text-[#999999] transition hover:text-[#C6A15B]"
          >
            Men
          </Link>

          <Link
            href="/women"
            className="text-xs font-semibold uppercase tracking-[2px] text-[#999999] transition hover:text-[#C6A15B]"
          >
            Women
          </Link>

          <Link
            href="/girls"
            className="text-xs font-semibold uppercase tracking-[2px] text-[#999999] transition hover:text-[#C6A15B]"
          >
            Girls
          </Link>

          <Link
            href="/sale"
            className="text-xs font-semibold uppercase tracking-[2px] text-[#C6A15B] transition hover:text-[#D4B875]"
          >
            Sale
          </Link>

        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">

          {/* SEARCH */}
          {searchOpen ? (
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2"
            >
              <div className="flex items-center border border-[#333333] bg-[#111111]">
                <Search
                  size={16}
                  strokeWidth={1.8}
                  className="ml-3 text-[#777777]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                  placeholder="Search products..."
                  className="w-40 bg-transparent px-3 py-2 text-xs text-white outline-none placeholder:text-[#555555] sm:w-52"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearch("");
                }}
                aria-label="Close Search"
                className="text-[#999999] transition hover:text-[#C6A15B]"
              >
                <X size={18} />
              </button>
            </form>
          ) : (
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="text-[#999999] transition hover:text-[#C6A15B]"
            >
              <Search
                size={19}
                strokeWidth={1.8}
              />
            </button>
          )}

          {/* ACCOUNT */}
          <Link
            href="/signup"
            aria-label="Account"
            className="text-[#999999] transition hover:text-[#C6A15B]"
          >
            <User
              size={19}
              strokeWidth={1.8}
            />
          </Link>

          {/* CART */}
          <Link
            href="/cart"
            aria-label="Shopping Bag"
            className="relative text-[#999999] transition hover:text-[#C6A15B]"
          >
            <ShoppingBag
              size={20}
              strokeWidth={1.8}
            />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C6A15B] px-1 text-[9px] font-bold text-black">
                {cartCount}
              </span>
            )}

          </Link>

        </div>

      </div>
    </header>
  );
}