import { invariant } from '@epic-web/invariant'
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
