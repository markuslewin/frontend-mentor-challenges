import React from 'react'
import ReactDOM from 'react-dom/client'
import '#app/index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AnnouncementProvider } from '#app/components/announcer'
import { Layout } from '#app/components/layout'
import { Categories } from '#app/routes/categories/route'
import {
	action as categoriesAction,
	handle as categoriesHandle,
} from '#app/routes/categories/routing'
import { Home } from '#app/routes/home/route'
import { handle as homeHandle } from '#app/routes/home/routing'
import { Instructions } from '#app/routes/instructions/route'
import { handle as instructionsHandle } from '#app/routes/instructions/routing'
import { Play } from '#app/routes/play/route'
import {
	loader as playLoader,
	handle as playHandle,
	action as playAction,
} from '#app/routes/play/routing'
import '@fontsource/mouse-memoirs'

async function enableMocking() {}

void enableMocking().then(() => {
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
					path: 'instructions',
					handle: instructionsHandle,
					Component: Instructions,
				},
				{
					path: 'categories',
					handle: categoriesHandle,
					action: categoriesAction,
					Component: Categories,
				},
				{
					path: 'play',
					handle: playHandle,
					loader: playLoader,
					action: playAction,
					Component: Play,
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
