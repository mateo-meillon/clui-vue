<script setup lang="ts">
import type { UiInputVariant, UiSize } from '../types'

const props = withDefaults(
	defineProps<{
		modelValue?: string
		placeholder?: string
		rows?: number
		size?: UiSize
		variant?: UiInputVariant
		disabled?: boolean
	}>(),
	{
		modelValue: '',
		placeholder: undefined,
		rows: 4,
		size: 'md',
		variant: 'default',
		disabled: false,
	},
)

const emit = defineEmits<{
	'update:modelValue': [value: string]
}>()

function onInput(ev: Event): void {
	emit('update:modelValue', (ev.target as HTMLTextAreaElement).value)
}
</script>

<template>
	<textarea
		class="ui-textarea"
		:class="[`ui-textarea--${size}`, `ui-textarea--${variant}`]"
		:value="modelValue"
		:placeholder="placeholder"
		:rows="rows"
		:disabled="disabled"
		@input="onInput"
	/>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-textarea {
	width: 100%;
	min-height: 5rem;
	font-family: $font-sans;
	background: var(--color-input-bg);
	color: var(--color-input-text);
	border: 1px solid var(--color-input-border);
	outline: none;
	resize: vertical;
	transition:
		background-color $duration-fast $easing-default,
		border-color $duration-fast $easing-default,
		box-shadow $duration-fast $easing-default;
	box-shadow: 0 0 0 0 transparent;

	&:focus {
		border-color: var(--color-input-border-focus);
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&::placeholder {
		color: var(--color-input-placeholder);
	}

	&--sm {
		font-size: $text-xs;
		border-radius: $radius-sm;
		padding: $space-2;
	}

	&--md {
		font-size: $text-sm;
		border-radius: $radius-md;
		padding: $space-3;
	}

	&--lg {
		font-size: $text-md;
		border-radius: $radius-md;
		padding: $space-4;
	}

	&--ghost {
		background: var(--color-input-ghost-bg);
		border-color: var(--color-input-ghost-border);

		&:hover:not(:focus) {
			background: var(--color-input-ghost-bg-hover);
		}

		&:focus {
			border-color: var(--color-input-border-focus);
			box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
		}
	}
}
</style>
