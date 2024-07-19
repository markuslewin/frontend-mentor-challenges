import { http, passthrough } from 'msw'
import { setupWorker } from 'msw/browser'
import { handlers as cleanuriHandlers } from '#tests/mocks/cleanuri'

export const worker = setupWorker(
	...cleanuriHandlers,
	http.get(/http:\/\/localhost:\d+\/.*/, async () => passthrough()),
	http.post(/http:\/\/localhost:\d+\/.*/, async () => passthrough()),
)
