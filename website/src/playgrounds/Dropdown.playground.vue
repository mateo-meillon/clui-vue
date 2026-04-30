<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import DropdownExamples from './examples/Dropdown.examples.vue'
import dropdownExamplesRaw from './examples/Dropdown.examples.vue?raw'

const align = ref<'start' | 'end'>('start')

const alignOptions: SelectOption[] = [
	{ label: 'start', value: 'start' },
	{ label: 'end', value: 'end' },
]
</script>

<template>
	<PlaygroundPage title="Dropdown">
		<template #explain>
			<p>Composable menu anchored to a trigger slot. Use <code>#trigger</code> with <code>{ isOpen, toggle }</code> and default slot with <code>{ close }</code> for menu items.</p>
		</template>
		<template #examples>
			<DropdownExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="dropdownExamplesRaw" />
		</template>
		<template #demo>
			<UiDropdown :align="align">
				<template #trigger="{ isOpen, toggle }">
					<UiButton variant="secondary" :active="isOpen" @click="toggle"> Menu {{ isOpen ? '▲' : '▼' }} </UiButton>
				</template>
				<template #default="{ close }">
					<button type="button" class="ui-dropdown-item" @click="close">Action one</button>
					<button type="button" class="ui-dropdown-item" @click="close">Action two</button>
				</template>
			</UiDropdown>
		</template>
		<template #controls>
			<UiFormField label="align">
				<UiSelect v-model="align" :options="alignOptions" size="sm" />
			</UiFormField>
		</template>
	</PlaygroundPage>
</template>
