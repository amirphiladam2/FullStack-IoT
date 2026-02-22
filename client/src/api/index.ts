const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
const OW_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY ?? "";
const LAT = import.meta.env.VITE_LATITUDE ?? "28.6139";   // default: New Delhi
const LON = import.meta.env.VITE_LONGITUDE ?? "77.2090";

const AQI_LABELS: Record<number, string> = {
  1: "Good",
  2: "Fair",
  3: "Moderate",
  4: "Poor",
  5: "Very Poor",
};

export interface SensorDataResponse {
  temperature: number;
  humidity: number;
  timestamp: string;
}

export const fetchLatestData = async (): Promise<SensorDataResponse> => {
  const response = await fetch(`${API_BASE_URL}/latest`);
  if (!response.ok) {
    throw new Error(`Failed to fetch latest data (${response.status})`);
  }
  return response.json();
};

export const fetchAllData = async (): Promise<SensorDataResponse[]> => {
  const response = await fetch(`${API_BASE_URL}/data?limit=50`);
  if (!response.ok) {
    throw new Error(`Failed to fetch history data (${response.status})`);
  }
  return response.json();
};

export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(3000) });
    return response.ok;
  } catch {
    return false;
  }
};

export const fetchAQI = async (): Promise<string> => {
  if (!OW_KEY) return "N/A";
  try {
    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${LAT}&lon=${LON}&appid=${OW_KEY}`;
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!response.ok) return "N/A";
    const data = await response.json();
    const aqi: number = data?.list?.[0]?.main?.aqi;
    return AQI_LABELS[aqi] ?? "N/A";
  } catch {
    return "N/A";
  }
};
