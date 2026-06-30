<script setup lang="ts">
import { ref } from 'vue'

const sort = ref('name')
</script>

<template>
	<div class="examples">
		<div class="group">
			<p class="label">Inside a dropdown</p>
			<div class="row">
				<UiDropdown align="start">
					<template #trigger="{ isOpen, toggle }">
						<UiButton variant="secondary" size="sm" :active="isOpen" @click="toggle">File {{ isOpen ? '▲' : '▼' }}</UiButton>
					</template>
					<template #default="{ close }">
						<UiMenu aria-label="File actions">
							<UiMenuItem icon="open_in_new" @select="close">Open</UiMenuItem>
							<UiMenuItem icon="content_copy" @select="close">Duplicate</UiMenuItem>
							<UiMenuItem icon="delete" @select="close">Delete</UiMenuItem>
						</UiMenu>
					</template>
				</UiDropdown>
			</div>
		</div>

		<div class="group">
			<p class="label">Radio menu (single select)</p>
			<div class="row">
				<UiMenu aria-label="Sort by" class="standalone">
					<UiMenuItem radio :selected="sort === 'name'" @select="sort = 'name'">Name</UiMenuItem>
					<UiMenuItem radio :selected="sort === 'date'" @select="sort = 'date'">Date modified</UiMenuItem>
					<UiMenuItem radio :selected="sort === 'size'" @select="sort = 'size'">Size</UiMenuItem>
				</UiMenu>
			</div>
		</div>

		<div class="group">
			<p class="label">States</p>
			<div class="row">
				<UiMenu aria-label="States" class="standalone">
					<UiMenuItem icon="star" active>Active</UiMenuItem>
					<UiMenuItem icon="block" disabled>Disabled</UiMenuItem>
				</UiMenu>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.standalone {
	width: min(100%, 14rem);
	padding: $space-1;
	border: 1px solid var(--color-border);
	border-radius: $radius-md;
	background: var(--color-bg-surface);
}
</style>
