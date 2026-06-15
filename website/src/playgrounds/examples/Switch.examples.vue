<script setup lang="ts">
import { ref } from 'vue'

const basicOn = ref(true)
const basicOff = ref(false)
const labeled = ref(true)
const smallOn = ref(true)
const disabledOn = ref(true)
const disabledOff = ref(false)
const loadingOn = ref(true)
const loadingOff = ref(false)
</script>

<template>
	<div class="examples">
		<div class="group">
			<p class="label">Basic</p>
			<div class="row">
				<UiSwitch v-model="basicOn" />
				<UiSwitch v-model="basicOff" />
			</div>
		</div>
		<div class="group">
			<p class="label">With labels</p>
			<div class="row">
				<UiSwitch v-model="labeled">
					<template #checked>ON</template>
					<template #unchecked>OFF</template>
				</UiSwitch>
			</div>
		</div>
		<div class="group">
			<p class="label">Small</p>
			<div class="row">
				<UiSwitch v-model="smallOn" size="sm" />
			</div>
		</div>
		<div class="group">
			<p class="label">Disabled</p>
			<div class="row">
				<UiSwitch v-model="disabledOn" disabled />
				<UiSwitch v-model="disabledOff" disabled />
			</div>
		</div>
		<div class="group">
			<p class="label">Loading</p>
			<div class="row">
				<UiSwitch v-model="loadingOn" loading />
				<UiSwitch v-model="loadingOff" loading />
			</div>
		</div>
	</div>
</template>
