import type { LucideIcon } from "lucide-react"; 
import { cn } from "@/lib/utils";

interface SensorCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon: LucideIcon;
  status: "online" | "offline";
  trend?: {
    value: number;
    isUp: boolean;
  };
}

export default function SensorCard({
  title,
  value,
  unit,
  icon: Icon,
  status,
  trend
}: SensorCardProps) {
  const isOnline = status === "online";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/10">
      <div className="flex items-start justify-between">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex items-center gap-1.5">
          <div className={cn(
            "h-2 w-2 rounded-full ring-4 ring-white/5",
            isOnline ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-rose-500"
          )} />
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            {status}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-slate-400">{title}</p>
        <div className="mt-1 flex items-baseline gap-1">
          <h3 className="text-3xl font-bold tracking-tight text-white">{value}</h3>
          <span className="text-sm font-medium text-slate-400">{unit}</span>
        </div>
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1">
          <span className={cn(
            "text-xs font-medium",
            trend.isUp ? "text-emerald-500" : "text-rose-500"
          )}>
            {trend.isUp ? "↑" : "↓"} {trend.value}%
          </span>
          <span className="text-xs text-slate-500">from last hour</span>
        </div>
      )}

      {/* Decorative background element */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-3xl" />
    </div>
  );
}