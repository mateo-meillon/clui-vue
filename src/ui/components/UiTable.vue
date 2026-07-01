<script setup lang="ts">
import { computed, ref, useSlots, watch, type Slots } from 'vue'
import { useDefaults } from '../config'
import UiButton from './UiButton.vue'
import UiCheckbox from './UiCheckbox.vue'
import UiDropdown from './UiDropdown.vue'
import UiMenu from './UiMenu.vue'
import UiMenuItem from './UiMenuItem.vue'
import UiSelect from './UiSelect.vue'
import type {
	SelectOption,
	UiTableChange,
	UiTableColumn,
	UiTableExpandable,
	UiTableKey,
	UiTablePagination,
	UiTableRowSelection,
	UiTableScroll,
	UiTableSorter,
	UiTableSortOrder,
} from '../types'

type Row = unknown
type Filters = Record<string, UiTableKey[]>

interface FlatRow {
	record: Row
	key: UiTableKey
	index: number
	depth: number
}

const props = withDefaults(
	defineProps<{
		columns?: UiTableColumn<Row>[]
		dataSource?: Row[]
		rowKey?: string | ((record: Row, index: number) => UiTableKey)
		/** Row cell vertical padding */
		density?: 'compact' | 'comfortable'
		loading?: boolean
		emptyText?: string
		bordered?: boolean
		striped?: boolean
		pagination?: false | UiTablePagination
		rowSelection?: false | UiTableRowSelection<Row>
		expandable?: false | UiTableExpandable<Row>
		scroll?: UiTableScroll
		sticky?: boolean | { headerOffset?: number }
		remote?: boolean | { sorting?: boolean; filtering?: boolean; pagination?: boolean }
	}>(),
	{
		columns: undefined,
		dataSource: undefined,
		rowKey: undefined,
		density: undefined,
		loading: false,
		emptyText: 'No data',
		bordered: false,
		striped: false,
		pagination: undefined,
		rowSelection: undefined,
		expandable: undefined,
		scroll: undefined,
		sticky: false,
		remote: false,
	},
)

const emit = defineEmits<{
	change: [change: UiTableChange<Row>]
	'row-click': [record: Row, index: number]
	'update:selectedRowKeys': [keys: UiTableKey[]]
	'update:expandedRowKeys': [keys: UiTableKey[]]
	'update:sorter': [sorter: UiTableSorter<Row> | undefined]
	'update:filters': [filters: Filters]
	'update:pagination': [pagination: Required<Pick<UiTablePagination, 'current' | 'pageSize'>> & { total: number }]
}>()

const slots: Slots = useSlots()
const config = useDefaults('table', props)
const density = computed(() => config.value.density ?? 'comfortable')

const internalSorter = ref<UiTableSorter<Row> | undefined>(defaultSorter())
const internalFilters = ref<Filters>(defaultFilters())
const internalCurrent = ref(props.pagination && props.pagination.current ? props.pagination.current : 1)
const internalPageSize = ref(props.pagination && props.pagination.pageSize ? props.pagination.pageSize : 10)
const internalSelectedKeys = ref<UiTableKey[]>(props.rowSelection && props.rowSelection.defaultSelectedRowKeys ? [...props.rowSelection.defaultSelectedRowKeys] : [])
const internalExpandedKeys = ref<UiTableKey[]>(props.expandable && props.expandable.defaultExpandedRowKeys ? [...props.expandable.defaultExpandedRowKeys] : [])

let bootedExpanded = false

const dataMode = computed(() => !!props.columns && !!props.dataSource)
const rawRows = computed<Row[]>(() => props.dataSource ?? [])
const visibleColumns = computed(() => (props.columns ?? []).filter((column) => !column.hidden))
const selection = computed(() => (props.rowSelection === false ? undefined : props.rowSelection))
const expandable = computed(() => (props.expandable === false ? undefined : props.expandable))
const childrenColumnName = computed(() => expandable.value?.childrenColumnName ?? 'children')
const selectedKeys = computed(() => selection.value?.selectedRowKeys ?? internalSelectedKeys.value)
const expandedKeys = computed(() => expandable.value?.expandedRowKeys ?? internalExpandedKeys.value)
const hasExpandableData = computed(() => rawRows.value.some((row) => childrenOf(row).length > 0))
const canExpandRows = computed(() => !!expandable.value || hasExpandableData.value || !!slots.expanded)
const showExpandColumn = computed(() => canExpandRows.value && expandable.value?.showExpandColumn !== false)

