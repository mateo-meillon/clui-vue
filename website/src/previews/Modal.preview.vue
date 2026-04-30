<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
	<div class="wrap">
		<UiButton size="md" variant="primary" @click="open = true">Open modal</UiButton>
		<UiModal v-model="open" title="Unsaved changes">
			<p class="copy">
				You edited <strong>Notification defaults</strong>. If you close this dialog without saving, your updates will be discarded.
			</p>
			<template #footer>
				<UiButton size="md" variant="secondary" @click="open = false">Discard</UiButton>
				<UiButton size="md" variant="primary" @click="open = false">Save changes</UiButton>
			</template>
		</UiModal>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.wrap {
	display: flex;
	align-items: center;
	justify-content: center;

	.copy {
		margin: 0;
		font-size: $text-md;
		line-height: 1.5;
		color: var(--color-text-secondary);
	}
}
</style>
