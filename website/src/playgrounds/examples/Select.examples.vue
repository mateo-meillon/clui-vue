<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from 'clui-vue'

const options: SelectOption[] = [
	{ label: 'Alpha', value: 'alpha' },
	{ label: 'Beta', value: 'beta' },
	{ label: 'Gamma', value: 'gamma' },
	{ label: 'Delta', value: 'delta' },
]

const exSm = ref('alpha')
const exMd = ref('beta')
const exLg = ref('gamma')
const exDisabledVal = ref('alpha')
</script>

<template>
	<div class="examples">
		<div class="group">
			<p class="label">Sizes</p>
			<div class="cluster">
				<UiSelect v-model="exSm" :options="options" size="sm" placeholder="Small" />
				<UiSelect v-model="exMd" :options="options" size="md" placeholder="Medium" />
				<UiSelect v-model="exLg" :options="options" size="lg" placeholder="Large" />
			</div>
		</div>
		<div class="group">
			<p class="label">Disabled</p>
			<div class="cluster">
				<UiSelect v-model="exDisabledVal" :options="options" size="md" disabled placeholder="Unavailable" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.examples .cluster {
	align-items: flex-start;

	:deep(.ui-select) {
		min-width: min(100%, 11rem);
	}
}
</style>
