/**
 * Loads `.env` into process.env, then runs `npm publish`.
 * `npm` does not read .env on its own, so `NPM_TOKEN` in .npmrc `${NPM_TOKEN}` would stay empty.
 */
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')

const root = path.join(__dirname, '..')
const envFile = path.join(root, '.env')
if (fs.existsSync(envFile)) {
	for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
		const trimmed = line.trim()
		if (!trimmed || trimmed.startsWith('#')) continue
		const eq = trimmed.indexOf('=')
		if (eq === -1) continue
		const key = trimmed.slice(0, eq).trim()
		let val = trimmed.slice(eq + 1).trim()
		if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
			val = val.slice(1, -1)
		if (key) process.env[key] = val
	}
}

if (!process.env.NPM_TOKEN) {
	console.error('NPM_TOKEN is not set. Add it to .env (gitignored) or export it, then run: pnpm run publish:npm')
	process.exit(1)
}

const r = spawnSync('npm', ['publish', ...process.argv.slice(2)], { cwd: root, stdio: 'inherit', shell: true, env: process.env })
process.exit(r.status ?? 1)
