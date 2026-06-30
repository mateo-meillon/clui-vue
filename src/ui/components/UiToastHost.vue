<script setup lang="ts">
import { useToast, type UiToastTone } from '../useToast'

const { toasts, dismissToast } = useToast()

const props = withDefaults(
	defineProps<{
		/** Accessible label for the dismiss button on dismissible toasts. */
		closeAriaLabel?: string
	}>(),
	{ closeAriaLabel: 'Close' },
)

function toneClass(tone: UiToastTone): string {
	return `ui-toast-host__item--${tone}`
}
</script>

<template>
	<Teleport to="body">
		<div class="ui-toast-host" aria-live="polite" aria-relevant="additions text">
			<TransitionGroup name="ui-toast" tag="div" class="ui-toast-host__list">
				<div v-for="item in toasts" :key="item.id" class="ui-toast-host__item" :class="toneClass(item.tone)" role="status">
					<UiIcon v-if="item.icon" :name="item.icon" :size="22" class="ui-toast-host__icon" />
					<div class="ui-toast-host__text">
						<p v-if="item.title" class="ui-toast-host__title">{{ item.title }}</p>
						<p class="ui-toast-host__message">{{ item.message }}</p>
					</div>
					<UiButton v-if="item.dismissible" variant="ghost" size="sm" icon="close" class="ui-toast-host__close" :aria-label="props.closeAriaLabel" @click="dismissToast(item.id)" />
				</div>
			</TransitionGroup>
		</div>
	</Teleport>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-toast-host {
	position: fixed;
	top: max($space-4, env(safe-area-inset-top, 0px));
	right: $space-4;
	left: $space-4;
	z-index: $z-toast;
	display: flex;
	justify-content: center;
	pointer-events: none;
}

.ui-toast-host__list {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: $space-2;
	width: 100%;
	max-width: 400px;
}

.ui-toast-host__item {
	display: flex;
	align-items: flex-start;
	gap: $space-3;
	width: 100%;
	max-width: 400px;
	padding: $space-3 $space-3 $space-3 $space-4;
	pointer-events: auto;
	font-family: $font-sans;
	background: var(--color-bg-surface);
	color: var(--color-text);
	border: 1px solid var(--color-border);
	border-radius: $radius-md;
	box-shadow: 0 8px 24px var(--color-shadow);
	border-left-width: 4px;
	border-left-style: solid;

	&--default {
		border-left-color: var(--color-primary);
	}

	&--success {
		border-left-color: #22c55e;

		.ui-toast-host__icon {
			color: #22c55e;
		}
	}

	&--warning {
		border-left-color: #eab308;

		.ui-toast-host__icon {
			color: #ca8a04;
		}
	}

	&--danger {
		border-left-color: #ef4444;

		.ui-toast-host__icon {
			color: #ef4444;
		}
	}
}

.ui-toast-host__text {
	flex: 1;
	min-width: 0;
	padding-top: 2px;
}

.ui-toast-host__title {
	margin: 0 0 $space-1;
	font-size: $text-sm;
	font-weight: 600;
	line-height: 1.3;
}

.ui-toast-host__message {
	margin: 0;
	font-size: $text-sm;
	line-height: 1.45;
	color: var(--color-text-secondary);
}

.ui-toast-host__item--default .ui-toast-host__message {
	color: var(--color-text-secondary);
}

.ui-toast-host__close {
	flex-shrink: 0;
	margin: (-$space-1) (-$space-1) (-$space-1) 0;
}

.ui-toast-enter-active,
.ui-toast-leave-active {
	transition:
		opacity $duration-normal $easing-default,
		transform $duration-normal $easing-default;
}

.ui-toast-enter-from,
.ui-toast-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}

.ui-toast-move {
	transition: transform $duration-normal $easing-default;
}
</style>
