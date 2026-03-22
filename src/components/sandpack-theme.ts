import type { SandpackTheme } from "@codesandbox/sandpack-react";

/**
 * UI Gems Night — Custom Sandpack theme
 * Matches the blog's dark aesthetic and the Shiki theme colors.
 */
export const uiGemsNightTheme: SandpackTheme = {
  colors: {
    surface1: "#0f1219",
    surface2: "#18181f",
    surface3: "#1e1e2e",
    clickable: "#94a3b8",
    base: "#c9d1d9",
    disabled: "#3b4252",
    hover: "#e2e8f0",
    accent: "#818cf8",
    error: "#f87171",
    errorSurface: "#2d1b1b",
  },
  syntax: {
    plain: "#c9d1d9",
    comment: { color: "#545c7a", fontStyle: "italic" },
    keyword: "#c4a1f5",
    tag: "#f07e7e",
    punctuation: "#7a8199",
    definition: "#7eb8f0",
    property: "#88c9f7",
    static: "#f0b271",
    string: "#a8d8a8",
  },
  font: {
    body: '"IBM Plex Sans", "Segoe UI", system-ui, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
    size: "13px",
    lineHeight: "1.65",
  },
};
