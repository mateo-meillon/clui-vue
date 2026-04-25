import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
	plugins: [
		vue(),
		dts({
			entryRoot: 'src',
			include: ['src/**/*.ts', 'src/**/*.vue'],
			tsconfigPath: 'tsconfig.json',
		}),
	],
	build: {
		cssCodeSplit: false,
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es'],
			fileName: () => 'index.js',
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				assetFileNames: 'style.css',
			},
		},
	},
})
