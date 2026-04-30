<script setup lang="ts">
import { ref } from 'vue'

const exName = ref('')
const exMail = ref('')
const exNote = ref('Optional note')
</script>

<template>
	<div class="examples">
		<div class="group">
			<p class="label">Labeled inputs</p>
			<div class="fields">
				<UiFormField label="Full name">
					<UiInput v-model="exName" type="text" placeholder="Ada Lovelace" />
				</UiFormField>
				<UiFormField label="Email">
					<UiInput v-model="exMail" type="email" placeholder="you@example.com" />
				</UiFormField>
				<UiFormField label="Notes">
					<UiInput v-model="exNote" type="text" placeholder="Optional" clearable />
				</UiFormField>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '../../styles/website' as site;
@use 'clui-vue/tokens' as *;

.examples .fields {
	display: flex;
	flex-direction: column;
	gap: $space-4;
	max-width: site.$playground-demo-max-width;
}
</style>
