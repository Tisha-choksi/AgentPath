"use client";

import Link from "next/link";

interface PrereqCard {
  href: string;
  icon: string;
  title: string;
  description: string;
  accent: string;
  bg: string;
  topics: number;
  phases: number;
}

interface AgentCard {
  topics: number;
  phases: number;
}

export function PrerequisiteCards({ cards }: { cards: PrereqCard[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 12,
      }}
    >
      {cards.map((p) => (
        <Link key={p.href} href={p.href} style={{ textDecoration: "none" }}>
          <div
            style={{
              background: "#111116",
              border: "1px solid #1c1c24",
              borderRadius: 14,
              overflow: "hidden",
              transition: "border-color 0.2s, transform 0.15s, box-shadow 0.2s",
              cursor: "pointer",
              height: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${p.accent}66`;
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#1c1c24";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ height: 3, background: p.accent }} />
            <div style={{ padding: "18px 18px 16px" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: p.bg,
                  border: `1px solid ${p.accent}28`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 14,
                }}
              >
                {p.icon}
              </div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#ddd",
                  marginBottom: 8,
                  fontFamily: "var(--font-sans)",
                  lineHeight: 1.3,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: 12,
                  color: "#44445a",
                  lineHeight: 1.6,
                  marginBottom: 16,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {p.description}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", gap: 6 }}>
                  <span
                    style={{
                      fontSize: 10,
                      color: "#2a2a3a",
                      padding: "2px 7px",
                      border: "1px solid #1e1e2a",
                      borderRadius: 6,
                      fontFamily: "monospace",
                    }}
                  >
                    {p.phases} phases
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: "#2a2a3a",
                      padding: "2px 7px",
                      border: "1px solid #1e1e2a",
                      borderRadius: 6,
                      fontFamily: "monospace",
                    }}
                  >
                    {p.topics} topics
                  </span>
                </div>
                <span style={{ fontSize: 11, color: p.accent }}>
                  View path →
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function AgentsCard({ topics, phases }: AgentCard) {
  return (
    <Link href="/agents" style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "#111116",
          border: "1px solid #2a2840",
          borderRadius: 16,
          overflow: "hidden",
          transition: "border-color 0.2s, transform 0.15s, box-shadow 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#7F77DD66";
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#2a2840";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div
          style={{
            height: 3,
            background: "linear-gradient(90deg, #5551aa, #7F77DD, #9d99cc)",
          }}
        />
        <div
          style={{
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              background: "#16142a",
              border: "1px solid #2a2840",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              flexShrink: 0,
            }}
          >
            🤖
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "2px 8px",
                borderRadius: 6,
                background: "#7F77DD18",
                border: "1px solid #7F77DD28",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  color: "#7F77DD",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                }}
              >
                Main Roadmap
              </span>
            </div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 6,
                fontFamily: "var(--font-sans)",
                letterSpacing: "-0.3px",
              }}
            >
              AI Agents Roadmap
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "#44445a",
                fontFamily: "var(--font-sans)",
                lineHeight: 1.5,
              }}
            >
              LLM fundamentals → agent architecture → memory systems →
              planning → multi-agent → production.
            </p>
          </div>
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              <span
                style={{
                  fontSize: 10,
                  color: "#3a3a4a",
                  padding: "3px 8px",
                  border: "1px solid #1e1e2a",
                  borderRadius: 6,
                  fontFamily: "monospace",
                }}
              >
                {phases} phases
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "#3a3a4a",
                  padding: "3px 8px",
                  border: "1px solid #1e1e2a",
                  borderRadius: 6,
                  fontFamily: "monospace",
                }}
              >
                {topics} topics
              </span>
            </div>
            <span
              style={{
                fontSize: 13,
                color: "#7F77DD",
                fontWeight: 600,
                fontFamily: "var(--font-sans)",
              }}
            >
              Begin Roadmap →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
