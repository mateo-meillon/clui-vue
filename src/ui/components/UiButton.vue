<script setup lang="ts">
import { Comment, Fragment, Text, computed, onBeforeUpdate, onUpdated, ref, useSlots, type Slots, type VNode } from 'vue'
import { useDefaults } from '../config'
import type { IconName, UiSize, UiVariant } from '../types'
import UiSpinner from './UiSpinner.vue'

const props = withDefaults(
	defineProps<{
		variant?: UiVariant
		size?: UiSize
		disabled?: boolean
		block?: boolean
		rounded?: boolean
		icon?: IconName
		/** Icon size override; defaults to the per-size icon size. */
		iconSize?: number | string
		/** Extra class applied to the rendered icon (e.g. for animation). */
		iconClass?: string
		/** Text label, rendered when no default slot content is provided. */
		label?: string
		align?: 'start' | 'center' | 'end'
		/** `stack` lays icon above label (card-style); `inline` is the default row. */
		layout?: 'inline' | 'stack'
		/** Stretch to fill the container height (card grids). */
		fill?: boolean
		/** Allow the label to wrap and the button to grow vertically. */
		multiline?: boolean
		/** Make the label a flexible, clipping region (title + trailing content rows). */
		fluidLabel?: boolean
		/** Text tone for ghost/secondary triggers. */
		tone?: 'default' | 'muted'
		/** Left gutter in px (nav tree / footer alignment). */
		indent?: number
		active?: boolean
		loading?: boolean
		href?: string
		target?: string
		rel?: string
	}>(),
	{
		variant: undefined,
		size: undefined,
		disabled: false,
		block: false,
		rounded: undefined,
		icon: undefined,
		iconSize: undefined,
		iconClass: undefined,
		label: undefined,
		align: 'center',
		layout: 'inline',
		fill: false,
		multiline: false,
		fluidLabel: false,
		tone: 'default',
		indent: undefined,
		active: false,
		loading: false,
		href: undefined,
		target: undefined,
		rel: undefined,
	},
)

defineEmits<{
	click: [event: MouseEvent]
}>()

const config = useDefaults('button', props)
const variant = computed<UiVariant>(() => config.value.variant ?? 'secondary')
const size = computed<UiSize>(() => config.value.size ?? 'md')
const rounded = computed<boolean>(() => config.value.rounded ?? false)

const slots: Slots = useSlots()

function slotHasRenderableContent(): boolean {
	if (!slots.default) {
		return false
	}

	const hasContent = (nodes: VNode[]): boolean =>
		nodes.some((node) => {
			if (node.type === Comment) {
				return false
			}

			if (node.type === Text) {
				return String(node.children ?? '').trim().length > 0
			}

			if (node.type === Fragment && Array.isArray(node.children)) {
				return hasContent(node.children as VNode[])
			}

			return true
		})

	return hasContent(slots.default())
}

const hasDefaultSlotContent = ref(slotHasRenderableContent())

function syncDefaultSlotContent(): void {
	hasDefaultSlotContent.value = slotHasRenderableContent()
}

onBeforeUpdate(syncDefaultSlotContent)
onUpdated(syncDefaultSlotContent)

const hasLabelText = computed<boolean>(() => hasDefaultSlotContent.value || !!props.label)
const iconOnly = computed<boolean>(() => !!props.icon && !hasLabelText.value)
const withIconLabel = computed<boolean>(() => !!props.icon && hasLabelText.value)
const stackedLabel = computed<boolean>(() => props.layout === 'stack' || props.multiline)

const resolvedIconSize = computed<number | string>(() => props.iconSize ?? 18)
const spinnerSize = computed(() => (size.value === 'sm' ? 14 : size.value === 'lg' ? 20 : 18))

const useAnchor = computed(() => !!(props.href && !props.disabled && !props.loading))

const anchorRel = computed(() => {
	if (!useAnchor.value) return undefined
	if (props.rel !== undefined) return props.rel || undefined
	if (props.target === '_blank') return 'noopener noreferrer'
	return undefined
})

const inlineStyle = computed(() => {
	const style: Record<string, string> = {}
	if (props.indent !== undefined) {
		style.paddingLeft = `${props.indent}px`
	}
	return style
})
</script>

