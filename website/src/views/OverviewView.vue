<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { galleryRegistry } from '../registry'

const cards = galleryRegistry.map((e) => ({
	...e,
	Preview: defineAsyncComponent(e.preview),
}))
</script>

<template>
	<div class="overview">
		<div class="grid">
			<article v-for="c in cards" :key="c.slug" class="card">
				<RouterLink
					:to="{ name: 'playground', params: { slug: c.slug } }"
					class="link"
					:aria-label="`Open ${c.title} playground`"
				/>
				<div class="chrome">
					<span class="title">{{ c.title }}</span>
					<span class="desc">{{ c.shortDescription }}</span>
				</div>
				<div class="preview">
					<component :is="c.Preview" />
				</div>
			</article>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.overview {
	box-sizing: border-box;
	width: 100%;
	max-width: 72rem;
	margin-inline: auto;

	.grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: $space-4;

		@media (max-width: 960px) {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		@media (max-width: 520px) {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: $space-3;
		padding: $space-4;
		border: 1px solid var(--color-border);
		border-radius: $radius-lg;
		background: var(--color-bg-surface);
		color: inherit;
		transition:
			border-color $duration-fast $easing-default,
			box-shadow $duration-fast $easing-default;

		&:hover {
			border-color: color-mix(in srgb, var(--color-primary) 35%, var(--color-border));
			box-shadow: 0 4px 16px color-mix(in srgb, var(--color-text) 6%, transparent);
		}

		.link {
			position: absolute;
			inset: 0;
			z-index: 0;
			border-radius: inherit;
			outline-offset: 2px;

			&:focus-visible {
				outline: 2px solid var(--color-primary);
				z-index: 2;
			}
		}

		.chrome {
			position: relative;
			z-index: 1;
			display: flex;
			flex-direction: column;
			gap: $space-2;
			pointer-events: none;

			.title {
				font-size: $text-md;
				font-weight: 600;
				letter-spacing: -0.02em;
			}

			.desc {
				font-size: $text-xs;
				color: var(--color-text-secondary);
				line-height: 1.4;
				margin-top: -$space-1;
				margin-bottom: $space-2;
			}
		}

		.preview {
			position: relative;
			z-index: 1;
			flex: 1;
			min-height: 9rem;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: $space-3;
			border-radius: $radius-md;
			background: var(--color-bg);
			border: 1px dashed color-mix(in srgb, var(--color-border) 80%, transparent);
			overflow: visible;
		}
	}
}
</style>
