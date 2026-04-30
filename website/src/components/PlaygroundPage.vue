<script setup lang="ts">
import { computed, useSlots } from 'vue'

defineProps<{
	title: string
}>()

const slots = useSlots()

const hasExamplesCode = computed(() => typeof slots['examples-code'] === 'function')
</script>

<template>
	<div class="page">
		<header class="head">
			<h1 class="title">{{ title }}</h1>
			<div class="explain">
				<slot name="explain" />
			</div>
		</header>
		<section v-if="slots.examples" class="examples-wrap">
			<h2 class="section-title">Examples</h2>
			<UiCard padding="lg">
				<slot name="examples" />
				<div v-if="hasExamplesCode" class="examples-source">
					<p class="source-title">Source</p>
					<slot name="examples-code" />
				</div>
			</UiCard>
		</section>
		<div class="grid">
			<section class="demo">
				<h2 class="section-title">Live demo</h2>
				<UiCard padding="lg">
					<slot name="demo" />
				</UiCard>
			</section>
			<aside class="controls">
				<h2 class="section-title">Controls</h2>
				<UiCard padding="lg">
					<div class="stack">
						<slot name="controls" />
					</div>
				</UiCard>
			</aside>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.page {
	max-width: 72rem;
	margin-inline: auto;

	.head {
		margin-bottom: $space-6;

		.title {
			margin: 0 0 $space-2;
			font-size: 1.5rem;
			font-weight: 600;
			letter-spacing: -0.02em;
		}

		.explain {
			font-size: $text-sm;
			color: var(--color-text-secondary);
			line-height: 1.55;

			:deep(p) {
				margin: 0 0 $space-3;

				&:last-child {
					margin-bottom: 0;
				}
			}

			:deep(code) {
				font-size: 0.9em;
			}
		}
	}

	.examples-wrap {
		margin-bottom: $space-6;

		:deep(.examples) {
			display: flex;
			flex-direction: column;
			gap: $space-6;
		}

		:deep(.examples .group) {
			display: flex;
			flex-direction: column;
			gap: $space-3;
		}

		:deep(.examples .label) {
			margin: 0;
			font-size: $text-xs;
			font-weight: 600;
			color: var(--color-text-secondary);
			text-transform: uppercase;
			letter-spacing: 0.04em;
		}

		:deep(.examples .row) {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: $space-3;
		}

		:deep(.examples .cluster) {
			display: flex;
			flex-wrap: wrap;
			align-items: flex-end;
			gap: $space-4;
		}
	}

	.examples-source {
		margin-top: $space-6;
		padding-top: $space-6;
		border-top: 1px solid var(--color-border);

		.source-title {
			margin: 0 0 $space-3;
			font-size: $text-xs;
			font-weight: 600;
			color: var(--color-text-secondary);
			text-transform: uppercase;
			letter-spacing: 0.04em;
		}
	}

	.section-title {
		margin: 0 0 $space-3;
		font-size: $text-sm;
		font-weight: 600;
		color: var(--color-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: $space-6;

		@media (min-width: 900px) {
			grid-template-columns: minmax(0, 1fr) minmax(16rem, 22rem);
			align-items: start;
		}

		.controls .stack {
			display: flex;
			flex-direction: column;
			gap: $space-4;
		}
	}
}
</style>
