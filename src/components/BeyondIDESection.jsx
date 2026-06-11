import React, { useState } from "react";
import { 
  Cpu, 
  Camera,
  Bike,
  BookOpen,
  Sparkles,
  Command,
  Heart,
  User,
  ExternalLink,
  ChevronRight
} from "lucide-react";

const HOBBIES = {
  hardware: {
    name: "Hardware & IoT",
    tagline: "Building cyber-physical systems",
    icon: <Cpu className="h-5 w-5 text-emerald-400" />,
    description: "Integrating hardware with software. Building custom smart home sensors, ESP32 microcontrollers, and automation logic.",
    meta: [
      { label: "Runtime", value: "FreeRTOS / ESP-IDF" },
      { label: "Hardware", value: "ESP32 · Raspberry Pi Pico · Zigbee" },
      { label: "Protocol", value: "MQTT · WebSockets · HTTP" },
      { label: "Integrations", value: "Home Assistant · Node-RED" },
    ],
    log: `// IoT Telemetry Node Log - ESP32-WROOM-32E
[17:02:01] Boot status: Successful. Wakeup source: Timer.
[17:02:02] Initializing sensors: DHT22 (temp/humid) & Lux sensor... OK
[17:02:03] Wi-Fi: Connecting to home-mesh network... Connected.
[17:02:04] Fetching telemetry pins:
           └─ Temperature: 24.2°C
           └─ Humidity: 58.0%
           └─ Ambient Light: 412 Lux
[17:02:05] MQTT: Connecting to local broker 192.168.1.100... Connected.
[17:02:06] MQTT: Publishing telemetry packet to topic: home/node_1/state
[17:02:07] Status: Tx success (200 OK). Entering deep sleep mode for 600s.`
  },
  photography: {
    name: "Photography",
    tagline: "Capturing geometry & light",
    icon: <Camera className="h-5 w-5 text-sky-400" />,
    description: "Exploring urban architecture, minimal geometry, and low-light long exposures. Framing code in the real world.",
    meta: [
      { label: "Format", value: "RAW (ARW) / Manual Mode" },
      { label: "Camera Body", value: "Mirrorless Sony Alpha Series" },
      { label: "Lenses", value: "35mm Prime f/1.8 · 85mm Portrait f/1.4" },
      { label: "Post-Process", value: "Adobe Lightroom · Photoshop CC" },
    ],
    log: `// Adobe Lightroom Classic - Editing pipeline log
[Info] Batch import complete: 16 RAW frames from active session.
[Info] Selection active: DSC_4102.ARW (Urban Geometry)
[Info] Applying custom lens profile corrections... OK
[Info] Adjusting Tone Curve:
       └─ Highlights: -20  |  Shadows: +25
       └─ Whites: -5       |  Blacks: +10
[Info] Color Grading: Shadow HSL (220°, 15% Sat) | Highlight HSL (40°, 8% Sat)
[Info] Details: Sharpening 40px | Radius 1.0 | Masking 15%
[Status] Exported selected shot as Web-Optimized sRGB JPEG. Complete.`
  },
  outdoors: {
    name: "Cycling & Outdoors",
    tagline: "Endurance & exploration",
    icon: <Bike className="h-5 w-5 text-orange-400" />,
    description: "Long-distance gravel cycling and hiking mountain trails. Clearing the mind, building endurance, and exploring landscapes.",
    meta: [
      { label: "Gravel Bike", value: "Alloy frame / Shimano GRX groupset" },
      { label: "Peak Distance", value: "82 km single-day loop" },
      { label: "GPS Tracking", value: "Garmin Edge 530 + HRM Band" },
      { label: "Route Planner", value: "Komoot / Strava Premium" },
    ],
    log: `// Strava Ride Log - Saturday Gravel Grind
[07:00:00] Sensor checklist: GPS locked, HRM connected, Cadence active.
[07:00:01] Activity started. Route: Valley Ridge Loop.
[07:45:00] Mile 12: Mid-climb check on Canyon Trail (7% grade, headwind).
           └─ Cadence: 82 RPM | HR: 162 BPM | Elevation: 210m
[08:30:00] Mile 25: Summit reached. Total elevation gain: 480m.
[09:15:00] Mile 40: Flat road headwind. Cadence stabilized at 90 RPM.
[09:55:00] Ride complete. Distance: 64.2 km | Time: 2h 45m | Avg Speed: 23.3 km/h
[Status] Average power: 185W | Caloric burn: 1,420 kcal | Synced to cloud.`
  },
  reading: {
    name: "Sci-Fi & Philosophy",
    tagline: "Systems, stories, & stoicism",
    icon: <BookOpen className="h-5 w-5 text-purple-400" />,
    description: "Reading broadly across hard science fiction, stoic philosophy, and systems theory to cultivate structured, resilient thinking.",
    meta: [
      { label: "Reading Hub", value: "Kindle Paperwhite / Hardcovers" },
      { label: "Target", value: "24 books / year challenge" },
      { label: "Genres", value: "Hard Sci-Fi · Stoicism · System Dynamics" },
      { label: "Current Reads", value: "Dune Messiah · Meditations" },
    ],
    log: `// Personal Reading Challenge Dashboard
[Challenge] Target: 24 books  |  Current progress: 14 completed.
[Book #12] Dune Messiah - Frank Herbert
           └─ Note: Masterclass in prescience, political friction, and systems.
[Book #13] Meditations - Marcus Aurelius
           └─ Note: "You have power over your mind - not outside events."
[Book #14] Thinking in Systems - Donella Meadows
           └─ Note: Exploring reinforcement loops, delays, and resilience.
[Status] Current Pace: +2 books ahead of schedule. Keep reading.`
  }
};

