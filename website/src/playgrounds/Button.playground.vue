<script setup lang="ts">
import { computed, ref } from 'vue'
import type { IconName, SelectOption, UiSize, UiVariant } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import ButtonExamples from './examples/Button.examples.vue'
import buttonExamplesRaw from './examples/Button.examples.vue?raw'

const variant = ref<UiVariant>('primary')
const size = ref<Extract<UiSize, 'sm' | 'md' | 'lg' | 'auto'>>('md')
const disabled = ref(false)
const block = ref(false)
const rounded = ref(false)
const active = ref(false)
const loading = ref(false)
const align = ref<'start' | 'center' | 'end'>('center')
const iconChoice = ref<string>('none')
const label = ref('Click me')

const variantOptions: SelectOption[] = [
	{ label: 'Primary', value: 'primary' },
	{ label: 'Secondary', value: 'secondary' },
	{ label: 'Ghost', value: 'ghost' },
	{ label: 'Danger', value: 'danger' },
]
const sizeOptions: SelectOption[] = [
	{ label: 'Small', value: 'sm' },
	{ label: 'Medium', value: 'md' },
	{ label: 'Large', value: 'lg' },
	{ label: 'Auto', value: 'auto' },
]
const alignOptions: SelectOption[] = [
	{ label: 'Start', value: 'start' },
	{ label: 'Center', value: 'center' },
	{ label: 'End', value: 'end' },
]
const demoIcons: IconName[] = ['add', 'search', 'settings', 'close', 'menu', 'checkCircle']
const iconOptions: SelectOption[] = [{ label: '(none)', value: 'none' }, ...demoIcons.map((n) => ({ label: n, value: n }))]

const iconProp = computed(() => (iconChoice.value === 'none' ? undefined : (iconChoice.value as IconName)))
</script>

<template>
	<PlaygroundPage title="Button">
		<template #explain>
			<p>Primary actions, secondary actions, icon buttons, and loading state. Uses ripple (<code>v-wave</code>) when the host app registers it.</p>
			<p>Icon-only buttons omit default slot content and set width from the icon.</p>
		</template>
		<template #examples>
			<ButtonExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="buttonExamplesRaw" />
		</template>
		<template #demo>
			<div class="demo-row">
				<UiButton :variant="variant" :size="size" :disabled="disabled" :block="block" :rounded="rounded" :active="active" :loading="loading" :align="align" :icon="iconProp">
					{{ label || '\u00a0' }}
				</UiButton>
			</div>
		</template>
		<template #controls>
			<UiFormField label="variant">
				<UiSelect v-model="variant" :options="variantOptions" size="sm" />
			</UiFormField>
			<UiFormField label="size">
				<UiSelect v-model="size" :options="sizeOptions" size="sm" />
			</UiFormField>
			<UiFormField label="align">
				<UiSelect v-model="align" :options="alignOptions" size="sm" />
			</UiFormField>
			<UiFormField label="icon">
				<UiSelect v-model="iconChoice" :options="iconOptions" size="sm" />
			</UiFormField>
			<UiFormField label="label (default slot)">
				<UiInput v-model="label" type="text" size="sm" placeholder="Button text" />
			</UiFormField>
			<label class="chk"><input v-model="disabled" type="checkbox" /> disabled</label>
			<label class="chk"><input v-model="block" type="checkbox" /> block</label>
			<label class="chk"><input v-model="rounded" type="checkbox" /> rounded</label>
			<label class="chk"><input v-model="active" type="checkbox" /> active</label>
			<label class="chk"><input v-model="loading" type="checkbox" /> loading</label>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use '../styles/website' as site;
@use 'clui-vue/tokens' as *;

.demo-row {
	display: flex;
	flex-wrap: wrap;
	gap: $space-3;
	align-items: center;
}

.chk {
	@include site.playground-checkbox-row;
}
</style>
