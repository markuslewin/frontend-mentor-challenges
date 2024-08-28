import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Announcer } from '#app/components/announcer'
import { RouteAnnouncer } from '#app/components/route-announcer'

export function Layout() {
	return (
		<>
			<Outlet />
			<ScrollRestoration />
			<Announcer />
			<RouteAnnouncer />
		</>
	)
}
