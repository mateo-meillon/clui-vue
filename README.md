# clui-vue

Vue 3 component library: buttons, form controls, modals, toasts, tokens, and theme utilities.

## Install

```bash
pnpm add clui-vue
# or npm / yarn
```

Peer dependency: `vue` ^3.5.

## Component gallery (this repo)

The `website/` package is a static Vite app that showcases every `Ui*` component. From the repository root:

```bash
pnpm run dev:website
```

The first run builds `clui-vue` into `dist/` if needed, then starts the dev server. Production build:

```bash
pnpm run build:website
```

Enable **GitHub Actions** as the Pages source in the repo’s **Settings → Pages** to publish the gallery from the `Deploy component gallery` workflow.

## App setup

Register the plugin (globally registers `Ui*` components) and import built-in styles.

```ts
// main.ts
import 'clui-vue/style.css'
import { createApp } from 'vue'
import CluiVue from 'clui-vue'
import App from './App.vue'

const app = createApp(App)
app.use(CluiVue)
app.mount('#app')
```

Importing from `clui-vue` also applies the default theme (via `data-theme` on `document.documentElement`) and reads/writes the current theme in `localStorage` under the key `app-theme`. To customize theme, use the exported `useTheme()` and `isDarkTheme()`.

## Sass tokens and theme

`package.json` exports SCSS entry points so you can use design tokens in your own components:

```scss
@use 'clui-vue/tokens' as *;
// or @use 'clui-vue/theme' for CSS variables (light/dark) built from tokens
```

For a full page base layer (resets, scrollbar, body, theme variables) without extra font files from your app, use the optional `styles/base` export in your app shell (load your own fonts separately):

```scss
@use 'clui-vue/styles/base' as *;
```

Your Vite (or other) Sass config must be able to resolve `node_modules` (default in Vite).

## `UiRouteProgress`

Pass your router’s busy flag; the bar does not read vue-router by itself.

```vue
<script setup lang="ts">
import { isRouteNavigating } from './router/navigation-progress'
</script>

<template>
	<UiRouteProgress :active="isRouteNavigating" />
</template>
```

## A11y labels without `vue-i18n`

`UiModal`, `UiToastHost`, and `UiInput` expose optional props for close/clear ARIA labels (`closeAriaLabel`, `clearAriaLabel`) so the library does not require `vue-i18n` as a peer by default. Defaults are English.

## License

MIT
