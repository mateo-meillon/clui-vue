export type IconName = string

export type UiSize = 'sm' | 'md' | 'lg' | 'auto'

export type UiVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

export type UiInputVariant = 'default' | 'ghost'

/** Item for UiTree: folders use `children`; leaves omit it. */
export interface UiTreeNode {
	id: string
	label: string
	icon?: IconName
	children?: UiTreeNode[]
}

export interface SelectOption {
	label: string
	value: string
}

export interface UiTabItem {
	id: string
	label: string
}

export interface UiBreadcrumbItem {
	id: string
	label: string
	icon?: IconName
}
