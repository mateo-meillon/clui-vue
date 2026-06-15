<template>
	<div class="wrap">
		<UiSwitch :model-value="true" size="md" />
		<UiSwitch :model-value="false" size="md" />
		<UiSwitch :model-value="true" size="sm" />
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.wrap {
	display: flex;
	gap: $space-2;
	align-items: center;
}
</style>
