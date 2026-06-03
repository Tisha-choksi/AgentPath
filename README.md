# AgentPath 🐍

> Your interactive snake-path roadmap to mastering AI Agents

## What is this?

AgentPath is an interactive roadmap website built with Next.js 15. The roadmap renders as a **snake/board-game style path** — nodes zigzag down the page. Clicking any node opens a detail panel with:

- Concept theory
- Key points
- A KDL-specific project idea to build
- Tech stack required
- Learning resources

Progress is saved to `localStorage` via Zustand persist.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| State | Zustand + persist middleware |
| Fonts | DM Mono + DM Sans (Google Fonts) |
| Deploy | Vercel |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx           ← root page (RoadmapCanvas + DetailPanel)
│   ├── layout.tsx         ← fonts + metadata
│   └── globals.css        ← base styles + scrollbar
├── components/
│   ├── RoadmapCanvas.tsx  ← main snake path UI
│   ├── TopicNode.tsx      ← individual clickable circle node
│   ├── Connectors.tsx     ← dashed lines between nodes + turn curves
│   └── DetailPanel.tsx    ← slide-in panel on node click
├── data/
│   └── roadmap.ts         ← all 8 phases, 24 nodes with full content
└── lib/
    └── store.ts           ← Zustand store (selected node, completed[])
```

---

## Getting Started

```bash
# 1. Clone / copy files into a new Next.js project
npx create-next-app@latest agentpath --typescript --tailwind --app
cd agentpath

# 2. Install dependencies
npm install zustand framer-motion

# 3. Copy all files from src/ into your project

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## The 8 Phases

| # | Phase | Topics |
|---|---|---|
| 1 | LLM Fundamentals | How LLMs work, Prompt engineering, APIs & SDKs |
| 2 | Agent Architecture | Agent loop, Tool calling, Context engineering |
| 3 | Memory Systems | Short-term, Long-term, Vector DB & RAG |
| 4 | Planning & Reasoning | ReAct, Plan & Execute, Self-reflection |
| 5 | Agentic Workflows | Workflow patterns, HITL, LangGraph |
| 6 | Multi-Agent Systems | Supervisor, Peer collaboration, MCP |
| 7 | Specialized Agents | Voice, Browser, Multimodal |
| 8 | Production & Eval | Evaluation, Observability, Guardrails |

---

## Extending This

### Add a new topic
In `src/data/roadmap.ts`, add a new object to any phase's `nodes` array.

### Add AI-powered explanations
In `DetailPanel.tsx`, add a button that calls Groq API and streams a deeper explanation into the panel.

### Add user accounts
Replace Zustand persist with Supabase — save progress per user with login via Supabase Auth.

### Add a search bar
Add a search input in the navbar that filters nodes by label or concept text.

---

Built by Teesha — KDL Technical Lead
