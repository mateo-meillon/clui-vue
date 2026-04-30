<template>
	<div class="examples">
		<div class="group">
			<p class="label">Padding presets</p>
			<div class="cards-row">
				<UiCard padding="none">
					<p class="card-tag">none</p>
				</UiCard>
				<UiCard padding="sm">
					<p class="card-tag">sm</p>
				</UiCard>
				<UiCard padding="md">
					<p class="card-tag">md</p>
				</UiCard>
				<UiCard padding="lg">
					<p class="card-tag">lg</p>
				</UiCard>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.cards-row {
	display: flex;
	flex-wrap: wrap;
	gap: $space-4;
	align-items: stretch;
}

.card-tag {
	margin: 0;
	font-size: $text-sm;
	color: var(--color-text-secondary);
}
</style>
