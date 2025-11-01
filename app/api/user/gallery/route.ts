import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/dbConnect";
import Gallery from "../../../models/Gallery";

export async function GET() {
  try {
    await dbConnect();
    const items = await Gallery.find({ status: true }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(items);
  } catch (error) {
    console.error("Gallery GET error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}
