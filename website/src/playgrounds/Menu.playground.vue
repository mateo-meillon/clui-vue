<script setup lang="ts">
import { ref } from 'vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import MenuExamples from './examples/Menu.examples.vue'
import menuExamplesRaw from './examples/Menu.examples.vue?raw'

const radio = ref(true)
const showIcons = ref(true)
const selected = ref('comfortable')
</script>

<template>
	<PlaygroundPage title="Menu">
		<template #explain>
			<p><code>UiMenu</code> is a keyboard-navigable list wrapper (<code>role="menu"</code>) designed to live inside a <code>UiDropdown</code>. <code>UiMenuItem</code> renders each row with an optional <code>icon</code>, <code>active</code> highlight, <code>disabled</code> state, and emits <code>select</code>.</p>
			<p>Set <code>radio</code> on items for single-select menus — they use <code>menuitemradio</code> semantics and show a check when <code>selected</code>.</p>
		</template>
		<template #examples>
			<MenuExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="menuExamplesRaw" />
		</template>
		<template #demo>
			<div class="demo">
				<UiMenu aria-label="Density">
					<UiMenuItem :icon="showIcons ? 'density_small' : undefined" :radio="radio" :selected="radio && selected === 'compact'" @select="selected = 'compact'">Compact</UiMenuItem>
					<UiMenuItem :icon="showIcons ? 'density_medium' : undefined" :radio="radio" :selected="radio && selected === 'comfortable'" @select="selected = 'comfortable'">Comfortable</UiMenuItem>
					<UiMenuItem :icon="showIcons ? 'density_large' : undefined" :radio="radio" :selected="radio && selected === 'spacious'" @select="selected = 'spacious'">Spacious</UiMenuItem>
				</UiMenu>
				<p class="state">selected: {{ selected }}</p>
			</div>
		</template>
		<template #controls>
			<label class="chk"><input v-model="radio" type="checkbox" /> radio items</label>
			<label class="chk"><input v-model="showIcons" type="checkbox" /> show icons</label>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use '../styles/website' as site;
@use 'clui-vue/tokens' as *;

.demo {
	width: min(100%, 16rem);
	padding: $space-1;
	border: 1px solid var(--color-border);
	border-radius: $radius-md;
	background: var(--color-bg-surface);
}

.state {
	margin: $space-2 $space-2 0;
	font-size: $text-sm;
	color: var(--color-text-secondary);
}

.chk {
	@include site.playground-checkbox-row;
}
</style>
