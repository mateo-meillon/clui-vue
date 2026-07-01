<script setup lang="ts">
import { computed } from 'vue'
import { useDefaults } from '../config'
import type { UiSize } from '../types'

const props = withDefaults(
	defineProps<{
		modelValue?: boolean
		indeterminate?: boolean
		disabled?: boolean
		size?: Extract<UiSize, 'sm' | 'md' | 'lg'>
		label?: string
		description?: string
		ariaLabel?: string
	}>(),
	{
		modelValue: false,
		indeterminate: false,
		disabled: false,
		size: undefined,
		label: undefined,
		description: undefined,
		ariaLabel: undefined,
	},
)

const emit = defineEmits<{
	'update:modelValue': [value: boolean]
	change: [value: boolean]
}>()

const config = useDefaults('checkbox', props)
const size = computed<Extract<UiSize, 'sm' | 'md' | 'lg'>>(() => config.value.size ?? 'md')

function onChange(event: Event): void {
	const checked = (event.target as HTMLInputElement).checked
	emit('update:modelValue', checked)
	emit('change', checked)
}
</script>

<template>
	<label class="ui-checkbox" :class="[`ui-checkbox--${size}`, { 'ui-checkbox--disabled': disabled, 'ui-checkbox--checked': modelValue, 'ui-checkbox--mixed': indeterminate }]">
		<span class="ui-checkbox__control">
			<input
				class="ui-checkbox__input"
				type="checkbox"
				:checked="modelValue"
				:disabled="disabled"
				:indeterminate.prop="indeterminate"
				:aria-checked="indeterminate ? 'mixed' : modelValue"
				:aria-label="ariaLabel"
				@change="onChange"
			/>
			<span class="ui-checkbox__box" aria-hidden="true">
				<UiIcon v-if="modelValue && !indeterminate" name="done" :size="14" />
				<span v-else-if="indeterminate" class="ui-checkbox__dash" />
			</span>
		</span>
		<span v-if="label || description || $slots.default" class="ui-checkbox__text">
			<span class="ui-checkbox__label"><slot>{{ label }}</slot></span>
			<span v-if="description" class="ui-checkbox__description">{{ description }}</span>
		</span>
	</label>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-checkbox {
	display: inline-flex;
	align-items: flex-start;
	gap: $space-2;
	width: fit-content;
	color: var(--color-text-primary);
	font-family: $font-sans;
	cursor: pointer;
	user-select: none;
}

.ui-checkbox--disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

.ui-checkbox__control {
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.ui-checkbox__input {
	position: absolute;
	inset: 0;
	margin: 0;
	opacity: 0;
	cursor: inherit;
}

.ui-checkbox__box {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border: 1.5px solid var(--color-border);
	border-radius: $radius-sm;
	background: var(--color-bg-surface);
	color: $color-white;
	box-sizing: border-box;
	transition:
		background-color $duration-fast $easing-default,
		border-color $duration-fast $easing-default,
		box-shadow $duration-fast $easing-default;
}

.ui-checkbox:hover:not(.ui-checkbox--disabled) .ui-checkbox__box {
	border-color: var(--color-primary);
}

.ui-checkbox__input:focus-visible + .ui-checkbox__box {
	box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 18%, transparent);
}

.ui-checkbox--checked .ui-checkbox__box,
.ui-checkbox--mixed .ui-checkbox__box {
	border-color: var(--color-primary);
	background: var(--color-primary);
}

.ui-checkbox__dash {
	width: 8px;
	height: 2px;
	border-radius: $radius-full;
	background: currentColor;
}

.ui-checkbox__text {
	display: flex;
	flex-direction: column;
	gap: 2px;
	min-width: 0;
}

.ui-checkbox__label {
	font-size: $text-sm;
	font-weight: 500;
	line-height: 1.25;
	color: var(--color-text-primary);
}

.ui-checkbox__description {
	font-size: $text-xs;
	line-height: 1.35;
	color: var(--color-text-secondary);
}

.ui-checkbox--sm {
	.ui-checkbox__control,
	.ui-checkbox__box {
		width: 14px;
		height: 14px;
	}

	.ui-checkbox__label {
		font-size: $text-xs;
	}
}

.ui-checkbox--md {
	.ui-checkbox__control,
	.ui-checkbox__box {
		width: 16px;
		height: 16px;
	}
}

.ui-checkbox--lg {
	.ui-checkbox__control,
	.ui-checkbox__box {
		width: 18px;
		height: 18px;
	}

	.ui-checkbox__label {
		font-size: $text-md;
	}
}
</style>
