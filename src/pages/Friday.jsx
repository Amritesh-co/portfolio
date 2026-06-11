import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FlowDiagram } from "../components/FlowDiagram";
import { 
  Server, 
  Cpu, 
  Database, 
  HardDrive, 
  Activity, 
  Network, 
  Shield, 
  Zap, 
  Thermometer, 
  Terminal,
  Layers,
  CheckCircle2,
  RefreshCw,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Globe,
  Settings,
  Code2
} from "lucide-react";

const SERVICES = [
  {
    id: "cloudflared",
    name: "Cloudflare Tunnel",
    tag: "Security Edge",
    description: "Secure outbound tunneling establishing zero-port public routing.",
    icon: <Globe className="h-5 w-5 text-indigo-400" />,
    status: "Encrypted",
    logs: [
      "[cloudflared] starting outbound tunnel daemon...",
      "[cloudflared] connecting to Cloudflare edge server (BLR endpoint)...",
      "[cloudflared] tunnel 'amriteshsahu.me' successfully registered",
      "[cloudflared] routing: amriteshsahu.me -> http://localhost:8080 (nextcloud)",
      "[cloudflared] routing: ai.amriteshsahu.me -> http://localhost:3000 (openclaw)",
      "[cloudflared] Zero-Trust status: Active. No inbound ports exposed."
    ]
  },
  {
    id: "nextcloud",
    name: "Nextcloud Cloud",
    tag: "Storage Node",
    description: "Self-hosted alternative to Google Drive with folder policies.",
    icon: <HardDrive className="h-5 w-5 text-emerald-400" />,
    status: "Healthy",
    logs: [
      "[nextcloud] docker exec trusted_domains check: ['amriteshsahu.me', 'localhost']",
      "[nextcloud] docker exec overwrite.cli.url check: 'https://amriteshsahu.me'",
      "[nextcloud] reverse proxy headers parsed: X-Forwarded-For verified",
      "[nextcloud] OAuth authorization request: user 'Amritesh Sahu' authenticated",
      "[nextcloud] sync engine: 0 conflict errors, 42 files updated",
      "[nextcloud] data storage path: /mnt/nas/nextcloud_data status: OK"
    ]
  },
  {
    id: "openclaw",
    name: "OpenClaw Platform",
    tag: "AI Workflows",
    description: "Multi-agent orchestration hub running custom agent chains.",
    icon: <Cpu className="h-5 w-5 text-purple-400" />,
    status: "Online",
    logs: [
      "[openclaw] initializing agentic pipeline engine...",
      "[openclaw] loading config.json channels configuration...",
      "[openclaw] channels.whatsapp: { enabled: true, selfChatMode: true }",
      "[openclaw] checking connection to OpenAI / Anthropic Claude APIs...",
      "[openclaw] active provider: Anthropic Claude (haiku-3.5) status: Connected",
      "[openclaw] agent workflow runner: waiting for WhatsApp event triggers..."
    ]
  },
  {
    id: "tailscale",
    name: "Tailscale VPN",
    tag: "Mesh Network",
    description: "Encrypted mesh network routing private admin traffic.",
    icon: <Shield className="h-5 w-5 text-teal-400" />,
    status: "Connected",
    logs: [
      "[tailscale] initializing wireguard network interface...",
      "[tailscale] peer connection request from device: 'remote-laptop'",
      "[tailscale] direct NAT traversal succeeded - peer connected",
      "[tailscale] tunnel state: fully encrypted (AES-GCM-256)",
      "[tailscale] tailnet member amriteshsahu.me authenticated",
      "[tailscale] private admin access to host port 22 verified"
    ]
  },
  {
    id: "ubuntu",
    name: "Ubuntu OS Daemon",
    tag: "Base System",
    description: "Ubuntu Server OS core services, updates, and Netplan.",
    icon: <Server className="h-5 w-5 text-rose-400" />,
    status: "System OK",
    logs: [
      "[systemd] service status check: 0 failed services",
      "[netplan] applying configuration /etc/netplan/01-netcfg.yaml...",
      "[netplan] static IP assigned: 192.168.1.100/24 (gateway: 192.168.1.1)",
      "[netplan] DNS resolution verified via Cloudflare DNS (1.1.1.1)",
      "[netplan] failover Wi-Fi connection configured - priority metric: 100",
      "[apt-daemon] system update: 0 packages upgradable"
    ]
  },
  {
    id: "docker",
    name: "Docker Engine",
    tag: "DevOps",
    description: "Container virtualization running backend microservices.",
    icon: <Layers className="h-5 w-5 text-blue-400" />,
    status: "Active",
    logs: [
      "[docker] daemon listening on unix:///var/run/docker.sock",
      "[docker] container status: 'nextcloud' status: healthy",
      "[docker] container 'openclaw-agent' status: healthy",
      "[docker] container 'cloudflare-connector' status: healthy",
      "[docker] network bridge 'home_network' configured",
      "[docker] storage volumes verified: 4 persistent mounts mounted"
    ]
  }
];

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
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [liveMetrics, setLiveMetrics] = useState({
    inferenceCPU: 14,
    inferenceGPU: 38,
    inferenceGPUTemp: 56,
    nasCPU: 8,
    nasRAM: 42,
    nasStorage: 64,
    proxmoxCPU: 18,
    proxmoxRAM: 58,
    netIn: 2.4,
    netOut: 1.1,
  });

  const [flowDirection, setFlowDirection] = useState("TB");

  useEffect(() => {
    const checkDirection = () => {
      setFlowDirection(window.innerWidth >= 768 ? "LR" : "TB");
    };
    checkDirection();
    window.addEventListener("resize", checkDirection);
    return () => window.removeEventListener("resize", checkDirection);
  }, []);

  const [terminalLogs, setTerminalLogs] = useState([]);
  const logTimerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // ── dynamic metrics jitter ────────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics((prev) => ({
        inferenceCPU: Math.max(5, Math.min(95, Math.round(prev.inferenceCPU + (Math.random() * 8 - 4)))),
        inferenceGPU: Math.max(10, Math.min(100, Math.round(prev.inferenceGPU + (Math.random() * 12 - 6)))),
        inferenceGPUTemp: Math.max(48, Math.min(82, Math.round(prev.inferenceGPUTemp + (Math.random() * 2 - 1)))),
        nasCPU: Math.max(2, Math.min(45, Math.round(prev.nasCPU + (Math.random() * 4 - 2)))),
        nasRAM: Math.max(40, Math.min(48, Math.round(prev.nasRAM + (Math.random() * 0.2 - 0.1) * 10) / 10)),
        nasStorage: prev.nasStorage,
        proxmoxCPU: Math.max(8, Math.min(85, Math.round(prev.proxmoxCPU + (Math.random() * 6 - 3)))),
        proxmoxRAM: Math.max(52, Math.min(65, Math.round(prev.proxmoxRAM + (Math.random() * 0.4 - 0.2) * 10) / 10)),
        netIn: Math.max(0.2, Math.round((prev.netIn + (Math.random() * 1.6 - 0.8)) * 10) / 10),
        netOut: Math.max(0.1, Math.round((prev.netOut + (Math.random() * 1.0 - 0.5)) * 10) / 10),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // ── typewriter-like log printing ─────────────────────────────────────────
  useEffect(() => {
    if (!selectedService || !selectedService.logs) return;
    if (logTimerRef.current) clearInterval(logTimerRef.current);
    
    setTerminalLogs([selectedService.logs[0]]);
    
    let lineIndex = 1;
    logTimerRef.current = setInterval(() => {
      if (lineIndex < selectedService.logs.length) {
        const nextLog = selectedService.logs[lineIndex];
        if (nextLog !== undefined) {
          setTerminalLogs((prev) => [...prev, nextLog]);
        }
        lineIndex++;
      } else {
        clearInterval(logTimerRef.current);
      }
    }, 200);

    return () => {
      if (logTimerRef.current) clearInterval(logTimerRef.current);
    };
  }, [selectedService]);

  // ── scroll logs container ─────────────────────────────────────────────────
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [terminalLogs]);

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

          {/* Interactive Live Monitor Dashboard */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-mono text-primary flex items-center gap-2 border-b border-border/10 pb-3">
              <Settings className="h-5 w-5 animate-spin-slow" /> Interactive Friday Monitor
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* COLUMN 1: HARDWARE INFRASTRUCTURE */}
              <div className="lg:col-span-5 space-y-6">
                <div className="border border-border/40 rounded-2xl bg-zinc-950/80 p-5 shadow-2xl space-y-6">
                  
                  {/* NODE 1: Ubuntu Cloud Host */}
                  <div className="border border-border/20 rounded-xl p-4 bg-zinc-900/40 hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-indigo-400 animate-pulse" />
                        <h3 className="font-mono text-sm font-semibold text-foreground">ubuntu-core-01</h3>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono">
                        Main Host
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-muted-foreground mb-4">
                      <div>OS: Ubuntu Server</div>
                      <div>Net: Netplan Static</div>
                    </div>
                    <div className="space-y-3 font-mono text-xs">
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-muted-foreground">Core CPU Load</span>
                          <span className="text-indigo-400 font-bold">{liveMetrics.inferenceCPU}%</span>
                        </div>
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 transition-all duration-500" 
                            style={{ width: `${liveMetrics.inferenceCPU}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Thermometer className="h-3.5 w-3.5 text-rose-400" /> Host Temp
                        </span>
                        <span className="text-slate-300 font-bold">{liveMetrics.inferenceGPUTemp}°C</span>
                      </div>
                    </div>
                  </div>

                  {/* NODE 2: Cloudflare Tunnel Gateway */}
                  <div className="border border-border/20 rounded-xl p-4 bg-zinc-900/40 hover:border-emerald/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-emerald-400" />
                        <h3 className="font-mono text-sm font-semibold text-foreground">cloudflared-tunnel</h3>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono">
                        Zero-Trust
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-muted-foreground mb-4">
                      <div>Domain: amriteshsahu.me</div>
                      <div>Ports: Outbound-Only</div>
                    </div>
                    <div className="space-y-3 font-mono text-xs">
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-muted-foreground">Tunnel Core Alloc</span>
                          <span className="text-emerald-400 font-bold">{liveMetrics.proxmoxCPU}%</span>
                        </div>
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 transition-all duration-500" 
                            style={{ width: `${liveMetrics.proxmoxCPU}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* NODE 3: Container Engine */}
                  <div className="border border-border/20 rounded-xl p-4 bg-zinc-900/40 hover:border-amber/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-amber-400" />
                        <h3 className="font-mono text-sm font-semibold text-foreground">docker-daemon</h3>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono">
                        Docker Host
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-muted-foreground mb-4">
                      <div>Containers: 6 Active</div>
                      <div>Volumes: Persistent</div>
                    </div>
                    <div className="space-y-3 font-mono text-xs">
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-muted-foreground">Container Engine RAM</span>
                          <span className="text-amber-400 font-bold">{liveMetrics.nasRAM}%</span>
                        </div>
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500 transition-all duration-500" 
                            style={{ width: `${liveMetrics.nasRAM}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Router Telemetry */}
                  <div className="pt-2 border-t border-border/10 flex justify-between items-center text-xs font-mono text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin text-primary" />
                      <span>VPN Routing:</span>
                    </div>
                    <div className="flex gap-4">
                      <span>In: <strong className="text-slate-200">{liveMetrics.netIn} MB/s</strong></span>
                      <span>Out: <strong className="text-slate-200">{liveMetrics.netOut} MB/s</strong></span>
                    </div>
                  </div>

                </div>
              </div>

              {/* COLUMN 2: SERVICES & TERMINAL */}
              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SERVICES.map((srv) => {
                    const isSelected = selectedService.id === srv.id;
                    return (
                      <button
                        key={srv.id}
                        onClick={() => setSelectedService(srv)}
                        className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 select-none cursor-pointer ${
                          isSelected
                            ? "bg-zinc-900 border-primary shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                            : "bg-zinc-950/60 border-border/40 hover:border-border/80 hover:bg-zinc-900/20"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {srv.icon}
                          <span className="text-[11px] font-mono font-bold text-muted-foreground">{srv.tag}</span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold font-mono text-slate-200 truncate mb-1">{srv.name}</h4>
                          <p className="text-[9.5px] text-muted-foreground leading-tight line-clamp-2 mb-2">
                            {srv.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-border/10">
                          <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                            <CheckCircle2 className="h-2.5 w-2.5" /> {srv.status}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="border border-border/40 rounded-2xl bg-black shadow-2xl flex flex-col overflow-hidden min-h-[220px] max-h-[260px]">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border/20 bg-zinc-900/60 shrink-0 select-none">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground">
                      docker-logs: {selectedService.id}-daemon.log
                    </div>
                    <div className="w-8" />
                  </div>

                  <div 
                    ref={scrollContainerRef}
                    className="flex-1 p-4 font-mono text-left text-[11px] overflow-y-auto leading-relaxed bg-zinc-950 text-slate-300"
                  >
                    {terminalLogs.map((log, idx) => {
                      if (!log) return null;
                      let colorClass = "text-slate-300";
                      if (log.includes("ERROR") || log.includes("fail") || log.includes("failure")) {
                        colorClass = "text-rose-400";
                      } else if (log.includes("warning") || log.includes("mismatch")) {
                        colorClass = "text-amber-400 font-semibold";
                      } else if (log.includes("success") || log.includes("healthy") || log.includes("OK") || log.includes("verified")) {
                        colorClass = "text-emerald-400";
                      } else if (log.startsWith("[")) {
                        colorClass = "text-primary/90";
                      }
                      
                      return (
                        <div key={idx} className={`whitespace-pre-wrap ${colorClass} py-0.5 border-l-2 border-primary/20 pl-2 mb-1`}>
                          {log}
                        </div>
                      );
                    })}
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-primary/80">
                      <span className="h-3 w-1.5 bg-primary animate-[blink_1s_step-end_infinite]" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
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
