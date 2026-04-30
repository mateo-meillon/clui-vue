<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption, UiSize } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import SelectExamples from './examples/Select.examples.vue'
import selectExamplesRaw from './examples/Select.examples.vue?raw'

const modelValue = ref('beta')
const placeholder = ref('Choose')
const size = ref<Extract<UiSize, 'sm' | 'md' | 'lg'>>('md')
const disabled = ref(false)
const placement = ref<'bottom' | 'top'>('bottom')

const options: SelectOption[] = [
	{ label: 'Alpha', value: 'alpha' },
	{ label: 'Beta', value: 'beta' },
	{ label: 'Gamma', value: 'gamma' },
	{ label: 'Delta', value: 'delta' },
]
const sizeOptions: SelectOption[] = [
	{ label: 'sm', value: 'sm' },
	{ label: 'md', value: 'md' },
	{ label: 'lg', value: 'lg' },
]
const placementOptions: SelectOption[] = [
	{ label: 'bottom', value: 'bottom' },
	{ label: 'top', value: 'top' },
]
</script>

<template>
	<PlaygroundPage title="Select">
		<template #explain>
			<p>Custom listbox triggered by a button-like control. Options are <code>{ label, value }</code> pairs; <code>modelValue</code> stores the selected value string.</p>
		</template>
		<template #examples>
			<SelectExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="selectExamplesRaw" />
		</template>
		<template #demo>
			<div class="demo">
				<UiSelect
					v-model="modelValue"
					:options="options"
					:placeholder="placeholder || undefined"
					:size="size"
					:disabled="disabled"
					:placement="placement"
				/>
			</div>
		</template>
		<template #controls>
			<UiFormField label="size">
				<UiSelect v-model="size" :options="sizeOptions" size="sm" />
			</UiFormField>
			<UiFormField label="placement">
				<UiSelect v-model="placement" :options="placementOptions" size="sm" />
			</UiFormField>
			<UiFormField label="placeholder">
				<UiInput v-model="placeholder" type="text" size="sm" />
			</UiFormField>
			<UiFormField label="modelValue">
				<UiSelect v-model="modelValue" :options="options" size="sm" />
			</UiFormField>
			<label class="chk"><input v-model="disabled" type="checkbox" /> disabled</label>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use '../styles/website' as site;
@use 'clui-vue/tokens' as *;

.demo {
	max-width: site.$playground-demo-max-width;
}

.chk {
	@include site.playground-checkbox-row;
}
</style>
