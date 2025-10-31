import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "../../lib/dbConnect";
import Enquiry from "../../models/Enquiry";
import { verifyToken } from "../../lib/auth";

// 🟩 GET — fetch all enquiries
export async function GET() {
  await dbConnect();
  const enquiries = await Enquiry.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(enquiries);
}

// 🟦 POST — create new enquiry (no token required)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();
    const enquiry = await Enquiry.create(body);
    return NextResponse.json(enquiry, { status: 201 });
  } catch (err) {
    console.error("POST /api/enquiries error:", err);
    return NextResponse.json({ error: "Failed to create enquiry" }, { status: 500 });
  }
}

// 🟧 PUT — update enquiry status (admin only)
export async function PUT(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token || !verifyToken(token))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { _id, status } = body;
    if (!_id || !status)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    await dbConnect();
    const updated = await Enquiry.findByIdAndUpdate(
      _id,
      { status },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/enquiries error:", err);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}

// 🟥 DELETE — delete enquiry (admin only)
export async function DELETE(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token || !verifyToken(token))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { _id } = body;
    if (!_id)
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    await dbConnect();
    await Enquiry.findByIdAndDelete(_id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/enquiries error:", err);
    return NextResponse.json({ error: "Failed to delete enquiry" }, { status: 500 });
  }
}
