import { useEffect } from 'react'

export const key = 'route'

export const routes = ['main-menu', 'rules', 'play'] as const
export type Route = (typeof routes)[number]

export function useBodyRoute(route: Route) {
	useEffect(() => {
		document.body.dataset[key] = route
		return () => {
			delete document.body.dataset[key]
		}
	})
}
