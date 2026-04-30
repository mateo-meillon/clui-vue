<template>
	<div class="wrap">
		<UiSkeleton variant="heading" width="55%" height="0.65rem" :animated="true" />
		<UiSkeleton variant="line" width="100%" height="0.45rem" :animated="true" />
		<UiSkeleton variant="line" width="80%" height="0.45rem" :animated="true" />
	</div>
</template>

<style scoped lang="scss">
@use '../styles/website' as site;
@use 'clui-vue/tokens' as *;

.wrap {
	display: flex;
	flex-direction: column;
	gap: $space-2;
	width: 100%;
	max-width: site.$preview-cluster-max-width;
}
</style>
