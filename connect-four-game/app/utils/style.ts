import { key as routeKey, type Route } from '#app/utils/body-route'

export function rem(px: number) {
	return `${px / 16}rem`
}

export function dataRoute(route: Route) {
	return `data-${routeKey}="${route}"`
}
