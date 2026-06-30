<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch, type CSSProperties } from 'vue'
import { useDefaults } from '../config'
import type { UiInputVariant, UiSize } from '../types'

const props = withDefaults(
	defineProps<{
		modelValue?: string
		placeholder?: string
		rows?: number
		size?: UiSize
		variant?: UiInputVariant | 'bare'
		disabled?: boolean
		/** Grow with content up to `maxHeight`. */
		autoResize?: boolean
		/** Max height (px or CSS length) when `autoResize` is on. */
		maxHeight?: number | string
		/** Manual resize affordance; ignored when `autoResize` is on. */
		resize?: 'vertical' | 'none' | 'both'
	}>(),
	{
		modelValue: '',
		placeholder: undefined,
		rows: 4,
		size: undefined,
		variant: undefined,
		disabled: false,
		autoResize: false,
		maxHeight: 160,
		resize: 'vertical',
	},
)

const emit = defineEmits<{
	'update:modelValue': [value: string]
}>()

const config = useDefaults('textarea', props)
const size = computed<UiSize>(() => config.value.size ?? 'md')
const variant = computed<UiInputVariant | 'bare'>(() => config.value.variant ?? 'default')

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const maxHeightPx = computed(() => (typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight))

const effectiveResize = computed(() => (props.autoResize ? 'none' : props.resize))

const textareaStyle = computed<CSSProperties>(() => ({
	resize: effectiveResize.value,
	maxHeight: props.autoResize ? maxHeightPx.value : undefined,
}))

function resize(): void {
	const el = textareaRef.value
	if (!el || !props.autoResize) return

	el.style.height = 'auto'
	const limit = Number.parseFloat(maxHeightPx.value) || Number.POSITIVE_INFINITY
	el.style.height = `${Math.min(el.scrollHeight, limit)}px`
}

function onInput(ev: Event): void {
	emit('update:modelValue', (ev.target as HTMLTextAreaElement).value)
	if (props.autoResize) {
		void nextTick(resize)
	}
}

watch(
	() => props.modelValue,
	() => {
		if (props.autoResize) void nextTick(resize)
	},
)

onMounted(() => {
	if (props.autoResize) void nextTick(resize)
})

function focus(): void {
	textareaRef.value?.focus()
}

function select(): void {
	textareaRef.value?.select()
}

function blur(): void {
	textareaRef.value?.blur()
}

defineExpose({ focus, select, blur, resize })
</script>

<template>
	<textarea
		ref="textareaRef"
		class="ui-textarea"
		:class="[`ui-textarea--${size}`, `ui-textarea--${variant}`, { 'ui-textarea--auto-resize': autoResize }]"
		:style="textareaStyle"
		:value="modelValue"
		:placeholder="placeholder"
		:rows="rows"
		:disabled="disabled"
		@input="onInput"
	/>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-textarea {
	width: 100%;
	min-width: var(--ui-textarea-min-width, auto);
	min-height: 5rem;
	font-family: inherit;
	background: var(--color-input-bg);
	color: var(--color-input-text);
	border: 1px solid var(--color-input-border);
	outline: none;
	resize: vertical;
	transition:
		background-color $duration-fast $easing-default,
		border-color $duration-fast $easing-default,
		box-shadow $duration-fast $easing-default;
	box-shadow: 0 0 0 0 transparent;

	&:focus {
		border-color: var(--color-input-border-focus);
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&::placeholder {
		color: var(--color-input-placeholder);
	}

	&--auto-resize {
		min-height: 0;
		overflow-y: auto;
	}

	&--sm {
		font-size: $text-xs;
		border-radius: $radius-sm;
		padding: $space-2;
	}

	&--md {
		font-size: $text-sm;
		border-radius: $radius-md;
		padding: $space-3;
	}

	&--lg {
		font-size: $text-md;
		border-radius: $radius-md;
		padding: $space-4;
	}

	&--ghost {
		background: var(--color-input-ghost-bg);
		border-color: var(--color-input-ghost-border);

		&:hover:not(:focus) {
			background: var(--color-input-ghost-bg-hover);
		}

		&:focus {
			border-color: var(--color-input-border-focus);
			box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
		}
	}

	&--bare {
		background: transparent;
		border-color: transparent;
		padding: 0;
		box-shadow: none;
		min-height: 0;

		&:focus {
			border-color: transparent;
			box-shadow: none;
		}
	}
}
</style>
