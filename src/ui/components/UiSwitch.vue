<script setup lang="ts">
import type { UiSize } from '../types'

const props = withDefaults(
	defineProps<{
		modelValue?: boolean
		disabled?: boolean
		loading?: boolean
		size?: Extract<UiSize, 'sm' | 'md'>
	}>(),
	{
		modelValue: false,
		disabled: false,
		loading: false,
		size: 'md',
	},
)

const emit = defineEmits<{
	'update:modelValue': [value: boolean]
	change: [value: boolean]
}>()

function toggle(): void {
	if (props.disabled || props.loading) return
	const next = !props.modelValue
	emit('update:modelValue', next)
	emit('change', next)
}
</script>

<template>
	<button
		type="button"
		class="ui-switch"
		:class="[
			`ui-switch--${size}`,
			{
				'ui-switch--checked': modelValue,
				'ui-switch--disabled': disabled,
				'ui-switch--loading': loading,
			},
		]"
		role="switch"
		:aria-checked="modelValue"
		:aria-disabled="disabled || loading"
		:disabled="disabled || loading"
		@click="toggle"
	>
		<span class="ui-switch__inner">
			<slot v-if="modelValue" name="checked" />
			<slot v-else name="unchecked" />
		</span>
		<span class="ui-switch__handle">
			<span v-if="loading" class="ui-switch__spinner" />
		</span>
	</button>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-switch {
	position: relative;
	display: inline-flex;
	align-items: center;
	flex-shrink: 0;
	min-width: 44px;
	height: 22px;
	padding: 0;
	border: none;
	border-radius: $radius-full;
	background: var(--color-border);
	cursor: pointer;
	box-sizing: border-box;
	transition: background $duration-normal $easing-default;

	&:hover:not(:disabled):not(.ui-switch--checked) {
		background: color-mix(in srgb, var(--color-border) 80%, var(--color-text) 20%);
	}

	&--checked {
		background: var(--color-primary);

		&:hover:not(:disabled) {
			background: var(--color-primary-hover);
		}
	}

	&--disabled,
	&--loading {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-primary) 25%, transparent);
	}

	&--sm {
		min-width: 28px;
		height: 16px;

		.ui-switch__handle {
			top: 2px;
			left: 2px;
			width: 12px;
			height: 12px;
		}

		.ui-switch__inner {
			padding-inline: 18px 4px;
			font-size: 10px;
			line-height: 16px;
		}

		&.ui-switch--checked .ui-switch__inner {
			padding-inline: 4px 18px;
		}

		&.ui-switch--checked .ui-switch__handle {
			left: calc(100% - 14px);
		}

		.ui-switch__spinner {
			width: 8px;
			height: 8px;
			border-width: 1.5px;
		}
	}

	&--md {
		.ui-switch__handle {
			top: 2px;
			left: 2px;
			width: 18px;
			height: 18px;
		}

		.ui-switch__inner {
			padding-inline: 24px 6px;
			font-size: $text-xs;
			line-height: 22px;
		}

		&.ui-switch--checked .ui-switch__inner {
			padding-inline: 6px 24px;
		}

		&.ui-switch--checked .ui-switch__handle {
			left: calc(100% - 20px);
		}

		.ui-switch__spinner {
			width: 12px;
			height: 12px;
		}
	}

	&__inner {
		display: block;
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: $radius-full;
		color: $color-white;
		font-weight: 500;
		text-align: center;
		white-space: nowrap;
		transition: padding $duration-normal $easing-default;
		user-select: none;
	}

	&__handle {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: $radius-full;
		background: $color-white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		transition: left $duration-normal $easing-default;
		pointer-events: none;
	}

	&__spinner {
		flex-shrink: 0;
		border: 2px solid var(--color-primary);
		border-right-color: transparent;
		border-radius: $radius-full;
		animation: ui-switch-spin 0.6s linear infinite;
	}
}

@keyframes ui-switch-spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
