<script setup lang="ts">
import { icons, type IconName } from 'clui-vue'

const allIconNames = (Object.keys(icons) as IconName[]).slice().sort((a, b) => a.localeCompare(b))
</script>

<template>
	<div class="examples">
		<div class="group">
			<p class="label">All icons (registry)</p>
			<div class="icon-grid">
				<div v-for="ic in allIconNames" :key="ic" class="icon-cell">
					<UiIcon :name="ic" :size="24" />
					<span class="icon-name">{{ ic }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.icon-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(6.5rem, 1fr));
	gap: $space-4;
}

.icon-cell {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: $space-2;
	text-align: center;
}

.icon-name {
	font-size: $text-xs;
	color: var(--color-text-secondary);
	word-break: break-all;
	line-height: 1.3;
}
</style>
