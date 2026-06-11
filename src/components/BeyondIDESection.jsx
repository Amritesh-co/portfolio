import React from "react";
import { 
  Cpu, 
  Camera,
  Bike,
  BookOpen,
  Sparkles,
  Command
} from "lucide-react";

const HOBBIES = [
  {
    icon: <Cpu className="h-6 w-6 text-emerald-400" />,
    title: "Hardware & IoT",
    description: "Integrating hardware with software. Building custom smart home sensors, microcontrollers (ESP32, Raspberry Pi Pico), and writing firmware to automate environments."
  },
  {
    icon: <Camera className="h-6 w-6 text-sky-400" />,
    title: "Photography",
    description: "Exploring urban architecture, minimal geometry, and low-light long exposures. Framing the world through a lens to train design patterns and composition eyes."
  },
  {
    icon: <Bike className="h-6 w-6 text-orange-400" />,
    title: "Cycling & Outdoors",
    description: "Long-distance gravel cycling and mountain trail hiking. Challenging physical limits, exploring new landscapes, and stepping away to solve complex engineering challenges with a clear mind."
  },
  {
    icon: <BookOpen className="h-6 w-6 text-purple-400" />,
    title: "Sci-Fi & Philosophy",
    description: "Reading broadly across hard science fiction, systems theory, and classic philosophy (Stoicism) to build mental models and resilient logical frameworks."
  }
];

export const BeyondIDESection = () => {
  return (
    <section id="beyond-ide" className="py-24 px-4 relative bg-zinc-950/40 border-t border-border/10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-5xl space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Command className="h-3 w-3" /> Behind the Screen
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Beyond the <span className="text-primary">IDE</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Who I am when the screen turns off. Discover the creative outlets, physical endeavors, and off-duty engineering pursuits that keep my perspective balanced and sharp.
          </p>
        </div>

        {/* Clean Grid of Hobbies */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {HOBBIES.map((hobby, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl border border-border/20 bg-zinc-900/10 hover:bg-zinc-900/30 hover:border-border/60 transition-all duration-300 group flex flex-col space-y-4"
            >
              <div className="p-2.5 w-fit rounded-lg bg-zinc-900 border border-border/10 group-hover:border-primary/30 transition-colors shrink-0">
                {hobby.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-200">{hobby.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{hobby.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
