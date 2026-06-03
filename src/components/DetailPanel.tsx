"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRoadmap } from "@/contexts/RoadmapContext";

const levelColor: Record<string, string> = {
  beginner: "#1D9E75",
  intermediate: "#BA7517",
  advanced: "#D85A30",
};

export function DetailPanel() {
  const {
    selectedNode,
    selectedPhase,
    clearSelected,
    toggleComplete,
    isCompleted,
  } = useRoadmap();

  const isDone = selectedNode ? isCompleted(selectedNode.id) : false;

  return (
    <div
      style={{
        width: 340,
        flexShrink: 0,
        background: "#0e0f14",
        borderLeft: "1px solid #1c1c24",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        {!selectedNode ? (
          /* ── Empty state ── */
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              padding: 32,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "2px solid #252530",
              }}
            />
            <p
              style={{
                fontSize: 12,
                color: "#383848",
                textAlign: "center",
                maxWidth: 180,
                lineHeight: 1.6,
                fontFamily: "var(--font-sans)",
              }}
            >
              Click any node on the path to explore the topic
            </p>
          </motion.div>
        ) : (
          /* ── Node detail ── */
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                position: "relative",
                background: selectedPhase!.bg,
                borderBottom: `1px solid ${selectedPhase!.accent}22`,
                padding: "18px 18px 18px",
                flexShrink: 0,
              }}
            >
              {/* Top accent bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: selectedPhase!.accent,
                }}
              />

              {/* Close */}
              <button
                onClick={clearSelected}
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  color: "#444",
                  fontSize: 15,
                  lineHeight: 1,
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 4,
                }}
              >
                ✕
              </button>

              {/* Phase pill */}
              <div
                style={{
                  display: "inline-flex",
                  padding: "3px 9px",
                  borderRadius: 20,
                  background: `${selectedPhase!.accent}14`,
                  border: `1px solid ${selectedPhase!.accent}22`,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    color: selectedPhase!.accent,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    fontFamily: "monospace",
                  }}
                >
                  Phase {selectedPhase!.phaseNumber} · {selectedPhase!.title}
                </span>
              </div>

              {/* Icon + title */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, paddingRight: 28 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: `${selectedPhase!.accent}18`,
                    border: `2px solid ${selectedPhase!.accent}28`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  {selectedNode.icon}
                </div>
                <div>
                  <h2
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: 6,
                      fontFamily: "var(--font-sans)",
                      lineHeight: 1.3,
                    }}
                  >
                    {selectedNode.label}
                  </h2>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: 20,
                      background: `${levelColor[selectedNode.level]}14`,
                      color: levelColor[selectedNode.level],
                      fontSize: 10,
                      border: `1px solid ${levelColor[selectedNode.level]}28`,
                      fontFamily: "monospace",
                      fontWeight: 600,
                    }}
                  >
                    {selectedNode.level.charAt(0).toUpperCase() +
                      selectedNode.level.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable body */}
            <div
              style={{ flex: 1, overflowY: "auto", padding: "18px 18px 0" }}
            >
              <Section label="Concept" accent={selectedPhase!.accent}>
                <p
                  style={{
                    fontSize: 12.5,
                    color: "#6a6a88",
                    lineHeight: 1.75,
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {selectedNode.concept}
                </p>
              </Section>

              <Section label="Key Points" accent={selectedPhase!.accent}>
                <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {selectedNode.keyPoints.map((point, i) => (
                    <li
                      key={i}
                      style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                    >
                      <div
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: selectedPhase!.accent,
                          marginTop: 7,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 12,
                          color: "#555570",
                          lineHeight: 1.65,
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section label="Project Idea" accent={selectedPhase!.accent}>
                <div
                  style={{
                    background: "#090912",
                    borderRadius: 10,
                    padding: "12px 14px",
                    borderTop: `1px solid ${selectedPhase!.accent}18`,
                    borderRight: `1px solid ${selectedPhase!.accent}18`,
                    borderBottom: `1px solid ${selectedPhase!.accent}18`,
                    borderLeft: `3px solid ${selectedPhase!.accent}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      color: selectedPhase!.accent,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      marginBottom: 8,
                      fontFamily: "monospace",
                    }}
                  >
                    Build this →
                  </div>
                  <p
                    style={{
                      fontSize: 12,
                      color: "#5a5a78",
                      lineHeight: 1.7,
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {selectedNode.project}
                  </p>
                </div>
              </Section>

              {selectedNode.stack.length > 0 && (
                <Section label="Tech Stack" accent={selectedPhase!.accent}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {selectedNode.stack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: "3px 9px",
                          background: "#111120",
                          color: "#5a5a88",
                          fontSize: 10.5,
                          border: "1px solid #1e1e30",
                          borderRadius: 8,
                          fontFamily: "monospace",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Section>
              )}

              {selectedNode.resources.length > 0 && (
                <Section label="Resources" accent={selectedPhase!.accent}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {selectedNode.resources.map((r, i) => (
                      <a
                        key={i}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          background: "#111120",
                          border: "1px solid #1e1e2e",
                          borderRadius: 10,
                          textDecoration: "none",
                        }}
                      >
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 8,
                            background: `${selectedPhase!.accent}14`,
                            color: selectedPhase!.accent,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            flexShrink: 0,
                          }}
                        >
                          ↗
                        </div>
                        <span
                          style={{
                            fontSize: 12,
                            color: "#7F77DD",
                            fontFamily: "var(--font-sans)",
                          }}
                        >
                          {r.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </Section>
              )}

              <div style={{ height: 16 }} />
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "12px 18px",
                borderTop: "1px solid #1c1c24",
                background: "#0c0c12",
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => toggleComplete(selectedNode.id)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 12,
                  background: isDone ? "#0a180a" : selectedPhase!.accent,
                  color: isDone ? "#1D9E75" : "#fff",
                  border: isDone
                    ? "1px solid #1D9E7530"
                    : "1px solid transparent",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  transition: "all 0.2s",
                }}
              >
                {isDone ? "✓  Marked as complete" : "Mark as complete"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Section({
  label,
  accent,
  children,
}: {
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: 9,
            color: accent,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 700,
            fontFamily: "monospace",
          }}
        >
          {label}
        </span>
        <div style={{ flex: 1, height: 1, background: "#1c1c24" }} />
      </div>
      {children}
    </div>
  );
}
