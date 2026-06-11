import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FlowDiagram } from "../components/FlowDiagram";
import { 
  Network, 
  Zap, 
  TrendingUp, 
  Code2
} from "lucide-react";

const PHASES = [
  {
    title: "Phase 1: Linux Admin",
    subtitle: "Server Provisioning",
    objectives: "Stable OS Core & Remote Shell Access",
    details: "Installed and optimized Ubuntu Server, configured user accounts, security policies, package repositories, hostname resolving, and system services using systemctl.",
    code: `# Check systemd service status
$ sudo systemctl status sshd
● ssh.service - OpenBSD Secure Shell server
   Loaded: loaded (/lib/systemd/system/ssh.service; enabled; ...)
   Active: active (running) since Mon 2026-06-08...`,
    skills: ["SSH keys", "systemctl", "apt administration", "journalctl monitoring"]
  },
  {
    title: "Phase 2: Network Design",
    subtitle: "Netplan Static IP & Redundancy",
    objectives: "Layer 3 Routing & Wireless Failover",
    details: "Assigned static IP parameters using Netplan to prevent lease resets. Implemented interface priorities and metrics to allow automatic failover to backup 5GHz wireless networks.",
    code: `# /etc/netplan/01-netcfg.yaml
network:
  version: 2
  ethernets:
    eth0:
      dhcp4: no
      addresses: [192.168.1.100/24]
      nameservers:
        addresses: [1.1.1.1, 8.8.8.8]
      routes:
        - to: default
          via: 192.168.1.1`,
    skills: ["Netplan configuration", "Default Gateways", "DNS Nameservers", "Routing metrics"]
  },
  {
    title: "Phase 3: Mesh VPN",
    subtitle: "Tailscale Private Overlay",
    objectives: "Zero-exposure Encrypted Remote Admin",
    details: "Implemented Tailscale WireGuard overlay networking. Allowed direct P2P connections via NAT traversal, facilitating admin commands from anywhere without public port forwarding.",
    code: `# Check active connections on Tailnet
$ tailscale status
100.101.24.43   inference-server   ignite@   linux   -
100.114.92.10   remote-laptop      ignite@   macOS   active; direct`,
    skills: ["Tailscale Mesh", "WireGuard VPN", "NAT Traversal", "Overlay Networking"]
  },
  {
    title: "Phase 4 & 5: Domain & DNS",
    subtitle: "Cloudflare DNS Nameservers",
    objectives: "Human-readable routing & propagation",
    details: "Linked amriteshsahu.me domain with Cloudflare. Managed A Records, CNAME aliases, and TTL settings, routing traffic through Cloudflare's secure nameserver infrastructure.",
    code: `# Query nameservers for propagation verification
$ dig NS amriteshsahu.me +short
alina.ns.cloudflare.com
ben.ns.cloudflare.com`,
    skills: ["DNS Records (A, CNAME)", "Nameservers", "TTL management", "Cloudflare WAF"]
  },
  {
    title: "Phase 6: Reverse Tunnels",
    subtitle: "Cloudflare Tunnel (cloudflared)",
    objectives: "Zero open inbound firewall ports",
    details: "Configured persistent outbound tunnels via cloudflared. Shuts down inbound port vectors entirely, utilizing Cloudflare edge routing to securely route public connections.",
    code: `# Verify active systemd cloudflared tunnel service
$ sudo systemctl status cloudflared
● cloudflared.service - Argo Tunnel
   Active: active (running) since Tue 2026-06-09...
   INFO: Connected to BLR (Bengaluru, India) edge.`,
    skills: ["Cloudflare Tunnel", "Outbound TCP proxies", "systemd daemons", "SSL Edge"]
  },
  {
    title: "Phase 7: DevOps Virtualization",
    subtitle: "Docker Microservices Stack",
    objectives: "Isolated, reproducible environments",
    details: "Deployed core services inside containerized environments using Docker. Managed volume attachments to preserve application state and bridge networks for container separation.",
    skills: ["Docker Engine", "Docker Compose", "Persistent Volumes", "Bridge Networks"]
  },
  {
    title: "Phase 8: Personal Cloud Storage",
    subtitle: "Nextcloud trusted_domains & Proxy Fixes",
    objectives: "Google Drive Alternative & OAuth",
    details: "Hosted Nextcloud inside a container. Addressed complex OAuth redirect loops and proxy header mismatches by manually rewriting overwrite.cli.url and trusted_domains variables.",
    code: `# PHP system config parameters
'trusted_domains' => array (
  0 => 'localhost',
  1 => 'amriteshsahu.me',
),
'overwrite.cli.url' => 'https://amriteshsahu.me',
'overwriteprotocol' => 'https',`,
    skills: ["Nextcloud Admin", "Reverse Proxy Headers", "OAuth 2.0 Flow", "PHP config editing"]
  },
  {
    title: "Phase 9: Access Management",
    subtitle: "Role-Based Access Control (RBAC)",
    objectives: "Privacy-centric storage hierarchy",
    details: "Developed user permissions and group structures to support family files, friends shared directories, and isolated admin volumes on ZFS storage blocks.",
    skills: ["Linux groups", "Permission Inheritance", "RBAC configurations", "Folder Hierarchies"]
  },
  {
    title: "Phase 10 & 11: AI Workspace",
    subtitle: "OpenClaw Agent Orchestration",
    objectives: "Multi-Model routing & Chat Integration",
    details: "Deployed OpenClaw to coordinate multi-model routing (OpenRouter, Anthropic). Debugged JSON configurations to route automated messaging triggers via selfChatMode on WhatsApp.",
    code: `# OpenClaw config.json channel setup
{
  "channels": {
    "whatsapp": {
      "enabled": true,
      "selfChatMode": true
    }
  }
}`,
    skills: ["OpenClaw platform", "API Integrations", "JSON schema validation", "Model routing"]
  }
];

