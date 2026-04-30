<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'clui-vue'

function onShow(): void {
	showToast('Hello from the overview card.', { title: 'Toast preview' })
}
</script>

<template>
	<div class="wrap">
		<UiButton size="md" variant="secondary" @click="onShow">Show toast</UiButton>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.wrap {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
