<script setup lang="ts">
import { computed } from 'vue'
import type { IconName, UiSize } from '../types'

const props = withDefaults(
	defineProps<{
		modelValue?: string
		type?: 'text' | 'password' | 'email' | 'number' | 'url'
		placeholder?: string
		size?: UiSize
		disabled?: boolean
		icon?: IconName
		clearable?: boolean
		/** Accessible label for the clear button. */
		clearAriaLabel?: string
	}>(),
	{
		modelValue: '',
		type: 'text',
		placeholder: undefined,
		size: 'md',
		disabled: false,
		icon: undefined,
		clearable: false,
		clearAriaLabel: 'Clear',
	},
)

const emit = defineEmits<{
	'update:modelValue': [value: string]
	clear: []
}>()

const showClear = computed(() => props.clearable && !props.disabled && !!props.modelValue)

function onInput(ev: Event): void {
	emit('update:modelValue', (ev.target as HTMLInputElement).value)
}

function onClear(): void {
	if (!showClear.value) return
	emit('update:modelValue', '')
	emit('clear')
}
</script>

<template>
	<div class="ui-input" :class="[`ui-input--${size}`, { 'ui-input--has-icon': !!icon, 'ui-input--has-clear': showClear }]">
		<UiIcon v-if="icon" class="ui-input__icon" :name="icon" :size="18" />
		<input class="ui-input__control" :type="type" :value="modelValue" :placeholder="placeholder" :disabled="disabled" @input="onInput" />
		<button v-if="showClear" class="ui-input__clear" type="button" :aria-label="clearAriaLabel" @click="onClear">
			<UiIcon name="close" :size="16" />
		</button>
	</div>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-input {
	width: 100%;
	font-family: $font-sans;
	background: var(--color-input-bg);
	color: var(--color-input-text);
	border: 1px solid var(--color-input-border);
	outline: none;
	display: flex;
	align-items: center;
	gap: $space-2;
	transition:
		border-color $duration-fast $easing-default,
		box-shadow $duration-fast $easing-default;
	box-shadow: 0 0 0 0 transparent;

	&:focus-within {
		border-color: var(--color-input-border-focus);
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&--has-icon .ui-input__control {
		padding-left: 0;
	}

	&--has-clear .ui-input__control {
		padding-right: 0;
	}

	&--sm {
		font-size: $text-xs;
		border-radius: $radius-sm;
		height: 28px;
	}

	&--md {
		font-size: $text-sm;
		border-radius: $radius-md;
		height: 36px;
	}

	&--lg {
		font-size: $text-md;
		border-radius: $radius-md;
		height: 44px;
	}
}

.ui-input__icon {
	margin-left: $space-2;
	color: var(--color-input-placeholder);
}

.ui-input__control {
	flex: 1;
	min-width: 0;
	border: none;
	outline: none;
	background: transparent;
	color: inherit;
	font: inherit;
	padding: 0;

	&::placeholder {
		color: var(--color-input-placeholder);
	}

	&:disabled {
		cursor: not-allowed;
	}
}

.ui-input--sm .ui-input__control {
	padding: 0 $space-2;
}

.ui-input--md .ui-input__control {
	padding: 0 $space-3;
}

.ui-input--lg .ui-input__control {
	padding: 0 $space-4;
}

.ui-input--has-icon.ui-input--sm .ui-input__control,
.ui-input--has-icon.ui-input--md .ui-input__control,
.ui-input--has-icon.ui-input--lg .ui-input__control {
	padding-left: 0;
}

.ui-input__clear {
	margin-right: $space-1;
	border: none;
	background: transparent;
	color: var(--color-input-placeholder);
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 28px;
	height: 28px;
	border-radius: $radius-sm;
	cursor: pointer;

	&:hover {
		background: color-mix(in srgb, var(--color-text) 8%, transparent);
	}
}
</style>
