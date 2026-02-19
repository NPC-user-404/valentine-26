import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type RomanceMode = "day" | "night";

const STORAGE_KEY = "valentine-romance-mode";
const DAY_CLASS = "valentine-day-mode";
const NIGHT_CLASS = "valentine-night-mode";

export interface DayNightRomanceToggleProps {
  onModeChange?: (mode: RomanceMode) => void;
}

function readInitialMode(): RomanceMode {
  if (typeof window === "undefined") return "day";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "night" || stored === "day" ? stored : "day";
}

function applyRootClass(mode: RomanceMode): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove(DAY_CLASS, NIGHT_CLASS);
  root.classList.add(mode === "day" ? DAY_CLASS : NIGHT_CLASS);
}

export const DayNightRomanceToggle: React.FC<DayNightRomanceToggleProps> = ({
  onModeChange,
}) => {
  const [mode, setMode] = useState<RomanceMode>(() => readInitialMode());

  useEffect(() => {
    applyRootClass(mode);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, mode);
    }
    onModeChange?.(mode);
  }, [mode, onModeChange]);

  const isNight = mode === "night";

  return (
    <div className="inline-flex items-center gap-3 rounded-full bg-white/20 px-4 py-2 shadow-[0_12px_30px_rgba(79,70,229,0.25)] backdrop-blur-xl ring-1 ring-white/30">
      <div className="flex items-center gap-2">
        <span className="text-sm">☀️</span>
        <Switch
          checked={isNight}
          onCheckedChange={(value) => setMode(value ? "night" : "day")}
          className="data-[state=checked]:bg-violet-500 data-[state=unchecked]:bg-rose-400"
        />
        <span className="text-sm">🌙</span>
      </div>
      <Label className="ml-1 cursor-pointer text-xs font-medium uppercase tracking-[0.2em] text-rose-50">
        {isNight ? "Night Romance" : "Daydream Love"}
      </Label>
    </div>
  );
};

export default DayNightRomanceToggle;

