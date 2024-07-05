import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Announcer } from '#app/components/announcer'
import { RouteAnnouncer } from '#app/components/route-announcer'
import { Logo } from '#app/components/ui/logo'

export function Layout() {
	return (
		<>
			<div className="min-h-screen">
				<Outlet />
				<footer>
					<h2>Restaurant information</h2>
					<p>
						<Logo />
					</p>
					<div>
						<h3>Location and phone number</h3>
						<p>
							Marthwaite, Sedbergh
							<br />
							Cumbria
						</p>
						<p>
							<a href="tel:+00441234567">+00 44 123 4567</a>
						</p>
					</div>
					<div>
						<h3>Open Times</h3>
						<p>Mon - Fri: 09:00 AM - 10:00 PM</p>
						<p>Sat - Sun: 09:00 AM - 11:30 PM</p>
					</div>
				</footer>
			</div>
			<ScrollRestoration />
			<Announcer />
			<RouteAnnouncer />
		</>
	)
}
