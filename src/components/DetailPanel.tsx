"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRoadmap } from "@/contexts/RoadmapContext";
import { CodeBlock } from "./CodeBlock";
import { codeSnippets } from "@/data/code-snippets";

const MIN_WIDTH = 260;
const MAX_WIDTH = 680;

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

  const [panelWidth, setPanelWidth] = useState(340);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const onResizeStart = (e: React.MouseEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    startWidth.current = panelWidth;
    e.preventDefault();
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const delta = startX.current - e.clientX;
      setPanelWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth.current + delta)));
    };
    const onMouseUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div
      style={{
        width: panelWidth,
        flexShrink: 0,
        position: "relative",
        background: "#0e0f14",
        borderLeft: "1px solid #1c1c24",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* ── Resize handle ── */}
      <div
        onMouseDown={onResizeStart}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          cursor: "col-resize",
          zIndex: 20,
          background: "transparent",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#7F77DD55"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
      />

      <AnimatePresence mode="wait">
        {!selectedNode || !selectedPhase ? (
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
                background: selectedPhase.bg,
                borderBottom: `1px solid ${selectedPhase.accent}22`,
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
                  background: selectedPhase.accent,
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
                  background: `${selectedPhase.accent}14`,
                  border: `1px solid ${selectedPhase.accent}22`,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    color: selectedPhase.accent,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    fontFamily: "monospace",
                  }}
                >
                  Phase {selectedPhase.phaseNumber} · {selectedPhase.title}
                </span>
              </div>

              {/* Icon + title */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, paddingRight: 28 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: `${selectedPhase.accent}18`,
                    border: `2px solid ${selectedPhase.accent}28`,
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
              <Section label="Concept" accent={selectedPhase.accent}>
                <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {selectedNode.concept.split("\n\n").map((point, i) => (
                    <li
                      key={i}
                      style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                    >
                      <div
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: selectedPhase.accent,
                          marginTop: 7,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 12.5,
                          color: "#6a6a88",
                          lineHeight: 1.75,
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {point.trim()}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>

              {selectedNode.deepDive && (
                <Section label="Deep Dive" accent={selectedPhase.accent}>
                  <DeepDiveSection content={selectedNode.deepDive} accent={selectedPhase.accent} />
                </Section>
              )}

              <Section label="Key Points" accent={selectedPhase.accent}>
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
                          background: selectedPhase.accent,
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

              <Section label="Project Idea" accent={selectedPhase.accent}>
                <div
                  style={{
                    background: "#090912",
                    borderRadius: 10,
                    padding: "12px 14px",
                    borderTop: `1px solid ${selectedPhase.accent}18`,
                    borderRight: `1px solid ${selectedPhase.accent}18`,
                    borderBottom: `1px solid ${selectedPhase.accent}18`,
                    borderLeft: `3px solid ${selectedPhase.accent}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      color: selectedPhase.accent,
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
                <Section label="Tech Stack" accent={selectedPhase.accent}>
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

              {codeSnippets[selectedNode.id] && (
                <Section label="Code Example" accent={selectedPhase.accent}>
                  <CodeBlock
                    language={codeSnippets[selectedNode.id].language}
                    snippet={codeSnippets[selectedNode.id].snippet}
                    accent={selectedPhase.accent}
                  />
                </Section>
              )}

              {selectedNode.resources.length > 0 && (
                <Section label="Resources" accent={selectedPhase.accent}>
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
                            background: `${selectedPhase.accent}14`,
                            color: selectedPhase.accent,
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
                  background: isDone ? "#0a180a" : selectedPhase.accent,
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

function DeepDiveSection({ content, accent }: { content: string; accent: string }) {
  const blocks = content.split("\n\n").map((b) => b.trim()).filter(Boolean);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {blocks.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        const first = lines[0];
        const single = lines.length === 1;
        const allShort = lines.every((l) => l.length < 56);
        const hasPipeline = lines.some((l) => l === "↓");

        // ── Major section: "1. Transformers"
        if (single && /^\d+\.\s/.test(first)) {
          return (
            <div
              key={i}
              style={{
                marginTop: i > 0 ? 20 : 0,
                paddingTop: i > 0 ? 14 : 0,
                borderTop: i > 0 ? "1px solid #1c1c24" : "none",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: accent,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {first}
              </span>
            </div>
          );
        }

        // ── Label ending with ":"
        if (single && first.endsWith(":")) {
          return (
            <div key={i} style={{ marginTop: 10 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#7a7a98",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {first}
              </span>
            </div>
          );
        }

        // ── Citation e.g. "Attention Is All You Need" (2017)
        if (single && first.startsWith('"')) {
          return (
            <div
              key={i}
              style={{
                padding: "5px 10px",
                borderLeft: `2px solid ${accent}`,
                background: "#0a0a12",
                borderRadius: "0 6px 6px 0",
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: accent,
                  fontStyle: "italic",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {first}
              </span>
            </div>
          );
        }

        // ── Pipeline diagram (contains ↓ arrows)
        if (hasPipeline) {
          return (
            <div
              key={i}
              style={{
                padding: "10px 14px",
                background: "#090912",
                border: "1px solid #1e1e2a",
                borderRadius: 8,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {lines.map((line, j) =>
                line === "↓" ? (
                  <div key={j} style={{ fontSize: 11, color: "#333348", paddingLeft: 4 }}>
                    ↓
                  </div>
                ) : (
                  <span
                    key={j}
                    style={{ fontSize: 11.5, color: "#6a6a88", fontFamily: "monospace" }}
                  >
                    {line}
                  </span>
                )
              )}
            </div>
          );
        }

        // ── Sub-header: short single line, no trailing period
        if (single && !first.endsWith(".") && first.length < 55) {
          return (
            <div key={i} style={{ marginTop: 8 }}>
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "#c8c8d8",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {first}
              </span>
            </div>
          );
        }

        // ── List: multiple short lines
        if (!single && allShort) {
          return (
            <ul key={i} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {lines.map((line, j) => (
                <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <div
                    style={{
                      width: 3,
                      height: 3,
                      borderRadius: "50%",
                      background: `${accent}99`,
                      marginTop: 6,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      color: "#5a5a78",
                      lineHeight: 1.65,
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        // ── Body text (default)
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {lines.map((line, j) => (
              <p
                key={j}
                style={{
                  fontSize: 12,
                  color: "#555570",
                  lineHeight: 1.75,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {line}
              </p>
            ))}
          </div>
        );
      })}
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
