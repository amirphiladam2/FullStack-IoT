import { useState, useEffect, useCallback } from "react";
import SensorCard from "@/components/SensorCard";
import SensorChart from "@/components/SensorChart";
import { sensorData as initialSensorData, type HistoryPoint } from "@/Data/sensorData";
import { fetchLatestData, fetchAllData, fetchAQI } from "@/api";

const formatTime = (isoString: string) =>
  new Date(isoString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function Dashboard() {
  const [sensors, setSensors] = useState(initialSensorData);
  const [tempHistory, setTempHistory] = useState<HistoryPoint[]>([]);
  const [humidHistory, setHumidHistory] = useState<HistoryPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [connectionError, setConnectionError] = useState(false);

  const updateDashboard = useCallback(async () => {
    try {
      const [latest, allData, aqiLabel] = await Promise.all([
        fetchLatestData(),
        fetchAllData(),
        fetchAQI(),
      ]);

      setSensors((prev) =>
        prev.map((s) => {
          if (s.title === "Temperature") return { ...s, value: latest.temperature, status: "online" as const };
          if (s.title === "Humidity") return { ...s, value: latest.humidity, status: "online" as const };
          if (s.title === "Air Quality") return { ...s, value: aqiLabel, status: "online" as const };
          return s;
        })
      );

      setTempHistory(allData.map((d) => ({ time: formatTime(d.timestamp), value: d.temperature })));
      setHumidHistory(allData.map((d) => ({ time: formatTime(d.timestamp), value: d.humidity })));
      setLastUpdated(new Date().toLocaleTimeString());
      setConnectionError(false);
    } catch {
      setSensors((prev) => prev.map((s) => ({ ...s, status: "offline" as const })));
      setConnectionError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    updateDashboard();
    const interval = setInterval(updateDashboard, 5000);
    return () => clearInterval(interval);
  }, [updateDashboard]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div>
          <div className="h-9 w-48 rounded-lg bg-white/5 mb-2" />
          <div className="h-4 w-64 rounded bg-white/5" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-36 rounded-2xl border border-white/10 bg-white/5" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-72 rounded-2xl border border-white/10 bg-white/5" />
          <div className="h-72 rounded-2xl border border-white/10 bg-white/5" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">IoT Dashboard</h2>
          <p className="text-slate-400">Real-time telemetry and analytical insights.</p>
        </div>
        <div className="text-right">
          {connectionError ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-400 ring-1 ring-rose-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              Backend offline
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Live
            </span>
          )}
          {lastUpdated && (
            <p className="mt-1 text-xs text-slate-500">Updated at {lastUpdated}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sensors.map((sensor, index) => (
            <SensorCard key={index} {...sensor} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <SensorChart title="Temperature Variation" data={tempHistory} color="#ec4899" unit="°C" />
          <SensorChart title="Humidity Levels" data={humidHistory} color="#3b82f6" unit="%" />
        </div>
      </div>
    </div>
  );
}
