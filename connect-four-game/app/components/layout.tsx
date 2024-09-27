import { ScrollRestoration } from 'react-router-dom'
import AnimatedOutlet from '#app/components/animated-outlet'
import { Announcer } from '#app/components/announcer'
import { RouteAnnouncer } from '#app/components/route-announcer'

export function Layout() {
	return (
		<>
			<AnimatedOutlet />
			<ScrollRestoration />
			<Announcer />
			<RouteAnnouncer />
		</>
	)
}
