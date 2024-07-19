import { useMediaQuery } from '@uidotdev/usehooks'
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
						<p>
							<Link to="/">
								<Icon name="logo" />
								<span>Shortly</span>
							</Link>
						</p>
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
			</div>
			<ScrollRestoration />
			<Announcer />
			<RouteAnnouncer />
		</>
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

//   Features

//   Link Shortening
//   Branded Links
//   Analytics

//   Resources

//   Blog
//   Developers
//   Support

//   Company

//   About
//   Our Team
//   Careers
//   Contact
