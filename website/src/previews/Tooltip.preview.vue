<template>
	<div class="wrap">
		<UiTooltip content="Tooltip">
			<UiButton size="md" variant="secondary">Hover</UiButton>
		</UiTooltip>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.wrap {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
