<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { UiTreeNode } from 'clui-vue'
import { COMPONENTS_ROOT_ID, buildGalleryNavTree } from '../nav-tree'

const navOpen = defineModel<boolean>('open', { default: false })

const route = useRoute()
const router = useRouter()

const navNodes = buildGalleryNavTree()

const expandedKeys = ref<string[]>([COMPONENTS_ROOT_ID])

watch(
	() => [route.name, route.params.slug] as const,
	() => {
		const next = new Set(expandedKeys.value)
		if (route.name === 'playground') {
			next.add(COMPONENTS_ROOT_ID)
		}
		expandedKeys.value = [...next]
	},
	{ immediate: true },
)

const activeId = computed(() => {
	if (route.name === 'getting-started') return 'getting-started'
	if (route.name === 'overview') return 'overview'
	if (route.name === 'playground') return `pg-${String(route.params.slug ?? '')}`
	return null
})

function closeNav(): void {
	navOpen.value = false
}

function onActivate(node: UiTreeNode): void {
	if (node.id === 'getting-started') void router.push({ name: 'getting-started' })
	else if (node.id === 'overview') void router.push({ name: 'overview' })
	else if (node.id.startsWith('pg-')) void router.push({ name: 'playground', params: { slug: node.id.slice(3) } })
	closeNav()
}

watch(navOpen, (open) => {
	if (typeof document === 'undefined') return
	document.body.style.overflow = open ? 'hidden' : ''
})

function onNavEscape(e: KeyboardEvent): void {
	if (e.key === 'Escape') closeNav()
}

onMounted(() => {
	window.addEventListener('keydown', onNavEscape)
})

onUnmounted(() => {
	window.removeEventListener('keydown', onNavEscape)
	if (typeof document !== 'undefined') document.body.style.overflow = ''
})
</script>

<template>
	<div class="nav desktop" aria-label="Documentation">
		<UiTree v-model:expanded-keys="expandedKeys" :nodes="navNodes" :active-id="activeId" @activate="onActivate" />
	</div>

	<div class="drawer" :class="{ open: navOpen }" :aria-hidden="navOpen ? 'false' : 'true'">
		<div class="backdrop" aria-hidden="true" @click="closeNav" />
		<div id="gallery-nav-drawer" class="panel" role="dialog" aria-modal="true" aria-label="Documentation" @click.stop>
			<div class="head">
				<span class="menu-title">Menu</span>
				<UiButton variant="ghost" icon="close" aria-label="Close navigation" @click="closeNav" />
			</div>
			<div class="tree">
				<UiTree v-model:expanded-keys="expandedKeys" :nodes="navNodes" :active-id="activeId" @activate="onActivate" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.nav {
	flex-shrink: 0;
	min-height: 0;
	box-sizing: border-box;

	&.desktop {
		width: 18rem;
		padding: $space-5 $space-3 $space-5 $space-2;
		border-right: 1px solid var(--color-border);
		background: var(--color-bg-surface);
		overflow-x: hidden;
		overflow-y: auto;
	}
}

.drawer {
	position: fixed;
	inset: 0;
	z-index: 100;
	pointer-events: none;
	visibility: hidden;
	transition: visibility 0.2s;

	&.open {
		pointer-events: auto;
		visibility: visible;

		.backdrop {
			opacity: 1;
		}

		.panel {
			transform: translateX(0);
		}
	}

	.backdrop {
		position: absolute;
		inset: 0;
		background: color-mix(in srgb, var(--color-text) 35%, transparent);
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.panel {
		position: absolute;
		z-index: 1;
		left: 0;
		top: 0;
		bottom: 0;
		width: min(18rem, 88vw);
		max-width: 100%;
		display: flex;
		flex-direction: column;
		padding-left: env(safe-area-inset-left, 0px);
		background: var(--color-bg-surface);
		border-right: 1px solid var(--color-border);
		box-shadow: 4px 0 24px color-mix(in srgb, var(--color-text) 12%, transparent);
		transform: translateX(-100%);
		transition: transform 0.2s ease;
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: $space-3;
		padding: calc(#{$space-4} + env(safe-area-inset-top, 0px)) $space-4 $space-3;
		border-bottom: 1px solid var(--color-border);
		flex-shrink: 0;

		.menu-title {
			font-size: $text-sm;
			font-weight: 600;
			color: var(--color-text);
		}
	}

	.tree {
		flex: 1;
		min-height: 0;
		padding: 0 $space-2 calc(#{$space-5} + env(safe-area-inset-bottom, 0px)) $space-2;
		overflow-x: hidden;
		overflow-y: auto;
	}
}

@media (max-width: 720px) {
	.nav.desktop {
		display: none;
	}
}
</style>