const PERSONAL_PILLARS = [
  {
    icon: <Cpu className="h-5 w-5 text-emerald-400" />,
    title: "Curious Tinkerer",
    description: "Fascinated by physical interfaces. I build IoT nodes, configure microcontrollers, and write firmware to automate my living space."
  },
  {
    icon: <Camera className="h-5 w-5 text-sky-400" />,
    title: "Visual Storyteller",
    description: "Capturing symmetry and details. Photography trains my eyes to notice design patterns, light balance, and clean composition."
  },
  {
    icon: <Bike className="h-5 w-5 text-orange-400" />,
    title: "Active Explorer",
    description: "Outdoor enthusiast. Long endurance gravel bike rides and trail hikes allow me to disconnect, reset, and approach complex code problems fresh."
  },
  {
    icon: <BookOpen className="h-5 w-5 text-purple-400" />,
    title: "Systems Thinker",
    description: "Avid reader. Digging into science fiction worldbuilding and philosophical texts helps me construct mental models for software design."
  }
];

export const BeyondIDESection = () => {
  const [activeTab, setActiveTab] = useState("hardware");

  const activeHobby = HOBBIES[activeTab];

  return (
    <section id="beyond-ide" className="py-24 px-4 relative bg-zinc-950/40 border-t border-border/10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-5xl space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Command className="h-3 w-3" /> Off-Duty Engineering & Passions
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Beyond the <span className="text-primary">IDE</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Who I am when the screen turns off. Discover my creative outlets, physical endeavors, and off-duty engineering pursuits that keep my mind balanced and sharp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: PERSONAL PILLARS */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <h3 className="text-base font-bold font-mono text-primary uppercase tracking-wider mb-6 flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Personal Pillars
            </h3>

            <div className="space-y-4">
              {PERSONAL_PILLARS.map((pillar, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl border border-border/20 bg-zinc-900/10 hover:bg-zinc-900/30 hover:border-border/60 transition-all duration-300 group flex items-start gap-4"
                >
                  <div className="p-2 rounded-lg bg-zinc-900 border border-border/10 group-hover:border-primary/30 transition-colors shrink-0">
                    {pillar.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-200">{pillar.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 pl-1">
                <Heart className="h-3.5 w-3.5 fill-indigo-400/20" /> Driven by lifelong learning and exploration
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE HOBBY VIEW CONSOLE */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <h3 className="text-base font-bold font-mono text-primary uppercase tracking-wider mb-6 flex items-center gap-2">
              <User className="h-4 w-4" /> Passion Logs & Diagnostics
            </h3>

            <div className="border border-border/40 rounded-2xl bg-black shadow-2xl flex flex-col overflow-hidden">
              
              {/* Tab Selector Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-border/20 bg-zinc-900/60 select-none overflow-x-auto scrollbar-none">
                <div className="flex gap-2 min-w-max">
                  {Object.keys(HOBBIES).map((key) => {
                    const hobby = HOBBIES[key];
                    const isActive = activeTab === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                          isActive 
                            ? "bg-zinc-950 text-primary border border-border/20 font-semibold" 
                            : "text-muted-foreground hover:text-slate-200"
                        }`}
                      >
                        {hobby.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hobby Details Pane */}
              <div className="px-4 py-4 bg-zinc-950 border-b border-border/10 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-zinc-900 border border-border/10 shrink-0">
                    {activeHobby.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{activeHobby.name}</h4>
                    <p className="text-[11px] font-mono text-indigo-400">{activeHobby.tagline}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {activeHobby.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/5">
                  {activeHobby.meta.map(({ label, value }) => (
                    <div key={label} className="rounded-lg border border-border/10 bg-zinc-900/20 px-3 py-2">
                      <div className="text-[9px] font-mono text-slate-400 uppercase">{label}</div>
                      <div className="text-xs font-mono text-slate-200 truncate">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hobby Log Output (Mock terminal) */}
              <div className="p-4 font-mono text-[11px] overflow-x-auto leading-relaxed bg-zinc-950 text-slate-300 max-h-[300px] overflow-y-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    {activeHobby.log.split("\n").map((line, idx) => (
                      <tr key={idx} className="hover:bg-zinc-900/30">
                        <td className="w-8 pr-4 text-right text-muted-foreground/40 select-none border-r border-border/5">
                          {idx + 1}
                        </td>
                        <td className="pl-4 whitespace-pre pr-4 text-slate-300">
                          {line || " "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
