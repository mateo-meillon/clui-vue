<script setup lang="ts">
import { ref } from 'vue'

const exSm = ref('Small')
const exMd = ref('Medium')
const exLg = ref('Large')
const exIcon = ref('Search…')
const exPwd = ref('')
const exDisabled = ref('Read-only')
</script>

<template>
	<div class="examples">
		<div class="group">
			<p class="label">Sizes</p>
			<div class="cluster">
				<UiInput v-model="exSm" size="sm" placeholder="Small" />
				<UiInput v-model="exMd" size="md" placeholder="Medium" />
				<UiInput v-model="exLg" size="lg" placeholder="Large" />
			</div>
		</div>
		<div class="group">
			<p class="label">Icon &amp; clear</p>
			<div class="cluster">
				<UiInput v-model="exIcon" icon="search" clearable clear-aria-label="Clear search" placeholder="Search…" />
			</div>
		</div>
		<div class="group">
			<p class="label">Password</p>
			<div class="cluster">
				<UiInput v-model="exPwd" type="password" placeholder="Password" autocomplete="off" />
			</div>
		</div>
		<div class="group">
			<p class="label">Disabled</p>
			<div class="cluster">
				<UiInput v-model="exDisabled" disabled placeholder="Disabled" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.examples .cluster {
	align-items: stretch;

	:deep(.ui-input) {
		min-width: min(100%, 12rem);
	}
}
</style>
