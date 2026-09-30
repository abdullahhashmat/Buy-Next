"use client";

import { FormEvent, useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // =========================
  // CHECK LOGIN
  // =========================

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");

        if (!res.ok) {
          router.replace("/login");
          return;
        }

        const data = await res.json();

        if (
          !data.authenticated ||
          data.user?.role !== "customer"
        ) {
          router.replace("/login");
          return;
        }

        setCheckingAuth(false);
      } catch (error) {
        console.error("AUTH CHECK ERROR:", error);
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  // =========================
  // TOTAL
  // =========================

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // =========================
  // PLACE ORDER
  // =========================

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    if (cart.length === 0) {
      setError("Your cart is empty.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: name.trim(),
          phone: phone.trim(),
          address: address.trim(),

          items: cart.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),

          // IMPORTANT:
          // API expects totalAmount
          totalAmount: total,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.message || "Failed to place order."
        );
        setLoading(false);
        return;
      }

      // Order successfully saved in MongoDB
      clearCart();

      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.error("CHECKOUT ERROR:", error);

      setError(
        "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  };

  // =========================
  // CHECKING AUTH
  // =========================

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-[#F5F5F5]">
        <div className="text-center">

          <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-[#333333] border-t-[#C6A15B]" />

          <p className="text-sm text-[#777777]">
            Checking account...
          </p>

        </div>
      </main>
    );
  }

  // =========================
  // SUCCESS
  // =========================

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-[#F5F5F5]">

        <div className="w-full max-w-lg border border-[#252525] bg-[#111111] p-10 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#C6A15B] text-2xl text-[#C6A15B]">
            ✓
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[4px] text-[#C6A15B]">
            Order Confirmed
          </p>

          <h1 className="mt-3 text-3xl font-semibold">
            Thank You!
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#777777]">
            Your order has been placed successfully.
            Our team will contact you shortly.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block bg-[#C6A15B] px-8 py-3 text-xs font-bold uppercase tracking-[2px] text-black transition hover:bg-[#D4B875]"
          >
            Continue Shopping
          </Link>

        </div>

      </main>
    );
  }

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-[#F5F5F5]">

        <div className="text-center">

          <h1 className="text-3xl font-semibold">
            Your Cart Is Empty
          </h1>

          <p className="mt-3 text-sm text-[#777777]">
            Add some products before checkout.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-block bg-[#C6A15B] px-7 py-3 text-xs font-bold uppercase tracking-[2px] text-black"
          >
            Shop Now
          </Link>

        </div>

      </main>
    );
  }

  // =========================
  // CHECKOUT
  // =========================

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-12 text-[#F5F5F5] md:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-10">

          <p className="text-xs font-semibold uppercase tracking-[4px] text-[#C6A15B]">
            BUY NEXT
          </p>

          <h1 className="mt-3 text-4xl font-semibold">
            Checkout
          </h1>

          <p className="mt-3 text-sm text-[#777777]">
            Complete your details to place your order.
          </p>

        </div>


        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* =========================
              CUSTOMER FORM
          ========================= */}

          <section className="border border-[#252525] bg-[#111111] p-6 md:p-8">

            <h2 className="mb-7 text-xl font-semibold">
              Delivery Information
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}

              <div>

                <label className="mb-2 block text-xs uppercase tracking-[2px] text-[#A1A1A1]">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                  className="w-full border border-[#333333] bg-[#050505] px-4 py-3 text-sm text-white outline-none focus:border-[#C6A15B]"
                />

              </div>


              {/* Phone */}

              <div>

                <label className="mb-2 block text-xs uppercase tracking-[2px] text-[#A1A1A1]">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  required
                  className="w-full border border-[#333333] bg-[#050505] px-4 py-3 text-sm text-white outline-none focus:border-[#C6A15B]"
                />

              </div>


              {/* Address */}

              <div>

                <label className="mb-2 block text-xs uppercase tracking-[2px] text-[#A1A1A1]">
                  Delivery Address
                </label>

                <textarea
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  required
                  rows={5}
                  className="w-full resize-none border border-[#333333] bg-[#050505] px-4 py-3 text-sm text-white outline-none focus:border-[#C6A15B]"
                />

              </div>


              {/* Payment */}

              <div className="border border-[#252525] bg-[#050505] p-5">

                <p className="text-xs uppercase tracking-[2px] text-[#777777]">
                  Payment Method
                </p>

                <p className="mt-2 font-semibold">
                  Cash on Delivery
                </p>

              </div>


              {/* Error */}

              {error && (
                <div className="border border-red-900 bg-red-950/30 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}


              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C6A15B] py-4 text-xs font-bold uppercase tracking-[2px] text-black transition hover:bg-[#D4B875] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

            </form>

          </section>


          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <section className="h-fit border border-[#252525] bg-[#111111] p-6 md:p-7">

            <h2 className="mb-6 text-xl font-semibold">
              Order Summary
            </h2>

            <div className="space-y-5">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="flex gap-4 border-b border-[#252525] pb-5"
                >

                  <div className="h-20 w-16 flex-shrink-0 overflow-hidden bg-[#050505]">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />

                  </div>


                  <div className="min-w-0 flex-1">

                    <h3 className="truncate text-sm font-semibold">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-xs text-[#777777]">
                      Qty: {item.quantity}
                    </p>

                    <p className="mt-2 text-sm text-[#C6A15B]">
                      Rs.{" "}
                      {(
                        item.price * item.quantity
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>

              ))}

            </div>


            <div className="mt-6 border-t border-[#252525] pt-5">

              <div className="flex items-center justify-between">

                <span className="text-sm text-[#777777]">
                  Total
                </span>

                <span className="text-xl font-semibold text-[#C6A15B]">
                  Rs.{" "}
                  {total.toLocaleString()}
                </span>

              </div>

            </div>

          </section>

        </div>

      </div>

    </main>
  );
}