<script setup lang="ts">
import { ref } from 'vue'

const basic = ref(true)
const off = ref(false)
const mixed = ref(false)
const disabledOn = ref(true)
const disabledOff = ref(false)
</script>

<template>
	<div class="examples">
		<div class="group">
			<p class="label">States</p>
			<div class="row">
				<UiCheckbox v-model="basic">Checked</UiCheckbox>
				<UiCheckbox v-model="off">Unchecked</UiCheckbox>
				<UiCheckbox v-model="mixed" indeterminate>Mixed</UiCheckbox>
			</div>
		</div>

		<div class="group">
			<p class="label">Labels</p>
			<div class="stack">
				<UiCheckbox v-model="basic" label="Email reports" description="Send a summary every Monday." />
				<UiCheckbox v-model="off" label="Compact rows" description="Use tighter spacing in dense screens." />
			</div>
		</div>

		<div class="group">
			<p class="label">Disabled</p>
			<div class="row">
				<UiCheckbox v-model="disabledOn" disabled>Checked</UiCheckbox>
				<UiCheckbox v-model="disabledOff" disabled>Unchecked</UiCheckbox>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.stack {
	display: flex;
	flex-direction: column;
	gap: $space-3;
}
</style>
