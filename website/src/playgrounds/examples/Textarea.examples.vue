<script setup lang="ts">
import { ref } from 'vue'

const a = ref('Default variant')
const b = ref('Ghost variant')
const c = ref('')
const d = ref('Type to grow this field automatically. Add more lines and it expands up to its max height before scrolling.')
</script>

<template>
	<div class="examples">
		<div class="group">
			<p class="label">Default</p>
			<div class="stack">
				<UiTextarea v-model="a" :rows="3" />
			</div>
		</div>
		<div class="group">
			<p class="label">Ghost</p>
			<div class="stack">
				<UiTextarea v-model="b" variant="ghost" :rows="3" />
			</div>
		</div>
		<div class="group">
			<p class="label">Bare (no chrome)</p>
			<div class="stack">
				<UiTextarea v-model="c" variant="bare" :rows="2" placeholder="Borderless, transparent…" />
			</div>
		</div>
		<div class="group">
			<p class="label">Auto-resize</p>
			<div class="stack">
				<UiTextarea v-model="d" auto-resize :max-height="200" :rows="1" />
			</div>
		</div>
		<div class="group">
			<p class="label">Disabled</p>
			<div class="stack">
				<UiTextarea model-value="Read only content" disabled :rows="2" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.stack {
	width: min(100%, 22rem);
}
</style>
