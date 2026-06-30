<script setup lang="ts">
defineProps<{
	/** Accessible name for the menu. */
	ariaLabel?: string
}>()
</script>

<template>
	<div class="ui-menu" role="menu" aria-orientation="vertical" :aria-label="ariaLabel">
		<slot />
	</div>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-menu {
	display: flex;
	flex-direction: column;
	gap: $space-1;
	width: 100%;
}
</style>
