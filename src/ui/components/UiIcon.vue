<script setup lang="ts">
import { computed } from 'vue'
import { icons, type IconName } from '../icons'

const props = withDefaults(
	defineProps<{
		name: IconName
		size?: number | string
	}>(),
	{
		size: 20,
	},
)

const svg = computed(() => icons[props.name])
const pxSize = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
</script>

<template>
	<!-- eslint-disable-next-line vue/no-v-html -- icons are from a trusted internal registry -->
	<i class="ui-icon" :style="{ width: pxSize, height: pxSize }" aria-hidden="true" v-html="svg" />
</template>

<style scoped lang="scss">
.ui-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	line-height: 0;
	font-style: normal;

	:deep(svg) {
		width: 100%;
		height: 100%;
	}
}
</style>
