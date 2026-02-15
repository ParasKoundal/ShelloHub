import { getServers, getGroups } from "@/lib/servers";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const servers = getServers();
  const groups = getGroups(servers);

  return <Dashboard initialServers={servers} groups={groups} />;
}
