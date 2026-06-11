import React, { useState } from "react";
import { 
  Terminal, 
  Cpu, 
  Layers, 
  Copy, 
  Check, 
  ExternalLink, 
  Folder, 
  Code,
  Sparkles,
  Command
} from "lucide-react";

const CONFIG_FILES = {
  zshrc: {
    name: ".zshrc",
    language: "bash",
    description: "Zsh configuration with custom aliases, auto-suggestions, and Starship prompt setup.",
    code: `# Custom aliases for productivity
alias ll="ls -lah"
alias gs="git status"
alias gd="git diff"
alias dps="docker ps --format 'table {{.Names}}\\t{{.Status}}\\t{{.Ports}}'"
alias dlogs="docker logs -f --tail 100"
alias hlab="ssh ignite@192.168.1.100 -p 22"
alias vpn-up="tailscale up --accept-routes"

# Starship shell prompt initialization
eval "$(starship init zsh)"

# Enable Zsh features
source /usr/share/zsh-autosuggestions/zsh-autosuggestions.zsh
source /usr/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh`
  },
  tmux: {
    name: ".tmux.conf",
    language: "tmux",
    description: "Terminal multiplexer configuration for persistent sessions, custom split binds, and mouse mode.",
    code: `# Enable mouse control (clickable windows, panes, resizable panes)
set -g mouse on

# Remap split pane window bindings to match visual layout
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"
unbind '"'
unbind %

# Switch panes using Alt-arrow without prefix
bind -n M-Left select-pane -L
bind -n M-Right select-pane -R
bind -n M-Up select-pane -U
bind -n M-Down select-pane -D

# Design customizations (dark cosmic status bar)
set -g status-bg black
set -g status-fg '#8B5CF6'`
  },
  neovim: {
    name: "init.lua",
    language: "lua",
    description: "Neovim config map setup, keybindings for tab navigation, and packet-saving shortcuts.",
    code: `-- NeoVim Custom Config init.lua
vim.g.mapleader = " "

-- Basic editor configurations
vim.opt.number = true
vim.opt.relativenumber = true
vim.opt.tabstop = 4
vim.opt.shiftwidth = 4
vim.opt.expandtab = true

-- Quick buffer navigation
vim.keymap.set("n", "<Tab>", ":bnext<CR>", { silent = true })
vim.keymap.set("n", "<S-Tab>", ":bprevious<CR>", { silent = true })

-- Save and exit leader shortcuts
vim.keymap.set("n", "<leader>w", ":w<CR>")
vim.keymap.set("n", "<leader>q", ":q<CR>")
vim.keymap.set("n", "<leader>pv", vim.cmd.Ex)`
  }
};

const DEV_TOOLS = [
  {
    icon: <Terminal className="h-5 w-5 text-indigo-400" />,
    title: "Alacritty Terminal",
    description: "GPU-accelerated terminal emulator configured for minimum latency and cosmic theme styling."
  },
  {
    icon: <Cpu className="h-5 w-5 text-emerald-400" />,
    title: "Vim Keybindings",
    description: "Mouse-free traversal mapped across VS Code and Neovim to maximize keystroke efficiency."
  },
  {
    icon: <Layers className="h-5 w-5 text-purple-400" />,
    title: "Tmux Workspaces",
    description: "Persistent background workspace structures, allowing instant context restoration after SSH reconnects."
  },
  {
    icon: <Folder className="h-5 w-5 text-blue-400" />,
    title: "Dotfiles Automations",
    description: "Automated dotfile management via symb link scripting for rapid workspace replication."
  }
];

export const BeyondIDESection = () => {
  const [activeTab, setActiveTab] = useState("zshrc");
  const [copied, setCopied] = useState(false);

  const activeConfig = CONFIG_FILES[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeConfig.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="beyond-ide" className="py-24 px-4 relative bg-zinc-950/40 border-t border-border/10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-5xl space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Command className="h-3 w-3" /> Custom Developer Environment
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Beyond the <span className="text-primary">IDE</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Optimizing the development workspace outside the code editor. Leveraging CLI tools, dotfile automations, terminal multiplexers, and custom shells to build a rapid, reproducible development environment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: DEV TOOLS LIST */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <h3 className="text-base font-bold font-mono text-primary uppercase tracking-wider mb-6 flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Environment Core
            </h3>

            <div className="space-y-4">
              {DEV_TOOLS.map((tool, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl border border-border/20 bg-zinc-900/10 hover:bg-zinc-900/30 hover:border-border/60 transition-all duration-300 group flex items-start gap-4"
                >
                  <div className="p-2 rounded-lg bg-zinc-900 border border-border/10 group-hover:border-primary/30 transition-colors">
                    {tool.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-200">{tool.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-colors pl-1"
              >
                <Folder className="h-3.5 w-3.5" /> View Dotfiles Repository <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: CONFIGURATION VIEWER (MOCK EDITOR) */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <h3 className="text-base font-bold font-mono text-primary uppercase tracking-wider mb-6 flex items-center gap-2">
              <Code className="h-4 w-4" /> Dotfile Code Viewer
            </h3>

            <div className="border border-border/40 rounded-2xl bg-black shadow-2xl flex flex-col overflow-hidden">
              
              {/* Tab Selector Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-border/20 bg-zinc-900/60 select-none">
                <div className="flex gap-2">
                  {Object.keys(CONFIG_FILES).map((key) => {
                    const file = CONFIG_FILES[key];
                    const isActive = activeTab === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                          isActive 
                            ? "bg-zinc-950 text-primary border border-border/20 font-semibold" 
                            : "text-muted-foreground hover:text-slate-200"
                        }`}
                      >
                        {file.name}
                      </button>
                    );
                  })}
                </div>
                
                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg border border-border/20 bg-zinc-900 hover:bg-zinc-800 text-muted-foreground hover:text-slate-200 transition-all cursor-pointer flex items-center gap-1 text-[10px] font-mono"
                  title="Copy configuration"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Description Pane */}
              <div className="px-4 py-3 bg-zinc-950 border-b border-border/10 text-xs text-muted-foreground font-mono leading-relaxed">
                {activeConfig.description}
              </div>

              {/* Terminal Code Body */}
              <div className="p-4 font-mono text-[11px] overflow-x-auto leading-relaxed bg-zinc-950 text-slate-300 max-h-[340px] overflow-y-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    {activeConfig.code.split("\n").map((line, idx) => (
                      <tr key={idx} className="hover:bg-zinc-900/30">
                        <td className="w-8 pr-4 text-right text-muted-foreground/40 select-none border-r border-border/5">
                          {idx + 1}
                        </td>
                        <td className="pl-4 whitespace-pre pr-4 text-slate-300">
                          {line || " "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
