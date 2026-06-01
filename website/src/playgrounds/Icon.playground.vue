<script setup lang="ts">
import { computed, ref } from 'vue'
import type { IconName, SelectOption } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import IconExamples from './examples/Icon.examples.vue'
import iconExamplesRaw from './examples/Icon.examples.vue?raw'

const name = ref<IconName>('search')
const sizeStr = ref('28')

const demoIcons: IconName[] = [
	'search',
	'settings',
	'menu',
	'close',
	'add',
	'home',
	'person',
	'mail',
	'calendar_today',
	'notifications',
	'check_circle',
	'arrow_back',
	'arrow_forward',
	'light_mode',
	'dark_mode',
	'favorite',
	'bookmark',
	'download',
	'upload',
	'edit',
]

const iconOptions: SelectOption[] = demoIcons
	.slice()
	.sort((a, b) => a.localeCompare(b))
	.map((iconName) => ({ label: iconName, value: iconName }))

const sizeProp = computed(() => {
	const n = Number.parseFloat(sizeStr.value)
	if (Number.isFinite(n)) return n
	return sizeStr.value.trim() || 20
})
</script>

<template>
	<PlaygroundPage title="Icon">
		<template #explain>
			<p>
				Material Symbols Rounded icons are available by ligature name (snake_case). Pass any icon name from Google Material Symbols and a pixel number or CSS length for
				<code>size</code>.
			</p>
			<p>
				Browse the full set at
				<a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer">fonts.google.com/icons</a>.
			</p>
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