const FLOWCHART_NODES = [
  {
    id: "1",
    type: "flowNode",
    data: {
      label: "Public Request",
      sub: "amriteshsahu.me · HTTPS",
      c: "border-sky-500/50 bg-sky-950/40 text-sky-200"
    }
  },
  {
    id: "2",
    type: "flowNode",
    data: {
      label: "Cloudflare Edge",
      sub: "SSL termination · DDoS · DNS",
      c: "border-orange-400/50 bg-orange-950/40 text-orange-200"
    }
  },
  {
    id: "3",
    type: "flowNode",
    data: {
      label: "cloudflared Tunnel",
      sub: "0 open inbound ports",
      c: "border-primary/60 bg-indigo-950/50 text-primary shadow-[0_0_18px_rgba(139,92,246,0.25)]"
    }
  },
  {
    id: "4",
    type: "flowNode",
    data: {
      label: "Ubuntu Server",
      sub: "ubuntu-core-01 · LAN only",
      c: "border-violet-400/50 bg-violet-950/40 text-violet-200"
    }
  },
  {
    id: "5",
    type: "flowNode",
    data: {
      label: "Docker Bridge",
      sub: "container network · NAT",
      c: "border-blue-400/50 bg-blue-950/40 text-blue-200"
    }
  },
  {
    id: "6",
    type: "flowNode",
    data: {
      label: "Nextcloud",
      sub: "cloud storage · :8080",
      c: "border-emerald-400/50 bg-emerald-950/40 text-emerald-200"
    }
  },
  {
    id: "7",
    type: "flowNode",
    data: {
      label: "OpenClaw",
      sub: "AI agent workspace · :3000",
      c: "border-amber-400/50 bg-amber-950/40 text-amber-200"
    }
  }
];

const FLOWCHART_EDGES = [
  { id: "e1-2", source: "1", target: "2", label: "HTTPS" },
  { id: "e2-3", source: "2", target: "3", label: "Zero Trust" },
  { id: "e3-4", source: "3", target: "4", label: "outbound only" },
  { id: "e4-5", source: "4", target: "5", label: "bridge net" },
  { id: "e5-6", source: "5", target: "6", label: ":8080" },
  { id: "e5-7", source: "5", target: "7", label: ":3000" }
];

