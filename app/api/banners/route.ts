import { NextResponse } from "next/server";
import { dbConnect } from "../../lib/dbConnect";
import Banner from "../../models/Banner";
import { verifyToken } from "../../lib/auth";

export async function GET() {
  await dbConnect();
  const banners = await Banner.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(banners);
}

export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token))
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    await dbConnect();

    const imageArray = Array.isArray(body.image)
      ? body.image
      : body.image
      ? [body.image]
      : [];

    const banner = await Banner.create({
      title: body.title,
      subtitle: body.subtitle,
      image: imageArray,
      active: body.active ?? true,
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/banners error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token))
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { _id, title, subtitle, active } = body;

    await dbConnect();

    const updated = await Banner.findByIdAndUpdate(
      _id,
      { title, subtitle, active },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT /api/banners error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token))
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    await dbConnect();
    await Banner.findByIdAndDelete(body._id);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("DELETE /api/banners error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
