<script setup lang="ts">
import { ref } from 'vue'

const exOpenSm = ref(false)
const exOpenMd = ref(false)
const exOpenLg = ref(false)
</script>

<template>
	<div class="examples">
		<div class="group">
			<p class="label">Sizes</p>
			<div class="row">
				<UiButton size="sm" variant="secondary" @click="exOpenSm = true">Small</UiButton>
				<UiButton variant="secondary" @click="exOpenMd = true">Medium</UiButton>
				<UiButton size="lg" variant="secondary" @click="exOpenLg = true">Large</UiButton>
			</div>
			<UiModal v-model="exOpenSm" title="Small dialog" size="sm">
				<p class="ex-muted">Compact width for confirmations.</p>
				<template #footer>
					<UiButton variant="primary" size="sm" @click="exOpenSm = false">OK</UiButton>
				</template>
			</UiModal>
			<UiModal v-model="exOpenMd" title="Medium dialog" size="md">
				<p class="ex-muted">Default width for most forms.</p>
				<template #footer>
					<UiButton variant="ghost" @click="exOpenMd = false">Cancel</UiButton>
					<UiButton variant="primary" @click="exOpenMd = false">Save</UiButton>
				</template>
			</UiModal>
			<UiModal v-model="exOpenLg" title="Large dialog" size="lg">
				<p class="ex-muted">Wide layout for dense content.</p>
				<template #footer>
					<UiButton variant="primary" @click="exOpenLg = false">Done</UiButton>
				</template>
			</UiModal>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.ex-muted {
	margin: 0;
	font-size: $text-sm;
	color: var(--color-text-secondary);
}
</style>
