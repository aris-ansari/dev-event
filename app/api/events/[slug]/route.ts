import { NextRequest, NextResponse } from "next/server";

import { Event } from "@/database";
import connectDB from "@/lib/mongodb";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    await connectDB();

    const { slug } = await params;

    if (!slug?.trim()) {
      return NextResponse.json(
        { message: "Event slug is required" },
        { status: 400 },
      );
    }

    const event = await Event.findOne({
      slug: slug.trim(),
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Event fetched successfully",
        event,
      },
      { status: 200 },
    );
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 },
    );
  }
}
