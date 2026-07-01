<template>
	<div class="wrap">
		<UiSpinner :size="22" />
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.wrap {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	color: var(--color-primary);
}
</style>
