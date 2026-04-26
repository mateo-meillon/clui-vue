<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

const TOGGLE_HOST_ID = 'gallery-nav-toggle-host'

const navLinks = [
	{ href: '#buttons', label: 'Button' },
	{ href: '#inputs', label: 'Input' },
	{ href: '#form', label: 'Form field & select' },
	{ href: '#card', label: 'Card' },
	{ href: '#radio', label: 'Radio' },
	{ href: '#dropdown', label: 'Dropdown' },
	{ href: '#modal', label: 'Modal' },
	{ href: '#skeleton', label: 'Skeleton' },
	{ href: '#toast', label: 'Toast' },
	{ href: '#route-progress', label: 'Route progress' },
	{ href: '#icon', label: 'Icon' },
] as const

const navOpen = ref(false)

function closeNav(): void {
	navOpen.value = false
}

function onNavLinkClick(): void {
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
	<Teleport :to="`#${TOGGLE_HOST_ID}`">
		<UiButton
			class="gallery-nav__toggle"
			variant="ghost"
			icon="menu"
			aria-label="Open page navigation"
			:aria-expanded="navOpen"
			aria-controls="gallery-nav-drawer"
			@click="navOpen = true"
		/>
	</Teleport>

	<nav class="gallery-nav gallery-nav--desktop" aria-label="On this page">
		<a v-for="link in navLinks" :key="link.href" :href="link.href">{{ link.label }}</a>
	</nav>

	<div
		class="gallery-nav__drawer"
		:class="{ 'gallery-nav__drawer--open': navOpen }"
		:aria-hidden="navOpen ? 'false' : 'true'"
	>
		<div class="gallery-nav__drawer-backdrop" aria-hidden="true" @click="closeNav" />
		<div
			id="gallery-nav-drawer"
			class="gallery-nav__drawer-panel"
			role="dialog"
			aria-modal="true"
			aria-label="On this page"
			@click.stop
		>
			<div class="gallery-nav__drawer-head">
				<span class="gallery-nav__drawer-title">On this page</span>
				<UiButton variant="ghost" icon="close" aria-label="Close navigation" @click="closeNav" />
			</div>
			<nav class="gallery-nav gallery-nav--drawer" aria-label="On this page">
				<a v-for="link in navLinks" :key="link.href" :href="link.href" @click="onNavLinkClick">{{ link.label }}</a>
			</nav>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.gallery-nav__toggle {
	display: none;
	flex-shrink: 0;
}

.gallery-nav {
	flex-shrink: 0;
	min-height: 0;
	display: flex;
	flex-direction: column;
	gap: $space-1;
	box-sizing: border-box;

	a {
		font-size: $text-sm;
		color: var(--color-text-secondary);
		text-decoration: none;
		padding: $space-1 $space-2;
		border-radius: $radius-sm;

		&:hover {
			color: var(--color-text);
			background: var(--color-btn-ghost-bg-hover);
		}
	}
}

.gallery-nav--desktop {
	width: 13rem;
	padding: $space-5 $space-4;
	border-right: 1px solid var(--color-border);
	background: var(--color-bg-surface);
	overflow-y: auto;
}

.gallery-nav--drawer {
	flex: 1;
	min-height: 0;
	padding: 0 $space-4 $space-5;
	overflow-y: auto;
}

.gallery-nav__drawer {
	position: fixed;
	inset: 0;
	z-index: 100;
	pointer-events: none;
	visibility: hidden;
	transition: visibility 0.2s;

	&--open {
		pointer-events: auto;
		visibility: visible;
	}
}

.gallery-nav__drawer-backdrop {
	position: absolute;
	inset: 0;
	background: color-mix(in srgb, var(--color-text) 35%, transparent);
	opacity: 0;
	transition: opacity 0.2s ease;
}

.gallery-nav__drawer--open .gallery-nav__drawer-backdrop {
	opacity: 1;
}

.gallery-nav__drawer-panel {
	position: absolute;
	z-index: 1;
	left: 0;
	top: 0;
	bottom: 0;
	width: min(16rem, 88vw);
	max-width: 100%;
	display: flex;
	flex-direction: column;
	background: var(--color-bg-surface);
	border-right: 1px solid var(--color-border);
	box-shadow: 4px 0 24px color-mix(in srgb, var(--color-text) 12%, transparent);
	transform: translateX(-100%);
	transition: transform 0.2s ease;
}

.gallery-nav__drawer--open .gallery-nav__drawer-panel {
	transform: translateX(0);
}

.gallery-nav__drawer-head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: $space-3;
	padding: $space-4 $space-4 $space-3;
	border-bottom: 1px solid var(--color-border);
	flex-shrink: 0;
}

.gallery-nav__drawer-title {
	font-size: $text-sm;
	font-weight: 600;
	color: var(--color-text);
}

@media (max-width: 720px) {
	.gallery-nav__toggle {
		display: inline-flex;
	}

	.gallery-nav--desktop {
		display: none;
	}
}
</style>
