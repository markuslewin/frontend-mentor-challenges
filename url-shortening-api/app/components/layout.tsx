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
			<div className="min-h-screen center-gutter-4 tablet:center-gutter-10">
				<header className="center-5xl">
					<div>
						<Logo />
						<nav>
							{tabletMatches ? (
								<>
									<ul role="list">
										<DesktopLink name="Features" />
										<DesktopLink name="Pricing" />
										<DesktopLink name="Resources" />
									</ul>
									<ul role="list">
										<li>
											<Link to="#">Login</Link>
										</li>
										<li>
											<Link to="#">Sign Up</Link>
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
				<main>
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
			<Logo />
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
		<p>
			<Link to="/">
				<Icon name="logo" />
				<span>Shortly</span>
			</Link>
		</p>
	)
}

interface DesktopLinkProps {
	name: string
}

function DesktopLink({ name }: DesktopLinkProps) {
	return (
		<li>
			<Link to="#">{name}</Link>
		</li>
	)
}
