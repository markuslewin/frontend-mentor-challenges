import { cx } from 'class-variance-authority'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Announcer } from '#app/components/announcer'
import { RouteAnnouncer } from '#app/components/route-announcer'
import { Logo } from '#app/components/ui/logo'
import { outerCenter } from '#app/utils/layout'

export function Layout() {
	return (
		<>
			<div className="grid min-h-screen grid-rows-[1fr_auto]">
				<Outlet />
				<footer
					className={cx(
						'bg-cod-gray py-20 text-center text-footer uppercase text-white tablet:py-16 tablet:text-start desktop:py-20',
						outerCenter,
					)}
				>
					<div className="tablet:grid tablet:grid-cols-[233fr_454fr] tablet:grid-rows-[auto_1fr] desktop:grid-cols-[296fr_368fr_446fr] desktop:grid-rows-none">
						<h2 className="sr-only">Restaurant information</h2>
						<p className="flex justify-center tablet:row-span-full tablet:justify-start">
							<Logo />
						</p>
						<div className="mt-10 tablet:mt-0">
							<h3 className="sr-only">Location and phone number</h3>
							<p>
								Marthwaite, Sedbergh
								<br />
								Cumbria
							</p>
							<p>
								<a href="tel:+00441234567">+00 44 123 4567</a>
							</p>
						</div>
						<div className="mt-8 tablet:col-start-2 desktop:col-start-auto desktop:mt-0">
							<h3>Open Times</h3>
							<p>Mon - Fri: 09:00 AM - 10:00 PM</p>
							<p>Sat - Sun: 09:00 AM - 11:30 PM</p>
						</div>
					</div>
				</footer>
			</div>
			<ScrollRestoration />
			<Announcer />
			<RouteAnnouncer />
		</>
	)
}
