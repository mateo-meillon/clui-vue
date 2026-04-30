<script setup lang="ts">
import { ref } from 'vue'
import type { UiTabItem } from 'clui-vue'

const exTabId = ref('overview')
const exTabItems: UiTabItem[] = [
	{ id: 'overview', label: 'Overview' },
	{ id: 'settings', label: 'Settings' },
	{ id: 'billing', label: 'Billing' },
]
</script>

<template>
	<div class="examples">
		<div class="group">
			<p class="label">Basic layout</p>
			<UiTabs v-model="exTabId" :items="exTabItems" aria-label="Examples">
				<template #overview>
					<p class="panel">Overview panel — summaries and status.</p>
				</template>
				<template #settings>
					<p class="panel">Settings panel — preferences.</p>
				</template>
				<template #billing>
					<p class="panel">Billing panel — plans and invoices.</p>
				</template>
			</UiTabs>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.panel {
	margin: 0;
	padding: $space-4 $space-5 $space-5;
	font-size: $text-sm;
	color: var(--color-text-secondary);
	line-height: 1.5;
}
</style>
