"use client";

type TabGroupProps<T extends string> = {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
  className?: string;
  dark?: boolean;
};

export function TabGroup<T extends string>({
  tabs,
  active,
  onChange,
  className = "",
  dark = false,
}: TabGroupProps<T>) {
  return (
    <div
      className={`flex flex-wrap gap-2 border-b pb-4 ${
        dark ? "border-white/10" : "border-ink/10"
      } ${className}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
            active === tab
              ? dark
                ? "border border-white/90 bg-gradient-to-b from-white to-[#f6f8fe] text-ink shadow-[0_8px_28px_rgba(0,0,0,0.2)]"
                : "chip-metallic-dark text-white shadow-[0_16px_40px_rgba(6,15,50,0.22)] ring-2 ring-blue-glow/40"
              : dark
                ? "chip-metallic-dark text-white/65 hover:text-white"
                : "chip-metallic-dark text-white/65 hover:text-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
