import { useState, useEffect } from "react";
import { FlowDiagram } from "../components/FlowDiagram";
import {
  siHuggingface, siElevenlabs, siMongoose, siUpstash, siCloudinary,
  siGithubactions, siVitest, siChakraui, siGoogleearthengine, siLeaflet,
  siYaml, siMistralai, siQwen, siShadcnui, siGithubpages, siFramer, siRadixui,
} from "simple-icons";


/* ──────────────────────────────────────────────────────────────
   Local SVG logos from /public/logos/ (served at /logos/)
   Priority: local file → simple-icons → text fallback
─────────────────────────────────────────────────────────────── */
const LOCAL_LOGO = {
  Python:               "/logos/python.svg",
  FastAPI:              "/logos/fastapi.svg",
  Docker:               "/logos/docker.svg",
  LangChain:            "/logos/langchain.svg",
  LangGraph:            "/logos/langgraph.svg",
  PyTorch:              "/logos/pytorch.svg",
  Ollama:               "/logos/ollama.svg",
  Qdrant:               "/logos/qdrant.svg",
  "Node.js":            "/logos/nodejs.svg",
  "Next.js":            "/logos/nextjs.svg",
  React:                "/logos/react.svg",
  MongoDB:              "/logos/mongodb.svg",
  Redis:                "/logos/redis.svg",
  "Upstash Redis":      "/logos/redis.svg",
  "Tailwind CSS":       "/logos/tailwindcss.svg",
  TypeScript:           "/logos/typescript.svg",
  Vite:                 "/logos/vite.svg",
  Express:              "/logos/express.svg",
  JavaScript:           "/logos/javascript.svg",
  HTML5:                "/logos/html5.svg",
  CSS:                  "/logos/css3.svg",
  Pandas:               "/logos/pandas.svg",
  "Azure OpenAI":       "/logos/openai.svg",
  GitHub:               "/logos/github.svg",
  "GitHub Actions":     "/logos/github.svg",
  "GitHub Pages":       "/logos/github.svg",
  Linux:                "/logos/linux.svg",
  Ubuntu:               "/logos/ubuntu.svg",
  Tailscale:            "/logos/tailscale.svg",
  Cloudflare:           "/logos/cloudflare.svg",
  Nextcloud:            "/logos/nextcloud.svg",
};

/* simple-icons fallback for techs without a local file */
const SI_MAP = {
  HuggingFace:          siHuggingface,
  ElevenLabs:           siElevenlabs,
  Mongoose:             siMongoose,
  "Upstash Redis":      siUpstash,
  Cloudinary:           siCloudinary,
  Vitest:               siVitest,
  "Chakra UI":          siChakraui,
  "Google Earth Engine":siGoogleearthengine,
  Leaflet:              siLeaflet,
  YAML:                 siYaml,
  Mistral:              siMistralai,
  Qwen:                 siQwen,
  "shadcn/ui":          siShadcnui,
  "Framer Motion":      siFramer,
  "Radix UI":           siRadixui,
  "GitHub Actions":     siGithubactions,
  "GitHub Pages":       siGithubpages,
};

