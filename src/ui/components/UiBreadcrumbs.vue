<script setup lang="ts">
import { computed } from 'vue'
import type { IconName, UiBreadcrumbItem } from '../types'

const props = withDefaults(
	defineProps<{
		items: UiBreadcrumbItem[]
		separatorIcon?: IconName
		/** Collapse to an ellipsis when more than this many items are present. */
		maxVisible?: number
		/** Accessible label for the ellipsis (collapsed) control. */
		collapseAriaLabel?: string
	}>(),
	{
		separatorIcon: 'chevron_right',
		maxVisible: undefined,
		collapseAriaLabel: 'Show hidden breadcrumbs',
	},
)

const emit = defineEmits<{
	select: [item: UiBreadcrumbItem]
	expandCollapsed: []
}>()

interface Segment {
	type: 'item' | 'ellipsis'
	item?: UiBreadcrumbItem
}

const segments = computed<Segment[]>(() => {
	const items = props.items
	const max = props.maxVisible

	if (!max || items.length <= max || items.length <= 2) {
		return items.map((item) => ({ type: 'item', item }))
	}

	// Always keep the first item and the trailing (max - 1) items; collapse the middle.
	const trailingCount = Math.max(1, max - 1)
	const first = items[0]
	const trailing = items.slice(items.length - trailingCount)

	return [{ type: 'item', item: first }, { type: 'ellipsis' }, ...trailing.map((item) => ({ type: 'item' as const, item }))]
})

function isLast(index: number): boolean {
	return index === segments.value.length - 1
}
</script>

<template>
	<nav class="ui-breadcrumbs" aria-label="Breadcrumb">
		<ol class="ui-breadcrumbs__list">
			<li v-for="(segment, index) in segments" :key="segment.item?.id ?? `ellipsis-${index}`" class="ui-breadcrumbs__item">
				<UiButton
					v-if="segment.type === 'item' && segment.item"
					variant="ghost"
					size="sm"
					:icon="segment.item.icon"
					:active="isLast(index)"
					:aria-current="isLast(index) ? 'page' : undefined"
					@click="emit('select', segment.item)"
				>
					{{ segment.item.label }}
				</UiButton>
				<UiButton v-else variant="ghost" size="sm" icon="more_horiz" :aria-label="collapseAriaLabel" @click="emit('expandCollapsed')" />

				<UiIcon v-if="!isLast(index)" class="ui-breadcrumbs__sep" :name="separatorIcon" :size="14" aria-hidden="true" />
			</li>
		</ol>
	</nav>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-breadcrumbs__list {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: $space-1;
	margin: 0;
	padding: 0;
	list-style: none;
}

.ui-breadcrumbs__item {
	display: inline-flex;
	align-items: center;
	gap: $space-1;
	min-width: 0;
}

.ui-breadcrumbs__sep {
	color: var(--color-text-secondary);
	flex-shrink: 0;
}
</style>
