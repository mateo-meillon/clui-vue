<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { type SelectOption, type Theme, isDarkTheme, useTheme } from 'clui-vue'
import GalleryNav from '../components/GalleryNav.vue'
import { GALLERY_ROUTE_PROGRESS_MANUAL_KEY } from '../composables/galleryRouteProgress'

const { theme, toggleTheme } = useTheme()

const route = useRoute()
const router = useRouter()

/** Manual toggle from Route progress playground only */
const manualRouteProgress = ref(false)
provide(GALLERY_ROUTE_PROGRESS_MANUAL_KEY, manualRouteProgress)

/** Brief pulse during router navigations (e.g. lazy-loaded playground chunks). */
const routerNavPending = ref(false)
router.beforeEach((_to, _from, next) => {
	routerNavPending.value = true
	next()
})
router.afterEach(() => {
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			routerNavPending.value = false
		})
	})
})

watch(
	() => route.params.slug,
	(slug) => {
		if (slug !== 'route-progress') manualRouteProgress.value = false
	},
)

const routeProgressActive = computed(() => manualRouteProgress.value || routerNavPending.value)

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

const galleryNavOpen = ref(false)

const npmPackageUrl = 'https://www.npmjs.com/package/clui-vue'
const githubRepoUrl = 'https://github.com/mateo-meillon/clui-vue'

const barEl = ref<HTMLElement | null>(null)
const mainEl = ref<HTMLElement | null>(null)
const headerHidden = ref(false)
const headerHeightPx = ref(0)
const lastScrollTop = ref(0)
const reduceMotion = ref(false)

let barResizeObserver: ResizeObserver | null = null

function measureBar(): void {
	const el = barEl.value
	headerHeightPx.value = el?.offsetHeight ?? 0
}

function onMainScroll(ev: Event): void {
	if (reduceMotion.value) return
	const el = ev.target as HTMLElement
	const st = Math.max(0, el.scrollTop)
	const delta = st - lastScrollTop.value
	lastScrollTop.value = st

	const edgePx = 40
	const minDelta = 10

	if (st <= edgePx) {
		headerHidden.value = false
		return
	}
	if (Math.abs(delta) < minDelta) return
	if (delta > 0) headerHidden.value = true
	else headerHidden.value = false
}

watch(
	() => route.fullPath,
	async () => {
		headerHidden.value = false
		await nextTick()
		lastScrollTop.value = mainEl.value?.scrollTop ?? 0
	},
)

onMounted(() => {
	reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
	nextTick(() => {
		measureBar()
		const bar = barEl.value
		if (bar && typeof ResizeObserver !== 'undefined') {
			barResizeObserver = new ResizeObserver(() => measureBar())
			barResizeObserver.observe(bar)
		}
	})
})

onUnmounted(() => {
	barResizeObserver?.disconnect()
	barResizeObserver = null
})
</script>

<template>
	<div class="shell">
		<UiToastHost />
		<UiRouteProgress :active="routeProgressActive" />

		<div class="gallery">
			<header ref="barEl" class="bar" :class="{ 'bar--hidden': headerHidden }" :aria-hidden="headerHidden">
				<div class="start">
					<span class="menu">
						<UiButton
							variant="ghost"
							icon="menu"
							aria-label="Open page navigation"
							:aria-expanded="galleryNavOpen"
							aria-controls="gallery-nav-drawer"
							@click="galleryNavOpen = true"
						/>
					</span>
					<RouterLink class="brand" :to="{ name: 'getting-started' }">
						<span class="title">clui-vue</span>
						<span class="subtitle">Component gallery</span>
					</RouterLink>
				</div>
				<div class="actions">
					<div class="external">
						<UiButton variant="ghost" icon="code" aria-label="clui-vue on npm" :href="npmPackageUrl" target="_blank" rel="noopener noreferrer" />
						<UiButton variant="ghost" icon="link" aria-label="clui-vue on GitHub" :href="githubRepoUrl" target="_blank" rel="noopener noreferrer" />
					</div>
					<div class="theme-tools">
						<UiFormField class="field" label="Theme">
							<UiSelect v-model="theme" :options="themeSelectOptions" size="md" />
						</UiFormField>
						<UiButton variant="secondary" :icon="isDarkTheme(theme) ? 'light_mode' : 'dark_mode'" @click="toggleTheme"> Toggle </UiButton>
					</div>
				</div>
			</header>

			<div class="frame">
				<GalleryNav v-model:open="galleryNavOpen" />

				<main ref="mainEl" class="main" @scroll.passive="onMainScroll" :style="{ paddingTop: `${headerHeightPx + 24}px` }">
					<RouterView />
				</main>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.shell {
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	flex: 1;
	min-height: 0;
	width: 100%;
	overflow: hidden;
}

