import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import ProductModel from "@/lib/models/Product";

type Product = {
  _id: string;
  name: string;
  price: number;
  salePrice?: number;
  isSale?: boolean;
  image: string;
  category: string;
};

export default async function Home() {
  let products: Product[] = [];

  /*
   * IMPORTANT:
   * Homepage ab /api/products ko fetch nahi karega.
   * Direct MongoDB se products load honge.
   * Isse Vercel par "Unexpected token '<'" wala issue avoid hoga.
   */

  try {
    await connectDB();

    const dbProducts = await ProductModel.find({})
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
          : undefined,
      isSale: Boolean(product.isSale),
      image: product.image,
      category: product.category,
    }));
  } catch (error) {
    console.error("Products fetch error:", error);
    products = [];
  }

  const menProducts = products
    .filter((product) => product.category === "Men")
    .slice(0, 4);

  const womenProducts = products
    .filter((product) => product.category === "Women")
    .slice(0, 4);

  const getSaleStatus = (product: Product) => {
    const onSale =
      product.isSale === true &&
      typeof product.salePrice === "number" &&
      product.salePrice < product.price;

    const discountPercent = onSale
      ? Math.round(
          ((product.price - product.salePrice!) / product.price) * 100
        )
      : 0;

    return { onSale, discountPercent };
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-[#252525]">

        <img
          src="/images/1.jpg"
          alt="BUY NEXT Ready To Wear"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative z-10 flex min-h-[520px] items-center bg-black/30 px-8 py-24 md:px-16 lg:px-24">
          <div className="max-w-lg text-left">

            <h1 className="text-4xl font-normal uppercase leading-tight text-white md:text-5xl lg:text-6xl">
              Ready To Wear
            </h1>

            <Link
              href="/shop"
              className="mt-6 inline-block border border-white px-7 py-3 text-xs font-medium uppercase tracking-[2px] text-white transition hover:bg-white hover:text-black"
            >
              Shop Now
            </Link>

          </div>
        </div>
      </section>

      {/* ================= MEN ================= */}
      {menProducts.length > 0 && (
        <section className="px-5 py-14 md:px-10 lg:px-16">

          <div className="mx-auto max-w-[1400px]">

            <div className="mb-7 flex items-end justify-between border-b border-[#222] pb-5">

              <div>
                <p className="mb-2 text-[9px] uppercase tracking-[4px] text-[#C6A15B]">
                  Collection 01
                </p>

                <h2 className="text-2xl font-light uppercase tracking-wide md:text-4xl">
                  Men
                </h2>
              </div>

              <Link
                href="/men"
                className="text-[9px] uppercase tracking-[2px] text-white/50 transition hover:text-[#C6A15B]"
              >
                View All →
              </Link>

            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">

              {menProducts.map((product) => {
                const { onSale } = getSaleStatus(product);

                return (
                  <Link
                    href={`/product/${product._id}`}
                    key={product._id}
                    className="group"
                  >

                    <div className="relative aspect-[3/4] overflow-hidden bg-[#111]">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                      />

                      {onSale && (
                        <span className="absolute left-3 top-3 bg-[#C6A15B] px-2.5 py-1.5 text-[8px] font-bold tracking-[1px] text-black">
                          SALE
                        </span>
                      )}

                    </div>

                    <div className="pt-4">

                      <h3 className="text-xs font-medium uppercase tracking-[1px] text-white/90 md:text-sm">
                        {product.name}
                      </h3>

                      {onSale ? (
                        <div className="mt-2 flex items-center gap-2">

                          <span className="text-xs font-medium text-[#C6A15B]">
                            Rs. {product.salePrice!.toLocaleString()}
                          </span>

                          <span className="text-[10px] text-white/35 line-through">
                            Rs. {product.price.toLocaleString()}
                          </span>

                        </div>
                      ) : (
                        <p className="mt-2 text-xs text-white/60">
                          Rs. {product.price.toLocaleString()}
                        </p>
                      )}

                    </div>

                  </Link>
                );
              })}

            </div>
          </div>
        </section>
      )}

      {/* ================= WOMEN ================= */}
      {womenProducts.length > 0 && (
        <section className="border-y border-[#222] bg-[#090909] px-5 py-14 md:px-10 lg:px-16">

          <div className="mx-auto max-w-[1400px]">

            <div className="mb-7 flex items-end justify-between border-b border-[#222] pb-5">

              <div>

                <p className="mb-2 text-[9px] uppercase tracking-[4px] text-[#C6A15B]">
                  Collection 02
                </p>

                <h2 className="text-2xl font-light uppercase tracking-wide md:text-4xl">
                  Women
                </h2>

              </div>

              <Link
                href="/women"
                className="text-[9px] uppercase tracking-[2px] text-white/50 transition hover:text-[#C6A15B]"
              >
                View All →
              </Link>

            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">

              {womenProducts.map((product) => {
                const { onSale } = getSaleStatus(product);

                return (
                  <Link
                    href={`/product/${product._id}`}
                    key={product._id}
                    className="group"
                  >

                    <div className="relative aspect-[3/4] overflow-hidden bg-[#111]">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                      />

                      {onSale && (
                        <span className="absolute left-3 top-3 bg-[#C6A15B] px-2.5 py-1.5 text-[8px] font-bold tracking-[1px] text-black">
                          SALE
                        </span>
                      )}

                    </div>

                    <div className="pt-4">

                      <h3 className="text-xs font-medium uppercase tracking-[1px] text-white/90 md:text-sm">
                        {product.name}
                      </h3>

                      {onSale ? (
                        <div className="mt-2 flex items-center gap-2">

                          <span className="text-xs font-medium text-[#C6A15B]">
                            Rs. {product.salePrice!.toLocaleString()}
                          </span>

                          <span className="text-[10px] text-white/35 line-through">
                            Rs. {product.price.toLocaleString()}
                          </span>

                        </div>
                      ) : (
                        <p className="mt-2 text-xs text-white/60">
                          Rs. {product.price.toLocaleString()}
                        </p>
                      )}

                    </div>

                  </Link>
                );
              })}

            </div>
          </div>
        </section>
      )}

      {/* ================= FEATURED ================= */}
      <section className="px-5 py-14 md:px-10 lg:px-16">

        <div className="mx-auto max-w-[1400px]">

          <div className="mb-7 flex items-end justify-between border-b border-[#222] pb-5">

            <div>

              <p className="mb-2 text-[9px] uppercase tracking-[4px] text-[#C6A15B]">
                Selected Pieces
              </p>

              <h2 className="text-2xl font-light uppercase tracking-wide md:text-4xl">
                Featured
              </h2>

            </div>

            <Link
              href="/shop"
              className="text-[9px] uppercase tracking-[2px] text-white/50 transition hover:text-[#C6A15B]"
            >
              Shop All →
            </Link>

          </div>

          {products.length === 0 ? (
            <p className="py-8 text-sm text-white/40">
              No products available.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">

              {products.slice(0, 4).map((product) => {
                const { onSale, discountPercent } =
                  getSaleStatus(product);

                return (
                  <Link
                    href={`/product/${product._id}`}
                    key={product._id}
                    className="group"
                  >

                    <div className="relative aspect-[3/4] overflow-hidden bg-[#111]">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                      />

                      {onSale && (
                        <span className="absolute left-3 top-3 bg-[#C6A15B] px-2.5 py-1.5 text-[8px] font-bold tracking-[1px] text-black">
                          {discountPercent}% OFF
                        </span>
                      )}

                    </div>

                    <div className="pt-4">

                      <p className="text-[8px] uppercase tracking-[3px] text-white/35">
                        {product.category}
                      </p>

                      <h3 className="mt-2 text-xs font-medium uppercase tracking-[1px] text-white/90 md:text-sm">
                        {product.name}
                      </h3>

                      {onSale ? (
                        <div className="mt-2 flex items-center gap-2">

                          <span className="text-xs font-medium text-[#C6A15B]">
                            Rs. {product.salePrice!.toLocaleString()}
                          </span>

                          <span className="text-[10px] text-white/35 line-through">
                            Rs. {product.price.toLocaleString()}
                          </span>

                        </div>
                      ) : (
                        <p className="mt-2 text-xs text-white/60">
                          Rs. {product.price.toLocaleString()}
                        </p>
                      )}

                    </div>

                  </Link>
                );
              })}

            </div>
          )}

        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="border-t border-[#222] px-5 py-16 md:px-10 md:py-20">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-[9px] uppercase tracking-[5px] text-[#C6A15B]">
            BUY NEXT
          </p>

          <h2 className="mt-5 text-3xl font-light uppercase tracking-[-1px] md:text-5xl">
            Your Style.
            <span className="text-white/40">
              {" "}Your Next Move.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/40">
            Discover our latest collection and find pieces designed for your
            everyday style.
          </p>

          <Link
            href="/shop"
            className="mt-7 inline-flex border border-[#C6A15B] px-8 py-3.5 text-[10px] font-medium uppercase tracking-[3px] text-[#C6A15B] transition duration-300 hover:bg-[#C6A15B] hover:text-black"
          >
            Explore Collection
          </Link>

        </div>
      </section>

    </main>
  );
}