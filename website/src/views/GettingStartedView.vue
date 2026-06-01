<script setup lang="ts">
import { RouterLink } from 'vue-router'
import HighlightedCode from '../components/HighlightedCode.vue'

const installCode = 'pnpm add clui-vue'

const pluginCode = `import { createApp } from 'vue'
import App from './App.vue'
import 'clui-vue/styles/base'
import CluiVue from 'clui-vue'

createApp(App).use(CluiVue).mount('#app')`

const themeComposableCode = `import { useTheme } from 'clui-vue'

const { theme, toggleTheme } = useTheme()`
</script>

<template>
	<div class="page">
		<UiCard class="hero" padding="lg">
			<h1 class="title">Getting started</h1>
			<p class="lede">
				<code class="pkg">clui-vue</code> is a compact component kit with a global install. Use this gallery to browse components, copy patterns, and tweak props live.
			</p>
		</UiCard>

		<ol class="steps">
			<li class="step">
				<UiCard padding="md">
					<div class="step-head">
						<span class="step-num" aria-hidden="true">1</span>
						<UiIcon name="add" class="step-icon" :size="18" aria-hidden="true" />
						<h2 class="step-title">Install</h2>
					</div>
					<p class="step-copy">Add the package from npm. Peer dependency: <code>vue@^3.5</code>.</p>
					<HighlightedCode class="step-code" :code="installCode" lang="bash" />
				</UiCard>
			</li>

			<li class="step">
				<UiCard padding="md">
					<div class="step-head">
						<span class="step-num" aria-hidden="true">2</span>
						<UiIcon name="extension" class="step-icon" :size="18" aria-hidden="true" />
						<h2 class="step-title">Register the plugin</h2>
					</div>
					<p class="step-copy">Import base styles once, then register <code>CluiVue</code> so components are available app-wide.</p>
					<HighlightedCode class="step-code" :code="pluginCode" lang="typescript" />
				</UiCard>
			</li>

			<li class="step">
				<UiCard padding="md">
					<div class="step-head">
						<span class="step-num" aria-hidden="true">3</span>
						<UiIcon name="palette" class="step-icon" :size="18" aria-hidden="true" />
						<h2 class="step-title">Styles and themes</h2>
					</div>
					<p class="step-copy">
						Import SCSS from <code>clui-vue/tokens</code> and <code>clui-vue/theme</code> in your own styles. Switch palettes at runtime with <code>useTheme()</code> — try the
						theme controls in the header of this site.
					</p>
					<HighlightedCode class="step-code" :code="themeComposableCode" lang="typescript" />
				</UiCard>
			</li>
		</ol>

		<UiCard class="cta" padding="md">
			<div class="cta-inner">
				<div class="cta-text">
					<div class="cta-head">
						<UiIcon name="grid_view" class="cta-icon" :size="20" aria-hidden="true" />
						<h2 class="cta-title">Explore the gallery</h2>
					</div>
					<p class="cta-copy">Open <strong>Overview</strong> for the full grid, or use <strong>Components</strong> in the sidebar to jump straight into a playground.</p>
				</div>
				<RouterLink v-slot="{ navigate }" :to="{ name: 'overview' }" custom>
					<UiButton class="cta-btn" variant="primary" @click="navigate"> Go to Overview </UiButton>
				</RouterLink>
			</div>
		</UiCard>
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.page {
	box-sizing: border-box;
	width: 100%;
	max-width: 44rem;
	margin-inline: auto;
	display: flex;
	flex-direction: column;
	gap: $space-5;
}

.hero {
	.title {
		margin: 0 0 $space-3;
		font-size: clamp(1.5rem, 4vw, 1.875rem);
		font-weight: 600;
		letter-spacing: -0.03em;
		line-height: 1.2;
	}

	.lede {
		margin: 0;
		font-size: $text-md;
		line-height: 1.55;
		color: var(--color-text-secondary);

		.pkg {
			font-size: 0.92em;
			font-weight: 500;
			color: var(--color-text);
		}
	}
}

.steps {
	margin: 0;
	padding: 0;
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: $space-4;
}

.step-head {
	display: flex;
	align-items: center;
	gap: $space-3;
	flex-wrap: wrap;
	margin-bottom: $space-2;
}

.step-num {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 1.625rem;
	height: 1.625rem;
	padding: 0 $space-1;
	border-radius: 999px;
	font-size: $text-xs;
	font-weight: 700;
	line-height: 1;
	background: color-mix(in srgb, var(--color-primary) 16%, transparent);
	color: var(--color-primary);
}

.step-icon {
	flex-shrink: 0;
	color: var(--color-text-secondary);
}

.step-title {
	margin: 0;
	font-size: $text-md;
	font-weight: 600;
	letter-spacing: -0.02em;
}

.step-copy {
	margin: 0 0 $space-3;
	font-size: $text-sm;
	line-height: 1.55;
	color: var(--color-text-secondary);

	code {
		font-size: 0.9em;
		color: var(--color-text);
	}
}

.step-code {
	margin-top: 0;
}

.cta {
	background: color-mix(in srgb, var(--color-primary) 6%, var(--color-bg-surface));
	border-color: color-mix(in srgb, var(--color-primary) 22%, var(--color-border));
}

.cta-inner {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: $space-5;
	flex-wrap: wrap;
}

.cta-head {
	display: flex;
	align-items: center;
	gap: $space-2;
	margin-bottom: $space-2;
}

.cta-icon {
	flex-shrink: 0;
	color: var(--color-primary);
}

.cta-title {
	margin: 0;
	font-size: $text-md;
	font-weight: 600;
	letter-spacing: -0.02em;
}

.cta-copy {
	margin: 0;
	font-size: $text-sm;
	line-height: 1.55;
	color: var(--color-text-secondary);
	max-width: 28rem;
}

.cta-btn {
	flex-shrink: 0;
}
</style>
