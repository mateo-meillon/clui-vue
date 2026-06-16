<script setup lang="ts">
import { ref } from 'vue'

const exSm = ref('Small')
const exMd = ref('Medium')
const exLg = ref('Large')
const exIcon = ref('Search…')
const exPwd = ref('')
const exDisabled = ref('Read-only')
const exGhostSubject = ref('Quarterly update')
const exGhostContent = ref('Hi team,\n\nHere is the summary for this quarter.')
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
		<div class="group">
			<p class="label">Ghost</p>
			<div class="ghost-panel">
				<UiInput v-model="exGhostSubject" variant="ghost" placeholder="Subject" />
				<UiTextarea v-model="exGhostContent" variant="ghost" :rows="3" placeholder="Write your email…" />
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

.ghost-panel {
	display: flex;
	flex-direction: column;
	gap: $space-2;
	padding: $space-3;
	border: 1px solid var(--color-border);
	border-radius: $radius-md;
	background: var(--color-bg-surface);
}
</style>
