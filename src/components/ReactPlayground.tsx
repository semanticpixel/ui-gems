import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { uiGemsNightTheme } from "./sandpack-theme";
import { useState } from "react";
import type { SandpackFiles } from "@codesandbox/sandpack-react";

/* -------------------------------------------------------
 * ReactPlayground — Drop-in React code playground for MDX.
 *
 * Usage in MDX:
 *
 *   import ReactPlayground from '../../components/ReactPlayground';
 *
 *   <ReactPlayground
 *     client:visible
 *     title="Compound Component Pattern"
 *     files={{
 *       "/App.js": `export default function App() {
 *         return <h1>Hello!</h1>;
 *       }`,
 *     }}
 *   />
 *
 * Props:
 *   title        — Label for the header bar
 *   description  — Optional helper text
 *   files        — Sandpack files object (key: filepath, value: code string)
 *   template     — Sandpack template (default: "react")
 *   showConsole  — Show console panel (default: false)
 *   editorHeight — Editor panel height in px (default: 320)
 * ------------------------------------------------------- */

interface ReactPlaygroundProps {
  title?: string;
  description?: string;
  files: SandpackFiles;
  template?: "react" | "react-ts" | "vanilla" | "vanilla-ts";
  showConsole?: boolean;
  editorHeight?: number;
}

function ResetButton() {
  const { sandpack } = useSandpack();
  return (
    <button
      onClick={() => sandpack.resetAllFiles()}
      style={{
        fontFamily: "var(--f-mono, monospace)",
        fontSize: "0.6875rem",
        color: "#64748b",
        background: "#18181f",
        border: "1px solid #2a2a3a",
        borderRadius: "4px",
        padding: "3px 8px",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#818cf8";
        e.currentTarget.style.borderColor = "#6366f1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#64748b";
        e.currentTarget.style.borderColor = "#2a2a3a";
      }}
    >
      ↺ Reset
    </button>
  );
}

export default function ReactPlayground({
  title,
  description,
  files,
  template = "react",
  showConsole = false,
  editorHeight = 320,
}: ReactPlaygroundProps) {
  const [consoleOpen, setConsoleOpen] = useState(showConsole);

  return (
    <div className="playground-wrapper">
      <div
        style={{
          border: "1px solid #2a2a3a",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#111119",
        }}
      >
        {/* Title bar */}
        {title && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 14px",
              background: "#18181f",
              borderBottom: "1px solid #1e1e2e",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#ff5f57",
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#febc2e",
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#28c840",
              }}
            />
            <span
              style={{
                fontFamily: "var(--f-mono, monospace)",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "#94a3b8",
                marginLeft: "8px",
              }}
            >
              {title}
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: "var(--f-mono, monospace)",
                fontSize: "0.6rem",
                color: "#6366f1",
                background: "rgba(129, 140, 248, 0.15)",
                padding: "1px 6px",
                borderRadius: "999px",
                textTransform: "lowercase",
              }}
            >
              react
            </span>
          </div>
        )}

        {description && (
          <p
            style={{
              fontSize: "0.8125rem",
              color: "#64748b",
              padding: "8px 14px",
              borderBottom: "1px solid #1e1e2e",
              margin: 0,
            }}
          >
            {description}
          </p>
        )}

        {/* Sandpack */}
        <SandpackProvider
          template={template}
          theme={uiGemsNightTheme}
          files={files}
          options={{
            classes: {
              "sp-wrapper": "ui-gems-sp-wrapper",
            },
          }}
        >
          <SandpackLayout
            style={{
              border: "none",
              borderRadius: 0,
              background: "transparent",
            }}
          >
            <SandpackCodeEditor
              showTabs
              showLineNumbers
              showInlineErrors
              wrapContent
              closableTabs={false}
              style={{ height: `${editorHeight}px` }}
            />
            <SandpackPreview
              showOpenInCodeSandbox={false}
              showRefreshButton
              style={{ height: `${editorHeight}px` }}
            />
          </SandpackLayout>

          {/* Footer with controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderTop: "1px solid #1e1e2e",
              background: "#18181f",
            }}
          >
            <ResetButton />
            <button
              onClick={() => setConsoleOpen((o) => !o)}
              style={{
                fontFamily: "var(--f-mono, monospace)",
                fontSize: "0.6875rem",
                color: consoleOpen ? "#818cf8" : "#64748b",
                background: consoleOpen
                  ? "rgba(129, 140, 248, 0.12)"
                  : "#18181f",
                border: `1px solid ${consoleOpen ? "#6366f1" : "#2a2a3a"}`,
                borderRadius: "4px",
                padding: "3px 8px",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {consoleOpen ? "▾ Console" : "▸ Console"}
            </button>
          </div>

          {consoleOpen && (
            <div
              style={{
                borderTop: "1px solid #1e1e2e",
                height: "160px",
              }}
            >
              <SandpackConsole style={{ height: "100%" }} />
            </div>
          )}
        </SandpackProvider>
      </div>
    </div>
  );
}
