import { useMediaQuery } from '@uidotdev/usehooks'
import { useId } from 'react'
import { Form, Link, Outlet, ScrollRestoration } from 'react-router-dom'
import { Announcer } from '#app/components/announcer'
import { Icon } from '#app/components/icon'
import { RouteAnnouncer } from '#app/components/route-announcer'
import { media } from '#app/utils/screens'

export function Layout() {
	const tabletMatches = useMediaQuery(media.tablet)

	return (
		<>
			<div className="min-h-screen center-gutter-6 tablet:center-gutter-10">
				<header className="pt-10 center-[69.375rem] tablet:pt-12">
					<div className="flex flex-wrap items-center gap-11">
						<p className="text-very-dark-blue">
							<Logo />
						</p>
						<nav className="text-nav-3 flex grow flex-wrap items-center justify-between gap-12">
							{tabletMatches ? (
								<>
									<ul className="flex flex-wrap items-center gap-8" role="list">
										<DesktopLink name="Features" />
										<DesktopLink name="Pricing" />
										<DesktopLink name="Resources" />
									</ul>
									<ul className="flex flex-wrap items-center gap-9" role="list">
										<li>
											<Link
												className="hocus:text-very-dark-blue transition-colors"
												to="#"
											>
												Login
											</Link>
										</li>
										<li>
											<Link
												className="bg-cyan hocus:bg-light-cyan text-white inline-grid h-10 items-center whitespace-nowrap rounded-full transition-colors shape-px-6"
												to="#"
											>
												Sign Up
											</Link>
										</li>
									</ul>
								</>
							) : (
								<Form
									onSubmit={(e) => {
										e.preventDefault()
										console.log('todo: Open menu')
									}}
								>
									<button aria-expanded="false">Menu</button>
								</Form>
							)}
						</nav>
					</div>
				</header>
				<main className="mt-6 tablet:mt-20">
					<Outlet />
				</main>
				<Footer />
			</div>
			<ScrollRestoration />
			<Announcer />
			<RouteAnnouncer />
		</>
	)
}

function Footer() {
	const navLabel = useId()
	const featuresLabel = useId()
	const resourcesLabel = useId()
	const companyLabel = useId()
	const socialMediaLabel = useId()

	return (
		<footer>
			<p>
				<Logo />
			</p>
			<nav aria-labelledby={navLabel}>
				<h2 id={navLabel}>Site navigation</h2>
				<div>
					<h3 id={featuresLabel}>
						<Link to="#">Features</Link>
					</h3>
					<ul role="list" aria-labelledby={featuresLabel}>
						<li>
							<Link to="#">Link Shortening</Link>
						</li>
						<li>
							<Link to="#">Branded Links</Link>
						</li>
						<li>
							<Link to="#">Analytics</Link>
						</li>
					</ul>
				</div>
				<div>
					<h3 id={resourcesLabel}>
						<Link to="#">Resources</Link>
					</h3>
					<ul role="list" aria-labelledby={resourcesLabel}>
						<li>
							<Link to="#">Blog</Link>
						</li>
						<li>
							<Link to="#">Developers</Link>
						</li>
						<li>
							<Link to="#">Support</Link>
						</li>
					</ul>
				</div>
				<div>
					<h3 id={companyLabel}>
						<Link to="#">Company</Link>
					</h3>
					<ul role="list" aria-labelledby={companyLabel}>
						<li>
							<Link to="#">About</Link>
						</li>
						<li>
							<Link to="#">Our Team</Link>
						</li>
						<li>
							<Link to="#">Careers</Link>
						</li>
						<li>
							<Link to="#">Contact</Link>
						</li>
					</ul>
				</div>
			</nav>
			<div>
				<h2 id={socialMediaLabel}>Social media</h2>
				<ul role="list" aria-labelledby={socialMediaLabel}>
					<li>
						<Link to="#">
							<Icon name="icon-facebook" />
							<span>Shortly on Facebook</span>
						</Link>
					</li>
					<li>
						<Link to="#">
							<Icon name="icon-twitter" />
							<span>Shortly on Twitter</span>
						</Link>
					</li>
					<li>
						<Link to="#">
							<Icon name="icon-pinterest" />
							<span>Shortly on Pinterest</span>
						</Link>
					</li>
					<li>
						<Link to="#">
							<Icon name="icon-instagram" />
							<span>Shortly on Instagram</span>
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	)
}

function Logo() {
	return (
		<Link to="/">
			<Icon className="h-[2.0625rem] w-[7.5625rem]" name="logo" />
			<span className="sr-only">Shortly</span>
		</Link>
	)
}

interface DesktopLinkProps {
	name: string
}

function DesktopLink({ name }: DesktopLinkProps) {
	return (
		<li>
			<Link className="hocus:text-very-dark-blue transition-colors" to="#">
				{name}
			</Link>
		</li>
	)
}
