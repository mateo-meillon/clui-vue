import type { InjectionKey, Ref } from 'vue'

/** Shared ref for `<UiRouteProgress>` in `GalleryShell`; injected by the Route progress playground. */
export const GALLERY_ROUTE_PROGRESS_MANUAL_KEY: InjectionKey<Ref<boolean>> = Symbol('galleryRouteProgressManual')
