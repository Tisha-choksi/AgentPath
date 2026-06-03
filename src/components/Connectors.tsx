"use client";

interface ConnectorProps {
  direction: "horizontal";
  color: string;
}

interface TurnConnectorProps {
  direction: "right" | "left"; // which side the turn curves toward
  color: string;
}

export function HConnector({ color }: ConnectorProps) {
  return (
    <div
      className="flex-1"
      style={{
        height: 2,
        borderTop: `2px dashed ${color}44`,
        marginTop: -28, // align with circle center
        minWidth: 12,
      }}
    />
  );
}

export function TurnConnector({ direction, color }: TurnConnectorProps) {
  return (
    <div
      style={{
        width: 36,
        height: 52,
        border: `2px dashed ${color}44`,
        borderLeft: direction === "right" ? "none" : `2px dashed ${color}44`,
        borderRight: direction === "left" ? "none" : `2px dashed ${color}44`,
        borderRadius:
          direction === "right" ? "0 28px 28px 0" : "28px 0 0 28px",
        marginTop: -20,
        alignSelf: "flex-end",
        flexShrink: 0,
      }}
    />
  );
}
