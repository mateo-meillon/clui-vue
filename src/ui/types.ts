export type UiSize = 'sm' | 'md' | 'lg' | 'auto'

export type UiVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

export interface SelectOption {
	label: string
	value: string
}

export interface UiTabItem {
	id: string
	label: string
}
