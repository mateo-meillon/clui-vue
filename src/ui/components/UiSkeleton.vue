<script setup lang="ts">
import { computed } from 'vue'

export type UiSkeletonVariant = 'line' | 'text' | 'heading' | 'circle' | 'rect' | 'card' | 'button'

const props = withDefaults(
	defineProps<{
		variant?: UiSkeletonVariant
		/** CSS width, e.g. `60%`, `12rem` */
		width?: string
		/** CSS height for `line`, `heading`, `rect`, `button` */
		height?: string
		/** Line count for `text`; body lines for `card` (clamped 2–5) */
		lines?: number
		/** Pixel diameter for `circle` */
		size?: number
		animated?: boolean
	}>(),
	{
		variant: 'line',
		width: undefined,
		height: undefined,
		lines: 3,
		size: 40,
		animated: true,
	},
)

const shimmerClass = computed(() => (props.animated ? 'ui-skeleton--shimmer' : ''))

const lineWidths = ['100%', '92%', '78%', '88%', '70%', '95%']

function lineWidth(i: number): string {
	return lineWidths[i % lineWidths.length] ?? '85%'
}

const cardBodyLines = computed(() => Math.min(Math.max(props.lines, 2), 5))

const lineStyle = computed(() => ({
	width: props.width ?? '100%',
	height: props.height ?? '0.65rem',
}))

const headingStyle = computed(() => ({
	width: props.width ?? '12rem',
	height: props.height ?? '1.125rem',
}))

const rectStyle = computed(() => ({
	width: props.width ?? '100%',
	height: props.height ?? '7.5rem',
}))

const circleStyle = computed(() => ({
	width: `${props.size}px`,
	height: `${props.size}px`,
}))

const buttonStyle = computed(() => ({
	width: props.width ?? '140px',
	height: props.height ?? '40px',
}))
</script>

<template>
	<span
		v-if="variant === 'line'"
		class="ui-skeleton ui-skeleton--line"
		:class="shimmerClass"
		:style="lineStyle"
		aria-hidden="true"
	/>

	<span
		v-else-if="variant === 'heading'"
		class="ui-skeleton ui-skeleton--line ui-skeleton--heading"
		:class="shimmerClass"
		:style="headingStyle"
		aria-hidden="true"
	/>

	<div v-else-if="variant === 'text'" class="ui-skeleton-text" aria-hidden="true">
		<span
			v-for="i in lines"
			:key="i"
			class="ui-skeleton ui-skeleton--line ui-skeleton-text__line"
			:class="shimmerClass"
			:style="{ width: lineWidth(i - 1), height: height ?? '0.65rem' }"
		/>
	</div>

	<span
		v-else-if="variant === 'circle'"
		class="ui-skeleton ui-skeleton--circle"
		:class="shimmerClass"
		:style="circleStyle"
		aria-hidden="true"
	/>

	<span
		v-else-if="variant === 'rect'"
		class="ui-skeleton ui-skeleton--rect"
		:class="shimmerClass"
		:style="rectStyle"
		aria-hidden="true"
	/>

	<span
		v-else-if="variant === 'button'"
		class="ui-skeleton ui-skeleton--button"
		:class="shimmerClass"
		:style="buttonStyle"
		aria-hidden="true"
	/>

	<div v-else-if="variant === 'card'" class="ui-skeleton-card" aria-hidden="true">
		<div class="ui-skeleton-card__head">
			<span class="ui-skeleton ui-skeleton--line ui-skeleton-card__title" :class="shimmerClass" />
			<span class="ui-skeleton ui-skeleton--line ui-skeleton-card__badge" :class="shimmerClass" />
		</div>
		<div class="ui-skeleton-card__body">
			<span
				v-for="i in cardBodyLines"
				:key="i"
				class="ui-skeleton ui-skeleton--line ui-skeleton-card__line"
				:class="shimmerClass"
				:style="{ width: lineWidth(i) }"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-skeleton {
	position: relative;
	display: block;
	flex-shrink: 0;
	border-radius: $radius-sm;
	background-color: var(--color-skeleton-base);
	overflow: hidden;

	&--heading {
		border-radius: $radius-md;
	}

	&--circle {
		border-radius: $radius-full;
	}

	&--rect {
		border-radius: $radius-md;
	}

	&--button {
		border-radius: $radius-full;
	}
}

.ui-skeleton--shimmer::after {
	content: '';
	position: absolute;
	inset: 0;
	transform: translateX(-100%);
	background: linear-gradient(
		105deg,
		transparent 0%,
		transparent 38%,
		var(--color-skeleton-glare) 50%,
		transparent 62%,
		transparent 100%
	);
	animation: ui-skeleton-shimmer 1.35s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
	.ui-skeleton--shimmer::after {
		animation: none;
	}
}

.ui-skeleton-text {
	display: flex;
	flex-direction: column;
	gap: $space-2;
	width: 100%;
}

.ui-skeleton-text__line {
	min-width: $space-8;
}

.ui-skeleton-card {
	width: 100%;
	padding: $space-4;
	border: 1px solid var(--color-border);
	border-radius: $radius-md;
	background: var(--color-bg-surface);
	box-sizing: border-box;
}

.ui-skeleton-card__head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: $space-3;
	margin-bottom: $space-3;
}

.ui-skeleton-card__title {
	flex: 1;
	max-width: 72%;
	height: 0.85rem;
}

.ui-skeleton-card__badge {
	width: 3rem;
	height: 0.65rem;
}

.ui-skeleton-card__body {
	display: flex;
	flex-direction: column;
	gap: $space-2;
}

.ui-skeleton-card__line {
	height: 0.6rem;
	min-width: $space-8;
}

@keyframes ui-skeleton-shimmer {
	100% {
		transform: translateX(100%);
	}
}
</style>
