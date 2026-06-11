import { Terminal, FileJson, FileCode } from "lucide-react";
import { useState, useRef, useEffect } from "react";

// ── bio.json cycling profiles ──────────────────────────────────────────────
const PROFILES = [
  `{
  "name": "Amritesh Sahu",
  "role": "AI/ML + Backend",
  "college": "RVCE, Bengaluru",
  "awards": [
    "Rotaractor of the Year 2025"
  ],
  "focus": [
    "Multi-Agent AI",
    "Scalable APIs"
  ],
  "openToWork": true
}`,
  `{
  "stack": "Python, FastAPI, React",
  "ai_tools": [
    "LangGraph",
    "PyTorch",
    "Qdrant"
  ],
  "databases": [
    "PostgreSQL",
    "Supabase"
  ],
  "infra": "Docker + Ubuntu",
  "leetcode": "active 💻"
}`,
  `{
  "mission": "Bridge AI research",
  "interests": [
    "Multi-Agent Systems",
    "Open Source"
  ],
  "hobbies": [
    "Rotaract",
    "LeetCode"
  ],
  "current_build": "Agent Pipeline",
  "status": "building 🚀"
}`,
];

// ── JSON syntax highlighter (handles partial strings mid-type) ─────────────
function tokenizeLine(line) {
  const tokens = [];
  let i = 0;
  while (i < line.length) {
    if (/\s/.test(line[i])) {
      let j = i;
      while (j < line.length && /\s/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), cls: "text-slate-300" });
      i = j;
      continue;
    }
    if (line[i] === '"') {
      let j = i + 1;
      while (j < line.length && line[j] !== '"') {
        if (line[j] === '\\') j++;
        j++;
      }
      if (j < line.length) j++;
      const str = line.slice(i, j);
      let k = j;
      while (k < line.length && /\s/.test(line[k])) k++;
      const isKey = line[k] === ':';
      tokens.push({ text: str, cls: isKey ? "text-purple-400" : "text-emerald-400" });
      i = j;
      continue;
    }
    const kw = ["true", "false", "null"].find(w => line.slice(i).startsWith(w));
    if (kw) {
      tokens.push({ text: kw, cls: "text-amber-400" });
      i += kw.length;
      continue;
    }
    if (/\d/.test(line[i])) {
      let j = i;
      while (j < line.length && /[\d.eE+\-]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), cls: "text-amber-400" });
      i = j;
      continue;
    }
    if ("{}[]".includes(line[i])) {
      tokens.push({ text: line[i], cls: "text-pink-400" });
      i++;
      continue;
    }
    tokens.push({ text: line[i], cls: "text-slate-400" });
    i++;
  }
  return tokens;
}

function renderJSON(text) {
  const lines = text.split("\n");
  return lines.map((line, li) => (
    <div key={li}>
      {tokenizeLine(line).map((tok, ti) => (
        <span key={ti} className={tok.cls}>{tok.text}</span>
      ))}
    </div>
  ));
}

