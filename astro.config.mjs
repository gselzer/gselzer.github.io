// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// https://astro.build/config
export default defineConfig({
  site: 'https://gselzer.github.io/',
  integrations: [preact()],
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});