<script setup lang="ts">
import { computed, onUnmounted, watch } from 'vue'
import { useDefaults } from '../config'

const props = withDefaults(
	defineProps<{
		modelValue: boolean
		title?: string
		size?: 'sm' | 'md' | 'lg' | 'full'
		persistent?: boolean
		/** Vertical placement of the panel within the overlay. */
		align?: 'center' | 'top'
		/** Force the panel to a fixed, viewport-capped height. */
		fullHeight?: boolean
		/** Make the body a flex region so consumers can place their own scroller inside. */
		scrollBody?: boolean
		/** Remove the default header chrome and body padding (edge-to-edge content). */
		chromeless?: boolean
		/** Extra classes for the teleported overlay / panel / body nodes. */
		overlayClass?: string
		contentClass?: string
		bodyClass?: string
		/** Inline styles for the teleported overlay / panel (e.g. CSS vars). */
		overlayStyle?: Record<string, string>
		contentStyle?: Record<string, string>
		/** Accessible label for the close control (avoids vue-i18n as a peer dep). */
		closeAriaLabel?: string
	}>(),
	{
		title: undefined,
		size: undefined,
		persistent: false,
		align: 'center',
		fullHeight: false,
		scrollBody: false,
		chromeless: false,
		overlayClass: undefined,
		contentClass: undefined,
		bodyClass: undefined,
		overlayStyle: undefined,
		contentStyle: undefined,
		closeAriaLabel: 'Close',
	},
)

const emit = defineEmits<{
	'update:modelValue': [value: boolean]
}>()

const config = useDefaults('modal', props)
const size = computed(() => config.value.size ?? 'md')
const isFull = computed(() => size.value === 'full')
const showHeader = computed(() => !props.chromeless)

function close(): void {
	emit('update:modelValue', false)
}

function onOverlayClick(): void {
	if (!props.persistent) close()
}

function onEscape(e: KeyboardEvent): void {
	if (e.key === 'Escape' && !props.persistent) close()
}

watch(
	() => props.modelValue,
	(isOpen) => {
		if (isOpen) {
			document.addEventListener('keydown', onEscape)
		} else {
			document.removeEventListener('keydown', onEscape)
		}
	},
	{ immediate: true },
)

onUnmounted(() => {
	document.removeEventListener('keydown', onEscape)
})
</script>

<template>
	<Teleport to="body">
		<Transition name="ui-modal">
			<div
				v-if="modelValue"
				class="ui-modal-overlay"
				:class="[`ui-modal-overlay--align-${align}`, { 'ui-modal-overlay--full': isFull }, overlayClass]"
				:style="overlayStyle"
				@click.self="onOverlayClick"
			>
				<div
					class="ui-modal"
					:class="[`ui-modal--${size}`, { 'ui-modal--full-height': fullHeight, 'ui-modal--scroll-body': scrollBody, 'ui-modal--chromeless': chromeless }, contentClass]"
					:style="contentStyle"
					role="dialog"
					aria-modal="true"
					tabindex="-1"
				>
					<header v-if="showHeader && (title || $slots.header)" class="ui-modal__header">
						<slot name="header">
							<span class="ui-modal__title">{{ title }}</span>
						</slot>
						<UiButton variant="ghost" size="md" icon="close" :aria-label="closeAriaLabel" @click="close" />
					</header>
					<header v-else-if="$slots.header" class="ui-modal__header ui-modal__header--chromeless">
						<slot name="header" />
					</header>

					<div class="ui-modal__body" :class="bodyClass">
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
	z-index: $z-modal;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--color-overlay);
	backdrop-filter: blur(4px);

	&--align-top {
		align-items: flex-start;
	}

	&--full {
		backdrop-filter: none;
	}
}

.ui-modal-overlay--align-top .ui-modal {
	margin-top: var(--ui-modal-margin-top, 76px);
}

.ui-modal {
	background: var(--color-bg-surface);
	border-radius: $radius-lg;
	box-shadow: 0 16px 48px var(--color-shadow);
	display: flex;
	flex-direction: column;
	max-height: calc(100vh - 64px);
	max-height: calc(100dvh - 64px);
	overflow: hidden;
	width: calc(100vw - 32px);
	width: calc(100dvw - 32px);

	&--sm {
		max-width: 380px;
	}
	&--md {
		max-width: 520px;
	}
	&--lg {
		max-width: 720px;
	}

	&--full {
		width: 100vw;
		width: 100dvw;
		height: 100vh;
		height: 100dvh;
		max-width: none;
		max-height: none;
		border-radius: 0;
	}

	&--full-height {
		height: var(--ui-modal-height, min(600px, calc(100dvh - 64px)));
	}

	&--chromeless &__body {
		padding: 0;
	}

	&--scroll-body &__body {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow: hidden;
	}

	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: $space-4 $space-6;

		&--chromeless {
			padding: 0;
		}
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
