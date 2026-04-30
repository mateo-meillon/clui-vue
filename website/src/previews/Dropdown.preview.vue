<template>
	<div class="wrap">
		<UiDropdown>
			<template #trigger="{ toggle }">
				<UiButton size="md" variant="secondary" @click="toggle">Menu</UiButton>
			</template>
			<template #default="{ close }">
				<button type="button" class="ui-dropdown-item" @click="close">Item</button>
			</template>
		</UiDropdown>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.wrap {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
