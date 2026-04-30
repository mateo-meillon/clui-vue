<script setup lang="ts">
import { computed, ref } from 'vue'
import type { IconName, SelectOption, UiSize } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import InputExamples from './examples/Input.examples.vue'
import inputExamplesRaw from './examples/Input.examples.vue?raw'

const modelValue = ref('Hello')
const type = ref<'text' | 'password' | 'email' | 'number' | 'url'>('text')
const placeholder = ref('Type…')
const size = ref<Extract<UiSize, 'sm' | 'md' | 'lg'>>('md')
const disabled = ref(false)
const clearable = ref(true)
const clearAriaLabel = ref('Clear')
const iconChoice = ref<string>('none')

const typeOptions: SelectOption[] = [
	{ label: 'text', value: 'text' },
	{ label: 'password', value: 'password' },
	{ label: 'email', value: 'email' },
	{ label: 'number', value: 'number' },
	{ label: 'url', value: 'url' },
]
const sizeOptions: SelectOption[] = [
	{ label: 'sm', value: 'sm' },
	{ label: 'md', value: 'md' },
	{ label: 'lg', value: 'lg' },
]
const demoIcons: IconName[] = ['search', 'settings', 'close', 'add']
const iconOptions: SelectOption[] = [{ label: '(none)', value: 'none' }, ...demoIcons.map((n) => ({ label: n, value: n }))]

const iconProp = computed(() => (iconChoice.value === 'none' ? undefined : (iconChoice.value as IconName)))
</script>

<template>
	<PlaygroundPage title="Input">
		<template #explain>
			<p>Single-line text control with optional leading icon and optional clear button. Value is a string <code>v-model</code> even for <code>type="number"</code>.</p>
		</template>
		<template #examples>
			<InputExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="inputExamplesRaw" />
		</template>
		<template #demo>
			<div class="demo">
				<UiInput
					v-model="modelValue"
					:type="type"
					:placeholder="placeholder || undefined"
					:size="size"
					:disabled="disabled"
					:icon="iconProp"
					:clearable="clearable"
					:clear-aria-label="clearAriaLabel"
				/>
			</div>
		</template>
		<template #controls>
			<UiFormField label="type">
				<UiSelect v-model="type" :options="typeOptions" size="sm" />
			</UiFormField>
			<UiFormField label="size">
				<UiSelect v-model="size" :options="sizeOptions" size="sm" />
			</UiFormField>
			<UiFormField label="placeholder">
				<UiInput v-model="placeholder" type="text" size="sm" />
			</UiFormField>
			<UiFormField label="icon">
				<UiSelect v-model="iconChoice" :options="iconOptions" size="sm" />
			</UiFormField>
			<UiFormField label="clearAriaLabel">
				<UiInput v-model="clearAriaLabel" type="text" size="sm" />
			</UiFormField>
			<UiFormField label="modelValue">
				<UiInput v-model="modelValue" type="text" size="sm" />
			</UiFormField>
			<label class="chk"><input v-model="disabled" type="checkbox" /> disabled</label>
			<label class="chk"><input v-model="clearable" type="checkbox" /> clearable</label>
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
