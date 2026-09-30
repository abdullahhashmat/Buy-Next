"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: string;
  stock: number;
};

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState("");

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/products", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.message || "Failed to load products."
        );
        return;
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error(
        "FETCH PRODUCTS ERROR:",
        error
      );

      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // DELETE PRODUCT
  // =========================

  const deleteProduct = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      setDeleting(id);
      setError("");

      const res = await fetch(
        `/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.message ||
            "Failed to delete product."
        );
        return;
      }

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product._id !== id
        )
      );
    } catch (error) {
      console.error(
        "DELETE PRODUCT ERROR:",
        error
      );

      setError("Failed to delete product.");
    } finally {
      setDeleting("");
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-6 py-10 text-[#F5F5F5] md:px-10">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">

            <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-[#333333] border-t-[#C6A15B]" />

            <p className="text-sm text-[#777777]">
              Loading products...
            </p>

          </div>
        </div>
      </main>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-8 text-[#F5F5F5] md:px-8">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-[#252525] pb-7 md:flex-row md:items-end">

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[4px] text-[#C6A15B]">
              BUY NEXT
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              All Products
            </h1>

            <p className="mt-2 text-sm text-[#666666]">
              Manage your store inventory.
            </p>

          </div>

          <div className="flex gap-3">

            <button
              type="button"
              onClick={fetchProducts}
              className="border border-[#333333] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[1.5px] text-[#999999] transition hover:border-[#C6A15B] hover:text-[#C6A15B]"
            >
              Refresh
            </button>

            <Link
              href="/admin/products"
              className="bg-[#C6A15B] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[1.5px] text-black transition hover:bg-[#D4B875]"
            >
              + Add Product
            </Link>

          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 border border-red-900 bg-red-950/30 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* STATS */}

        <div className="mb-8 grid gap-3 sm:grid-cols-3">

          <div className="border border-[#252525] bg-[#0D0D0D] px-5 py-4">
            <p className="text-[10px] uppercase tracking-[1.5px] text-[#666666]">
              Total Products
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {products.length}
            </p>
          </div>

          <div className="border border-[#252525] bg-[#0D0D0D] px-5 py-4">
            <p className="text-[10px] uppercase tracking-[1.5px] text-[#666666]">
              In Stock
            </p>

            <p className="mt-2 text-2xl font-semibold text-green-400">
              {
                products.filter(
                  (product) => product.stock > 0
                ).length
              }
            </p>
          </div>

          <div className="border border-[#252525] bg-[#0D0D0D] px-5 py-4">
            <p className="text-[10px] uppercase tracking-[1.5px] text-[#666666]">
              Out of Stock
            </p>

            <p className="mt-2 text-2xl font-semibold text-red-400">
              {
                products.filter(
                  (product) => product.stock <= 0
                ).length
              }
            </p>
          </div>

        </div>

        {/* PRODUCTS */}

        {products.length === 0 ? (
          <section className="border border-[#252525] bg-[#111111] px-6 py-20 text-center">

            <h2 className="text-xl font-semibold">
              No Products Found
            </h2>

            <p className="mt-2 text-sm text-[#777777]">
              Add your first product to get started.
            </p>

            <Link
              href="/admin/products"
              className="mt-5 inline-block bg-[#C6A15B] px-5 py-3 text-[10px] font-bold uppercase tracking-[1.5px] text-black"
            >
              Add Product
            </Link>

          </section>
        ) : (

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((product) => {

              const inStock = product.stock > 0;

              return (
                <div
                  key={product._id}
                  className="overflow-hidden border border-[#252525] bg-[#0D0D0D] transition duration-200 hover:border-[#444444]"
                >

                  {/* IMAGE */}

                  <div className="relative aspect-[4/5] overflow-hidden bg-[#050505]">

                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-[#555555]">
                        No Image
                      </div>
                    )}

                    {/* CATEGORY */}

                    <span className="absolute left-3 top-3 bg-[#C6A15B] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[1.5px] text-black">
                      {product.category}
                    </span>

                    {/* STOCK */}

                    <span
                      className={`absolute right-3 top-3 bg-black/80 px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[1px] ${
                        inStock
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {inStock
                        ? "In Stock"
                        : "Out of Stock"}
                    </span>

                  </div>

                  {/* INFO */}

                  <div className="p-4">

                    {/* NAME + PRICE */}

                    <div className="flex items-start justify-between gap-2">

                      <h2 className="line-clamp-1 text-sm font-semibold text-[#F5F5F5]">
                        {product.name}
                      </h2>

                      <p className="whitespace-nowrap text-sm font-semibold text-[#C6A15B]">
                        Rs.{" "}
                        {product.price.toLocaleString()}
                      </p>

                    </div>

                    {/* DESCRIPTION */}

                    <p className="mt-2 line-clamp-1 text-xs text-[#666666]">
                      {product.description ||
                        "No description"}
                    </p>

                    {/* STOCK */}

                    <div className="mt-4 flex items-center justify-between border-t border-[#252525] pt-3">

                      <p className="text-[9px] uppercase tracking-[1.5px] text-[#666666]">
                        Stock{" "}
                        <span className="text-[#A1A1A1]">
                          {product.stock}
                        </span>
                      </p>

                      {/* ACTIONS */}

                      <div className="flex gap-2">

                        <Link
                          href={`/admin/products?id=${product._id}`}
                          className="border border-[#333333] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[1px] text-[#999999] transition hover:border-[#C6A15B] hover:text-[#C6A15B]"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            deleteProduct(
                              product._id
                            )
                          }
                          disabled={
                            deleting ===
                            product._id
                          }
                          className="border border-[#3a2020] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[1px] text-red-400 transition hover:bg-red-950/30 disabled:opacity-50"
                        >
                          {deleting ===
                          product._id
                            ? "..."
                            : "Delete"}
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}