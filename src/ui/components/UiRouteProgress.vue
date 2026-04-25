<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		/** When true, the top progress bar is shown (e.g. bind to your router’s navigating flag). */
		active?: boolean
	}>(),
	{ active: false },
)
</script>

<template>
	<Transition name="route-progress">
		<div v-if="props.active" class="ui-route-progress" role="progressbar" aria-valuetext="Loading" aria-busy="true">
			<div class="ui-route-progress__bar" />
		</div>
	</Transition>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-route-progress {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 3px;
	z-index: 5000;
	overflow: hidden;
	pointer-events: none;
	background: color-mix(in srgb, var(--color-primary) 22%, transparent);
}

.ui-route-progress__bar {
	height: 100%;
	width: 38%;
	max-width: 280px;
	border-radius: 0 $radius-full $radius-full 0;
	background: var(--color-primary);
	box-shadow: 0 0 12px color-mix(in srgb, var(--color-primary) 55%, transparent);
	animation: route-progress-slide 0.95s ease-in-out infinite;
}

.route-progress-enter-active,
.route-progress-leave-active {
	transition: opacity $duration-fast $easing-default;
}

.route-progress-enter-from,
.route-progress-leave-to {
	opacity: 0;
}

@keyframes route-progress-slide {
	0% {
		transform: translateX(-100%);
	}
	100% {
		transform: translateX(calc(100vw + 100%));
	}
}
</style>
