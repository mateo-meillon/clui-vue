<template>
	<div class="wrap">
		<UiRadio :checked="true" size="md" />
		<UiRadio :checked="false" size="md" />
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
