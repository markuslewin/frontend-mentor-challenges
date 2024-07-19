import { parseWithZod } from '@conform-to/zod'
import { invariant } from '@epic-web/invariant'
import { type ActionFunctionArgs, redirect } from 'react-router-dom'
import { z } from 'zod'
import { type AnnouncementHandle } from '#app/components/route-announcer'
import { getShortenedUrl, shortenRequestSchema } from '#app/utils/shortener.js'

export const handle = {
	announcement() {
		return 'Home'
	},
} satisfies AnnouncementHandle

export function loader() {
	return {
		urls: getUrls(),
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

	const urls = getUrls()
	localStorage.setItem('urls', JSON.stringify([...urls, result.result_url]))

	return redirect('/')
}

const urlsSchema = z.array(z.string())

function getUrls() {
	try {
		const raw = localStorage.getItem('urls')
		invariant(raw, 'No URLs')
		const json = JSON.parse(raw)
		return urlsSchema.parse(json)
	} catch {
		return []
	}
}
