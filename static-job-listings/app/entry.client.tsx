import React from 'react'
import ReactDOM from 'react-dom/client'
import '#app/index.css'
import { AppWithProviders } from '#app/app'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AppWithProviders />
	</React.StrictMode>,
)
