import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/dbConnect";
import Login from "../../../models/Login";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        // ✅ Connect to MongoDB
        await dbConnect();

        // ✅ Parse input


        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        // ✅ Find user
        const user = await Login.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "Admin not found" }, { status: 404 });
        }

        // ✅ Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // ✅ Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: "admin" },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );

        // ✅ Return response
        return NextResponse.json({
            message: "Login successful",
            token,
        });
    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
