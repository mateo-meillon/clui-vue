<template>
	<div class="wrap">
		<UiBreadcrumbs :items="items" @select="() => {}" />
	</div>
</template>

<script setup lang="ts">
import type { UiBreadcrumbItem } from 'clui-vue'

const items: UiBreadcrumbItem[] = [
	{ id: 'home', label: 'Home', icon: 'home' },
	{ id: 'library', label: 'Library', icon: 'folder' },
	{ id: 'reports', label: 'Reports' },
]
</script>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.wrap {
	display: flex;
	justify-content: center;
}
</style>
