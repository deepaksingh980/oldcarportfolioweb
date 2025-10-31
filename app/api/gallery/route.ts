import { NextResponse } from "next/server";
import { dbConnect } from "../../lib/dbConnect";
import Gallery from "../../models/Gallery";
import { verifyToken } from "../../lib/auth";

// ✅ GET all gallery items
export async function GET() {
  await dbConnect();
  const items = await Gallery.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(items);
}

// ✅ POST create new gallery item
export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token))
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    await dbConnect();

    // Ensure image is always an array
    const imageArray = Array.isArray(body.image)
      ? body.image
      : body.image
      ? [body.image]
      : [];

    const gallery = await Gallery.create({
      title: body.title,
      caption: body.caption,
      image: imageArray,
      status: body.status ?? true,
    });

    return NextResponse.json(gallery, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ PUT update gallery item
export async function PUT(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token))
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { _id, title, caption, status, image } = body;

    await dbConnect();

    const imageArray = Array.isArray(image)
      ? image
      : image
      ? [image]
      : [];

    const updated = await Gallery.findByIdAndUpdate(
      _id,
      { title, caption, status, image: imageArray },
      { new: true }
    );

    if (!updated)
      return NextResponse.json({ error: "Gallery not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT /api/gallery error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ DELETE gallery item
export async function DELETE(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token))
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    await dbConnect();

    await Gallery.findByIdAndDelete(body._id);
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("DELETE /api/gallery error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
