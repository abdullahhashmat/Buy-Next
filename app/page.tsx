import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";

type ProductType = {
  _id: string;
  name: string;
  price: number;
  salePrice: number | null;
  isSale: boolean;
  image: string;
  category: string;
};

export default async function Home() {
  let products: ProductType[] = [];

  try {
    await connectDB();

    const dbProducts = await Product.find({})
      .sort({ createdAt: -1 })
      .lean();

    products = dbProducts.map((product: any) => ({
      _id: product._id.toString(),
      name: product.name,
      price: Number(product.price),
      salePrice:
        product.salePrice !== null &&
        product.salePrice !== undefined
          ? Number(product.salePrice)
          : null,
      isSale: Boolean(product.isSale),
      image: product.image,
      category: product.category,
    }));
  } catch (error) {
    console.error("HOME PRODUCTS ERROR:", error);
    products = [];
  }

  const menProducts = products
    .filter((product) => product.category === "Men")
    .slice(0, 4);

  const womenProducts = products
    .filter((product) => product.category === "Women")
    .slice(0, 4);

  const featuredProducts = products.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#C6A15B]/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#C6A15B18,transparent_40%)]" />

        <div className="relative mx-auto flex min-h-[600px] max-w-7xl items-center px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.35em] text-[#C6A15B]">
              Premium Fashion
            </p>

            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Style That
              <span className="block text-[#C6A15B]">
                Speaks For You.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
              Discover premium fashion designed for modern lifestyles.
              Shop our latest collection and upgrade your everyday style.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="rounded-md bg-[#C6A15B] px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-[#d4b46d]"
              >
                Shop Now
              </Link>

              <Link
                href="/products?category=Sale"
                className="rounded-md border border-[#C6A15B]/50 px-7 py-3.5 text-sm font-semibold text-[#C6A15B] transition hover:bg-[#C6A15B]/10"
              >
                View Sale
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[#C6A15B]">
              Latest Collection
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Featured Products
            </h2>
          </div>

          <Link
            href="/products"
            className="hidden text-sm font-medium text-[#C6A15B] hover:underline sm:block"
          >
            View All →
          </Link>
        </div>

        {featuredProducts.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <p className="text-gray-400">
              Products will appear here soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => {
              const discount =
                product.isSale &&
                product.salePrice &&
                product.price > product.salePrice
                  ? Math.round(
                      ((product.price - product.salePrice) /
                        product.price) *
                        100
                    )
                  : 0;

              return (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-[#C6A15B]/40"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-600">
                        No Image
                      </div>
                    )}

                    {product.isSale && discount > 0 && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#C6A15B] px-3 py-1 text-xs font-bold text-black">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <p className="mb-1 text-xs uppercase tracking-wider text-gray-500">
                      {product.category}
                    </p>

                    <h3 className="truncate text-base font-semibold">
                      {product.name}
                    </h3>

                    <div className="mt-3 flex items-center gap-2">
                      {product.isSale &&
                      product.salePrice &&
                      product.salePrice < product.price ? (
                        <>
                          <span className="font-bold text-[#C6A15B]">
                            Rs.{" "}
                            {product.salePrice.toLocaleString()}
                          </span>

                          <span className="text-sm text-gray-500 line-through">
                            Rs. {product.price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="font-bold text-[#C6A15B]">
                          Rs. {product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* MEN */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[#C6A15B]">
                For Him
              </p>

              <h2 className="text-3xl font-bold sm:text-4xl">
                Men&apos;s Collection
              </h2>
            </div>

            <Link
              href="/products?category=Men"
              className="hidden text-sm font-medium text-[#C6A15B] hover:underline sm:block"
            >
              View All →
            </Link>
          </div>

          {menProducts.length === 0 ? (
            <p className="text-gray-500">
              No men&apos;s products available.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {menProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WOMEN */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[#C6A15B]">
              For Her
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Women&apos;s Collection
            </h2>
          </div>

          <Link
            href="/products?category=Women"
            className="hidden text-sm font-medium text-[#C6A15B] hover:underline sm:block"
          >
            View All →
          </Link>
        </div>

        {womenProducts.length === 0 ? (
          <p className="text-gray-500">
            No women&apos;s products available.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {womenProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="border-t border-[#C6A15B]/20 bg-[#C6A15B]/5">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#C6A15B]">
            BUY NEXT
          </p>

          <h2 className="text-4xl font-bold sm:text-5xl">
            Upgrade Your Style
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            Explore our latest collection and find pieces made for
            your everyday style.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-block rounded-md bg-[#C6A15B] px-8 py-4 font-semibold text-black transition hover:bg-[#d4b46d]"
          >
            Explore Collection
          </Link>
        </div>
      </section>
    </main>
  );
}

function ProductCard({
  product,
}: {
  product: ProductType;
}) {
  const discount =
    product.isSale &&
    product.salePrice &&
    product.price > product.salePrice
      ? Math.round(
          ((product.price - product.salePrice) /
            product.price) *
            100
        )
      : 0;

  return (
    <Link
      href={`/products/${product._id}`}
      className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-[#C6A15B]/40"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-600">
            No Image
          </div>
        )}

        {product.isSale && discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-[#C6A15B] px-3 py-1 text-xs font-bold text-black">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="mb-1 text-xs uppercase tracking-wider text-gray-500">
          {product.category}
        </p>

        <h3 className="truncate text-base font-semibold">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center gap-2">
          {product.isSale &&
          product.salePrice &&
          product.salePrice < product.price ? (
            <>
              <span className="font-bold text-[#C6A15B]">
                Rs. {product.salePrice.toLocaleString()}
              </span>

              <span className="text-sm text-gray-500 line-through">
                Rs. {product.price.toLocaleString()}
              </span>
            </>
          ) : (
            <span className="font-bold text-[#C6A15B]">
              Rs. {product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}