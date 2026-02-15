import { NextResponse } from "next/server";
import { getServers } from "@/lib/servers";

export async function GET() {
  const servers = getServers();
  return NextResponse.json({ servers });
}
