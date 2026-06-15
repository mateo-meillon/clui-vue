<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { getDropdownPanelStyle, type DropdownPlacement } from '../dropdownPlacement'

const props = withDefaults(
	defineProps<{
		/** Preferred menu alignment relative to trigger */
		align?: 'start' | 'end'
	}>(),
	{
		align: 'start',
	},
)

/** Matches $space-2 in tokens */
const PANEL_GAP = 6

const open = ref(false)
const root = ref<HTMLElement | null>(null)
const anchorRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const placementReady = ref(false)
const resolvedPlacement = ref<DropdownPlacement>('bottom-start')
const panelTop = ref(0)
const panelLeft = ref(0)
const panelMinWidth = ref<number | undefined>(undefined)

let docClickHandler: ((e: MouseEvent) => void) | null = null
let repositionHandler: (() => void) | null = null
let resizeObserver: ResizeObserver | null = null
let placementFrame: number | null = null

const panelVertical = computed(() => (resolvedPlacement.value.startsWith('top') ? 'top' : 'bottom'))

const panelInlineStyle = computed(() => ({
	top: `${panelTop.value}px`,
	left: `${panelLeft.value}px`,
	minWidth: panelMinWidth.value ? `${panelMinWidth.value}px` : undefined,
	visibility: (placementReady.value ? 'visible' : 'hidden') as 'visible' | 'hidden',
}))

function removeDocClick(): void {
	if (docClickHandler) {
		document.removeEventListener('click', docClickHandler)
		docClickHandler = null
	}
}

function removeRepositionListeners(): void {
	if (repositionHandler) {
		window.removeEventListener('resize', repositionHandler)
		window.removeEventListener('scroll', repositionHandler, true)
		repositionHandler = null
	}
}

function cancelPlacementFrame(): void {
	if (placementFrame !== null) {
		cancelAnimationFrame(placementFrame)
		placementFrame = null
	}
}

function removeResizeObserver(): void {
	resizeObserver?.disconnect()
	resizeObserver = null
}

function updatePlacement(): void {
	const anchor = anchorRef.value
	const panel = panelRef.value
	if (!anchor || !panel) return

	const anchorRect = anchor.getBoundingClientRect()
	const panelRect = panel.getBoundingClientRect()
	const style = getDropdownPanelStyle(anchorRect, panelRect, props.align, PANEL_GAP)

	resolvedPlacement.value = style.placement
	panelTop.value = style.top
	panelLeft.value = style.left
	panelMinWidth.value = style.minWidth
	placementReady.value = true
}

function schedulePlacement(): void {
	cancelPlacementFrame()
	nextTick(() => {
		placementFrame = requestAnimationFrame(() => {
			placementFrame = null
			updatePlacement()
		})
	})
}

function addResizeObserver(): void {
	removeResizeObserver()
	const panel = panelRef.value
	if (!panel) return

	resizeObserver = new ResizeObserver(() => schedulePlacement())
	resizeObserver.observe(panel)
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

function addRepositionListeners(): void {
	removeRepositionListeners()
	repositionHandler = () => schedulePlacement()
	window.addEventListener('resize', repositionHandler)
	window.addEventListener('scroll', repositionHandler, true)
}

watch(open, (isOpen) => {
	removeDocClick()
	removeRepositionListeners()
	removeResizeObserver()

	if (isOpen) {
		placementReady.value = false
		resolvedPlacement.value = `bottom-${props.align}` as DropdownPlacement
		panelMinWidth.value = anchorRef.value?.getBoundingClientRect().width
		document.addEventListener('keydown', onEscape)
		addRepositionListeners()

		schedulePlacement()
		nextTick(() => {
			addResizeObserver()
			docClickHandler = (e: MouseEvent) => {
				const target = e.target as Node
				const insideRoot = root.value?.contains(target) ?? false
				const insidePanel = panelRef.value?.contains(target) ?? false
				if (!insideRoot && !insidePanel) close()
			}
			document.addEventListener('click', docClickHandler)
		})
	} else {
		placementReady.value = false
		panelMinWidth.value = undefined
		panelTop.value = 0
		panelLeft.value = 0
		document.removeEventListener('keydown', onEscape)
	}
})

onUnmounted(() => {
	cancelPlacementFrame()
	removeDocClick()
	removeRepositionListeners()
	removeResizeObserver()
	document.removeEventListener('keydown', onEscape)
})
</script>

<template>
	<div ref="root" class="ui-dropdown">
		<div ref="anchorRef" class="ui-dropdown__anchor">
			<slot name="trigger" :is-open="open" :toggle="toggle" :close="close" />
		</div>
		<Teleport to="body">
			<Transition :name="`ui-dropdown-${panelVertical}`">
				<div v-if="open" ref="panelRef" class="ui-dropdown__panel" :class="`ui-dropdown__panel--${panelVertical}`" :style="panelInlineStyle" role="menu" aria-orientation="vertical">
					<slot :close="close" />
				</div>
			</Transition>
		</Teleport>
	</div>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-dropdown {
	display: inline-flex;
	align-items: center;
}

.ui-dropdown__anchor {
	display: flex;
	align-items: center;
}

.ui-dropdown__panel {
	position: fixed;
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
}

:deep(.ui-dropdown__item),
:deep(.ui-dropdown-item) {
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

.ui-dropdown-bottom-enter-active,
.ui-dropdown-bottom-leave-active,
.ui-dropdown-top-enter-active,
.ui-dropdown-top-leave-active {
	transition:
		opacity $duration-normal $easing-default,
		transform $duration-normal $easing-default;
}

.ui-dropdown-bottom-enter-from,
.ui-dropdown-bottom-leave-to {
	opacity: 0;
	transform: translateY(-4px);
}

.ui-dropdown-top-enter-from,
.ui-dropdown-top-leave-to {
	opacity: 0;
	transform: translateY(4px);
}
</style>
