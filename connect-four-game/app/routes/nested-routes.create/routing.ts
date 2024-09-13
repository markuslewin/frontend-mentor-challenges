import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs, redirect } from 'react-router-dom'
import { z } from 'zod'
import { type AnnouncementHandle } from '#app/components/route-announcer'
import { createMessage } from '#app/utils/messages'

export const handle = {
	announcement() {
		return 'Add a message'
	},
} satisfies AnnouncementHandle

export const AddMessageSchema = z.object({
	text: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()

	const result = parseWithZod(formData, { schema: AddMessageSchema })
	if (result.status !== 'success') return result.reply()

	createMessage(result.value)

	return redirect('/nested-routes')
}
