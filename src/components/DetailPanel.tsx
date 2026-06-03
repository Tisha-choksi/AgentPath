"use client";

import { useRoadmapStore } from "@/lib/store";

export function DetailPanel() {
  const { selectedNode, selectedPhase, isPanelOpen, clearSelected, toggleComplete, isCompleted } =
    useRoadmapStore();

  if (!selectedNode || !selectedPhase) return null;

  const isDone = isCompleted(selectedNode.id);

  const levelLabel: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };

  const levelColor: Record<string, string> = {
    beginner: "#1D9E75",
    intermediate: "#BA7517",
    advanced: "#D85A30",
  };

  return (
    <>
      {/* Backdrop on mobile */}
      <div
        className="fixed inset-0 z-10 lg:hidden"
        style={{
          background: "rgba(0,0,0,0.6)",
          opacity: isPanelOpen ? 1 : 0,
          pointerEvents: isPanelOpen ? "auto" : "none",
          transition: "opacity 0.2s",
        }}
        onClick={clearSelected}
      />

      {/* Panel */}
      <aside
        className="fixed right-0 top-0 z-20 h-full flex flex-col overflow-y-auto"
        style={{
          width: 320,
          background: "#111116",
          borderLeft: "1px solid #1e1e2a",
          padding: "24px 20px",
          transform: isPanelOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          gap: 0,
        }}
      >
        {/* Close */}
        <button
          onClick={clearSelected}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-400 transition-colors"
          style={{ fontSize: 18, lineHeight: 1 }}
          aria-label="Close panel"
        >
          ✕
        </button>

        {/* Phase badge */}
        <div
          className="text-xs font-semibold tracking-widest uppercase rounded-full w-fit mb-3"
          style={{
            padding: "3px 10px",
            background: selectedPhase.bg,
            color: selectedPhase.accent,
            border: `1px solid ${selectedPhase.accent}33`,
            fontSize: 9,
          }}
        >
          {selectedPhase.title}
        </div>

        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: selectedPhase.bg }}
          >
            {selectedNode.icon}
          </div>
          <div>
            <h2 className="font-semibold text-white leading-tight" style={{ fontSize: 15 }}>
              {selectedNode.label}
            </h2>
            <span
              className="text-xs font-medium rounded-full"
              style={{
                color: levelColor[selectedNode.level],
                fontSize: 10,
              }}
            >
              {levelLabel[selectedNode.level]}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#1e1e2a", margin: "0 0 16px" }} />

        {/* Concept */}
        <div className="mb-4">
          <SectionLabel>Concept</SectionLabel>
          <p className="text-gray-400 leading-relaxed" style={{ fontSize: 12.5 }}>
            {selectedNode.concept}
          </p>
        </div>

        {/* Key points */}
        <div className="mb-4">
          <SectionLabel>Key points</SectionLabel>
          <ul className="space-y-2">
            {selectedNode.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <div
                  className="mt-1.5 rounded-full flex-shrink-0"
                  style={{ width: 4, height: 4, background: selectedPhase.accent }}
                />
                <span className="text-gray-500 leading-relaxed" style={{ fontSize: 12 }}>
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Project idea */}
        <div className="mb-4">
          <SectionLabel>Project idea</SectionLabel>
          <div
            className="rounded-xl p-3"
            style={{ background: "#0a0a12", border: `1px solid ${selectedPhase.accent}22` }}
          >
            <div
              className="text-xs font-semibold tracking-widest uppercase mb-1.5"
              style={{ color: selectedPhase.accent, fontSize: 9 }}
            >
              Build this
            </div>
            <p className="leading-relaxed" style={{ fontSize: 12, color: "#8080aa" }}>
              {selectedNode.project}
            </p>
          </div>
        </div>

        {/* Stack */}
        {selectedNode.stack.length > 0 && (
          <div className="mb-4">
            <SectionLabel>Tech stack</SectionLabel>
            <div className="flex flex-wrap gap-1.5">
              {selectedNode.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full text-xs"
                  style={{
                    padding: "2px 8px",
                    background: "#1a1a2a",
                    color: "#6666aa",
                    fontSize: 11,
                    border: "1px solid #2a2a3a",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Resources */}
        {selectedNode.resources.length > 0 && (
          <div className="mb-6">
            <SectionLabel>Resources</SectionLabel>
            <ul className="space-y-1.5">
              {selectedNode.resources.map((r, i) => (
                <li key={i}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors"
                    style={{ color: "#7F77DD", fontSize: 12 }}
                  >
                    <span>↗</span>
                    <span className="hover:underline">{r.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mark complete */}
        <div className="mt-auto pt-4" style={{ borderTop: "1px solid #1e1e2a" }}>
          <button
            onClick={() => toggleComplete(selectedNode.id)}
            className="w-full rounded-xl font-medium transition-all duration-200"
            style={{
              padding: "10px",
              background: isDone ? "#1a2a1a" : "#1D9E75",
              color: isDone ? "#1D9E75" : "#fff",
              border: isDone ? "1px solid #1D9E7544" : "none",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {isDone ? "✓ Marked as complete" : "Mark as complete"}
          </button>
        </div>
      </aside>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-semibold tracking-widest uppercase mb-2"
      style={{ fontSize: 9, color: "#444", letterSpacing: "0.1em" }}
    >
      {children}
    </div>
  );
}
