<script setup lang="ts">
import { computed } from 'vue'
import type { IconName } from '../types'

const props = withDefaults(
	defineProps<{
		name: IconName
		size?: number | string
	}>(),
	{
		size: 20,
	},
)

const pxSize = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))
</script>

<template>
	<span class="ui-icon material-symbols-rounded" :style="{ fontSize: pxSize, width: pxSize, height: pxSize }" aria-hidden="true">{{ name }}</span>
</template>

<style scoped lang="scss">
.ui-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
	line-height: 1;
	font-style: normal;
	font-weight: normal;
	user-select: none;
	color: currentColor;
	font-variation-settings: 'FILL' 0;
	overflow: hidden;
}
</style>
