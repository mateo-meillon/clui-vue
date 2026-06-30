<template>
	<div class="wrap">
		<UiTextarea :model-value="text" :rows="3" placeholder="Write a note…" />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('Multi-line text input\nwith resizable height.')
</script>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.wrap {
	width: min(100%, 18rem);
}
</style>
