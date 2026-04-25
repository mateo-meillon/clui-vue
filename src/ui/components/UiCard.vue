<script setup lang="ts">
withDefaults(
	defineProps<{
		/** Inner padding; default matches dense forms (auth, settings). */
		padding?: 'none' | 'sm' | 'md' | 'lg'
	}>(),
	{
		padding: 'lg',
	},
)
</script>

<template>
	<div class="ui-card" :class="[`ui-card--padding-${padding}`]">
		<slot />
	</div>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-card {
	width: 100%;
	background: var(--color-bg-surface);
	border: 1px solid var(--color-border);
	border-radius: $radius-lg;

	&--padding-none {
		padding: 0;
	}

	&--padding-sm {
		padding: $space-4;
	}

	&--padding-md {
		padding: $space-5;
	}

	&--padding-lg {
		padding: $space-6;
	}
}
</style>
