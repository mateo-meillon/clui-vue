<script setup lang="ts">
import { ref } from 'vue'

const email = ref('you@example.com')
</script>

<template>
	<div class="wrap">
		<UiFormField label="Email">
			<UiInput v-model="email" size="md" type="email" />
		</UiFormField>
	</div>
</template>

<style scoped lang="scss">
@use '../styles/website' as site;

.wrap {
	width: 100%;
	max-width: site.$preview-form-field-max-width;
}
</style>
