import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correct = process.env.DASHBOARD_PASSWORD;

  if (!correct) {
    // No password set — allow access (local dev without env var)
    const res = NextResponse.json({ ok: true });
    res.cookies.set("shello-auth", "open", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  }

  if (password !== correct) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = Buffer.from(`${Date.now()}:${correct}`).toString("base64");

  const res = NextResponse.json({ ok: true });
  res.cookies.set("shello-auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
