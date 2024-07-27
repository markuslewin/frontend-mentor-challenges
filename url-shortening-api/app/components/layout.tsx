import { useMediaQuery } from '@uidotdev/usehooks'
import {
	type KeyboardEventHandler,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react'
import { flushSync } from 'react-dom'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Announcer } from '#app/components/announcer'
import { Icon } from '#app/components/icon'
import { RouteAnnouncer } from '#app/components/route-announcer'
import { media } from '#app/utils/screens'

export function Layout() {
	const tabletMatches = useMediaQuery(media.tablet)
	const [isExpanded, setIsExpanded] = useState(false)
	const menuTriggerRef = useRef<HTMLButtonElement>(null)
	const menuRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				!(
					e.target instanceof Node && menuTriggerRef.current?.contains(e.target)
				) &&
				!(e.target instanceof Node && menuRef.current?.contains(e.target))
			) {
				setIsExpanded(false)
			}
		}

		document.body.addEventListener('click', handleClickOutside)
		return () => {
			document.body.removeEventListener('click', handleClickOutside)
		}
	}, [])

	const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (e) => {
		if (e.key === 'Escape') {
			flushSync(() => {
				setIsExpanded(false)
			})
			menuTriggerRef.current?.focus()
		}
	}

	return (
		<>
			<div className="min-h-screen center-gutter-6 tablet:center-gutter-10">
				<header className="relative pt-10 center-[69.375rem] tablet:pt-12">
					<div className="flex flex-wrap items-center justify-between gap-11 tablet:justify-normal">
						<p className="text-very-dark-blue">
							<Logo />
						</p>
						<nav className="flex flex-wrap items-center justify-between gap-12 text-nav-3 tablet:grow">
							{tabletMatches ? (
								<>
									<ul className="flex flex-wrap items-center gap-8" role="list">
										<DesktopLink name="Features" />
										<DesktopLink name="Pricing" />
										<DesktopLink name="Resources" />
									</ul>
									<ul className="flex flex-wrap items-center gap-9" role="list">
										<li>
											<a
												className="transition-colors hocus:text-very-dark-blue"
												href="#"
											>
												Login
											</a>
										</li>
										<li>
											<a
												className="inline-grid h-10 items-center whitespace-nowrap rounded-full bg-cyan text-white transition-colors shape-px-6 hocus:bg-light-cyan"
												href="#"
											>
												Sign Up
											</a>
										</li>
									</ul>
								</>
							) : (
								<>
									<button
										className="peer clickable-12"
										ref={menuTriggerRef}
										type="button"
										aria-expanded={isExpanded}
										onClick={() => {
											setIsExpanded(!isExpanded)
										}}
									>
										<span className="sr-only">Menu</span>
										<span className="grid w-6 gap-[0.375rem]">
											<span className="border-t-[0.1875rem]" />
											<span className="border-t-[0.1875rem]" />
											<span className="border-t-[0.1875rem]" />
										</span>
									</button>
									<div
										className="absolute inset-x-6 top-[calc(100%+1.5rem)] hidden rounded bg-dark-violet text-center text-nav-1 text-white shape-px-6 shape-py-10 peer-aria-expanded:block"
										ref={menuRef}
										onKeyUp={handleKeyUp}
									>
										<ul className="grid gap-[1.875rem]" role="list">
											<li>
												<a href="#">Features</a>
											</li>
											<li>
												<a href="#">Pricing</a>
											</li>
											<li>
												<a href="#">Resources</a>
											</li>
										</ul>
										<div className="mt-[1.875rem] border-t-[0.0625rem] text-grayish-violet/25" />
										<ul className="mt-8 grid gap-6" role="list">
											<li>
												<a href="#">Login</a>
											</li>
											<li>
												<a
													className="grid h-12 items-center whitespace-nowrap rounded-full bg-cyan text-white transition-colors shape-px-6 hocus:bg-light-cyan"
													href="#"
												>
													Sign Up
												</a>
											</li>
										</ul>
									</div>
								</>
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
							<a className="transition-colors hocus:text-cyan" href="#">
								Features
							</a>
						</h3>
						<ul
							className="mt-[1.375rem] grid gap-[0.625rem]"
							role="list"
							aria-labelledby={featuresLabel}
						>
							<li className="text-nav-4">
								<a className="transition-colors hocus:text-cyan" href="#">
									Link Shortening
								</a>
							</li>
							<li className="text-nav-4">
								<a className="transition-colors hocus:text-cyan" href="#">
									Branded Links
								</a>
							</li>
							<li className="text-nav-4">
								<a className="transition-colors hocus:text-cyan" href="#">
									Analytics
								</a>
							</li>
						</ul>
					</div>
					<div className="mt-10 tablet:mt-0">
						<h3 className="text-nav-2 text-white" id={resourcesLabel}>
							<a className="transition-colors hocus:text-cyan" href="#">
								Resources
							</a>
						</h3>
						<ul
							className="mt-[1.375rem] grid gap-[0.625rem]"
							role="list"
							aria-labelledby={resourcesLabel}
						>
							<li className="text-nav-4">
								<a className="transition-colors hocus:text-cyan" href="#">
									Blog
								</a>
							</li>
							<li className="text-nav-4">
								<a className="transition-colors hocus:text-cyan" href="#">
									Developers
								</a>
							</li>
							<li className="text-nav-4">
								<a className="transition-colors hocus:text-cyan" href="#">
									Support
								</a>
							</li>
						</ul>
					</div>
					<div className="mt-10 tablet:mt-0">
						<h3 className="text-nav-2 text-white" id={companyLabel}>
							<a className="transition-colors hocus:text-cyan" href="#">
								Company
							</a>
						</h3>
						<ul
							className="mt-[1.375rem] grid gap-[0.625rem]"
							role="list"
							aria-labelledby={companyLabel}
						>
							<li className="text-nav-4">
								<a className="transition-colors hocus:text-cyan" href="#">
									About
								</a>
							</li>
							<li className="text-nav-4">
								<a className="transition-colors hocus:text-cyan" href="#">
									Our Team
								</a>
							</li>
							<li className="text-nav-4">
								<a className="transition-colors hocus:text-cyan" href="#">
									Careers
								</a>
							</li>
							<li className="text-nav-4">
								<a className="transition-colors hocus:text-cyan" href="#">
									Contact
								</a>
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
							<a
								className="text-white transition-colors hocus:text-cyan"
								href="#"
							>
								<Icon className="size-6" name="icon-facebook" />
								<span className="sr-only">Shortly on Facebook</span>
							</a>
						</li>
						<li>
							<a
								className="text-white transition-colors hocus:text-cyan"
								href="#"
							>
								<Icon className="h-5 w-6" name="icon-twitter" />
								<span className="sr-only">Shortly on Twitter</span>
							</a>
						</li>
						<li>
							<a
								className="text-white transition-colors hocus:text-cyan"
								href="#"
							>
								<Icon className="size-6" name="icon-pinterest" />
								<span className="sr-only">Shortly on Pinterest</span>
							</a>
						</li>
						<li>
							<a
								className="text-white transition-colors hocus:text-cyan"
								href="#"
							>
								<Icon className="size-6" name="icon-instagram" />
								<span className="sr-only">Shortly on Instagram</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}

function Logo() {
	return (
		<a href="/">
			<Icon className="h-[2.0625rem] w-[7.5625rem]" name="logo" />
			<span className="sr-only">Shortly</span>
		</a>
	)
}

interface DesktopLinkProps {
	name: string
}

function DesktopLink({ name }: DesktopLinkProps) {
	return (
		<li>
			<a className="transition-colors hocus:text-very-dark-blue" href="#">
				{name}
			</a>
		</li>
	)
}
