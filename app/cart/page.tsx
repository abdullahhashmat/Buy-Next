"use client";

import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  /* EMPTY CART */
  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
        <div className="mx-auto flex min-h-[65vh] max-w-2xl flex-col items-center justify-center text-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#2A2A2A] bg-[#111111]">
            <ShoppingBag
              size={38}
              strokeWidth={1.3}
              className="text-[#C6A15B]"
            />
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[5px] text-[#C6A15B]">
            BUY NEXT
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Your Cart is Empty
          </h1>

          <p className="mt-5 max-w-md leading-7 text-[#777777]">
            Looks like you haven't added anything yet.
            Explore our collection and find something you love.
          </p>

          <Link
            href="/shop"
            className="mt-9 inline-flex items-center gap-3 bg-[#C6A15B] px-9 py-4 text-sm font-semibold uppercase tracking-[2px] text-black transition hover:bg-[#D6BA7A]"
          >
            Start Shopping
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* PAGE HEADER */}
      <section className="border-b border-[#202020] bg-[#050505] px-6 py-14 md:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-[#C6A15B]" />

                <p className="text-[10px] font-semibold uppercase tracking-[4px] text-[#C6A15B]">
                  Shopping Bag
                </p>
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Your Cart
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-6 text-[#777777]">
                Review your selected items before placing your order.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start border border-[#292929] bg-[#0D0D0D] px-5 py-3 md:self-auto">
              <ShoppingBag
                size={16}
                strokeWidth={1.4}
                className="text-[#C6A15B]"
              />

              <span className="text-xs text-[#AAAAAA]">
                {totalItems}{" "}
                {totalItems === 1 ? "Item" : "Items"}
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* CART CONTENT */}
      <section className="bg-[#090909] px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

            {/* LEFT — ITEMS */}
            <div>

              <div className="mb-5 flex items-center justify-between border-b border-[#242424] pb-4">

                <p className="text-xs font-semibold uppercase tracking-[3px] text-[#777777]">
                  Your Items
                </p>

                <Link
                  href="/shop"
                  className="flex items-center gap-2 text-xs uppercase tracking-[1px] text-[#777777] transition hover:text-[#C6A15B]"
                >
                  <ArrowLeft size={14} />
                  Continue Shopping
                </Link>

              </div>

              <div className="space-y-3">

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="group border border-[#202020] bg-[#111111] p-4 transition hover:border-[#353535] sm:p-5"
                  >

                    <div className="flex gap-4 sm:gap-6">

                      {/* IMAGE */}
                      <Link
                        href={`/product/${item.id}`}
                        className="relative h-28 w-28 flex-shrink-0 overflow-hidden bg-[#181818] sm:h-36 sm:w-36"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </Link>

                      {/* PRODUCT INFO */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between">

                        <div>

                          <p className="text-[9px] uppercase tracking-[3px] text-[#555555]">
                            {item.name}
                          </p>

                          <h2 className="mt-2 truncate text-base font-medium text-[#EEEEEE] sm:text-lg">
                            {item.name}
                          </h2>

                          <p className="mt-2 text-sm font-semibold text-[#C6A15B]">
                            Rs. {item.price.toLocaleString()}
                          </p>

                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3">

                          {/* QUANTITY */}
                          <div className="flex h-9 items-center border border-[#333333] bg-[#0A0A0A]">

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(item.id)
                              }
                              className="flex h-full w-9 items-center justify-center text-[#888888] transition hover:bg-[#1C1C1C] hover:text-white"
                            >
                              <Minus size={13} />
                            </button>

                            <span className="flex h-full w-10 items-center justify-center border-x border-[#333333] text-xs font-medium">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(item.id)
                              }
                              className="flex h-full w-9 items-center justify-center text-[#888888] transition hover:bg-[#1C1C1C] hover:text-white"
                            >
                              <Plus size={13} />
                            </button>

                          </div>

                          {/* REMOVE */}
                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[1px] text-[#555555] transition hover:text-[#C6A15B]"
                          >
                            <Trash2 size={13} />
                            Remove
                          </button>

                        </div>

                      </div>

                      {/* ITEM TOTAL */}
                      <div className="hidden text-right sm:block">

                        <p className="text-xs uppercase tracking-[1px] text-[#555555]">
                          Total
                        </p>

                        <p className="mt-2 text-sm font-semibold text-white">
                          Rs.{" "}
                          {(
                            item.price * item.quantity
                          ).toLocaleString()}
                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>
            </div>

            {/* RIGHT — SUMMARY */}
            <aside className="h-fit border border-[#292929] bg-[#111111]">

              {/* SUMMARY HEADER */}
              <div className="border-b border-[#252525] px-6 py-6">

                <p className="text-xs font-semibold uppercase tracking-[3px] text-[#C6A15B]">
                  Order Summary
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Your Order
                </h2>

              </div>

              {/* SUMMARY BODY */}
              <div className="px-6 py-6">

                <div className="space-y-5">

                  <div className="flex justify-between text-sm">
                    <span className="text-[#777777]">
                      Items
                    </span>

                    <span>
                      {totalItems}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#777777]">
                      Subtotal
                    </span>

                    <span className="font-medium">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#777777]">
                      Delivery
                    </span>

                    <span className="text-[#999999]">
                      At checkout
                    </span>
                  </div>

                </div>

                <div className="my-6 h-px bg-[#292929]" />

                <div className="flex items-end justify-between">

                  <span className="text-sm font-medium text-[#AAAAAA]">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-[#C6A15B]">
                    Rs. {total.toLocaleString()}
                  </span>

                </div>

                <Link
                  href="/checkout"
                  className="mt-7 block w-full bg-[#C6A15B] py-4 text-center text-xs font-bold uppercase tracking-[2px] text-black transition hover:bg-[#D6BA7A]"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  href="/shop"
                  className="mt-4 block text-center text-xs uppercase tracking-[1px] text-[#666666] transition hover:text-white"
                >
                  Continue Shopping
                </Link>

              </div>

              {/* TRUST */}
              <div className="border-t border-[#252525] px-6 py-5 text-center">

                <p className="text-[10px] uppercase tracking-[2px] text-[#555555]">
                  Simple • Secure • Convenient
                </p>

              </div>

            </aside>

          </div>

        </div>
      </section>

    </main>
  );
}