import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  FileText, Download, Mail, MapPin,
  Github, Linkedin, ArrowLeft, Calendar,
  Briefcase, GraduationCap, Wrench, Award, ExternalLink,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA — sourced directly from the resume PDF
───────────────────────────────────────────── */
const CONTACT = [
  { icon: Mail,    label: "amriteshsahu96@gmail.com", href: "mailto:amriteshsahu96@gmail.com" },
  { icon: MapPin,  label: "Bengaluru, India",          href: null },
  { icon: Github,  label: "GitHub",                    href: "https://github.com/Amritesh-co" },
  { icon: Linkedin,label: "LinkedIn",                  href: "https://www.linkedin.com/in/amriteshsahu/" },
];

const EDUCATION = [
  {
    degree: "B.E. in Data Science",
    institution: "RV College of Engineering, Bengaluru",
    period: "2023 – Present",
  },
  {
    degree: "Class XII (CBSE)",
    institution: "Delhi Public School, Ranchi",
    period: "2022",
  },
];

const SKILLS = [
  { label: "Languages",           items: ["Java", "Python", "JavaScript"] },
  { label: "Frontend",            items: ["React", "Next.js", "Vite", "HTML", "CSS"] },
  { label: "Backend",             items: ["Node.js", "Express", "FastAPI", "Flask"] },
  { label: "Databases & Storage", items: ["MongoDB", "MySQL", "Redis", "localStorage"] },
  { label: "AI / ML",             items: ["Scikit-learn", "TensorFlow Lite", "CNNs", "LSTM", "Transfer Learning", "RAG"] },
  { label: "Systems & Tools",     items: ["Ollama", "REST APIs", "ReadableStream", "Git", "Vercel", "Firebase", "Google Earth Engine"] },
];

const PROJECTS = [
  {
    name: "Gemma UI — Local LLM Interaction Interface",
    stack: "React · Vite · Ollama · Gemma 4 · D2 WASM",
    bullets: [
      "Built a fully local LLM interface using React and Vite integrated with Gemma 4 via Ollama (no cloud dependency).",
      "Implemented streaming responses using fetch and ReadableStream for real-time token-level output rendering.",
      "Designed document ingestion pipeline (PDF, DOCX, PPTX) using Node.js to enable RAG-style querying over user files.",
      "Integrated D2 (WebAssembly) to generate and render system diagrams from model output.",
      "Resolved React state race conditions during streaming using refs and controlled updates.",
      "Developed local persistence with conversation history, search, and editing using browser storage.",
    ],
  },
  {
    name: "Multi-Agent Medical Assistant — AI-Powered Healthcare System",
    stack: "LangGraph · FastAPI · PyTorch · Qdrant · Docker",
    bullets: [
      "Developed a multi-agent medical assistant using LangGraph and FastAPI with intelligent routing across RAG, web search, and medical imaging agents.",
      "Built an advanced hybrid RAG pipeline with Qdrant vector database, semantic chunking, BM25 retrieval, and cross-encoder re-ranking for medical literature search.",
      "Integrated deep learning models for chest X-ray disease detection, skin lesion classification, and brain MRI tumor analysis using PyTorch.",
      "Implemented voice-enabled interaction with speech-to-text and ElevenLabs text-to-speech integration for accessible medical assistance.",
      "Designed a human-in-the-loop validation workflow and safety guardrails system for secure and reliable AI-assisted medical analysis.",
      "Deployed using Docker and FastAPI with support for real-time image uploads, session management, and scalable API endpoints.",
    ],
  },
  {
    name: "Woodcraft Furniture Store — Full-Stack E-Commerce & ERP Platform",
    stack: "Next.js · MongoDB · Redis · NextAuth.js · Recharts",
    bullets: [
      "Built full-stack platform using Next.js, MongoDB, and Redis combining storefront with internal ERP.",
      "Designed order pipeline covering cart, checkout, inventory updates, and automated invoice generation.",
      "Implemented role-based authentication (NextAuth.js) and Redis-based rate limiting for API protection.",
      "Developed admin dashboards for sales, orders, and analytics using Recharts.",
      "Engineered inventory tracking system with audit logs for consistency across operations.",
    ],
  },
];

const LEADERSHIP = [
  {
    role: "International Services Director",
    org: "Rotaract Club of RVCE",
    period: "2025 – 2026",
    bullets: [
      "Led cross-club collaborations and managed international partnerships.",
      "Coordinated events and strengthened community engagement initiatives.",
    ],
  },
];

const ACHIEVEMENTS = [
  "Awarded Rotaractor of the Year (2024–2025) for outstanding dedication and service.",
  "Strong foundation in Data Structures and Algorithms.",
  "Active contributor to technical projects and hackathons.",
];

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
function SectionHeading({ icon: Icon, children }) {
  return (
    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] font-mono text-primary border-b border-primary/20 pb-2.5 mb-4">
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {children}
    </h3>
  );
}

