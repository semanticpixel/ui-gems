import { useState } from "react";

interface CSSSliderDemoProps {
  /** CSS property to animate */
  property: string;
  /** Minimum value */
  min: number;
  /** Maximum value */
  max: number;
  /** Initial value */
  initial?: number;
  /** CSS unit (px, rem, vw, %, etc.) */
  unit?: string;
  /** Step size */
  step?: number;
  /** The HTML to render */
  html: string;
  /** Additional static CSS for the preview */
  baseCss?: string;
  /** Optional title */
  title?: string;
}

export default function CSSSliderDemo({
  property,
  min,
  max,
  initial,
  unit = "px",
  step = 1,
  html,
  baseCss = "",
  title,
}: CSSSliderDemoProps) {
  const [value, setValue] = useState(initial ?? Math.round((min + max) / 2));

  const dynamicCSS = `
    ${baseCss}
    .slider-target {
      ${property}: ${value}${unit};
    }
  `;

  return (
    <div style={{
      border: "1px solid var(--c-border)",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      background: "var(--c-bg-raised)",
      margin: "1.5rem 0",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.6rem 1rem",
        borderBottom: "1px solid var(--c-border-subtle)",
        background: "var(--c-surface)",
      }}>
        <span style={{
          fontSize: "0.78rem",
          fontWeight: 600,
          color: "var(--c-text-secondary)",
          fontFamily: "var(--f-mono)",
        }}>
          {title || `${property} demo`}
        </span>
        <code style={{
          fontSize: "0.78rem",
          fontFamily: "var(--f-mono)",
          color: "var(--c-accent-bright)",
          background: "var(--c-bg)",
          padding: "0.15em 0.5em",
          borderRadius: "4px",
          border: "1px solid var(--c-border-subtle)",
        }}>
          {property}: {value}{unit}
        </code>
      </div>

      {/* Preview */}
      <div
        style={{
          padding: "1.5rem",
          minHeight: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--c-bg-interactive)",
        }}
        dangerouslySetInnerHTML={{
          __html: `<style>${dynamicCSS}</style>${html}`,
        }}
      />

      {/* Slider */}
      <div style={{
        padding: "0.75rem 1rem",
        borderTop: "1px solid var(--c-border-subtle)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        background: "var(--c-surface)",
      }}>
        <span style={{
          fontSize: "0.72rem",
          fontFamily: "var(--f-mono)",
          color: "var(--c-text-muted)",
          minWidth: "3ch",
          textAlign: "right",
        }}>
          {min}
        </span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          style={{
            flex: 1,
            accentColor: "var(--c-accent)",
            cursor: "pointer",
          }}
        />
        <span style={{
          fontSize: "0.72rem",
          fontFamily: "var(--f-mono)",
          color: "var(--c-text-muted)",
          minWidth: "3ch",
        }}>
          {max}
        </span>
      </div>
    </div>
  );
}
