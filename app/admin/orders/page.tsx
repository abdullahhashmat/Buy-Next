"use client";

import { useEffect, useState } from "react";

type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  _id: string;
  customerName: string;
  phone: string;
  address: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
};

const statuses = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState("");
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/orders", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.message || "Failed to load orders."
        );
        return;
      }

      const activeOrders = (
        data.orders || []
      ).filter(
        (order: Order) =>
          order.status !== "Cancelled"
      );

      setOrders(activeOrders);
    } catch (error) {
      console.error(
        "FETCH ORDERS ERROR:",
        error
      );

      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (
    orderId: string,
    status: string
  ) => {
    try {
      setUpdating(orderId);
      setError("");

      const res = await fetch(
        `/api/orders/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.message ||
            "Failed to update order."
        );
        return;
      }

      if (status === "Cancelled") {
        setOrders((currentOrders) =>
          currentOrders.filter(
            (order) =>
              order._id !== orderId
          )
        );

        return;
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status,
              }
            : order
        )
      );
    } catch (error) {
      console.error(
        "UPDATE ORDER ERROR:",
        error
      );

      setError(
        "Failed to update order."
      );
    } finally {
      setUpdating("");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] px-6 py-10 text-[#F5F5F5]">

        <div className="flex min-h-[70vh] items-center justify-center">

          <div className="text-center">

            <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-[#333333] border-t-[#C6A15B]" />

            <p className="text-sm text-[#777777]">
              Loading orders...
            </p>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-10 text-[#F5F5F5] md:px-10">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[4px] text-[#C6A15B]">
              BUY NEXT
            </p>

            <h1 className="mt-3 text-4xl font-semibold">
              Orders
            </h1>

            <p className="mt-3 text-sm text-[#777777]">
              Manage customer orders.
            </p>

          </div>

          <button
            type="button"
            onClick={fetchOrders}
            className="border border-[#333333] px-5 py-3 text-xs font-bold uppercase tracking-[2px] transition hover:border-[#C6A15B] hover:text-[#C6A15B]"
          >
            Refresh
          </button>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 border border-red-900 bg-red-950/30 px-5 py-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* STATS */}

        <div className="mb-8 grid gap-4 sm:grid-cols-3">

          <div className="border border-[#252525] bg-[#111111] p-6">

            <p className="text-xs uppercase tracking-[2px] text-[#666666]">
              Active Orders
            </p>

            <p className="mt-3 text-3xl font-semibold">
              {orders.length}
            </p>

          </div>

          <div className="border border-[#252525] bg-[#111111] p-6">

            <p className="text-xs uppercase tracking-[2px] text-[#666666]">
              Pending
            </p>

            <p className="mt-3 text-3xl font-semibold text-[#C6A15B]">
              {
                orders.filter(
                  (order) =>
                    order.status === "Pending"
                ).length
              }
            </p>

          </div>

          <div className="border border-[#252525] bg-[#111111] p-6">

            <p className="text-xs uppercase tracking-[2px] text-[#666666]">
              Processing
            </p>

            <p className="mt-3 text-3xl font-semibold">
              {
                orders.filter(
                  (order) =>
                    order.status ===
                    "Processing"
                ).length
              }
            </p>

          </div>

        </div>

        {/* NO ORDERS */}

        {orders.length === 0 ? (

          <section className="border border-[#252525] bg-[#111111] px-6 py-20 text-center">

            <h2 className="text-2xl font-semibold">
              No Active Orders
            </h2>

            <p className="mt-3 text-sm text-[#777777]">
              New customer orders will appear here.
            </p>

          </section>

        ) : (

          <section className="overflow-hidden border border-[#252525] bg-[#111111]">

            {/* DESKTOP TABLE */}

            <div className="hidden overflow-x-auto md:block">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-[#252525] text-left">

                    <th className="px-6 py-5 text-xs font-semibold uppercase tracking-[2px] text-[#666666]">
                      Order
                    </th>

                    <th className="px-6 py-5 text-xs font-semibold uppercase tracking-[2px] text-[#666666]">
                      Customer
                    </th>

                    <th className="px-6 py-5 text-xs font-semibold uppercase tracking-[2px] text-[#666666]">
                      Product
                    </th>

                    <th className="px-6 py-5 text-xs font-semibold uppercase tracking-[2px] text-[#666666]">
                      Total
                    </th>

                    <th className="px-6 py-5 text-xs font-semibold uppercase tracking-[2px] text-[#666666]">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {orders.map((order) => {

                    const firstItem =
                      order.items[0];

                    return (
                      <tr
                        key={order._id}
                        className="border-b border-[#252525] last:border-0"
                      >

                        {/* ORDER */}

                        <td className="px-6 py-5">

                          <p className="max-w-[150px] truncate text-sm font-semibold text-[#C6A15B]">
                            #{order._id.slice(-8)}
                          </p>

                          <p className="mt-1 text-xs text-[#666666]">
                            {new Date(
                              order.createdAt
                            ).toLocaleDateString()}
                          </p>

                        </td>

                        {/* CUSTOMER */}

                        <td className="px-6 py-5">

                          <p className="text-sm font-semibold">
                            {order.customerName}
                          </p>

                          <p className="mt-1 text-xs text-[#777777]">
                            {order.phone}
                          </p>

                        </td>

                        {/* PRODUCT */}

                        <td className="px-6 py-5">

                          {firstItem ? (

                            <div className="flex items-center gap-3">

                              <div className="h-14 w-11 flex-shrink-0 overflow-hidden bg-[#050505]">

                                {firstItem.image ? (

                                  <img
                                    src={
                                      firstItem.image
                                    }
                                    alt={
                                      firstItem.name
                                    }
                                    className="h-full w-full object-cover"
                                  />

                                ) : (

                                  <div className="flex h-full items-center justify-center text-[9px] text-[#555555]">
                                    No Image
                                  </div>

                                )}

                              </div>

                              <div>

                                <p className="max-w-[180px] truncate text-sm font-semibold">
                                  {firstItem.name}
                                </p>

                                <p className="mt-1 text-xs text-[#777777]">
                                  Qty:{" "}
                                  {
                                    firstItem.quantity
                                  }
                                </p>

                              </div>

                            </div>

                          ) : (

                            <span className="text-sm text-[#777777]">
                              No products
                            </span>

                          )}

                          {order.items.length > 1 && (

                            <p className="mt-2 text-xs text-[#666666]">
                              +
                              {order.items.length - 1}{" "}
                              more product
                            </p>

                          )}

                        </td>

                        {/* TOTAL */}

                        <td className="px-6 py-5">

                          <span className="text-sm font-semibold text-[#C6A15B]">
                            Rs.{" "}
                            {order.totalAmount.toLocaleString()}
                          </span>

                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-5">

                          <select
                            value={order.status}
                            disabled={
                              updating ===
                              order._id
                            }
                            onChange={(e) =>
                              updateStatus(
                                order._id,
                                e.target.value
                              )
                            }
                            className="border border-[#333333] bg-[#050505] px-3 py-2 text-xs text-white outline-none focus:border-[#C6A15B] disabled:opacity-50"
                          >

                            {statuses.map(
                              (status) => (

                                <option
                                  key={status}
                                  value={status}
                                >
                                  {status}
                                </option>

                              )
                            )}

                          </select>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>


            {/* MOBILE */}

            <div className="divide-y divide-[#252525] md:hidden">

              {orders.map((order) => {

                const firstItem =
                  order.items[0];

                return (

                  <div
                    key={order._id}
                    className="p-5"
                  >

                    <div className="flex gap-4">

                      {firstItem && (

                        <div className="h-24 w-20 flex-shrink-0 overflow-hidden bg-[#050505]">

                          {firstItem.image ? (

                            <img
                              src={
                                firstItem.image
                              }
                              alt={
                                firstItem.name
                              }
                              className="h-full w-full object-cover"
                            />

                          ) : (

                            <div className="flex h-full items-center justify-center text-[10px] text-[#555555]">
                              No Image
                            </div>

                          )}

                        </div>

                      )}

                      <div className="min-w-0 flex-1">

                        <p className="text-xs text-[#C6A15B]">
                          #{order._id.slice(-8)}
                        </p>

                        <h3 className="mt-2 font-semibold">
                          {order.customerName}
                        </h3>

                        <p className="mt-1 text-xs text-[#777777]">
                          {order.phone}
                        </p>

                        {firstItem && (

                          <p className="mt-3 text-sm">
                            {firstItem.name}
                          </p>

                        )}

                        {firstItem && (

                          <p className="mt-1 text-xs text-[#777777]">
                            Qty:{" "}
                            {firstItem.quantity}
                          </p>

                        )}

                      </div>

                    </div>


                    <div className="mt-5 flex items-center justify-between">

                      <div>

                        <p className="text-xs text-[#666666]">
                          Total
                        </p>

                        <p className="mt-1 font-semibold text-[#C6A15B]">
                          Rs.{" "}
                          {order.totalAmount.toLocaleString()}
                        </p>

                      </div>


                      <select
                        value={order.status}
                        disabled={
                          updating ===
                          order._id
                        }
                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }
                        className="border border-[#333333] bg-[#050505] px-3 py-2 text-xs text-white outline-none focus:border-[#C6A15B]"
                      >

                        {statuses.map(
                          (status) => (

                            <option
                              key={status}
                              value={status}
                            >
                              {status}
                            </option>

                          )
                        )}

                      </select>

                    </div>

                  </div>

                );
              })}

            </div>

          </section>

        )}

      </div>

    </main>
  );
}