<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import DropdownExamples from './examples/Dropdown.examples.vue'
import dropdownExamplesRaw from './examples/Dropdown.examples.vue?raw'

const align = ref<'start' | 'end'>('start')
const panelMinWidth = ref(176)
const empty = ref(false)

const alignOptions: SelectOption[] = [
	{ label: 'start', value: 'start' },
	{ label: 'end', value: 'end' },
]
</script>

<template>
	<PlaygroundPage title="Dropdown">
		<template #explain>
			<p>Composable menu anchored to a trigger slot. Use <code>#trigger</code> with <code>{ isOpen, toggle }</code> and default slot with <code>{ close }</code> for menu items.</p>
			<p>
				Size the teleported panel with <code>panelWidth</code> / <code>panelMinWidth</code> / <code>panelMaxWidth</code> (or <code>panelClass</code>), and provide an
				<code>#empty</code> slot for empty states. Pairs well with <code>UiMenu</code> / <code>UiMenuItem</code>.
			</p>
		</template>
		<template #examples>
			<DropdownExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="dropdownExamplesRaw" />
		</template>
		<template #demo>
			<UiDropdown :align="align" :panel-min-width="panelMinWidth">
				<template #trigger="{ isOpen, toggle }">
					<UiButton variant="secondary" :active="isOpen" @click="toggle"> Menu {{ isOpen ? '▲' : '▼' }} </UiButton>
				</template>
				<template #default="{ close }">
					<template v-if="!empty">
						<UiMenu aria-label="Actions">
							<UiMenuItem icon="edit" @select="close">Action one</UiMenuItem>
							<UiMenuItem icon="delete" @select="close">Action two</UiMenuItem>
						</UiMenu>
					</template>
				</template>
				<template #empty>
					<p v-if="empty" class="empty">Nothing here yet.</p>
				</template>
			</UiDropdown>
		</template>
		<template #controls>
			<UiFormField label="align">
				<UiSelect v-model="align" :options="alignOptions" size="sm" />
			</UiFormField>
			<UiFormField label="panelMinWidth (px)">
				<UiInput v-model.number="panelMinWidth" type="number" size="sm" />
			</UiFormField>
			<label class="chk"><input v-model="empty" type="checkbox" /> show empty slot</label>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use '../styles/website' as site;
@use 'clui-vue/tokens' as *;

.empty {
	margin: 0;
	padding: $space-3;
	font-size: $text-sm;
	color: var(--color-text-secondary);
	text-align: center;
}

.chk {
	@include site.playground-checkbox-row;
}
</style>

