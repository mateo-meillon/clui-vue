<script setup lang="ts">
import type { UiTableColumn } from 'clui-vue'

const columns: UiTableColumn[] = [
	{ title: 'Name', dataIndex: 'name', key: 'name', sorter: true },
	{ title: 'Status', dataIndex: 'status', key: 'status' },
]

const rows = [
	{ key: 'ada', name: 'Ada', status: 'Active' },
	{ key: 'bee', name: 'Bee', status: 'Away' },
]
</script>

<template>
	<UiTable :columns="columns" :data-source="rows" row-key="key" density="compact" :pagination="false" striped />
</template>
