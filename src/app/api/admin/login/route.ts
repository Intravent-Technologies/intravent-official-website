import { NextResponse } from "next/server";
import { validateCredentials, createToken } from "@/lib/auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  if (validateCredentials(username, password)) {
    const token = createToken();
    const res = NextResponse.json({ success: true, token });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400,
      path: "/",
    });
    return res;
  }
  return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
}
