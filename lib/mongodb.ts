import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MONGODB ERROR:", error);
    throw error;
  }
}