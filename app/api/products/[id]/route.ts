import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { NextResponse } from "next/server";

// GET - Single Product
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("PRODUCT GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product",
      },
      { status: 500 }
    );
  }
}

// PUT - Update Product
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
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
      return NextResponse.json(
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
        return NextResponse.json(
          {
            success: false,
            message: "Sale price is required",
          },
          { status: 400 }
        );
      }

      if (Number(salePrice) >= Number(price)) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Sale price must be less than original price",
          },
          { status: 400 }
        );
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        price: Number(price),
        salePrice:
          isSale === true ? Number(salePrice) : null,
        isSale: isSale === true,
        image,
        description: description.trim(),
        category,
        stock: Number(stock) || 0,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("PRODUCT UPDATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update product",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete Product
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("PRODUCT DELETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete product",
      },
      { status: 500 }
    );
  }
}