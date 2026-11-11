import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

/**
 * GitHub Pages serves a project site from https://<user>.github.io/<repo>/,
 * so every asset URL needs the repo name as its base path.
 *
 *   - Default:            /yarnmates-landing/   (rename if the repo differs)
 *   - Custom domain, or
 *     a <user>.github.io
 *     user/org site:      set BASE_PATH=/ in the environment
 *
 * The deploy workflow passes BASE_PATH automatically from the repo name,
 * so this keeps working even if the repository is renamed.
 */
const base = process.env.BASE_PATH || '/yarnmates-landing/'

export default defineConfig({
  base,
  plugins: [vue()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
