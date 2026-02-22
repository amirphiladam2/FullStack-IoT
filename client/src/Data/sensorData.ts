import { Thermometer, Droplets, Zap, Wind, type LucideIcon } from "lucide-react";

export interface SensorTrend {
  value: number;
  isUp: boolean;
}

export interface SensorInfo {
  title: string;
  value: number | string;
  unit: string;
  icon: LucideIcon;
  status: "online" | "offline";
  trend?: SensorTrend;
}

export interface HistoryPoint {
  time: string;
  value: number;
}

export const sensorData: SensorInfo[] = [
  {
    title: "Temperature",
    value: 24.5,
    unit: "°C",
    icon: Thermometer,
    status: "online",
    trend: { value: 2.4, isUp: true }
  },
  {
    title: "Humidity",
    value: 62,
    unit: "%",
    icon: Droplets,
    status: "online",
    trend: { value: 1.2, isUp: false }
  },
  {
    title: "Power Usage",
    value: 124,
    unit: "W",
    icon: Zap,
    status: "online",
    trend: { value: 8.5, isUp: true }
  },
  {
    title: "Air Quality",
    value: "Good",
    unit: "AQI",
    icon: Wind,
    status: "online"
  },
];

export const tempHistory: HistoryPoint[] = [
  { time: "12:00", value: 22.1 },
  { time: "13:00", value: 23.4 },
  { time: "14:00", value: 24.5 },
  { time: "15:00", value: 24.2 },
  { time: "16:00", value: 23.8 },
  { time: "17:00", value: 24.5 },
];

export const humidHistory: HistoryPoint[] = [
  { time: "12:00", value: 58 },
  { time: "13:00", value: 60 },
  { time: "14:00", value: 62 },
  { time: "15:00", value: 61 },
  { time: "16:00", value: 59 },
  { time: "17:00", value: 62 },
];