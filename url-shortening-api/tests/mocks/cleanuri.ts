import { faker } from '@faker-js/faker'
import { delay, http, HttpResponse } from 'msw'
import { type ShortenResponse, urls } from '#app/utils/shortener'

export function createMockResponse(): ShortenResponse {
	return {
		result_url: faker.internet.url(),
	}
}

export const handlers = [
	http.post(urls.shorten, async () => {
		await delay()
		return HttpResponse.json(createMockResponse())
	}),
]
