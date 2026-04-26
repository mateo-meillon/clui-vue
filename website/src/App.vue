<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { type SelectOption, type Theme, isDarkTheme, toastDanger, toastSuccess, toastWarning, useTheme } from 'clui-vue'
import GalleryNav from './components/GalleryNav.vue'

const { theme, toggleTheme } = useTheme()

const text = ref('Hello')
const password = ref('')
const number = ref('42')
const select = ref('beta')
const selectOptions: SelectOption[] = [
	{ label: 'Alpha', value: 'alpha' },
	{ label: 'Beta', value: 'beta' },
	{ label: 'Gamma', value: 'gamma' },
	{ label: 'Delta', value: 'delta' },
]
const themeOptions: { label: string; value: Theme }[] = [
	{ label: 'Light', value: 'light' },
	{ label: 'Light soft', value: 'light-soft' },
	{ label: 'Light contrast', value: 'light-contrast' },
	{ label: 'Light teal', value: 'light-teal' },
	{ label: 'Dark', value: 'dark' },
	{ label: 'Dark soft', value: 'dark-soft' },
	{ label: 'Dark contrast', value: 'dark-contrast' },
	{ label: 'Dark teal', value: 'dark-teal' },
]
const themeSelectOptions: SelectOption[] = themeOptions.map((o) => ({ label: o.label, value: o.value }))

const modalOpen = ref(false)
const progressActive = ref(false)
let progressTimer: ReturnType<typeof setTimeout> | null = null

function showProgressDemo(): void {
	progressActive.value = true
	if (progressTimer) clearTimeout(progressTimer)
	progressTimer = setTimeout(() => {
		progressActive.value = false
		progressTimer = null
	}, 2200)
}

onUnmounted(() => {
	if (progressTimer) clearTimeout(progressTimer)
})

const radio = ref('one')
const radioChoices = ['one', 'two', 'three'] as const

const iconNames = ['search', 'settings', 'darkMode', 'lightMode', 'checkCircle', 'error'] as const

const galleryNavOpen = ref(false)
</script>

