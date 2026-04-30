<template>
	<div class="examples">
		<div class="group">
			<p class="label">Common variants</p>
			<div class="skel-showcase">
				<UiSkeleton variant="line" width="10rem" />
				<UiSkeleton variant="heading" width="min(100%, 14rem)" />
				<UiSkeleton variant="text" :lines="3" />
				<div class="skel-inline">
					<UiSkeleton variant="circle" :size="44" />
					<div class="skel-inline-text">
						<UiSkeleton variant="line" width="8rem" />
						<UiSkeleton variant="text" :lines="2" />
					</div>
				</div>
				<UiSkeleton variant="rect" width="100%" height="4rem" />
				<UiSkeleton variant="button" width="6rem" />
				<UiSkeleton variant="card" width="100%" :lines="4" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '../../styles/website' as site;
@use 'clui-vue/tokens' as *;

.skel-showcase {
	display: flex;
	flex-direction: column;
	gap: $space-5;
	max-width: site.$playground-demo-max-width;
}

.skel-inline {
	display: flex;
	align-items: flex-start;
	gap: $space-3;
}

.skel-inline-text {
	flex: 1;
	min-width: 0;
	display: flex;
	flex-direction: column;
	gap: $space-3;
}
</style>
