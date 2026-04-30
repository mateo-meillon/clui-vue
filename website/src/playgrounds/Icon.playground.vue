<script setup lang="ts">
import { computed, ref } from 'vue'
import { icons, type IconName, type SelectOption } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import IconExamples from './examples/Icon.examples.vue'
import iconExamplesRaw from './examples/Icon.examples.vue?raw'

const name = ref<IconName>('search')
const sizeStr = ref('28')

const iconOptions: SelectOption[] = (Object.keys(icons) as IconName[])
	.slice()
	.sort((a, b) => a.localeCompare(b))
	.map((n) => ({ label: n, value: n }))

const sizeProp = computed(() => {
	const n = Number.parseFloat(sizeStr.value)
	if (Number.isFinite(n)) return n
	return sizeStr.value.trim() || 20
})
</script>

<template>
	<PlaygroundPage title="Icon">
		<template #explain>
			<p>Inline SVG icons from the bundled registry. Pass any <code>IconName</code> key and a pixel number or CSS length for <code>size</code>.</p>
		</template>
		<template #examples>
			<IconExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="iconExamplesRaw" />
		</template>
		<template #demo>
			<div class="demo">
				<UiIcon :name="name" :size="sizeProp" />
			</div>
		</template>
		<template #controls>
			<UiFormField label="name">
				<UiSelect v-model="name" :options="iconOptions" size="sm" />
			</UiFormField>
			<UiFormField label="size (number or CSS)">
				<UiInput v-model="sizeStr" type="text" size="sm" placeholder="28 or 1.5rem" />
			</UiFormField>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.demo {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 4rem;
}
</style>
