<script setup lang="ts">
import { computed, useSlots, type Slots } from 'vue'
import type { IconName, UiSize, UiVariant } from '../types'

const props = withDefaults(
	defineProps<{
		variant?: UiVariant
		size?: UiSize
		disabled?: boolean
		block?: boolean
		rounded?: boolean
		icon?: IconName
		align?: 'start' | 'center' | 'end'
		active?: boolean
		loading?: boolean
		href?: string
		target?: string
		rel?: string
	}>(),
	{
		variant: 'secondary',
		size: 'md',
		disabled: false,
		block: false,
		rounded: false,
		icon: undefined,
		align: 'center',
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

const slots: Slots = useSlots()
const iconOnly = computed<boolean>(() => !!props.icon && !slots.default)

const useAnchor = computed(() => !!(props.href && !props.disabled && !props.loading))

const anchorRel = computed(() => {
	if (!useAnchor.value) return undefined
	if (props.rel !== undefined) return props.rel || undefined
	if (props.target === '_blank') return 'noopener noreferrer'
	return undefined
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
				'ui-button--align-start': align === 'start',
				'ui-button--align-end': align === 'end',
				'ui-button--active': active,
			},
		]"
		:href="useAnchor ? href : undefined"
		:target="useAnchor ? target : undefined"
		:rel="useAnchor ? anchorRel : undefined"
		:disabled="useAnchor ? undefined : disabled || loading"
		@click="$emit('click', $event)"
	>
		<span v-if="loading" class="ui-button__spinner" />
		<UiIcon v-else-if="icon" :name="icon" :size="18" />
		<slot />
	</component>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: $space-2;
	font-family: $font-sans;
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
			background-color: var(--color-btn-ghost-bg-hover);
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

	&--active {
		color: var(--color-primary);
		background-color: color-mix(in srgb, var(--color-primary) 12%, transparent);

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

	&__spinner {
		flex-shrink: 0;
		border: 2px solid currentColor;
		border-right-color: transparent;
		border-radius: $radius-full;
		animation: ui-button-spin 0.6s linear infinite;
		opacity: 0.6;
	}

	&--sm &__spinner {
		width: 14px;
		height: 14px;
	}

	&--md &__spinner {
		width: 18px;
		height: 18px;
	}

	&--lg &__spinner {
		width: 20px;
		height: 20px;
	}
}

@keyframes ui-button-spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
