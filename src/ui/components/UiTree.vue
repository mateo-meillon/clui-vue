<script setup lang="ts">
import UiTree from './UiTree.vue'
import type { UiTreeNode } from '../types'

const props = withDefaults(
	defineProps<{
		nodes: UiTreeNode[]
		depth?: number
		/** Highlights the active leaf (typically derived from the current route). */
		activeId?: string | null
	}>(),
	{ depth: 0, activeId: null },
)

const expandedKeys = defineModel<string[]>('expandedKeys', { default: () => [] })

const emit = defineEmits<{
	activate: [node: UiTreeNode]
}>()

function isExpanded(id: string): boolean {
	return expandedKeys.value.includes(id)
}

function toggle(id: string): void {
	const next = expandedKeys.value.includes(id) ? expandedKeys.value.filter((k) => k !== id) : [...expandedKeys.value, id]
	expandedKeys.value = next
}

function onRowClick(node: UiTreeNode): void {
	if (node.children?.length) {
		toggle(node.id)
		return
	}
	emit('activate', node)
}

function isActive(node: UiTreeNode): boolean {
	return props.activeId != null && props.activeId === node.id
}

function isActiveOrHasActiveChild(node: UiTreeNode): boolean {
	if (isActive(node)) return true
	if (!node.children?.length) return false
	return node.children.some(isActiveOrHasActiveChild)
}

function isRowActive(node: UiTreeNode): boolean {
	if (node.children?.length && isExpanded(node.id)) {
		return isActive(node)
	}
	return isActiveOrHasActiveChild(node)
}
</script>

<template>
	<div class="ui-tree" :class="{ 'ui-tree--nested': depth > 0 }" :style="depth > 0 ? { '--ui-tree-indent': `${depth * 16}px` } : undefined">
		<div v-for="node in nodes" :key="node.id" class="ui-tree__node">
			<UiButton
				variant="ghost"
				size="md"
				block
				align="start"
				:active="isRowActive(node)"
				:indent="8"
				:class="{ 'ui-tree__row--expanded': !!node.children?.length && isExpanded(node.id) }"
				:style="{
					marginLeft: `${depth * 24}px`,
					width: `calc(100% - ${depth * 24}px)`,
				}"
				type="button"
				@click="onRowClick(node)"
			>
				<span v-if="node.children?.length" class="ui-tree__expand" :class="{ 'ui-tree__expand--open': isExpanded(node.id) }" @click.stop="toggle(node.id)">
					<UiIcon name="chevron_right" :size="14" />
				</span>
				<span v-else class="ui-tree__expand-spacer" />
				<UiIcon v-if="node.icon" :name="node.icon" :size="16" class="ui-tree__icon" />
				<span class="ui-tree__label">{{ node.label }}</span>
			</UiButton>

			<UiTree
				v-if="node.children?.length && isExpanded(node.id)"
				v-model:expanded-keys="expandedKeys"
				:nodes="node.children"
				:depth="depth + 1"
				:active-id="activeId"
				@activate="emit('activate', $event)"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-tree {
	display: flex;
	flex-direction: column;
}

.ui-tree--nested {
	position: relative;
	padding-top: $space-1;
}

.ui-tree--nested::before {
	content: '';
	position: absolute;
	left: var(--ui-tree-indent);
	top: 0;
	bottom: 0;
	width: 1px;
	background: color-mix(in srgb, var(--color-border) 70%, transparent);
	pointer-events: none;
}

.ui-tree__node {
	margin-bottom: 2px;
}

.ui-tree__expand {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 16px;
	height: 16px;
	flex-shrink: 0;
	color: var(--ui-button-content-color, var(--color-text-secondary));
	transition: transform $duration-fast $easing-default;

	&--open {
		transform: rotate(90deg);
	}
}

.ui-tree__expand-spacer {
	width: 16px;
	flex-shrink: 0;
}

.ui-tree__row--expanded {
	background: var(--color-btn-ghost-bg-hover);
}

.ui-tree__row--expanded:hover {
	background: var(--color-btn-ghost-bg-hover);
}

.ui-tree__icon {
	flex-shrink: 0;
	color: var(--ui-button-content-color, var(--color-text-secondary));
}

.ui-tree__label {
	font-size: $text-sm;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
