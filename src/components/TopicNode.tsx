"use client";

import { useRoadmapStore } from "@/lib/store";
import type { RoadmapNode, RoadmapPhase } from "@/data/roadmap";

interface TopicNodeProps {
  node: RoadmapNode;
  phase: RoadmapPhase;
}

const levelColors: Record<string, string> = {
  beginner: "#1D9E75",
  intermediate: "#BA7517",
  advanced: "#D85A30",
};

export function TopicNode({ node, phase }: TopicNodeProps) {
  const { selectedNodeId, setSelected, isCompleted } = useRoadmapStore();
  const isActive = selectedNodeId === node.id;
  const isDone = isCompleted(node.id);

  return (
    <button
      onClick={() => setSelected(node.id, node, phase)}
      className="group flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
      style={{ width: 80 }}
    >
      {/* Circle */}
      <div
        className="relative flex items-center justify-center rounded-full transition-all duration-200"
        style={{
          width: 56,
          height: 56,
          background: isDone ? phase.bg : phase.bg,
          border: isActive
            ? `2px solid ${phase.accent}`
            : `1px solid ${phase.accent}33`,
          boxShadow: isActive
            ? `0 0 0 4px ${phase.accent}22, 0 0 20px ${phase.accent}33`
            : "none",
          opacity: isDone && !isActive ? 0.6 : 1,
          transform: isActive ? "scale(1.12)" : "scale(1)",
        }}
      >
        <span
          className="text-xl transition-all duration-200"
          style={{ filter: isDone ? "grayscale(0.5)" : "none" }}
        >
          {node.icon}
        </span>

        {/* Done checkmark */}
        {isDone && (
          <div
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: "#1D9E75", fontSize: 9, color: "#fff" }}
          >
            ✓
          </div>
        )}

        {/* Level dot */}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
          style={{ background: levelColors[node.level] }}
        />
      </div>

      {/* Label */}
      <span
        className="text-center leading-tight transition-colors duration-200"
        style={{
          fontSize: 10,
          color: isActive ? "#e0e0e0" : "#555",
          width: 72,
          lineHeight: 1.3,
        }}
      >
        {node.label}
      </span>
    </button>
  );
}
