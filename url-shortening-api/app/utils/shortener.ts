import { invariant } from '@epic-web/invariant'
import { z } from 'zod'

export const urls = {
	shorten: 'https://cleanuri.com/api/v1/shorten',
}

export const shortenRequestSchema = z.object({
	url: z.string({ required_error: 'Please add a link' }).url(),
})

type ShortenRequest = z.infer<typeof shortenRequestSchema>

const shortenResponseSchema = z.union([
	z.object({
		result_url: z.string(),
	}),
	z.object({
		error: z.string(),
	}),
])

export type ShortenResponse = z.infer<typeof shortenResponseSchema>

export async function getShortenedUrl({ url }: ShortenRequest) {
	const body = new FormData()
	body.set('url', url)
	const response = await fetch(urls.shorten, {
		method: 'post',
		body,
	})
	invariant(response.ok, `Invalid status code ${response.status}`)

	const json = await response.json()
	const parsed = shortenResponseSchema.parse(json)

	return parsed
}
