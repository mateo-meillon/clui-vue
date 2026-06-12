export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
export type TooltipAlign = 'start' | 'center' | 'end'

export interface TooltipPanelPosition {
	placement: TooltipPlacement
	top: number
	left: number
}

export interface TooltipViewport {
	width: number
	height: number
}

function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(value, max))
}

function getCrossAxisPosition(align: TooltipAlign, anchorStart: number, anchorSize: number, panelSize: number, viewportSize: number, margin: number): number {
	let left: number

	switch (align) {
		case 'start':
			left = anchorStart
			break
		case 'end':
			left = anchorStart + anchorSize - panelSize
			break
		default:
			left = anchorStart + anchorSize / 2 - panelSize / 2
	}

	return clamp(left, margin, viewportSize - panelSize - margin)
}

function getCoords(placement: TooltipPlacement, align: TooltipAlign, anchor: DOMRect, panel: DOMRect, gap: number, viewport: TooltipViewport, margin: number): { top: number; left: number } {
	switch (placement) {
		case 'top':
			return {
				top: anchor.top - gap - panel.height,
				left: getCrossAxisPosition(align, anchor.left, anchor.width, panel.width, viewport.width, margin),
			}
		case 'bottom':
			return {
				top: anchor.bottom + gap,
				left: getCrossAxisPosition(align, anchor.left, anchor.width, panel.width, viewport.width, margin),
			}
		case 'left':
			return {
				top: getCrossAxisPosition(align, anchor.top, anchor.height, panel.height, viewport.height, margin),
				left: anchor.left - gap - panel.width,
			}
		case 'right':
			return {
				top: getCrossAxisPosition(align, anchor.top, anchor.height, panel.height, viewport.height, margin),
				left: anchor.right + gap,
			}
	}
}

function fits(placement: TooltipPlacement, anchor: DOMRect, panel: DOMRect, gap: number, viewport: TooltipViewport, margin: number): boolean {
	const coords = getCoords(placement, 'center', anchor, panel, gap, viewport, margin)

	switch (placement) {
		case 'top':
			return coords.top >= margin
		case 'bottom':
			return coords.top + panel.height <= viewport.height - margin
		case 'left':
			return coords.left >= margin
		case 'right':
			return coords.left + panel.width <= viewport.width - margin
	}
}

const OPPOSITE: Record<TooltipPlacement, TooltipPlacement> = {
	top: 'bottom',
	bottom: 'top',
	left: 'right',
	right: 'left',
}

export function resolveTooltipPlacement(
	anchor: DOMRect,
	panel: DOMRect,
	preferredPlacement: TooltipPlacement,
	gap: number,
	viewport: TooltipViewport = {
		width: window.innerWidth,
		height: window.innerHeight,
	},
	margin = 8,
): TooltipPlacement {
	if (fits(preferredPlacement, anchor, panel, gap, viewport, margin)) {
		return preferredPlacement
	}

	const opposite = OPPOSITE[preferredPlacement]
	if (fits(opposite, anchor, panel, gap, viewport, margin)) {
		return opposite
	}

	return preferredPlacement
}

export function getTooltipPanelStyle(
	anchor: DOMRect,
	panel: DOMRect,
	preferredPlacement: TooltipPlacement,
	align: TooltipAlign,
	gap: number,
	viewport: TooltipViewport = {
		width: window.innerWidth,
		height: window.innerHeight,
	},
	margin = 8,
): TooltipPanelPosition {
	const placement = resolveTooltipPlacement(anchor, panel, preferredPlacement, gap, viewport, margin)
	const coords = getCoords(placement, align, anchor, panel, gap, viewport, margin)

	return {
		placement,
		top: clamp(coords.top, margin, viewport.height - panel.height - margin),
		left: clamp(coords.left, margin, viewport.width - panel.width - margin),
	}
}
