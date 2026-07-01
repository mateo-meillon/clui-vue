import type { App } from 'vue'
import {
	UiBreadcrumbs,
	UiButton,
	UiButtonGroup,
	UiCard,
	UiCheckbox,
	UiDropdown,
	UiFormField,
	UiIcon,
	UiInput,
	UiMenu,
	UiMenuItem,
	UiModal,
	UiRadio,
	UiRouteProgress,
	UiSelect,
	UiSkeleton,
	UiSpinner,
	UiSwitch,
	UiToastHost,
	UiTable,
	UiTabs,
	UiTextarea,
	UiTooltip,
	UiTree,
} from './components'
import { CLUI_CONFIG, type CluiConfig } from './config'

export * from './components'
export type * from './types'
export { CLUI_CONFIG, createCluiConfig, provideCluiConfig, useDefaults } from './config'
export type { CluiConfig, CluiDefaults } from './config'
export { dismissToast, showToast, toastDanger, toastSuccess, toastWarning, useToast } from './useToast'
export type { ShowToastOptions, UiToast, UiToastTone } from './useToast'

const components = {
	UiBreadcrumbs,
	UiButton,
	UiButtonGroup,
	UiCard,
	UiCheckbox,
	UiDropdown,
	UiFormField,
	UiIcon,
	UiInput,
	UiMenu,
	UiMenuItem,
	UiModal,
	UiRadio,
	UiRouteProgress,
	UiSelect,
	UiSkeleton,
	UiSpinner,
	UiSwitch,
	UiToastHost,
	UiTable,
	UiTabs,
	UiTextarea,
	UiTooltip,
	UiTree,
} as Record<string, ReturnType<typeof import('vue').defineComponent>>

export default {
	install(app: App, config: CluiConfig = {}) {
		app.provide(CLUI_CONFIG, config)
		for (const [name, component] of Object.entries(components)) {
			app.component(name, component)
		}
	},
}
