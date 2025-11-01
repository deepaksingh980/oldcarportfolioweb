// app/lib/mailer.ts
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // you can use SendGrid, Outlook, etc.
  auth: {
    user: process.env.ADMIN_EMAIL, // your Gmail or SMTP email
    pass: process.env.ADMIN_EMAIL_PASS, // app password (not your Gmail password)
  },
});

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  try {
    await transporter.sendMail({
      from: `"Old Car Portfolio" <${process.env.ADMIN_EMAIL}>`,
      to,
      subject,
      html,
    });
    console.log("✅ Email sent to", to);
  } catch (err) {
    console.error("❌ Email send error:", err);
  }
}
