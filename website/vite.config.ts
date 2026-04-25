import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// Relative base works for GitHub Pages project sites and local preview.
export default defineConfig({
	plugins: [vue()],
	base: './',
	build: {
		outDir: 'dist',
		emptyOutDir: true,
	},
})
