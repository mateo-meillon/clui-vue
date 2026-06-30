<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption, UiSize } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import TextareaExamples from './examples/Textarea.examples.vue'
import textareaExamplesRaw from './examples/Textarea.examples.vue?raw'

const modelValue = ref('Multi-line text.')
const size = ref<Extract<UiSize, 'sm' | 'md' | 'lg'>>('md')
const variant = ref<'default' | 'ghost' | 'bare'>('default')
const rows = ref(4)
const disabled = ref(false)
const autoResize = ref(false)
const resize = ref<'vertical' | 'none' | 'both'>('vertical')
const placeholder = ref('Type…')

const sizeOptions: SelectOption[] = [
	{ label: 'sm', value: 'sm' },
	{ label: 'md', value: 'md' },
	{ label: 'lg', value: 'lg' },
]
const variantOptions: SelectOption[] = [
	{ label: 'default', value: 'default' },
	{ label: 'ghost', value: 'ghost' },
	{ label: 'bare', value: 'bare' },
]
const resizeOptions: SelectOption[] = [
	{ label: 'vertical', value: 'vertical' },
	{ label: 'none', value: 'none' },
	{ label: 'both', value: 'both' },
]
</script>

<template>
	<PlaygroundPage title="Textarea">
		<template #explain>
			<p>Multi-line text control with a string <code>v-model</code>. Variants: <code>default</code>, <code>ghost</code>, and <code>bare</code> (no border/background) for embedding in custom surfaces.</p>
			<p>Enable <code>autoResize</code> (with <code>maxHeight</code>) to grow with content. Exposes imperative <code>focus()</code>, <code>select()</code>, <code>blur()</code>, and <code>resize()</code> methods via template ref.</p>
		</template>
		<template #examples>
			<TextareaExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="textareaExamplesRaw" />
		</template>
		<template #demo>
			<div class="demo">
				<UiTextarea
					v-model="modelValue"
					:size="size"
					:variant="variant"
					:rows="rows"
					:disabled="disabled"
					:auto-resize="autoResize"
					:resize="resize"
					:placeholder="placeholder || undefined"
				/>
			</div>
		</template>
		<template #controls>
			<UiFormField label="size">
				<UiSelect v-model="size" :options="sizeOptions" size="sm" />
			</UiFormField>
			<UiFormField label="variant">
				<UiSelect v-model="variant" :options="variantOptions" size="sm" />
			</UiFormField>
			<UiFormField label="rows">
				<UiInput v-model.number="rows" type="number" size="sm" />
			</UiFormField>
			<UiFormField label="resize">
				<UiSelect v-model="resize" :options="resizeOptions" size="sm" />
			</UiFormField>
			<UiFormField label="placeholder">
				<UiInput v-model="placeholder" type="text" size="sm" />
			</UiFormField>
			<label class="chk"><input v-model="autoResize" type="checkbox" /> autoResize</label>
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
