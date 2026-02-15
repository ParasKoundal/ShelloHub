import { NextResponse } from "next/server";
import { getServers } from "@/lib/servers";
import { checkAllServers } from "@/lib/health";

export const dynamic = "force-dynamic";

export async function GET() {
  const servers = getServers();
  const statuses = await checkAllServers(servers);
  return NextResponse.json({ statuses });
}
