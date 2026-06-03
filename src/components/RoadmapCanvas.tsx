"use client";

import { roadmapData } from "@/data/roadmap";
import { TopicNode } from "./TopicNode";
import { HConnector, TurnConnector } from "./Connectors";
import { useRoadmapStore } from "@/lib/store";

export function RoadmapCanvas() {
  const { completed } = useRoadmapStore();
  const totalNodes = roadmapData.reduce((acc, p) => acc + p.nodes.length, 0);

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "#0c0c0f", fontFamily: "'DM Mono', monospace" }}
    >
      {/* Top nav */}
      <nav
        className="sticky top-0 z-10 flex items-center justify-between px-6 py-4"
        style={{ background: "#0c0c0f", borderBottom: "1px solid #1a1a22" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ background: "#16142a", color: "#7F77DD" }}
          >
            AP
          </div>
          <span className="font-semibold text-white" style={{ fontSize: 15 }}>
            Agent<span style={{ color: "#7F77DD" }}>Path</span>
          </span>
          <span
            className="rounded-full px-2 py-0.5"
            style={{ fontSize: 10, background: "#1a1a2a", color: "#555" }}
          >
            v1.0
          </span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 11, color: "#555" }}>
            {completed.length} / {totalNodes} completed
          </span>
          <div
            className="rounded-full overflow-hidden"
            style={{ width: 100, height: 4, background: "#1a1a22" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.round((completed.length / totalNodes) * 100)}%`,
                background: "#7F77DD",
              }}
            />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="text-center py-12 px-6">
        <h1
          className="font-bold text-white mb-3"
          style={{ fontSize: 32, letterSpacing: "-0.5px" }}
        >
          AI Agents Roadmap
        </h1>
        <p style={{ fontSize: 14, color: "#555", maxWidth: 400, margin: "0 auto" }}>
          Click any node to explore concept theory, key points, and a project idea.
        </p>

        {/* Legend */}
        <div className="flex items-center justify-center gap-5 mt-5">
          {[
            { label: "Beginner", color: "#1D9E75" },
            { label: "Intermediate", color: "#BA7517" },
            { label: "Advanced", color: "#D85A30" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: item.color }}
              />
              <span style={{ fontSize: 11, color: "#555" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Snake path */}
      <div
        className="mx-auto px-6 pb-24"
        style={{ maxWidth: 720 }}
      >
        {roadmapData.map((phase, phaseIndex) => {
          const isReversed = phaseIndex % 2 === 1;
          const nodes = isReversed ? [...phase.nodes].reverse() : phase.nodes;
          const isLastPhase = phaseIndex === roadmapData.length - 1;
          const nextPhase = roadmapData[phaseIndex + 1];

          return (
            <div key={phase.id}>
              {/* Phase label */}
              <div className="flex items-center gap-2 mb-3 mt-2">
                <div
                  className="rounded-full px-3 py-1 font-semibold"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    background: phase.bg,
                    color: phase.accent,
                    border: `1px solid ${phase.accent}33`,
                  }}
                >
                  {phase.phaseNumber} · {phase.title}
                </div>
                <div style={{ flex: 1, height: 1, background: "#1a1a22" }} />
                <span style={{ fontSize: 10, color: "#333" }}>{phase.subtitle}</span>
              </div>

              {/* Nodes row */}
              <div
                className="flex items-center"
                style={{
                  flexDirection: isReversed ? "row-reverse" : "row",
                  gap: 0,
                }}
              >
                {nodes.map((node, nodeIndex) => (
                  <div
                    key={node.id}
                    className="flex items-center"
                    style={{
                      flex: nodeIndex < nodes.length - 1 ? "1" : "0",
                      flexDirection: isReversed ? "row-reverse" : "row",
                    }}
                  >
                    <TopicNode node={node} phase={phase} />
                    {nodeIndex < nodes.length - 1 && (
                      <HConnector direction="horizontal" color={phase.accent} />
                    )}
                  </div>
                ))}
              </div>

              {/* Turn connector to next phase */}
              {!isLastPhase && nextPhase && (
                <div
                  className="flex"
                  style={{ justifyContent: isReversed ? "flex-start" : "flex-end" }}
                >
                  <TurnConnector
                    direction={isReversed ? "left" : "right"}
                    color={nextPhase.accent}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Completion badge */}
        {completed.length === totalNodes && (
          <div
            className="text-center mt-12 rounded-2xl py-8 px-6"
            style={{ background: "#0a1f18", border: "1px solid #1D9E7544" }}
          >
            <div className="text-4xl mb-3">🎉</div>
            <p className="font-semibold text-white mb-1" style={{ fontSize: 16 }}>
              Roadmap complete!
            </p>
            <p style={{ fontSize: 13, color: "#555" }}>
              You have covered all 24 topics. Time to build AgentOS 2.0.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
