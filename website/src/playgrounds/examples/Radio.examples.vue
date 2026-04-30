<script setup lang="ts">
import { ref } from 'vue'

const choices = ['one', 'two', 'three'] as const
const examplePick = ref<'one' | 'two' | 'three'>('two')
</script>

<template>
	<div class="examples">
		<div class="group radioset">
			<p class="label">Radiogroup pattern</p>
			<div class="row" role="radiogroup" aria-label="Example choices">
				<button
					v-for="v in choices"
					:key="`ex-${v}`"
					type="button"
					class="radio-hit"
					:aria-checked="examplePick === v"
					role="radio"
					@click="examplePick = v"
				>
					<UiRadio :checked="examplePick === v" size="md" />
					<span>{{ v }}</span>
				</button>
			</div>
		</div>
		<div class="group radioset">
			<p class="label">Disabled item</p>
			<div class="row" role="radiogroup" aria-label="Disabled example">
				<button type="button" class="radio-hit" aria-checked="true" role="radio">
					<UiRadio checked disabled size="md" />
					<span>On</span>
				</button>
				<button type="button" class="radio-hit" aria-checked="false" role="radio">
					<UiRadio :checked="false" disabled size="md" />
					<span>Off</span>
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.examples .radioset {
	.row {
		display: flex;
		flex-wrap: wrap;
		gap: $space-3;
		align-items: center;
	}

	.radio-hit {
		display: inline-flex;
		align-items: center;
		gap: $space-2;
		padding: $space-2 $space-3;
		border: none;
		border-radius: $radius-sm;
		background: transparent;
		color: var(--color-text);
		font: inherit;
		cursor: pointer;

		&:hover {
			background: var(--color-btn-ghost-bg-hover);
		}
	}
}
</style>
