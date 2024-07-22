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

	const links = getLinks()
	localStorage.setItem(
		'links',
		JSON.stringify([
			...links,
			{ long: submission.value.link, short: result.result_url },
		] satisfies Links),
	)

	return redirect('/')
}

const linksSchema = z.array(
	z.object({
		long: z.string(),
		short: z.string(),
	}),
)

type Links = z.infer<typeof linksSchema>

function getLinks() {
	try {
		const raw = localStorage.getItem('links')
		invariant(raw, 'No links')
		const json = JSON.parse(raw)
		return linksSchema.parse(json)
	} catch {
		return []
	}
}
