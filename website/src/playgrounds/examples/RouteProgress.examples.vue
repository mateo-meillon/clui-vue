<template>
	<div class="examples">
		<div class="group">
			<p class="label">Gallery integration</p>
			<p class="examples-copy">
				On this site, <code>UiRouteProgress</code> is mounted once in the gallery shell (next to <code>UiToastHost</code>). It turns on while this SPA navigates between routes and while you use the live-demo controls on this page.
			</p>
			<p class="examples-copy">
				The bar is <strong>fixed at the top of the viewport</strong> — watch above the header when you toggle <strong>active</strong> or run the timed demo.
			</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.examples-copy {
	margin: 0;
	font-size: $text-sm;
	color: var(--color-text-secondary);
	line-height: 1.55;

	&:not(:last-child) {
		margin-bottom: $space-3;
	}

	code {
		font-size: 0.9em;
	}
}
</style>
