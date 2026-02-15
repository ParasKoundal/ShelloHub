import fs from "fs";
import path from "path";
import { ServersConfig, ServerConfig } from "./types";

let cached: ServerConfig[] | null = null;

export function getServers(): ServerConfig[] {
  if (cached && process.env.NODE_ENV === "production") return cached;

  try {
    const filePath = path.join(process.cwd(), "servers.json");
    const raw = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, "utf-8")
      : process.env.SERVERS_CONFIG || '{"servers":[]}';
    const parsed: ServersConfig = JSON.parse(raw);
    cached = parsed.servers;
    return cached;
  } catch {
    console.warn("Could not read server config — returning empty list");
    return [];
  }
}

export function getGroups(servers: ServerConfig[]): string[] {
  return [...new Set(servers.map((s) => s.group))].sort();
}
