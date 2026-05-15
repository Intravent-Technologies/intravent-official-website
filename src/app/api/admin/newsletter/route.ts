import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";
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

async function sendWelcomeEmail(email: string) {
  const transporter = getTransporter();
  if (!transporter) return;
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: "Welcome to Intravent Insights!",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px 24px">
          <div style="text-align:center;margin-bottom:32px">
            <h1 style="color:#0F1A3A;font-size:24px;margin:0">Welcome to Intravent Insights!</h1>
          </div>
          <p style="color:#374151;font-size:15px;line-height:1.7">Hi there,</p>
          <p style="color:#374151;font-size:15px;line-height:1.7">
            Thanks for subscribing to our newsletter. You'll now receive weekly insights on tech trends,
            digital strategy, and industry best practices — straight from our team of experts.
          </p>
          <p style="color:#374151;font-size:15px;line-height:1.7">Here's what to expect:</p>
          <ul style="color:#374151;font-size:15px;line-height:1.7;padding-left:20px">
            <li>Latest technology trends and analysis</li>
            <li>Case studies and success stories</li>
            <li>Exclusive tips and best practices</li>
            <li>Company news and event invitations</li>
          </ul>
          <p style="color:#374151;font-size:15px;line-height:1.7">
            We're excited to have you on board. If you ever need to reach us, just reply to this email.
          </p>
          <hr style="border:none;border-top:1px solid #E5E7EB;margin:24px 0" />
          <p style="color:#9CA3AF;font-size:12px;text-align:center">
            Intravent Technologies &bull; Lagos, Nigeria<br />
            <a href="mailto:info@intravent.com.ng" style="color:#6F4FE8">info@intravent.com.ng</a>
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Failed to send welcome email:", err);
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await readData("newsletter.json"));
}

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 500 });

  const { data: existing } = await supabase
    .from("newsletter")
    .select("email")
    .eq("email", email)
    .maybeSingle();
  if (existing) {
    return NextResponse.json({ error: "Already subscribed" }, { status: 409 });
  }

  const entry = { email, date: new Date().toISOString() };
  const { error } = await supabase.from("newsletter").insert(entry);
  if (error) {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }

  sendWelcomeEmail(email);
  return NextResponse.json({ success: true, item: entry });
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { email } = await request.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  const { error } = await supabase.from("newsletter").delete().eq("email", email);
  if (error) {
    return NextResponse.json({ error: "Subscriber not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
