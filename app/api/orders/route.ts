import { connectDB } from "@/lib/mongodb";
import Order from "@/lib/models/Order";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      customerName,
      phone,
      address,
      items,
      totalAmount,
    } = body;

    // Basic validation
    if (
      !customerName ||
      !phone ||
      !address ||
      !items ||
      items.length === 0 ||
      !totalAmount
    ) {
      return Response.json(
        {
          success: false,
          message: "All order fields are required",
        },
        { status: 400 }
      );
    }

    // Create order
    const order = await Order.create({
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      items,
      totalAmount: Number(totalAmount),
      status: "Pending",
    });

    return Response.json(
      {
        success: true,
        message: "Order created successfully",
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ORDER CREATE ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create order",
      },
      { status: 500 }
    );
  }
}


// GET - All Orders
export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({
      createdAt: -1,
    });

    return Response.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("ORDERS GET ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}
