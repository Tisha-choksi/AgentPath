import { RoadmapProvider } from "@/contexts/RoadmapContext";
import { RoadmapCanvas } from "@/components/RoadmapCanvas";
import { DetailPanel } from "@/components/DetailPanel";
import { gitData } from "@/data/git";

export default function GitPage() {
  return (
    <RoadmapProvider phases={gitData} storageKey="git-progress">
      <main
        style={{
          display: "flex",
          height: "100dvh",
          overflow: "hidden",
          background: "#0c0d10",
        }}
      >
        <div style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>
          <RoadmapCanvas title="Git & Terminal" backHref="/" />
        </div>
        <DetailPanel />
      </main>
    </RoadmapProvider>
  );
}