const currentPage = computed(() => Math.max(1, internalCurrent.value))
const pageSize = computed(() => Math.max(1, internalPageSize.value))

const filteredRows = computed(() => (isRemote('filtering') ? rawRows.value : filterRows(rawRows.value)))
const sortedRows = computed(() => (isRemote('sorting') ? filteredRows.value : sortRows(filteredRows.value)))
const totalRows = computed(() => props.pagination && props.pagination.total !== undefined ? props.pagination.total : sortedRows.value.length)
const pagedRows = computed(() => {
	if (props.pagination === false || isRemote('pagination')) return sortedRows.value
	const start = (currentPage.value - 1) * pageSize.value
	return sortedRows.value.slice(start, start + pageSize.value)
})
const flatRows = computed(() => flattenRows(pagedRows.value))
const selectableRows = computed(() => flatRows.value.filter((row) => !selectionDisabled(row.record)))
const allFlatRows = computed(() => flattenRows(rawRows.value, true))
const selectedRows = computed(() => {
	const selected = new Set(selectedKeys.value)
	return allFlatRows.value.filter((row) => selected.has(row.key)).map((row) => row.record)
})
const pageCount = computed(() => Math.max(1, Math.ceil(totalRows.value / pageSize.value)))
const pageSizeOptions = computed(() => props.pagination && props.pagination.pageSizeOptions ? props.pagination.pageSizeOptions : [10, 20, 50, 100])
const showSizeChanger = computed(() => (props.pagination && props.pagination.showSizeChanger !== undefined ? props.pagination.showSizeChanger : true))
const pageSizeValue = computed(() => String(pageSize.value))
const pageSizeSelectOptions = computed<SelectOption[]>(() => pageSizeOptions.value.map((option) => ({ label: `${option} / page`, value: String(option) })))
const allPageSelected = computed(() => selectableRows.value.length > 0 && selectableRows.value.every((row) => selectedKeys.value.includes(row.key)))
const somePageSelected = computed(() => selectableRows.value.some((row) => selectedKeys.value.includes(row.key)))

const tableStyle = computed(() => ({
	minWidth: props.scroll?.x === true ? 'max-content' : toLength(props.scroll?.x),
}))
const bodyStyle = computed(() => ({
	maxHeight: toLength(props.scroll?.y),
	overflowY: props.scroll?.y ? ('auto' as const) : undefined,
}))
const stickyStyle = computed(() => {
	if (!props.sticky) return undefined
	const headerOffset = typeof props.sticky === 'object' ? props.sticky.headerOffset ?? 0 : 0
	return { top: `${headerOffset}px` }
})
const colSpan = computed(() => visibleColumns.value.length + (selection.value ? 1 : 0) + (showExpandColumn.value ? 1 : 0))

watch(
	() => props.columns,
	() => {
		internalSorter.value = defaultSorter()
		internalFilters.value = defaultFilters()
	},
)

watch(
	() => (props.pagination ? props.pagination.current : undefined),
	(value) => {
		if (value !== undefined) internalCurrent.value = value
	},
)

watch(
	() => (props.pagination ? props.pagination.pageSize : undefined),
	(value) => {
		if (value !== undefined) internalPageSize.value = value
	},
)

watch(
	() => props.dataSource,
	() => {
		if (bootedExpanded) return
		if (expandable.value?.defaultExpandAllRows) internalExpandedKeys.value = flattenRows(rawRows.value, true).map((row) => row.key)
		bootedExpanded = true
	},
	{ immediate: true },
)

