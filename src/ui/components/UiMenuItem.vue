<script setup lang="ts">
import type { IconName } from '../types'

defineProps<{
	icon?: IconName
	/** Highlighted as the current/active item. */
	active?: boolean
	/** Selected state in a radio-style menu (renders a check + menuitemradio role). */
	selected?: boolean
	disabled?: boolean
	/** Use `menuitemradio` semantics instead of `menuitem`. */
	radio?: boolean
}>()

const emit = defineEmits<{
	select: [event: MouseEvent]
}>()

function onClick(event: MouseEvent): void {
	emit('select', event)
}
</script>

<template>
	<button
		type="button"
		v-wave
		class="ui-menu-item"
		:class="{ 'ui-menu-item--active': active, 'ui-menu-item--selected': selected }"
		:role="radio ? 'menuitemradio' : 'menuitem'"
		:aria-checked="radio ? selected : undefined"
		:disabled="disabled"
		@click="onClick"
	>
		<UiIcon v-if="icon" class="ui-menu-item__icon" :name="icon" :size="16" />
		<span class="ui-menu-item__label"><slot /></span>
		<UiIcon v-if="radio && selected" class="ui-menu-item__check" name="done" :size="16" />
	</button>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-menu-item {
	display: flex;
	width: 100%;
	align-items: center;
	gap: $space-2;
	padding: $space-2 $space-3;
	border: none;
	border-radius: $radius-sm;
	background: transparent;
	font-family: $font-sans;
	font-size: $text-sm;
	font-weight: 500;
	color: var(--color-text);
	text-align: left;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: background $duration-fast $easing-default;

	&:hover {
		background: var(--color-btn-ghost-bg-hover);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&--active {
		color: var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 12%, transparent);
	}

	&__label {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&__icon {
		flex-shrink: 0;
		color: var(--color-text-secondary);
	}

	&__check {
		flex-shrink: 0;
		color: var(--color-primary);
	}
}
</style>
