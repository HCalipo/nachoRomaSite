// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server', // o 'hybrid'
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: vercel(),
});