function isRemote(kind: 'sorting' | 'filtering' | 'pagination'): boolean {
	if (props.remote === true) return true
	return !!props.remote && props.remote[kind] === true
}

function columnKey(column: UiTableColumn<Row>, index = 0): string {
	if (column.key) return column.key
	if (Array.isArray(column.dataIndex)) return column.dataIndex.join('.')
	if (column.dataIndex) return column.dataIndex
	return `column-${index}`
}

function defaultSorter(): UiTableSorter<Row> | undefined {
	const column = (props.columns ?? []).find((item) => !!item.defaultSortOrder)
	if (!column?.defaultSortOrder) return undefined
	return { columnKey: columnKey(column), order: column.defaultSortOrder, column }
}

function defaultFilters(): Filters {
	const filters: Filters = {}
	for (const [index, column] of (props.columns ?? []).entries()) {
		const value = column.filteredValue ?? column.defaultFilteredValue
		if (value?.length) filters[columnKey(column, index)] = [...value]
	}
	return filters
}

function toLength(value: number | string | true | undefined): string | undefined {
	if (value === undefined || value === true) return undefined
	return typeof value === 'number' ? `${value}px` : value
}

function asRecord(record: Row): Record<string, unknown> {
	return record !== null && typeof record === 'object' ? (record as Record<string, unknown>) : {}
}

function getValue(record: Row, dataIndex: string | string[] | undefined): unknown {
	if (!dataIndex) return undefined
	const parts = Array.isArray(dataIndex) ? dataIndex : dataIndex.split('.')
	let value: unknown = record
	for (const part of parts) {
		if (value === null || typeof value !== 'object') return undefined
		value = (value as Record<string, unknown>)[part]
	}
	return value
}

function getRowKey(record: Row, index: number, path = `${index}`): UiTableKey {
	if (typeof props.rowKey === 'function') return props.rowKey(record, index)
	if (typeof props.rowKey === 'string') {
		const keyed = getValue(record, props.rowKey)
		if (typeof keyed === 'string' || typeof keyed === 'number') return keyed
	}
	const fallback = asRecord(record).key
	if (typeof fallback === 'string' || typeof fallback === 'number') return fallback
	return path
}

function childrenOf(record: Row): Row[] {
	const children = asRecord(record)[childrenColumnName.value]
	return Array.isArray(children) ? children : []
}

function filterRows(rows: Row[]): Row[] {
	const activeColumns = visibleColumns.value.filter((column, index) => columnFilterValue(column, index).length > 0)
	if (!activeColumns.length) return rows
	return rows
		.map((row) => {
			const childMatches = filterRows(childrenOf(row))
			const rowMatches = activeColumns.every((column) => {
				const values = columnFilterValue(column)
				if (column.onFilter) return values.some((value) => column.onFilter?.(value, row))
				const value = getValue(row, column.dataIndex)
				return values.some((filterValue) => String(filterValue) === String(value))
			})
			if (!rowMatches && childMatches.length === 0) return undefined
			return childMatches.length === childrenOf(row).length ? row : { ...asRecord(row), [childrenColumnName.value]: childMatches }
		})
		.filter((row): row is Row => row !== undefined)
}

function sortRows(rows: Row[]): Row[] {
	const sorter = internalSorter.value
	if (!sorter?.order) return rows
	const column = visibleColumns.value.find((item, index) => columnKey(item, index) === sorter.columnKey)
	if (!column) return rows
	const direction = sorter.order === 'ascend' ? 1 : -1
	const sorted = [...rows].sort((a, b) => direction * compareRows(a, b, column))
	return sorted.map((row) => {
		const children = childrenOf(row)
		return children.length ? { ...asRecord(row), [childrenColumnName.value]: sortRows(children) } : row
	})
}

