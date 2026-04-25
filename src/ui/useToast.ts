import { ref } from 'vue'
import type { IconName } from './icons'

export type UiToastTone = 'default' | 'success' | 'warning' | 'danger'

export interface UiToast {
	id: number
	message: string
	title?: string
	tone: UiToastTone
	icon?: IconName
	dismissible: boolean
	durationMs: number
}

export interface ShowToastOptions {
	title?: string
	tone?: UiToastTone
	/** Pass `0` to keep the toast until dismissed. Default: 5000 */
	durationMs?: number
	dismissible?: boolean
}

const toasts = ref<UiToast[]>([])

let seq = 0
const timers = new Map<number, ReturnType<typeof setTimeout>>()

function clearTimer(id: number): void {
	const handle = timers.get(id)
	if (handle !== undefined) {
		clearTimeout(handle)
		timers.delete(id)
	}
}

export function dismissToast(id: number): void {
	clearTimer(id)
	toasts.value = toasts.value.filter((t) => t.id !== id)
}

function iconForTone(tone: UiToastTone): IconName | undefined {
	if (tone === 'success') return 'checkCircle'
	if (tone === 'danger') return 'error'
	if (tone === 'warning') return 'report'
	return undefined
}

export function showToast(message: string, options?: ShowToastOptions): number {
	const id = ++seq
	const tone = options?.tone ?? 'default'
	const dismissible = options?.dismissible ?? true
	const durationMs = options?.durationMs ?? 5000

	toasts.value = [
		...toasts.value,
		{
			id,
			message,
			title: options?.title,
			tone,
			icon: iconForTone(tone),
			dismissible,
			durationMs,
		},
	]

	if (durationMs > 0) {
		timers.set(
			id,
			setTimeout(() => {
				dismissToast(id)
			}, durationMs),
		)
	}

	return id
}

export function toastSuccess(message: string, options?: Omit<ShowToastOptions, 'tone'>): number {
	return showToast(message, { ...options, tone: 'success' })
}

export function toastWarning(message: string, options?: Omit<ShowToastOptions, 'tone'>): number {
	return showToast(message, { ...options, tone: 'warning' })
}

export function toastDanger(message: string, options?: Omit<ShowToastOptions, 'tone'>): number {
	return showToast(message, { ...options, tone: 'danger' })
}

export function useToast(): {
	toasts: typeof toasts
	showToast: typeof showToast
	dismissToast: typeof dismissToast
	success: typeof toastSuccess
	warning: typeof toastWarning
	danger: typeof toastDanger
} {
	return {
		toasts,
		showToast,
		dismissToast,
		success: toastSuccess,
		warning: toastWarning,
		danger: toastDanger,
	}
}