// ── Component ──────────────────────────────────────────────────────────────
export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("json");

  // typewriter state for bio.json
  const [jsonText, setJsonText] = useState("");
  const jsonAnimRef = useRef({ phase: "typing", profileIdx: 0, charIdx: 0 });
  const jsonTimerRef = useRef(null);
  const jsonRunningRef = useRef(false);

  // terminal state
  const [terminalHistory, setTerminalHistory] = useState([
    { type: "input", text: "neofetch" },
    { type: "output", text: "OS: RVCE-DS OS v2026.06\nHost: Amritesh Sahu Portfolio\nKernel: React 18.3 + Vite\nUptime: 3 years Data Science Undergrad\nShell: zsh (LeetCode Active)\nIDE: VS Code (Stellar Theme)\nStatus: Ready for Internships & Projects 🚀" },
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollContainerRef = useRef(null);
  const typingTimerRef = useRef(null);
  const outputTimerRef = useRef(null);

  // ── cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      clearTimeout(jsonTimerRef.current);
      clearInterval(typingTimerRef.current);
      clearInterval(outputTimerRef.current);
    };
  }, []);

  // ── bio.json typewriter loop ──────────────────────────────────────────────
  useEffect(() => {
    if (activeTab !== "json" || jsonRunningRef.current) return;
    jsonRunningRef.current = true;

    function tick() {
      const a = jsonAnimRef.current;
      const profile = PROFILES[a.profileIdx];

      if (a.phase === "typing") {
        if (a.charIdx < profile.length) {
          a.charIdx++;
          setJsonText(profile.slice(0, a.charIdx));
          jsonTimerRef.current = setTimeout(tick, 22);
        } else {
          a.phase = "pausing";
          jsonTimerRef.current = setTimeout(() => {
            a.phase = "deleting";
            tick();
          }, 2200);
        }
      } else if (a.phase === "deleting") {
        if (a.charIdx > 0) {
          a.charIdx = Math.max(0, a.charIdx - 4);
          setJsonText(profile.slice(0, a.charIdx));
          jsonTimerRef.current = setTimeout(tick, 12);
        } else {
          a.profileIdx = (a.profileIdx + 1) % PROFILES.length;
          a.phase = "typing";
          jsonTimerRef.current = setTimeout(tick, 350);
        }
      }
    }

    tick();

    return () => {
      jsonRunningRef.current = false;
      clearTimeout(jsonTimerRef.current);
      // reset so next mount restarts cleanly
      jsonAnimRef.current = { phase: "typing", profileIdx: 0, charIdx: 0 };
      setJsonText("");
    };
  }, [activeTab]);

  // ── terminal auto-scroll ──────────────────────────────────────────────────
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [terminalHistory]);

  // ── terminal commands ─────────────────────────────────────────────────────
  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;
    clearInterval(typingTimerRef.current);
    clearInterval(outputTimerRef.current);

    if (trimmed === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      setIsTyping(false);
      return;
    }

    const responses = {
      help: "Available commands: whoami, neofetch, skills, contact, clear",
      whoami: "Name: Amritesh Sahu\nFocus: AI/ML pipelines, Multi-Agent workflows, and scalable backend services.\nMission: Bridge the gap between research-level AI and robust production code.",
      neofetch: "OS: RVCE-DS OS v2026.06\nHost: Amritesh Sahu Portfolio\nKernel: React 18.3 + Vite\nUptime: 3 years Data Science Undergrad\nShell: zsh (LeetCode Active)\nIDE: VS Code (Stellar Theme)\nStatus: Ready for Internships & Projects 🚀",
      skills: "Languages: Python, JS, TS, Java\nFrameworks: FastAPI, Node.js, Express, React, Next.js\nAI/ML Tools: LangGraph, PyTorch, Qdrant, TensorFlow, Pandas, NumPy\nInfra: Ubuntu, Docker, Cloudflare, Tailscale, Git, Firebase",
      contact: "Email: amriteshsahu96@gmail.com\nLocation: Bengaluru, India\nRotaract: International Services Director (Rotaractor of the Year 2024-25)",
    };
    const response = responses[trimmed] ?? `zsh: command not found: ${trimmed}. Type 'help' for available commands.`;

    setTerminalInput("");
    setIsTyping(true);
    setTerminalHistory(prev => [...prev, { type: "input", text: cmd }, { type: "output", text: "" }]);

    const lines = response.split("\n");
    let lineIdx = 0;
    let built = "";
    outputTimerRef.current = setInterval(() => {
      if (lineIdx < lines.length) {
        built += (built ? "\n" : "") + lines[lineIdx++];
        setTerminalHistory(prev => {
          const next = [...prev];
          if (next.at(-1)?.type === "output") next[next.length - 1] = { type: "output", text: built };
          return next;
        });
      } else {
        clearInterval(outputTimerRef.current);
        setIsTyping(false);
      }
    }, 60);
  };

  const simulateTyping = (cmd) => {
    if (isTyping) return;
    setIsTyping(true);
    setTerminalInput("");
    clearInterval(typingTimerRef.current);
    clearInterval(outputTimerRef.current);

    let idx = 0;
    typingTimerRef.current = setInterval(() => {
      if (idx < cmd.length) {
        const char = cmd[idx];
        setTerminalInput(prev => prev + char);
        idx++;
      } else {
        clearInterval(typingTimerRef.current);
        setTimeout(() => executeCommand(cmd), 150);
      }
    }, 55);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isTyping) executeCommand(terminalInput);
  };

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <section id="about" className="relative">

      {/* Desktop: 5-part layout */}
      <div className="hidden md:flex w-full items-stretch z-10 py-20">
        <div className="w-[20vw] shrink-0" />

        {/* About text */}
        <div className="w-[25vw] shrink-0 flex flex-col justify-center space-y-7">
          <h2 className="text-4xl md:text-5xl font-bold text-left">
            About <span className="text-primary">Me</span>
          </h2>
          <h3 className="text-xl font-semibold text-left leading-snug">
            Data Science Undergraduate —<br />AI/ML + Backend Systems
          </h3>
          <p className="text-base text-muted-foreground text-justify leading-relaxed">
            I'm Amritesh Sahu, a Data Science undergraduate at RV College of Engineering, Bengaluru,
            building intelligent systems at the intersection of AI/ML and backend engineering —
            from multi-agent pipelines to full-stack platforms.
          </p>
          <p className="text-base text-muted-foreground text-justify leading-relaxed">
            International Services Director at Rotaract Club of RVCE (2025–26),
            Rotaractor of the Year 2024–25, and active LeetCode practitioner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a href="#contact" className="cosmic-button">Get In Touch</a>
            <a
              href="/Amritesh_s_Resume.pdf"
              target="_blank"
              className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-center font-medium"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="w-[5vw] shrink-0" />

        {/* Editor / Terminal */}
        <div className="w-[44vw] shrink-0 flex flex-col">
          <div className="flex-1 max-h-[380px] rounded-2xl border border-border/40 bg-zinc-950/80 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden">

            {/* Window chrome */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/20 bg-zinc-900/60 shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-xs font-mono text-muted-foreground">amritesh-profile</div>
              <div className="w-10" />
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border/20 bg-zinc-900/30 text-xs font-mono shrink-0 overflow-x-auto">
              {[
                { id: "json",     icon: <FileJson className="h-3.5 w-3.5 text-amber-500" />,   label: "bio.json" },
                { id: "python",   icon: <FileCode  className="h-3.5 w-3.5 text-blue-400" />,    label: "agent.py" },
                { id: "terminal", icon: <Terminal  className="h-3.5 w-3.5 text-emerald-400" />, label: "zsh" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 border-r border-border/20 transition-colors duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-zinc-950/90 text-primary border-t-2 border-t-primary"
                      : "text-muted-foreground hover:bg-zinc-900/40 hover:text-foreground"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div ref={scrollContainerRef} className="flex-1 p-4 font-mono text-left text-xs overflow-auto leading-relaxed select-text">

              {/* bio.json — cycling typewriter */}
              {activeTab === "json" && (
                <pre className="text-slate-300 whitespace-pre">
                  {renderJSON(jsonText)}
                  <span className="animate-[blink_1s_step-end_infinite] text-primary">█</span>
                </pre>
              )}

              {/* agent.py */}
              {activeTab === "python" && (
                <pre className="text-slate-300 whitespace-pre">
                  <div><span className="text-pink-400">class</span> <span className="text-blue-400">AmriteshSahu</span>:</div>
                  <div>{"  "}<span className="text-pink-400">def</span> <span className="text-purple-400">__init__</span>(<span className="text-amber-400">self</span>):</div>
                  <div>{"    "}<span className="text-amber-400">self</span>.focus = <span className="text-emerald-400">"AI/ML + Backend"</span></div>
                  <div>{"    "}<span className="text-amber-400">self</span>.stack = [</div>
                  <div>{"      "}<span className="text-emerald-400">"LangGraph"</span>,</div>
                  <div>{"      "}<span className="text-emerald-400">"FastAPI"</span>,</div>
                  <div>{"      "}<span className="text-emerald-400">"PyTorch"</span>,</div>
                  <div>{"      "}<span className="text-emerald-400">"Qdrant"</span>,</div>
                  <div>{"    "}]</div>
                  <div></div>
                  <div>{"  "}<span className="text-pink-400">def</span> <span className="text-purple-400">build</span>(<span className="text-amber-400">self</span>):</div>
                  <div>{"    "}<span className="text-pink-400">return</span> <span className="text-emerald-400">"ship it 🚀"</span></div>
                </pre>
              )}

              {/* zsh terminal */}
              {activeTab === "terminal" && (
                <div className="flex flex-col h-full text-emerald-400/90">
                  <div className="flex-1 space-y-2">
                    {terminalHistory.map((item, idx) => (
                      <div key={idx} className="whitespace-pre-wrap font-mono">
                        {item.type === "input" ? (
                          <div>
                            <span className="text-primary font-bold">~$</span>{" "}
                            <span className="text-white">{item.text}</span>
                          </div>
                        ) : (
                          <div className="text-slate-300 pl-3">{item.text}</div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-2 border-t border-border/10 flex items-center shrink-0">
                    <span className="text-primary font-bold mr-2 select-none">~$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      readOnly={isTyping}
                      className="bg-transparent border-none outline-hidden text-white flex-1 font-mono focus:ring-0 p-0 text-xs disabled:opacity-75 caret-primary"
                      placeholder={isTyping ? "Processing..." : "type 'help'..."}
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5 text-xs select-none">
                    {["whoami", "neofetch", "skills", "contact", "clear"].map((cmd) => (
                      <button
                        key={cmd}
                        onClick={() => simulateTyping(cmd)}
                        disabled={isTyping}
                        className="px-2 py-0.5 rounded bg-zinc-900 border border-border/20 text-slate-300 hover:border-primary/50 hover:text-white transition-colors duration-200 font-mono cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        <div className="w-[20vw] shrink-0" />
      </div>

      {/* Mobile: stacked */}
      <div className="flex md:hidden flex-col px-6 space-y-8 py-20">
        <h2 className="text-4xl font-bold text-left">
          About <span className="text-primary">Me</span>
        </h2>
        <div className="space-y-5">
          <h3 className="text-xl font-semibold text-left leading-snug">
            Data Science Undergraduate — AI/ML + Backend Systems
          </h3>
          <p className="text-base text-muted-foreground text-justify leading-relaxed">
            I'm Amritesh Sahu, a Data Science undergraduate at RV College of Engineering, Bengaluru,
            building intelligent systems at the intersection of AI/ML and backend engineering —
            from multi-agent pipelines to full-stack platforms.
          </p>
          <p className="text-base text-muted-foreground text-justify leading-relaxed">
            International Services Director at Rotaract Club of RVCE (2025–26),
            Rotaractor of the Year 2024–25, and active LeetCode practitioner.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <a href="#contact" className="cosmic-button text-center">Get In Touch</a>
            <a
              href="/Amritesh_s_Resume.pdf"
              target="_blank"
              className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300 text-center font-medium"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* bio.json on mobile */}
        <div className="rounded-2xl border border-border/40 bg-zinc-950/80 shadow-xl overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/20 bg-zinc-900/60">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-muted-foreground ml-2">bio.json</span>
          </div>
          <div className="flex-1 p-4 font-mono text-xs overflow-auto">
            <pre className="text-slate-300 whitespace-pre">
              {renderJSON(jsonText)}
              <span className="animate-[blink_1s_step-end_infinite] text-primary">█</span>
            </pre>
          </div>
        </div>
      </div>

    </section>
  );
};
