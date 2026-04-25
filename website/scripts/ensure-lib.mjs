import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..', '..')
const distEntry = join(root, 'dist', 'index.js')

if (!existsSync(distEntry)) {
	console.info('[clui-website] dist/ missing — building clui-vue (one-time)…\n')
	execSync('pnpm run build', { cwd: root, stdio: 'inherit' })
}
