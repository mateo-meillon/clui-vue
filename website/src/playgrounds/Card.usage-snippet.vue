<!-- UiCard wraps content with border, radius, and inner padding (`padding`: none | sm | md | lg; default lg). -->
<template>
	<UiCard padding="md">
		<header class="card-head">
			<h2 class="card-title">Profile</h2>
			<UiButton variant="ghost" size="sm">Edit</UiButton>
		</header>
		<p class="card-lede">
			Use cards to group related content—forms, stats blocks, or preview panels—with consistent inner spacing.
		</p>
	</UiCard>
</template>

<style scoped>
.card-head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.75rem;
	margin-bottom: 0.5rem;
}

.card-title {
	margin: 0;
	font-size: 1rem;
	font-weight: 600;
}

.card-lede {
	margin: 0;
	font-size: 0.875rem;
	color: var(--color-text-secondary);
}
</style>
