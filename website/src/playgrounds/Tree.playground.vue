<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SelectOption, UiTreeNode } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import TreeExamples from './examples/Tree.examples.vue'
import treeExamplesRaw from './examples/Tree.examples.vue?raw'

const demoNodes: UiTreeNode[] = [
	{
		id: 'root',
		label: 'Project',
		icon: 'folder',
		children: [
			{
				id: 'src',
				label: 'src',
				icon: 'folder',
				children: [{ id: 'app', label: 'App.vue', icon: 'edit_square' }],
			},
			{ id: 'readme', label: 'README.md', icon: 'drafts' },
		],
	},
]

const expandedKeys = ref<string[]>(['root', 'src'])

const activeChoice = ref<string>('app')

const activeId = computed(() => (activeChoice.value === 'none' ? null : activeChoice.value))

const activeOptions: SelectOption[] = [
	{ label: '(none)', value: 'none' },
	{ label: 'README.md', value: 'readme' },
	{ label: 'App.vue', value: 'app' },
]

function onActivate(node: UiTreeNode): void {
	activeChoice.value = node.id
}
</script>

<template>
	<PlaygroundPage title="Tree">
		<template #explain>
			<p>
				Hierarchical rows built from <code>UiTreeNode</code> items. Folders (nodes with <code>children</code>) toggle expand/collapse; leaves emit <code>activate</code> for routing
				or selection.
			</p>
			<p>Use <code>v-model:expanded-keys</code> for open folders and <code>active-id</code> to mirror the current route or selection.</p>
		</template>
		<template #examples>
			<TreeExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="treeExamplesRaw" />
		</template>
		<template #demo>
			<div class="demo">
				<UiTree v-model:expanded-keys="expandedKeys" :nodes="demoNodes" :active-id="activeId" @activate="onActivate" />
			</div>
		</template>
		<template #controls>
			<UiFormField label="activeId">
				<UiSelect v-model="activeChoice" :options="activeOptions" size="sm" />
			</UiFormField>
			<p class="hint">Use chevrons or folder rows to change expansion. Click a leaf or use the control above for <code>activeId</code>.</p>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.demo {
	max-width: 18rem;
	padding: $space-2 0;
}

.hint {
	margin: 0;
	font-size: $text-xs;
	color: var(--color-text-secondary);
	line-height: 1.4;

	code {
		font-size: 0.9em;
	}
}
</style>
