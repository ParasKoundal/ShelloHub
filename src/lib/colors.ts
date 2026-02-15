const GROUP_COLORS = [
  "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  "bg-purple-500/20 text-purple-400 border border-purple-500/30",
  "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  "bg-rose-500/20 text-rose-400 border border-rose-500/30",
  "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
];

const GROUP_COLORS_LIGHT = [
  "bg-blue-100 text-blue-700 border border-blue-200",
  "bg-purple-100 text-purple-700 border border-purple-200",
  "bg-amber-100 text-amber-700 border border-amber-200",
  "bg-emerald-100 text-emerald-700 border border-emerald-200",
  "bg-rose-100 text-rose-700 border border-rose-200",
  "bg-cyan-100 text-cyan-700 border border-cyan-200",
];

function hashString(s: string): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash + s.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function getGroupColor(group: string, isDark: boolean = true): string {
  const colors = isDark ? GROUP_COLORS : GROUP_COLORS_LIGHT;
  return colors[hashString(group) % colors.length];
}
