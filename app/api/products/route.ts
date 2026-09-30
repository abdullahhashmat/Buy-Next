import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({
      createdAt: -1,
    });

    return Response.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("PRODUCTS GET ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      price,
      salePrice,
      isSale,
      image,
      description,
      category,
      stock,
    } = body;

    // Basic validation
    if (
      !name ||
      !price ||
      !image ||
      !description ||
      !category
    ) {
      return Response.json(
        {
          success: false,
          message: "All required fields are missing",
        },
        { status: 400 }
      );
    }

    // Sale product validation
    if (isSale === true) {
      if (!salePrice || Number(salePrice) <= 0) {
        return Response.json(
          {
            success: false,
            message: "Sale price is required",
          },
          { status: 400 }
        );
      }

      if (Number(salePrice) >= Number(price)) {
        return Response.json(
          {
            success: false,
            message:
              "Sale price must be less than original price",
          },
          { status: 400 }
        );
      }
    }

    const product = await Product.create({
      name: name.trim(),
      price: Number(price),
      salePrice:
        isSale === true ? Number(salePrice) : null,
      isSale: isSale === true,
      image,
      description: description.trim(),
      category,
      stock: Number(stock) || 0,
    });

    return Response.json(
      {
        success: true,
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("PRODUCT CREATE ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create product",
      },
      { status: 500 }
    );
  }
}