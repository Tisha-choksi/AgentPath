import { RoadmapProvider } from "@/contexts/RoadmapContext";
import { RoadmapCanvas } from "@/components/RoadmapCanvas";
import { DetailPanel } from "@/components/DetailPanel";
import { roadmapData } from "@/data/roadmap";

export default function AgentsPage() {
  return (
    <RoadmapProvider phases={roadmapData} storageKey="agentpath-progress">
      <main
        style={{
          display: "flex",
          height: "100dvh",
          overflow: "hidden",
          background: "#0c0d10",
        }}
      >
        <div style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>
          <RoadmapCanvas title="AI Agents Roadmap" backHref="/" />
        </div>
        <DetailPanel />
      </main>
    </RoadmapProvider>
  );
}
