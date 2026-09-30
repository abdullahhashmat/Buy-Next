"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Minus,
  Plus,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  isSale?: boolean;
  image: string;
  description: string;
  category: string;
  stock: number;
};

export default function ProductDetails({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Check if product is actually on sale
  const onSale =
    product.isSale === true &&
    product.salePrice !== null &&
    product.salePrice !== undefined &&
    product.salePrice < product.price;

  // Current price
  const currentPrice = onSale
    ? product.salePrice!
    : product.price;

  // Automatically calculate discount percentage
  const discountPercent = onSale
    ? Math.round(
        ((product.price - product.salePrice!) / product.price) * 100
      )
    : 0;

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: currentPrice,
        image: product.image,
      });
    }

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">
      <section className="px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-6xl">

          {/* Back */}
          <Link
            href="/shop"
            className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[2px] text-[#777777] transition hover:text-[#C6A15B]"
          >
            <ArrowLeft size={15} />
            Back to Shop
          </Link>

          {/* Product Layout */}
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">

            {/* Product Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] overflow-hidden bg-[#111111]">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[520px] w-full object-cover transition duration-500 hover:scale-[1.02] md:h-[570px]"
                />

                {/* Sale Badge */}
                {onSale && (
                  <div className="absolute left-4 top-4 bg-[#C6A15B] px-4 py-2 text-[10px] font-bold uppercase tracking-[2px] text-black">
                    {discountPercent}% OFF
                  </div>
                )}

                {/* Normal Category Badge */}
                {!onSale && (
                  <div className="absolute left-4 top-4 bg-[#050505]/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[2px] text-[#C6A15B] backdrop-blur-sm">
                    {product.category}
                  </div>
                )}

              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center">

              {/* Small Label */}
              <p className="text-[10px] font-semibold uppercase tracking-[4px] text-[#C6A15B]">
                {product.category}
              </p>

              {/* Product Name */}
              <h1 className="mt-4 max-w-xl text-3xl font-semibold leading-[1.15] tracking-tight md:text-4xl">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-5 flex flex-wrap items-center gap-3">

                {onSale ? (
                  <>
                    {/* Sale Price */}
                    <span className="text-2xl font-semibold text-[#C6A15B]">
                      Rs. {currentPrice.toLocaleString()}
                    </span>

                    {/* Real Price */}
                    <span className="text-base text-[#777777] line-through">
                      Rs. {product.price.toLocaleString()}
                    </span>

                    {/* Discount */}
                    <span className="bg-[#C6A15B] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[1px] text-black">
                      {discountPercent}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-semibold text-[#C6A15B]">
                    Rs. {product.price.toLocaleString()}
                  </span>
                )}

              </div>

              {/* Divider */}
              <div className="my-7 h-px bg-[#252525]" />

              {/* Description */}
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[3px] text-[#777777]">
                  Product Details
                </p>

                <p className="max-w-lg text-sm leading-7 text-[#999999]">
                  {product.description}
                </p>
              </div>

              {/* Stock */}
              <div className="mt-6">
                {product.stock > 0 ? (
                  <p className="text-xs text-[#888888]">
                    <span className="mr-2 text-[#C6A15B]">●</span>
                    {product.stock} items available
                  </p>
                ) : (
                  <p className="text-xs text-[#888888]">
                    Currently out of stock
                  </p>
                )}
              </div>

              {/* Quantity */}
              {product.stock > 0 && (
                <div className="mt-7">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[2px] text-[#777777]">
                    Quantity
                  </p>

                  <div className="flex w-fit items-center border border-[#303030] bg-[#111111]">

                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="flex h-11 w-11 items-center justify-center text-[#999999] transition hover:bg-[#1C1C1C] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Minus size={15} />
                    </button>

                    <span className="flex h-11 w-14 items-center justify-center border-x border-[#303030] text-sm font-medium">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                      className="flex h-11 w-11 items-center justify-center text-[#999999] transition hover:bg-[#1C1C1C] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Plus size={15} />
                    </button>

                  </div>
                </div>
              )}

              {/* Add To Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="mt-7 flex h-14 w-full items-center justify-center gap-3 bg-[#C6A15B] text-xs font-semibold uppercase tracking-[2px] text-black transition hover:bg-[#D4B875] disabled:cursor-not-allowed disabled:bg-[#333333] disabled:text-[#777777]"
              >
                <ShoppingBag size={17} />

                {product.stock === 0
                  ? "Out of Stock"
                  : added
                  ? "Added to Cart ✓"
                  : "Add to Cart"}
              </button>

              {/* View Cart */}
              <Link
                href="/cart"
                className="mt-3 flex h-14 w-full items-center justify-center border border-[#333333] text-xs font-semibold uppercase tracking-[2px] text-[#DDDDDD] transition hover:border-[#C6A15B] hover:text-[#C6A15B]"
              >
                View Cart
              </Link>

              {/* Small Info */}
              <div className="mt-7 grid grid-cols-2 gap-3 border-t border-[#252525] pt-6">

                <div>
                  <p className="text-[9px] uppercase tracking-[2px] text-[#666666]">
                    Category
                  </p>

                  <p className="mt-2 text-xs text-[#BBBBBB]">
                    {product.category}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[2px] text-[#666666]">
                    Availability
                  </p>

                  <p className="mt-2 text-xs text-[#BBBBBB]">
                    {product.stock > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}