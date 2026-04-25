import { ref, watch } from 'vue'

export type Theme = 'light' | 'light-soft' | 'light-contrast' | 'light-teal' | 'dark' | 'dark-soft' | 'dark-contrast' | 'dark-teal'

const STORAGE_KEY = 'app-theme'

const theme = ref<Theme>(loadTheme())

function isTheme(value: string | null): value is Theme {
	return (
		value === 'light' ||
		value === 'light-soft' ||
		value === 'light-contrast' ||
		value === 'light-teal' ||
		value === 'dark' ||
		value === 'dark-soft' ||
		value === 'dark-contrast' ||
		value === 'dark-teal'
	)
}

export function isDarkTheme(t: Theme): boolean {
	return t === 'dark' || t.startsWith('dark-')
}

function loadTheme(): Theme {
	const stored = localStorage.getItem(STORAGE_KEY)
	if (isTheme(stored)) return stored
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(t: Theme): void {
	document.documentElement.setAttribute('data-theme', t)
	localStorage.setItem(STORAGE_KEY, t)
}

applyTheme(theme.value)

watch(theme, applyTheme)

export function useTheme(): { theme: typeof theme; toggleTheme: () => void } {
	function toggleTheme(): void {
		const t = theme.value
		if (isDarkTheme(t)) {
			theme.value = t === 'dark' ? 'light' : (`light${t.slice('dark'.length)}` as Theme)
		} else {
			theme.value = t === 'light' ? 'dark' : (`dark${t.slice('light'.length)}` as Theme)
		}
	}

	return { theme, toggleTheme }
}
