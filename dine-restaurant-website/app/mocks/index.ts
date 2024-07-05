import { http, passthrough } from 'msw'
import { setupWorker } from 'msw/browser'
import { handlers as worldtimeapiHandlers } from '#app/utils/time'

export const worker = setupWorker(
	...worldtimeapiHandlers,
	http.get(/http:\/\/localhost:\d+\/.*/, async () => passthrough()),
	http.post(/http:\/\/localhost:\d+\/.*/, async () => passthrough()),
)
