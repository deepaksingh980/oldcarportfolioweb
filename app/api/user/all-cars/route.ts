import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/dbConnect";
import Car from "../../../models/Car";
import Brand from "../../../models/Brand";

export async function GET() {
    try {
        await dbConnect();

        const [cars, brands] = await Promise.all([
            Car.find().lean(),
            Brand.find().lean(),
        ]);

        // brandId -> brandName mapping
        const brandMap: Record<string, string> = {};
        brands.forEach((b: any) => {
            brandMap[b._id.toString()] = b.name;
        });

        // merge brand name
        const carsWithBrandNames = cars.map((car: any) => {
            const brandId =
                typeof car.brand === "object" && car.brand !== null
                    ? car.brand.toString()
                    : String(car.brand);
            return {
                ...car,
                brand: brandMap[brandId] || "Unknown", // brand field mein name daal diya
            };
        });

        return NextResponse.json(carsWithBrandNames);
    } catch (err: any) {
        console.error("GET /api/user/all-cars error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
