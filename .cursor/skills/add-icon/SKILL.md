---
name: add-icon
description: >-
    Add Material Symbols icons to the project's UI icon registry. Use when the
    user asks to add, download, or include a new icon, or references Google
    Material Icons / Material Symbols.
---

# Adding Icons

This repository is the **`clui-vue`** package. Icons live in an inline SVG registry at **`src/ui/icons.ts`** (repo root). Icons come from **Google Material Symbols Rounded**. The component gallery under **`website/`** depends on this package via the workspace; after changing `icons.ts`, rebuild the library if your editor resolves built types from `dist/`.

## Steps

### 1. Download the SVG

```bash
curl.exe -sL "https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/{ICON_NAME}/default/24px.svg"
```

(On macOS/Linux, use `curl -sL` instead of `curl.exe -sL`.)

Replace `{ICON_NAME}` with the snake_case icon name from [Material Symbols](https://fonts.google.com/icons) (e.g. `arrow_back`, `check_circle`, `dark_mode`).

### 2. Clean the SVG

Before adding to the registry, modify the downloaded SVG:

- **Remove** `height="24"` and `width="24"` attributes (sizing is handled by `UiIcon`)
- **Add** `fill="currentColor"` so the icon inherits text color

**Before:** `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="..."/></svg>`
**After:** `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="..."/></svg>`

### 3. Add to the registry

Add the icon to **`src/ui/icons.ts`** at the **repository root** in **alphabetical order** with a camelCase key:

```typescript
export const icons = {
	arrowBack: '<svg ...>...</svg>',
	close: '<svg ...>...</svg>',
	// ... keep alphabetical
} as const
```

The `IconName` type updates automatically — no other files need changes unless you expose new icons in demos.

## Usage

Once registered, icons are available everywhere:

```vue
<UiIcon name="arrowBack" />
<UiButton icon="arrowBack">Back</UiButton>
<UiButton icon="arrowBack" />
<!-- icon-only (auto-detected) -->
```

## Naming convention

| Material Symbols name | Registry key |
| --------------------- | ------------ |
| `arrow_back`          | `arrowBack`  |
| `dark_mode`           | `darkMode`   |
| `edit_square`         | `editSquare` |

Convert snake_case to camelCase.
