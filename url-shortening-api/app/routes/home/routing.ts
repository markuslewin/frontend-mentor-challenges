import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs, redirect } from 'react-router-dom'
import { type AnnouncementHandle } from '#app/components/route-announcer'
import { createLink, getLinks } from '#app/utils/links'
import { getShortenedUrl, shortenRequestSchema } from '#app/utils/shortener'

export const handle = {
	announcement() {
		return 'Home'
	},
} satisfies AnnouncementHandle

export function loader() {
	return {
		links: getLinks(),
	}
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()

	const submission = parseWithZod(formData, { schema: shortenRequestSchema })
	if (submission.status !== 'success') {
		return submission.reply()
	}

	const result = await getShortenedUrl(submission.value)
	if ('error' in result) {
		return submission.reply({ formErrors: [result.error] })
	}

	createLink({ long: submission.value.link, short: result.result_url })

	return redirect('/')
}
