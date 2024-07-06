import React from 'react'
import ReactDOM from 'react-dom/client'
import '#app/index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AnnouncementProvider } from '#app/components/announcer'
import { Layout } from '#app/components/layout'
import { Booking, handle as bookingHandle } from '#app/routes/booking'
import { Home, handle as homeHandle } from '#app/routes/home'
import { clientEnv } from '#app/utils/env/client'
// Supports weights 100-900
import '@fontsource-variable/league-spartan'

async function enableMocking() {
	if (clientEnv.VITE_MOCKS) {
		const { worker } = await import('#app/mocks')
		return worker.start()
	}
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
					Component: Home,
				},
				{
					path: 'booking',
					handle: bookingHandle,
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
