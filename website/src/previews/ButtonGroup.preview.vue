<template>
	<div class="wrap">
		<UiButtonGroup pill>
			<UiButton variant="secondary" size="sm" icon="format_align_left" aria-label="Left" />
			<UiButton variant="secondary" size="sm" icon="format_align_center" aria-label="Center" />
			<UiButton variant="secondary" size="sm" icon="format_align_right" aria-label="Right" />
		</UiButtonGroup>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.wrap {
	display: flex;
	justify-content: center;
}
</style>
