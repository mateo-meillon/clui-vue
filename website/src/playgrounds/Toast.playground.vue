<script setup lang="ts">
import { toastDanger, toastSuccess, toastWarning } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import ToastExamples from './examples/Toast.examples.vue'
import toastExamplesRaw from './examples/Toast.examples.vue?raw'
</script>

<template>
	<PlaygroundPage title="Toast">
		<template #explain>
			<p>Floating notifications rendered by <code>UiToastHost</code> (mounted once in the app shell). Trigger them with <code>toastSuccess</code>, <code>toastWarning</code>, or <code>toastDanger</code> from <code>clui-vue</code>.</p>
			<p>The host component itself has no playground props — use the actions below.</p>
		</template>
		<template #examples>
			<ToastExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="toastExamplesRaw" />
		</template>
		<template #demo>
			<div class="row">
				<UiButton variant="secondary" @click="toastSuccess('Saved.')">Success</UiButton>
				<UiButton variant="secondary" @click="toastWarning('Check input.')">Warning</UiButton>
				<UiButton variant="danger" @click="toastDanger('Request failed.')">Danger</UiButton>
			</div>
		</template>
		<template #controls>
			<p class="hint">No configurable props on <code>UiToastHost</code>. Use the examples above, the live demo, or:</p>
			<div class="row">
				<UiButton size="sm" variant="ghost" @click="toastSuccess('Short success copy.')">Toast success</UiButton>
				<UiButton size="sm" variant="ghost" @click="toastWarning('Short warning copy.')">Toast warning</UiButton>
				<UiButton size="sm" variant="ghost" @click="toastDanger('Short danger copy.')">Toast danger</UiButton>
			</div>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.row {
	display: flex;
	flex-wrap: wrap;
	gap: $space-3;
	align-items: center;
}

.hint {
	margin: 0;
	font-size: $text-sm;
	color: var(--color-text-secondary);

	code {
		font-size: 0.9em;
	}
}
</style>
