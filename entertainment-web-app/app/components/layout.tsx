import { cx } from 'class-variance-authority'
import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router-dom'
import { getAsset } from '#app/assets'
import { Announcer } from '#app/components/announcer'
import { Icon } from '#app/components/icon'
import { Img } from '#app/components/picture'
import { RouteAnnouncer } from '#app/components/route-announcer'

export function Layout() {
	return (
		<>
			<div className="min-h-screen tablet:px-6 tablet:pt-6 desktop:grid desktop:grid-cols-[auto,minmax(0,1fr)] desktop:gap-9 desktop:px-8 desktop:py-0">
				<div className="desktop:flex desktop:min-h-[min(100vh,64rem)] desktop:self-start desktop:py-8">
					<header className="flex flex-wrap items-center bg-semi-dark-blue text-greyish-blue shape-p-4 tablet:rounded tablet:shape-py-5 tablet:shape-px-6 desktop:flex-col desktop:rounded-lg desktop:shape-py-8 desktop:shape-px-7">
						<div className="flex flex-1 justify-start desktop:flex-initial">
							<Link className="text-red" to="/">
								<Icon
									className="h-5 w-auto tablet:h-[2.0625rem]"
									name="logo"
									width="33"
									height="27"
								/>
								<span className="sr-only">Home</span>
							</Link>
						</div>
						<nav className="desktop:mb-auto desktop:mt-[4.6875rem]">
							<ul
								className="flex flex-wrap gap-6 tablet:gap-8 desktop:flex-col desktop:gap-10"
								role="list"
							>
								<li>
									<NavLink
										className={({ isActive }) =>
											cx(
												'transition-colors hocus:text-red',
												isActive ? 'text-pure-white' : '',
											)
										}
										to="/"
									>
										<Icon
											className="size-4 tablet:size-5"
											name="icon-nav-home"
										/>
										<span className="sr-only">Home</span>
									</NavLink>
								</li>
								<li>
									<NavLink
										className={({ isActive }) =>
											cx(
												'transition-colors hocus:text-red',
												isActive ? 'text-pure-white' : '',
											)
										}
										to="/movies"
									>
										<Icon
											className="size-4 tablet:size-5"
											name="icon-nav-movies"
										/>
										<span className="sr-only">Movies</span>
									</NavLink>
								</li>
								<li>
									<NavLink
										className={({ isActive }) =>
											cx(
												'transition-colors hocus:text-red',
												isActive ? 'text-pure-white' : '',
											)
										}
										to="/tv-series"
									>
										<Icon
											className="size-4 tablet:size-5"
											name="icon-nav-tv-series"
										/>
										<span className="sr-only">TV series</span>
									</NavLink>
								</li>
								<li>
									<NavLink
										className={({ isActive }) =>
											cx(
												'transition-colors hocus:text-red',
												isActive ? 'text-pure-white' : '',
											)
										}
										to="/bookmarked"
									>
										<Icon
											className="h-4 w-auto tablet:h-5"
											name="icon-nav-bookmark"
											width="17"
											height="20"
										/>
										<span className="sr-only">Bookmarked</span>
									</NavLink>
								</li>
							</ul>
						</nav>
						<div className="flex flex-1 justify-end desktop:mt-[4.6875rem] desktop:flex-initial">
							<button
								className="rounded-full"
								type="button"
								onClick={() => {
									console.log('todo: Open profile menu')
								}}
							>
								<Img
									className="size-6 rounded-[inherit] border border-pure-white tablet:size-8 desktop:size-10"
									alt="Profile"
									images={[
										{ metadata: getAsset('/image-avatar.png'), density: '1x' },
									]}
									priority
								/>
							</button>
						</div>
					</header>
				</div>
				<main className="px-4 pb-14 tablet:px-0 desktop:pt-8">
					<Outlet />
				</main>
			</div>
			<ScrollRestoration />
			<Announcer />
			<RouteAnnouncer />
		</>
	)
}
