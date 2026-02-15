export interface ServerConfig {
  id: string;
  name: string;
  url: string;
  group: string;
  description?: string;
}

export interface ServerStatus {
  id: string;
  status: "online" | "offline" | "checking";
  latencyMs: number | null;
  lastChecked: string;
}

export interface ServersConfig {
  servers: ServerConfig[];
}
