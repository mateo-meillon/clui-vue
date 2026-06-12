import type { Component } from 'vue'

export interface GalleryEntry {
	slug: string
	title: string
	shortDescription: string
	playground: () => Promise<{ default: Component }>
	preview: () => Promise<{ default: Component }>
}

export const galleryRegistry: GalleryEntry[] = [
	{
		slug: 'button',
		title: 'Button',
		shortDescription: 'Variants, sizes, icons, loading.',
		playground: () => import('./playgrounds/Button.playground.vue'),
		preview: () => import('./previews/Button.preview.vue'),
	},
	{
		slug: 'input',
		title: 'Input',
		shortDescription: 'Text fields with optional icon and clear.',
		playground: () => import('./playgrounds/Input.playground.vue'),
		preview: () => import('./previews/Input.preview.vue'),
	},
	{
		slug: 'form-field',
		title: 'Form field',
		shortDescription: 'Label wrapper for controls.',
		playground: () => import('./playgrounds/FormField.playground.vue'),
		preview: () => import('./previews/FormField.preview.vue'),
	},
	{
		slug: 'select',
		title: 'Select',
		shortDescription: 'Custom dropdown select.',
		playground: () => import('./playgrounds/Select.playground.vue'),
		preview: () => import('./previews/Select.preview.vue'),
	},
	{
		slug: 'card',
		title: 'Card',
		shortDescription: 'Surface with configurable padding.',
		playground: () => import('./playgrounds/Card.playground.vue'),
		preview: () => import('./previews/Card.preview.vue'),
	},
	{
		slug: 'radio',
		title: 'Radio',
		shortDescription: 'Visual radio indicator.',
		playground: () => import('./playgrounds/Radio.playground.vue'),
		preview: () => import('./previews/Radio.preview.vue'),
	},
	{
		slug: 'dropdown',
		title: 'Dropdown',
		shortDescription: 'Anchored menu with trigger slot.',
		playground: () => import('./playgrounds/Dropdown.playground.vue'),
		preview: () => import('./previews/Dropdown.preview.vue'),
	},
	{
		slug: 'modal',
		title: 'Modal',
		shortDescription: 'Dialog overlay with slots.',
		playground: () => import('./playgrounds/Modal.playground.vue'),
		preview: () => import('./previews/Modal.preview.vue'),
	},
	{
		slug: 'skeleton',
		title: 'Skeleton',
		shortDescription: 'Loading placeholders.',
		playground: () => import('./playgrounds/Skeleton.playground.vue'),
		preview: () => import('./previews/Skeleton.preview.vue'),
	},
	{
		slug: 'tree',
		title: 'Tree',
		shortDescription: 'Expandable navigation-style lists.',
		playground: () => import('./playgrounds/Tree.playground.vue'),
		preview: () => import('./previews/Tree.preview.vue'),
	},
	{
		slug: 'toast',
		title: 'Toast',
		shortDescription: 'Transient notifications via API.',
		playground: () => import('./playgrounds/Toast.playground.vue'),
		preview: () => import('./previews/Toast.preview.vue'),
	},
	{
		slug: 'route-progress',
		title: 'Route progress',
		shortDescription: 'Top loading bar.',
		playground: () => import('./playgrounds/RouteProgress.playground.vue'),
		preview: () => import('./previews/RouteProgress.preview.vue'),
	},
	{
		slug: 'icon',
		title: 'Icon',
		shortDescription: 'Material Symbols ligature icons.',
		playground: () => import('./playgrounds/Icon.playground.vue'),
		preview: () => import('./previews/Icon.preview.vue'),
	},
	{
		slug: 'tabs',
		title: 'Tabs',
		shortDescription: 'Tablist with panel slots.',
		playground: () => import('./playgrounds/Tabs.playground.vue'),
		preview: () => import('./previews/Tabs.preview.vue'),
	},
	{
		slug: 'table',
		title: 'Table',
		shortDescription: 'Table wrapper and density.',
		playground: () => import('./playgrounds/Table.playground.vue'),
		preview: () => import('./previews/Table.preview.vue'),
	},
	{
		slug: 'tooltip',
		title: 'Tooltip',
		shortDescription: 'Contextual hints on hover and focus.',
		playground: () => import('./playgrounds/Tooltip.playground.vue'),
		preview: () => import('./previews/Tooltip.preview.vue'),
	},
]

export function getEntryBySlug(slug: string): GalleryEntry | undefined {
	return galleryRegistry.find((e) => e.slug === slug)
}