function compareRows(a: Row, b: Row, column: UiTableColumn<Row>): number {
	if (typeof column.sorter === 'function') return column.sorter(a, b)
	const left = getValue(a, column.dataIndex)
	const right = getValue(b, column.dataIndex)
	if (typeof left === 'number' && typeof right === 'number') return left - right
	return String(left ?? '').localeCompare(String(right ?? ''), undefined, { numeric: true, sensitivity: 'base' })
}

function flattenRows(rows: Row[], includeCollapsed = false, depth = 0, prefix = ''): FlatRow[] {
	const flat: FlatRow[] = []
	rows.forEach((record, index) => {
		const path = prefix ? `${prefix}.${index}` : `${index}`
		const key = getRowKey(record, index, path)
		flat.push({ record, key, index, depth })
		if ((includeCollapsed || expandedKeys.value.includes(key)) && childrenOf(record).length) {
			flat.push(...flattenRows(childrenOf(record), includeCollapsed, depth + 1, path))
		}
	})
	return flat
}

function columnFilterValue(column: UiTableColumn<Row>, index = 0): UiTableKey[] {
	if (column.filteredValue) return column.filteredValue
	return internalFilters.value[columnKey(column, index)] ?? []
}

function setSorter(column: UiTableColumn<Row>, index: number): void {
	if (!column.sorter) return
	const key = columnKey(column, index)
	const directions = column.sortDirections ?? ['ascend', 'descend']
	const current = internalSorter.value?.columnKey === key ? internalSorter.value.order : undefined
	const next = current === undefined ? directions[0] : current === directions[0] ? directions[1] : undefined
	internalSorter.value = next ? { columnKey: key, order: next, column } : undefined
	setPage(1, false)
	emit('update:sorter', internalSorter.value)
	emitChange('sort')
}

function setFilterValue(column: UiTableColumn<Row>, index: number, value: UiTableKey, checked: boolean): void {
	const key = columnKey(column, index)
	const current = columnFilterValue(column, index)
	const next = column.filterMultiple === false ? (checked ? [value] : []) : checked ? [...current, value] : current.filter((item) => item !== value)
	internalFilters.value = { ...internalFilters.value, [key]: next }
	setPage(1, false)
	emit('update:filters', internalFilters.value)
	emitChange('filter')
}

function clearFilter(column: UiTableColumn<Row>, index: number): void {
	internalFilters.value = { ...internalFilters.value, [columnKey(column, index)]: [] }
	setPage(1, false)
	emit('update:filters', internalFilters.value)
	emitChange('filter')
}

function setSingleFilterValue(column: UiTableColumn<Row>, index: number, value: UiTableKey, close: () => void): void {
	setFilterValue(column, index, value, true)
	close()
}

function clearFilterAndClose(column: UiTableColumn<Row>, index: number, close: () => void): void {
	clearFilter(column, index)
	close()
}

function selectionDisabled(record: Row): boolean {
	return !!selection.value?.getCheckboxProps?.(record).disabled
}

function setSelectedKeys(keys: UiTableKey[]): void {
	internalSelectedKeys.value = keys
	emit('update:selectedRowKeys', keys)
	selection.value?.onChange?.(keys, selectedRows.value as Row[])
	emitChange('select')
}

function toggleRowSelection(row: FlatRow, checked: boolean): void {
	if (!selection.value || selectionDisabled(row.record)) return
	if (selection.value.type === 'radio') {
		setSelectedKeys(checked ? [row.key] : [])
		return
	}
	setSelectedKeys(checked ? [...selectedKeys.value, row.key] : selectedKeys.value.filter((key) => key !== row.key))
}

function togglePageSelection(checked: boolean): void {
	const pageKeys = selectableRows.value.map((row) => row.key)
	const next = checked ? Array.from(new Set([...selectedKeys.value, ...pageKeys])) : selectedKeys.value.filter((key) => !pageKeys.includes(key))
	setSelectedKeys(next)
}

function rowExpandable(record: Row): boolean {
	if (!canExpandRows.value) return false
	if (expandable.value?.rowExpandable && !expandable.value.rowExpandable(record)) return false
	return childrenOf(record).length > 0 || !!slots.expanded
}

