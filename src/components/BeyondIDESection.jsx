import React from "react";
import { Sparkles } from "lucide-react";

const IMAGES = [
  {
    src: "/beyond-ide/img1.jpeg",
    label: "Best Rotaractor of the Year",
    description: "Awarded for outstanding dedication and leadership within Rotaract Club of R.V.C.E. — recognised for going beyond what's required and inspiring peers.",
  },
  {
    src: "/beyond-ide/rotaract_rvce.jpeg",
    label: "Rotaract Club of R.V.C.E.",
    description: "Active member organising community service drives, professional development events, and fellowship initiatives that connect students with a larger purpose.",
  },
  {
    src: "/beyond-ide/travel.jpeg",
    label: "Travel",
    description: "Exploring new cities, cultures, and landscapes. Every trip sharpens perspective and feeds curiosity in ways no screen ever could.",
  },
  {
    src: "/beyond-ide/cycling.jpeg",
    label: "Cycling",
    description: "Long rides through Bangalore's outskirts and beyond — two wheels, open road, clear head. Cycling is where the best ideas surface.",
  },
  {
    src: "/beyond-ide/trekking.jpeg",
    label: "Trekking",
    description: "Trail treks through the Western Ghats. Pushing through tough terrain builds the same discipline that carries over into hard engineering problems.",
  },
  {
    src: "/beyond-ide/badminton.jpeg",
    label: "Badminton",
    description: "Fast reflexes, strategic plays, staying competitive on the court. A sport that keeps both body and mind sharp between coding sprints.",
  },
];

export const BeyondIDESection = () => {
  return (
    <section id="beyond-ide" className="py-24 px-4 relative bg-zinc-950/40 border-t border-border/10">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-5xl space-y-12">

        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Beyond the <span className="text-primary">IDE</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Who I am when the screen turns off. Discover the creative outlets, physical endeavors, and off-duty engineering pursuits that keep my perspective balanced and sharp.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {IMAGES.map((img, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden border border-border/20 bg-zinc-900/10 hover:border-border/60 transition-all duration-300 group h-[280px] relative"
            >
              <img
                src={img.src}
                alt={img.label}
                className={`w-full h-full ${
                  img.src.includes("rotaract_rvce")
                    ? "object-contain p-6 bg-zinc-950/20"
                    : "object-cover group-hover:scale-105"
                } transition-transform duration-500`}
                loading="lazy"
              />

              {/* Description overlay — slides up on hover */}
              <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs text-slate-300 leading-relaxed mb-3">{img.description}</p>
              </div>

              {/* Label bar — always visible */}
              <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/80 backdrop-blur-md border border-border/20 py-2.5 px-3.5 rounded-xl transition-colors group-hover:border-primary/30 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-200 tracking-wide">
                  {img.label}
                </span>
                <Sparkles className="h-3.5 w-3.5 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
