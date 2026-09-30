import { connectDB } from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const order = await Order.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true }
    );

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("ORDER STATUS UPDATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update order status",
      },
      { status: 500 }
    );
  }
}