<h1 align="center">FullStack IoT Dashboard</h1>

<p align="center">
  An end-to-end IoT project — physical sensors, a REST API, and a live web dashboard.
  Built with <strong>ESP32 + DHT11</strong>, <strong>Flask</strong>, and <strong>React + TypeScript</strong>.
</p>

<p align="center">
  <img alt="Flask" src="https://img.shields.io/badge/Flask-3.1-000000?logo=flask&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" />
  <img alt="MicroPython" src="https://img.shields.io/badge/MicroPython-ESP32-2B2D2F?logo=micropython" />
  <img alt="SQLite" src="https://img.shields.io/badge/SQLite-003B57?logo=sqlite" />
</p>

---

## Architecture

  📸 SCREENSHOT: Architecture Diagram
  <img width="2628" height="1521" alt="FullStack IoT Architecture" src="https://github.com/user-attachments/assets/326e46bb-6cb1-4be3-b64b-04e8af56111e" />


---
  📸 SCREENSHOT: Dashboard
 <img width="1905" height="983" alt="image" src="https://github.com/user-attachments/assets/56f6c783-89f5-4778-b9f6-52128a262bd9" />


 

---

## Features

- 🌡️ **Live temperature & humidity** from a physical ESP32 + DHT11 sensor
- 🌫️ **Air Quality Index (AQI)** via free OpenWeather Air Pollution API
- 📊 **Historical charts** with Recharts
- 🔄 **Auto-refresh** every 5 seconds
- 🟢 **Online / Offline status** per sensor card
- ⚡ **REST API** with health check endpoint

---

## Project Structure

```
FullStack-IoT/
├── server/                   # Flask backend
│   ├── app/
│   │   ├── __init__.py       # App factory
│   │   ├── config.py         # Env-based config
│   │   ├── models.py         # SensorData model
│   │   └── routes.py         # /health, /update, /latest, /data
│   ├── requirements.txt
│   └── run.py
│
├── client/                   # React frontend
│   ├── src/
│   │   ├── api/index.ts      # API service (backend + OpenWeather)
│   │   ├── components/       # SensorCard, SensorChart
│   │   ├── Pages/            # Dashboard, Settings
│   │   └── main.tsx
│   ├── .env.example          # ← copy to .env and fill in keys
│   └── package.json
│
└── README.md
```

---

## Prerequisites

| Tool | Version |
|------|---------|
| Python | 3.10+ |
| Node.js | 18+ |
| ESP32 with DHT11 | GPIO 14 |
| MicroPython firmware | v1.23+ |

---

## Backend Setup

```bash
cd server

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Linux / Mac

# Install dependencies
pip install -r requirements.txt

# Run the server (binds to 0.0.0.0 so ESP32 can reach it)
python run.py
```

Server runs at **http://localhost:5000**.

> To receive data from the ESP32 over a mobile hotspot, allow port 5000 through Windows Firewall:
> ```powershell
> New-NetFirewallRule -DisplayName "Flask IoT" -Direction Inbound -Protocol TCP -LocalPort 5000 -Action Allow
> ```

---

## Frontend Setup

```bash
cd client

npm install

# Configure environment
cp .env.example .env
# Edit .env — add your OpenWeather API key and coordinates

npm run dev
```

Open **http://localhost:5173** (use Edge or Chrome; Brave may block local module scripts).

---

## ESP32 Hardware Setup

**Wiring:**

| DHT11 | ESP32 |
|-------|-------|
| VCC   | 3.3V  |
| GND   | GND   |
| DATA  | GPIO 14 |

**Flash `edge/main.py`** via Thonny or mpremote and update:

```python
SSID       = "Your_Hotspot_SSID"
PASSWORD   = "Your_Password"
SERVER_URL = "http://<your-pc-hotspot-ip>:5000/update"
```

Find your hotspot IP:
```powershell
ipconfig | findstr /i "IPv4"
```

---

## Environment Variables

Copy `client/.env.example` to `client/.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_OPENWEATHER_API_KEY=your_free_key_here
VITE_LATITUDE=your_latitude
VITE_LONGITUDE=your_longitude
```

Get a **free** OpenWeather API key at [openweathermap.org/api](https://openweathermap.org/api).

---

## API Reference

| Method | Endpoint  | Description |
|--------|-----------|-------------|
| GET    | `/health` | Health check |
| POST   | `/update` | Submit reading `{ "temp": 26.5, "hum": 60 }` |
| GET    | `/latest` | Most recent reading |
| GET    | `/data?limit=50` | Historical readings |

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Edge | MicroPython, ESP32, DHT11 |
| Backend | Python, Flask 3, SQLAlchemy, SQLite |
| Frontend | React 19, TypeScript, Vite 7, Tailwind CSS v4, Recharts |
| External API | OpenWeather Air Pollution API |

---

## License

MIT
