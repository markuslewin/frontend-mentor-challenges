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
						<nav className="flex grow flex-wrap items-center justify-between gap-12 text-nav-3">
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
												className="transition-colors hocus:text-very-dark-blue"
												to="#"
											>
												Login
											</Link>
										</li>
										<li>
											<Link
												className="inline-grid h-10 items-center whitespace-nowrap rounded-full bg-cyan text-white transition-colors shape-px-6 hocus:bg-light-cyan"
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
		<footer className="bg-very-dark-violet py-14 text-center text-gray center-[69.375rem] tablet:py-[4.5rem] tablet:text-start">
			<div className="tablet:grid tablet:grid-cols-[minmax(max-content,365fr)_minmax(max-content,546fr)_minmax(max-content,168fr)] tablet:gap-4">
				<p className="grid justify-center text-white tablet:justify-start">
					<Logo />
				</p>
				<nav
					className="mt-12 tablet:mt-0 tablet:grid tablet:grid-cols-[174fr_174fr_166fr] tablet:gap-4"
					aria-labelledby={navLabel}
				>
					<h2 className="sr-only" id={navLabel}>
						Site navigation
					</h2>
					<div>
						<h3 className="text-nav-2 text-white" id={featuresLabel}>
							<Link className="transition-colors hocus:text-cyan" to="#">
								Features
							</Link>
						</h3>
						<ul
							className="mt-[1.375rem] grid gap-[0.625rem]"
							role="list"
							aria-labelledby={featuresLabel}
						>
							<li>
								<Link className="transition-colors hocus:text-cyan" to="#">
									Link Shortening
								</Link>
							</li>
							<li>
								<Link className="transition-colors hocus:text-cyan" to="#">
									Branded Links
								</Link>
							</li>
							<li>
								<Link className="transition-colors hocus:text-cyan" to="#">
									Analytics
								</Link>
							</li>
						</ul>
					</div>
					<div className="mt-10 tablet:mt-0">
						<h3 className="text-nav-2 text-white" id={resourcesLabel}>
							<Link className="transition-colors hocus:text-cyan" to="#">
								Resources
							</Link>
						</h3>
						<ul
							className="mt-[1.375rem] grid gap-[0.625rem]"
							role="list"
							aria-labelledby={resourcesLabel}
						>
							<li>
								<Link className="transition-colors hocus:text-cyan" to="#">
									Blog
								</Link>
							</li>
							<li>
								<Link className="transition-colors hocus:text-cyan" to="#">
									Developers
								</Link>
							</li>
							<li>
								<Link className="transition-colors hocus:text-cyan" to="#">
									Support
								</Link>
							</li>
						</ul>
					</div>
					<div className="mt-10 tablet:mt-0">
						<h3 className="text-nav-2 text-white" id={companyLabel}>
							<Link className="transition-colors hocus:text-cyan" to="#">
								Company
							</Link>
						</h3>
						<ul
							className="mt-[1.375rem] grid gap-[0.625rem]"
							role="list"
							aria-labelledby={companyLabel}
						>
							<li>
								<Link className="transition-colors hocus:text-cyan" to="#">
									About
								</Link>
							</li>
							<li>
								<Link className="transition-colors hocus:text-cyan" to="#">
									Our Team
								</Link>
							</li>
							<li>
								<Link className="transition-colors hocus:text-cyan" to="#">
									Careers
								</Link>
							</li>
							<li>
								<Link className="transition-colors hocus:text-cyan" to="#">
									Contact
								</Link>
							</li>
						</ul>
					</div>
				</nav>
				<div className="mt-12 tablet:mt-0">
					<h2 className="sr-only" id={socialMediaLabel}>
						Social media
					</h2>
					<ul
						className="flex flex-wrap items-center justify-center gap-6 tablet:justify-start"
						role="list"
						aria-labelledby={socialMediaLabel}
					>
						<li>
							<Link
								className="text-white transition-colors hocus:text-cyan"
								to="#"
							>
								<Icon className="size-6" name="icon-facebook" />
								<span className="sr-only">Shortly on Facebook</span>
							</Link>
						</li>
						<li>
							<Link
								className="text-white transition-colors hocus:text-cyan"
								to="#"
							>
								<Icon className="h-5 w-6" name="icon-twitter" />
								<span className="sr-only">Shortly on Twitter</span>
							</Link>
						</li>
						<li>
							<Link
								className="text-white transition-colors hocus:text-cyan"
								to="#"
							>
								<Icon className="size-6" name="icon-pinterest" />
								<span className="sr-only">Shortly on Pinterest</span>
							</Link>
						</li>
						<li>
							<Link
								className="text-white transition-colors hocus:text-cyan"
								to="#"
							>
								<Icon className="size-6" name="icon-instagram" />
								<span className="sr-only">Shortly on Instagram</span>
							</Link>
						</li>
					</ul>
				</div>
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
			<Link className="transition-colors hocus:text-very-dark-blue" to="#">
				{name}
			</Link>
		</li>
	)
}
