<script setup lang="ts">
import type { UiSize } from '../types'

const props = withDefaults(
	defineProps<{
		modelValue: boolean
		title?: string
		size?: UiSize
		persistent?: boolean
		/** Accessible label for the close control (avoids vue-i18n as a peer dep). */
		closeAriaLabel?: string
	}>(),
	{
		title: undefined,
		size: 'md',
		persistent: false,
		closeAriaLabel: 'Close',
	},
)

const emit = defineEmits<{
	'update:modelValue': [value: boolean]
}>()

function close(): void {
	emit('update:modelValue', false)
}

function onOverlayClick(): void {
	if (!props.persistent) close()
}

function onKeydown(e: KeyboardEvent): void {
	if (e.key === 'Escape' && !props.persistent) close()
}
</script>

<template>
	<Teleport to="body">
		<Transition name="ui-modal">
			<div v-if="modelValue" class="ui-modal-overlay" @click.self="onOverlayClick" @keydown="onKeydown">
				<div class="ui-modal" :class="[`ui-modal--${size}`]" role="dialog" aria-modal="true" tabindex="-1">
					<header v-if="title || $slots.header" class="ui-modal__header">
						<slot name="header">
							<span class="ui-modal__title">{{ title }}</span>
						</slot>
						<UiButton variant="ghost" size="md" icon="close" :aria-label="closeAriaLabel" @click="close" />
					</header>

					<div class="ui-modal__body">
						<slot />
					</div>

					<footer v-if="$slots.footer" class="ui-modal__footer">
						<slot name="footer" />
					</footer>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-modal-overlay {
	position: fixed;
	inset: 0;
	z-index: 10000;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--color-overlay);
	backdrop-filter: blur(4px);
}

.ui-modal {
	background: var(--color-bg-surface);
	border-radius: $radius-lg;
	box-shadow: 0 16px 48px var(--color-shadow);
	display: flex;
	flex-direction: column;
	max-height: calc(100vh - 64px);
	overflow: hidden;

	&--sm {
		width: 380px;
	}
	&--md {
		width: 520px;
	}
	&--lg {
		width: 720px;
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: $space-4 $space-6;
	}

	&__title {
		font-size: $text-lg;
		font-weight: 600;
		color: var(--color-text);
	}

	&__body {
		padding: $space-2 $space-6;
		overflow-y: auto;
		flex: 1;
	}

	&__footer {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: $space-2;
		padding: $space-4 $space-6;
	}
}

// ─── Transition ───────────────────────────────────────────────────────────────
.ui-modal-enter-active,
.ui-modal-leave-active {
	transition: opacity $duration-normal $easing-default;

	.ui-modal {
		transition: transform $duration-normal $easing-default;
	}
}

.ui-modal-enter-from,
.ui-modal-leave-to {
	opacity: 0;

	.ui-modal {
		transform: translateY(8px);
	}
}
</style>
