# clui-vue

Vue 3 component library: buttons, form controls, modals, toasts, tokens, and theme utilities.

## Install

```bash
pnpm add clui-vue
# or npm / yarn
```

Peer dependency: `vue` ^3.5.

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

## Icons

`UiIcon` and all `icon` props use Google Material Symbols (rounded) by ligature name in snake_case:

```vue
<UiIcon name="check_circle" />
<UiButton icon="arrow_back">Back</UiButton>
```

Find icon names at [fonts.google.com/icons](https://fonts.google.com/icons).

## Sass tokens and theme

`package.json` exports SCSS entry points so you can use design tokens in your own components:

```scss
@use 'clui-vue/tokens' as *;
// or @use 'clui-vue/theme' for CSS variables (light/dark) built from tokens
```

For a full page base layer (resets, Material Symbols font import, scrollbar, body, theme variables), use the optional `styles/base` export in your app shell:

```scss
@use 'clui-vue/styles/base' as *;
```

Your Vite (or other) Sass config must be able to resolve `node_modules` (default in Vite).

## License

MIT
