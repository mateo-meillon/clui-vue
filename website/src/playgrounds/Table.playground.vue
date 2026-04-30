<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from 'clui-vue'
import HighlightedCode from '../components/HighlightedCode.vue'
import PlaygroundPage from '../components/PlaygroundPage.vue'
import TableExamples from './examples/Table.examples.vue'
import tableExamplesRaw from './examples/Table.examples.vue?raw'

const density = ref<'compact' | 'comfortable'>('comfortable')

const densityOptions: SelectOption[] = [
	{ label: 'comfortable', value: 'comfortable' },
	{ label: 'compact', value: 'compact' },
]
</script>

<template>
	<PlaygroundPage title="Table">
		<template #explain>
			<p>Scrollable wrapper plus density tokens for cell padding. Provide semantic table markup (<code>thead</code>, <code>tbody</code>, etc.) inside the default slot.</p>
		</template>
		<template #examples>
			<TableExamples />
		</template>
		<template #examples-code>
			<HighlightedCode :code="tableExamplesRaw" />
		</template>
		<template #demo>
			<UiTable :density="density">
				<thead>
					<tr>
						<th>Name</th>
						<th>Role</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Ada</td>
						<td>Engineer</td>
						<td>Active</td>
					</tr>
					<tr>
						<td>Bee</td>
						<td>Design</td>
						<td>Away</td>
					</tr>
				</tbody>
			</UiTable>
		</template>
		<template #controls>
			<UiFormField label="density">
				<UiSelect v-model="density" :options="densityOptions" size="sm" />
			</UiFormField>
		</template>
	</PlaygroundPage>
</template>
