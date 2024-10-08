import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '#app/app'
// Supports weights 100-900
import '@fontsource-variable/kumbh-sans'
// Supports weights 100-900
import '@fontsource-variable/roboto-slab'
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'
import '#app/index.css'
import { AnnouncementProvider, Announcer } from '#app/components/announcer'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AnnouncementProvider>
			<App />
			<Announcer />
		</AnnouncementProvider>
	</React.StrictMode>,
)
