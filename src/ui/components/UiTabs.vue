<script setup lang="ts">
import { useId } from 'vue'
import type { UiTabItem } from '../types'

withDefaults(
	defineProps<{
		modelValue: string
		items: UiTabItem[]
		/** Accessible name for the tab strip (tablist). */
		ariaLabel?: string
		/** Render the tab panels; set `false` for a headless tab-bar (strip only). */
		panels?: boolean
	}>(),
	{ ariaLabel: undefined, panels: true },
)

const emit = defineEmits<{
	'update:modelValue': [value: string]
}>()

const baseId = useId()

function selectTab(id: string): void {
	emit('update:modelValue', id)
}
</script>

<template>
	<div class="ui-tabs">
		<div class="ui-tabs__header" role="tablist" :aria-label="ariaLabel">
			<button
				v-for="item in items"
				:key="item.id"
				type="button"
				class="ui-tabs__trigger"
				:class="{ 'ui-tabs__trigger--active': modelValue === item.id }"
				role="tab"
				:id="`${baseId}-tab-${item.id}`"
				:aria-selected="modelValue === item.id"
				:aria-controls="`${baseId}-panel-${item.id}`"
				:tabindex="modelValue === item.id ? 0 : -1"
				@click="selectTab(item.id)"
			>
				{{ item.label }}
			</button>
		</div>
		<div v-if="panels" class="ui-tabs__panels">
			<div
				v-for="item in items"
				:key="'panel-' + item.id"
				:id="`${baseId}-panel-${item.id}`"
				role="tabpanel"
				:aria-labelledby="`${baseId}-tab-${item.id}`"
				class="ui-tabs__panel"
				:hidden="modelValue !== item.id"
			>
				<slot :name="item.id" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-tabs {
	display: flex;
	flex-direction: column;
	min-width: 0;
	width: 100%;
}

.ui-tabs__header {
	display: flex;
	flex-wrap: wrap;
	align-items: stretch;
	gap: $space-1;
	padding: $space-4 $space-5 0;
	border-bottom: 1px solid var(--color-border);
}

.ui-tabs__trigger {
	position: relative;
	margin: 0 0 -1px;
	padding: $space-3 $space-4;
	font-family: $font-sans;
	font-size: $text-sm;
	font-weight: 500;
	color: var(--color-text-secondary);
	background: transparent;
	border: 1px solid transparent;
	border-radius: $radius-md $radius-md 0 0;
	cursor: pointer;
	transition:
		color $duration-fast $easing-default,
		background $duration-fast $easing-default;

	&:hover {
		color: var(--color-text-primary);
		background: color-mix(in srgb, var(--color-btn-ghost-bg-hover) 80%, transparent);
	}

	&:focus-visible {
		outline: 2px solid var(--color-input-border-focus);
		outline-offset: 2px;
	}

	&--active {
		color: var(--color-text-primary);
		font-weight: 600;
		background: var(--color-bg-surface);
		border-color: var(--color-border);
		border-bottom-color: var(--color-bg-surface);
	}
}

.ui-tabs__panels {
	min-width: 0;
	padding: $space-5 $space-5 $space-6;
}

.ui-tabs__panel[hidden] {
	display: none !important;
}
</style>