function Tag({ label }) {
  return (
    <span className="text-[10px] px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 font-mono">
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export const Resume = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          .resume-sheet, .resume-sheet * { text-align: left !important; }
          @media print {
            body { background: #fff !important; color: #111 !important; }
            nav, footer, .print-hide { display: none !important; }
            main { padding-top: 0 !important; padding-bottom: 0 !important; }
            .resume-sheet {
              border: none !important; box-shadow: none !important;
              background: white !important; border-radius: 0 !important;
              max-width: 100% !important;
            }
            .resume-sheet * { color: #111 !important; border-color: #d1d5db !important; }
            .skill-tag { background: #f3f4f6 !important; color: #111 !important; border: 1px solid #e5e7eb !important; }
          }
        `
      }} />

      <Navbar />

      <main className="relative z-10 pt-24 pb-16">

          {/* ── top bar ── */}
          <div className="flex items-center justify-between mb-0 px-6 md:px-12 pb-4 border-b border-border/10 print-hide">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-zinc-900/50 border border-border/20 px-3 py-1.5 rounded-lg">
                <FileText className="h-3.5 w-3.5 text-primary" />
                Amritesh_Sahu_Resume
              </span>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 cursor-pointer"
              >
                <Download className="h-4 w-4" />
                Save PDF
              </button>
            </div>
          </div>

          {/* ── resume sheet ── */}
          <div className="resume-sheet overflow-hidden">

            {/* ── HEADER ── */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-b border-border/10 px-6 md:px-12 py-10">
              <div className="flex items-center gap-8">
                {/* Profile photo */}
                <div className="shrink-0 relative">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full ring-2 ring-primary/60 ring-offset-2 ring-offset-zinc-900 overflow-hidden shadow-xl shadow-primary/20">
                    <img
                      src="/profile.png"
                      alt="Amritesh Sahu"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  {/* Online dot */}
                  <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-zinc-900" />
                </div>

                {/* Name + subtitle + contacts */}
                <div className="flex-1 min-w-0 space-y-3">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                      Amritesh Sahu
                    </h1>
                    <p className="text-sm md:text-base font-mono text-primary font-medium tracking-wide mt-1.5">
                      Data Science Undergraduate — AI/ML + Backend Systems — LeetCode Enthusiast
                    </p>
                  </div>
                  {/* Contact row */}
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 pt-1 border-t border-white/10">
                    {CONTACT.map(({ icon: Icon, label, href }) =>
                      href ? (
                        <a
                          key={label}
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm font-mono text-slate-400 hover:text-primary transition-colors"
                        >
                          <Icon className="h-3 w-3 shrink-0 text-primary/70" />
                          {label}
                          {href.startsWith("http") && <ExternalLink className="h-2.5 w-2.5 opacity-50" />}
                        </a>
                      ) : (
                        <span key={label} className="flex items-center gap-1.5 text-sm font-mono text-slate-400">
                          <Icon className="h-3 w-3 shrink-0 text-primary/70" />
                          {label}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── BODY ── */}
            <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] divide-y md:divide-y-0 md:divide-x divide-border/10">

              {/* ── LEFT SIDEBAR ── */}
              <aside className="px-6 md:px-10 py-8 space-y-8 bg-zinc-950/30">

                {/* Education */}
                <section>
                  <SectionHeading icon={GraduationCap}>Education</SectionHeading>
                  <div className="space-y-4">
                    {EDUCATION.map((e) => (
                      <div key={e.degree}>
                        <p className="text-base font-bold text-slate-200 leading-snug">{e.degree}</p>
                        <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{e.institution}</p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground/60 font-mono mt-1">
                          <Calendar className="h-2.5 w-2.5 shrink-0" />{e.period}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <SectionHeading icon={Wrench}>Skills</SectionHeading>
                  <div className="space-y-3">
                    {SKILLS.map(({ label, items }) => (
                      <div key={label}>
                        <p className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider mb-1.5">{label}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {items.map((s) => (
                            <span
                              key={s}
                              className="skill-tag text-xs px-2.5 py-0.5 rounded bg-zinc-900/80 border border-border/20 font-mono text-slate-300"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Achievements */}
                <section>
                  <SectionHeading icon={Award}>Achievements</SectionHeading>
                  <ul className="space-y-2.5">
                    {ACHIEVEMENTS.map((a, i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                        <span className="text-primary shrink-0 mt-0.5">▸</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </section>

              </aside>

              {/* ── RIGHT MAIN ── */}
              <div className="px-6 md:px-10 py-8 space-y-8">

                {/* Projects */}
                <section>
                  <SectionHeading icon={Briefcase}>Projects</SectionHeading>
                  <div className="space-y-6">
                    {PROJECTS.map((p) => (
                      <div key={p.name} className="space-y-2">
                        <div>
                          <h4 className="text-base font-bold text-slate-200 leading-snug">{p.name}</h4>
                          <span className="inline-block mt-1 text-xs font-mono text-primary/70 bg-primary/5 px-2.5 py-0.5 rounded-full">
                            {p.stack}
                          </span>
                        </div>
                        <ul className="space-y-1 pl-3 border-l border-border/10">
                          {p.bullets.map((b, i) => (
                            <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                              <span className="text-primary/50 shrink-0 mt-[3px]">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Leadership */}
                <section>
                  <SectionHeading icon={Briefcase}>Leadership</SectionHeading>
                  <div className="space-y-5">
                    {LEADERSHIP.map((l) => (
                      <div key={l.role} className="space-y-2">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div>
                            <h4 className="text-base font-bold text-slate-200">{l.role}</h4>
                            <p className="text-sm text-muted-foreground mt-0.5">{l.org}</p>
                          </div>
                          <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground/60 shrink-0">
                            <Calendar className="h-2.5 w-2.5" />{l.period}
                          </span>
                        </div>
                        <ul className="space-y-1 pl-3 border-l border-border/10">
                          {l.bullets.map((b, i) => (
                            <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                              <span className="text-primary/50 shrink-0 mt-[3px]">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

              </div>

            </div>
          </div>


      </main>

      <Footer />
    </div>
  );
};
