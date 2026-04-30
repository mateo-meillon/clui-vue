<template>
	<div class="examples">
		<div class="group">
			<p class="label">Variants</p>
			<div class="row">
				<UiButton variant="primary">Primary</UiButton>
				<UiButton variant="secondary">Secondary</UiButton>
				<UiButton variant="ghost">Ghost</UiButton>
				<UiButton variant="danger">Danger</UiButton>
			</div>
		</div>
		<div class="group">
			<p class="label">Sizes</p>
			<div class="row">
				<UiButton size="sm" variant="primary">Small</UiButton>
				<UiButton size="md" variant="primary">Medium</UiButton>
				<UiButton size="lg" variant="primary">Large</UiButton>
			</div>
		</div>
		<div class="group">
			<p class="label">With icon</p>
			<div class="row">
				<UiButton variant="primary" icon="add">New item</UiButton>
				<UiButton variant="secondary" icon="search">Search</UiButton>
				<UiButton variant="ghost" icon="settings">Settings</UiButton>
			</div>
		</div>
		<div class="group">
			<p class="label">Icon only</p>
			<div class="row">
				<UiButton variant="secondary" icon="close" aria-label="Close" />
				<UiButton variant="primary" rounded icon="add" aria-label="Add" />
				<UiButton variant="ghost" size="sm" icon="menu" aria-label="Menu" />
			</div>
		</div>
		<div class="group">
			<p class="label">States</p>
			<div class="row">
				<UiButton variant="primary" disabled>Disabled</UiButton>
				<UiButton variant="secondary" active>Active</UiButton>
				<UiButton variant="primary" loading>Loading</UiButton>
			</div>
		</div>
		<div class="group">
			<p class="label">Block</p>
			<div class="block-sample">
				<UiButton variant="secondary" block>Full width</UiButton>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.block-sample {
	width: min(100%, 14rem);
}
</style>
