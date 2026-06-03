"use client";

import { motion } from "framer-motion";
import { useRoadmap } from "@/contexts/RoadmapContext";
import type { RoadmapNode, RoadmapPhase } from "@/data/roadmap";

export function TopicNode({
  node,
  phase,
}: {
  node: RoadmapNode;
  phase: RoadmapPhase;
}) {
  const { selectedNodeId, setSelected, isCompleted } = useRoadmap();
  const isActive = selectedNodeId === node.id;
  const isDone = isCompleted(node.id);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 80,
        flexShrink: 0,
      }}
    >
      <motion.button
        onClick={() => setSelected(node.id, node, phase)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: isDone
            ? `${phase.accent}20`
            : isActive
            ? `${phase.accent}28`
            : phase.bg,
          border: `2px solid ${
            isActive
              ? phase.accent
              : isDone
              ? phase.accent + "66"
              : phase.accent + "30"
          }`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          cursor: "pointer",
          position: "relative",
          boxShadow: isActive ? `0 0 22px ${phase.accent}44` : "none",
          transition: "border 0.2s, box-shadow 0.2s, background 0.2s",
          outline: "none",
        }}
      >
        {isDone ? (
          <span style={{ fontSize: 20, color: phase.accent }}>✓</span>
        ) : (
          node.icon
        )}
      </motion.button>

      <span
        style={{
          fontSize: 10.5,
          color: isDone ? "#303040" : isActive ? "#c0c0d8" : "#6a6a88",
          textAlign: "center",
          marginTop: 8,
          lineHeight: 1.4,
          maxWidth: 78,
          fontFamily: "var(--font-sans)",
          transition: "color 0.2s",
        }}
      >
        {node.label}
      </span>
    </div>
  );
}
