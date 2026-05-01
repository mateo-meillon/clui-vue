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
	overflow: hidden;
	scroll-behavior: smooth;
}

body {
	margin: 0;
	height: 100%;
	min-height: 100%;
	min-height: 100dvh;
	min-height: -webkit-fill-available;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

#app {
	flex: 1;
	display: flex;
	flex-direction: column;
	min-height: 0;
}

.app-root {
	flex: 1;
	display: flex;
	flex-direction: column;
	min-height: 0;
}
</style>
