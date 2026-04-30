<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SelectOption, UiTabItem } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import TabsExamples from './examples/Tabs.examples.vue'
import tabsExamplesRaw from './examples/Tabs.examples.vue?raw'

const tabA = ref('Alpha')
const tabB = ref('Bravo')
const tabC = ref('Charlie')
const modelValue = ref('a')
const ariaLabel = ref('Demo tabs')

const items = computed<UiTabItem[]>(() => [
	{ id: 'a', label: tabA.value },
	{ id: 'b', label: tabB.value },
	{ id: 'c', label: tabC.value },
])

const tabOptions: SelectOption[] = [
	{ label: 'Alpha tab', value: 'a' },
	{ label: 'Bravo tab', value: 'b' },
	{ label: 'Charlie tab', value: 'c' },
]
</script>

<template>
	<PlaygroundPage title="Tabs">
		<template #explain>
			<p>Accessible tablist with one named slot per tab id. Bind <code>modelValue</code> to the active tab id and pass <code>items</code> metadata for labels.</p>
		</template>
		<template #examples>
			<TabsExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="tabsExamplesRaw" />
		</template>
		<template #demo>
			<UiTabs v-model="modelValue" :items="items" :aria-label="ariaLabel || undefined">
				<template #a>
					<p class="panel">Panel <strong>A</strong></p>
				</template>
				<template #b>
					<p class="panel">Panel <strong>B</strong></p>
				</template>
				<template #c>
					<p class="panel">Panel <strong>C</strong></p>
				</template>
			</UiTabs>
		</template>
		<template #controls>
			<UiFormField label="modelValue">
				<UiSelect v-model="modelValue" :options="tabOptions" size="sm" />
			</UiFormField>
			<UiFormField label="ariaLabel">
				<UiInput v-model="ariaLabel" type="text" size="sm" />
			</UiFormField>
			<UiFormField label="items[0].label">
				<UiInput v-model="tabA" type="text" size="sm" />
			</UiFormField>
			<UiFormField label="items[1].label">
				<UiInput v-model="tabB" type="text" size="sm" />
			</UiFormField>
			<UiFormField label="items[2].label">
				<UiInput v-model="tabC" type="text" size="sm" />
			</UiFormField>
		</template>
	</PlaygroundPage>
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
