<script setup lang="ts">
withDefaults(
	defineProps<{
		/** Row cell vertical padding */
		density?: 'compact' | 'comfortable'
	}>(),
	{ density: 'comfortable' },
)
</script>

<template>
	<div class="ui-table-wrap">
		<table class="ui-table" :class="[`ui-table--density-${density}`]" role="table">
			<slot />
		</table>
	</div>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-table-wrap {
	width: 100%;
	overflow-x: auto;
	-webkit-overflow-scrolling: touch;
}

.ui-table {
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
	font-family: inherit;
	font-size: $text-sm;
	line-height: 1.4;
	color: var(--color-text-primary);
	background: transparent;
}

.ui-table :deep(thead th) {
	text-align: left;
	font-weight: 600;
	color: var(--color-text-secondary);
	letter-spacing: 0.02em;
	border-bottom: 1px solid var(--color-border);
	white-space: nowrap;
}

.ui-table :deep(tbody td) {
	border-bottom: 1px solid color-mix(in srgb, var(--color-border) 85%, transparent);
	vertical-align: middle;
	color: var(--color-text-primary);
}

.ui-table :deep(tr:last-child td) {
	border-bottom: none;
}

.ui-table--density-comfortable :deep(thead th),
.ui-table--density-comfortable :deep(tbody td) {
	padding: $space-3 $space-4;
}

.ui-table--density-compact :deep(thead th),
.ui-table--density-compact :deep(tbody td) {
	padding: $space-2 $space-3;
}
</style>
