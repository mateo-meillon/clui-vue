import type { IconName, UiTreeNode } from 'clui-vue'
import { galleryRegistry } from './registry'

const COMPONENTS_ROOT_ID = 'components-root'

const playgroundIcons: Record<string, IconName> = {
	button: 'smart_button',
	'button-group': 'view_week',
	input: 'text_fields',
	textarea: 'notes',
	'form-field': 'label',
	checkbox: 'check_box',
	select: 'arrow_drop_down_circle',
	card: 'credit_card',
	radio: 'radio_button_checked',
	dropdown: 'arrow_drop_down_circle',
	menu: 'menu_open',
	modal: 'chat_bubble',
	skeleton: 'deblur',
	tree: 'account_tree',
	breadcrumbs: 'chevron_right',
	toast: 'notifications',
	'route-progress': 'linear_scale',
	icon: 'palette',
	switch: 'toggle_on',
	tabs: 'tabs',
	table: 'table_chart',
	tooltip: 'tooltip',
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
