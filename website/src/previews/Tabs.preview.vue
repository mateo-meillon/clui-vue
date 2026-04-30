<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('a')
const items = [
	{ id: 'a', label: 'One' },
	{ id: 'b', label: 'Two' },
]
</script>

<template>
	<UiTabs v-model="tab" :items="items">
		<template #a><span class="panel">Tab A</span></template>
		<template #b><span class="panel">Tab B</span></template>
	</UiTabs>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.panel {
	display: inline-block;
	padding: 0.25rem 0;
	font-size: $text-md;
}

</style>
