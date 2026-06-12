<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import TooltipExamples from './examples/Tooltip.examples.vue'
import tooltipExamplesRaw from './examples/Tooltip.examples.vue?raw'

const placement = ref<'top' | 'bottom' | 'left' | 'right'>('top')
const align = ref<'start' | 'center' | 'end'>('center')
const delay = ref('200')
const disabled = ref(false)

const placementOptions: SelectOption[] = [
	{ label: 'top', value: 'top' },
	{ label: 'bottom', value: 'bottom' },
	{ label: 'left', value: 'left' },
	{ label: 'right', value: 'right' },
]

const alignOptions: SelectOption[] = [
	{ label: 'start', value: 'start' },
	{ label: 'center', value: 'center' },
	{ label: 'end', value: 'end' },
]

const delayOptions: SelectOption[] = [
	{ label: '0 ms', value: '0' },
	{ label: '200 ms', value: '200' },
	{ label: '500 ms', value: '500' },
]
</script>

<template>
	<PlaygroundPage title="Tooltip">
		<template #explain>
			<p>Wrap any trigger in <code>UiTooltip</code> and pass <code>content</code> or use the <code>#content</code> slot. Shows on hover and focus.</p>
		</template>
		<template #examples>
			<TooltipExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="tooltipExamplesRaw" />
		</template>
		<template #demo>
			<UiTooltip content="Helpful context for this action" :placement="placement" :align="align" :delay="Number(delay)" :disabled="disabled">
				<UiButton variant="secondary">Hover or focus me</UiButton>
			</UiTooltip>
		</template>
		<template #controls>
			<UiFormField label="placement">
				<UiSelect v-model="placement" :options="placementOptions" size="sm" />
			</UiFormField>
			<UiFormField label="align">
				<UiSelect v-model="align" :options="alignOptions" size="sm" />
			</UiFormField>
			<UiFormField label="delay">
				<UiSelect v-model="delay" :options="delayOptions" size="sm" />
			</UiFormField>
			<UiFormField label="disabled">
				<UiButton :variant="disabled ? 'primary' : 'secondary'" size="sm" @click="disabled = !disabled">
					{{ disabled ? 'On' : 'Off' }}
				</UiButton>
			</UiFormField>
		</template>
	</PlaygroundPage>
</template>