<template>
	<div class="app-shell">
		<UiRouteProgress :active="progressActive" />
		<UiToastHost />

		<div class="gallery">
			<header class="gallery__bar">
				<div class="gallery__bar-start">
					<span class="gallery__menu-trigger">
						<UiButton
							variant="ghost"
							icon="menu"
							aria-label="Open page navigation"
							:aria-expanded="galleryNavOpen"
							aria-controls="gallery-nav-drawer"
							@click="galleryNavOpen = true"
						/>
					</span>
					<div class="gallery__brand">
						<span class="gallery__title">clui-vue</span>
						<span class="gallery__subtitle">Component gallery</span>
					</div>
				</div>
				<div class="gallery__bar-actions">
					<UiFormField class="gallery__field" label="Theme">
						<UiSelect v-model="theme" :options="themeSelectOptions" size="md" />
					</UiFormField>
					<UiButton variant="secondary" :icon="isDarkTheme(theme) ? 'lightMode' : 'darkMode'" @click="toggleTheme"> Toggle </UiButton>
				</div>
			</header>

			<div class="gallery__frame">
				<GalleryNav v-model:open="galleryNavOpen" />

				<main class="gallery__main">
					<section id="buttons" class="block">
						<h2 class="block__title">Button</h2>
						<p class="block__lede">Variants, sizes, icons, and loading state.</p>
						<UiCard padding="lg">
							<div class="row row--wrap">
								<UiButton variant="primary">Primary</UiButton>
								<UiButton variant="secondary">Secondary</UiButton>
								<UiButton variant="ghost">Ghost</UiButton>
								<UiButton variant="danger">Danger</UiButton>
							</div>
							<div class="row row--wrap push">
								<UiButton size="sm">Small</UiButton>
								<UiButton size="md">Medium</UiButton>
								<UiButton size="lg">Large</UiButton>
							</div>
							<div class="row row--wrap push">
								<UiButton variant="primary" icon="add">With icon</UiButton>
								<UiButton variant="secondary" size="md" icon="settings" />
								<UiButton variant="primary" :loading="true">Loading</UiButton>
								<UiButton variant="secondary" :disabled="true">Disabled</UiButton>
							</div>
						</UiCard>
					</section>

					<section id="inputs" class="block">
						<h2 class="block__title">Input</h2>
						<UiCard padding="lg">
							<div class="stack">
								<UiFormField label="Text">
									<UiInput v-model="text" type="text" placeholder="Type something" clearable />
								</UiFormField>
								<UiFormField label="With icon">
									<UiInput v-model="text" type="text" icon="search" clearable clear-aria-label="Clear search" />
								</UiFormField>
								<UiFormField label="Password">
									<UiInput v-model="password" type="password" placeholder="••••••••" />
								</UiFormField>
								<UiFormField label="Number">
									<UiInput v-model="number" type="number" />
								</UiFormField>
							</div>
						</UiCard>
					</section>

					<section id="form" class="block">
						<h2 class="block__title">Form field &amp; select</h2>
						<UiCard padding="lg">
							<div class="row row--tight">
								<UiFormField class="field-grow" label="Item">
									<UiSelect v-model="select" :options="selectOptions" placeholder="Choose" />
								</UiFormField>
								<UiFormField class="field-narrow" label="Size sm">
									<UiSelect v-model="select" :options="selectOptions" size="sm" />
								</UiFormField>
								<UiFormField class="field-narrow" label="Size lg">
									<UiSelect v-model="select" :options="selectOptions" size="lg" />
								</UiFormField>
							</div>
						</UiCard>
					</section>

					<section id="card" class="block">
						<h2 class="block__title">Card</h2>
						<UiCard padding="md">
							<p class="text-muted">Padding <code>md</code> — use for grouped content and demos.</p>
						</UiCard>
					</section>

					<section id="radio" class="block">
						<h2 class="block__title">Radio</h2>
						<p class="block__lede">Visual only — wire your own <code>v-model</code> and <code>radiogroup</code>.</p>
						<UiCard padding="lg">
							<div class="row row--wrap" role="radiogroup" aria-label="Sample">
								<button v-for="v in radioChoices" :key="v" type="button" class="radio-row" :aria-checked="radio === v" role="radio" @click="radio = v">
									<UiRadio :checked="radio === v" />
									<span>{{ v }}</span>
								</button>
							</div>
						</UiCard>
					</section>

					<section id="dropdown" class="block">
						<h2 class="block__title">Dropdown</h2>
						<UiCard padding="lg">
							<UiDropdown>
								<template #trigger="{ isOpen, toggle }">
									<UiButton variant="secondary" :active="isOpen" @click="toggle">Menu {{ isOpen ? '▲' : '▼' }}</UiButton>
								</template>
								<template #default="{ close }">
									<button type="button" class="ui-dropdown__item" @click="close">Action one</button>
									<button type="button" class="ui-dropdown__item" @click="close">Action two</button>
								</template>
							</UiDropdown>
						</UiCard>
					</section>

					<section id="modal" class="block">
						<h2 class="block__title">Modal</h2>
						<UiCard padding="lg">
							<UiButton variant="primary" @click="modalOpen = true">Open dialog</UiButton>
							<UiModal v-model="modalOpen" title="Example" size="md">
								<p class="text-muted">Modal body. Click outside, Escape, or close.</p>
								<template #footer>
									<UiButton variant="ghost" @click="modalOpen = false">Cancel</UiButton>
									<UiButton variant="primary" @click="modalOpen = false">Save</UiButton>
								</template>
							</UiModal>
						</UiCard>
					</section>

					<section id="skeleton" class="block">
						<h2 class="block__title">Skeleton</h2>
						<UiCard padding="lg">
							<div class="stack">
								<UiSkeleton variant="heading" width="40%" height="0.9rem" />
								<UiSkeleton variant="text" :lines="2" width="100%" />
								<div class="row" style="gap: 0.75rem; align-items: center">
									<UiSkeleton variant="circle" :size="40" />
									<div style="flex: 1; min-width: 0">
										<UiSkeleton variant="line" width="60%" class="skeleton-gap" />
										<UiSkeleton variant="line" width="100%" />
									</div>
								</div>
							</div>
						</UiCard>
					</section>

					<section id="toast" class="block">
						<h2 class="block__title">Toast</h2>
						<UiCard padding="lg">
							<div class="row row--wrap">
								<UiButton variant="secondary" @click="toastSuccess('Saved.')">Success</UiButton>
								<UiButton variant="secondary" @click="toastWarning('Check input.')">Warning</UiButton>
								<UiButton variant="danger" @click="toastDanger('Request failed.')">Danger</UiButton>
							</div>
						</UiCard>
					</section>

					<section id="route-progress" class="block">
						<h2 class="block__title">Route progress</h2>
						<UiCard padding="lg">
							<UiButton variant="primary" @click="showProgressDemo">Run ~2s bar</UiButton>
						</UiCard>
					</section>

					<section id="icon" class="block">
						<h2 class="block__title">Icon</h2>
						<UiCard padding="lg">
							<div class="row row--wrap icon-row">
								<UiIcon v-for="n in iconNames" :key="n" :name="n" :size="28" />
							</div>
						</UiCard>
					</section>
				</main>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

