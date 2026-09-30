import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAuthToken } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = await verifyAuthToken(token);

  if (!payload || payload.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5]">

      <div className="flex min-h-screen">

        {/* =========================
            SIDEBAR
        ========================= */}

        <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-[#252525] bg-[#0B0B0B]">

          {/* LOGO */}

          <div className="border-b border-[#252525] px-6 py-7">
            <Link
              href="/admin/products"
              className="text-lg font-bold tracking-[4px] text-[#F5F5F5] transition hover:text-[#C6A15B]"
            >
              BUY NEXT
            </Link>

            <p className="mt-2 text-[10px] uppercase tracking-[3px] text-[#666666]">
              Admin Panel
            </p>
          </div>

          {/* NAVIGATION */}

          <nav className="flex-1 space-y-2 px-4 py-6">

            <Link
              href="/admin/products"
              className="block border border-[#252525] px-4 py-3 text-xs font-semibold uppercase tracking-[1.5px] text-[#A1A1A1] transition hover:border-[#C6A15B] hover:bg-[#111111] hover:text-[#C6A15B]"
            >
              + Add Product
            </Link>

            <Link
              href="/admin/orders"
              className="block px-4 py-3 text-xs font-semibold uppercase tracking-[1.5px] text-[#A1A1A1] transition hover:bg-[#111111] hover:text-[#C6A15B]"
            >
              Orders
            </Link>

            <Link
              href="/admin/all-products"
              className="block px-4 py-3 text-xs font-semibold uppercase tracking-[1.5px] text-[#A1A1A1] transition hover:bg-[#111111] hover:text-[#C6A15B]"
            >
              All Products
            </Link>

            <Link
              href="/"
              className="block px-4 py-3 text-xs font-semibold uppercase tracking-[1.5px] text-[#666666] transition hover:bg-[#111111] hover:text-[#C6A15B]"
            >
              View Store
            </Link>

          </nav>

          {/* LOGOUT */}

          <div className="border-t border-[#252525] p-4">

            <form
              action="/api/auth/logout"
              method="POST"
            >
              <button
                type="submit"
                className="w-full border border-[#333333] px-4 py-3 text-xs font-semibold uppercase tracking-[1.5px] text-[#777777] transition hover:border-red-900 hover:text-red-400"
              >
                Logout
              </button>
            </form>

          </div>

        </aside>

        {/* =========================
            MAIN CONTENT
        ========================= */}

        <main className="ml-64 min-h-screen flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}