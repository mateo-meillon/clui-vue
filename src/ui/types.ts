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

export type UiTableKey = string | number

export type UiTableSortOrder = 'ascend' | 'descend'

export interface UiTableFilterOption {
	text: string
	value: UiTableKey
}

export interface UiTableColumn<T = unknown> {
	key?: string
	title?: string
	dataIndex?: string | string[]
	align?: 'left' | 'center' | 'right'
	width?: number | string
	minWidth?: number | string
	className?: string
	hidden?: boolean
	ellipsis?: boolean
	sorter?: boolean | ((a: T, b: T) => number)
	sortDirections?: UiTableSortOrder[]
	defaultSortOrder?: UiTableSortOrder
	filters?: UiTableFilterOption[]
	filteredValue?: UiTableKey[]
	defaultFilteredValue?: UiTableKey[]
	filterMultiple?: boolean
	onFilter?: (value: UiTableKey, record: T) => boolean
}

export interface UiTableSorter<T = unknown> {
	columnKey: string
	order?: UiTableSortOrder
	column?: UiTableColumn<T>
}

export interface UiTablePagination {
	current?: number
	pageSize?: number
	total?: number
	pageSizeOptions?: number[]
	showSizeChanger?: boolean
}

export interface UiTableSelectionCheckboxProps {
	disabled?: boolean
}

export interface UiTableRowSelection<T = unknown> {
	type?: 'checkbox' | 'radio'
	selectedRowKeys?: UiTableKey[]
	defaultSelectedRowKeys?: UiTableKey[]
	hideSelectAll?: boolean
	columnWidth?: number | string
	getCheckboxProps?: (record: T) => UiTableSelectionCheckboxProps
	onChange?: (selectedRowKeys: UiTableKey[], selectedRows: T[]) => void
}

export interface UiTableExpandable<T = unknown> {
	childrenColumnName?: string
	expandedRowKeys?: UiTableKey[]
	defaultExpandedRowKeys?: UiTableKey[]
	defaultExpandAllRows?: boolean
	indentSize?: number
	expandRowByClick?: boolean
	showExpandColumn?: boolean
	columnWidth?: number | string
	rowExpandable?: (record: T) => boolean
	onExpand?: (expanded: boolean, record: T) => void
}

export interface UiTableScroll {
	x?: number | string | true
	y?: number | string
}

export interface UiTableChange<T = unknown> {
	pagination: Required<Pick<UiTablePagination, 'current' | 'pageSize'>> & { total: number }
	sorter?: UiTableSorter<T>
	filters: Record<string, UiTableKey[]>
	selectedRowKeys: UiTableKey[]
	expandedRowKeys: UiTableKey[]
	currentDataSource: T[]
	action: 'paginate' | 'sort' | 'filter' | 'select' | 'expand'
}
