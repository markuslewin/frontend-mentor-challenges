import { MotionConfig } from 'framer-motion'
import React from 'react'
import ReactDOM from 'react-dom/client'
import '#app/index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AnnouncementProvider } from '#app/components/announcer'
import { Layout } from '#app/components/layout'
import { MainMenuRoute } from '#app/routes/main-menu/route'
import { handle as mainMenuHandle } from '#app/routes/main-menu/routing'
import { PlayRoute } from '#app/routes/play/route'
import { handle as playHandle } from '#app/routes/play/routing'
import { RulesRoute } from '#app/routes/rules/route'
import { handle as rulesHandle } from '#app/routes/rules/routing'
import { clientEnv } from '#app/utils/env/client'
// Supports weights 300-700
import '@fontsource-variable/space-grotesk'
import '#app/styles.css'

async function enableMocking() {
	// Tree shake mocks when building for production
	if (!import.meta.env.PROD && clientEnv.VITE_MOCKS) {
		const { worker } = await import('#tests/mocks')
		return worker.start()
	}
}

void enableMocking().then(() => {
	const router = createBrowserRouter([
		{
			path: '/',
			Component: Layout,
			children: [
				{
					index: true,
					handle: mainMenuHandle,
					Component: MainMenuRoute,
				},
				{
					path: 'rules',
					handle: rulesHandle,
					Component: RulesRoute,
				},
				{
					path: 'play',
					handle: playHandle,
					Component: PlayRoute,
				},
			],
		},
	])

	function App() {
		return (
			<MotionConfig reducedMotion="user">
				<AnnouncementProvider>
					<RouterProvider router={router} />
				</AnnouncementProvider>
			</MotionConfig>
		)
	}

	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	)
})
