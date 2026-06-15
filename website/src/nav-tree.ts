import type { IconName, UiTreeNode } from 'clui-vue'
import { galleryRegistry } from './registry'

const COMPONENTS_ROOT_ID = 'components-root'

const playgroundIcons: Record<string, IconName> = {
	button: 'smart_button',
	input: 'text_fields',
	'form-field': 'label',
	select: 'arrow_drop_down_circle',
	card: 'credit_card',
	radio: 'radio_button_checked',
	dropdown: 'arrow_drop_down_circle',
	modal: 'chat_bubble',
	skeleton: 'deblur',
	tree: 'account_tree',
	toast: 'notifications',
	'route-progress': 'linear_scale',
	icon: 'palette',
	switch: 'toggle_on',
	tabs: 'tabs',
	table: 'table_chart',
}

export function buildGalleryNavTree(): UiTreeNode[] {
	return [
		{ id: 'getting-started', label: 'Getting started', icon: 'menu_book' },
		{ id: 'overview', label: 'Overview', icon: 'grid_view' },
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
