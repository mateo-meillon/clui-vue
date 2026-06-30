<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SelectOption } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import ButtonGroupExamples from './examples/ButtonGroup.examples.vue'
import buttonGroupExamplesRaw from './examples/ButtonGroup.examples.vue?raw'

const variant = ref<'plain' | 'pill' | 'attached'>('pill')
const gap = ref(6)

const variantOptions: SelectOption[] = [
	{ label: 'plain', value: 'plain' },
	{ label: 'pill', value: 'pill' },
	{ label: 'attached', value: 'attached' },
]

const pill = computed(() => variant.value === 'pill')
const attached = computed(() => variant.value === 'attached')
</script>

<template>
	<PlaygroundPage title="Button group">
		<template #explain>
			<p>Container that lays out related <code>UiButton</code>s. Use <code>pill</code> for a rounded surface around the group, or <code>attached</code> for a segmented control with shared edges.</p>
			<p><code>gap</code> sets the spacing between buttons (ignored when <code>attached</code>).</p>
		</template>
		<template #examples>
			<ButtonGroupExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="buttonGroupExamplesRaw" />
		</template>
		<template #demo>
			<UiButtonGroup :pill="pill" :attached="attached" :gap="gap">
				<UiButton variant="secondary" size="sm" :rounded="pill">One</UiButton>
				<UiButton variant="secondary" size="sm" :rounded="pill">Two</UiButton>
				<UiButton variant="secondary" size="sm" :rounded="pill">Three</UiButton>
			</UiButtonGroup>
		</template>
		<template #controls>
			<UiFormField label="style">
				<UiSelect v-model="variant" :options="variantOptions" size="sm" />
			</UiFormField>
			<UiFormField label="gap (px)">
				<UiInput v-model.number="gap" type="number" size="sm" />
			</UiFormField>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;
</style>
