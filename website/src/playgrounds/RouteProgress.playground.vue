<script setup lang="ts">
import { inject, onUnmounted } from 'vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import { GALLERY_ROUTE_PROGRESS_MANUAL_KEY } from '../composables/galleryRouteProgress'
import RouteProgressExamples from './examples/RouteProgress.examples.vue'
import routeProgressExamplesRaw from './examples/RouteProgress.examples.vue?raw'

const manualActive = inject(GALLERY_ROUTE_PROGRESS_MANUAL_KEY)!

let timer: ReturnType<typeof setTimeout> | null = null

function runDemo(): void {
	manualActive.value = true
	if (timer) clearTimeout(timer)
	timer = setTimeout(() => {
		manualActive.value = false
		timer = null
	}, 2200)
}

onUnmounted(() => {
	if (timer) clearTimeout(timer)
})
</script>

<template>
	<PlaygroundPage title="Route progress">
		<template #explain>
			<p>
				Fixed top-of-viewport bar for route changes or async work. Mount <code>UiRouteProgress</code> once near your app root (this gallery mounts it in <code>GalleryShell</code>) and bind <code>active</code> to your router’s pending state or any loading signal.
			</p>
		</template>
		<template #examples>
			<RouteProgressExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="routeProgressExamplesRaw" />
		</template>
		<template #demo>
			<div class="demo">
				<p class="hint">
					The progress bar is rendered above this layout (viewport top). Use the controls to drive it — or navigate to another component and back to see a quick pulse while chunks load.
				</p>
				<UiButton variant="primary" @click="runDemo">Run ~2s demo</UiButton>
			</div>
		</template>
		<template #controls>
			<label class="chk"><input v-model="manualActive" type="checkbox" /> active</label>
			<UiButton size="sm" variant="secondary" @click="runDemo">Run timed demo</UiButton>
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
}

.hint {
	margin: 0;
	font-size: $text-sm;
	color: var(--color-text-secondary);
	line-height: 1.55;
}

.chk {
	@include site.playground-checkbox-row;
}
</style>
