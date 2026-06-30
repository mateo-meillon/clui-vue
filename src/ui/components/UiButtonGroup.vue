<script setup lang="ts">
withDefaults(
	defineProps<{
		/** Gap between buttons (px or CSS length). */
		gap?: number | string
		/** Rounded surface container ("pill" group). */
		pill?: boolean
		/** Segmented look: buttons share edges with no gap. */
		attached?: boolean
	}>(),
	{
		gap: undefined,
		pill: false,
		attached: false,
	},
)

function toLength(value: number | string | undefined): string | undefined {
	if (value === undefined) return undefined
	return typeof value === 'number' ? `${value}px` : value
}
</script>

<template>
	<div class="ui-button-group" :class="{ 'ui-button-group--pill': pill, 'ui-button-group--attached': attached }" :style="{ gap: attached ? '0' : toLength(gap) }" role="group">
		<slot />
	</div>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-button-group {
	display: inline-flex;
	align-items: center;
	gap: $space-1;
	width: max-content;

	&--pill {
		background: var(--color-bg-surface);
		border-radius: $radius-full;
		padding: $space-1;
	}

	&--attached {
		gap: 0;

		:deep(.ui-button) {
			border-radius: 0;
		}

		:deep(.ui-button:first-child) {
			border-top-left-radius: $radius-md;
			border-bottom-left-radius: $radius-md;
		}

		:deep(.ui-button:last-child) {
			border-top-right-radius: $radius-md;
			border-bottom-right-radius: $radius-md;
		}
	}
}
</style>
