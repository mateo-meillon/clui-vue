<template>
	<div class="examples">
		<div class="group">
			<p class="label">Triggers</p>
			<div class="droprow">
				<UiDropdown align="start">
					<template #trigger="{ isOpen, toggle }">
						<UiButton variant="secondary" size="sm" :active="isOpen" @click="toggle">Align start</UiButton>
					</template>
					<template #default="{ close }">
						<button type="button" class="ui-dropdown-item" @click="close">Profile</button>
						<button type="button" class="ui-dropdown-item" @click="close">Sign out</button>
					</template>
				</UiDropdown>
				<UiDropdown align="end">
					<template #trigger="{ isOpen, toggle }">
						<UiButton variant="ghost" size="sm" :active="isOpen" @click="toggle">Align end</UiButton>
					</template>
					<template #default="{ close }">
						<button type="button" class="ui-dropdown-item" @click="close">Copy</button>
						<button type="button" class="ui-dropdown-item" @click="close">Paste</button>
					</template>
				</UiDropdown>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.droprow {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	gap: $space-4;
}
</style>
