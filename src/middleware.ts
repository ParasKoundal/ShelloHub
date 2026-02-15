import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow the login page and auth API through
  if (pathname === "/login" || pathname === "/api/auth") {
    return NextResponse.next();
  }

  // No password configured — skip auth entirely (local dev)
  if (!process.env.DASHBOARD_PASSWORD) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get("shello-auth")?.value;
  if (!cookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Validate the token contains the correct password
  try {
    const decoded = Buffer.from(cookie, "base64").toString();
    const password = decoded.split(":").slice(1).join(":");
    if (password !== process.env.DASHBOARD_PASSWORD) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
