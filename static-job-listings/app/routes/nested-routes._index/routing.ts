import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs, redirect } from 'react-router-dom'
import { z } from 'zod'
import { type AnnouncementHandle } from '#app/components/route-announcer'
import { deleteMessage, getMessages } from '#app/utils/messages'

export const handle = {
	announcement() {
		return 'Messages'
	},
} satisfies AnnouncementHandle

export function loader() {
	const messages = getMessages() ?? []

	return {
		messages,
	}
}

export const DeleteMessageSchema = z.object({
	id: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()

	const result = parseWithZod(formData, { schema: DeleteMessageSchema })
	if (result.status !== 'success') return result.reply()

	deleteMessage(result.value.id)

	return redirect('/nested-routes')
}
