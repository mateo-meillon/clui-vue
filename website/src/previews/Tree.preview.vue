<script setup lang="ts">
import { ref } from 'vue'
import type { UiTreeNode } from 'clui-vue'

const nodes: UiTreeNode[] = [
	{
		id: 'r',
		label: 'Docs',
		icon: 'folder',
		children: [
			{ id: 'p', label: 'Page', icon: 'drafts' },
		],
	},
]

const expandedKeys = ref<string[]>(['r'])
</script>

<template>
	<div class="wrap">
		<UiTree v-model:expanded-keys="expandedKeys" :nodes="nodes" active-id="p" />
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.wrap {
	width: 100%;
	max-width: 11rem;
	font-size: $text-md;
}
</style>
