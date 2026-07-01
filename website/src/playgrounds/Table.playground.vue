<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SelectOption, UiTableChange, UiTableColumn, UiTableKey } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import TableExamples from './examples/Table.examples.vue'
import tableExamplesRaw from './examples/Table.examples.vue?raw'

interface TeamRow {
	key: string
	name: string
	role: string
	status: 'Active' | 'Away' | 'Paused'
	level: number
	location: string
	children?: TeamRow[]
}

const density = ref<'compact' | 'comfortable'>('comfortable')
const bordered = ref(false)
const striped = ref(true)
const loading = ref(false)
const selectedRowKeys = ref<UiTableKey[]>(['ada'])
const expandedRowKeys = ref<UiTableKey[]>(['platform'])
const lastAction = ref('none')

const rows: TeamRow[] = [
	{
		key: 'platform',
		name: 'Platform',
		role: 'Team',
		status: 'Active',
		level: 0,
		location: 'Remote',
		children: [
			{ key: 'ada', name: 'Ada Lovelace', role: 'Engineer', status: 'Active', level: 5, location: 'Berlin' },
			{ key: 'grace', name: 'Grace Hopper', role: 'Architect', status: 'Away', level: 4, location: 'New York' },
		],
	},
	{ key: 'linus', name: 'Linus Torvalds', role: 'Engineer', status: 'Paused', level: 3, location: 'Helsinki' },
	{ key: 'margaret', name: 'Margaret Hamilton', role: 'Lead', status: 'Active', level: 5, location: 'Boston' },
	{ key: 'katherine', name: 'Katherine Johnson', role: 'Analyst', status: 'Away', level: 4, location: 'Virginia' },
	{ key: 'radia', name: 'Radia Perlman', role: 'Network', status: 'Active', level: 4, location: 'Seattle' },
]

const columns: UiTableColumn<TeamRow>[] = [
	{ title: 'Name', dataIndex: 'name', key: 'name', sorter: true, ellipsis: true, minWidth: 180 },
	{
		title: 'Role',
		dataIndex: 'role',
		key: 'role',
		filters: [
			{ text: 'Engineer', value: 'Engineer' },
			{ text: 'Lead', value: 'Lead' },
			{ text: 'Analyst', value: 'Analyst' },
		],
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		filters: [
			{ text: 'Active', value: 'Active' },
			{ text: 'Away', value: 'Away' },
			{ text: 'Paused', value: 'Paused' },
		],
	},
	{ title: 'Level', dataIndex: 'level', key: 'level', sorter: (a, b) => a.level - b.level, align: 'right', width: 90 },
	{ title: 'Location', dataIndex: 'location', key: 'location', minWidth: 130 },
]

const rowSelection = {
	type: 'checkbox' as const,
	getCheckboxProps: (record: TeamRow) => ({ disabled: record.status === 'Paused' }),
}

const densityOptions: SelectOption[] = [
	{ label: 'comfortable', value: 'comfortable' },
	{ label: 'compact', value: 'compact' },
]

const selectedSummary = computed(() => selectedRowKeys.value.join(', ') || 'none')

function onChange(change: UiTableChange<TeamRow>): void {
	lastAction.value = change.action
}
</script>

<template>
	<PlaygroundPage title="Table">
		<template #explain>
			<p>
				Data-driven table with Ant-like sorting, filters, pagination, selection, expansion, scroll, loading and empty states. Existing semantic table markup still works through the
				default slot.
			</p>
		</template>
		<template #examples>
			<TableExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="tableExamplesRaw" />
		</template>
		<template #demo>
			<UiTable
				v-model:selected-row-keys="selectedRowKeys"
				v-model:expanded-row-keys="expandedRowKeys"
				:columns="columns"
				:data-source="rows"
				row-key="key"
				:density="density"
				:loading="loading"
				:bordered="bordered"
				:striped="striped"
				:pagination="{ pageSize: 3, pageSizeOptions: [3, 5, 10] }"
				:row-selection="rowSelection"
				:expandable="{ indentSize: 18 }"
				:scroll="{ x: 760, y: 360 }"
				sticky
				@change="onChange"
			>
				<template #cell-status="{ value }">
					<span class="badge" :class="`badge--${String(value).toLowerCase()}`">{{ value }}</span>
				</template>
				<template #expanded="{ record }">
					<div class="expanded">Current focus: {{ record.role }} work from {{ record.location }}.</div>
				</template>
			</UiTable>
		</template>
		<template #controls>
			<UiFormField label="density">
				<UiSelect v-model="density" :options="densityOptions" size="sm" />
			</UiFormField>
			<UiCheckbox v-model="bordered" size="sm">bordered</UiCheckbox>
			<UiCheckbox v-model="striped" size="sm">striped</UiCheckbox>
			<UiCheckbox v-model="loading" size="sm">loading</UiCheckbox>
			<p class="hint">selected: {{ selectedSummary }}</p>
			<p class="hint">last action: {{ lastAction }}</p>
		</template>
	</PlaygroundPage>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.hint,
.expanded {
	margin: 0;
	font-size: $text-xs;
	color: var(--color-text-secondary);
	line-height: 1.45;
}

.badge {
	display: inline-flex;
	align-items: center;
	height: 22px;
	padding: 0 $space-2;
	border-radius: $radius-full;
	font-size: $text-xs;
	font-weight: 600;
	background: color-mix(in srgb, var(--color-text-secondary) 12%, transparent);
	color: var(--color-text-secondary);
}

.badge--active {
	background: color-mix(in srgb, #16a34a 14%, transparent);
	color: #15803d;
}

.badge--away {
	background: color-mix(in srgb, #d97706 16%, transparent);
	color: #b45309;
}

.badge--paused {
	background: color-mix(in srgb, var(--color-text-secondary) 14%, transparent);
	color: var(--color-text-secondary);
}
</style>
