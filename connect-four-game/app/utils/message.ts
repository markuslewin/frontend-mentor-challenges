import { invariant } from '@epic-web/invariant'
import { type ActionFunctionArgs, useFetcher } from 'react-router-dom'
import { z } from 'zod'

export const messageRequestSchema = z.object({
	input: z.string(),
})

const messageResponseSchema = z.object({
	input: z.string(),
	message: z.string(),
	country: z
		.object({
			code: z.string().optional(),
			name: z.string().optional(),
		})
		.optional(),
})

type MessageRequest = z.infer<typeof messageRequestSchema>
type MessageResponse = z.infer<typeof messageResponseSchema>

export async function action({ request }: ActionFunctionArgs) {
	const body = await request.formData()
	const response = await fetch('/.netlify/functions/message', {
		method: 'post',
		body,
	})
	invariant(response.ok, `Invalid status code ${response.status}`)

	const json = await response.json()
	const parsed = messageResponseSchema.safeParse(json)
	if (!parsed.success) {
		throw new Error(`Failed to parse: ${parsed.error.flatten().fieldErrors}`)
	}

	return parsed.data satisfies MessageResponse
}

export function useSubmitInput() {
	const fetcher = useFetcher<MessageResponse>()

	const submit = (body: MessageRequest) => {
		fetcher.submit(body, {
			method: 'post',
			action: '/message',
			preventScrollReset: true,
		})
	}

	return { fetcher, submit }
}
