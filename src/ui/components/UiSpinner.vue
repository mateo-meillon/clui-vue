<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
	defineProps<{
		size?: number | string
		thickness?: number | string
		label?: string
		decorative?: boolean
	}>(),
	{
		size: 16,
		thickness: 2,
		label: 'Loading',
		decorative: false,
	},
)

function toLength(value: number | string): string {
	return typeof value === 'number' ? `${value}px` : value
}

const spinnerStyle = computed(() => ({
	width: toLength(props.size),
	height: toLength(props.size),
	'--ui-spinner-thickness': toLength(props.thickness),
}))
</script>

<template>
	<span
		class="ui-spinner"
		:style="spinnerStyle"
		:role="decorative ? undefined : 'status'"
		:aria-label="decorative ? undefined : label"
		:aria-hidden="decorative ? 'true' : undefined"
	/>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-spinner {
	display: inline-block;
	flex-shrink: 0;
	border: var(--ui-spinner-thickness) solid color-mix(in srgb, currentColor 25%, transparent);
	border-top-color: currentColor;
	border-radius: $radius-full;
	box-sizing: border-box;
	animation: ui-spinner-spin 0.6s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
	.ui-spinner {
		animation-duration: 1.2s;
	}
}

@keyframes ui-spinner-spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
