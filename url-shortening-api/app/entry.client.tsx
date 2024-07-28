import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import '#app/index.css'
import { App } from '#app/app'
import { AnnouncementProvider } from '#app/components/announcer'
import { Layout } from '#app/components/layout'
import { clientEnv } from '#app/utils/env/client'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/500-italic.css'
import '@fontsource/poppins/700.css'

async function enableMocking() {
	// Tree shake mocks when building for production
	if (!import.meta.env.PROD && clientEnv.VITE_MOCKS) {
		const { worker } = await import('#tests/mocks')
		return worker.start()
	}
}

enableMocking().then(() => {
	const queryClient = new QueryClient()

	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<AnnouncementProvider>
				<QueryClientProvider client={queryClient}>
					<Layout>
						<App />
					</Layout>
				</QueryClientProvider>
			</AnnouncementProvider>
		</React.StrictMode>,
	)
})
