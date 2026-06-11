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
    title: "Phase 1: Linux Administration",
    subtitle: "Ubuntu Server Provisioning",
    objectives: "Stable OS Core & Headless Remote Shell Access",
    details: "Replaced the existing OS with Ubuntu Server — no GUI, significantly lower resource consumption. Created a bootable USB, ran the installer, and configured hostname, username, password, and network settings. After booting into the CLI, ran apt update && apt upgrade to apply security patches. Installed and verified OpenSSH so the laptop could be managed entirely over the network from that point forward.",
    code: `# Verify SSH service is active and enabled
$ sudo systemctl status ssh
● ssh.service - OpenBSD Secure Shell server
   Loaded: loaded (/lib/systemd/system/ssh.service; enabled; ...)
   Active: active (running) since Mon 2026-06-08...`,
    skills: ["Ubuntu Server LTS", "SSH keys", "systemctl", "apt administration", "journalctl monitoring"]
  },
  {
    title: "Phase 2: Network Design",
    subtitle: "Netplan Static IP & Reliability",
    objectives: "Stable Layer-3 Address for All Services",
    details: "DHCP assignment meant the server's IP could change on every reboot or lease expiry, breaking SSH sessions and cloud access. Configured a permanent static IP (192.168.29.50) using Netplan yaml. Also explored Wi-Fi failover configurations to keep the server reachable if the primary network dropped — since the server relied on the PG's shared Wi-Fi, uptime depended on network reliability.",
    code: `# /etc/netplan/01-netcfg.yaml
network:
  version: 2
  wifis:
    wlan0:
      dhcp4: no
      addresses: [192.168.29.50/24]
      nameservers:
        addresses: [1.1.1.1, 8.8.8.8]
      routes:
        - to: default
          via: 192.168.29.1`,
    skills: ["Netplan configuration", "Static IP", "Default Gateways", "DNS Nameservers", "Routing metrics"]
  },
  {
    title: "Phase 3: Mesh VPN",
    subtitle: "Tailscale Private Overlay Network",
    objectives: "Zero-Exposure Encrypted Remote Administration",
    details: "Traditional remote access via port forwarding introduces inbound firewall exposure and requires router control — neither of which was available at the PG. Installed Tailscale, which creates a private WireGuard-encrypted mesh between devices. Every connected device gets a stable private Tailscale IP. The server became reachable from college, home, or anywhere — no port forwarding, no public IP, end-to-end encrypted.",
    code: `# Check active connections on Tailnet
$ tailscale status
100.101.24.43   ubuntu-server   ignite@   linux   -
100.114.92.10   macbook         ignite@   macOS   active; direct`,
    skills: ["Tailscale Mesh", "WireGuard VPN", "NAT Traversal", "Overlay Networking"]
  },
  {
    title: "Phase 4 & 5: Domain & DNS",
    subtitle: "Cloudflare DNS Nameservers",
    objectives: "Human-Readable Routing & Propagation",
    details: "Registered amriteshsahu.me and linked it to Cloudflare's nameservers. Configured A records, CNAME aliases, and TTL settings. Cloudflare acts as the DNS layer for all public-facing subdomains — portfolio, cloud storage, status — routing traffic to the Cloudflare edge before it ever reaches the server.",
    code: `# Query nameservers for propagation verification
$ dig NS amriteshsahu.me +short
bailey.ns.cloudflare.com
etienne.ns.cloudflare.com`,
    skills: ["DNS Records (A, CNAME)", "Nameservers", "TTL management", "Cloudflare WAF"]
  },
  {
    title: "Phase 6: Reverse Tunnels",
    subtitle: "Cloudflare Tunnel (cloudflared)",
    objectives: "Zero Open Inbound Firewall Ports",
    details: "Configured a persistent outbound-only Cloudflare Tunnel daemon via cloudflared. The tunnel establishes an outbound TCP connection from the server to Cloudflare's edge — public requests arrive at Cloudflare, travel inward through the tunnel, and hit Nginx on localhost:80. Zero inbound ports need to be open. This solved the no-router-access constraint entirely.",
    code: `# Verify active systemd cloudflared tunnel service
$ sudo systemctl status cloudflared
● cloudflared.service - Argo Tunnel
   Active: active (running) since Tue 2026-06-09...
   INFO: Connected to BLR (Bengaluru, India) edge.`,
    skills: ["Cloudflare Tunnel", "Outbound TCP proxies", "systemd daemons", "SSL Edge TLS"]
  },
  {
    title: "Phase 7: Containerization",
    subtitle: "Docker Microservices Stack",
    objectives: "Isolated, Reproducible Service Environments",
    details: "Rather than installing services directly on the host, Docker was used for isolation, easy upgrades, and portability. Docker Compose orchestrates the stack and ensures services restart automatically after reboots. Each service runs in its own container with persistent volume mounts and a bridge network for isolation — Nextcloud, its database, and OpenClaw all run as separate containers.",
    skills: ["Docker Engine", "Docker Compose", "Persistent Volumes", "Bridge Networks", "Service restart policies"]
  },
  {
    title: "Phase 8 & 9: Personal Cloud Storage",
    subtitle: "Nextcloud — Google Drive Alternative",
    objectives: "Multi-User Private Cloud with File Sync",
    details: "Deployed Nextcloud in a Docker container with a dedicated database container. Created the first admin account with full control over users, storage, and permissions. Nextcloud provides file upload (documents, images, videos, PDFs), browser access, desktop/mobile client sync, and folder sharing. Fixed OAuth redirect loops and proxy header mismatches by manually editing trusted_domains and overwrite.cli.url in the PHP config.",
    code: `# PHP system config parameters
'trusted_domains' => array (
  0 => 'localhost',
  1 => 'cloud.amriteshsahu.me',
),
'overwrite.cli.url' => 'https://cloud.amriteshsahu.me',
'overwriteprotocol' => 'https',`,
    skills: ["Nextcloud Admin", "Reverse Proxy Headers", "OAuth 2.0 Flow", "PHP config editing", "Docker Compose"]
  },
  {
    title: "Phase 10: Access Management",
    subtitle: "Role-Based Access Control (RBAC)",
    objectives: "Privacy-Centric Multi-User Storage Hierarchy",
    details: "Configured Nextcloud's sharing and permission system to support multiple user accounts — each with separate login credentials, personal storage space, and independent file ownership. Family members cannot see each other's files by default. Shared folders are explicitly granted. Linux group permissions and folder hierarchies enforce the same isolation at the OS level for ZFS storage blocks.",
    skills: ["Linux groups", "Permission Inheritance", "RBAC configurations", "Folder Hierarchies", "Nextcloud sharing"]
  },
  {
    title: "Phase 11: AI Workspace",
    subtitle: "OpenClaw Agent Orchestration",
    objectives: "Multi-Model Routing & Automated Workflows",
    details: "Deployed OpenClaw to coordinate multi-model routing across OpenRouter and Anthropic APIs. Configured JSON channel settings for WhatsApp selfChatMode integration, enabling automated messaging triggers. The server now doubles as an AI workspace — model inference, agent pipelines, and document processing all run locally.",
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
              Transforming an old laptop into a reliable 24/7 private cloud platform — personal storage, secure remote access, containerised services, and AI workspaces — built entirely on open-source software with full data ownership.
            </p>
          </div>

          {/* Intro: What it is & How it's built */}
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
                Friday is an unused HP Pavilion laptop repurposed into a 24/7 bare-metal Ubuntu Server.
                Instead of renting a VPS or paying for Google Drive, the goal was complete ownership —
                of the hardware, the data, the users, and the infrastructure.
                The result is a private cloud accessible from anywhere with <strong className="text-foreground">zero inbound firewall ports open</strong>,
                all external traffic flowing through an outbound-only Cloudflare Tunnel.
              </p>
              <ul className="space-y-1.5 text-xs font-mono text-muted-foreground">
                {[
                  "☁️  Personal cloud storage — Google Drive alternative (Nextcloud)",
                  "🔐  Zero-Trust edge tunnels — no port forwarding (Cloudflare Tunnel)",
                  "🌐  Private overlay VPN mesh for admin access (Tailscale)",
                  "🤖  Multi-model AI workspace (OpenClaw · Ollama)",
                  "📦  Containerised services via Docker Compose",
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
                The host runs <strong className="text-foreground">Ubuntu Server 24.04 LTS</strong> with a static
                Netplan IP (192.168.29.50), serving as the base for all containerised services.
                Docker Compose stacks handle service isolation and automatic restarts.
                A <strong className="text-foreground">Cloudflare Tunnel</strong> daemon runs as a systemd service,
                creating an outbound-only encrypted pipe to Cloudflare's edge — no router access or port
                forwarding needed. <strong className="text-foreground">Tailscale</strong> provides a private WireGuard
                mesh for SSH and admin access from any device globally.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Hardware",  value: "HP Pavilion 14 · i5 12th Gen" },
                  { label: "OS",        value: "Ubuntu Server 24.04 LTS" },
                  { label: "Runtime",   value: "Docker Compose" },
                  { label: "Tunnel",    value: "Cloudflare Tunnel" },
                  { label: "VPN",       value: "Tailscale (WireGuard)" },
                  { label: "Storage",   value: "Nextcloud · 512 GB SSD" },
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

          {/* Flowchart Section */}
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

          {/* Challenges */}
          <div className="space-y-6 text-left">
            <h3 className="text-lg font-bold font-mono text-primary flex items-center gap-2 border-b border-border/10 pb-3">
              <TrendingUp className="h-5 w-5" /> Challenges Faced
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {[
                {
                  title: "Linux Administration",
                  desc: "Learning terminal commands, file permissions, systemd service management, and journalctl log auditing from scratch — required significant experimentation before the system was stable."
                },
                {
                  title: "Networking Concepts",
                  desc: "Understanding static IPs, DNS records, VPNs, NAT traversal, and remote access patterns was essential. Each failure was a practical lesson in how network layers interact."
                },
                {
                  title: "Service Management",
                  desc: "Keeping Docker containers running across reboots, managing volume mounts, updating images without data loss, and debugging compose networking introduced real DevOps workflows."
                },
                {
                  title: "Security Without Exposure",
                  desc: "The biggest design challenge was enabling public access without a public IP or open ports. Cloudflare Tunnel solved the inbound exposure problem entirely — no attack surface on the router."
                },
              ].map((c, idx) => (
                <div key={idx} className="border border-border/40 rounded-2xl bg-zinc-950/80 p-5 shadow-lg space-y-2">
                  <h4 className="font-mono text-xs font-bold text-primary uppercase tracking-wider">{c.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
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
                { title: "Networking & VPNs", skills: ["TCP/IP Subnetting", "DNS Records (A, CNAME)", "WireGuard VPN", "Tailscale routing", "Netplan static IP config"] },
                { title: "Cloud Edge & Tunnels", skills: ["Cloudflare proxying", "outbound tunnels (cloudflared)", "DDoS mitigation", "SSL Edge TLS"] },
                { title: "Containerization & DevOps", skills: ["Docker Engine", "Docker Compose stacks", "Volume mappings", "Network bridges", "Daemon log routing"] },
                { title: "Zero-Trust Security", skills: ["Outbound tunnel isolation", "0-port inbound routing", "Private IP meshes", "RBAC permissions"] },
                { title: "Self-Hosted Services", skills: ["Nextcloud storage cluster", "OpenClaw AI gateway", "PHP config & OAuth", "Reverse proxy headers"] }
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
