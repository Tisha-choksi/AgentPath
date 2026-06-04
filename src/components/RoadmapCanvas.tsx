"use client";

import Link from "next/link";
import { TopicNode } from "./TopicNode";
import { useRoadmap } from "@/contexts/RoadmapContext";

export function RoadmapCanvas({
  title,
  backHref,
}: {
  title: string;
  backHref?: string;
}) {
  const { phases, completed } = useRoadmap();
  const roadmapData = phases;
  const totalNodes = phases.reduce((acc, p) => acc + p.nodes.length, 0);
  const progress = totalNodes > 0 ? Math.round((completed.length / totalNodes) * 100) : 0;

  return (
    <div style={{ minHeight: "100%", background: "#0c0d10" }}>
      {/* Navbar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
          background: "rgba(12,13,16,0.92)",
          borderBottom: "1px solid #1c1c24",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {backHref && (
            <Link
              href={backHref}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 11,
                color: "#44445a",
                textDecoration: "none",
                padding: "4px 8px",
                borderRadius: 6,
                border: "1px solid #1c1c24",
                transition: "color 0.15s",
              }}
            >
              ← Hub
            </Link>
          )}
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
              flexShrink: 0,
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
            {title}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 11, color: "#3a3a4a", fontFamily: "monospace" }}>
            {completed.length}/{totalNodes}
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background:
                    i < Math.round((progress / 100) * 8)
                      ? "#7F77DD"
                      : "#1e1e2a",
                  transition: "background 0.4s",
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontSize: 11,
              color: "#7F77DD",
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            {progress}%
          </span>
        </div>
      </nav>

      {/* Roadmap path */}
      <div style={{ padding: "36px 36px 80px" }}>
        {roadmapData.map((phase, phaseIndex) => (
          <div key={phase.id}>
            {/* Phase label pill */}
            <div style={{ marginBottom: 18 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "4px 12px",
                  borderRadius: 20,
                  background: `${phase.accent}14`,
                  border: `1px solid ${phase.accent}28`,
                  fontSize: 10,
                  color: phase.accent,
                  letterSpacing: "0.12em",
                  fontWeight: 700,
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                }}
              >
                {phase.phaseNumber} · {phase.title}
              </span>
            </div>

            {/* Nodes row */}
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {phase.nodes.map((node, nodeIndex) => (
                <div
                  key={node.id}
                  style={{ display: "flex", alignItems: "flex-start" }}
                >
                  <TopicNode node={node} phase={phase} />
                  {nodeIndex < phase.nodes.length - 1 && (
                    <div
                      style={{
                        width: 72,
                        height: 2,
                        marginTop: 31,
                        borderTop: `2px dashed ${phase.accent}38`,
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              ))}

              {/* Right-side curve connector to next phase */}
              {phaseIndex < roadmapData.length - 1 && (
                <svg
                  width="28"
                  height="56"
                  fill="none"
                  style={{ marginTop: 30, marginLeft: 2, flexShrink: 0 }}
                >
                  <path
                    d="M 2 2 Q 26 2 26 28 Q 26 54 2 54"
                    stroke={`${phase.accent}38`}
                    strokeWidth="2"
                    strokeDasharray="5 4"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>

            {/* Gap between phases */}
            {phaseIndex < roadmapData.length - 1 && (
              <div style={{ height: 20 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
