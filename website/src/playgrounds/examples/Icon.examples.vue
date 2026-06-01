<script setup lang="ts">
import type { IconName } from 'clui-vue'

const sampleIconNames: IconName[] = [
	'search',
	'settings',
	'menu',
	'close',
	'add',
	'home',
	'person',
	'mail',
	'calendar_today',
	'notifications',
	'check_circle',
	'report',
	'arrow_back',
	'arrow_forward',
	'chevron_right',
	'chevron_left',
	'light_mode',
	'dark_mode',
	'favorite',
	'bookmark',
	'download',
	'upload',
	'edit',
	'delete',
]
</script>

<template>
	<div class="examples">
		<div class="group">
			<p class="label">Sample Material Symbols (rounded)</p>
			<div class="icon-grid">
				<div v-for="ic in sampleIconNames" :key="ic" class="icon-cell">
					<UiIcon :name="ic" :size="24" />
					<span class="icon-name">{{ ic }}</span>
				</div>
			</div>
			<p class="hint">
				Need a different icon? Search the full catalog at
				<a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer">fonts.google.com/icons</a>.
			</p>
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

.hint {
	margin-top: $space-4;
	font-size: $text-sm;
	color: var(--color-text-secondary);
}
</style>