:global(html) {
	height: 100%;
	scroll-behavior: smooth;
}

:global(body) {
	height: 100%;
	margin: 0;
}

:global(#app) {
	height: 100%;
}

.app-shell {
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	height: 100%;
	min-height: 100dvh;
	max-height: 100dvh;
	overflow: hidden;
}

.gallery {
	flex: 1;
	min-height: 0;
	display: flex;
	flex-direction: column;
	background: var(--color-bg);
	color: var(--color-text);
}

.gallery__bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: $space-4;
	flex-wrap: wrap;
	padding: $space-4 $space-5;
	border-bottom: 1px solid var(--color-border);
	background: var(--color-bg-surface);
	position: sticky;
	top: 0;
	z-index: 10;
}

.gallery__bar-start {
	display: flex;
	align-items: center;
	gap: $space-2;
	min-width: 0;
}

.gallery__menu-trigger {
	display: none;
	flex-shrink: 0;
	line-height: 0;
}

.gallery__brand {
	display: flex;
	flex-direction: column;
	gap: 2px;
	min-width: 0;
}

.gallery__title {
	font-size: $text-lg;
	font-weight: 600;
	letter-spacing: -0.02em;
}

.gallery__subtitle {
	font-size: $text-sm;
	color: var(--color-text-secondary);
}

.gallery__bar-actions {
	display: flex;
	align-items: flex-end;
	gap: $space-3;
	flex-wrap: wrap;
}

.gallery__field {
	min-width: 12rem;
}

.gallery__frame {
	display: flex;
	flex: 1;
	min-height: 0;
}

.gallery__main {
	flex: 1;
	min-width: 0;
	min-height: 0;
	overflow-y: auto;
	scroll-behavior: smooth;
	padding: $space-6 $space-6 $space-8;
}

.block {
	scroll-margin-top: $space-6;
	max-width: 56rem;
	margin-inline: auto;

	& + & {
		margin-top: $space-8;
	}
}

.block__title {
	margin: 0 0 $space-1;
	font-size: 1.25rem;
	font-weight: 600;
	letter-spacing: -0.02em;
}

.block__lede {
	margin: 0 0 $space-4;
	font-size: $text-sm;
	color: var(--color-text-secondary);
}

.row {
	display: flex;
	align-items: center;
	gap: $space-3;
}

.row--wrap {
	flex-wrap: wrap;
}

.row--tight {
	flex-wrap: wrap;
	gap: $space-4;
	max-width: 40rem;
	align-items: flex-end;
}

.push {
	margin-top: $space-3;
}

.stack {
	display: flex;
	flex-direction: column;
	gap: $space-4;
	max-width: 22rem;
}

.text-muted {
	margin: 0;
	color: var(--color-text-secondary);
	font-size: $text-sm;
	line-height: 1.5;

	code {
		font-size: 0.9em;
	}
}

.field-grow {
	min-width: 10rem;
	flex: 1 1 10rem;
}

.field-narrow {
	min-width: 8rem;
	flex: 0 1 8rem;
}

.radio-row {
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

.skeleton-gap {
	margin-bottom: $space-2;
}

.icon-row {
	gap: $space-3;
}

@media (max-width: 720px) {
	.gallery__menu-trigger {
		display: inline-flex;
		align-items: center;
	}

	.gallery__frame {
		flex: 1;
		min-height: 0;
	}

	.gallery__main {
		flex: 1;
		min-height: 0;
	}
}
</style>
