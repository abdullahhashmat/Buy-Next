import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export default async function SalePage() {
  await connectDB();

  const products = await Product.find({
    category: "Sale",
  })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5]">

      {/* Products */}
      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xl uppercase tracking-[3px] text-[#C6A15B]">
              Special Offers
            </p>

          
          </div>

          <p className="text-sm text-[#777777]">
            {products.length} Products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="border border-[#252525] bg-[#111111] px-6 py-20 text-center">

            <h3 className="text-xl font-semibold">
              No Sale Products Yet
            </h3>

            <p className="mt-3 text-sm text-[#777777]">
              Sale products will appear here once added.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-block border border-[#C6A15B] px-7 py-3 text-xs font-semibold uppercase tracking-[2px] text-[#C6A15B] transition hover:bg-[#C6A15B] hover:text-black"
            >
              Browse Shop
            </Link>

          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">

            {products.map((product: any) => (
              <Link
                href={`/product/${product._id}`}
                key={product._id.toString()}
                className="group"
              >

                {/* Image */}
                <div className="relative overflow-hidden bg-[#111111]">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Sale Badge */}
                  {product.isSale && product.salePrice && (
                    <span className="absolute left-4 top-4 bg-[#C6A15B] px-3 py-2 text-[10px] font-bold uppercase tracking-[2px] text-black">
                      Sale
                    </span>
                  )}

                </div>

                {/* Product Info */}
                <div className="pt-5">

                  <p className="text-xs uppercase tracking-[2px] text-[#777777]">
                    Sale
                  </p>

                  <h3 className="mt-2 text-sm font-medium">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-2 flex items-center gap-3">

                    {product.isSale && product.salePrice ? (
                      <>
                        {/* Sale Price */}
                        <span className="text-sm font-semibold text-[#C6A15B]">
                          Rs. {product.salePrice.toLocaleString()}
                        </span>

                        {/* Original Price */}
                        <span className="text-xs text-[#777777] line-through">
                          Rs. {product.price.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      /* Normal Price */
                      <span className="text-sm font-semibold text-[#C6A15B]">
                        Rs. {product.price.toLocaleString()}
                      </span>
                    )}

                  </div>

                </div>

              </Link>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}