export type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

export interface DropdownPanelPosition {
	placement: DropdownPlacement
	top: number
	left: number
	minWidth: number
}

export interface DropdownViewport {
	width: number
	height: number
}

function getCoords(vertical: 'bottom' | 'top', horizontal: 'start' | 'end', anchor: DOMRect, panel: DOMRect, gap: number): { top: number; left: number } {
	const left = horizontal === 'start' ? anchor.left : anchor.right - panel.width
	const top = vertical === 'bottom' ? anchor.bottom + gap : anchor.top - gap - panel.height

	return { top, left }
}

function fitsHorizontally(align: 'start' | 'end', anchor: DOMRect, panel: DOMRect, viewport: DropdownViewport, margin: number): boolean {
	const left = align === 'start' ? anchor.left : anchor.right - panel.width
	return left >= margin && left + panel.width <= viewport.width - margin
}

export function resolveDropdownPlacement(
	anchor: DOMRect,
	panel: DOMRect,
	preferredAlign: 'start' | 'end',
	gap: number,
	viewport: DropdownViewport = {
		width: window.innerWidth,
		height: window.innerHeight,
	},
	margin = 8,
): DropdownPlacement {
	const spaceBelow = viewport.height - anchor.bottom - gap - margin
	const spaceAbove = anchor.top - gap - margin
	const useTop = spaceBelow < panel.height && spaceAbove > spaceBelow
	const vertical = useTop ? 'top' : 'bottom'

	let horizontal: 'start' | 'end' = preferredAlign
	if (!fitsHorizontally(horizontal, anchor, panel, viewport, margin)) {
		const opposite: 'start' | 'end' = horizontal === 'start' ? 'end' : 'start'
		if (fitsHorizontally(opposite, anchor, panel, viewport, margin)) {
			horizontal = opposite
		}
	}

	return `${vertical}-${horizontal}`
}

function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(value, max))
}

export function getDropdownPanelStyle(
	anchor: DOMRect,
	panel: DOMRect,
	preferredAlign: 'start' | 'end',
	gap: number,
	viewport: DropdownViewport = {
		width: window.innerWidth,
		height: window.innerHeight,
	},
	margin = 8,
): DropdownPanelPosition {
	const placement = resolveDropdownPlacement(anchor, panel, preferredAlign, gap, viewport, margin)
	const [vertical, horizontal] = placement.split('-') as ['bottom' | 'top', 'start' | 'end']
	const coords = getCoords(vertical, horizontal, anchor, panel, gap)

	return {
		placement,
		top: clamp(coords.top, margin, viewport.height - panel.height - margin),
		left: clamp(coords.left, margin, viewport.width - panel.width - margin),
		minWidth: anchor.width,
	}
}
