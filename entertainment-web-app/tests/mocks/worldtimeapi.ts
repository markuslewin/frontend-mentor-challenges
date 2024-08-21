import { faker } from '@faker-js/faker'
import { delay, http, HttpResponse } from 'msw'
import { urls, type TimeResponse } from '#app/utils/time'

export function createMockResponse(): TimeResponse {
	return {
		abbreviation: faker.string.alpha({ length: 3, casing: 'upper' }),
		timezone: faker.location.timeZone(),
		day_of_week: faker.number.int({ max: 7 }),
		day_of_year: faker.number.int({ max: 365 }),
		unixtime: faker.date.recent().getTime() / 1000,
		week_number: faker.number.int({ max: 52 }),
	}
}

export const handlers = [
	http.get(urls.ip, async () => {
		await delay()
		return HttpResponse.json(createMockResponse())
	}),
]
