import { RoadmapCanvas } from "@/components/RoadmapCanvas";
import { DetailPanel } from "@/components/DetailPanel";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        overflow: "hidden",
        height: "100dvh",
        background: "#0c0d10",
      }}
    >
      <div style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>
        <RoadmapCanvas />
      </div>
      <DetailPanel />
    </main>
  );
}
