import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { 
  FileText, 
  Download, 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  ArrowLeft,
  Calendar,
  Briefcase,
  GraduationCap,
  Wrench,
  Award
} from "lucide-react";

export const Resume = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* CSS print overrides scoped to this page */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background: white !important;
            color: #111827 !important;
            font-size: 12px !important;
          }
          nav, footer, .print-hide {
            display: none !important;
          }
          main {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .resume-container {
            border: none !important;
            box-shadow: none !important;
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            color: #111827 !important;
          }
          .print-text-slate {
            color: #1f2937 !important;
          }
          .print-text-muted {
            color: #4b5563 !important;
          }
          .print-border-muted {
            border-color: #d1d5db !important;
          }
          .print-tag {
            background-color: #f3f4f6 !important;
            color: #1f2937 !important;
            border: 1px solid #e5e7eb !important;
          }
          .print-accent {
            color: #0d9488 !important; /* Teal print accent */
          }
          .print-section {
            page-break-inside: avoid;
          }
        }
      `}} />

      <Navbar />

      <main className="relative z-10 pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 mb-8 print-hide"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Action Header Panel */}
          <div className="flex justify-between items-center bg-zinc-900/40 border border-border/20 py-4 px-6 mb-8 rounded-2xl backdrop-blur-sm print-hide">
            <div className="flex items-center gap-2.5">
              <FileText className="text-primary h-5 w-5" />
              <span className="text-sm font-mono text-slate-300">Amritesh_Sahu_Resume.pdf</span>
            </div>
            <button 
              onClick={() => window.print()} 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-all text-sm cursor-pointer shadow-lg shadow-primary/20"
            >
              <Download className="h-4 w-4" /> Print / Save PDF
            </button>
          </div>

          {/* Resume Sheet Container */}
          <div className="resume-container bg-card border border-border/20 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col gap-10">
            
            {/* 1. Header Information */}
            <div className="border-b border-border/10 pb-8 print-border-muted flex flex-col md:flex-row md:justify-between md:items-end gap-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tight print-text-slate">
                  Amritesh Sahu
                </h1>
                <p className="text-lg font-mono text-primary font-semibold tracking-wider print-accent">
                  AI/ML & Backend Software Engineer
                </p>
              </div>

              {/* Contact details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-col gap-2.5 text-xs text-muted-foreground font-mono print-text-muted">
                <a href="mailto:amriteshsahu96@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="h-3.5 w-3.5 text-primary print-accent" /> amriteshsahu96@gmail.com
                </a>
                <span className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary print-accent" /> Bengaluru, India
                </span>
                <a href="https://github.com/Amritesh-co" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Github className="h-3.5 w-3.5 text-primary print-accent" /> github.com/Amritesh-co
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Linkedin className="h-3.5 w-3.5 text-primary print-accent" /> linkedin.com
                </a>
              </div>
            </div>

            {/* 2. Professional Summary */}
            <div className="print-section space-y-3">
              <h2 className="text-lg font-bold uppercase tracking-widest font-mono text-primary border-b border-border/10 pb-2 print-accent print-border-muted">
                Professional Profile
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed text-justify print-text-muted">
                Aspiring software engineer focusing on AI/ML workflows, multi-agent orchestrations, and scalable backend services. Experienced in building robust pipelines that bridge the gap between research-level machine learning models and high-performance production code. Actively seeking internship opportunities where I can apply my skills in backend engineering, database optimization, and local LLM architectures.
              </p>
            </div>

            {/* Main two columns */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Skills & Education */}
              <div className="md:col-span-4 space-y-8">
                
                {/* Education */}
                <div className="print-section space-y-4">
                  <h3 className="text-base font-bold uppercase tracking-widest font-mono text-primary border-b border-border/10 pb-2 print-accent print-border-muted flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" /> Education
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <h4 className="font-bold text-slate-200 print-text-slate text-sm">
                        B.E. in Data Science
                      </h4>
                      <p className="text-muted-foreground print-text-muted font-medium">
                        RV College of Engineering
                      </p>
                      <p className="text-[10px] text-muted-foreground/60 font-mono mt-1 flex items-center gap-1.5 print-text-muted">
                        <Calendar className="h-3 w-3" /> Expected 2027
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="print-section space-y-4">
                  <h3 className="text-base font-bold uppercase tracking-widest font-mono text-primary border-b border-border/10 pb-2 print-accent print-border-muted flex items-center gap-2">
                    <Wrench className="h-4 w-4" /> Skills
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Languages */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-mono font-bold text-slate-300 print-text-slate">Languages</span>
                      <div className="flex flex-wrap gap-1">
                        {["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL"].map((s) => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-900 border border-border/10 font-mono print-tag">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* AI / ML */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-mono font-bold text-slate-300 print-text-slate">AI & ML</span>
                      <div className="flex flex-wrap gap-1">
                        {["LangGraph", "PyTorch", "Qdrant", "TensorFlow", "Pandas", "NumPy"].map((s) => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-900 border border-border/10 font-mono print-tag">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* Frameworks */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-mono font-bold text-slate-300 print-text-slate">Frameworks</span>
                      <div className="flex flex-wrap gap-1">
                        {["FastAPI", "Node.js", "Express", "React", "Next.js"].map((s) => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-900 border border-border/10 font-mono print-tag">{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* Developer Tools */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-mono font-bold text-slate-300 print-text-slate">Infra & Tools</span>
                      <div className="flex flex-wrap gap-1">
                        {["Docker", "Ubuntu Linux", "Cloudflare", "Tailscale", "Git", "PostgreSQL", "MongoDB", "Redis"].map((s) => (
                          <span key={s} className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-900 border border-border/10 font-mono print-tag">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="print-section space-y-4">
                  <h3 className="text-base font-bold uppercase tracking-widest font-mono text-primary border-b border-border/10 pb-2 print-accent print-border-muted flex items-center gap-2">
                    <Award className="h-4 w-4" /> Awards
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div>
                      <h4 className="font-bold text-slate-200 print-text-slate">
                        Rotaractor of the Year
                      </h4>
                      <p className="text-muted-foreground print-text-muted">
                        Rotaract Club of RVCE (2024-25)
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Projects & Experience */}
              <div className="md:col-span-8 space-y-8">
                
                {/* Projects Section */}
                <div className="print-section space-y-4">
                  <h3 className="text-base font-bold uppercase tracking-widest font-mono text-primary border-b border-border/10 pb-2 print-accent print-border-muted flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Selected Projects
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Project 1 */}
                    <div className="space-y-2 text-xs">
                      <div className="flex flex-wrap justify-between items-baseline gap-2">
                        <h4 className="text-sm font-bold text-slate-200 print-text-slate">
                          Multi-Agent Medical Assistant
                        </h4>
                        <span className="text-[10px] font-mono text-muted-foreground/60 print-text-muted">
                          LangGraph · FastAPI · PyTorch · Qdrant
                        </span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-muted-foreground leading-relaxed print-text-muted">
                        <li>Developed a multi-agent AI assistant orchestrating query routing between RAG, Tavily web search, and medical image classifiers.</li>
                        <li>Configured a hybrid RAG pipeline with Qdrant vector store, BM25 keyword search, and Cross-Encoder re-ranking.</li>
                        <li>Built deep learning models using PyTorch to analyze chest X-ray and brain MRI scans, executing log-probability gating for confidence checks.</li>
                      </ul>
                    </div>

                    {/* Project 2 */}
                    <div className="space-y-2 text-xs">
                      <div className="flex flex-wrap justify-between items-baseline gap-2">
                        <h4 className="text-sm font-bold text-slate-200 print-text-slate">
                          openClaw Swarm
                        </h4>
                        <span className="text-[10px] font-mono text-muted-foreground/60 print-text-muted">
                          Node.js · Ollama · MCP · YAML
                        </span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-muted-foreground leading-relaxed print-text-muted">
                        <li>Designed a local-first multi-agent AI framework letting specialized agents execute tasks in parallel without cloud dependencies.</li>
                        <li>Integrated Model Context Protocol (MCP) to supply LLMs with direct access to local system files, codebases, and databases.</li>
                        <li>Built an interactive browser-based dashboard and API adapters for Slack, Discord, and Telegram integration.</li>
                      </ul>
                    </div>

                    {/* Project 3 */}
                    <div className="space-y-2 text-xs">
                      <div className="flex flex-wrap justify-between items-baseline gap-2">
                        <h4 className="text-sm font-bold text-slate-200 print-text-slate">
                          Woodcraft Store & ERP
                        </h4>
                        <span className="text-[10px] font-mono text-muted-foreground/60 print-text-muted">
                          Next.js · Redis · MongoDB · NextAuth
                        </span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-muted-foreground leading-relaxed print-text-muted">
                        <li>Created a full-stack e-commerce storefront coupled with an internal Enterprise Resource Planning (ERP) database.</li>
                        <li>Implemented secure, role-based admin routing, Redis API rate limiting, and analytics graphs with Recharts.</li>
                      </ul>
                    </div>

                    {/* Project 4 */}
                    <div className="space-y-2 text-xs">
                      <div className="flex flex-wrap justify-between items-baseline gap-2">
                        <h4 className="text-sm font-bold text-slate-200 print-text-slate">
                          Gemma UI
                        </h4>
                        <span className="text-[10px] font-mono text-muted-foreground/60 print-text-muted">
                          React · Vite · Ollama · D2 (WASM)
                        </span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-muted-foreground leading-relaxed print-text-muted">
                        <li>Developed a fast local chat client interface for Gemma 4 models running locally on Ollama via ReadableStream API.</li>
                        <li>Integrated web-assembly D2 diagram compilers to dynamically render architecture flowcharts from model responses.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Leadership / Experience */}
                <div className="print-section space-y-4">
                  <h3 className="text-base font-bold uppercase tracking-widest font-mono text-primary border-b border-border/10 pb-2 print-accent print-border-muted flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Leadership & Experience
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2 text-xs">
                      <div className="flex flex-wrap justify-between items-baseline gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-200 print-text-slate">
                            International Services Director
                          </h4>
                          <p className="text-muted-foreground print-text-muted font-medium">
                            Rotaract Club of RVCE
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground/60 print-text-muted">
                          Bengaluru · 2024 – Present
                        </span>
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-muted-foreground leading-relaxed print-text-muted">
                        <li>Leading international service projects, youth exchanges, and global community development projects.</li>
                        <li>Orchestrated cross-chapter collaboration campaigns for educational outreach and sustainability initiatives.</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