function setExpandedKeys(keys: UiTableKey[], record?: Row, expanded?: boolean): void {
	internalExpandedKeys.value = keys
	emit('update:expandedRowKeys', keys)
	if (record && expanded !== undefined) expandable.value?.onExpand?.(expanded, record)
	emitChange('expand')
}

function toggleExpanded(row: FlatRow): void {
	if (!rowExpandable(row.record)) return
	const expanded = !expandedKeys.value.includes(row.key)
	const next = expanded ? [...expandedKeys.value, row.key] : expandedKeys.value.filter((key) => key !== row.key)
	setExpandedKeys(next, row.record, expanded)
}

function onRowClick(row: FlatRow): void {
	emit('row-click', row.record, row.index)
	if (expandable.value?.expandRowByClick) toggleExpanded(row)
}

function setPage(page: number, emitUpdate = true): void {
	const next = Math.min(Math.max(1, page), pageCount.value)
	internalCurrent.value = next
	if (emitUpdate) {
		emit('update:pagination', { current: next, pageSize: pageSize.value, total: totalRows.value })
		emitChange('paginate')
	}
}

function setPageSizeValue(value: string): void {
	internalPageSize.value = Number(value)
	internalCurrent.value = 1
	emit('update:pagination', { current: 1, pageSize: pageSize.value, total: totalRows.value })
	emitChange('paginate')
}

function emitChange(action: UiTableChange<Row>['action']): void {
	emit('change', {
		pagination: { current: currentPage.value, pageSize: pageSize.value, total: totalRows.value },
		sorter: internalSorter.value,
		filters: internalFilters.value,
		selectedRowKeys: selectedKeys.value,
		expandedRowKeys: expandedKeys.value,
		currentDataSource: pagedRows.value,
		action,
	})
}
</script>

