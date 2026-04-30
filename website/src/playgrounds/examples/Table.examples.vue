<template>
	<div class="examples">
		<div class="group">
			<p class="label">Density</p>
			<div class="tables-two">
				<div class="tbl-col">
					<p class="tbl-title">Comfortable</p>
					<UiTable density="comfortable">
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
				<div class="tbl-col">
					<p class="tbl-title">Compact</p>
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
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.tables-two {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
	gap: $space-6;
	align-items: start;
}

.tbl-title {
	margin: 0 0 $space-2;
	font-size: $text-xs;
	font-weight: 600;
	color: var(--color-text-secondary);
	text-transform: uppercase;
	letter-spacing: 0.04em;
}
</style>
