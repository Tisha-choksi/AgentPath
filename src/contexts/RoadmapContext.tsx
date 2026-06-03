"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { RoadmapNode, RoadmapPhase } from "@/data/roadmap";

interface RoadmapContextValue {
  phases: RoadmapPhase[];
  selectedNodeId: string | null;
  selectedNode: RoadmapNode | null;
  selectedPhase: RoadmapPhase | null;
  completed: string[];
  setSelected: (id: string, node: RoadmapNode, phase: RoadmapPhase) => void;
  clearSelected: () => void;
  toggleComplete: (id: string) => void;
  isCompleted: (id: string) => boolean;
}

const RoadmapContext = createContext<RoadmapContextValue>(null!);

export function useRoadmap() {
  return useContext(RoadmapContext);
}

export function RoadmapProvider({
  children,
  phases,
  storageKey,
}: {
  children: React.ReactNode;
  phases: RoadmapPhase[];
  storageKey: string;
}) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase | null>(null);

  const [completed, setCompleted] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
      // Guard against old Zustand format: { state: { completed: [...] }, version: 0 }
      if (Array.isArray(raw)) return raw;
      if (Array.isArray(raw?.state?.completed)) return raw.state.completed;
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(completed));
  }, [completed, storageKey]);

  const setSelected = useCallback(
    (id: string, node: RoadmapNode, phase: RoadmapPhase) => {
      setSelectedNodeId(id);
      setSelectedNode(node);
      setSelectedPhase(phase);
    },
    []
  );

  const clearSelected = useCallback(() => {
    setSelectedNodeId(null);
    setSelectedNode(null);
    setSelectedPhase(null);
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const isCompleted = useCallback(
    (id: string) => completed.includes(id),
    [completed]
  );

  return (
    <RoadmapContext.Provider
      value={{
        phases,
        selectedNodeId,
        selectedNode,
        selectedPhase,
        completed,
        setSelected,
        clearSelected,
        toggleComplete,
        isCompleted,
      }}
    >
      {children}
    </RoadmapContext.Provider>
  );
}
