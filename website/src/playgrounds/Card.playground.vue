<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import CardExamples from './examples/Card.examples.vue'
import cardUsageSnippetRaw from './Card.usage-snippet.vue?raw'

const padding = ref<'none' | 'sm' | 'md' | 'lg'>('md')

const paddingOptions: SelectOption[] = [
	{ label: 'none', value: 'none' },
	{ label: 'sm', value: 'sm' },
	{ label: 'md', value: 'md' },
	{ label: 'lg', value: 'lg' },
]
</script>

<template>
	<PlaygroundPage title="Card">
		<template #explain>
			<p>Surface container with inner padding presets. Use as a grouping primitive around demos, forms, or panels.</p>
		</template>
		<template #examples>
			<CardExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="cardUsageSnippetRaw" />
		</template>
		<template #demo>
			<UiCard :padding="padding">
				<p class="muted">
					Sample body. Padding is <code>{{ padding }}</code
					>.
				</p>
			</UiCard>
		</template>
		<template #controls>
			<UiFormField label="padding">
				<UiSelect v-model="padding" :options="paddingOptions" size="sm" />
			</UiFormField>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.muted {
	margin: 0;
	font-size: $text-sm;
	color: var(--color-text-secondary);

	code {
		font-size: 0.9em;
	}
}
</style>
