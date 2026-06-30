import { computed, inject, provide, type ComputedRef, type InjectionKey } from 'vue'
import type { UiInputVariant, UiSize, UiVariant } from './types'

/**
 * Library-wide default props, set once via the plugin install
 * (`app.use(CluiVue, { defaults: { … } })`) or `provideCluiConfig()`.
 *
 * Resolution order for any configurable prop is:
 *   explicit prop  >  injected config default  >  component built-in default
 */
export interface CluiDefaults {
	button?: {
		rounded?: boolean
		size?: UiSize
		variant?: UiVariant
	}
	input?: {
		size?: UiSize
		variant?: UiInputVariant
	}
	textarea?: {
		size?: UiSize
		variant?: UiInputVariant | 'bare'
	}
	select?: {
		size?: UiSize
	}
	modal?: {
		size?: 'sm' | 'md' | 'lg' | 'full'
	}
	switch?: {
		size?: Extract<UiSize, 'sm' | 'md'>
	}
	radio?: {
		size?: Extract<UiSize, 'sm' | 'md' | 'lg'>
	}
	table?: {
		density?: 'compact' | 'comfortable'
	}
	card?: {
		padding?: 'none' | 'sm' | 'md' | 'lg'
	}
}

export interface CluiConfig {
	defaults?: CluiDefaults
}

export const CLUI_CONFIG: InjectionKey<CluiConfig> = Symbol('clui-config')

/** Identity helper for typed config in `main.ts`. */
export function createCluiConfig(config: CluiConfig): CluiConfig {
	return config
}

/** Provide config to a subtree without the global plugin (e.g. app-scoped overrides). */
export function provideCluiConfig(config: CluiConfig): void {
	provide(CLUI_CONFIG, config)
}

/**
 * Resolve a component's effective props by layering injected library defaults
 * underneath the explicitly-passed props. Any prop the consumer left
 * `undefined` falls back to the injected default for that component, then to
 * the component's own built-in default (handled by the caller's `?? fallback`).
 *
 * ponytail: one tiny shared resolver instead of per-component plumbing.
 */
export function useDefaults<K extends keyof CluiDefaults, P extends object>(component: K, props: P): ComputedRef<P & NonNullable<CluiDefaults[K]>> {
	const config = inject(CLUI_CONFIG, undefined)

	return computed(() => {
		const componentDefaults = (config?.defaults?.[component] ?? {}) as NonNullable<CluiDefaults[K]>
		const merged = { ...componentDefaults } as P & NonNullable<CluiDefaults[K]>

		for (const key of Object.keys(props) as (keyof P)[]) {
			const value = props[key]
			if (value !== undefined) {
				;(merged as Record<string, unknown>)[key as string] = value
			}
		}

		return merged
	})
}
