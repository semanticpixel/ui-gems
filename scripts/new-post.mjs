#!/usr/bin/env node

/**
 * Create a new UI Gems post.
 * Usage: pnpm new-post "My Article Title"
 */

import fs from "fs";
import path from "path";

const title = process.argv[2];

if (!title) {
  console.error('Usage: pnpm new-post "My Article Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const dir = path.join("src", "content", "posts", slug);
const file = path.join(dir, "index.mdx");

if (fs.existsSync(dir)) {
  console.error(`Post already exists: ${dir}`);
  process.exit(1);
}

fs.mkdirSync(dir, { recursive: true });

const today = new Date().toISOString().split("T")[0];

const template = `---
title: "${title}"
description: ""
date: ${today}
draft: true
tags: []
series: "UI Gems"
issue: 0
---

import CSSPlayground from "@/components/CSSPlayground.astro";
import CSSSliderDemo from "@/components/CSSSliderDemo";
import ReactPlayground from "@/components/ReactPlayground";
import Aside from "@/components/Aside.astro";
import ArticlePoll from "@/components/ArticlePoll";

{/*
  Writing workflow:
  1. Write your rough draft below
  2. Refine with Claude Code:
     claude "Review and improve this article" ${file}
  3. Preview: npm run dev
  4. When ready: set draft: false, commit, push
  5. Cross-post:
     claude "Convert to Medium format" ${file}
     claude "Write a LinkedIn post promoting this article" ${file}
*/}

## Introduction

Start writing here...

<CSSPlayground
  title="Demo Title"
  description="What the reader should try."
  css={\`
.example {
  /* your CSS here */
}
  \`}
  html={\`
<div class="example">Your HTML here</div>
  \`}
/>

<Aside variant="info" title="Good to know">
  A helpful note for readers.
</Aside>

<ArticlePoll
  client:visible
  slug="${slug}"
  question="Would you use this technique in production?"
  options={["Already do!", "Yes, will try", "Maybe", "No"]}
/>
`;

fs.writeFileSync(file, template);
console.log(`✅ Created: ${file}`);
console.log(`   Edit:    code ${file}`);
console.log(`   Preview: npm run dev`);
