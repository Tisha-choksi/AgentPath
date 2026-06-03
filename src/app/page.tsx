import Link from "next/link";
import { backendData } from "@/data/backend";
import { gitData } from "@/data/git";
import { restApiData } from "@/data/rest-api";
import { roadmapData } from "@/data/roadmap";

const prerequisites = [
  {
    href: "/backend",
    icon: "⚙️",
    title: "Backend Development",
    description:
      "HTTP, Node.js, Express, databases, auth, and deployment. The foundation every agent developer needs.",
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
      "Command line navigation, version control, branching, and collaborating on GitHub.",
    accent: "#F97316",
    bg: "#1f1208",
    topics: gitData.reduce((acc, p) => acc + p.nodes.length, 0),
    phases: gitData.length,
  },
  {
    href: "/rest-api",
    icon: "📡",
    title: "REST API Knowledge",
    description:
      "HTTP methods, status codes, auth patterns, consuming APIs, and building your own.",
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

        <span
          style={{
            fontSize: 11,
            color: "#2a2a3a",
            fontFamily: "monospace",
          }}
        >
          learn · build · ship
        </span>
      </nav>

      {/* Hero */}
      <div
        style={{
          textAlign: "center",
          padding: "56px 24px 40px",
        }}
      >
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
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#7F77DD",
            }}
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
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        {/* Step 1: Prerequisites */}
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
            }}
          >
            {prerequisites.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                style={{ textDecoration: "none" }}
              >
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
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${p.accent}66`;
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.4)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#1c1c24";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  {/* Accent top bar */}
                  <div style={{ height: 3, background: p.accent }} />

                  <div style={{ padding: "18px 18px 16px" }}>
                    {/* Icon */}
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

                    {/* Title */}
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

                    {/* Description */}
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

                    {/* Footer */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", gap: 8 }}>
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
        </div>

        {/* Divider arrow */}
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

        {/* Step 2: AI Agents */}
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
                (e.currentTarget as HTMLDivElement).style.borderColor = "#7F77DD66";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#2a2840";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {/* Gradient top bar */}
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
                {/* Icon group */}
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
                        textTransform: "uppercase",
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

                {/* Stats + CTA */}
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
                      {agentStats.phases} phases
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
                      {agentStats.topics} topics
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
        </div>
      </div>
    </div>
  );
}
