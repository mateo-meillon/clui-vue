import type { IconName, UiTreeNode } from 'clui-vue'
import { galleryRegistry } from './registry'

const COMPONENTS_ROOT_ID = 'components-root'

const playgroundIcons: Record<string, IconName> = {
	button: 'smartButton',
	input: 'textFields',
	'form-field': 'label',
	select: 'arrowDropDownCircle',
	card: 'creditCard',
	radio: 'radioButtonChecked',
	dropdown: 'arrowDropDownCircle',
	modal: 'chatBubble',
	skeleton: 'deblur',
	tree: 'accountTree',
	toast: 'notifications',
	'route-progress': 'linearScale',
	icon: 'palette',
	tabs: 'tabs',
	table: 'tableChart',
}

export function buildGalleryNavTree(): UiTreeNode[] {
	return [
		{ id: 'getting-started', label: 'Getting started', icon: 'menuBook' },
		{ id: 'overview', label: 'Overview', icon: 'gridView' },
		{
			id: COMPONENTS_ROOT_ID,
			label: 'Components',
			icon: 'extension',
			children: galleryRegistry.map((e) => ({
				id: `pg-${e.slug}`,
				label: e.title,
				icon: playgroundIcons[e.slug],
			})),
		},
	]
}

export { COMPONENTS_ROOT_ID }
