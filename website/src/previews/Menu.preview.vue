<template>
	<div class="wrap">
		<UiMenu aria-label="Preview menu">
			<UiMenuItem icon="content_copy">Copy</UiMenuItem>
			<UiMenuItem icon="edit" active>Rename</UiMenuItem>
			<UiMenuItem icon="delete">Delete</UiMenuItem>
		</UiMenu>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.wrap {
	width: min(100%, 13rem);
	padding: $space-1;
	border: 1px solid var(--color-border);
	border-radius: $radius-md;
	background: var(--color-bg-surface);
}
</style>
