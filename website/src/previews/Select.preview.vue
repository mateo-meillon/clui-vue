<script setup lang="ts">
import { ref } from 'vue'

const value = ref('beta')
const options = [
	{ label: 'Alpha', value: 'alpha' },
	{ label: 'Beta', value: 'beta' },
]
</script>

<template>
	<UiSelect v-model="value" size="md" :options="options" />
</template>
