<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption, UiSize } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import RadioExamples from './examples/Radio.examples.vue'
import radioExamplesRaw from './examples/Radio.examples.vue?raw'

const selected = ref<'one' | 'two' | 'three'>('one')
const disabled = ref(false)
const size = ref<Extract<UiSize, 'sm' | 'md' | 'lg'>>('md')

const choices = ['one', 'two', 'three'] as const
const sizeOptions: SelectOption[] = [
	{ label: 'sm', value: 'sm' },
	{ label: 'md', value: 'md' },
	{ label: 'lg', value: 'lg' },
]
</script>

<template>
	<PlaygroundPage title="Radio">
		<template #explain>
			<p>
				This control is <strong>visual only</strong>: it renders the circle state. You supply semantics with a real <code>radiogroup</code> pattern (for example focusable
				<code>button role="radio"</code> siblings) and bind <code>checked</code> yourself.
			</p>
		</template>
		<template #examples>
			<RadioExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="radioExamplesRaw" />
		</template>
		<template #demo>
			<div class="demo radioset">
				<div class="row" role="radiogroup" aria-label="Demo choice">
					<button v-for="v in choices" :key="v" type="button" class="radio-hit" :aria-checked="selected === v" role="radio" @click="selected = v">
						<UiRadio :checked="selected === v" :disabled="disabled" :size="size" />
						<span>{{ v }}</span>
					</button>
				</div>
			</div>
		</template>
		<template #controls>
			<UiFormField label="size">
				<UiSelect v-model="size" :options="sizeOptions" size="sm" />
			</UiFormField>
			<label class="chk"><input v-model="disabled" type="checkbox" /> disabled</label>
			<p class="hint">Pick a row in the live demo to change which radio looks checked.</p>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use '../styles/website' as site;
@use 'clui-vue/tokens' as *;

.demo.radioset {
	.row {
		display: flex;
		flex-wrap: wrap;
		gap: $space-3;
		align-items: center;
	}

	.radio-hit {
		display: inline-flex;
		align-items: center;
		gap: $space-2;
		padding: $space-2 $space-3;
		border: none;
		border-radius: $radius-sm;
		background: transparent;
		color: var(--color-text);
		font: inherit;
		cursor: pointer;

		&:hover {
			background: var(--color-btn-ghost-bg-hover);
		}
	}
}

.chk {
	@include site.playground-checkbox-row;
}

.hint {
	margin: 0;
	font-size: $text-xs;
	color: var(--color-text-secondary);
	line-height: 1.4;
}
</style>
