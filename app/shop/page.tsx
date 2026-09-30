import Link from "next/link";

export default async function ShopPage() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  const data = await res.json();
  const products = (data.products || []).slice(0, 15);

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      {/* ================= SHOP HEADER ================= */}
      <section className="border-b border-[#222] px-5 py-10 md:px-10 md:py-12 lg:px-16">

        <div className="mx-auto flex max-w-[1400px] items-end justify-between">

          <div>

            <h1 className="text-3xl font-light uppercase tracking-wide md:text-5xl">
              Shop
            </h1>

          </div>

          <p className="text-[9px] uppercase tracking-[2px] text-white/40">
            {products.length} Products
          </p>

        </div>

      </section>


      {/* ================= PRODUCTS ================= */}
      <section className="px-5 py-10 md:px-10 md:py-12 lg:px-16">

        <div className="mx-auto max-w-[1400px]">

          {products.length === 0 ? (

            <div className="py-20 text-center">

              <p className="text-[9px] uppercase tracking-[4px] text-[#C6A15B]">
                BUY NEXT
              </p>

              <h2 className="mt-4 text-2xl font-light uppercase">
                No Products Available
              </h2>

              <p className="mt-3 text-sm text-white/40">
                New products are coming soon.
              </p>

              <Link
                href="/"
                className="mt-7 inline-flex border border-white/30 px-7 py-3 text-[9px] uppercase tracking-[3px] transition hover:border-[#C6A15B] hover:bg-[#C6A15B] hover:text-black"
              >
                Back To Home
              </Link>

            </div>

          ) : (

            <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-3 md:gap-x-5 md:gap-y-12 lg:grid-cols-4">

              {products.map((product: any) => {

                const onSale =
                  product.isSale === true &&
                  product.salePrice &&
                  product.salePrice < product.price;

                const discountPercent = onSale
                  ? Math.round(
                      ((product.price - product.salePrice) /
                        product.price) *
                        100
                    )
                  : 0;

                return (

                  <Link
                    href={`/product/${product._id}`}
                    key={product._id}
                    className="group"
                  >

                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#111]">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                      />

                      {/* Sale Badge */}
                      {onSale && (
                        <span className="absolute left-3 top-3 bg-[#C6A15B] px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[1px] text-black">
                          {discountPercent}% OFF
                        </span>
                      )}

                      {/* Hover */}
                      <div className="absolute inset-x-0 bottom-0 translate-y-full border-t border-white/10 bg-black/80 px-4 py-3 text-center text-[9px] font-medium uppercase tracking-[3px] text-white backdrop-blur-sm transition duration-300 group-hover:translate-y-0">
                        View Product
                      </div>

                    </div>


                    {/* Product Info */}
                    <div className="pt-4">

                      <p className="text-[8px] uppercase tracking-[3px] text-white/35">
                        {product.category}
                      </p>

                      <h2 className="mt-2 text-xs font-medium uppercase tracking-[1px] text-white/90 md:text-sm">
                        {product.name}
                      </h2>


                      {onSale ? (

                        <div className="mt-2 flex items-center gap-2">

                          <span className="text-xs font-medium text-[#C6A15B]">
                            Rs. {product.salePrice.toLocaleString()}
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


      {/* ================= BOTTOM STATEMENT ================= */}
      <section className="border-t border-[#222] px-5 py-14 md:px-10 md:py-16">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-[9px] uppercase tracking-[5px] text-[#C6A15B]">
            BUY NEXT
          </p>

          <h2 className="mt-4 text-2xl font-light uppercase tracking-wide md:text-4xl">
            Simple. Modern. Yours.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/40">
            Discover pieces designed for your everyday style.
          </p>

        </div>

      </section>

    </main>
  );
}