<script setup lang="ts">
import { ref } from 'vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import FormFieldExamples from './examples/FormField.examples.vue'
import formFieldExamplesRaw from './examples/FormField.examples.vue?raw'

const label = ref('Username')
const inner = ref('')
</script>

<template>
	<PlaygroundPage title="Form field">
		<template #explain>
			<p>Lightweight label stack for form controls. Pass any control via the default slot; only the <code>label</code> prop is configurable.</p>
		</template>
		<template #examples>
			<FormFieldExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="formFieldExamplesRaw" />
		</template>
		<template #demo>
			<div class="demo">
				<UiFormField :label="label || undefined">
					<UiInput v-model="inner" type="text" placeholder="Inside field" clearable />
				</UiFormField>
			</div>
		</template>
		<template #controls>
			<UiFormField label="label">
				<UiInput v-model="label" type="text" size="sm" placeholder="Empty hides label" />
			</UiFormField>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use '../styles/website' as site;

.demo {
	max-width: site.$playground-demo-max-width;
}
</style>
