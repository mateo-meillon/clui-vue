<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getEntryBySlug } from '../registry'

const props = defineProps<{
	slug: string
}>()

const router = useRouter()
const PlaygroundComp = shallowRef()

watch(
	() => props.slug,
	async (slug) => {
		const entry = getEntryBySlug(slug)
		if (!entry) {
			await router.replace({ name: 'overview' })
			return
		}
		const mod = await entry.playground()
		PlaygroundComp.value = mod.default
	},
	{ immediate: true },
)
</script>

<template>
	<component :is="PlaygroundComp" v-if="PlaygroundComp" />
</template>
