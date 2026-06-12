export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
export type TooltipAlign = 'start' | 'center' | 'end'

export interface TooltipPanelPosition {
	placement: TooltipPlacement
	top: number
	left: number
	/** When set, apply as CSS transform on the panel (e.g. translateX(-50%)) */
	transform?: string
}

export interface TooltipViewport {
	width: number
	height: number
}

function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(value, max))
}

function getCrossAxisPosition(align: TooltipAlign, anchorStart: number, anchorSize: number, panelSize: number, viewportSize: number, margin: number): number {
	let position: number

	switch (align) {
		case 'start':
			position = anchorStart
			break
		case 'end':
			position = anchorStart + anchorSize - panelSize
			break
		default:
			position = anchorStart + anchorSize / 2 - panelSize / 2
	}

	return clamp(position, margin, viewportSize - panelSize - margin)
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

function getCenteredPanelStyle(
	placement: TooltipPlacement,
	anchor: DOMRect,
	panel: DOMRect,
	gap: number,
	viewport: TooltipViewport,
	margin: number,
): Pick<TooltipPanelPosition, 'top' | 'left' | 'transform'> {
	const isVertical = placement === 'top' || placement === 'bottom'

	if (isVertical) {
		const centerX = anchor.left + anchor.width / 2
		const idealLeft = centerX - panel.width / 2
		const fitsHorizontally = idealLeft >= margin && idealLeft + panel.width <= viewport.width - margin

		const top = placement === 'top' ? anchor.top - gap - panel.height : anchor.bottom + gap

		if (fitsHorizontally) {
			return {
				top: clamp(top, margin, viewport.height - panel.height - margin),
				left: centerX,
				transform: 'translateX(-50%)',
			}
		}

		return {
			top: clamp(top, margin, viewport.height - panel.height - margin),
			left: clamp(idealLeft, margin, viewport.width - panel.width - margin),
		}
	}

	const centerY = anchor.top + anchor.height / 2
	const idealTop = centerY - panel.height / 2
	const fitsVertically = idealTop >= margin && idealTop + panel.height <= viewport.height - margin

	const left = placement === 'left' ? anchor.left - gap - panel.width : anchor.right + gap

	if (fitsVertically) {
		return {
			top: centerY,
			left: clamp(left, margin, viewport.width - panel.width - margin),
			transform: 'translateY(-50%)',
		}
	}

	return {
		top: clamp(idealTop, margin, viewport.height - panel.height - margin),
		left: clamp(left, margin, viewport.width - panel.width - margin),
	}
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

	if (align === 'center') {
		const centered = getCenteredPanelStyle(placement, anchor, panel, gap, viewport, margin)
		return {
			placement,
			...centered,
		}
	}

	const coords = getCoords(placement, align, anchor, panel, gap, viewport, margin)

	return {
		placement,
		top: clamp(coords.top, margin, viewport.height - panel.height - margin),
		left: clamp(coords.left, margin, viewport.width - panel.width - margin),
	}
}
