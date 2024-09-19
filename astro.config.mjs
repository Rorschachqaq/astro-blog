// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkMermaid from 'remark-mermaid';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
  ],
  markdown: {
    remarkPlugins: [remarkMath, remarkMermaid],
    rehypePlugins: [rehypeKatex, ],
    shikiConfig: {
      
      theme: 'github-light',
    }
  
  }
});
