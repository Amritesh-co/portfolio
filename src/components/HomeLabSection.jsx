import React from "react";
import { Link } from "react-router-dom";
import { Server, Cpu, HardDrive, Zap, ArrowRight, Shield } from "lucide-react";

export const HomeLabSection = () => {
  return (
    <section id="homelab" className="py-24 relative bg-zinc-950/20 border-b border-border/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Side: Server Rack Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between px-1 max-w-md mx-auto lg:mx-0">
              <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase flex items-center gap-1.5">
                <Server className="h-3.5 w-3.5" /> Infrastructure Preview
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Outbound-Only
              </span>
            </div>

            <div className="border border-border/40 rounded-2xl bg-zinc-950/80 p-5 shadow-2xl space-y-4 max-w-md mx-auto">
              {/* Rack Node 1 */}
              <div className="border border-border/20 rounded-xl p-3.5 bg-zinc-900/30 flex items-center justify-between hover:border-primary/30 transition-colors duration-300">
                <div className="flex items-center gap-2.5">
                  <Zap className="h-4 w-4 text-indigo-400 animate-pulse" />
                  <span className="font-mono text-xs font-semibold text-slate-200">ubuntu-core-01</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono text-muted-foreground">Active</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
              {/* Rack Node 2 */}
              <div className="border border-border/20 rounded-xl p-3.5 bg-zinc-900/30 flex items-center justify-between hover:border-emerald/30 transition-colors duration-300">
                <div className="flex items-center gap-2.5">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-xs font-semibold text-slate-200">cloudflare-tunnel</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono text-muted-foreground">Active</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
              {/* Rack Node 3 */}
              <div className="border border-border/20 rounded-xl p-3.5 bg-zinc-900/30 flex items-center justify-between hover:border-amber/30 transition-colors duration-300">
                <div className="flex items-center gap-2.5">
                  <Cpu className="h-4 w-4 text-amber-400" />
                  <span className="font-mono text-xs font-semibold text-slate-200">docker-daemon</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono text-muted-foreground">Active</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Brief Text Intro + Button */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Home Lab <span className="text-primary">Friday</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Project <strong>Friday</strong> is a self-hosted cloud platform built on Ubuntu Server replicating enterprise cloud architectures locally. Using outbound tunnels, container virtualization, and secure mesh routing, it hosts cloud storage, multi-model AI environments, and web portals without exposing any inbound router ports.
            </p>
            <div className="pt-4 flex justify-center lg:justify-start">
              <Link to="/friday" className="cosmic-button flex items-center gap-2 group">
                Explore Friday <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
