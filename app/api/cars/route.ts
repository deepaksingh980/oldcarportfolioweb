import { NextResponse } from "next/server";
import { dbConnect } from "../../lib/dbConnect";
import Car from "../../models/Car";
// import Brand from "../../models/Brand";
import { verifyToken } from "../../lib/auth";

// 🟩 GET — Fetch all cars or one by slug (with pagination)
export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    if (slug) {
      const car = await Car.findOne({ slug }).populate("brand").lean();
      if (!car)
        return NextResponse.json({ message: "Car not found" }, { status: 404 });
      return NextResponse.json(car, { status: 200 });
    }

    const skip = (page - 1) * limit;

    // ✅ Count total cars
    const totalCars = await Car.countDocuments({});

    // ✅ Fetch paginated cars
    const cars = await Car.find({})
      .populate("brand")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // ✅ Return paginated response
    return NextResponse.json(
      {
        cars,
        pagination: {
          total: totalCars,
          page,
          limit,
          totalPages: Math.ceil(totalCars / limit),
          hasNextPage: page * limit < totalCars,
          hasPrevPage: page > 1,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ GET /api/cars error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}


// 🟨 POST — Create new car (Protected)
export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token))
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    await dbConnect();

    const slug =
      body.slug ||
      body.name?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") ||
      `car-${Date.now()}`;

    const images = Array.isArray(body.images)
      ? body.images
      : body.images
        ? [body.images]
        : [];

    const car = await Car.create({
      slug,
      name: body.name,
      brand: body.brand,
      color: body.color,
      year: body.year,
      category: body.category,
      ownerType: body.ownerType,
      actualPrice: body.actualPrice,
      discountedPrice: body.discountedPrice,
      status: body.status ?? "Available",
      description: body.description,
      images,
      specs: body.specs || {},
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/cars error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// 🟦 PUT — Update car (Protected)
export async function PUT(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token))
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id)
      return NextResponse.json({ error: "Missing car ID" }, { status: 400 });

    await dbConnect();

    // 🧠 Keep slug consistent with name (optional)
    if (updateData.name) {
      updateData.slug =
        updateData.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "") || updateData.slug;
    }

    const updated = await Car.findByIdAndUpdate(_id, updateData, { new: true });

    if (!updated)
      return NextResponse.json({ error: "Car not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT /api/cars error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🟥 DELETE — Delete car (Protected)
export async function DELETE(req: Request) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token || !verifyToken(token))
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { _id } = body;

    if (!_id)
      return NextResponse.json({ error: "Missing car ID" }, { status: 400 });

    await dbConnect();
    const deleted = await Car.findByIdAndDelete(_id);

    if (!deleted)
      return NextResponse.json({ error: "Car not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE /api/cars error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
