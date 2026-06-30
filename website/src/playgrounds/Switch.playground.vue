<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption, UiSize } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import SwitchExamples from './examples/Switch.examples.vue'
import switchExamplesRaw from './examples/Switch.examples.vue?raw'

const enabled = ref(true)
const disabled = ref(false)
const loading = ref(false)
const size = ref<Extract<UiSize, 'sm' | 'md'>>('md')
const showLabels = ref(false)
const label = ref('Notifications')
const description = ref('Send me product updates')
const labelPosition = ref<'start' | 'end'>('start')

const sizeOptions: SelectOption[] = [
	{ label: 'sm', value: 'sm' },
	{ label: 'md', value: 'md' },
]
const labelPositionOptions: SelectOption[] = [
	{ label: 'start', value: 'start' },
	{ label: 'end', value: 'end' },
]
</script>

<template>
	<PlaygroundPage title="Switch">
		<template #explain>
			<p>
				Toggle control with <code>v-model</code> (boolean). Supports <code>disabled</code>, <code>loading</code>, and optional <code>#checked</code> / <code>#unchecked</code> slots
				for inline labels.
			</p>
			<p>Pass <code>label</code> (and optional <code>description</code>) to render a clickable labelled row; use <code>labelPosition</code> to place the control before or after the text.</p>
		</template>
		<template #examples>
			<SwitchExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="switchExamplesRaw" />
		</template>
		<template #demo>
			<div class="demo">
				<UiSwitch
					v-model="enabled"
					:disabled="disabled"
					:loading="loading"
					:size="size"
					:label="label || undefined"
					:description="description || undefined"
					:label-position="labelPosition"
				>
					<template v-if="showLabels" #checked>ON</template>
					<template v-if="showLabels" #unchecked>OFF</template>
				</UiSwitch>
				<p class="state">{{ enabled ? 'On' : 'Off' }}</p>
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
			<UiFormField label="labelPosition">
				<UiSelect v-model="labelPosition" :options="labelPositionOptions" size="sm" />
			</UiFormField>
			<label class="chk"><input v-model="showLabels" type="checkbox" /> inline on/off labels</label>
			<label class="chk"><input v-model="disabled" type="checkbox" /> disabled</label>
			<label class="chk"><input v-model="loading" type="checkbox" /> loading</label>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use '../styles/website' as site;
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

.chk {
	@include site.playground-checkbox-row;
}
</style>
