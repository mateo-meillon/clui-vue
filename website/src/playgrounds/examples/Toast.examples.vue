<script setup lang="ts">
import { toastDanger, toastSuccess, toastWarning } from 'clui-vue'
</script>

<template>
	<div class="examples">
		<div class="group">
			<p class="label">Severities</p>
			<div class="row">
				<UiButton variant="secondary" @click="toastSuccess('Saved successfully.')">Success</UiButton>
				<UiButton variant="secondary" @click="toastWarning('Please review the form.')">Warning</UiButton>
				<UiButton variant="danger" @click="toastDanger('Something went wrong.')">Danger</UiButton>
			</div>
		</div>
		<div class="group">
			<p class="label">With title</p>
			<div class="row">
				<UiButton variant="ghost" size="sm" @click="toastSuccess('Copied to clipboard.', { title: 'Copied' })">Title + body</UiButton>
			</div>
		</div>
	</div>
</template>