/* Lighten very dark brand colours for dark-theme legibility */
function displayHex(raw) {
  const r = parseInt(raw.slice(0, 2), 16);
  const g = parseInt(raw.slice(2, 4), 16);
  const b = parseInt(raw.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum < 0.2 ? "E0E0E0" : raw;
}

const TechLogo = ({ name }) => {
  const localSrc = LOCAL_LOGO[name];
  const siIcon   = SI_MAP[name];

  if (localSrc) {
    return (
      <div title={name} className="flex flex-col items-center gap-1.5 group cursor-default">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl border border-border/40 bg-muted/20 group-hover:bg-muted/40 group-hover:border-border/70 transition-all duration-200 p-2">
          <img src={localSrc} alt={name} className="w-full h-full object-contain" />
        </div>
        <span className="text-[9px] text-muted-foreground/55 font-mono text-center max-w-[56px] leading-tight">{name}</span>
      </div>
    );
  }

  if (siIcon) {
    const hex = displayHex(siIcon.hex);
    const coloredSvg = siIcon.svg.replace("<svg ", `<svg width="28" height="28" fill="#${hex}" `);
    return (
      <div title={name} className="flex flex-col items-center gap-1.5 group cursor-default">
        <div
          className="w-12 h-12 flex items-center justify-center rounded-xl border border-border/40 bg-muted/20 group-hover:bg-muted/40 group-hover:border-border/70 transition-all duration-200"
          dangerouslySetInnerHTML={{ __html: coloredSvg }}
        />
        <span className="text-[9px] text-muted-foreground/55 font-mono text-center max-w-[56px] leading-tight">{name}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl border border-border/40 bg-muted/30 px-1">
        <span className="text-[9px] font-mono text-muted-foreground text-center leading-tight">{name}</span>
      </div>
      <span className="text-[9px] text-muted-foreground/50 font-mono text-center max-w-[56px] leading-tight">{name}</span>
    </div>
  );
};

const TechStack = ({ items }) => (
  <div className="flex flex-wrap gap-4">
    {items.map((name) => <TechLogo key={name} name={name} />)}
  </div>
);

const Section = ({ title, children }) => (
  <div className="space-y-3">
    <h2 className="text-lg font-semibold text-foreground border-b border-border/40 pb-2">{title}</h2>
    {children}
  </div>
);

const Features = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {items.map((f, i) => (
      <div
        key={i}
        className="flex gap-3 items-start rounded-xl border border-border/40 bg-muted/20 px-4 py-3 hover:bg-muted/35 transition-colors"
      >
        <span className="shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary text-[10px] font-bold">
          {i + 1}
        </span>
        <span className="text-sm text-muted-foreground leading-relaxed">{f}</span>
      </div>
    ))}
  </div>
);

/* Accent colour aliases (used in node `c` props) */
const emerald = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
const violet  = "border-violet-500/50  bg-violet-500/10  text-violet-300";
const amber   = "border-amber-500/50   bg-amber-500/10   text-amber-300";
const indigo  = "border-indigo-500/50  bg-indigo-500/10  text-indigo-300";
const cyan    = "border-cyan-500/50    bg-cyan-500/10    text-cyan-300";
const red     = "border-red-500/50     bg-red-500/10     text-red-300";
const pink    = "border-pink-500/50    bg-pink-500/10    text-pink-300";
const green   = "border-green-500/50   bg-green-500/10   text-green-300";
const muted   = "border-border/50 bg-muted/40 text-muted-foreground";
const sky     = "border-sky-500/50     bg-sky-500/10     text-sky-300";

/* Helper: build typed flowNode */
const n = (id, label, sub, c) => ({ id, type: 'flowNode', data: { label, sub, c } });
/* Helper: build edge */
const e = (id, source, target, label) => ({ id, source, target, ...(label ? { label } : {}) });

/* ══════════════════════════════════════════════════════════════
   PROJECT CONTENT — keyed by slug
══════════════════════════════════════════════════════════════ */
export const PROJECT_CONTENT = {

  /* ── 1. Multi-Agent Medical Assistant ─────────────────────── */
  "multi-agent-medical-assistant": () => (
    <div className="space-y-10 text-muted-foreground">

      <Section title="Overview">
        <p className="text-sm leading-relaxed">
          A production-grade AI medical assistant that routes queries across four specialised agents
          orchestrated by a LangGraph state machine. The system supports text, voice, and medical
          image inputs. A hybrid RAG pipeline (Qdrant + BM25 + cross-encoder reranking) answers
          knowledge-base questions, while a Tavily web-search agent handles real-time research.
          A PyTorch imaging agent classifies chest X-rays, brain tumours, and skin lesions. Every
          response passes a log-probability confidence gate — low-confidence RAG answers
          automatically escalate to the web-search agent. ElevenLabs TTS delivers spoken responses,
          and a Human-in-the-Loop NodeInterrupt step lets a medical professional validate imaging
          diagnoses before delivery.
        </p>
      </Section>

      <Section title="API Surface (FastAPI · Uvicorn)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
          {[
            { method: "GET",  path: "/",              desc: "Serve main UI (HTMLResponse + Jinja2)" },
            { method: "GET",  path: "/health",         desc: "Docker health check endpoint" },
            { method: "POST", path: "/chat",           desc: "Multi-agent query — QueryRequest{query, conversation_history[]}" },
            { method: "POST", path: "/upload-image",   desc: "Medical image analysis — PNG/JPG multipart" },
            { method: "POST", path: "/voice",          desc: "TTS — SpeechRequest{text, voice_id} → ElevenLabs audio stream" },
          ].map(({ method, path, desc }) => (
            <div key={path} className={`rounded-lg border px-3 py-2 ${method === "GET" ? sky : emerald}`}>
              <span className="font-bold mr-2">{method}</span>
              <span className="opacity-80">{path}</span>
              <div className="text-[10px] opacity-50 mt-0.5">{desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="System Architecture">
        <div className="space-y-6">
          {/* end-to-end agent orchestration flow */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              end-to-end agent orchestration flow
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/multi-agent-medical-assistant/orchestration.svg"
                alt="end-to-end agent orchestration flow"
                style={{ width: '100%', maxWidth: '723px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* RAG ingestion pipeline */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              RAG ingestion pipeline (ingest_rag_data.py)
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/multi-agent-medical-assistant/ingestion.svg"
                alt="RAG ingestion pipeline"
                style={{ width: '100%', maxWidth: '722px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* confidence-based agent handoff */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              confidence-based agent handoff
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/multi-agent-medical-assistant/handoff.svg"
                alt="confidence-based agent handoff"
                style={{ width: '100%', maxWidth: '495px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="LLM Configuration">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className={`rounded-lg border p-3 ${emerald}`}>
            <div className="font-bold mb-1">Azure OpenAI (production)</div>
            <div className="opacity-70">Completion: gpt-4o</div>
            <div className="opacity-70">Embeddings: text-embedding-ada-002</div>
            <div className="opacity-70">Qdrant: server-based (QDRANT_URL)</div>
          </div>
          <div className={`rounded-lg border p-3 ${muted}`}>
            <div className="font-bold mb-1">Local Ollama (dev)</div>
            <div className="opacity-70">Completion: gemma4 / llama3</div>
            <div className="opacity-70">Embeddings: OllamaEmbeddings</div>
            <div className="opacity-70">Qdrant: local (./data/qdrant_db)</div>
          </div>
        </div>
      </Section>

      <Section title="Tech Stack">
        <TechStack items={["Python","FastAPI","LangGraph","LangChain","Qdrant","PyTorch","HuggingFace","ElevenLabs","Docker","Azure OpenAI"]} />
      </Section>

      <Section title="Key Features">
        <Features items={[
          "LangGraph StateGraph with conditional_edges routes text/voice/image inputs to the correct specialist agent without manual dispatch logic.",
          "Docling v2.31 parses medical PDFs into text, structured tables, and image summaries — each modality is chunked and embedded separately in Qdrant.",
          "Hybrid Qdrant retrieval: dense float32 vectors (text-embedding-ada-002) fused with BM25 sparse keyword index via RRF; cross-encoder ms-marco-TinyBERT re-scores top-K chunks.",
          "Log-probability confidence gate: if mean token log-prob falls below threshold, the RAG agent automatically yields to Tavily web search, combining both sources.",
          "Three PyTorch CV models: brain tumour classification, chest X-ray classification, skin lesion segmentation — accepting PNG/JPG uploads.",
          "Human-in-the-Loop (HITL) NodeInterrupt pauses imaging agent output for medical professional review before the response is sent.",
          "LangChain guardrails in agents/guardrails/ validate input queries for medical relevance and output for safety before delivery.",
          "ElevenLabs TTS on POST /voice converts the final text response to audio; STT handles voice queries in reverse.",
          "Cookie-based session_id preserves conversation_history across requests; Docker health check on GET /health.",
          "Dual-mode config: Azure OpenAI + server-based Qdrant in production; local Ollama + disk Qdrant for zero-cost development.",
        ]} />
      </Section>
    </div>
  ),

  /* ── 2. openClaw Swarm ─────────────────────────────────────── */
  "openclaw-swarm": () => (
    <div className="space-y-10 text-muted-foreground">

      <Section title="Overview">
        <p className="text-sm leading-relaxed">
          A fully self-hosted, zero-cloud multi-agent AI framework built on the OpenClaw gateway.
          Five specialised agents — Commander, Researcher, Coder, Analyst, Writer — run on local LLMs
          (Qwen 3 8B, Qwen2.5-Coder 14B, Mistral 7B) via Ollama, communicate over WebSocket at
          ws://127.0.0.1:18789, and deliver results to any messaging platform you already use.
          An included Node.js Agent Manager Dashboard at localhost:9999 lets you create, configure,
          and wire agents from the browser. The entire team is declared in swarm.yaml; each agent
          gets a SOUL.md persona file, model assignment, and MCP tool permissions.
        </p>
      </Section>

      <Section title="Agent Roster">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          {[
            { agent: "COMMANDER",  model: "qwen3:8b",           role: "Orchestrator — task decomposition, delegation, result merging", color: violet },
            { agent: "RESEARCHER", model: "qwen3:8b",           role: "Web search (Brave), web fetch, data gathering", color: violet },
            { agent: "CODER",      model: "qwen2.5-coder:14b",  role: "Full-stack development — Read/Write/Bash/Grep tools", color: violet },
            { agent: "ANALYST",    model: "qwen2.5-coder:14b",  role: "CSV / JSON / log analysis, sqlite queries", color: violet },
            { agent: "WRITER",     model: "mistral:7b",          role: "Docs, emails, LaTeX, markdown reports", color: muted },
          ].map(({ agent, model, role, color }) => (
            <div key={agent} className={`rounded-lg border px-3 py-2 ${color}`}>
              <div className="font-bold">{agent}</div>
              <div className="opacity-60 text-[10px]">model: {model}</div>
              <div className="opacity-70 mt-0.5 leading-tight">{role}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="System Architecture">
        <div className="space-y-6">
          {/* full swarm topology */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              full swarm topology
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/openclaw-swarm/topology.svg"
                alt="full swarm topology"
                style={{ width: '100%', maxWidth: '744px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* request lifecycle — message to response */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              request lifecycle — message to response
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/openclaw-swarm/lifecycle.svg"
                alt="request lifecycle — message to response"
                style={{ width: '100%', maxWidth: '411px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* Agent Manager Dashboard */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              Agent Manager Dashboard (localhost:9999)
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/openclaw-swarm/dashboard.svg"
                alt="Agent Manager Dashboard"
                style={{ width: '100%', maxWidth: '686px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Configuration (swarm.yaml structure)">
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">

          {/* ── title bar ── */}
          <div className="flex items-center gap-2 bg-[#2d2d2d] px-4 py-2.5 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57] shrink-0" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e] shrink-0" />
            <span className="w-3 h-3 rounded-full bg-[#28c840] shrink-0" />
            <span className="ml-3 text-[11px] font-mono text-white/40 tracking-wide">
              zsh — openclaw-swarm — 120×40
            </span>
          </div>

          {/* ── terminal body: dangerouslySetInnerHTML guarantees exact whitespace ── */}
          <pre
            className="bg-[#0d0d0d] px-6 py-5 font-mono text-[12.5px] leading-[1.8] overflow-x-auto select-text text-left"
            dangerouslySetInnerHTML={{ __html:
`<span class="text-[#28c840]">amritesh</span><span class="text-white/40">@</span><span class="text-[#5ac8fa]">openclaw</span><span class="text-white/40"> ~/openclaw-swarm </span><span class="text-[#bf5af2]">‹main›</span><span class="text-white/60"> $</span><span class="text-white"> cat swarm.yaml</span>

<span class="text-[#5ac8fa]">swarm</span><span class="text-white/50">:</span>
<span class="text-white/50">  </span><span class="text-[#5ac8fa]">name</span><span class="text-white/50">:</span><span class="text-[#ff9f0a]"> openClaw-swarm</span>
<span class="text-white/50">  </span><span class="text-[#5ac8fa]">max_concurrent</span><span class="text-white/50">:</span><span class="text-[#ff453a]"> 5</span>
<span class="text-white/50">  </span><span class="text-[#5ac8fa]">agents</span><span class="text-white/50">:</span>

<span class="text-white/50">    </span><span class="text-[#28c840]">commander</span><span class="text-white/50">:</span>
<span class="text-white/50">      </span><span class="text-[#5ac8fa]">model</span><span class="text-white/50">:</span><span class="text-[#ff9f0a]"> "ollama/qwen3:8b"</span>
<span class="text-white/50">      </span><span class="text-[#5ac8fa]">soul</span><span class="text-white/50">:</span><span class="text-white/70"> agents/commander/SOUL.md</span>
<span class="text-white/50">      </span><span class="text-[#5ac8fa]">tools</span><span class="text-white/50">: [</span><span class="text-[#64d2ff]">Read, Write, WebSearch, WebFetch</span><span class="text-white/50">]</span>

<span class="text-white/50">    </span><span class="text-[#28c840]">coder</span><span class="text-white/50">:</span>
<span class="text-white/50">      </span><span class="text-[#5ac8fa]">model</span><span class="text-white/50">:</span><span class="text-[#ff9f0a]"> "ollama/qwen2.5-coder:14b"</span>
<span class="text-white/50">      </span><span class="text-[#5ac8fa]">soul</span><span class="text-white/50">:</span><span class="text-white/70"> agents/coder/SOUL.md</span>
<span class="text-white/50">      </span><span class="text-[#5ac8fa]">tools</span><span class="text-white/50">: [</span><span class="text-[#64d2ff]">Read, Write, Bash, Grep, filesystem-mcp</span><span class="text-white/50">]</span>

<span class="text-white/50">    </span><span class="text-[#28c840]">researcher</span><span class="text-white/50">:</span>
<span class="text-white/50">      </span><span class="text-[#5ac8fa]">model</span><span class="text-white/50">:</span><span class="text-[#ff9f0a]"> "ollama/qwen3:8b"</span>
<span class="text-white/50">      </span><span class="text-[#5ac8fa]">soul</span><span class="text-white/50">:</span><span class="text-white/70"> agents/researcher/SOUL.md</span>
<span class="text-white/50">      </span><span class="text-[#5ac8fa]">tools</span><span class="text-white/50">: [</span><span class="text-[#64d2ff]">brave-search-mcp, puppeteer-mcp</span><span class="text-white/50">]</span>

<span class="text-white/50">    </span><span class="text-[#28c840]">analyst</span><span class="text-white/50">:</span>
<span class="text-white/50">      </span><span class="text-[#5ac8fa]">model</span><span class="text-white/50">:</span><span class="text-[#ff9f0a]"> "ollama/qwen2.5-coder:14b"</span>
<span class="text-white/50">      </span><span class="text-[#5ac8fa]">soul</span><span class="text-white/50">:</span><span class="text-white/70"> agents/analyst/SOUL.md</span>
<span class="text-white/50">      </span><span class="text-[#5ac8fa]">tools</span><span class="text-white/50">: [</span><span class="text-[#64d2ff]">sqlite-mcp, filesystem-mcp</span><span class="text-white/50">]</span>

<span class="text-white/50">    </span><span class="text-[#28c840]">writer</span><span class="text-white/50">:</span>
<span class="text-white/50">      </span><span class="text-[#5ac8fa]">model</span><span class="text-white/50">:</span><span class="text-[#ff9f0a]"> "ollama/mistral:7b"</span>
<span class="text-white/50">      </span><span class="text-[#5ac8fa]">soul</span><span class="text-white/50">:</span><span class="text-white/70"> agents/writer/SOUL.md</span>
<span class="text-white/50">      </span><span class="text-[#5ac8fa]">tools</span><span class="text-white/50">: [</span><span class="text-[#64d2ff]">filesystem-mcp</span><span class="text-white/50">]</span>

<span class="text-[#28c840]">amritesh</span><span class="text-white/40">@</span><span class="text-[#5ac8fa]">openclaw</span><span class="text-white/40"> ~/openclaw-swarm </span><span class="text-[#bf5af2]">‹main›</span><span class="text-white/60"> $ </span><span style="display:inline-block;width:8px;height:1em;background:rgba(255,255,255,0.7);vertical-align:middle;animation:pulse 1s cubic-bezier(0.4,0,0.6,1) infinite"></span>`
            }}
          />

        </div>
      </Section>


      <Section title="Tech Stack">
        <TechStack items={["Node.js","Ollama","Qwen","Mistral","Express","YAML"]} />
      </Section>

      <Section title="Key Features">
        <Features items={[
          "Zero cloud dependency — all five LLMs run locally via Ollama with VRAM-persistent model loading; no API keys needed.",
          "Agent-to-agent communication via TeammateTool (13 operations: spawn, join, message, approve, shutdown, and more) over the OpenClaw WebSocket gateway.",
          "Agent Manager Dashboard (Express + React SPA at localhost:9999) provides full CRUD over swarm.yaml, SOUL.md persona files, and openclaw.json — no config editing by hand.",
          "MCP (Model Context Protocol) tool layer: filesystem (Read/Write/Bash/Grep), brave-search, memory (persistent KV), sqlite (structured queries), puppeteer (headless scraping).",
          "Skills system: Markdown-trigger files in skills/ automatically route specialised task patterns to the right agent without Commander involvement.",
          "Pipeline templates in templates/: research-pipeline.yaml (Researcher → Writer) and dev-team.yaml (Researcher → Coder → Analyst → Writer).",
          "Scheduled tasks via openclaw schedule create --cron syntax for automated daily briefings, reports, or monitoring tasks.",
          "Channel integrations: Telegram, Discord, Slack, WhatsApp, and a local TUI — all without changing agent or model code.",
          "max_concurrent: 5 in swarm.yaml allows up to five agents to execute simultaneously, controlled by the Commander's delegation strategy.",
        ]} />
      </Section>
    </div>
  ),

  /* ── 3. Woodcraft Store ────────────────────────────────────── */
  "woodcraft-store": () => (
    <div className="space-y-10 text-muted-foreground">

      <Section title="Overview">
        <p className="text-sm leading-relaxed">
          A full-stack furniture business platform combining a customer-facing storefront with an
          internal ERP system — built as a monolithic Next.js 16 App Router application. The
          customer side covers browsing, cart (React Context + localStorage), checkout, and order
          tracking. The admin side covers inventory management with audit logs, employee and
          attendance tracking, analytics (Recharts), automated PDF invoice generation (PDFKit),
          SMTP email delivery (Nodemailer), and full business settings — all behind NextAuth
          role-based middleware. Upstash Redis provides sliding-window rate limiting on all API
          routes; Cloudinary handles product image hosting.
        </p>
      </Section>

      <Section title="Full API Route Map">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10px] font-mono">
          {[
            ["POST", "/api/register",                    "User sign-up · rate: 5/hr"],
            ["*",    "/api/auth/[...nextauth]",          "NextAuth — Google OAuth + Credentials"],
            ["GET/POST", "/api/products",               "List all · Create product"],
            ["GET/PUT/DELETE", "/api/products/[id]",    "Single product CRUD"],
            ["POST",  "/api/upload",                    "Cloudinary image upload · rate: 10/hr"],
            ["GET/POST", "/api/orders",                 "All orders · Create order (auto-invoice)"],
            ["GET/PUT", "/api/orders/[id]",             "Order detail · Status update + retry-invoice"],
            ["POST", "/api/orders/[id]/invoice",        "Manual invoice PDF generation"],
            ["POST", "/api/orders/[id]/email-invoice",  "Send invoice PDF via SMTP email"],
            ["GET/POST", "/api/inventory",              "Stock levels · Manual adjustment"],
            ["PUT",  "/api/inventory/update",           "Bulk stock update + InventoryLog entry"],
            ["GET/POST/PUT/DELETE", "/api/employees",   "Employee CRUD"],
            ["GET/POST", "/api/attendance",             "Mark / query attendance records"],
            ["GET/POST", "/api/custom-inquiry",         "Custom furniture inquiry · rate: 3/hr"],
            ["GET/POST", "/api/contact",                "Contact form · rate: 3/hr"],
            ["GET",  "/api/admin/stats",                "KPI summary: revenue, orders, customers"],
            ["GET/PUT", "/api/admin/settings",          "GlobalSettings singleton CRUD"],
          ].map(([method, path, desc]) => (
            <div key={path} className={`rounded border px-2 py-1.5 ${method.includes("POST") || method.includes("PUT") || method.includes("DELETE") ? amber : muted}`}>
              <span className="font-bold opacity-70 mr-1.5">{method}</span>
              <span className="opacity-80">{path}</span>
              <div className="text-[9px] opacity-45 mt-0.5">{desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="System Architecture">
        <div className="space-y-6">
          {/* auth flow */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              request lifecycle — auth + validation + data layer
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/woodcraft-store/auth-flow.svg"
                alt="request lifecycle — auth + validation + data layer"
                style={{ width: '100%', maxWidth: '896px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* order flow */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              order creation → invoice → email flow
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/woodcraft-store/order-flow.svg"
                alt="order creation → invoice → email flow"
                style={{ width: '100%', maxWidth: '443px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="MongoDB Data Models">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          {[
            { name: "User",          fields: "name · email(unique) · password(hashed) · role(user|admin) · phone",                                                        color: amber },
            { name: "Product",       fields: "name · price · category · material · images[] · stock · sales · warranty · text-index(name/desc/category)",                 color: amber },
            { name: "Order",         fields: "orderId(unique DDMMYYYY+seq) · userId · customerInfo · products[] · total · status(pending→processing→shipped→delivered|cancelled)", color: amber },
            { name: "OrderSequence", fields: "dateKey(DDMMYYYY, unique) · sequence — daily counter for orderId",                                                          color: muted },
            { name: "Invoice",       fields: "invoiceId · orderId(unique) · items[] · subtotal · tax · total · paymentStatus",                                            color: amber },
            { name: "InventoryLog",  fields: "productId · changeType(increase|decrease|manual_adjustment) · quantityChanged · reason · createdAt",                         color: amber },
            { name: "Employee",      fields: "name · employeeId(unique) · department · role · joinDate · phone",                                                          color: amber },
            { name: "Attendance",    fields: "employeeId · date · present · earlyLeave · earlyLeaveTime — compound unique index (employeeId, date)",                      color: amber },
            { name: "ShopDay",       fields: "date(unique) · open — marks if shop is operating that day",                                                                 color: muted },
            { name: "CustomInquiry", fields: "name · email · phone · furnitureType · budget · status(new|contacted|closed) · notes",                                     color: amber },
            { name: "GlobalSettings",fields: "key(singleton) · businessInfo{} — persistent shop-wide config",                                                            color: muted },
          ].map(({ name, fields, color }) => (
            <div key={name} className={`rounded-lg border p-2.5 ${color}`}>
              <div className="font-bold mb-1">{name}</div>
              <div className="opacity-60 text-[9px] leading-relaxed">{fields}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tech Stack">
        <TechStack items={["Next.js","React","MongoDB","Mongoose","Tailwind CSS","Upstash Redis","Cloudinary","Vitest","GitHub Actions"]} />
      </Section>

      <Section title="Key Features">
        <Features items={[
          "Customer storefront: product catalog with search/filter (MongoDB text index on name/description/category), cart backed by React Context + localStorage, checkout, and order history.",
          "Custom furniture inquiry form (rate-limited 3/hr) for bespoke orders with budget and type fields, tracked in CustomInquiry model.",
          "Automated orderId generation: DDMMYYYY + 3-digit daily sequence (Asia/Kolkata timezone) — e.g. 11062025001. OrderSequence model upserts the daily counter atomically.",
          "Invoice pipeline auto-triggers on order creation (POST /api/orders) and retries on every status update (PUT /api/orders/[id]); manual endpoints available.",
          "PDFKit invoice includes itemised products, subtotal, tax, grand total, and business info from GlobalSettings singleton.",
          "Upstash Redis sliding-window rate limits: register (5/hr), contact & inquiry (3/hr each), upload (10/hr) — in-memory fallback if Redis is unavailable.",
          "InventoryLog audit trail: every stock change (increase/decrease/manual_adjustment) is recorded with changeType, quantity, reason, and timestamp.",
          "Attendance tracking with earlyLeave flag; compound unique index on (employeeId, date) prevents duplicate records.",
          "Recharts analytics dashboard: revenue over time, orders by status, stock levels, employee attendance rates.",
          "CI/CD via GitHub Actions: lint → Vitest test suite → Next.js build on every push and pull request.",
        ]} />
      </Section>
    </div>
  ),

  /* ── 4. Portfolio ─────────────────────────────────────────── */
  "portfolio": () => (
    <div className="space-y-10 text-muted-foreground">

      <Section title="Overview">
        <p className="text-sm leading-relaxed">
          A dark-themed personal portfolio built entirely with React, Vite, and Tailwind CSS — no
          backend required. The site is a single-page application with smooth hash-based section
          scrolling, an animated floating code canvas on the hero, and a fully responsive layout.
          Project detail pages are data-driven: adding a new project only requires an entry in
          a central data file. The resume page pulls content from a structured data object and
          supports one-click PDF export via the browser print API. The contact form is wired to
          Web3Forms and delivers messages directly to Gmail with zero server-side code.
        </p>
      </Section>

      <Section title="Page & Route Map">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
          {[
            { method: "SPA",   path: "/",                  desc: "Home — hero, about, skills, projects, home lab, beyond IDE, contact" },
            { method: "ROUTE", path: "/projects",           desc: "Full project grid — all cards from central data source" },
            { method: "ROUTE", path: "/projects/:slug",     desc: "Dynamic detail page — architecture diagrams, tech stack, features" },
            { method: "ROUTE", path: "/resume",             desc: "Two-column resume with circular photo, print-to-PDF support" },
            { method: "ROUTE", path: "/friday",             desc: "Home Lab Friday — self-hosted cloud infrastructure showcase" },
          ].map(({ method, path, desc }) => (
            <div key={path} className={`rounded-lg border px-3 py-2 ${method === "SPA" ? violet : sky}`}>
              <span className="font-bold mr-2">{method}</span>
              <span className="opacity-80">{path}</span>
              <div className="text-[10px] opacity-50 mt-0.5">{desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tech Stack">
        <TechStack items={["React", "Vite", "Tailwind CSS", "TypeScript", "shadcn/ui", "Framer Motion", "GitHub Pages"]} />
      </Section>

      <Section title="Key Features">
        <Features items={[
          "Animated CodeFragmentsCanvas — a canvas element floats 70 syntax-highlighted code tokens upward on the hero background with randomised speed, size, and opacity.",
          "Data-driven project system: projects.js + projectContent.jsx decouple card data from detail content — one entry added in both files produces a full routed detail page.",
          "Resume page uses a scoped CSS injection to override the global text-align: center cascade without touching global styles, ensuring correct left-alignment in the two-column layout.",
          "Print-to-PDF on the resume page via window.print() with @media print rules: nav, footer, and action bar hidden; colours inverted to white-on-black for clean paper output.",
          "Web3Forms contact form — no backend. Submissions POST to the Web3Forms API with the access key injected from an env variable (VITE_WEB3FORMS_KEY), landing in Gmail.",
          "Home Lab (Friday) page renders live infrastructure status widgets, animated network topology, and Cloudflare tunnel diagrams for the self-hosted cloud project.",
          "Navbar supports both hash-scroll links (home sections) and React Router routes (sub-pages) from a single nav config array, with active-state detection for both.",
          "shadcn/ui toast system surfaces form feedback — success/error toasts appear top-right with the same dark theme tokens as the rest of the UI.",
        ]} />
      </Section>

    </div>
  ),

  /* ── 5. Gemma UI ───────────────────────────────────────────── */
  "gemma-ui": () => (
    <div className="space-y-10 text-muted-foreground">

      <Section title="Overview">
        <p className="text-sm leading-relaxed">
          A fully offline, ChatGPT-style chat interface for Gemma 4 (gemma4:e4b, 4-bit quantised)
          running locally via Ollama. Built with React 19 + Vite 8, it streams model output
          token-by-token via Fetch API + ReadableStream parsing Ollama's NDJSON format. Multi-session
          conversation history is persisted to localStorage under two keys: gemma_conversations and
          gemma_active_id. Files (PDF, DOCX, PPTX, XLSX, TXT, CSV, MD) are uploaded to a companion
          Express 5 parser server that extracts text and prepends it as document context to the
          next prompt. D2 diagram code blocks in model output are compiled in-browser via the
          @terrastruct/d2 WebAssembly engine and sanitised with DOMPurify before injection.
        </p>
      </Section>



      <Section title="System Architecture">
        <div className="space-y-6">
          {/* component & service topology */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              component &amp; service topology
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/gemma-ui/topology.svg"
                alt="component and service topology"
                style={{ width: '100%', maxWidth: '896px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* streaming chat flow */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              streaming chat flow — token-by-token
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/gemma-ui/streaming.svg"
                alt="streaming chat flow — token-by-token"
                style={{ width: '100%', maxWidth: '413px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* D2 diagram compilation pipeline */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              D2 diagram compilation pipeline
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/gemma-ui/compilation.svg"
                alt="D2 diagram compilation pipeline"
                style={{ width: '100%', maxWidth: '509px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* race condition fix */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              race condition fix — ghost conversation bug
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/gemma-ui/racecondition.svg"
                alt="race condition fix — ghost conversation bug"
                style={{ width: '100%', maxWidth: '572px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Tech Stack">
        <TechStack items={["React","Vite","Ollama","Express","JavaScript"]} />
      </Section>

      <Section title="Key Features">
        <Features items={[
          "Fully offline after npm install + ollama pull gemma4:e4b — no cloud requests at runtime; OLLAMA_ORIGINS must be set to '*' for CORS.",
          "Token-by-token streaming: Fetch API + ReadableStream parses Ollama's NDJSON output; tokens accumulate in a local variable (not setState) to avoid React batching lag.",
          "Race condition fix: App.jsx uses activeIdRef synced via useEffect so the updateMessages functional updater always writes to the correct conversation even during concurrent streams.",
          "Multi-session conversation history with search, rename, and delete — persisted to two localStorage keys: gemma_conversations (all sessions) and gemma_active_id.",
          "Document ingestion pipeline: PDF → pdf-parse, DOCX/PPTX/XLSX → officeparser; extracted text prepended as 'Document context:' in the prompt to enable RAG-style queries.",
          "D2 diagram compilation via @terrastruct/d2 WASM (dagre layout, theme 4); compiled SVGs cached in a Map to avoid re-rendering; DOMPurify sanitisation before injection.",
          "Tokens-per-second metric computed from Ollama's eval_count / eval_duration and displayed per message.",
          "GFM markdown via remark-gfm: tables, strikethrough, fenced code blocks; Prism syntax highlighting with lazy language loading via react-syntax-highlighter.",
          "Companion Express 5 parser server on :3001 with multer (MAX_UPLOAD_MB=10) and CORS configured for Vite dev server on :5173.",
        ]} />
      </Section>
    </div>
  ),

  /* ── 5. Algo Visualizer ────────────────────────────────────── */
  "algo-visualizer": () => (
    <div className="space-y-10 text-muted-foreground">

      <Section title="Overview">
        <p className="text-sm leading-relaxed">
          An interactive algorithm visualisation platform built with TypeScript, Next.js 14, and
          Zustand. Five algorithm categories — Sorting, Pathfinding, Graph (Floyd-Warshall), Dynamic
          Programming, and N-Queens — are each managed by a dedicated Zustand store that captures
          every intermediate state as a steps[] array, enabling frame-by-frame scrubbing, play/pause,
          and speed control. The UI is built with Radix UI primitives + Tailwind, animated with Framer
          Motion, and complemented by Three.js for 3D graph visualisation and Recharts for 2D plots.
          Per-run complexity metrics (comparisons, swaps, nodes visited, time/space complexity class)
          update in real time.
        </p>
      </Section>

      <Section title="Algorithm Categories & Metrics">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: "Sorting",            algos: "Bubble Sort · Merge Sort · Quick Sort · Insertion Sort · Selection Sort", metrics: "comparisons · swaps · time complexity · space complexity", color: cyan },
            { name: "Pathfinding",        algos: "Dijkstra's · A* (Manhattan heuristic) · BFS · DFS", metrics: "nodes visited · path length · execution time · grid wall support", color: cyan },
            { name: "Graph (Floyd-Warshall)", algos: "All-pairs shortest paths via O(V³) DP iteration", metrics: "iterations (i,j,k) · matrix cell highlight · comparisons", color: cyan },
            { name: "Dynamic Programming",algos: "Longest Common Subsequence · 0/1 Knapsack · Edit Distance (Levenshtein)", metrics: "DP table fill · operations count · optimal substructure trace", color: cyan },
            { name: "N-Queens",           algos: "Backtracking with per-column conflict detection", metrics: "solutions found · backtracks · iterations · board size selector", color: cyan },
          ].map(({ name, algos, metrics, color }) => (
            <div key={name} className={`rounded-lg border p-3 text-xs font-mono ${color}`}>
              <div className="font-bold text-sm mb-1">{name}</div>
              <div className="opacity-75 leading-relaxed">{algos}</div>
              <div className="opacity-45 mt-1.5 text-[10px]">Metrics: {metrics}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Architecture">
        <div className="space-y-6">
          {/* component / store / algorithm pattern */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              component / store / algorithm pattern
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/algo-visualizer/architecture.svg"
                alt="component / store / algorithm pattern"
                style={{ width: '100%', maxWidth: '896px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* pathfinding visualiser — interactive grid */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              pathfinding visualiser — interactive grid
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/algo-visualizer/grid.svg"
                alt="pathfinding visualiser — interactive grid"
                style={{ width: '100%', maxWidth: '896px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Tech Stack">
        <TechStack items={["TypeScript","Next.js","Tailwind CSS","shadcn/ui","React","Framer Motion","Radix UI"]} />
      </Section>

      <Section title="Key Features">
        <Features items={[
          "Five dedicated Zustand stores — each encapsulates its algorithm's state, steps[] history, current step index, and computed complexity metrics independently.",
          "Fully scrubable step replay: every store captures a steps[] array of complete intermediate states; the player dispatches nextStep/prevStep actions at a configurable interval.",
          "Pathfinding visualiser supports interactive wall drawing on the grid (pointer drag), custom start/end placement, and four algorithms — all re-running live as the grid changes.",
          "Floyd-Warshall matrix view highlights the current (i, j, k) triple per iteration, showing exactly which cells are being relaxed.",
          "N-Queens backtracking visualiser highlights placement attempts, detected conflicts, and successful board configurations across arbitrary N sizes.",
          "Real-time complexity panel: time complexity class, space complexity class, and algorithm-specific counters (comparisons, swaps, nodes visited, solutions) displayed per run.",
          "Framer Motion step transitions provide smooth visual feedback — array bars, grid cells, and matrix entries animate between states.",
          "Radix UI primitives + Tailwind for the full component system; shadcn/ui for design tokens; next-themes for dark/light mode toggle.",
          "TypeScript throughout: typed store actions, algorithm step interfaces, and component props prevent state shape mismatches.",
        ]} />
      </Section>
    </div>
  ),

  /* ── 6. Stubble Vision ─────────────────────────────────────── */
  "stubble-vision": () => (
    <div className="space-y-10 text-muted-foreground">

      <Section title="Overview">
        <p className="text-sm leading-relaxed">
          A full-stack geospatial analytics platform that ingests FIRMS (Fire Information for Resource
          Management System) satellite CSV data, classifies fire events, computes burn severity from
          Sentinel-2 imagery using dNBR (differenced Normalised Burn Ratio) via the Google Earth Engine
          API, and exports the results as GeoJSON + metrics.json. A FastAPI 0.128 / Uvicorn backend
          serves the processed data through six REST endpoints. A Next.js 13 + React 18 frontend with
          Chakra UI renders an interactive Leaflet map with severity-coloured fire markers and a Recharts
          dashboard with four chart types — time-series, severity distribution, stacked area, and dNBR histogram.
        </p>
      </Section>

      <Section title="API Endpoints (FastAPI · :8000)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          {[
            { method: "GET", path: "/",                              desc: "Health check + lists all available endpoints" },
            { method: "GET", path: "/fires/points",                  desc: "FeatureCollection GeoJSON — all fire points (NaN/Inf sanitised)" },
            { method: "GET", path: "/dashboard/summary",             desc: "total_fires · severity breakdown {high, medium, low}" },
            { method: "GET", path: "/dashboard/fires-over-time",     desc: "Array of {date, count} — time-series fire events" },
            { method: "GET", path: "/dashboard/severity-distribution",desc: "Array of {severity, count} — pie/bar data" },
            { method: "GET", path: "/dashboard/severity-vs-time",    desc: "Stacked area data — {date, low, moderate, high} per day" },
            { method: "GET", path: "/dashboard/dnbr-distribution",   desc: "Histogram bins — {range, count} for dNBR values" },
          ].map(({ method, path, desc }) => (
            <div key={path} className={`rounded-lg border px-3 py-2 ${red}`}>
              <span className="font-bold mr-2 opacity-70">{method}</span>
              <span className="opacity-80">{path}</span>
              <div className="text-[9px] opacity-50 mt-0.5">{desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="System Architecture">
        <div className="space-y-6">
          {/* end-to-end ML pipeline → API → frontend */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              end-to-end ML pipeline → API → frontend
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/stubble-vision/pipeline.svg"
                alt="end-to-end ML pipeline → API → frontend"
                style={{ width: '100%', maxWidth: '648px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* dNBR burn severity computation (per fire · Sentinel-2) */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              dNBR burn severity computation (per fire · Sentinel-2)
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/stubble-vision/dnbr.svg"
                alt="dNBR burn severity computation (per fire · Sentinel-2)"
                style={{ width: '100%', maxWidth: '730px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* GeoJSON feature schema */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              GeoJSON feature schema
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/stubble-vision/schema.svg"
                alt="GeoJSON feature schema"
                style={{ width: '100%', maxWidth: '1225px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Tech Stack">
        <TechStack items={["Python","FastAPI","Pandas","Google Earth Engine","Next.js","React","Chakra UI","Leaflet"]} />
      </Section>

      <Section title="Key Features">
        <Features items={[
          "Five-stage ML pipeline (load → detect → severity → export) in ml/ — each stage is a separate Python module, orchestrated by ml/runner.py.",
          "Fire detection: FIRMS CSV records with confidence ≥ 70 are classified as fire events; lat/lon parsed to float, null coordinates dropped.",
          "dNBR burn severity: GEE fetches Sentinel-2 L2A imagery in two 15-day windows (pre: −30 to −5 days, post: +1 to +10 days); NBR computed from bands B8 (NIR) and B12 (SWIR).",
          "Four severity classes: Unburned (dNBR < 0.1), Low (0.1–0.27), Moderate (0.27–0.44), High (≥ 0.44) — exported per fire point in GeoJSON properties.",
          "GEE requests are batched (batch_size=50) to stay within Earth Engine API quotas; NaN/Inf values sanitised before JSON serialisation.",
          "FastAPI serves six endpoints: GeoJSON fire points + five dashboard metric endpoints (summary, time-series, severity distribution, stacked area, dNBR histogram).",
          "Interactive Leaflet map with colour-coded severity markers and GeoJSON polygon overlays; date and severity filter UI in Chakra UI.",
          "Recharts dashboard: four chart types — line chart (fires over time), bar chart (severity distribution), stacked area (severity vs. time), histogram (dNBR ranges).",
          "Theory page documents the dNBR formula, Sentinel-2 band selection rationale, and severity threshold definitions.",
        ]} />
      </Section>
    </div>
  ),

  /* ── 7. Graph Path Models ──────────────────────────────────── */
  "graph-path-models": () => (
    <div className="space-y-10 text-muted-foreground">

      <Section title="Overview">
        <p className="text-sm leading-relaxed">
          An interactive platform for uploading weighted graphs as CSV edge-list files, visualising
          them as live 3D network graphs using React Three Fiber / @react-three/drei 10, and running
          three pathfinding algorithms — Dijkstra (greedy, non-negative weights), Bellman-Ford
          (handles negative weights), and A* (heuristic-guided). The result path is rendered in a
          separate PathGraphViewer3D scene with highlighted nodes and edges and a displayed total cost.
          A Python CSV generator in cs_generator/ creates synthetic test graphs up to 500+ nodes.
          Deployed to GitHub Pages via gh-pages.
        </p>
      </Section>

      <Section title="Architecture">
        <div className="space-y-6">
          {/* full application flow */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              full application flow
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/graph-path-models/fullflow.svg"
                alt="full application flow"
                style={{ width: '100%', maxWidth: '778px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* algorithm complexity comparison */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              algorithm complexity comparison
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/graph-path-models/complexity.svg"
                alt="algorithm complexity comparison"
                style={{ width: '100%', maxWidth: '702px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* CSV generator */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              CSV generator (cs_generator/)
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/graph-path-models/generator.svg"
                alt="CSV generator"
                style={{ width: '100%', maxWidth: '399px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Tech Stack">
        <TechStack items={["React","Vite","JavaScript","Python","GitHub Pages"]} />
      </Section>

      <Section title="Key Features">
        <Features items={[
          "CSV-driven graph loading: upload any edge-list CSV (columns: source, target, weight) and PapaParse 5.5 instantly parses it into a nodes[] + edges[] graph structure.",
          "3D network visualisation using @react-three/drei 10 (React Three Fiber) — nodes rendered as Three.js spheres, edges as lines, with orbit controls for pan/zoom/rotate.",
          "Force-directed 3D layout positions nodes using spring physics so the graph self-organises into a readable structure regardless of input order.",
          "Three pathfinding algorithms: Dijkstra (non-negative weights, priority queue), Bellman-Ford (negative-weight-safe, V−1 relaxation passes, negative-cycle detection), A* (Euclidean heuristic).",
          "PathGraphViewer3D renders the algorithm result in an isolated scene — path nodes highlighted, result edges drawn in accent colour, total cost shown as overlay.",
          "Zustand 5.0 graphStore cleanly separates parsed graph state from rendering logic — algorithm selection, source/target nodes, and result path all live in the store.",
          "Python CSV generator (cs_generator/csv_gen.py) creates synthetic test graphs up to 500+ nodes for benchmarking; demo_input/ samples included for quick demo.",
          "Deployed to GitHub Pages via gh-pages package — build → gh-pages -d dist workflow defined in package.json scripts.",
        ]} />
      </Section>
    </div>
  ),

  /* ── 8. Eco Tracker ────────────────────────────────────────── */
  "eco-tracker": () => (
    <div className="space-y-10 text-muted-foreground">

      <Section title="Overview">
        <p className="text-sm leading-relaxed">
          A browser-based environmental monitoring and carbon awareness tool with three integrated
          modules — all in vanilla HTML, CSS, and JavaScript with zero build steps or dependencies.
          The landing page (index.html) explains carbon footprint concepts and drives awareness.
          The calculator (calindex.html) computes CO₂ emissions for five construction materials
          across multiple grades with per-material CO₂ coefficients. The city emissions dashboard
          (cities_index.html) visualises CO₂ data across 10+ Indian cities from 2012–2021,
          broken into transportation, industry, residential, and other categories, loaded from a
          static cities_data.json.
        </p>
      </Section>

      <Section title="Application Modules">
        <div className="space-y-6">
          {/* site structure — three pages */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              site structure — three pages
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/eco-tracker/modules.svg"
                alt="site structure — three pages"
                style={{ width: '100%', maxWidth: '610px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* cities_data.json schema */}
          <div className="rounded-xl border border-border/40 overflow-hidden w-full">
            <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
              cities_data.json schema
            </p>
            <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
              <img
                src="/diagrams/eco-tracker/schema.svg"
                alt="cities_data.json schema"
                style={{ width: '100%', maxWidth: '896px', height: 'auto' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section title="JavaScript Modules">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
          {[
            { file: "script.js",       desc: "Landing page: smooth-scroll nav, contact form validation, fade-in scroll animation (IntersectionObserver)", color: green },
            { file: "calscript.js",    desc: "Calculator: dynamic grade dropdown update on material change, CO₂ coefficient lookup, result card update, inline validation", color: green },
            { file: "cities_scrip.js", desc: "Dashboard: fetch cities_data.json, render city list, live search filter (input event), per-city emission table render", color: green },
          ].map(({ file, desc, color }) => (
            <div key={file} className={`rounded-lg border p-2.5 ${color}`}>
              <div className="font-bold mb-1">{file}</div>
              <div className="opacity-60 text-[9px] leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tech Stack">
        <TechStack items={["JavaScript","HTML5","CSS"]} />
      </Section>

      <Section title="Key Features">
        <Features items={[
          "Carbon footprint calculator: material selection dynamically updates the grade dropdown; CO₂ = quantity × coefficient[material][grade] computed client-side with inline validation.",
          "City emissions dashboard: Fetch API loads cities_data.json on DOMContentLoaded; live input search filter updates the city list using the input event listener — no library.",
          "Ten years of emissions per city (2012–2021) across four categories: transportation, industry, residential, others — displayed as a year-by-year HTML table with totals column.",
          "Smooth-scroll navigation on landing page; IntersectionObserver drives fade-in animations for content sections on scroll.",
          "Form validation across all three pages: inline red-border feedback on empty/invalid fields, no submit if invalid.",
          "Fully static — zero backend, zero build step, zero npm install — open index.html directly in any browser.",
          "Responsive CSS grid layout with Inter font (Google Fonts); mobile-first breakpoints for all three pages.",
          "Contact form on landing page submits with JS validation and shows a success message without a page reload.",
        ]} />
      </Section>
    </div>
  ),

  "friday": () => (
    <div className="space-y-10 text-muted-foreground">
      <Section title="Overview">
        <p className="text-sm leading-relaxed">
          Friday is a fully self-hosted private cloud running 24/7 on a bare-metal Ubuntu Server box.
          It replicates enterprise cloud infrastructure — compute, storage, networking, and AI inference —
          entirely on-prem, with zero inbound router ports exposed.
          All external access flows through outbound-only encrypted tunnels, making it as secure as a managed cloud
          without any subscription cost.
        </p>
      </Section>

      <Section title="System Architecture Flowchart">
        <div className="rounded-xl border border-border/40 overflow-hidden w-full">
          <p className="text-xs font-semibold text-foreground/80 tracking-wide uppercase text-center py-3 px-4 border-b border-border/30">
            edge routing and container virtualization topology
          </p>
          <div className="w-full flex justify-center bg-[#1e1e2e] p-4">
            <img
              src="/diagrams/friday/architecture.svg"
              alt="edge routing and container virtualization topology"
              style={{ width: '100%', maxWidth: '938px', height: 'auto' }}
              loading="lazy"
            />
          </div>
        </div>
      </Section>

      <Section title="Development & Configuration Phases">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          {[
            {
              title: "Phase 1: Linux Admin",
              desc: "Ubuntu Server installation, user configuration, SSH key pairing, systemctl daemon configuration, and journalctl logging audit setup.",
              color: violet
            },
            {
              title: "Phase 2: Network Design",
              desc: "Static IP routing configuration using Netplan yaml parameters. Priority metric definition to failover ethernet connection automatically to wireless.",
              color: violet
            },
            {
              title: "Phase 3: Mesh VPN",
              desc: "Tailscale WireGuard overlay tunnel implementation. Set up direct peer-to-peer communication path traversal across external routers.",
              color: violet
            },
            {
              title: "Phase 4 & 5: DNS Records",
              desc: "Configuration of nameservers and routing edge logic in Cloudflare DNS for secure domain routing.",
              color: violet
            },
            {
              title: "Phase 6: Reverse Tunnels",
              desc: "Deployment of cloudflared connector service running outbound TCP streams, closing all incoming network vulnerabilities.",
              color: violet
            },
            {
              title: "Phase 7: Virtualization",
              desc: "Docker container runtime stack implementation with independent virtual bridge subnets and volumes.",
              color: violet
            },
          ].map(({ title, desc, color }) => (
             <div key={title} className={`rounded-lg border p-3.5 ${color}`}>
               <div className="font-bold mb-1">{title}</div>
               <div className="opacity-70 leading-relaxed text-[11px]">{desc}</div>
             </div>
          ))}
        </div>
      </Section>

      <Section title="Tech Stack">
        <TechStack items={["Linux", "Ubuntu", "Tailscale", "Cloudflare", "Nextcloud", "Docker"]} />
      </Section>

      <Section title="Key Infrastructure Capabilities">
        <Features items={[
          "Outbound-only secure Cloudflare tunnel closes all inbound firewall vectors, preventing external penetration attempts.",
          "Persistent containerized Docker microservices keep system data storage and execution runtimes completely isolated.",
          "Encrypted WireGuard mesh network allows secure admin remote terminal access from any mobile or laptop device globally.",
          "Automated failover routing metrics configured on Netplan switch automatically between primary Ethernet and secondary 5G wireless.",
          "Trusted domains and reverse proxy headers configured for Nextcloud platform, solving OAuth redirects and CORS blocks.",
          "Docker-based multi-model AI agent environment with Ollama and OpenClaw platform, allowing automated workflows.",
        ]} />
      </Section>
    </div>
  ),
};
