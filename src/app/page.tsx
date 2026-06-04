import Link from "next/link";
import { backendData } from "@/data/backend";
import { gitData } from "@/data/git";
import { restApiData } from "@/data/rest-api";
import { roadmapData } from "@/data/roadmap";
import { PrerequisiteCards, AgentsCard } from "@/components/HubCards";

const prerequisites = [
  {
    href: "/backend",
    icon: "⚙️",
    title: "Backend Development",
    description:
      "From Python basics to Docker, CI/CD, system design, AWS, and real-time architecture. Full 16-phase path.",
    accent: "#3B82F6",
    bg: "#0d1929",
    topics: backendData.reduce((acc, p) => acc + p.nodes.length, 0),
    phases: backendData.length,
  },
  {
    href: "/git",
    icon: "🌿",
    title: "Git & Terminal",
    description:
      "Full 22-phase path: Git fundamentals to GitHub Actions, APIs, hooks, LFS, and CI/CD for AI engineers.",
    accent: "#F97316",
    bg: "#1f1208",
    topics: gitData.reduce((acc, p) => acc + p.nodes.length, 0),
    phases: gitData.length,
  },
  {
    href: "/rest-api",
    icon: "⚡",
    title: "FastAPI",
    description:
      "Full 18-phase path: routing, Pydantic, auth, databases, real-time, AI integrations, and agent backends.",
    accent: "#34D399",
    bg: "#0a1f18",
    topics: restApiData.reduce((acc, p) => acc + p.nodes.length, 0),
    phases: restApiData.length,
  },
];

const agentStats = {
  topics: roadmapData.reduce((acc, p) => acc + p.nodes.length, 0),
  phases: roadmapData.length,
};

export default function HubPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#0c0d10",
        fontFamily: "var(--font-mono)",
      }}
    >
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 28px",
          background: "rgba(12,13,16,0.92)",
          borderBottom: "1px solid #1c1c24",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "#16142a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 800,
              color: "#7F77DD",
              fontFamily: "monospace",
            }}
          >
            AP
          </div>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.4px",
            }}
          >
            <span style={{ color: "#7F77DD" }}>Agent</span>Path
          </span>
        </div>
        <span style={{ fontSize: 11, color: "#2a2a3a", fontFamily: "monospace" }}>
          learn · build · ship
        </span>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "56px 24px 40px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 12px",
            borderRadius: 20,
            background: "#0e0d1c",
            border: "1px solid #2a2840",
            marginBottom: 20,
          }}
        >
          <div
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#7F77DD" }}
          />
          <span style={{ fontSize: 11, color: "#8580bb" }}>
            Your complete AI Agent learning path
          </span>
        </div>

        <h1
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: 14,
            fontFamily: "var(--font-sans)",
          }}
        >
          Go from zero to
          <br />
          <span style={{ color: "#7F77DD" }}>AI Agent developer</span>
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "#44445a",
            maxWidth: 420,
            margin: "0 auto",
            lineHeight: 1.65,
            fontFamily: "var(--font-sans)",
          }}
        >
          Before building agents you need the foundations. Work through the
          prerequisites, then tackle the AI Agents roadmap.
        </p>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 80px" }}>
        {/* Step 1 */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#1a1a2a",
                border: "1px solid #2a2a3a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                color: "#555",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              1
            </div>
            <span
              style={{
                fontSize: 11,
                color: "#3a3a4a",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Start here — Prerequisites
            </span>
            <div style={{ flex: 1, height: 1, background: "#1a1a22" }} />
          </div>

          <PrerequisiteCards cards={prerequisites} />
        </div>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            marginBottom: 32,
          }}
        >
          <div style={{ width: 1, height: 28, background: "#1a1a22" }} />
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "#111116",
              border: "1px solid #1c1c24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              color: "#333",
            }}
          >
            ↓
          </div>
          <div style={{ width: 1, height: 28, background: "#1a1a22" }} />
        </div>

        {/* Step 2 */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "#16142a",
                border: "1px solid #2a2840",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                color: "#7F77DD",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              2
            </div>
            <span
              style={{
                fontSize: 11,
                color: "#3a3a4a",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Then master this
            </span>
            <div style={{ flex: 1, height: 1, background: "#1a1a22" }} />
          </div>

          <AgentsCard topics={agentStats.topics} phases={agentStats.phases} />
        </div>
      </div>
    </div>
  );
}
