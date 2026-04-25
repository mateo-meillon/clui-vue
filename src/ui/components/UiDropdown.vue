<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'

withDefaults(
	defineProps<{
		/** Menu alignment relative to trigger */
		align?: 'start' | 'end'
	}>(),
	{
		align: 'end',
	},
)

const open = ref(false)
const root = ref<HTMLElement | null>(null)
let docClickHandler: ((e: MouseEvent) => void) | null = null

function removeDocClick(): void {
	if (docClickHandler) {
		document.removeEventListener('click', docClickHandler)
		docClickHandler = null
	}
}

function close(): void {
	open.value = false
}

function toggle(): void {
	open.value = !open.value
}

function onEscape(e: KeyboardEvent): void {
	if (e.key === 'Escape') close()
}

watch(open, (isOpen) => {
	removeDocClick()
	if (isOpen) {
		document.addEventListener('keydown', onEscape)
		nextTick(() => {
			docClickHandler = (e: MouseEvent) => {
				if (root.value && !root.value.contains(e.target as Node)) close()
			}
			document.addEventListener('click', docClickHandler)
		})
	} else {
		document.removeEventListener('keydown', onEscape)
	}
})

onUnmounted(() => {
	removeDocClick()
	document.removeEventListener('keydown', onEscape)
})
</script>

<template>
	<div ref="root" class="ui-dropdown">
		<div class="ui-dropdown__anchor">
			<slot name="trigger" :is-open="open" :toggle="toggle" :close="close" />
		</div>
		<Transition name="ui-dropdown">
			<div v-if="open" class="ui-dropdown__panel" :class="`ui-dropdown__panel--align-${align}`" role="menu" aria-orientation="vertical">
				<slot :close="close" />
			</div>
		</Transition>
	</div>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-dropdown {
	position: relative;
	display: inline-flex;
	align-items: center;
}

.ui-dropdown__anchor {
	display: flex;
	align-items: center;
}

.ui-dropdown__panel {
	position: absolute;
	top: calc(100% + #{$space-2});
	// Must float above app content (e.g., editors with their own stacking contexts).
	z-index: 6000;
	min-width: 11rem;
	padding: $space-1;
	background: var(--color-bg-surface);
	border: 1px solid var(--color-border);
	border-radius: $radius-md;
	box-shadow: 0 12px 40px var(--color-shadow);
	display: flex;
	flex-direction: column;
	gap: $space-1;

	&--align-start {
		left: 0;
	}

	&--align-end {
		right: 0;
	}
}

:deep(.ui-dropdown__item) {
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
	transition: background $duration-fast $easing-default;

	&:hover {
		background: var(--color-btn-ghost-bg-hover);
	}
}

.ui-dropdown-enter-active,
.ui-dropdown-leave-active {
	transition:
		opacity $duration-normal $easing-default,
		transform $duration-normal $easing-default;
}

.ui-dropdown-enter-from,
.ui-dropdown-leave-to {
	opacity: 0;
	transform: translateY(-4px);
}
</style>
