<script setup lang="ts">
import { ref, watch } from 'vue'
import { codeToHtml } from 'shiki'
import { isDarkTheme, useTheme } from 'clui-vue'

const props = withDefaults(
	defineProps<{
		code: string
		lang?: string
	}>(),
	{ lang: 'vue' },
)

const { theme } = useTheme()
const html = ref('')
const failed = ref(false)

async function highlight(): Promise<void> {
	if (!props.code.trim()) {
		html.value = ''
		failed.value = false
		return
	}
	try {
		const shikiTheme = isDarkTheme(theme.value) ? 'github-dark' : 'github-light'
		html.value = await codeToHtml(props.code, {
			lang: props.lang,
			theme: shikiTheme,
		})
		failed.value = false
	} catch {
		failed.value = true
		html.value = ''
	}
}

watch([() => props.code, () => props.lang, theme], highlight, { immediate: true })
</script>

<template>
	<div class="highlighted-code">
		<pre v-if="failed" class="fallback"><code>{{ code }}</code></pre>
		<div v-else class="shiki-out" v-html="html" />
	</div>
</template>

<style scoped lang="scss">
@use 'clui-vue/tokens' as *;

.highlighted-code {
	border-radius: $radius-md;
	border: 1px solid var(--color-border);
	background: var(--color-bg);
	overflow: hidden;
}

.shiki-out :deep(pre) {
	margin: 0;
	padding: $space-4;
	overflow-x: auto;
	font-size: $text-xs;
	line-height: 1.5;
}

.shiki-out :deep(pre.shiki) {
	background: transparent !important;
}

.fallback {
	margin: 0;
	padding: $space-4;
	overflow-x: auto;
	font-size: $text-xs;
	line-height: 1.5;

	code {
		font-family: ui-monospace, monospace;
		color: var(--color-text);
		white-space: pre;
	}
}
</style>
