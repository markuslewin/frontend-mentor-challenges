import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router-dom'
import { getAsset } from '#app/assets'
import { Announcer } from '#app/components/announcer'
import { Icon } from '#app/components/icon'
import { Img } from '#app/components/picture'
import { RouteAnnouncer } from '#app/components/route-announcer'

export function Layout() {
	return (
		<>
			<div className="min-h-screen">
				<header>
					<Link to="/">
						<Icon name="logo" />
						<span>Home</span>
					</Link>
					<nav>
						<ul role="list">
							<li>
								<NavLink to="/">
									<Icon name="icon-nav-home" />
									<span>Home</span>
								</NavLink>
							</li>
							<li>
								<NavLink to="/movies">
									<Icon name="icon-nav-movies" />
									<span>Movies</span>
								</NavLink>
							</li>
							<li>
								<NavLink to="/tv-series">
									<Icon name="icon-nav-tv-series" />
									<span>TV series</span>
								</NavLink>
							</li>
							<li>
								<NavLink to="/bookmarked">
									<Icon name="icon-nav-bookmark" />
									<span>Bookmarked</span>
								</NavLink>
							</li>
						</ul>
					</nav>
					<button type="button">
						<Img
							alt="Profile"
							images={[
								{ metadata: getAsset('/image-avatar.png'), density: '1x' },
							]}
							priority
						/>
					</button>
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
