import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RoadmapNode, RoadmapPhase } from "@/data/roadmap";

interface RoadmapStore {
  selectedNodeId: string | null;
  selectedNode: RoadmapNode | null;
  selectedPhase: RoadmapPhase | null;
  completed: string[];
  isPanelOpen: boolean;
  setSelected: (nodeId: string, node: RoadmapNode, phase: RoadmapPhase) => void;
  clearSelected: () => void;
  toggleComplete: (nodeId: string) => void;
  isCompleted: (nodeId: string) => boolean;
  completedCount: () => number;
}

export const useRoadmapStore = create<RoadmapStore>()(
  persist(
    (set, get) => ({
      selectedNodeId: null,
      selectedNode: null,
      selectedPhase: null,
      completed: [],
      isPanelOpen: false,

      setSelected: (nodeId, node, phase) =>
        set({
          selectedNodeId: nodeId,
          selectedNode: node,
          selectedPhase: phase,
          isPanelOpen: true,
        }),

      clearSelected: () =>
        set({
          selectedNodeId: null,
          selectedNode: null,
          selectedPhase: null,
          isPanelOpen: false,
        }),

      toggleComplete: (nodeId) =>
        set((state) => ({
          completed: state.completed.includes(nodeId)
            ? state.completed.filter((id) => id !== nodeId)
            : [...state.completed, nodeId],
        })),

      isCompleted: (nodeId) => get().completed.includes(nodeId),

      completedCount: () => get().completed.length,
    }),
    {
      name: "agentpath-progress",
      partialize: (state) => ({ completed: state.completed }),
    }
  )
);
