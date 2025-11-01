import { NextResponse } from "next/server";
import { dbConnect } from "../../lib/dbConnect";
import Enquiry from "../../models/Contact";
import { verifyToken } from "../../lib/auth";
import { sendEmail } from "../../lib/mailer";
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

    // Save enquiry
    const enquiry = await Enquiry.create(body);

    // ✅ Stylish email for admin
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
              <p><strong>Name:</strong> ${body.name}</p>
              <p><strong>Email:</strong> ${body.email}</p>
              <p><strong>Phone:</strong> ${body.phone || "N/A"}</p>
              <p><strong>Message:</strong><br/>${body.message}</p>
            </div>
            <p style="margin-top: 20px;">📋 You can check more details in the admin dashboard.</p>
          </div>
          <div style="background: #111827; color: #ccc; text-align: center; padding: 15px; font-size: 12px;">
            © ${new Date().getFullYear()} Old Car Portfolio. All rights reserved.
          </div>
        </div>
      </div>
    `;

    // ✅ Stylish email for customer
    const customerEmailHTML = `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9fafb; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #c19a6b, #8b6a3f); padding: 20px; color: white; text-align: center;">
            <h2 style="margin: 0;">Thank You for Reaching Out!</h2>
            <p style="margin: 5px 0 0;">Old Car Portfolio</p>
          </div>
          <div style="padding: 25px; color: #333;">
            <p>Hi <strong>${body.name}</strong>,</p>
            <p>We appreciate you contacting us. Our team has received your enquiry and will get back to you soon.</p>
            <p>Here’s a copy of your message:</p>
            <blockquote style="border-left: 4px solid #c19a6b; margin: 15px 0; padding-left: 10px; color: #555; font-style: italic;">
              ${body.message}
            </blockquote>
            <p>If you have any urgent queries, feel free to reply to this email.</p>
            <p style="margin-top: 20px;">Best Regards,<br/><strong>Old Car Portfolio Team</strong></p>
          </div>
          <div style="background: #f3f4f6; color: #555; text-align: center; padding: 15px; font-size: 12px;">
            <p>Follow us on <a href="https://instagram.com" style="color:#c19a6b; text-decoration:none;">Instagram</a> | 
            <a href="https://facebook.com" style="color:#c19a6b; text-decoration:none;">Facebook</a></p>
            <p>© ${new Date().getFullYear()} Old Car Portfolio</p>
          </div>
        </div>
      </div>
    `;

    // 📨 Send both emails
    await Promise.all([
      sendEmail({
        to: process.env.ADMIN_EMAIL!,
        subject: "🚗 New Enquiry Received - Old Car Portfolio",
        html: adminEmailHTML,
      }),
      sendEmail({
        to: body.email,
        subject: "✅ Thanks for contacting Old Car Portfolio!",
        html: customerEmailHTML,
      }),
    ]);

    return NextResponse.json(enquiry, { status: 201 });
  } catch (err) {
    console.error("POST /api/enquiry error:", err);
    return NextResponse.json(
      { error: "Failed to create enquiry" },
      { status: 500 }
    );
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
