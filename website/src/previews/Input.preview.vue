<script setup lang="ts">
import { ref } from 'vue'

const value = ref('Preview')
</script>

<template>
	<div class="wrap">
		<UiInput v-model="value" size="md" />
	</div>
</template>

<style scoped lang="scss">
@use '../styles/website' as site;

.wrap {
	max-width: site.$preview-input-max-width;
}
</style>
