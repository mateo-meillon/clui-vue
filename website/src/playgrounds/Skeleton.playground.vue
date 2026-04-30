<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SelectOption } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import SkeletonExamples from './examples/Skeleton.examples.vue'
import skeletonExamplesRaw from './examples/Skeleton.examples.vue?raw'

type UiSkeletonVariant = 'line' | 'text' | 'heading' | 'circle' | 'rect' | 'card' | 'button'

const variant = ref<UiSkeletonVariant>('text')
const width = ref('')
const height = ref('')
const lines = ref('3')
const circleSize = ref('40')
const animated = ref(true)

const variantOptions: SelectOption[] = [
	{ label: 'line', value: 'line' },
	{ label: 'text', value: 'text' },
	{ label: 'heading', value: 'heading' },
	{ label: 'circle', value: 'circle' },
	{ label: 'rect', value: 'rect' },
	{ label: 'card', value: 'card' },
	{ label: 'button', value: 'button' },
]

const linesNum = computed(() => Number.parseInt(lines.value, 10) || 3)
const circlePx = computed(() => Number.parseInt(circleSize.value, 10) || 40)

const widthProp = computed(() => width.value.trim() || undefined)
const heightProp = computed(() => height.value.trim() || undefined)
</script>

<template>
	<PlaygroundPage title="Skeleton">
		<template #explain>
			<p>Placeholder shapes for loading states. <code>lines</code> affects <code>text</code> and <code>card</code>; <code>size</code> is the pixel diameter for <code>circle</code>; width and height accept any CSS length.</p>
		</template>
		<template #examples>
			<SkeletonExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="skeletonExamplesRaw" />
		</template>
		<template #demo>
			<div class="demo">
				<UiSkeleton
					:variant="variant"
					:width="widthProp"
					:height="heightProp"
					:lines="linesNum"
					:size="circlePx"
					:animated="animated"
				/>
			</div>
		</template>
		<template #controls>
			<UiFormField label="variant">
				<UiSelect v-model="variant" :options="variantOptions" size="sm" />
			</UiFormField>
			<UiFormField label="width (CSS)">
				<UiInput v-model="width" type="text" size="sm" placeholder="e.g. 60% or 12rem" />
			</UiFormField>
			<UiFormField label="height (CSS)">
				<UiInput v-model="height" type="text" size="sm" placeholder="optional" />
			</UiFormField>
			<UiFormField label="lines (number)">
				<UiInput v-model="lines" type="number" size="sm" />
			</UiFormField>
			<UiFormField label="size px (circle)">
				<UiInput v-model="circleSize" type="number" size="sm" />
			</UiFormField>
			<label class="chk"><input v-model="animated" type="checkbox" /> animated</label>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use '../styles/website' as site;
@use 'clui-vue/tokens' as *;

.demo {
	max-width: site.$playground-demo-max-width;
	display: flex;
	flex-direction: column;
	gap: $space-4;
}

.chk {
	@include site.playground-checkbox-row;
}
</style>
