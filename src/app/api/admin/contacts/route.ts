import { NextRequest, NextResponse } from "next/server";
import { readData } from "@/lib/data";
import { verifyToken } from "@/lib/auth";
import { getSupabase } from "@/lib/supabase";
import nodemailer from "nodemailer";

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return null;
}

async function sendEmailNotification(entry: { name: string; email: string; company: string; message: string; date: string }) {
  const transporter = getTransporter();
  if (!transporter) return;
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "info@intravent.com.ng",
      subject: `New Contact Message from ${entry.name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
          <h2 style="color:#0F1A3A;margin-bottom:24px">New Contact Message</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#6B7280;font-size:14px">Name</td><td style="padding:8px 0;font-size:14px">${entry.name}</td></tr>
            <tr><td style="padding:8px 0;color:#6B7280;font-size:14px">Email</td><td style="padding:8px 0;font-size:14px"><a href="mailto:${entry.email}">${entry.email}</a></td></tr>
            ${entry.company ? `<tr><td style="padding:8px 0;color:#6B7280;font-size:14px">Company</td><td style="padding:8px 0;font-size:14px">${entry.company}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#6B7280;font-size:14px">Date</td><td style="padding:8px 0;font-size:14px">${new Date(entry.date).toLocaleString()}</td></tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#F9FAFB;border-radius:8px;border:1px solid #E5E7EB">
            <p style="margin:0 0 8px;font-weight:600;color:#0F1A3A">Message:</p>
            <p style="margin:0;color:#374151;line-height:1.6">${entry.message}</p>
          </div>
          <hr style="margin:24px 0;border:none;border-top:1px solid #E5E7EB" />
          <p style="color:#9CA3AF;font-size:12px">Sent from intravent.com.ng contact form</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Failed to send email notification:", err);
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await readData("contacts.json"));
}

export async function POST(request: NextRequest) {
  const { name, email, company, message } = await request.json();
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message required" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 500 });

  const entry = { name, email, company: company || "", message, date: new Date().toISOString() };
  const { error } = await supabase.from("contacts").insert(entry);
  if (error) {
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }

  sendEmailNotification(entry);
  return NextResponse.json({ success: true, item: entry });
}
