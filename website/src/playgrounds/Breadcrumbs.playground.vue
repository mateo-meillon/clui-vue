<script setup lang="ts">
import { ref } from 'vue'
import type { IconName, SelectOption, UiBreadcrumbItem } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import BreadcrumbsExamples from './examples/Breadcrumbs.examples.vue'
import breadcrumbsExamplesRaw from './examples/Breadcrumbs.examples.vue?raw'

const items: UiBreadcrumbItem[] = [
	{ id: 'home', label: 'Home', icon: 'home' },
	{ id: 'docs', label: 'Documents', icon: 'folder' },
	{ id: '2026', label: '2026', icon: 'folder' },
	{ id: 'q2', label: 'Q2', icon: 'folder' },
	{ id: 'report', label: 'Annual report' },
]

const separatorIcon = ref<IconName>('chevron_right')
const maxVisible = ref(0)
const lastSelected = ref('')

const separatorOptions: SelectOption[] = [
	{ label: 'chevron_right', value: 'chevron_right' },
	{ label: 'arrow_forward_ios', value: 'arrow_forward_ios' },
	{ label: 'keyboard_arrow_right', value: 'keyboard_arrow_right' },
	{ label: 'double_arrow', value: 'double_arrow' },
]

function onSelect(item: UiBreadcrumbItem): void {
	lastSelected.value = item.label
}
</script>

<template>
	<PlaygroundPage title="Breadcrumbs">
		<template #explain>
			<p>Navigation trail built from an <code>items</code> array of <code>{ id, label, icon? }</code>. The last item is marked as the current page. Emits <code>select</code> when a crumb is clicked.</p>
			<p>Set <code>maxVisible</code> to collapse the middle of long trails into an ellipsis that emits <code>expandCollapsed</code>.</p>
		</template>
		<template #examples>
			<BreadcrumbsExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="breadcrumbsExamplesRaw" />
		</template>
		<template #demo>
			<div class="demo">
				<UiBreadcrumbs :items="items" :separator-icon="separatorIcon" :max-visible="maxVisible || undefined" @select="onSelect" />
				<p class="state">selected: {{ lastSelected || '—' }}</p>
			</div>
		</template>
		<template #controls>
			<UiFormField label="separatorIcon">
				<UiSelect v-model="separatorIcon" :options="separatorOptions" size="sm" />
			</UiFormField>
			<UiFormField label="maxVisible (0 = all)">
				<UiInput v-model.number="maxVisible" type="number" size="sm" />
			</UiFormField>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.demo {
	display: flex;
	flex-direction: column;
	gap: $space-3;
}

.state {
	margin: 0;
	font-size: $text-sm;
	color: var(--color-text-secondary);
}
</style>
