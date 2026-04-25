<script setup lang="ts">
import type { UiSize } from '../types'

withDefaults(
	defineProps<{
		checked: boolean
		disabled?: boolean
		size?: Extract<UiSize, 'sm' | 'md' | 'lg'>
	}>(),
	{
		disabled: false,
		size: 'md',
	},
)
</script>

<template>
	<span
		class="ui-radio"
		:class="[
			`ui-radio--${size}`,
			{
				'ui-radio--checked': checked,
				'ui-radio--disabled': disabled,
			},
		]"
		role="radio"
		:aria-checked="checked"
		:aria-disabled="disabled"
	/>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-radio {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: $radius-full;
	border: 2px solid var(--color-border);
	flex-shrink: 0;
	background: transparent;
	transition:
		border-color $duration-fast $easing-default,
		background $duration-fast $easing-default,
		box-shadow $duration-fast $easing-default;

	&--sm {
		width: 12px;
		height: 12px;
	}

	&--md {
		width: 14px;
		height: 14px;
	}

	&--lg {
		width: 16px;
		height: 16px;
	}

	&--checked {
		border-color: var(--color-primary);
		background: var(--color-primary);
		box-shadow: inset 0 0 0 3px var(--color-bg-surface);
	}

	&--disabled {
		opacity: 0.5;
	}
}
</style>
