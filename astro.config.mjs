// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: isDev ? undefined : node({
    mode: 'standalone'
  })
});