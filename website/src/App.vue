<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
	<div class="app-root">
		<RouterView />
	</div>
</template>

<style lang="scss">
html {
	height: 100%;
	height: -webkit-fill-available;
	scroll-behavior: smooth;
}

body {
	margin: 0;
	min-height: 100%;
	min-height: 100dvh;
	min-height: -webkit-fill-available;
}

#app {
	min-height: 100%;
	min-height: 100dvh;
	min-height: -webkit-fill-available;
	display: flex;
	flex-direction: column;
}

.app-root {
	flex: 1;
	display: flex;
	flex-direction: column;
	min-height: 0;
}
</style>