<template>
	<div
		class="ui-table-wrap"
		:class="{
			'ui-table-wrap--scroll-y': !!scroll?.y,
			'ui-table-wrap--sticky': !!sticky,
		}"
		:style="bodyStyle"
	>
		<table
			class="ui-table"
			:class="[
				`ui-table--density-${density}`,
				{
					'ui-table--bordered': bordered,
					'ui-table--striped': striped,
					'ui-table--data': dataMode,
				},
			]"
			:style="tableStyle"
			role="table"
		>
			<slot v-if="!dataMode" />
			<template v-else>
				<thead>
					<tr>
						<th v-if="selection" class="ui-table__control-cell" :style="{ width: toLength(selection.columnWidth) ?? '42px' }">
							<UiCheckbox
								v-if="selection.type !== 'radio' && !selection.hideSelectAll"
								size="sm"
								:model-value="allPageSelected"
								:indeterminate="somePageSelected && !allPageSelected"
								aria-label="Select page"
								@change="togglePageSelection"
							/>
						</th>
						<th v-if="showExpandColumn" class="ui-table__control-cell" :style="{ width: toLength(expandable?.columnWidth) ?? '42px' }" />
						<th
							v-for="(column, index) in visibleColumns"
							:key="columnKey(column, index)"
							:class="[
								column.className,
								`ui-table__cell--${column.align ?? 'left'}`,
								{
									'ui-table__cell--sortable': !!column.sorter,
									'ui-table__cell--ellipsis': column.ellipsis,
								},
							]"
							:style="{ width: toLength(column.width), minWidth: toLength(column.minWidth), ...stickyStyle }"
						>
							<div class="ui-table__head">
								<UiButton v-if="column.sorter" class="ui-table__sort" variant="ghost" size="auto" type="button" @click="setSorter(column, index)">
									<span>
										<slot :name="`header-${columnKey(column, index)}`" :column="column">{{ column.title }}</slot>
									</span>
									<span class="ui-table__sort-icons" aria-hidden="true">
										<UiIcon name="arrow_drop_up" :size="16" :class="{ 'ui-table__sort-icon--active': internalSorter?.columnKey === columnKey(column, index) && internalSorter.order === 'ascend' }" />
										<UiIcon name="arrow_drop_down" :size="16" :class="{ 'ui-table__sort-icon--active': internalSorter?.columnKey === columnKey(column, index) && internalSorter.order === 'descend' }" />
									</span>
								</UiButton>
								<span v-else class="ui-table__title">
									<slot :name="`header-${columnKey(column, index)}`" :column="column">{{ column.title }}</slot>
								</span>
								<UiDropdown v-if="column.filters?.length" class="ui-table__filter" align="end" panel-class="ui-table__filter-panel" panel-min-width="192px">
									<template #trigger="{ toggle, isOpen }">
										<UiButton
											class="ui-table__filter-trigger"
											:active="isOpen || columnFilterValue(column, index).length > 0"
											variant="ghost"
											size="sm"
											icon="filter_list"
											:icon-size="16"
											aria-label="Filter column"
											type="button"
											@click="toggle"
										/>
									</template>
									<template #default="{ close }">
										<UiCheckbox
											v-for="filter in column.filterMultiple === false ? [] : column.filters"
											:key="filter.value"
											class="ui-table__filter-checkbox"
											size="sm"
											:model-value="columnFilterValue(column, index).includes(filter.value)"
											@change="setFilterValue(column, index, filter.value, $event)"
										>
											{{ filter.text }}
										</UiCheckbox>
										<UiMenu v-if="column.filterMultiple === false" aria-label="Filter options">
											<UiMenuItem
												v-for="filter in column.filters"
												:key="filter.value"
												radio
												:selected="columnFilterValue(column, index).includes(filter.value)"
												@select="setSingleFilterValue(column, index, filter.value, close)"
											>
												{{ filter.text }}
											</UiMenuItem>
										</UiMenu>
										<UiButton
											class="ui-table__filter-clear"
											variant="ghost"
											size="sm"
											block
											align="start"
											type="button"
											@click="clearFilterAndClose(column, index, close)"
										>
											Reset
										</UiButton>
									</template>
								</UiDropdown>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-if="loading">
						<td class="ui-table__state" :colspan="colSpan">
							<slot name="loading">
								<span class="ui-table__spinner" />
								<span>Loading</span>
							</slot>
						</td>
					</tr>
					<tr v-else-if="flatRows.length === 0">
						<td class="ui-table__state" :colspan="colSpan">
							<slot name="empty">{{ emptyText }}</slot>
						</td>
					</tr>
					<template v-else v-for="row in flatRows" :key="row.key">
						<tr class="ui-table__row" @click="onRowClick(row)">
							<td v-if="selection" class="ui-table__control-cell" @click.stop>
								<input
									v-if="selection.type === 'radio'"
									class="ui-table__radio"
									type="radio"
									name="ui-table-row-selection"
									:checked="selectedKeys.includes(row.key)"
									:disabled="selectionDisabled(row.record)"
									:aria-label="`Select row ${row.index + 1}`"
									@change="toggleRowSelection(row, ($event.target as HTMLInputElement).checked)"
								/>
								<UiCheckbox
									v-else
									size="sm"
									:model-value="selectedKeys.includes(row.key)"
									:disabled="selectionDisabled(row.record)"
									:aria-label="`Select row ${row.index + 1}`"
									@change="toggleRowSelection(row, $event)"
								/>
							</td>
							<td v-if="showExpandColumn" class="ui-table__control-cell">
								<UiButton
									v-if="rowExpandable(row.record)"
									class="ui-table__expand"
									variant="ghost"
									size="auto"
									icon="chevron_right"
									:icon-size="16"
									:class="{ 'ui-table__expand--open': expandedKeys.includes(row.key) }"
									:style="row.depth ? { marginLeft: `${row.depth * (expandable?.indentSize ?? 16)}px` } : undefined"
									:aria-expanded="expandedKeys.includes(row.key)"
									aria-label="Toggle row"
									type="button"
									@click.stop="toggleExpanded(row)"
								/>
							</td>
							<td
								v-for="(column, index) in visibleColumns"
								:key="columnKey(column, index)"
								:class="[column.className, `ui-table__cell--${column.align ?? 'left'}`, { 'ui-table__cell--ellipsis': column.ellipsis }]"
							>
								<span v-if="!showExpandColumn && index === 0 && row.depth" class="ui-table__indent" :style="{ width: `${row.depth * (expandable?.indentSize ?? 16)}px` }" />
								<slot :name="`cell-${columnKey(column, index)}`" :value="getValue(row.record, column.dataIndex)" :record="row.record" :index="row.index" :column="column">
									{{ getValue(row.record, column.dataIndex) }}
								</slot>
							</td>
						</tr>
						<tr v-if="slots.expanded && expandedKeys.includes(row.key)" class="ui-table__expanded-row">
							<td :colspan="colSpan">
								<slot name="expanded" :record="row.record" :index="row.index" />
							</td>
						</tr>
					</template>
				</tbody>
			</template>
		</table>
	</div>
	<div v-if="dataMode && pagination !== false && !loading" class="ui-table__pagination">
		<span class="ui-table__page-meta">{{ totalRows }} items</span>
		<UiSelect v-if="showSizeChanger" class="ui-table__page-size" :model-value="pageSizeValue" :options="pageSizeSelectOptions" size="sm" @update:model-value="setPageSizeValue" />
		<div class="ui-table__page-buttons">
			<UiButton type="button" class="ui-table__page-button" variant="secondary" size="sm" icon="chevron_left" :icon-size="16" :disabled="currentPage <= 1" aria-label="Previous page" @click="setPage(currentPage - 1)" />
			<span class="ui-table__page-current">{{ currentPage }} / {{ pageCount }}</span>
			<UiButton type="button" class="ui-table__page-button" variant="secondary" size="sm" icon="chevron_right" :icon-size="16" :disabled="currentPage >= pageCount" aria-label="Next page" @click="setPage(currentPage + 1)" />
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-table-wrap {
	width: 100%;
	overflow-x: auto;
	-webkit-overflow-scrolling: touch;
	border-radius: $radius-md;
}

