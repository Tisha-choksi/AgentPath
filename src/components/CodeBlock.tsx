"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";

interface CodeBlockProps {
  language: string;
  snippet: string;
  accent: string;
}

export function CodeBlock({ language, snippet, accent }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div
      style={{
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid #1e1e2a",
        fontSize: 12,
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 12px",
          background: "#0a0a10",
          borderBottom: "1px solid #1e1e2a",
        }}
      >
        <span
          style={{
            fontSize: 9,
            color: accent,
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            fontSize: 10,
            color: copied ? "#1D9E75" : "#44445a",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            padding: 0,
            transition: "color 0.2s",
          }}
        >
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "14px",
          background: "#060610",
          fontSize: 11.5,
          lineHeight: 1.6,
          fontFamily: "var(--font-mono)",
        }}
        wrapLongLines
      >
        {snippet.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
