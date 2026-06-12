<template>
	<div class="examples">
		<div class="group">
			<p class="label">Basic</p>
			<div class="row">
				<UiTooltip content="Save your changes">
					<UiButton variant="secondary" size="sm">Hover me</UiButton>
				</UiTooltip>
				<UiTooltip content="More information">
					<UiButton variant="ghost" size="sm" icon="info" aria-label="Info" />
				</UiTooltip>
			</div>
		</div>

		<div class="group">
			<p class="label">Placements</p>
			<div class="placement-grid">
				<UiTooltip content="Top" placement="top">
					<UiButton variant="secondary" size="sm">Top</UiButton>
				</UiTooltip>
				<UiTooltip content="Bottom" placement="bottom">
					<UiButton variant="secondary" size="sm">Bottom</UiButton>
				</UiTooltip>
				<UiTooltip content="Left" placement="left">
					<UiButton variant="secondary" size="sm">Left</UiButton>
				</UiTooltip>
				<UiTooltip content="Right" placement="right">
					<UiButton variant="secondary" size="sm">Right</UiButton>
				</UiTooltip>
			</div>
		</div>

		<div class="group">
			<p class="label">Rich content</p>
			<UiTooltip placement="bottom">
				<UiIcon name="help" />
				<template #content> <strong>Tip:</strong> Use keyboard shortcuts to work faster. </template>
			</UiTooltip>
		</div>

		<div class="group">
			<p class="label">Long text</p>
			<UiTooltip content="This tooltip wraps longer helper text so it stays readable without stretching across the whole viewport." :max-width="200">
				<UiButton variant="ghost" size="sm">Long tooltip</UiButton>
			</UiTooltip>
		</div>

		<div class="group">
			<p class="label">Disabled</p>
			<UiTooltip content="You should not see this" disabled>
				<UiButton variant="secondary" size="sm">No tooltip</UiButton>
			</UiTooltip>
		</div>

		<div class="group">
			<p class="label">Viewport flip</p>
			<p class="hint">Tooltips near viewport edges flip to stay visible.</p>
			<div class="corner-demo">
				<UiTooltip content="Flips when needed" placement="top" class="corner-demo__bl">
					<UiButton variant="secondary" size="sm">Bottom left</UiButton>
				</UiTooltip>
				<UiTooltip content="Flips when needed" placement="top" class="corner-demo__br">
					<UiButton variant="secondary" size="sm">Bottom right</UiButton>
				</UiTooltip>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.row,
.placement-grid {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: $space-4;
}

.hint {
	margin: 0 0 $space-3;
	font-size: $text-sm;
	color: var(--color-text-muted, #{$color-gray-500});
}

.corner-demo {
	position: relative;
	min-height: 10rem;
}

.corner-demo__bl {
	position: absolute;
	bottom: $space-4;
	left: $space-4;
}

.corner-demo__br {
	position: absolute;
	bottom: $space-4;
	right: $space-4;
}
</style>
