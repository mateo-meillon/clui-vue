---
name: add-icon
description: >-
    Use Material Symbols in clui-vue by name. Use when the user asks to add,
    include, or reference Google Material Icons / Material Symbols.
---

# Adding Icons

This repository is the **`clui-vue`** package. Icons use **Google Material Symbols Rounded** via the font dependency `@material-symbols/font-400`. There is no SVG registry to edit.

## How to use icons

1. Find the icon name on [Material Symbols](https://fonts.google.com/icons).
2. Use the **snake_case** ligature name directly with `UiIcon` or any `icon` prop.

```vue
<UiIcon name="arrow_back" />
<UiButton icon="arrow_back">Back</UiButton>
<UiButton icon="arrow_back" />
<!-- icon-only (auto-detected) -->
```

1. Keep names in snake_case. Do not convert to camelCase.

## Notes

- `IconName` is a string and accepts any Material Symbols ligature.
- The rounded style is loaded globally from `@material-symbols/font-400/rounded.css`.
- For discovery and previews, use [fonts.google.com/icons](https://fonts.google.com/icons).

## Naming convention

| Material Symbols name | clui-vue icon name |
| --------------------- | ------------------ |
| `arrow_back`          | `arrow_back`       |
| `dark_mode`           | `dark_mode`        |
| `edit_square`         | `edit_square`      |
