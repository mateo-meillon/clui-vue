<script setup lang="ts">
import { ref } from 'vue'
import type { UiBreadcrumbItem } from 'clui-vue'

const trail: UiBreadcrumbItem[] = [
	{ id: 'home', label: 'Home', icon: 'home' },
	{ id: 'docs', label: 'Documents', icon: 'folder' },
	{ id: '2026', label: '2026', icon: 'folder' },
	{ id: 'q2', label: 'Q2', icon: 'folder' },
	{ id: 'report', label: 'Annual report' },
]

const current = ref('Home')

function onSelect(item: UiBreadcrumbItem): void {
	current.value = item.label
}
</script>

<template>
	<div class="examples">
		<div class="group">
			<p class="label">Basic</p>
			<div class="row">
				<UiBreadcrumbs :items="trail.slice(0, 3)" @select="onSelect" />
			</div>
		</div>
		<div class="group">
			<p class="label">Custom separator</p>
			<div class="row">
				<UiBreadcrumbs :items="trail.slice(0, 3)" separator-icon="arrow_forward_ios" @select="onSelect" />
			</div>
		</div>
		<div class="group">
			<p class="label">Collapsed (maxVisible = 3)</p>
			<div class="row">
				<UiBreadcrumbs :items="trail" :max-visible="3" @select="onSelect" />
			</div>
		</div>
		<div class="group">
			<p class="label">Last selected</p>
			<div class="row">
				<span class="state">{{ current }}</span>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.state {
	font-size: $text-sm;
	color: var(--color-text-secondary);
}
</style>
