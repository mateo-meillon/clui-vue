<script setup lang="ts">
import { ref } from 'vue'
import type { UiTableColumn, UiTableKey } from 'clui-vue'

interface MemberRow {
	key: string
	name: string
	role: string
	status: 'Active' | 'Away' | 'Paused'
	score: number
	children?: MemberRow[]
}

const selectedRowKeys = ref<UiTableKey[]>(['ada'])
const expandedRowKeys = ref<UiTableKey[]>(['core'])

const rows: MemberRow[] = [
	{
		key: 'core',
		name: 'Core',
		role: 'Team',
		status: 'Active',
		score: 98,
		children: [
			{ key: 'ada', name: 'Ada', role: 'Engineer', status: 'Active', score: 98 },
			{ key: 'bee', name: 'Bee', role: 'Design', status: 'Away', score: 87 },
		],
	},
	{ key: 'cy', name: 'Cy', role: 'Support', status: 'Paused', score: 72 },
	{ key: 'dee', name: 'Dee', role: 'Engineer', status: 'Active', score: 91 },
]

const columns: UiTableColumn<MemberRow>[] = [
	{ title: 'Name', dataIndex: 'name', key: 'name', sorter: true },
	{
		title: 'Role',
		dataIndex: 'role',
		key: 'role',
		filters: [
			{ text: 'Engineer', value: 'Engineer' },
			{ text: 'Design', value: 'Design' },
			{ text: 'Support', value: 'Support' },
		],
	},
	{ title: 'Status', dataIndex: 'status', key: 'status' },
	{ title: 'Score', dataIndex: 'score', key: 'score', sorter: (a, b) => a.score - b.score, align: 'right' },
]

const emptyRows: MemberRow[] = []
</script>

<template>
	<div class="examples">
		<div class="group">
			<p class="label">Generated table</p>
			<UiTable
				v-model:selected-row-keys="selectedRowKeys"
				v-model:expanded-row-keys="expandedRowKeys"
				:columns="columns"
				:data-source="rows"
				row-key="key"
				density="compact"
				:pagination="{ pageSize: 2, pageSizeOptions: [2, 5] }"
				:row-selection="{ type: 'checkbox' }"
				:expandable="{ indentSize: 16 }"
				striped
			>
				<template #cell-status="{ value }">
					<span class="pill">{{ value }}</span>
				</template>
				<template #expanded="{ record }">
					<p class="expanded">Expanded details for {{ record.name }}.</p>
				</template>
			</UiTable>
		</div>

		<div class="group">
			<p class="label">States</p>
			<div class="tables-two">
				<UiTable :columns="columns" :data-source="emptyRows" row-key="key" empty-text="No members yet" :pagination="false" />
				<UiTable :columns="columns" :data-source="rows" row-key="key" loading :pagination="false" />
			</div>
		</div>

		<div class="group">
			<p class="label">Legacy slot markup</p>
			<UiTable density="compact">
				<thead>
					<tr>
						<th>Name</th>
						<th>Role</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Ada</td>
						<td>Engineer</td>
					</tr>
					<tr>
						<td>Bee</td>
						<td>Design</td>
					</tr>
				</tbody>
			</UiTable>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.tables-two {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
	gap: $space-4;
	align-items: start;
}

.pill {
	display: inline-flex;
	align-items: center;
	height: 20px;
	padding: 0 $space-2;
	border-radius: $radius-full;
	font-size: $text-xs;
	font-weight: 600;
	color: var(--color-primary);
	background: color-mix(in srgb, var(--color-primary) 12%, transparent);
}

.expanded {
	margin: 0;
	font-size: $text-xs;
	color: var(--color-text-secondary);
}
</style>
