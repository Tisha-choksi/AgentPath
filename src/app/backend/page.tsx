import { RoadmapProvider } from "@/contexts/RoadmapContext";
import { RoadmapCanvas } from "@/components/RoadmapCanvas";
import { DetailPanel } from "@/components/DetailPanel";
import { backendData } from "@/data/backend";

export default function BackendPage() {
  return (
    <RoadmapProvider phases={backendData} storageKey="backend-progress">
      <main
        style={{
          display: "flex",
          height: "100dvh",
          overflow: "hidden",
          background: "#0c0d10",
        }}
      >
        <div style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>
          <RoadmapCanvas title="Backend Development" backHref="/" />
        </div>
        <DetailPanel />
      </main>
    </RoadmapProvider>
  );
}