export const Friday = () => {
  const [flowDirection, setFlowDirection] = useState("TB");

  useEffect(() => {
    const checkDirection = () => {
      setFlowDirection(window.innerWidth >= 768 ? "LR" : "TB");
    };
    checkDirection();
    window.addEventListener("resize", checkDirection);
    return () => window.removeEventListener("resize", checkDirection);
  }, []);

  // ── scroll page to top on mount ───────────────────────────────────────────
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      <main className="pt-32 pb-24 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl space-y-16">
          
          {/* Header Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
              <Zap className="h-3 w-3 animate-pulse" /> Self-Hosted Cloud Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Project <span className="text-primary">Friday</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              An enterprise-replicated cloud ecosystem built on Ubuntu Server to host a personal storage cloud, WireGuard overlay VPN, Zero-Trust Cloudflare edge tunnels, and multi-model AI agent workspaces.
            </p>
          </div>

          {/* ── Intro: What it is & How it's built ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">

            {/* What it is */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15">
                  <Zap className="h-4 w-4 text-primary" />
                </span>
                <h2 className="text-sm font-semibold font-mono text-primary uppercase tracking-widest">What it is</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                Friday is a fully self-hosted private cloud running 24/7 on a bare-metal Ubuntu Server box.
                It replicates enterprise cloud infrastructure — compute, storage, networking, and AI inference —
                entirely on-prem, with <strong className="text-foreground">zero inbound router ports exposed</strong>.
                All external access flows through outbound-only encrypted tunnels, making it as secure as a managed cloud
                without any subscription cost.
              </p>
              <ul className="space-y-1.5 text-xs font-mono text-muted-foreground">
                {[
                  "☁️  Personal S3-compatible cloud storage (Nextcloud)",
                  "🤖  Multi-model AI workspace (Ollama · Open WebUI)",
                  "🔐  Zero-Trust edge tunnels (Cloudflare Tunnel)",
                  "🌐  Private overlay VPN mesh (WireGuard)",
                  "📊  Containerised services via Docker Compose",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How it's built */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/15">
                  <Network className="h-4 w-4 text-indigo-400" />
                </span>
                <h2 className="text-sm font-semibold font-mono text-indigo-400 uppercase tracking-widest">How it's built</h2>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                The host runs <strong className="text-foreground">Ubuntu Server 22.04 LTS</strong> with a static
                Netplan IP, serving as the hypervisor for all services.
                Docker Compose stacks handle service isolation and restarts.
                A <strong className="text-foreground">Cloudflare Tunnel</strong> daemon creates an outbound-only
                encrypted pipe from the host to Cloudflare's edge — no port forwarding needed.
                <strong className="text-foreground"> WireGuard</strong> provides an always-on private mesh for
                device-to-server access from anywhere.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "OS",        value: "Ubuntu 22.04 LTS" },
                  { label: "Runtime",   value: "Docker Compose" },
                  { label: "Tunnel",    value: "Cloudflare Tunnel" },
                  { label: "VPN",       value: "WireGuard" },
                  { label: "Storage",   value: "Nextcloud + HDD" },
                  { label: "AI",        value: "Ollama · Open WebUI" },
                  { label: "DNS",       value: "Cloudflare DNS" },
                  { label: "SSL",       value: "Cloudflare Edge TLS" },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-lg border border-indigo-500/15 bg-indigo-500/5 px-3 py-2">
                    <div className="text-[10px] font-mono text-indigo-400/60 uppercase">{label}</div>
                    <div className="text-xs font-mono text-foreground/80 truncate">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>



          {/* Flowchart Section (Horizontal/Vertical ReactFlow Flowchart) */}
          <div className="space-y-6 text-left group/flow">
            <h3 className="text-lg font-bold font-mono text-primary flex items-center gap-2 border-b border-border/10 pb-3 cursor-pointer transition-all duration-300 hover:text-indigo-400 hover:pl-2 hover:border-indigo-500/30 group">
              <Network className="h-5 w-5 transition-transform duration-700 group-hover:rotate-180 text-primary group-hover:text-indigo-400" /> 
              <span>Cloud Edge Routing Flowchart</span>
            </h3>
            <FlowDiagram 
              nodes={FLOWCHART_NODES} 
              edges={FLOWCHART_EDGES} 
              direction={flowDirection} 
            />
          </div>

          {/* Detailed Engineering Phases */}
          <div className="space-y-6 text-left">
            <h3 className="text-lg font-bold font-mono text-primary flex items-center gap-2 border-b border-border/10 pb-3">
              <Code2 className="h-5 w-5" /> Development & Configuration Phases
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PHASES.map((phase, idx) => (
                <div key={idx} className="border border-border/40 rounded-2xl bg-zinc-950/80 p-6 shadow-2xl flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">{phase.title}</span>
                      <span className="text-[9px] font-mono text-muted-foreground px-2.5 py-0.5 rounded bg-zinc-900 border border-border/10">{phase.subtitle}</span>
                    </div>
                    <h4 className="text-base font-semibold text-slate-200 mb-2">{phase.objectives}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      {phase.details}
                    </p>

                    {/* Phase-specific code snippet */}
                    {phase.code && (
                      <div className="rounded-xl border border-border/20 bg-zinc-950 overflow-hidden font-mono text-[10.5px] p-4 text-emerald-400/90 whitespace-pre overflow-x-auto select-all max-h-[160px] leading-relaxed">
                        {phase.code}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-border/10">
                    <div className="flex flex-wrap gap-1">
                      {phase.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-border/10 text-slate-400">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SRE & DevOps Technical Skills Grid */}
          <div className="space-y-6 text-left">
            <h3 className="text-lg font-bold font-mono text-primary flex items-center gap-2 border-b border-border/10 pb-3">
              <TrendingUp className="h-5 w-5" /> Technical Infrastructure Skills Matrix
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Linux Systems Administration", skills: ["Ubuntu Server", "SSH keys", "Systemd Services", "User Management", "Journalctl daemon audits"] },
                { title: "Networking & VPNs", skills: ["TCP/IP Subnetting", "DNS Records (A, CNAME)", "WireGuard VPN", "Tailscale routing", "Netplan multi-NIC gateway metrics"] },
                { title: "Cloud Edge & Tunnels", skills: ["Cloudflare proxying", "outbound tunnels (cloudflared)", "DDoS mitigation", "SSL verification"] },
                { title: "Containerization & DevOps", skills: ["Docker Engine", "Docker Compose stacks", "Volume mappings", "Network bridges", "Daemon log routing"] },
                { title: "Zero-Trust Cybersecurity", skills: ["Outbound tunnel isolation", "0-port inbound routing", "Private IP meshes", "RBAC permissions"] },
                { title: "Self-Hosted Services", skills: ["Nextcloud storage cluster", "OpenClaw AI gateway", "Grafana dashboards", "Prometheus telemetry scraping"] }
              ].map((matrix, idx) => (
                <div key={idx} className="border border-border/40 rounded-2xl bg-zinc-950/80 p-5 shadow-lg space-y-3">
                  <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-wider">{matrix.title}</h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {matrix.skills.map((s, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-border/10 text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>



        </div>
      </main>

      <Footer />
    </div>
  );
};
