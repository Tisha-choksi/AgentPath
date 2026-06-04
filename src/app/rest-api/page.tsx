import { RoadmapProvider } from "@/contexts/RoadmapContext";
import { RoadmapCanvas } from "@/components/RoadmapCanvas";
import { DetailPanel } from "@/components/DetailPanel";
import { restApiData } from "@/data/rest-api";

export default function RestApiPage() {
  return (
    <RoadmapProvider phases={restApiData} storageKey="rest-api-progress">
      <main
        style={{
          display: "flex",
          height: "100dvh",
          overflow: "hidden",
          background: "#0c0d10",
        }}
      >
        <div style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>
          <RoadmapCanvas title="REST API Knowledge" backHref="/" />
        </div>
        <DetailPanel />
      </main>
    </RoadmapProvider>
  );
}
