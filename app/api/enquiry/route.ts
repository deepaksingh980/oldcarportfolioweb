import { NextResponse } from "next/server";
import { dbConnect } from "../../lib/dbConnect";
import Enquiry from "../../models/Enquiry";
import { sendEmail } from "../../lib/mailer";

// ✅ CREATE (POST)
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, email, phone, message, carName } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save enquiry in DB
    const newEnquiry = await Enquiry.create({
      name,
      email,
      phone,
      message,
      carName,
      status: "Pending",
    });

    // -------------------------------
    // ✉️ Email Templates (Beautiful UI)
    // -------------------------------

    // 🟢 Email to Admin
    const adminEmailHTML = `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #f8f9fb; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #1f2937, #111827); padding: 20px; color: white; text-align: center;">
            <h2 style="margin: 0;">🚗 New Enquiry Received</h2>
            <p style="margin: 5px 0 0;">Old Car Portfolio Admin Notification</p>
          </div>
          <div style="padding: 25px; color: #333;">
            <p>Dear Admin,</p>
            <p>You’ve received a new enquiry from the website. Here are the details:</p>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 15px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || "N/A"}</p>
              ${
                carName
                  ? `<p><strong>Car of Interest:</strong> ${carName}</p>`
                  : ""
              }
              <p><strong>Message:</strong><br/>${message}</p>
            </div>
            <p style="margin-top: 20px;">📋 Check the admin dashboard for full details.</p>
          </div>
          <div style="background: #111827; color: #ccc; text-align: center; padding: 15px; font-size: 12px;">
            © ${new Date().getFullYear()} Old Car Portfolio. All rights reserved.
          </div>
        </div>
      </div>
    `;

    // 🟡 Email to Customer
    const customerEmailHTML = `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9fafb; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #c19a6b, #8b6a3f); padding: 20px; color: white; text-align: center;">
            <h2 style="margin: 0;">Thank You for Reaching Out!</h2>
            <p style="margin: 5px 0 0;">Old Car Portfolio</p>
          </div>
          <div style="padding: 25px; color: #333;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>We appreciate you contacting us. Our team has received your enquiry and will get back to you soon.</p>
            ${
              carName
                ? `<p>We’ve noted your interest in: <strong>${carName}</strong>.</p>`
                : ""
            }
            <p>Here’s a copy of your message:</p>
            <blockquote style="border-left: 4px solid #c19a6b; margin: 15px 0; padding-left: 10px; color: #555; font-style: italic;">
              ${message}
            </blockquote>
            <p>If you have any urgent queries, feel free to reply to this email.</p>
            <p style="margin-top: 20px;">Best Regards,<br/><strong>Old Car Portfolio Team</strong></p>
          </div>
          <div style="background: #f3f4f6; color: #555; text-align: center; padding: 15px; font-size: 12px;">
            <p>Follow us on 
              <a href="https://instagram.com" style="color:#c19a6b; text-decoration:none;">Instagram</a> | 
              <a href="https://facebook.com" style="color:#c19a6b; text-decoration:none;">Facebook</a>
            </p>
            <p>© ${new Date().getFullYear()} Old Car Portfolio</p>
          </div>
        </div>
      </div>
    `;

    // -------------------------------
    // 📨 Send Emails (Admin + Customer)
    // -------------------------------
    await Promise.all([
      sendEmail({
        to: process.env.ADMIN_EMAIL!,
        subject: "🚗 New Enquiry Received - Old Car Portfolio",
        html: adminEmailHTML,
      }),
      sendEmail({
        to: email,
        subject: "✅ Thanks for contacting Old Car Portfolio!",
        html: customerEmailHTML,
      }),
    ]);

    // -------------------------------
    // ✅ Final Response
    // -------------------------------
    return NextResponse.json({ success: true, enquiry: newEnquiry });
  } catch (error: any) {
    console.error("POST /api/enquiry error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ READ ALL (GET)
export async function GET() {
    try {
        await dbConnect();
        const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();
        return NextResponse.json(enquiries);
    } catch (error: any) {
        console.error("GET /api/enquiry error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ✅ UPDATE STATUS ONLY (PUT)
export async function PUT(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ error: "Missing ID or status" }, { status: 400 });
        }

        const updated = await Enquiry.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, enquiry: updated });
    } catch (error: any) {
        console.error("PUT /api/enquiry error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// ✅ DELETE (DELETE)
export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Missing enquiry ID" }, { status: 400 });
        }

        const deleted = await Enquiry.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("DELETE /api/enquiry error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
