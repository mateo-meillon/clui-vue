import type { App } from 'vue'
import {
	UiButton,
	UiCard,
	UiDropdown,
	UiFormField,
	UiIcon,
	UiInput,
	UiModal,
	UiRadio,
	UiRouteProgress,
	UiSelect,
	UiSkeleton,
	UiToastHost,
	UiTable,
} from './components'

export * from './components'
export * from './icons'
export type * from './types'
export { dismissToast, showToast, toastDanger, toastSuccess, toastWarning, useToast } from './useToast'
export type { ShowToastOptions, UiToast, UiToastTone } from './useToast'

const components = {
	UiButton,
	UiCard,
	UiDropdown,
	UiFormField,
	UiIcon,
	UiInput,
	UiModal,
	UiRadio,
	UiRouteProgress,
	UiSelect,
	UiSkeleton,
	UiToastHost,
	UiTable,
} as Record<string, ReturnType<typeof import('vue').defineComponent>>

export default {
	install(app: App) {
		for (const [name, component] of Object.entries(components)) {
			app.component(name, component)
		}
	},
}
