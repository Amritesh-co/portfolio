# Amritesh Sahu — Professional Portfolio

A premium, interactive developer portfolio showcasing software engineering projects, system architectures, and on-premise cloud infrastructure.

<div align="center">
  <br />
  <img src="./banner.png" alt="Portfolio Website Banner" width="100%" style="border-radius: 12px; border: 1px solid #1e1b4b;" />
  <br /><br />
  <div>
    <img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/-TailwindCSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/-Three.js-black?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
    <img src="https://img.shields.io/badge/-Lucide_Icons-FD4D4D?style=for-the-badge&logo=lucide" alt="Lucide Icons" />
  </div>
  <br />
</div>

---

## 📋 Table of Contents

1. [Introduction](#-introduction)
2. [Pages & Features](#-pages--features)
3. [Tech Stack](#-tech-stack)
4. [Projects Overview](#-projects-overview)
5. [Quick Start & Setup](#-quick-start--setup)
6. [Compilation & Deployment](#-compilation--deployment)

---

## 🚀 Introduction

This repository contains the source code for the personal developer portfolio of **Amritesh Sahu**. Designed with a futuristic dark aesthetic, interactive graphics, and custom canvas-based micro-animations, this web application serves as a comprehensive hub for engineering case studies, system topology diagrams, and homelab documentation.

---

## 📺 Pages & Features

* 🏠 **Home Page (`/`)**
  * **Hero Section:** Sleek typography, profile snapshot, and smooth call-to-actions.
  * **Skills Radar:** Structured display of languages, databases, cloud tools, and frameworks.
  * **Contact Portal:** Glassmorphic contact form equipped with Toast notifications for user feedback.

* 📂 **Projects Browser (`/projects`)**
  * **Categorized Grid:** Clean cards displaying taglines, project tag pills, and custom gradients.
  * **Background Effects:** Subtly integrated particle-network background simulation (`ParticleNetworkCanvas`) for an immersive look.

* 🔍 **Project Case Studies (`/projects/:slug`)**
  * **Deep-Dive Content:** Technical writeups covering features, system architecture, database design, and key learnings.
  * **Interactive Code Rain:** Digital rain overlay (`CodeRainCanvas`) custom-tailored to suit software/AI project styles.
  * **Scalable D2 SVGs:** Inlined system flowcharts compiled using D2, matching the dark theme and offering crisp scaling.

* ☁️ **HomeLab Friday (`/friday`)**
  * **Infrastructure Intro:** Detailed breakdown of a 24/7 private cloud running on a bare-metal Ubuntu Server.
  * **Tech Stat Grid:** Visual parameters highlighting Docker Compose runtime, Cloudflare zero-trust tunnels, and WireGuard overlay mesh networks.
  * **Interactive Flowchart:** Detailed horizontal/vertical network diagrams.

---

## ⚙️ Tech Stack

### Frontend & UI
* **React 18** – UI Component architecture
* **Vite** – Hyper-fast dev server and bundler
* **Tailwind CSS v4** – Next-gen utility-first styling
* **React Router v7** – Single Page Application routing
* **Lucide React** – Clean vector icons

### Canvas & Diagrams
* **HTML5 Canvas API** – High-performance particle networks and code rain background loops
* **Three.js / React Three Fiber** – 3D visual capabilities
* **D2 Diagramming Engine** – Text-to-diagram architecture compilation tool

---

## 📊 Projects Overview

The portfolio showcases several advanced software and system engineering projects:
* **Multi-Agent Medical Assistant:** AI healthcare system utilizing LangGraph, FastAPI, Qdrant, PyTorch, and ElevenLabs.
* **openClaw Swarm:** Local-first multi-agent AI workspace running Commander, Researcher, Analyst, and Coder.
* **Woodcraft Store:** Full-stack furniture e-commerce and internal ERP suite with Redis rate limiting and role-based auth.
* **Gemma UI:** Web-based Ollama local LLM interface featuring streaming Markdown and RAG ingestion.
* **Algo Visualizer:** Interactive pathfinding and sorting visualization built in TypeScript and Next.js.
* **Stubble Vision:** Sentinel-2 satellite imagery burn severity mapping platform via Google Earth Engine and FastAPI.
* **Graph Path Models:** 3D force-directed node visualization and custom algorithm scenario tester.
* **Eco Tracker:** Temporal environmental tracking and data analysis platform for global cities.

---

## 👌 Quick Start & Setup

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18+ recommended) and `git` installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Amritesh-co/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser to the URL displayed in your terminal (typically `http://localhost:5173`).

---

## 🛠️ Compilation & Deployment

### Building Diagrams
The architecture diagrams are compiled from raw D2 specifications (`.d2` files in `src/diagrams/`) to SVGs in `public/diagrams/`. If you modify the diagram definitions, run the build script:
```bash
npm run diagrams
```

### Production Build
To build the application for hosting:
```bash
npm run build
```
This output is saved to the `dist/` directory, optimized and ready to be hosted on platforms like Vercel, Netlify, or Github Pages.
