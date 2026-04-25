<script setup lang="ts">
withDefaults(
	defineProps<{
		label?: string
	}>(),
	{
		label: undefined,
	},
)
</script>

<template>
	<label class="ui-form-field">
		<span v-if="label" class="ui-form-field__label">{{ label }}</span>
		<slot />
	</label>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-form-field {
	display: flex;
	flex-direction: column;
	gap: $space-1;

	&__label {
		font-size: $text-sm;
		font-weight: 500;
		color: var(--color-text-secondary);
	}
}
</style>
