<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import ModalExamples from './examples/Modal.examples.vue'
import modalExamplesRaw from './examples/Modal.examples.vue?raw'

const open = ref(false)
const title = ref('Example dialog')
const size = ref<'sm' | 'md' | 'lg' | 'full'>('md')
const align = ref<'center' | 'top'>('center')
const persistent = ref(false)
const fullHeight = ref(false)
const scrollBody = ref(false)
const chromeless = ref(false)
const closeAriaLabel = ref('Close')

const sizeOptions: SelectOption[] = [
	{ label: 'sm', value: 'sm' },
	{ label: 'md', value: 'md' },
	{ label: 'lg', value: 'lg' },
	{ label: 'full', value: 'full' },
]
const alignOptions: SelectOption[] = [
	{ label: 'center', value: 'center' },
	{ label: 'top', value: 'top' },
]
</script>

<template>
	<PlaygroundPage title="Modal">
		<template #explain>
			<p>Teleport overlay dialog. Non-persistent modals close on outside click and Escape; set <code>persistent</code> to keep them open until an explicit action.</p>
			<p>
				Beyond <code>sm/md/lg</code>, <code>size="full"</code> is an edge-to-edge takeover. Use <code>align="top"</code> for command-palette style, <code>fullHeight</code> for a fixed
				viewport-capped height, <code>scrollBody</code> to make the body a scroll region, and <code>chromeless</code> to drop the default header padding. Style hooks:
				<code>overlayClass</code>/<code>contentClass</code>/<code>bodyClass</code>, <code>overlayStyle</code>/<code>contentStyle</code>, and the
				<code>--ui-modal-height</code> / <code>--ui-modal-margin-top</code> CSS vars.
			</p>
		</template>
		<template #examples>
			<ModalExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="modalExamplesRaw" />
		</template>
		<template #demo>
			<div class="demo">
				<UiButton variant="primary" @click="open = true">Open modal</UiButton>
				<UiModal
					v-model="open"
					:title="title || undefined"
					:size="size"
					:align="align"
					:persistent="persistent"
					:full-height="fullHeight"
					:scroll-body="scrollBody"
					:chromeless="chromeless"
					:close-aria-label="closeAriaLabel"
				>
					<p class="muted">Body slot: explain or collect input.</p>
					<template #footer>
						<UiButton variant="ghost" @click="open = false">Cancel</UiButton>
						<UiButton variant="primary" @click="open = false">Save</UiButton>
					</template>
				</UiModal>
			</div>
		</template>
		<template #controls>
			<UiFormField label="title">
				<UiInput v-model="title" type="text" size="sm" />
			</UiFormField>
			<UiFormField label="size">
				<UiSelect v-model="size" :options="sizeOptions" size="sm" />
			</UiFormField>
			<UiFormField label="align">
				<UiSelect v-model="align" :options="alignOptions" size="sm" />
			</UiFormField>
			<UiFormField label="closeAriaLabel">
				<UiInput v-model="closeAriaLabel" type="text" size="sm" />
			</UiFormField>
			<label class="chk"><input v-model="fullHeight" type="checkbox" /> fullHeight</label>
			<label class="chk"><input v-model="scrollBody" type="checkbox" /> scrollBody</label>
			<label class="chk"><input v-model="chromeless" type="checkbox" /> chromeless</label>
			<label class="chk"><input v-model="persistent" type="checkbox" /> persistent</label>
			<label class="chk"><input v-model="open" type="checkbox" /> modelValue (open)</label>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use '../styles/website' as site;
@use 'clui-vue/tokens' as *;

.demo {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: $space-3;
	max-width: site.$playground-demo-max-width;

	.muted {
		margin: 0;
		font-size: $text-sm;
		color: var(--color-text-secondary);
	}
}

.chk {
	@include site.playground-checkbox-row;
}
</style>
