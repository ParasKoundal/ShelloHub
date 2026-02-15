"use client";

import { ServerConfig, ServerStatus } from "@/lib/types";
import ServerCard from "./ServerCard";

interface ServerGridProps {
  servers: ServerConfig[];
  statuses: Map<string, ServerStatus>;
}

export default function ServerGrid({ servers, statuses }: ServerGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {servers.map((server) => (
        <ServerCard
          key={server.id}
          server={server}
          status={statuses.get(server.id)}
        />
      ))}
    </div>
  );
}
