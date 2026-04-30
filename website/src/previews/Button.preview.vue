<template>
	<div class="wrap">
		<UiButton size="md" variant="primary">Go</UiButton>
		<UiButton size="md" variant="secondary">Back</UiButton>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.wrap {
	display: flex;
	gap: $space-2;
	flex-wrap: wrap;
	justify-content: center;
}
</style>
