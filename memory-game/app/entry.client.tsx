import React from 'react'
import ReactDOM from 'react-dom/client'
import '#app/index.css'
import { App } from '#app/app'
import '@fontsource/atkinson-hyperlegible/400.css'
import '@fontsource/atkinson-hyperlegible/700.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
