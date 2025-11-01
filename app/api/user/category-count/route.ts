import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/dbConnect";
import Car from "../../../models/Car";

export async function GET() {
  try {
    await dbConnect();

    const counts = await Car.aggregate([
      { $group: { _id: "$category", total: { $sum: 1 } } },
      { $project: { _id: 0, category: "$_id", total: 1 } },
    ]);

    return NextResponse.json({ counts }, { status: 200 });
  } catch (error: any) {
    console.error("❌ GET /api/user/category-count error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
