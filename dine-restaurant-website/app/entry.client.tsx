import React from 'react'
import ReactDOM from 'react-dom/client'
import '#app/index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AnnouncementProvider } from '#app/components/announcer'
import { Layout } from '#app/components/layout'
import { type AnnouncementHandle } from '#app/components/route-announcer'
import { Booking } from '#app/routes/booking'
import { Home } from '#app/routes/home'
// Supports weights 100-900
import '@fontsource-variable/league-spartan'

async function enableMocking() {}

enableMocking().then(() => {
	const router = createBrowserRouter([
		{
			path: '/',
			Component: Layout,
			children: [
				{
					index: true,
					handle: {
						announcement() {
							return 'Home'
						},
					} satisfies AnnouncementHandle,
					Component: Home,
				},
				{
					path: 'booking',
					handle: {
						announcement() {
							return 'Reservations'
						},
					} satisfies AnnouncementHandle,
					Component: Booking,
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
