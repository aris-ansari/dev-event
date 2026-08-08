import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();

    return Response.json({
      database: mongoose.connection.name,
      environment: process.env.VERCEL_ENV ?? "local",
    });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Database connection failed",
        environment: process.env.VERCEL_ENV ?? "local",
      },
      { status: 500 },
    );
  }
}
