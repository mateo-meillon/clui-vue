<template>
	<div class="wrap">
		<UiIcon name="search" :size="24" />
		<UiIcon name="settings" :size="24" />
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.wrap {
	display: flex;
	gap: $space-2;
}
</style>
