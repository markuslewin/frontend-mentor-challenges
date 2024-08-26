import React from 'react'
import ReactDOM from 'react-dom/client'
import '#app/index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AnnouncementProvider } from '#app/components/announcer'
import { Layout } from '#app/components/layout'
import { BookmarkedRoute } from '#app/routes/bookmarked/route'
import { handle as bookmarkedHandle } from '#app/routes/bookmarked/routing'
import { HomeRoute } from '#app/routes/home/route'
import { handle as homeHandle } from '#app/routes/home/routing'
import { MoviesRoute } from '#app/routes/movies/route'
import { handle as moviesHandle } from '#app/routes/movies/routing'
import { TvSeriesRoute } from '#app/routes/tv-series/route'
import { handle as tvSeriesHandle } from '#app/routes/tv-series/routing'
// Supports weights 100-900
import '@fontsource-variable/outfit'

async function enableMocking() {
	return Promise.resolve()
}

enableMocking().then(() => {
	const router = createBrowserRouter([
		{
			path: '/',
			Component: Layout,
			children: [
				{
					index: true,
					handle: homeHandle,
					Component: HomeRoute,
				},
				{
					path: 'movies',
					handle: moviesHandle,
					Component: MoviesRoute,
				},
				{
					path: 'tv-series',
					handle: tvSeriesHandle,
					Component: TvSeriesRoute,
				},
				{
					path: 'bookmarked',
					handle: bookmarkedHandle,
					Component: BookmarkedRoute,
				},
			],
		},
	])

	function App() {
		return (
			<AnnouncementProvider>
				<RouterProvider router={router} />
			</AnnouncementProvider>
		)
	}

	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	)
})
