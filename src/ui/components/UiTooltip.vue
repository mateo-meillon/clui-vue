<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, useId, useSlots, watch } from 'vue'
import { getTooltipPanelStyle, type TooltipAlign, type TooltipPlacement } from '../tooltipPlacement'

const props = withDefaults(
	defineProps<{
		/** Tooltip text when #content slot is not used */
		content?: string
		/** Preferred side relative to trigger */
		placement?: TooltipPlacement
		/** Alignment along the cross axis */
		align?: TooltipAlign
		/** Milliseconds before the tooltip appears */
		delay?: number
		/** Suppress tooltip display */
		disabled?: boolean
		/** Maximum panel width in pixels */
		maxWidth?: number
	}>(),
	{
		content: undefined,
		placement: 'top',
		align: 'center',
		delay: 200,
		disabled: false,
		maxWidth: 240,
	},
)

const slots = useSlots()
const tooltipId = useId()

/** Matches $space-2 in tokens */
const PANEL_GAP = 6

const visible = ref(false)
const anchorRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const placementReady = ref(false)
const resolvedPlacement = ref<TooltipPlacement>('top')
const panelTop = ref(0)
const panelLeft = ref(0)

let showTimer: ReturnType<typeof setTimeout> | null = null
let repositionHandler: (() => void) | null = null

const hasContent = computed(() => Boolean(slots.content) || Boolean(props.content))

const panelInlineStyle = computed(() => ({
	top: `${panelTop.value}px`,
	left: `${panelLeft.value}px`,
	maxWidth: `${props.maxWidth}px`,
	visibility: (placementReady.value ? 'visible' : 'hidden') as 'visible' | 'hidden',
}))

function clearShowTimer(): void {
	if (showTimer) {
		clearTimeout(showTimer)
		showTimer = null
	}
}

function removeRepositionListeners(): void {
	if (repositionHandler) {
		window.removeEventListener('resize', repositionHandler)
		window.removeEventListener('scroll', repositionHandler, true)
		repositionHandler = null
	}
}

function updatePlacement(): void {
	const anchor = anchorRef.value
	const panel = panelRef.value
	if (!anchor || !panel) return

	const anchorRect = anchor.getBoundingClientRect()
	const panelRect = panel.getBoundingClientRect()
	const style = getTooltipPanelStyle(anchorRect, panelRect, props.placement, props.align, PANEL_GAP)

	resolvedPlacement.value = style.placement
	panelTop.value = style.top
	panelLeft.value = style.left
	placementReady.value = true
}

function addRepositionListeners(): void {
	removeRepositionListeners()
	repositionHandler = () => updatePlacement()
	window.addEventListener('resize', repositionHandler)
	window.addEventListener('scroll', repositionHandler, true)
}

function show(): void {
	if (props.disabled || !hasContent.value) return

	clearShowTimer()
	showTimer = setTimeout(() => {
		visible.value = true
	}, props.delay)
}

function hide(): void {
	clearShowTimer()
	visible.value = false
}

watch(visible, (isVisible) => {
	removeRepositionListeners()

	if (isVisible) {
		placementReady.value = false
		resolvedPlacement.value = props.placement
		addRepositionListeners()

		nextTick(() => {
			updatePlacement()
		})
	} else {
		placementReady.value = false
	}
})

onUnmounted(() => {
	clearShowTimer()
	removeRepositionListeners()
})
</script>

<template>
	<div class="ui-tooltip">
		<span ref="anchorRef" class="ui-tooltip__anchor" :aria-describedby="visible ? tooltipId : undefined" @mouseenter="show" @mouseleave="hide" @focusin="show" @focusout="hide">
			<slot />
		</span>
		<Teleport to="body">
			<Transition name="ui-tooltip-fade">
				<div v-if="visible" :id="tooltipId" ref="panelRef" class="ui-tooltip__panel" :class="`ui-tooltip__panel--${resolvedPlacement}`" :style="panelInlineStyle" role="tooltip">
					<slot name="content">{{ content }}</slot>
				</div>
			</Transition>
		</Teleport>
	</div>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-tooltip {
	display: inline-flex;
	align-items: center;
}

.ui-tooltip__anchor {
	display: inline-flex;
	align-items: center;
}

.ui-tooltip__panel {
	position: fixed;
	z-index: 6500;
	padding: $space-2 $space-3;
	background: var(--color-tooltip-bg);
	color: var(--color-tooltip-text);
	border-radius: $radius-md;
	box-shadow: 0 4px 16px var(--color-shadow);
	font-family: $font-sans;
	font-size: $text-sm;
	font-weight: 500;
	line-height: 1.4;
	pointer-events: none;
	word-wrap: break-word;

	&::before {
		content: '';
		position: absolute;
		width: 8px;
		height: 8px;
		background: var(--color-tooltip-bg);
		transform: rotate(45deg);
	}

	&--top::before {
		bottom: -3px;
		left: 50%;
		margin-left: -4px;
	}

	&--bottom::before {
		top: -3px;
		left: 50%;
		margin-left: -4px;
	}

	&--left::before {
		right: -3px;
		top: 50%;
		margin-top: -4px;
	}

	&--right::before {
		left: -3px;
		top: 50%;
		margin-top: -4px;
	}
}

.ui-tooltip-fade-enter-active,
.ui-tooltip-fade-leave-active {
	transition:
		opacity $duration-normal $easing-default,
		transform $duration-normal $easing-default;
}

.ui-tooltip-fade-enter-from,
.ui-tooltip-fade-leave-to {
	opacity: 0;
	transform: scale(0.96);
}
</style>
