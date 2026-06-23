<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, useId, watch } from 'vue'
import type { SelectOption, UiSize } from '../types'

const props = withDefaults(
	defineProps<{
		modelValue?: string
		options: SelectOption[]
		placeholder?: string
		size?: UiSize
		disabled?: boolean
		/** Open the list above the trigger (e.g. footer controls near the window bottom). */
		placement?: 'bottom' | 'top'
	}>(),
	{
		modelValue: '',
		placeholder: undefined,
		size: 'md',
		disabled: false,
		placement: 'bottom',
	},
)

const emit = defineEmits<{
	'update:modelValue': [value: string]
}>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)
const listboxId = useId()

/** Block ghost `click` on trigger right after option pick (panel gone, same coords; esp. mobile). */
const ignoreTriggerToggleUntil = ref(0)

let docClickHandler: ((e: MouseEvent) => void) | null = null

function removeDocClick(): void {
	if (docClickHandler) {
		document.removeEventListener('click', docClickHandler)
		docClickHandler = null
	}
}

function close(): void {
	open.value = false
}

function toggle(): void {
	if (props.disabled) return
	if (Date.now() < ignoreTriggerToggleUntil.value) return
	open.value = !open.value
}

function onEscape(e: KeyboardEvent): void {
	if (e.key === 'Escape') close()
}

function selectValue(value: string): void {
	ignoreTriggerToggleUntil.value = Date.now() + 10
	close()
	emit('update:modelValue', value)
}

watch(open, (isOpen) => {
	removeDocClick()
	if (isOpen) {
		document.addEventListener('keydown', onEscape)
		nextTick(() => {
			docClickHandler = (e: MouseEvent) => {
				if (root.value && !root.value.contains(e.target as Node)) close()
			}
			document.addEventListener('click', docClickHandler)
		})
	} else {
		document.removeEventListener('keydown', onEscape)
	}
})

// If the bound value changes while open, always close.
// This covers cases where selection happens via parent-side updates.
watch(
	() => props.modelValue,
	(next, prev) => {
		if (!open.value) return
		if (next === prev) return
		close()
	},
)

onUnmounted(() => {
	removeDocClick()
	document.removeEventListener('keydown', onEscape)
})

const selectedOption = computed(() => props.options.find((o) => o.value === props.modelValue))

const displayLabel = computed(() => {
	if (selectedOption.value) return selectedOption.value.label
	if (props.placeholder !== undefined && props.modelValue === '') return props.placeholder
	return props.modelValue || '\u00a0'
})

const isPlaceholder = computed(() => props.placeholder !== undefined && !selectedOption.value && props.modelValue === '')
</script>

<template>
	<div ref="root" class="ui-select" :class="[`ui-select--${size}`, { 'ui-select--open': open, 'ui-select--placement-top': placement === 'top' }]">
		<button
			type="button"
			class="ui-select__trigger"
			:class="{ 'ui-select__trigger--placeholder': isPlaceholder }"
			:disabled="disabled"
			:aria-expanded="open"
			aria-haspopup="listbox"
			:aria-controls="listboxId"
			@click="toggle"
			@keydown.down.prevent="!disabled && (open = true)"
			@keydown.up.prevent="!disabled && (open = true)"
			@keydown.enter.prevent="toggle"
			@keydown.space.prevent="toggle"
		>
			<span class="ui-select__value">{{ displayLabel }}</span>
			<span class="ui-select__chevron" aria-hidden="true">
				<UiIcon name="chevron_right" :size="12" />
			</span>
		</button>
		<Transition name="ui-select-panel">
			<div v-if="open" :id="listboxId" class="ui-select__panel" role="listbox" aria-orientation="vertical">
				<div v-for="opt in options" :key="opt.value" role="option" class="ui-select__option" :aria-selected="modelValue === opt.value" @click.stop="selectValue(opt.value)">
					{{ opt.label }}
				</div>
			</div>
		</Transition>
	</div>
</template>

<style scoped lang="scss">
@use '../tokens' as *;

.ui-select {
	position: relative;
	width: 100%;
}

.ui-select__trigger {
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	gap: $space-2;
	font-family: $font-sans;
	background: var(--color-input-bg);
	color: var(--color-input-text);
	border: 1px solid var(--color-input-border);
	outline: none;
	cursor: pointer;
	text-align: left;
	transition:
		border-color $duration-fast $easing-default,
		box-shadow $duration-fast $easing-default;

	&:focus {
		border-color: var(--color-input-border-focus);
		box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
	}

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&--placeholder {
		color: var(--color-input-placeholder);
	}
}

.ui-select__value {
	flex: 1;
	min-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.ui-select__chevron {
	display: inline-flex;
	flex-shrink: 0;
	color: var(--color-text-secondary);
	transform: rotate(90deg);
	transition: transform $duration-fast $easing-default;
}

.ui-select--open .ui-select__chevron {
	transform: rotate(270deg);
}

.ui-select--placement-top .ui-select__panel {
	top: auto;
	bottom: calc(100% + #{$space-2});
}

.ui-select__panel {
	position: absolute;
	top: calc(100% + #{$space-2});
	left: 0;
	right: 0;
	// Must float above app content (e.g., editors with their own stacking contexts).
	z-index: 10100;
	padding: $space-1;
	background: var(--color-bg-surface);
	border: 1px solid var(--color-border);
	border-radius: $radius-md;
	box-shadow: 0 12px 40px var(--color-shadow);
	display: flex;
	flex-direction: column;
	gap: $space-1;
	max-height: min(16rem, 50vh);
	overflow-y: auto;
	// Let touch scrolling win over option activation; click selects after a real tap.
	touch-action: pan-y;
	-webkit-overflow-scrolling: touch;
	overscroll-behavior: contain;
}

.ui-select__option {
	display: flex;
	width: 100%;
	align-items: center;
	padding: $space-2 $space-3;
	border-radius: $radius-sm;
	font-family: $font-sans;
	font-size: $text-sm;
	font-weight: 500;
	color: var(--color-text);
	cursor: pointer;
	transition: background $duration-fast $easing-default;

	&:hover {
		background: var(--color-btn-ghost-bg-hover);
	}

	&[aria-selected='true'] {
		background: rgba(37, 99, 235, 0.08);
		color: var(--color-input-border-focus);
	}
}

.ui-select-panel-enter-active,
.ui-select-panel-leave-active {
	transition:
		opacity $duration-normal $easing-default,
		transform $duration-normal $easing-default;
}

.ui-select-panel-enter-from,
.ui-select-panel-leave-to {
	opacity: 0;
	transform: translateY(-4px);
}

.ui-select--placement-top .ui-select-panel-enter-from,
.ui-select--placement-top .ui-select-panel-leave-to {
	transform: translateY(4px);
}

.ui-select--sm .ui-select__trigger {
	font-size: $text-xs;
	padding: $space-1 $space-2;
	border-radius: $radius-sm;
	min-height: 28px;
}

.ui-select--md .ui-select__trigger {
	font-size: $text-sm;
	padding: $space-2 $space-3;
	border-radius: $radius-md;
	min-height: 36px;
}

.ui-select--lg .ui-select__trigger {
	font-size: $text-md;
	padding: $space-3 $space-4;
	border-radius: $radius-md;
	min-height: 44px;
}
</style>
