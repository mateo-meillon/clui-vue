import { createRouter, createWebHistory } from 'vue-router'
import GalleryShell from './layout/GalleryShell.vue'

export default createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: GalleryShell,
			children: [
				{
					path: 'getting-started',
					name: 'getting-started',
					component: () => import('./views/GettingStartedView.vue'),
				},
				{
					path: '',
					name: 'overview',
					component: () => import('./views/OverviewView.vue'),
				},
				{
					path: 'c/:slug',
					name: 'playground',
					component: () => import('./views/PlaygroundView.vue'),
					props: (route) => ({ slug: String(route.params.slug ?? '') }),
				},
			],
		},
	],
})
