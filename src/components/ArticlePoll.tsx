import { useEffect, useState } from "react";

/* -------------------------------------------------------
 * ArticlePoll — Lightweight per-article reader poll.
 *
 * Usage in MDX:
 *   import ArticlePoll from '../../components/ArticlePoll';
 *
 *   <ArticlePoll
 *     client:visible
 *     slug="css-clamp-deep-dive"
 *     question="Would you use clamp() for typography in production?"
 *     options={["Already do!", "Yes, will try", "Maybe, need to test", "Prefer media queries"]}
 *   />
 *
 * Data is stored in localStorage per-slug. There's no backend —
 * this is a personal engagement widget, not analytics. If you
 * want shared results later, swap localStorage for a fetch to
 * a serverless function or KV store.
 * ------------------------------------------------------- */

interface ArticlePollProps {
  slug: string;
  question: string;
  options: string[];
}

// Simple deterministic "fake crowd" results seeded by slug
// so the bar chart looks populated even for a fresh visitor
function seedResults(slug: string, options: string[]): number[] {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return options.map((_, i) => {
    const base = Math.abs(((hash >> (i * 4)) & 0xff) % 60) + 8;
    return base;
  });
}

export default function ArticlePoll({
  slug,
  question,
  options,
}: ArticlePollProps) {
  const storageKey = `ui-gems-poll-${slug}`;
  const [voted, setVoted] = useState<number | null>(null);
  const [counts, setCounts] = useState<number[]>([]);
  const [animate, setAnimate] = useState(false);

  // Initialize on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    const seeded = seedResults(slug, options);
    setCounts(seeded);
    if (saved !== null) {
      const idx = parseInt(saved, 10);
      setVoted(idx);
      // Bump the voted option
      const updated = [...seeded];
      updated[idx] = (updated[idx] || 0) + 1;
      setCounts(updated);
      setAnimate(true);
    }
  }, [slug, options.length]);

  function handleVote(index: number) {
    if (voted !== null) return;
    localStorage.setItem(storageKey, String(index));
    const updated = [...counts];
    updated[index] = (updated[index] || 0) + 1;
    setCounts(updated);
    setVoted(index);
    // Trigger bar animation after a brief delay
    requestAnimationFrame(() => setAnimate(true));
  }

  const total = counts.reduce((a, b) => a + b, 0) || 1;
  const showResults = voted !== null;

  return (
    <div
      className="playground-wrapper"
      style={{
        margin: "2rem 0",
      }}
    >
      <div
        style={{
          border: "1px solid #2a2a3a",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#111119",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 14px",
            background: "#18181f",
            borderBottom: "1px solid #1e1e2e",
          }}
        >
          <span style={{ fontSize: "1rem" }}>📊</span>
          <span
            style={{
              fontFamily: "var(--f-mono, monospace)",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "#94a3b8",
            }}
          >
            Quick Poll
          </span>
          {showResults && (
            <span
              style={{
                marginLeft: "auto",
                fontFamily: "var(--f-mono, monospace)",
                fontSize: "0.6rem",
                color: "#34d399",
                background: "rgba(52, 211, 153, 0.12)",
                padding: "1px 6px",
                borderRadius: "999px",
              }}
            >
              voted ✓
            </span>
          )}
        </div>

        {/* Question */}
        <div style={{ padding: "16px 16px 8px" }}>
          <p
            style={{
              fontSize: "0.9375rem",
              fontWeight: 500,
              color: "#e2e8f0",
              margin: "0 0 12px",
              lineHeight: 1.5,
            }}
          >
            {question}
          </p>

          {/* Options */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              paddingBottom: "12px",
            }}
          >
            {options.map((option, i) => {
              const pct = Math.round((counts[i] / total) * 100);
              const isSelected = voted === i;

              return (
                <button
                  key={i}
                  onClick={() => handleVote(i)}
                  disabled={showResults}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    fontSize: "0.8125rem",
                    fontFamily: "var(--f-ui, sans-serif)",
                    color: isSelected ? "#e2e8f0" : "#94a3b8",
                    background: "transparent",
                    border: `1px solid ${isSelected ? "#818cf8" : "#1e1e2e"}`,
                    borderRadius: "8px",
                    cursor: showResults ? "default" : "pointer",
                    overflow: "hidden",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                    outline: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!showResults) {
                      e.currentTarget.style.borderColor = "#2a2a3a";
                      e.currentTarget.style.background = "#18181f";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!showResults) {
                      e.currentTarget.style.borderColor = "#1e1e2e";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {/* Background bar (visible after voting) */}
                  {showResults && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: animate ? `${pct}%` : "0%",
                        background: isSelected
                          ? "rgba(129, 140, 248, 0.15)"
                          : "rgba(148, 163, 184, 0.06)",
                        transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                        borderRadius: "7px",
                      }}
                    />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>
                    {option}
                  </span>
                  {showResults && (
                    <span
                      style={{
                        position: "relative",
                        zIndex: 1,
                        fontFamily: "var(--f-mono, monospace)",
                        fontSize: "0.6875rem",
                        fontWeight: 500,
                        color: isSelected ? "#818cf8" : "#64748b",
                        minWidth: "36px",
                        textAlign: "right",
                      }}
                    >
                      {pct}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
