import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "../../lib/dbConnect";
import Car from "../../models/Car";

// 🟩 GET — fetch all enquiries
export async function GET() {
    await dbConnect();
    const cars = await Car.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(cars);
}
