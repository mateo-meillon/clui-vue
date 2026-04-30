import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
// Repo root: parent of /website (clui-vue package)
const cluiRoot = resolve(__dirname, '..')

// Use library source and SFC styles instead of the published `dist` build.
export default defineConfig({
	plugins: [vue()],
	base: '/clui-vue/',
	resolve: {
		alias: [
			// Only the package root — not `clui-vue/styles/...` or `clui-vue/tokens`.
			{ find: /^clui-vue$/, replacement: resolve(cluiRoot, 'src/index.ts') },
		],
	},
	server: {
		fs: {
			allow: [cluiRoot, __dirname],
		},
	},
	build: {
		outDir: 'dist',
		emptyOutDir: true,
	},
})
