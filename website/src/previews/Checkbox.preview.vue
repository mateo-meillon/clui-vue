<template>
	<div class="preview">
		<UiCheckbox :model-value="true" size="md" />
		<UiCheckbox :model-value="false" size="md" />
		<UiCheckbox :model-value="false" indeterminate size="md" />
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.preview {
	display: flex;
	align-items: center;
	gap: $space-3;
}
</style>