.ui-table-wrap--scroll-y {
	overflow: auto;
}

.ui-table {
	width: 100%;
	border-collapse: separate;
	border-spacing: 0;
	font-family: inherit;
	font-size: $text-sm;
	line-height: 1.4;
	color: var(--color-text-primary);
	background: transparent;
}

.ui-table--data {
	table-layout: fixed;
	background: var(--color-bg-surface);
}

.ui-table :deep(thead th),
.ui-table thead th {
	text-align: left;
	font-weight: 600;
	color: var(--color-text-secondary);
	letter-spacing: 0.02em;
	border-bottom: 1px solid var(--color-border);
	white-space: nowrap;
	background: color-mix(in srgb, var(--color-bg-surface) 92%, var(--color-border));
}

.ui-table-wrap--sticky .ui-table thead th {
	position: sticky;
	z-index: 2;
}

.ui-table :deep(tbody td),
.ui-table tbody td {
	border-bottom: 1px solid color-mix(in srgb, var(--color-border) 85%, transparent);
	vertical-align: middle;
	color: var(--color-text-primary);
}

.ui-table :deep(tr:last-child td),
.ui-table tbody tr:last-child td {
	border-bottom: none;
}

.ui-table--density-comfortable :deep(thead th),
.ui-table--density-comfortable :deep(tbody td),
.ui-table--density-comfortable thead th,
.ui-table--density-comfortable tbody td {
	padding: $space-3 $space-4;
}

.ui-table--density-compact :deep(thead th),
.ui-table--density-compact :deep(tbody td),
.ui-table--density-compact thead th,
.ui-table--density-compact tbody td {
	padding: $space-2 $space-3;
}

.ui-table--bordered {
	border: 1px solid var(--color-border);
	border-radius: $radius-md;
	overflow: hidden;
}

.ui-table--bordered th,
.ui-table--bordered td {
	border-right: 1px solid color-mix(in srgb, var(--color-border) 85%, transparent);
}

