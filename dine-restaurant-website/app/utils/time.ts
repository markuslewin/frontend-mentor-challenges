import { invariant } from '@epic-web/invariant'
import { faker } from '@faker-js/faker'
import { delay, http, HttpResponse } from 'msw'
import { z } from 'zod'

export const urls = {
	ip: 'https://worldtimeapi.org/api/ip',
}

const timeResponseSchema = z.object({
	abbreviation: z.string(),
	timezone: z.string(),
	day_of_week: z.number(),
	day_of_year: z.number(),
	unixtime: z.number(),
	week_number: z.number(),
})

export type TimeResponse = z.infer<typeof timeResponseSchema>

export async function getTime() {
	const response = await fetch(urls.ip)
	invariant(response.ok, `Invalid status code ${response.status}`)

	const json = await response.json()
	const time = timeResponseSchema.parse(json)

	return time
}

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
