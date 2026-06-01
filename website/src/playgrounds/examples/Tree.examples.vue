<script setup lang="ts">
import { ref } from 'vue'
import type { UiTreeNode } from 'clui-vue'

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

const exampleExpanded = ref<string[]>(['root', 'src'])
const exampleActiveId = ref<string | null>('readme')

function onExampleActivate(node: UiTreeNode): void {
	exampleActiveId.value = node.id
}
</script>

<template>
	<div class="examples">
		<div class="group">
			<p class="label">Sample hierarchy</p>
			<div class="tree-demo">
				<UiTree v-model:expanded-keys="exampleExpanded" :nodes="demoNodes" :active-id="exampleActiveId" @activate="onExampleActivate" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.tree-demo {
	max-width: 18rem;
	padding: $space-2 0;
}
</style>
