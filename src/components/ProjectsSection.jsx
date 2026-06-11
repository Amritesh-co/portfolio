import { Link } from "react-router-dom";
import { PROJECTS as ALL_PROJECTS } from "../data/projects";

const PROJECTS = ALL_PROJECTS.slice(0, 3);

function LaptopCard({ project }) {
  return (
    <div className="flex flex-col items-center group">
      {/* ── MacBook notch front-view ───────────────────────────────────── */}
      <Link to={`/projects/${project.slug}`} className="w-full max-w-[340px]">

        {/* Lid — 2 px ultra-thin bezel */}
        <div
          className="relative border border-white/[0.07] shadow-[0_20px_56px_rgba(0,0,0,0.7)] group-hover:shadow-[0_20px_72px_rgba(139,92,246,0.4)] transition-shadow duration-500"
          style={{ background: "#1e1e20", padding: "2px", borderRadius: "14px" }}
        >
          {/* Camera dot in the top bezel */}
          <div className="flex justify-center" style={{ height: "6px", alignItems: "center" }}>
            <div className="w-[4px] h-[4px] rounded-full bg-zinc-600/70 ring-1 ring-zinc-500/20" />
          </div>

          {/* Screen — 16:10 */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: "16/10", borderRadius: "10px" }}
          >
            {/* Gradient fill */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />

            {/* Browser chrome */}
            <div className="absolute inset-x-0 top-0 z-20 bg-black/40 backdrop-blur-sm flex items-center px-3 gap-2" style={{ height: "20px" }}>
              <div className="flex gap-[5px]">
                <div className="w-[8px] h-[8px] rounded-full bg-[#ff5f57]" />
                <div className="w-[8px] h-[8px] rounded-full bg-[#febc2e]" />
                <div className="w-[8px] h-[8px] rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 bg-black/20 rounded-[3px] px-2 text-[7px] font-mono text-white/35 truncate text-center">
                {project.url}
              </div>
            </div>

            {/* Project name */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-4">
              <p className="text-white/40 text-[7px] font-mono tracking-[0.2em] uppercase mb-1.5">
                {project.tagline}
              </p>
              <h3 className="text-white font-bold text-[16px] text-center leading-snug drop-shadow-lg">
                {project.name}
              </h3>
            </div>

            {/* Glare */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Hinge — 2 px hairline, bleeds 4 px either side */}
        <div style={{ height: "2px", background: "#111113", margin: "0 -4px" }} />

        {/* Chassis bottom — 10 px, wider than lid */}
        <div
          className="flex items-center justify-center shadow-[0_6px_18px_rgba(0,0,0,0.55)]"
          style={{
            height: "10px",
            background: "#2c2c2e",
            margin: "0 -8px",
            borderRadius: "0 0 8px 8px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Vent dots */}
          <div className="flex gap-[3px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-px h-[4px] rounded-full bg-white/10" />
            ))}
          </div>
        </div>

        {/* Desk shadow */}
        <div className="h-2 bg-black/20 rounded-full mx-10 mt-1 blur-lg" />
      </Link>

      {/* ── Description ───────────────────────────────────────────────── */}
      <div className="mt-7 text-center max-w-[300px] space-y-3">
        <h3 className="text-base font-semibold text-foreground">{project.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Here are some of my recent projects — each one built with intention,
          from architecture decisions to the final deploy.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 justify-items-center">
          {PROJECTS.map((project) => (
            <LaptopCard key={project.name} project={project} />
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <a
            href="/projects"
            className="px-8 py-3 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 font-medium"
          >
            View All Projects →
          </a>
        </div>
      </div>
    </section>
  );
};
