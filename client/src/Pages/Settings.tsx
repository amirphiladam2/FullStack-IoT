import { Wifi, Database, Radio, Save, RefreshCcw } from "lucide-react";

export default function Settings() {
  return (
    <div className="mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h2 className="text-4xl font-bold tracking-tight text-white">Hardware Configuration</h2>
        <p className="mt-1 text-slate-400">Manage your node connectivity and data acquisition parameters.</p>
      </div>

      <div className="space-y-6">
        {/* Connectivity Section */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
            <Wifi className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">Network Settings</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-widest text-slate-500">WiFi SSID</label>
              <input
                type="text"
                defaultValue="IoT_Home_2.4G"
                className="w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-widest text-slate-500">Node IP Address</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  defaultValue="192.168.1.104"
                  className="flex-1 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                  <RefreshCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Data Configuration Section */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
            <Database className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">Data Acquisition</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-widest text-slate-500">Sample Interval (ms)</label>
              <select className="w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                <option>500</option>
                <option>1000</option>
                <option>5000</option>
                <option>10000</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-widest text-slate-500">MQTT Broker</label>
              <input
                type="text"
                defaultValue="broker.hivemq.com"
                className="w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>
        </section>

        {/* Debug Section */}
        <section className="rounded-2xl border border-white/10 bg-rose-500/5 p-6 backdrop-blur-xl ring-1 ring-rose-500/10">
          <div className="mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
            <Radio className="h-5 w-5 text-rose-500" />
            <h3 className="text-lg font-semibold text-white">Debug & OTA</h3>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-white">Serial Logging</p>
              <p className="text-xs text-slate-500">Forward logs to central management server</p>
            </div>
            <div className="relative h-6 w-11 cursor-pointer rounded-full bg-slate-800 p-1 transition-colors hover:bg-slate-700">
              <div className="h-4 w-4 transform rounded-full bg-slate-400 transition-transform" />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4">
          <button className="rounded-xl px-6 py-2.5 text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white transition-all">
            Reset Defaults
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-8 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:opacity-90 transition-all">
            <Save className="h-4 w-4" />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}