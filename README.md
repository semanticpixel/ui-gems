# UI Gems 💎

A technical blog with **interactive CSS demos** and **React playgrounds**, powered by Astro + MDX. Features a custom syntax theme, contextual callout components, reader polls, and a Sandpack-powered React sandbox. Deployed to GitHub Pages.

## Quick Start

```bash
pnpm install
pnpm dev
# → http://localhost:4321/ui-gems/
```

## Create a New Article

```bash
pnpm new-post "CSS Scroll-Driven Animations"
# Creates: src/content/posts/css-scroll-driven-animations/index.mdx
```

## Deploy to GitHub Pages

1. Create a GitHub repo (e.g., `ui-gems`)
2. Update `astro.config.mjs` — set `site` to `https://yourusername.github.io`
3. Go to **Settings → Pages → Source** → select **GitHub Actions**
4. Push to `main` — the included workflow handles the rest

## Components

All components can be imported in MDX using `@/` aliases.

### `<CSSPlayground>` — Live CSS Editor

Split-panel: editable CSS on the left, iframe preview on the right. Ships zero framework JS — uses Astro's `<script define:vars>` pattern.

```mdx
import CSSPlayground from "@/components/CSSPlayground.astro";

<CSSPlayground
  title="My Demo"
  css={`.box { background: coral; border-radius: 12px; padding: 2rem; }`}
  html={`<div class="box">Hello</div>`}
/>
```

### `<CSSSliderDemo>` — Single-Property Slider

Drag a slider to change one CSS property in real-time. Great for exploring individual values.

```mdx
import CSSSliderDemo from "@/components/CSSSliderDemo";

<CSSSliderDemo
  client:visible
  property="border-radius"
  min={0} max={50} unit="px"
  html='<div class="slider-target">Drag me</div>'
  baseCss={`.slider-target { width:100px; height:100px; background:#818cf8; }`}
/>
```

### `<ReactPlayground>` — Sandpack React Sandbox

Multi-file React editor + preview with console, custom theme, and reset. **Requires `client:visible`.**

```mdx
import ReactPlayground from "@/components/ReactPlayground";

<ReactPlayground
  client:visible
  title="Compound Components"
  files={{
    "/App.js": `export default function App() { return <h1>Hello!</h1>; }`,
    "/styles.css": `.heading { color: navy; }`,
  }}
/>
```

### `<Aside>` — Contextual Callout

Four variants: `info`, `success`, `warning`, `error`. Code blocks nested inside automatically receive variant-aware background colors and border tints.

```mdx
import Aside from "@/components/Aside.astro";

<Aside variant="warning" title="Heads up">
  Code blocks inside get contextual colors:
  ```css
  .example { color: hotpink; }
  ```
</Aside>
```

### `<ArticlePoll>` — Reader Poll

Per-article poll with animated bar chart. Stored in localStorage. **Requires `client:visible`.**

```mdx
import ArticlePoll from "@/components/ArticlePoll";

<ArticlePoll
  client:visible
  slug="your-article-slug"
  question="Would you use this in production?"
  options={["Already do!", "Yes", "Maybe", "No"]}
/>
```

> **Remember**: React components (`CSSSliderDemo`, `ReactPlayground`, `ArticlePoll`) need `client:visible`. Astro components (`CSSPlayground`, `Aside`) do not.

## Custom Syntax Theme

Uses a bespoke Shiki theme (`src/styles/shiki-ui-gems-night.json`) with rich CSS token coverage — properties, values, functions, selectors, pseudo-classes, units, custom properties, @-rules. Can be used in VS Code.

## Writing Workflow

```bash
# 1. Create a post
pnpm new-post "CSS Scroll Animations"

# 2. Write and refine
claude "Review this article for clarity" src/content/posts/css-scroll-animations/index.mdx

# 3. Preview
pnpm dev

# 4. Publish (set draft: false, push to main)
git add . && git commit -m "Publish: CSS Scroll Animations" && git push

# 5. Cross-post
claude "Convert to Medium markdown, replace interactive components with static code blocks" \
  src/content/posts/css-scroll-animations/index.mdx

claude "Write a LinkedIn post promoting this article (under 1300 chars)" \
  src/content/posts/css-scroll-animations/index.mdx
```

## Project Structure

```
ui-gems/
├── src/
│   ├── components/
│   │   ├── CSSPlayground.astro     ← Live CSS editor (zero framework JS)
│   │   ├── CSSSliderDemo.tsx       ← Single-property slider demo
│   │   ├── ReactPlayground.tsx     ← Sandpack React sandbox
│   │   ├── sandpack-theme.ts       ← Custom Sandpack theme
│   │   ├── Aside.astro             ← Contextual callout (4 variants)
│   │   ├── ArticlePoll.tsx         ← Reader poll widget
│   │   ├── ArticleCard.astro       ← Post listing card
│   │   └── TableOfContents.astro   ← Sticky sidebar TOC
│   ├── content/
│   │   ├── config.ts
│   │   └── posts/
│   │       ├── css-clamp-deep-dive/index.mdx
│   │       ├── has-selector-patterns/index.mdx
│   │       └── native-css-mixins/index.mdx
│   ├── layouts/
│   │   ├── Base.astro              ← Site shell (nav, footer, RSS)
│   │   └── Post.astro              ← Article layout (TOC, CTA, auto reading time)
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── posts/[slug].astro
│   │   └── rss.xml.js
│   └── styles/
│       ├── reset.css               ← Reset stytes
│       ├── theme.css               ← Design tokens
│       ├── layout.css              ← Layout, prose styles
│       ├── utilities.css           ← Utility CSS classes
│       ├── components.css          ← Components, CSS Playground
│       ├── ui-gems.css             ← Main CSS file
│       └── shiki-ui-gems-night.json← Custom Shiki syntax theme
├── scripts/
│   └── new-post.mjs                ← CLI to scaffold new articles
├── .github/workflows/
│   └── deploy.yml                  ← GitHub Pages CI/CD
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## License

Content © Luis. Code is MIT.
