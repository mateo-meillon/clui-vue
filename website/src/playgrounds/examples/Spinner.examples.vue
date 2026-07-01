<template>
	<div class="stack">
		<div class="row">
			<UiSpinner :size="14" />
			<UiSpinner :size="18" />
			<UiSpinner :size="24" />
		</div>

		<div class="row">
			<UiSpinner class="primary" :size="20" />
			<UiSpinner class="muted" :size="20" />
			<UiSpinner class="danger" :size="20" />
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.stack {
	display: flex;
	flex-direction: column;
	gap: $space-4;
}

.row {
	display: flex;
	align-items: center;
	gap: $space-4;
}

.primary {
	color: var(--color-primary);
}

.muted {
	color: var(--color-text-secondary);
}

.danger {
	color: var(--color-text-danger);
}
</style>