.gallery {
	flex: 1;
	min-height: 0;
	display: flex;
	flex-direction: column;
	background: var(--color-bg);
	color: var(--color-text);
	box-sizing: border-box;

	/* Viewport-fixed chrome; translateY when .bar--hidden (scroll handled in script). */
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: $space-4;
		flex-wrap: wrap;
		padding-top: calc(#{$space-4} + env(safe-area-inset-top, 0px));
		padding-right: calc(#{$space-5} + env(safe-area-inset-right, 0px));
		padding-bottom: $space-4;
		padding-left: calc(#{$space-5} + env(safe-area-inset-left, 0px));
		border-bottom: 1px solid var(--color-border);
		background: var(--color-bg-surface);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 25;
		transition: transform $duration-normal $easing-default;

		&.bar--hidden {
			transform: translateY(-100%);
			pointer-events: none;
		}

		.start {
			display: flex;
			align-items: center;
			gap: $space-2;
			min-width: 0;

			.menu {
				display: none;
				flex-shrink: 0;
				line-height: 0;
			}

			.brand {
				display: flex;
				flex-direction: column;
				gap: 2px;
				min-width: 0;
				text-decoration: none;
				color: inherit;

				&:hover .title {
					text-decoration: underline;
					text-underline-offset: 3px;
				}

				.title {
					font-size: $text-lg;
					font-weight: 600;
					letter-spacing: -0.02em;
				}

				.subtitle {
					font-size: $text-sm;
					color: var(--color-text-secondary);
				}
			}
		}

		.actions {
			display: flex;
			align-items: flex-end;
			gap: $space-3;
			flex-wrap: wrap;

			.theme-tools {
				display: flex;
				align-items: flex-end;
				gap: $space-3;
				flex-wrap: wrap;
			}

			.external {
				display: flex;
				align-items: center;
				gap: $space-1;
				padding-bottom: 2px;
			}

			.field {
				min-width: 12rem;
			}
		}
	}

	.frame {
		display: flex;
		flex: 1;
		min-height: 0;

		.main {
			flex: 1;
			min-width: 0;
			min-height: 0;
			overflow-y: auto;
			scroll-behavior: smooth;
			padding-inline: calc(#{$space-6} + env(safe-area-inset-left, 0px)) calc(#{$space-6} + env(safe-area-inset-right, 0px));
			padding-bottom: calc(#{$space-8} + env(safe-area-inset-bottom, 0px));
		}
	}
}

@media (max-width: 720px) {
	.gallery .bar {
		align-items: center;
		flex-wrap: wrap;
		row-gap: $space-3;
	}

	.gallery .bar .start .menu {
		display: inline-flex;
		align-items: center;
	}

	/* Flatten .actions so .external can sit on the title row; .theme-tools wraps full width below */
	.gallery .bar .actions {
		display: contents;
	}

	.gallery .bar .start {
		flex: 1 1 auto;
		min-width: 0;
	}

	.gallery .bar .external {
		flex-shrink: 0;
		padding-bottom: 0;
	}

	.gallery .bar .theme-tools {
		flex: 1 1 100%;
		width: 100%;
		justify-content: space-between;
		align-items: flex-end;
	}

	.gallery .bar .theme-tools .field {
		flex: 1 1 auto;
		min-width: 0;
		max-width: 100%;
	}
}

@media (prefers-reduced-motion: reduce) {
	.gallery .bar {
		transition: none;
	}
}
</style>
