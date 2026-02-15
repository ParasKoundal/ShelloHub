import { ServerConfig, ServerStatus } from "./types";

export async function checkServer(server: ServerConfig): Promise<ServerStatus> {
  const start = Date.now();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(server.url, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "follow",
    });
    clearTimeout(timeout);

    const latencyMs = Date.now() - start;
    // 401 = basic auth prompt = server is alive and running
    // 302 = Cloudflare Access redirect = also alive
    const online =
      res.status === 200 || res.status === 401 || res.status === 302;

    return {
      id: server.id,
      status: online ? "online" : "offline",
      latencyMs,
      lastChecked: new Date().toISOString(),
    };
  } catch {
    return {
      id: server.id,
      status: "offline",
      latencyMs: null,
      lastChecked: new Date().toISOString(),
    };
  }
}

export async function checkAllServers(
  servers: ServerConfig[]
): Promise<ServerStatus[]> {
  return Promise.all(servers.map(checkServer));
}
