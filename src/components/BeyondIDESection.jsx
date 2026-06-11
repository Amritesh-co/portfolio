import React from "react";
import { Sparkles } from "lucide-react";

const IMAGES = [
  { src: "/beyond-ide/img1.jpeg",       label: "Best Rotaractor of the Year" },
  { src: "/beyond-ide/img2.jpeg",       label: "Rotaract Club of R.V.C.E." },
  { src: "/beyond-ide/travel.jpeg",     label: "Travel" },
  { src: "/beyond-ide/cycling.jpeg",    label: "Cycling" },
  { src: "/beyond-ide/trekking.jpeg",   label: "Trekking" },
  { src: "/beyond-ide/badminton.jpeg",  label: "Badminton" },
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
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
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
