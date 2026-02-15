"use client";

interface GroupFilterProps {
  groups: string[];
  activeGroup: string | null;
  onSelect: (group: string | null) => void;
}

export default function GroupFilter({
  groups,
  activeGroup,
  onSelect,
}: GroupFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      <button
        onClick={() => onSelect(null)}
        className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
          ${
            activeGroup === null
              ? "bg-blue-600 text-white"
              : "dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
      >
        All
      </button>
      {groups.map((group) => (
        <button
          key={group}
          onClick={() => onSelect(group)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap capitalize transition-colors
            ${
              activeGroup === group
                ? "bg-blue-600 text-white"
                : "dark:bg-white/5 dark:text-gray-400 dark:hover:bg-white/10 bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
        >
          {group}
        </button>
      ))}
    </div>
  );
}
