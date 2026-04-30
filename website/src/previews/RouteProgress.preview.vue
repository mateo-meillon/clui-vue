<template>
	<div class="wrap">
		<div class="track">
			<div class="fill" />
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '../styles/website' as site;
@use 'clui-vue/tokens' as *;

.wrap {
	width: 100%;
	max-width: site.$preview-cluster-max-width;

	.track {
		height: 4px;
		border-radius: $radius-full;
		overflow: hidden;
		background: color-mix(in srgb, var(--color-primary) 22%, transparent);

		.fill {
			height: 100%;
			width: 40%;
			background: var(--color-primary);
			border-radius: 0 $radius-full $radius-full 0;
		}
	}
}
</style>
