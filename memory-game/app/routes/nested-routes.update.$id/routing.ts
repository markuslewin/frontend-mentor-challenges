import { parseWithZod } from '@conform-to/zod'
import { invariantResponse } from '@epic-web/invariant'
import {
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
	redirect,
} from 'react-router-dom'
import { z } from 'zod'
import { type AnnouncementHandle } from '#app/components/route-announcer'
import { getMessage, updateMessage } from '#app/utils/messages'

export type LoaderData = ReturnType<typeof loader>

export const handle = {
	announcement(data) {
		return `Update message "${data.message.text}"`
	},
} satisfies AnnouncementHandle<LoaderData>

export function loader({ params }: LoaderFunctionArgs) {
	const { id } = params
	invariantResponse(typeof id === 'string', 'ID must be a string')

	const message = getMessage(id)
	invariantResponse(message, 'Message not found', { status: 404 })

	return { message }
}

export const UpdateMessageSchema = z.object({
	id: z.string(),
	text: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()

	const result = parseWithZod(formData, { schema: UpdateMessageSchema })
	if (result.status !== 'success') return result.reply()

	updateMessage(result.value.id, result.value)

	return redirect('/nested-routes')
}