<template>
	<component
		:is="useAnchor ? 'a' : 'button'"
		v-wave
		class="ui-button"
		:class="[
			`ui-button--${variant}`,
			`ui-button--${size}`,
			{
				'ui-button--block': block,
				'ui-button--rounded': rounded,
				'ui-button--icon-only': iconOnly,
				'ui-button--with-icon-label': withIconLabel,
				'ui-button--align-start': align === 'start',
				'ui-button--align-end': align === 'end',
				'ui-button--stack': layout === 'stack',
				'ui-button--fill': fill,
				'ui-button--multiline': multiline,
				'ui-button--fluid-label': fluidLabel,
				'ui-button--muted': tone === 'muted',
				'ui-button--active': active,
			},
		]"
		:style="inlineStyle"
		:href="useAnchor ? href : undefined"
		:target="useAnchor ? target : undefined"
		:rel="useAnchor ? anchorRel : undefined"
		:disabled="useAnchor ? undefined : disabled || loading"
		@click="$emit('click', $event)"
	>
		<UiSpinner v-if="loading" class="ui-button__spinner" :size="spinnerSize" decorative />
		<UiIcon v-else-if="icon" :name="icon" :size="resolvedIconSize" :class="iconClass" />
		<span v-if="withIconLabel" class="ui-button__label" :class="{ 'ui-button__label--stack': stackedLabel }"><slot :active="active">{{ label }}</slot></span>
		<slot v-else :active="active">{{ label }}</slot>
	</component>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: $space-2;
	font-family: inherit;
	font-weight: 500;
	border: none;
	outline: none;
	cursor: pointer;
	text-decoration: none;
	box-sizing: border-box;
	transition:
		background-color $duration-normal $easing-default,
		color $duration-normal $easing-default,
		box-shadow $duration-normal $easing-default;
	white-space: nowrap;
	padding-inline: var(--ui-button-padding-inline, initial);
	padding-block: var(--ui-button-padding-block, initial);

	&:disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	// ── Sizes ──────────────────────────────────────────────────────────────
	&--sm {
		font-size: $text-xs;
		padding: $space-1 $space-3;
		border-radius: $radius-sm;
		height: 28px;
	}

	&--md {
		font-size: $text-sm;
		padding: $space-2 $space-4;
		border-radius: $radius-md;
		height: 36px;
	}

	&--lg {
		font-size: $text-md;
		padding: $space-3 $space-6;
		border-radius: $radius-md;
		height: 44px;
	}

	&--auto {
		font-size: $text-sm;
		padding: $space-2 $space-3;
		border-radius: $radius-md;
		height: auto;
	}

	// ── Variants ───────────────────────────────────────────────────────────
	&--primary {
		background-color: var(--color-primary);
		color: $color-white;

		&:hover {
			background-color: var(--color-primary-hover);
		}

		&:active {
			background-color: var(--color-primary-active);
		}
	}

	&--secondary {
		background-color: var(--color-btn-secondary-bg);
		color: var(--color-btn-secondary-text);

		&:hover {
			background-color: var(--color-btn-secondary-bg-hover);
		}

		&:active {
			background-color: var(--color-btn-secondary-bg-active);
		}
	}

	&--ghost {
		background-color: transparent;
		color: var(--color-btn-ghost-text);

		&:hover {
			background-color: var(--color-btn-secondary-bg);
		}

		&:active {
			background-color: var(--color-btn-ghost-bg-active);
		}
	}

	&--danger {
		background-color: var(--color-btn-danger-bg);
		color: var(--color-btn-danger-text);

		&:hover {
			background-color: var(--color-btn-danger-bg-hover);
		}

		&:active {
			background-color: var(--color-btn-danger-bg-active);
		}
	}

	// ── Modifiers ──────────────────────────────────────────────────────────
	&--block {
		width: 100%;
	}

	&--rounded {
		border-radius: $radius-full;
	}

	&--align-start {
		justify-content: flex-start;
	}

	&--align-end {
		justify-content: flex-end;
	}

	&--muted {
		color: var(--color-text-secondary);
	}

	&--stack {
		flex-direction: column;
		align-items: stretch;
		white-space: normal;
		height: auto;
	}

	&--fill {
		height: 100%;
	}

	&--multiline {
		white-space: normal;
		height: auto;
		min-height: 36px;
	}

	&--fluid-label &__label {
		flex: 1;
		min-width: 0;
		overflow: hidden;
	}

	&--active {
		color: var(--color-primary);
		background-color: color-mix(in srgb, var(--color-primary) 12%, transparent);
		--ui-button-content-color: currentColor;

		&:hover {
			color: var(--color-primary-hover);
			background-color: color-mix(in srgb, var(--color-primary) 16%, transparent);
		}

		&:active {
			color: var(--color-primary-active);
			background-color: color-mix(in srgb, var(--color-primary) 20%, transparent);
		}

		:deep(.ui-icon) {
			color: currentColor;
		}
	}

	&--icon-only {
		padding: 0;
		aspect-ratio: 1;

		&.ui-button--sm {
			width: 28px;
		}
		&.ui-button--md {
			width: 36px;
		}
		&.ui-button--lg {
			width: 44px;
		}
		&.ui-button--auto {
			width: 36px;
		}
	}

	&--with-icon-label {
		:deep(.ui-icon) {
			flex-shrink: 0;
		}

		&.ui-button--rounded.ui-button--md {
			padding-inline: $space-3;
		}
	}

	&__label {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
		min-width: 0;
	}

	&__label--stack {
		flex-direction: column;
		gap: 2px;
		height: auto;
		line-height: 1.25;
		white-space: normal;
	}

	&--sm &__label {
		height: 18px;
	}

	&--md &__label {
		height: 18px;
	}

	&--lg &__label {
		height: 20px;
	}

	&--auto &__label {
		min-height: 18px;
		height: auto;
	}

	&--sm &__label--stack,
	&--md &__label--stack,
	&--lg &__label--stack {
		height: auto;
	}

	&__spinner {
		opacity: 0.6;
	}
}
</style>
