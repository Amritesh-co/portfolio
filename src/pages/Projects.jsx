import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PROJECTS } from "../data/projects";
import { CodeFragmentsCanvas } from "../components/CodeFragmentsCanvas";

function LaptopCard({ project }) {
  return (
    <div className="flex flex-col items-center group">
      {/* Clickable MacBook mockup */}
      <Link to={`/projects/${project.slug}`} className="w-full max-w-[340px] cursor-pointer">
        <div
          className="relative border border-white/[0.07] shadow-[0_20px_56px_rgba(0,0,0,0.7)] group-hover:shadow-[0_20px_72px_rgba(139,92,246,0.4)] transition-shadow duration-500"
          style={{ background: "#1e1e20", padding: "2px", borderRadius: "14px" }}
        >
          {/* Camera dot */}
          <div className="flex justify-center" style={{ height: "6px", alignItems: "center" }}>
            <div className="w-[4px] h-[4px] rounded-full bg-zinc-600/70 ring-1 ring-zinc-500/20" />
          </div>

          {/* Screen */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: "16/10", borderRadius: "10px" }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} group-hover:brightness-110 transition-[filter] duration-300`} />

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

            <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Hinge */}
        <div style={{ height: "2px", background: "#111113", margin: "0 -4px" }} />

        {/* Chassis */}
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
          <div className="flex gap-[3px]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-px h-[4px] rounded-full bg-white/10" />
            ))}
          </div>
        </div>

        <div className="h-2 bg-black/20 rounded-full mx-10 mt-1 blur-lg" />
      </Link>

      {/* Description */}
      <div className="mt-7 text-center max-w-[320px] space-y-3">
        <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
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
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1 text-xs text-primary hover:underline font-mono"
          >
            View on GitHub →
          </a>
        )}
      </div>
    </div>
  );
}

export const Projects = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <CodeFragmentsCanvas />
      <Navbar />
      <main className="relative z-10 pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            My <span className="text-primary">Projects</span>
          </h1>
          <p className="text-center text-muted-foreground mb-20 max-w-2xl mx-auto">
            A collection of things I've built — from local AI systems to full-stack platforms.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 justify-items-center">
            {PROJECTS.map((project) => (
              <LaptopCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
