<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption, UiSize } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import CheckboxExamples from './examples/Checkbox.examples.vue'
import checkboxExamplesRaw from './examples/Checkbox.examples.vue?raw'

const checked = ref(true)
const indeterminate = ref(false)
const disabled = ref(false)
const size = ref<Extract<UiSize, 'sm' | 'md' | 'lg'>>('md')
const label = ref('Accept updates')
const description = ref('Receive product news and release notes.')

const sizeOptions: SelectOption[] = [
	{ label: 'sm', value: 'sm' },
	{ label: 'md', value: 'md' },
	{ label: 'lg', value: 'lg' },
]
</script>

<template>
	<PlaygroundPage title="Checkbox">
		<template #explain>
			<p>Boolean checkbox with native input behavior, <code>v-model</code>, disabled and indeterminate states, and optional label text.</p>
		</template>
		<template #examples>
			<CheckboxExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="checkboxExamplesRaw" />
		</template>
		<template #demo>
			<div class="demo">
				<UiCheckbox
					v-model="checked"
					:indeterminate="indeterminate"
					:disabled="disabled"
					:size="size"
					:label="label || undefined"
					:description="description || undefined"
				/>
				<p class="state">{{ indeterminate ? 'Mixed' : checked ? 'Checked' : 'Unchecked' }}</p>
			</div>
		</template>
		<template #controls>
			<UiFormField label="size">
				<UiSelect v-model="size" :options="sizeOptions" size="sm" />
			</UiFormField>
			<UiFormField label="label">
				<UiInput v-model="label" type="text" size="sm" />
			</UiFormField>
			<UiFormField label="description">
				<UiInput v-model="description" type="text" size="sm" />
			</UiFormField>
			<UiCheckbox v-model="checked" size="sm">checked</UiCheckbox>
			<UiCheckbox v-model="indeterminate" size="sm">indeterminate</UiCheckbox>
			<UiCheckbox v-model="disabled" size="sm">disabled</UiCheckbox>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.demo {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: $space-3;
}

.state {
	margin: 0;
	font-size: $text-sm;
	color: var(--color-text-secondary);
}
</style>
