import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/dbConnect";
import Banner from "../../../models/Banner";

// ✅ Get the latest active banner (Public/User side)
export async function GET() {
    try {
        await dbConnect();

        const banner = await Banner.findOne({ active: true })
            .sort({ createdAt: -1 })
            .lean();

        if (!banner) {
            return NextResponse.json({ message: "No active banner found" }, { status: 404 });
        }

        return NextResponse.json(banner);
    } catch (error: any) {
        console.error("GET /api/active-banner error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
