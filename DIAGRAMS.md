# Diagram Authoring Guide

All project architecture charts are written in [D2](https://d2lang.com/) and pre-compiled to SVG at build time. The rendered SVGs live in `public/diagrams/` and are served as static assets.

---

## Stack

| Tool | Role |
|------|------|
| [D2 CLI](https://d2lang.com/) `v0.7.1` | Compiles `.d2` source → SVG |
| Theme `200` (Flagship dark) | Dark background `#1E1E2E`, matches portfolio |
| `scripts/build-diagrams.mjs` | Compile + fix SVG dimensions in one step |
| `src/components/D2Diagram.jsx` | React wrapper — renders SVG at uniform scale |

---

## File Layout

```
src/diagrams/
└── {project-slug}/
    ├── diagram-name.d2       ← source of truth (edit this)
    └── ...

public/diagrams/
└── {project-slug}/
    ├── diagram-name.svg      ← compiled output (do not edit)
    └── ...
```

---

## Adding a New Diagram

### 1. Write the `.d2` source

Create `src/diagrams/{project-slug}/{name}.d2`.

**Minimal template:**

```d2
direction: down

classes: {
  primary: {
    style.fill: "#1c1204"
    style.stroke: "#d97706"
    style.font-color: "#fbbf24"
    style.border-radius: 8
  }
  muted: {
    style.fill: "#10111a"
    style.stroke: "#2d3748"
    style.font-color: "#8896aa"
    style.border-radius: 8
  }
}

node_a: "Label\nSub-label" { class: primary }
node_b: "Label\nSub-label" { class: muted }

node_a -> node_b: "edge label"
```

### 2. Compile

```bash
# Compile every .d2 file under src/diagrams/
npm run diagrams

# Or compile a single file
node scripts/build-diagrams.mjs src/diagrams/{slug}/{name}.d2
```

The script compiles with `--theme 200`, then injects `width`/`height` onto the outer `<svg>` element so browsers load the correct intrinsic dimensions.

### 3. Use in React

```jsx
import { D2Diagram } from "../components/D2Diagram";

<D2Diagram
  title="chart title shown above the diagram"
  src="/diagrams/{project-slug}/{name}.svg"
/>
```

---

## Color Classes

These are the standard classes used across all diagrams. Copy them into every `.d2` file.

| Class | Stroke | Use for |
|-------|--------|---------|
| `amber` | `#d97706` | Core services, key logic nodes |
| `emerald` | `#10b981` | Healthy state, primary pipeline |
| `violet` | `#7c3aed` | Orchestrators, agents, main components |
| `indigo` | `#4f46e5` | Gateway, entry points |
| `sky` | `#0ea5e9` | External input, public-facing |
| `red` | `#dc2626` | Error paths, failure states |
| `amber` | `#d97706` | Warnings, HITL gates |
| `cyan` | `#06b6d4` | Network, mesh, VPN |
| `muted` | `#2d3748` | Supporting / secondary nodes |

**Full class block to paste:**

```d2
classes: {
  amber: {
    style.fill: "#1c1204"
    style.stroke: "#d97706"
    style.font-color: "#fbbf24"
    style.border-radius: 8
  }
  emerald: {
    style.fill: "#022c22"
    style.stroke: "#10b981"
    style.font-color: "#6ee7b7"
    style.border-radius: 8
  }
  violet: {
    style.fill: "#1e1033"
    style.stroke: "#7c3aed"
    style.font-color: "#c4b5fd"
    style.border-radius: 8
  }
  indigo: {
    style.fill: "#1e1b4b"
    style.stroke: "#4f46e5"
    style.font-color: "#a5b4fc"
    style.border-radius: 8
  }
  sky: {
    style.fill: "#082f49"
    style.stroke: "#0ea5e9"
    style.font-color: "#7dd3fc"
    style.border-radius: 8
  }
  red: {
    style.fill: "#1c0505"
    style.stroke: "#dc2626"
    style.font-color: "#fca5a5"
    style.border-radius: 8
  }
  cyan: {
    style.fill: "#042f2e"
    style.stroke: "#06b6d4"
    style.font-color: "#67e8f9"
    style.border-radius: 8
  }
  muted: {
    style.fill: "#10111a"
    style.stroke: "#2d3748"
    style.font-color: "#8896aa"
    style.border-radius: 8
  }
}
```

---

## Uniform Scaling

`D2Diagram.jsx` auto-normalises scale so all charts have the same visual density:

- **Reference:** `woodcraft-store/auth-flow.svg` at `1276px` SVG width looks perfect in the `max-w-4xl` (896px) container.  
- **Scale factor:** `896 / 1276 ≈ 0.702`  
- On image load, `naturalWidth` is read and `maxWidth` is set to `naturalWidth × 0.702`.  
- Wide diagrams fill the container; narrow diagrams display smaller — but all at the same pixels-per-node ratio.

You do not need to do anything special. Just use `<D2Diagram src=... />` and scaling is automatic.

---

## Existing Diagrams

| Project | File | Title |
|---------|------|-------|
| `woodcraft-store` | `auth-flow.d2` | Request lifecycle — auth + validation + data layer |
| `woodcraft-store` | `order-flow.d2` | Order creation → invoice → email flow |
