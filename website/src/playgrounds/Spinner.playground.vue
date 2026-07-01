<script setup lang="ts">
import { computed, ref } from 'vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import SpinnerExamples from './examples/Spinner.examples.vue'
import spinnerExamplesRaw from './examples/Spinner.examples.vue?raw'

const size = ref('20')
const thickness = ref('2')
const decorative = ref(false)

const sizeProp = computed(() => Number.parseInt(size.value, 10) || 20)
const thicknessProp = computed(() => Number.parseFloat(thickness.value) || 2)
</script>

<template>
	<PlaygroundPage title="Spinner">
		<template #explain>
			<p>Inline loading indicator. It inherits text color, so parent components can own tone without custom spinner variants.</p>
		</template>
		<template #examples>
			<SpinnerExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="spinnerExamplesRaw" />
		</template>
		<template #demo>
			<div class="demo">
				<UiSpinner :size="sizeProp" :thickness="thicknessProp" :decorative="decorative" />
			</div>
		</template>
		<template #controls>
			<UiFormField label="size">
				<UiInput v-model="size" type="number" size="sm" />
			</UiFormField>
			<UiFormField label="thickness">
				<UiInput v-model="thickness" type="number" size="sm" />
			</UiFormField>
			<label class="chk"><input v-model="decorative" type="checkbox" /> decorative</label>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use '../styles/website' as site;
@use 'clui-vue/tokens' as *;

.demo {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 7rem;
	max-width: site.$playground-demo-max-width;
	color: var(--color-primary);
}

.chk {
	@include site.playground-checkbox-row;
}
</style>
