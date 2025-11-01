import { NextResponse } from "next/server";
import { dbConnect } from "../../lib/dbConnect";
import Car from "../../models/Car";
export const dynamic = "force-dynamic";
// 🟩 GET — fetch all enquiries
export async function GET() {
    try {
        await dbConnect();
        const cars = await Car.find().lean();
        return NextResponse.json(cars);
    } catch (error: any) {
        console.error("GET /api/carlength error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}