.ui-table--bordered th:last-child,
.ui-table--bordered td:last-child {
	border-right: none;
}

.ui-table--striped tbody tr:nth-child(even):not(.ui-table__expanded-row) {
	background: color-mix(in srgb, var(--color-bg-surface) 92%, var(--color-border));
}

.ui-table__row {
	transition: background-color $duration-fast $easing-default;
}

.ui-table__row:hover {
	background: color-mix(in srgb, var(--color-primary) 6%, transparent);
}

.ui-table__head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: $space-2;
	min-width: 0;
}

.ui-table__title,
.ui-table__sort {
	min-width: 0;
}

.ui-table__sort {
	font: inherit;
	font-weight: inherit;
	color: inherit;
	--ui-button-padding-inline: 0;
	--ui-button-padding-block: 0;
	min-height: 0;
}

.ui-table__sort-icons {
	display: inline-flex;
	flex-direction: column;
	height: 16px;
	color: var(--color-text-muted);
}

.ui-table__sort-icons .ui-icon {
	margin-block: -4px;
}

.ui-table__sort-icon--active {
	color: var(--color-primary);
}

.ui-table__filter {
	flex-shrink: 0;
}

.ui-table__filter-trigger {
	color: var(--color-text-secondary);
}

:global(.ui-table__filter-panel) {
	padding: $space-2;
}

.ui-table__filter-clear {
	margin-top: $space-1;
}

.ui-table__control-cell {
	width: 42px;
	text-align: center;
}

.ui-table__control-cell :deep(.ui-checkbox) {
	display: flex;
	margin-inline: auto;
}

.ui-table__radio {
	display: block;
	width: 15px;
	height: 15px;
	margin: 0 auto;
	accent-color: var(--color-primary);
}

:global(.ui-table__filter-panel .ui-table__filter-checkbox) {
	width: 100%;
	padding: $space-2;
	border-radius: $radius-sm;
}

:global(.ui-table__filter-panel .ui-table__filter-checkbox:hover) {
	background: var(--color-btn-ghost-bg-hover);
}

.ui-table__control-cell :deep(.ui-table__expand) {
	display: flex;
	width: 22px;
	height: 22px;
	aspect-ratio: 1;
	margin-inline: auto;
	padding: 0;
}

.ui-table__control-cell :deep(.ui-table__expand--open) {
	transform: rotate(90deg);
}

.ui-table__indent {
	display: inline-block;
	flex-shrink: 0;
}

.ui-table__cell--center {
	text-align: center;
}

.ui-table__cell--right {
	text-align: right;
}

.ui-table__cell--ellipsis {
	max-width: 1px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.ui-table__state {
	height: 7rem;
	text-align: center;
	color: var(--color-text-secondary);
}

.ui-table__spinner {
	display: inline-block;
	width: 14px;
	height: 14px;
	margin-right: $space-2;
	border: 2px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
	border-top-color: var(--color-primary);
	border-radius: $radius-full;
	vertical-align: -2px;
	animation: ui-table-spin 800ms linear infinite;
}

.ui-table__expanded-row td {
	background: color-mix(in srgb, var(--color-bg-surface) 88%, var(--color-border));
	color: var(--color-text-secondary);
}

.ui-table__pagination {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
	gap: $space-2;
	margin-top: $space-3;
	color: var(--color-text-secondary);
	font-size: $text-sm;
}

.ui-table__page-meta {
	margin-right: auto;
}

.ui-table__page-size {
	width: 7.5rem;
}

.ui-table__page-buttons {
	display: inline-flex;
	align-items: center;
	gap: $space-1;
}

.ui-table__page-button {
	width: 30px;
	--ui-button-padding-inline: 0;
	--ui-button-padding-block: 0;
}

.ui-table__page-current {
	min-width: 4rem;
	text-align: center;
}

@keyframes ui-table-spin {
	to {
		transform: rotate(360deg);
	}
}
</style>
