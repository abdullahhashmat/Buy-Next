import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import ProductDetails from "./ProductDetails";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    await connectDB();

    const product = await Product.findById(id).lean();

    if (!product) {
      return (
        <main className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              Product Not Found
            </h1>

            <Link
              href="/shop"
              className="mt-5 inline-block underline"
            >
              Back to Shop
            </Link>
          </div>
        </main>
      );
    }

    const productData = {
      id: product._id.toString(),
      name: product.name,
      price: product.price,

      // Sale information
      salePrice: product.salePrice ?? null,
      isSale: product.isSale ?? false,

      image: product.image,
      description: product.description,
      category: product.category,
      stock: product.stock,
    };

    return <ProductDetails product={productData} />;
  } catch (error) {
    console.error("PRODUCT DETAIL ERROR:", error);

    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Something went wrong
          </h1>

          <Link
            href="/shop"
            className="mt-5 inline-block underline"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }
}