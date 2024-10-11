import React from 'react'
import ReactDOM from 'react-dom/client'
import '#app/index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AnnouncementProvider } from '#app/components/announcer'
import { Layout } from '#app/components/layout'
import { Home } from '#app/routes/home/route'
import {
	handle as homeHandle,
	loader as homeLoader,
} from '#app/routes/home/routing'
import { NestedRoutes } from '#app/routes/nested-routes/route'
import { NestedRoutesIndex } from '#app/routes/nested-routes._index/route'
import {
	handle as nestedRoutesIndexHandle,
	action as nestedRoutesIndexAction,
	loader as nestedRoutesIndexLoader,
} from '#app/routes/nested-routes._index/routing'
import { NestedRoutesCreate } from '#app/routes/nested-routes.create/route'
import {
	handle as nestedRoutesCreateHandle,
	action as nestedRoutesCreateAction,
} from '#app/routes/nested-routes.create/routing'
import { NestedRoutesUpdate } from '#app/routes/nested-routes.update.$id/route'
import {
	loader as nestedRoutesUpdateLoader,
	action as nestedRoutesUpdateAction,
	handle as nestedRoutesUpdateHandle,
} from '#app/routes/nested-routes.update.$id/routing'
import { clientEnv } from '#app/utils/env/client'
import { action as messageAction } from '#app/utils/message'

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
					handle: homeHandle,
					loader: homeLoader,
					Component: Home,
				},
				{
					path: 'message',
					action: messageAction,
				},
				{
					path: 'nested-routes',
					Component: NestedRoutes,
					children: [
						{
							index: true,
							handle: nestedRoutesIndexHandle,
							loader: nestedRoutesIndexLoader,
							action: nestedRoutesIndexAction,
							Component: NestedRoutesIndex,
						},
						{
							path: 'create',
							handle: nestedRoutesCreateHandle,
							action: nestedRoutesCreateAction,
							Component: NestedRoutesCreate,
						},
						{
							path: 'update/:id',
							handle: nestedRoutesUpdateHandle,
							loader: nestedRoutesUpdateLoader,
							action: nestedRoutesUpdateAction,
							Component: NestedRoutesUpdate,
						},
					],
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
