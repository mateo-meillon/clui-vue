<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
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
</script>

<template>
	<div class="shell">
		<UiToastHost />
		<UiRouteProgress :active="routeProgressActive" />

		<div class="gallery">
			<header class="bar">
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
					<UiFormField class="field" label="Theme">
						<UiSelect v-model="theme" :options="themeSelectOptions" size="md" />
					</UiFormField>
					<UiButton variant="secondary" :icon="isDarkTheme(theme) ? 'lightMode' : 'darkMode'" @click="toggleTheme"> Toggle </UiButton>
				</div>
			</header>

			<div class="frame">
				<GalleryNav v-model:open="galleryNavOpen" />

				<main class="main">
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

	.bar {
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
			padding: $space-6 $space-6 $space-8;
		}
	}
}

@media (max-width: 720px) {
	.gallery .bar .start .menu {
		display: inline-flex;
		align-items: center;
	}

	.gallery .frame {
		flex: 1;
		min-height: 0;
	}

	.gallery .frame .main {
		flex: 1;
		min-height: 0;
	}
}
</style>
