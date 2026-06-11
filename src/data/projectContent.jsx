import {
  siHuggingface, siElevenlabs, siMongoose, siUpstash, siCloudinary,
  siGithubactions, siVitest, siChakraui, siGoogleearthengine, siLeaflet,
  siYaml, siMistralai, siQwen, siShadcnui, siGithubpages, siFramer, siRadixui,
} from "simple-icons";
import { FlowDiagram } from "../components/FlowDiagram";
import { D2Diagram } from "../components/D2Diagram";

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
  <ul className="space-y-2">
    {items.map((f, i) => (
      <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
        <span className="text-primary mt-0.5 shrink-0">▸</span>
        <span>{f}</span>
      </li>
    ))}
  </ul>
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
        <FlowDiagram title="end-to-end agent orchestration flow"
          nodes={[
            n('text',        'Text Query',             null,                                      muted),
            n('voice',       'Voice Input',            'ElevenLabs STT',                          muted),
            n('image',       'Medical Image',          'PNG / JPG upload',                        muted),
            n('gateway',     'FastAPI Gateway',        'POST /chat · /upload-image · /voice',     emerald),
            n('orchestrator','LangGraph Orchestrator', 'agent_decision.py · StateGraph',          emerald),
            n('rag',         'RAG Agent',              'agents/rag_agent/',                       emerald),
            n('qexp',        'Query Expansion',        'LLM generates domain terms',              muted),
            n('hybrid',      'Hybrid Retrieval',       'Qdrant dense + BM25 sparse',              emerald),
            n('rerank',      'Cross-Encoder Rerank',   'ms-marco-TinyBERT',                       emerald),
            n('logprob',     'Log-Prob Gate',          'confidence threshold check',              amber),
            n('web',         'Web Search Agent',       'web_search_processor_agent/',             emerald),
            n('tavily',      'Tavily API',             'real-time medical papers',                muted),
            n('websyn',      'Result synthesis',       'LLM summarises web hits',                 muted),
            n('imaging',     'Imaging Agent',          'image_analysis_agent/',                   emerald),
            n('brain',       'Brain Tumour',           'PyTorch classifier',                      muted),
            n('chest',       'Chest X-Ray',            'PyTorch classifier',                      muted),
            n('skin',        'Skin Lesion',            'PyTorch segmentation',                    muted),
            n('hitl',        'HITL NodeInterrupt',     'professional review gate',                amber),
            n('guardrails',  'LangChain Guardrails',   'input safety + output relevance filter',  amber),
            n('composer',    'Response Composer',      'text + source citations + thumbnails',    emerald),
            n('tts',         'ElevenLabs TTS',         'POST /voice · audio stream to browser',   emerald),
          ]}
          edges={[
            e('e1',  'text',         'gateway'),
            e('e2',  'voice',        'gateway'),
            e('e3',  'image',        'gateway'),
            e('e4',  'gateway',      'orchestrator'),
            e('e5',  'orchestrator', 'rag',        'classifies intent'),
            e('e6',  'orchestrator', 'web'),
            e('e7',  'orchestrator', 'imaging'),
            e('e8',  'rag',          'qexp'),
            e('e9',  'qexp',         'hybrid'),
            e('e10', 'hybrid',       'rerank'),
            e('e11', 'rerank',       'logprob'),
            e('e12', 'logprob',      'guardrails'),
            e('e13', 'web',          'tavily'),
            e('e14', 'tavily',       'websyn'),
            e('e15', 'websyn',       'guardrails'),
            e('e16', 'imaging',      'brain'),
            e('e17', 'brain',        'chest'),
            e('e18', 'chest',        'skin'),
            e('e19', 'skin',         'hitl'),
            e('e20', 'hitl',         'guardrails'),
            e('e21', 'guardrails',   'composer'),
            e('e22', 'composer',     'tts'),
          ]}
        />

        <FlowDiagram title="RAG ingestion pipeline (ingest_rag_data.py)"
          nodes={[
            n('pdf',      'Medical PDF',         'data/raw/ directory',                        muted),
            n('docling',  'Docling v2.31',        'text · tables · embedded images',            emerald),
            n('chunker',  'Semantic Chunker',     'LLM boundary-aware splits',                  emerald),
            n('dense',    'Dense Embeddings',     'Azure text-embedding-ada-002',               muted),
            n('floatvec', 'Float32 vectors',      null,                                         muted),
            n('qdrant1',  'Qdrant Collection',    'data/qdrant_db/ — hybrid store',             emerald),
            n('bm25',     'BM25 Sparse Index',    'keyword inverted index',                     muted),
            n('tfidf',    'TF-IDF tokens',        null,                                         muted),
            n('qdrant2',  'Qdrant Collection',    'sparse vectors side',                        emerald),
            n('userq',    'User query',           null,                                         muted),
            n('expanded', 'Expanded query',       'LLM adds medical synonyms',                  emerald),
            n('hybrids',  'Hybrid search',        'dense + sparse RRF fusion',                  emerald),
            n('topk',     'Top-K → reranker',     'ms-marco-TinyBERT cross-encoder',            emerald),
            n('context',  'Final context window', 'source URLs + reference images injected',    emerald),
          ]}
          edges={[
            e('e1',  'pdf',      'docling'),
            e('e2',  'docling',  'chunker'),
            e('e3',  'chunker',  'dense',     'per chunk'),
            e('e4',  'chunker',  'bm25'),
            e('e5',  'dense',    'floatvec'),
            e('e6',  'floatvec', 'qdrant1',   'stored in'),
            e('e7',  'bm25',     'tfidf'),
            e('e8',  'tfidf',    'qdrant2',   'stored in'),
            e('e9',  'qdrant1',  'hybrids',   'query time'),
            e('e10', 'qdrant2',  'hybrids'),
            e('e11', 'userq',    'expanded'),
            e('e12', 'expanded', 'hybrids'),
            e('e13', 'hybrids',  'topk'),
            e('e14', 'topk',     'context'),
          ]}
        />

        <FlowDiagram title="confidence-based agent handoff"
          nodes={[
            n('rag_resp', 'RAG Agent response',     null,                                     emerald),
            n('logprob',  'Confidence score',       'mean token log-prob threshold',          amber),
            n('high',     'score ≥ threshold',      'HIGH confidence',                        emerald),
            n('rag_ans',  'Return RAG answer',      '+ source citations',                     emerald),
            n('low',      'score < threshold',      'LOW confidence',                         red),
            n('escalate', 'Escalate to Tavily',     'web_search_processor_agent/',            amber),
            n('combine',  'Combine RAG + web hits', 'LLM synthesises final answer',           emerald),
          ]}
          edges={[
            e('e1', 'rag_resp', 'logprob',  'extract log-probabilities'),
            e('e2', 'logprob',  'high'),
            e('e3', 'logprob',  'low'),
            e('e4', 'high',     'rag_ans'),
            e('e5', 'low',      'escalate'),
            e('e6', 'escalate', 'combine'),
          ]}
        />
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
        <FlowDiagram title="full swarm topology"
          nodes={[
            n('telegram',  'Telegram',              null,                                       muted),
            n('discord',   'Discord',               null,                                       muted),
            n('slack',     'Slack / WhatsApp',      null,                                       muted),
            n('tui',       'TUI / CLI',             null,                                       muted),
            n('gateway',   'OpenClaw Gateway',      'ws://127.0.0.1:18789 · openclaw.json',     violet),
            n('commander', 'COMMANDER',             'qwen3:8b · agents/commander/SOUL.md',      violet),
            n('researcher','RESEARCHER',            'qwen3:8b',                                 violet),
            n('brave',     'brave-search',          'MCP web tool',                             amber),
            n('puppeteer', 'puppeteer',             'MCP scrape tool',                          amber),
            n('coder',     'CODER',                 'qwen2.5-coder:14b',                        violet),
            n('fsmcp',     'filesystem MCP',        'Read · Write · Bash',                      amber),
            n('memmcp',    'memory MCP',            'persistent KV store',                      amber),
            n('analyst',   'ANALYST',               'qwen2.5-coder:14b',                        violet),
            n('sqlitemcp', 'sqlite MCP',            'structured queries',                       amber),
            n('fsmcp2',    'filesystem MCP',        'CSV / JSON read',                          amber),
            n('writer',    'WRITER',                'mistral:7b',                               violet),
            n('fsmcp3',    'filesystem MCP',        'Write output files',                       amber),
            n('merge',     'COMMANDER merges',      'synthesises final response · replies',     violet),
          ]}
          edges={[
            e('e1',  'telegram',   'gateway'),
            e('e2',  'discord',    'gateway'),
            e('e3',  'slack',      'gateway'),
            e('e4',  'tui',        'gateway'),
            e('e5',  'gateway',    'commander'),
            e('e6',  'commander',  'researcher', 'TeammateTool.write()'),
            e('e7',  'commander',  'coder'),
            e('e8',  'commander',  'analyst'),
            e('e9',  'commander',  'writer'),
            e('e10', 'researcher', 'brave'),
            e('e11', 'brave',      'puppeteer'),
            e('e12', 'coder',      'fsmcp'),
            e('e13', 'fsmcp',      'memmcp'),
            e('e14', 'analyst',    'sqlitemcp'),
            e('e15', 'sqlitemcp',  'fsmcp2'),
            e('e16', 'writer',     'fsmcp3'),
            e('e17', 'puppeteer',  'merge',      'results → Commander'),
            e('e18', 'memmcp',     'merge'),
            e('e19', 'fsmcp2',     'merge'),
            e('e20', 'fsmcp3',     'merge'),
          ]}
        />

        <FlowDiagram title="request lifecycle — message to response"
          nodes={[
            n('usermsg',    'User message',        'any channel',                                  muted),
            n('gateway',    'OpenClaw Gateway',    ':18789',                                       violet),
            n('cmd_rcv',    'Commander',           'receives task',                                violet),
            n('decomp',     'Task decomposition',  'Commander breaks into sub-tasks per specialist',violet),
            n('specialists','Specialist agents',   'run concurrently via max_concurrent: 5',       violet),
            n('mcptools',   'MCP tool calls',      'filesystem · brave-search · memory · sqlite',  amber),
            n('collect',    'Commander collects',  'waits for all agent replies',                  violet),
            n('mergesyn',   'Merge + synthesise',  'one coherent response',                        violet),
            n('deliver',    'Deliver to channel',  'Telegram / Discord / TUI',                     muted),
          ]}
          edges={[
            e('e1', 'usermsg',    'gateway',    'WebSocket'),
            e('e2', 'gateway',    'cmd_rcv'),
            e('e3', 'cmd_rcv',    'decomp',     'skill.md pattern match'),
            e('e4', 'decomp',     'specialists','TeammateTool.write()'),
            e('e5', 'specialists','mcptools'),
            e('e6', 'mcptools',   'collect',    'TeammateTool 13 ops'),
            e('e7', 'collect',    'mergesyn'),
            e('e8', 'mergesyn',   'deliver'),
          ]}
        />

        <FlowDiagram title="Agent Manager Dashboard (localhost:9999)"
          nodes={[
            n('browser',  'Browser — localhost:9999', 'React SPA (dashboard/public/app.js)',  violet),
            n('express',  'Express API',              'dashboard/server.js · CRUD routes',    violet),
            n('swamlyaml','Read/Write swarm.yaml',    'agent definitions',                    amber),
            n('soulmd',   'Read/Write SOUL.md',       'per-agent persona files',              amber),
            n('ocjson',   'Read/Write openclaw.json', 'gateway + model config',               amber),
            n('sync',     'Dashboard ↔ YAML in sync', 'any UI change reflected in files',     muted),
          ]}
          edges={[
            e('e1', 'browser',  'express'),
            e('e2', 'express',  'swamlyaml'),
            e('e3', 'express',  'soulmd'),
            e('e4', 'express',  'ocjson'),
            e('e5', 'swamlyaml','sync'),
            e('e6', 'soulmd',   'sync'),
            e('e7', 'ocjson',   'sync'),
          ]}
        />
      </Section>

      <Section title="Configuration (swarm.yaml structure)">
        <div className={`rounded-xl border p-4 text-xs font-mono leading-relaxed ${violet}`}>
          <div className="opacity-50 text-[10px] tracking-widest uppercase mb-2">swarm.yaml</div>
          <pre className="text-[11px] opacity-80">{`swarm:
  name: openClaw-swarm
  max_concurrent: 5
  agents:
    commander:
      model: "ollama/qwen3:8b"
      soul: agents/commander/SOUL.md
      tools: [Read, Write, WebSearch, WebFetch]
    coder:
      model: "ollama/qwen2.5-coder:14b"
      soul: agents/coder/SOUL.md
      tools: [Read, Write, Bash, Grep, filesystem-mcp]
    researcher:
      model: "ollama/qwen3:8b"
      soul: agents/researcher/SOUL.md
      tools: [brave-search-mcp, puppeteer-mcp]`}</pre>
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
        <D2Diagram
          title="request lifecycle — auth + validation + data layer"
          src="/diagrams/woodcraft-store/auth-flow.svg"
        />
        <D2Diagram
          title="order creation → invoice → email flow"
          src="/diagrams/woodcraft-store/order-flow.svg"
        />
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

  /* ── 4. Gemma UI ───────────────────────────────────────────── */
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

      <Section title="Design Tokens">
        <div className={`rounded-xl border p-4 text-xs font-mono leading-relaxed ${indigo}`}>
          <div className="opacity-50 text-[10px] tracking-widest uppercase mb-2">App.css — CSS variables</div>
          <pre className="text-[11px] opacity-80 leading-loose">{`--bg:             #212121   /* main chat background */
--sidebar-bg:     #171717   /* sidebar panel */
--surface:        #2f2f2f   /* message bubbles */
--accent:         #10a37f   /* primary action colour */
--text:           #ececec   /* primary text */
--text-secondary: #8e8ea0   /* metadata / timestamps */
--border:         #383838   /* dividers */
--warn:           #f5a623   /* warnings */
--danger:         #e53e3e   /* errors / delete actions */`}</pre>
        </div>
      </Section>

      <Section title="System Architecture">
        <FlowDiagram title="component & service topology"
          nodes={[
            n('user',       'User',                 null,                                             muted),
            n('sidebar',    'Sidebar.jsx',           'conversation list · search · rename · delete',   indigo),
            n('localstor',  'localStorage',          'gemma_conversations · gemma_active_id',          muted),
            n('app',        'App.jsx',               'root state · activeIdRef race-condition fix',     indigo),
            n('activeref',  'useRef(activeId)',      'always reflects latest id during stream',         muted),
            n('chatarea',   'ChatArea.jsx',          'composer · file chips · streaming renderer',      indigo),
            n('tokenmeter', 'tokens/sec meter',      'eval_count / eval_duration from Ollama',          muted),
            n('renderpipe', 'Render Pipeline',       'ReactMarkdown → SyntaxHighlighter → D2 WASM',    muted),
            n('ollama',     'Ollama :11434',         'POST /api/chat — streaming',                      indigo),
            n('model',      'gemma4:e4b',            '4-bit quantised · NDJSON chunks',                 muted),
            n('history',    'conversation history',  'messages[] sent each request',                    muted),
            n('parser',     'Parser Server :3001',   'server/index.js — Express 5',                     indigo),
            n('parse_api',  'POST /api/parse',       'multipart/form-data · max 10 MB',                 muted),
            n('parsers',    'pdf-parse / officeparser','PDF · DOCX · PPTX · XLSX · CSV · MD',           muted),
          ]}
          edges={[
            e('e1',  'user',      'sidebar'),
            e('e2',  'user',      'app'),
            e('e3',  'user',      'chatarea'),
            e('e4',  'sidebar',   'localstor'),
            e('e5',  'app',       'activeref'),
            e('e6',  'chatarea',  'tokenmeter'),
            e('e7',  'chatarea',  'renderpipe'),
            e('e8',  'chatarea',  'ollama'),
            e('e9',  'chatarea',  'parser'),
            e('e10', 'ollama',    'model'),
            e('e11', 'model',     'history'),
            e('e12', 'parser',    'parse_api'),
            e('e13', 'parse_api', 'parsers'),
          ]}
        />

        <FlowDiagram title="streaming chat flow — token-by-token"
          nodes={[
            n('submit',    'User submits prompt',    'ChatArea.jsx',                                    indigo),
            n('docctx',    'Attach document context','if files uploaded',                               muted),
            n('parse_req', 'POST /api/parse :3001',  'multipart FormData',                              indigo),
            n('filetext',  '{ filename, text }',     null,                                              muted),
            n('prepend',   'Prepend as context',     '"Document context: [text]"',                      indigo),
            n('chat_req',  'POST /api/chat :11434',  'messages[] + augmented prompt',                   indigo),
            n('ndjson',    'Ollama NDJSON stream',   '{ message: { content }, done }',                  indigo),
            n('tokenacc',  'Token accumulator',      'local variable — avoids React batching lag',      muted),
            n('update',    'updateMessages()',       'functional updater — reads activeIdRef.current',   indigo),
            n('done',      'done: true received',    'stream ends · localStorage sync',                 muted),
            n('render',    'Render pipeline',        'markdown → highlight → D2 compile → inject',      indigo),
          ]}
          edges={[
            e('e1',  'submit',    'docctx'),
            e('e2',  'docctx',    'parse_req',  'for each file'),
            e('e3',  'parse_req', 'filetext'),
            e('e4',  'filetext',  'prepend'),
            e('e5',  'prepend',   'chat_req'),
            e('e6',  'submit',    'chat_req'),
            e('e7',  'chat_req',  'ndjson'),
            e('e8',  'ndjson',    'tokenacc',   'NDJSON parser'),
            e('e9',  'tokenacc',  'update'),
            e('e10', 'update',    'done'),
            e('e11', 'done',      'render'),
          ]}
        />

        <FlowDiagram title="D2 diagram compilation pipeline"
          nodes={[
            n('d2code',     'Model outputs d2 block',  null,                                          muted),
            n('cache_look', 'Cache lookup',            'Map(source → compiled SVG)',                   indigo),
            n('cache_hit',  'Cache HIT',               null,                                           indigo),
            n('ret_cached', 'Return cached SVG',       null,                                           muted),
            n('inject1',    'containerRef.innerHTML',  'sanitized SVG injected',                       indigo),
            n('cache_miss', 'Cache MISS',              null,                                           red),
            n('compile',    'new D2().compile(source)','WASM · layout: dagre',                         indigo),
            n('d2render',   'd2.render(diagram)',      'themeID: 4',                                   indigo),
            n('sanitize',   'DOMPurify.sanitize(svg)', 'XSS protection before DOM injection',          amber),
            n('store',      'Store in cache',          null,                                           muted),
            n('inject2',    'containerRef.innerHTML',  'sanitized SVG injected',                       indigo),
          ]}
          edges={[
            e('e1',  'd2code',     'cache_look'),
            e('e2',  'cache_look', 'cache_hit'),
            e('e3',  'cache_look', 'cache_miss'),
            e('e4',  'cache_hit',  'ret_cached'),
            e('e5',  'ret_cached', 'inject1'),
            e('e6',  'cache_miss', 'compile'),
            e('e7',  'compile',    'd2render'),
            e('e8',  'd2render',   'sanitize'),
            e('e9',  'sanitize',   'store'),
            e('e10', 'store',      'inject2'),
          ]}
        />

        <FlowDiagram title="race condition fix — ghost conversation bug"
          nodes={[
            n('stream_start', 'Stream starts',           'activeId = "conv-A" in state',               muted),
            n('state_change', 'activeId state → conv-B', 'stale in closure — user switched mid-stream', red),
            n('without_fix',  'Without fix',             'stale closure',                              red),
            n('bad_write',    'updateMessages writes',   'tokens to "conv-A" (wrong!)',                 red),
            n('ghost',        'Ghost conversations',     null,                                          red),
            n('with_fix',     'With fix',                'activeIdRef',                                indigo),
            n('sync_ref',     'useEffect syncs ref',     'activeIdRef.current = activeId always',       indigo),
            n('correct',      'Callback reads ref',      'always correct conversation ID',              indigo),
          ]}
          edges={[
            e('e1', 'stream_start', 'state_change',  'user clicks different conversation'),
            e('e2', 'state_change', 'without_fix'),
            e('e3', 'state_change', 'with_fix'),
            e('e4', 'without_fix',  'bad_write'),
            e('e5', 'bad_write',    'ghost'),
            e('e6', 'with_fix',     'sync_ref'),
            e('e7', 'sync_ref',     'correct'),
          ]}
        />
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
        <FlowDiagram title="component / store / algorithm pattern"
          nodes={[
            n('nextjs',    'Next.js 14 App Router',  'app/visualizers/[algorithm]/page.tsx',          cyan),
            n('visualizer','Visualiser Component',   'reads store state: steps[] · currentStep',      cyan),
            n('framer',    'Framer Motion',          'step transitions · element highlights',          muted),
            n('controls',  'Controls Component',    'play · pause · step fwd/back · speed slider',    muted),
            n('interval',  'interval timer',         'dispatches nextStep action on tick',             muted),
            n('metrics',   'Metrics Panel',          'live complexity display per run',                muted),
            n('sortstore', 'Sorting',                'useSortingStore',                               cyan),
            n('pathstore', 'Pathfinding',            'usePathfindingStore',                           cyan),
            n('graphstore','Graph',                  'useGraphStore',                                 cyan),
            n('dpstore',   'Dynamic Programming',    'useDPStore',                                    cyan),
            n('nqstore',   'N-Queens',               'useNQueensStore',                               cyan),
            n('stepgen',   'Step generator',         'runs full algorithm · captures every decision',  muted),
            n('stepsarr',  'steps[] + metrics',      'stored in Zustand — replayed by player/scrubber',cyan),
          ]}
          edges={[
            e('e1',  'nextjs',    'visualizer'),
            e('e2',  'nextjs',    'controls'),
            e('e3',  'nextjs',    'metrics'),
            e('e4',  'visualizer','framer'),
            e('e5',  'controls',  'interval'),
            e('e6',  'visualizer','sortstore'),
            e('e7',  'visualizer','pathstore'),
            e('e8',  'visualizer','graphstore'),
            e('e9',  'visualizer','dpstore'),
            e('e10', 'visualizer','nqstore'),
            e('e11', 'sortstore', 'stepgen', 'Run Algorithm'),
            e('e12', 'pathstore', 'stepgen'),
            e('e13', 'graphstore','stepgen'),
            e('e14', 'dpstore',   'stepgen'),
            e('e15', 'nqstore',   'stepgen'),
            e('e16', 'stepgen',   'stepsarr'),
          ]}
        />

        <FlowDiagram title="pathfinding visualiser — interactive grid"
          nodes={[
            n('grid',      'Grid Component',       'NxM cells · pointer events',                     cyan),
            n('walldrag',  'Left-click drag',      'toggle wall cells',                               muted),
            n('sedrag',    'Start/End drag',        'reposition source & target nodes',               muted),
            n('pathstore', 'usePathfindingStore',  'grid[][] · walls[] · start · end · algorithm',    cyan),
            n('dijkstra',  'Dijkstra',             'priority queue · non-negative weights',            cyan),
            n('astar',     'A*',                   'f = g + h · Manhattan heuristic',                 cyan),
            n('bfs',       'BFS',                  'FIFO · unweighted shortest path',                 cyan),
            n('dfs',       'DFS',                  'stack · full graph traversal',                    cyan),
            n('colors',    'Cell colours',         'unvisited → exploring → visited → optimal path',  muted),
          ]}
          edges={[
            e('e1',  'grid',      'walldrag'),
            e('e2',  'grid',      'sedrag'),
            e('e3',  'walldrag',  'pathstore'),
            e('e4',  'sedrag',    'pathstore'),
            e('e5',  'pathstore', 'dijkstra'),
            e('e6',  'pathstore', 'astar'),
            e('e7',  'pathstore', 'bfs'),
            e('e8',  'pathstore', 'dfs'),
            e('e9',  'dijkstra',  'colors', 'step captured'),
            e('e10', 'astar',     'colors'),
            e('e11', 'bfs',       'colors'),
            e('e12', 'dfs',       'colors'),
          ]}
        />
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
        <FlowDiagram title="end-to-end ML pipeline → API → frontend"
          nodes={[
            n('firms',    'FIRMS CSV',            'satellite fire data — data/firms/',                  muted),
            n('loaddata', 'ml/load_data.py',      'read CSV · parse lat/lon/acq_date/confidence/frp',   red),
            n('firedet',  'ml/fire_detection.py', 'convert dtypes · drop null coords · label ≥ 70',     red),
            n('severity', 'ml/severity_estimation.py','Google Earth Engine API · batch_size=50',         red),
            n('export',   'ml/export_results.py', 'fire_severity_all.geojson · metrics.json',           muted),
            n('fastapi',  'FastAPI :8000',         'backend/main.py · Uvicorn',                         red),
            n('fires_ep', '/fires/points',         'GeoJSON served',                                    muted),
            n('dash_ep',  '/dashboard/*',          '5 metric endpoints',                                muted),
            n('nextjs',   'Next.js 13 :3000',      'React 18 · Chakra UI',                              red),
            n('mappage',  '/map',                  'Leaflet · GeoJSON overlay',                         muted),
            n('dashpage', '/dashboard',            'KPI cards + Recharts',                              muted),
            n('theory',   '/theory',               'dNBR methodology',                                  muted),
          ]}
          edges={[
            e('e1',  'firms',    'loaddata'),
            e('e2',  'loaddata', 'firedet'),
            e('e3',  'firedet',  'severity'),
            e('e4',  'severity', 'export'),
            e('e5',  'export',   'fastapi'),
            e('e6',  'fastapi',  'fires_ep'),
            e('e7',  'fastapi',  'dash_ep'),
            e('e8',  'fires_ep', 'nextjs'),
            e('e9',  'dash_ep',  'nextjs'),
            e('e10', 'nextjs',   'mappage'),
            e('e11', 'nextjs',   'dashpage'),
            e('e12', 'nextjs',   'theory'),
          ]}
        />

        <FlowDiagram title="dNBR burn severity computation (per fire · Sentinel-2)"
          nodes={[
            n('fireevent',  'Fire event',          'lat · lon · acq_date',                             muted),
            n('prefirewin', 'GEE pre-fire window',  'acq_date − 30d to − 5d',                          red),
            n('postfirewin','GEE post-fire window', 'acq_date + 1d to +10d',                           red),
            n('prefire',    'Pre-fire Sentinel-2',  'Band B8 (NIR) · Band B12 (SWIR)',                 muted),
            n('nbr_pre',    'NBR_pre',              '(B8−B12)/(B8+B12)',                               red),
            n('postfire',   'Post-fire Sentinel-2', 'Band B8 (NIR) · Band B12 (SWIR)',                 muted),
            n('nbr_post',   'NBR_post',             '(B8−B12)/(B8+B12)',                               red),
            n('dnbr',       'dNBR',                 'NBR_pre − NBR_post',                              red),
            n('unburned',   'dNBR < 0.1',           'Unburned / Recovered',                            'border-green-500/50 bg-green-500/10 text-green-300'),
            n('low_sev',    '0.1 – 0.27',           'Low Severity',                                    amber),
            n('mod_sev',    '0.27 – 0.44',          'Moderate Severity',                               amber),
            n('high_sev',   '≥ 0.44',               'High Severity',                                   red),
            n('geojson',    'GeoJSON Point Feature', 'date · confidence · frp · dnbr · severity',      muted),
          ]}
          edges={[
            e('e1',  'fireevent',  'prefirewin',  'Sentinel-2 L2A query'),
            e('e2',  'fireevent',  'postfirewin'),
            e('e3',  'prefirewin', 'prefire'),
            e('e4',  'postfirewin','postfire'),
            e('e5',  'prefire',    'nbr_pre'),
            e('e6',  'postfire',   'nbr_post'),
            e('e7',  'nbr_pre',    'dnbr'),
            e('e8',  'nbr_post',   'dnbr'),
            e('e9',  'dnbr',       'unburned'),
            e('e10', 'dnbr',       'low_sev'),
            e('e11', 'dnbr',       'mod_sev'),
            e('e12', 'dnbr',       'high_sev'),
            e('e13', 'unburned',   'geojson'),
            e('e14', 'low_sev',    'geojson'),
            e('e15', 'mod_sev',    'geojson'),
            e('e16', 'high_sev',   'geojson'),
          ]}
        />

        <FlowDiagram title="GeoJSON feature schema"
          nodes={[
            n('featcoll',  'FeatureCollection',   '/fires/points response',                            red),
            n('feature',   'Feature objects',      null,                                               muted),
            n('geometry',  'geometry',             'type: "Point"',                                    muted),
            n('coords',    'coordinates',          '[longitude, latitude]',                            muted),
            n('properties','properties',           'fire metadata',                                    red),
            n('fdate',     'date',                 'YYYY-MM-DD',                                       muted),
            n('fconf',     'confidence',           '0–100',                                            muted),
            n('ffrp',      'frp',                  'Fire Radiative Power',                             muted),
            n('fdnbr',     'dnbr',                 'float',                                            muted),
            n('fsev',      'severity',             'Unburned|Low|Moderate|High',                       muted),
            n('fsat',      'satellite',            'NOAA-20 · Terra · Aqua',                           muted),
          ]}
          edges={[
            e('e1',  'featcoll',   'feature'),
            e('e2',  'feature',    'geometry'),
            e('e3',  'feature',    'properties'),
            e('e4',  'geometry',   'coords'),
            e('e5',  'properties', 'fdate'),
            e('e6',  'properties', 'fconf'),
            e('e7',  'properties', 'ffrp'),
            e('e8',  'properties', 'fdnbr'),
            e('e9',  'properties', 'fsev'),
            e('e10', 'properties', 'fsat'),
          ]}
        />
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
        <FlowDiagram title="full application flow"
          nodes={[
            n('csv_upload', 'CSV Upload',           'edge list: source, target, weight',                muted),
            n('parse',      'parseGraphFromCsv.js', 'PapaParse 5.5 → nodes[] + edges[] objects',        pink),
            n('graphstore', 'graphStore (Zustand 5)','nodes · edges · selectedAlgorithm · src · tgt',   pink),
            n('viewer3d',   'GraphViewer3D',         '@react-three/drei · all nodes + edges',            pink),
            n('threescene', 'Three.js scene',        'sphere nodes · line edges · orbit controls',       muted),
            n('forcelayout','Force-directed layout', 'spring physics positioning',                       muted),
            n('algengine',  'Algorithm engine',      'src/algorithms/ — on Run click',                   pink),
            n('dijkstra',   'Dijkstra',              'priority queue',                                   pink),
            n('bellman',    'Bellman-Ford',          'V-1 relaxations',                                  pink),
            n('astar',      'A*',                   'f = g + h',                                        pink),
            n('pathresult', 'pathNodes[] + cost',    'pathEdges[] + totalCost',                          muted),
            n('pathviewer', 'PathGraphViewer3D',     'isolated 3D scene — highlighted path + cost',      pink),
          ]}
          edges={[
            e('e1',  'csv_upload', 'parse',      'or select demo_input/'),
            e('e2',  'parse',      'graphstore'),
            e('e3',  'graphstore', 'viewer3d'),
            e('e4',  'graphstore', 'algengine'),
            e('e5',  'viewer3d',   'threescene'),
            e('e6',  'threescene', 'forcelayout'),
            e('e7',  'algengine',  'dijkstra'),
            e('e8',  'algengine',  'bellman'),
            e('e9',  'algengine',  'astar'),
            e('e10', 'dijkstra',   'pathresult'),
            e('e11', 'bellman',    'pathresult'),
            e('e12', 'astar',      'pathresult'),
            e('e13', 'pathresult', 'pathviewer'),
          ]}
        />

        <FlowDiagram title="algorithm complexity comparison"
          nodes={[
            n('dijk',       'Dijkstra',              'greedy · O((V+E) log V)',                          pink),
            n('dijk_heap',  'Min-heap priority queue',null,                                              muted),
            n('dijk_lim',   'non-negative weights',  null,                                              muted),
            n('dijk_opt',   'optimal for dense graphs',null,                                            muted),
            n('bell',       'Bellman-Ford',          'DP · O(V·E)',                                      pink),
            n('bell_relax', 'V−1 relaxation passes', null,                                              muted),
            n('bell_neg',   'handles negative weights',null,                                            muted),
            n('bell_cycle', 'detects negative cycles',null,                                             muted),
            n('as',         'A*',                    'heuristic · O(E log V) typical',                   pink),
            n('as_fn',      'f(n) = g(n) + h(n)',    null,                                              muted),
            n('as_heur',    'Euclidean/custom heuristic',null,                                          muted),
            n('as_fast',    'fastest when h admissible',null,                                           muted),
          ]}
          edges={[
            e('e1', 'dijk',      'dijk_heap'),
            e('e2', 'dijk_heap', 'dijk_lim'),
            e('e3', 'dijk_lim',  'dijk_opt'),
            e('e4', 'bell',      'bell_relax'),
            e('e5', 'bell_relax','bell_neg'),
            e('e6', 'bell_neg',  'bell_cycle'),
            e('e7', 'as',        'as_fn'),
            e('e8', 'as_fn',     'as_heur'),
            e('e9', 'as_heur',   'as_fast'),
          ]}
        />

        <FlowDiagram title="CSV generator (cs_generator/)"
          nodes={[
            n('cli',      'python csv_gen.py',       '--nodes N --edges E --max-weight W',              muted),
            n('genedges', 'Random edge list',         'nodes 0..N-1 · random source/target pairs',       pink),
            n('output',   'Output CSV',               'columns: source, target, weight — 500+ nodes',    muted),
            n('drop',     'Drop into Upload UI',      'instantly visualised in 3D',                      pink),
          ]}
          edges={[
            e('e1', 'cli',      'genedges'),
            e('e2', 'genedges', 'output'),
            e('e3', 'output',   'drop'),
          ]}
        />
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
        <FlowDiagram title="site structure — three pages"
          nodes={[
            n('index',    'index.html',              'EcoTrack landing · awareness + eco-tips',         green),
            n('calindex', 'calindex.html',           'Carbon Footprint Calculator',                     green),
            n('material', 'Material selector',       'Cement · Steel · Sand · Bricks · Concrete',       muted),
            n('grade',    'Grade dropdown',          'per-material grade options',                       muted),
            n('quantity', 'Quantity input',          'validated (must be > 0)',                          muted),
            n('formula',  'CO₂ = qty × coeff',      'coefficient[material][grade]',                    green),
            n('result',   'Result card',             'kg CO₂ equivalent · inline validation',            muted),
            n('cities',   'cities_index.html',       'City Emissions Dashboard',                        green),
            n('fetch',    'fetch(cities_data.json)', 'on DOMContentLoaded',                             green),
            n('citylist', 'City list rendered',      'input[type=text] live search filter',             green),
            n('clickcity','Click city',              'load 2012–2021 data',                             green),
            n('table',    'Year-by-year table',      'transport · industry · residential · other',       muted),
            n('total',    'Total column',            'sum of all categories per year',                   muted),
          ]}
          edges={[
            e('e1',  'index',    'calindex',  'smooth-scroll nav'),
            e('e2',  'index',    'cities'),
            e('e3',  'calindex', 'material'),
            e('e4',  'material', 'grade'),
            e('e5',  'grade',    'quantity'),
            e('e6',  'quantity', 'formula'),
            e('e7',  'formula',  'result'),
            e('e8',  'cities',   'fetch'),
            e('e9',  'fetch',    'citylist'),
            e('e10', 'citylist', 'clickcity'),
            e('e11', 'clickcity','table'),
            e('e12', 'table',    'total'),
          ]}
        />

        <FlowDiagram title="cities_data.json schema"
          nodes={[
            n('json',      'cities_data.json',  'static file — no backend',                           green),
            n('array',     'Array of city objects',null,                                              muted),
            n('city_name', 'city',              '"Mumbai" · "Delhi" · …',                             green),
            n('carbon',    'carbonFootprint',   'float — tonnes CO₂e',                               green),
            n('population','population',        'integer',                                            muted),
            n('region',    'region',            '"Asia"',                                             muted),
            n('edata',     'emission_data[]',   'year: 2012–2021',                                   green),
            n('transport', 'transportation',    'integer kt CO₂',                                    muted),
            n('industry',  'industry',          'integer kt CO₂',                                    muted),
            n('residential','residential',      'integer kt CO₂',                                    muted),
            n('others',    'others',            'integer kt CO₂',                                    muted),
          ]}
          edges={[
            e('e1',  'json',    'array'),
            e('e2',  'array',   'city_name'),
            e('e3',  'array',   'carbon'),
            e('e4',  'array',   'population'),
            e('e5',  'array',   'region'),
            e('e6',  'array',   'edata',      'cities_scrip.js extends'),
            e('e7',  'edata',   'transport'),
            e('e8',  'edata',   'industry'),
            e('e9',  'edata',   'residential'),
            e('e10', 'edata',   'others'),
          ]}
        />
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

};
