<template>
	<UiCard padding="md" class="wrap">
		<p class="copy">Content</p>
	</UiCard>
</template>

<style scoped lang="scss">
@use '../styles/website' as site;
@use 'clui-vue/tokens' as *;

.wrap {
	width: 100%;
	max-width: site.$preview-form-field-max-width;

	.copy {
		margin: 0;
		font-size: $text-md;
		color: var(--color-text-secondary);
	}
}
</style>
