import { invariant } from '@epic-web/invariant'
import { z } from 'zod'

const linksKey = 'links'

const linksSchema = z.array(
	z.object({
		long: z.string(),
		short: z.string(),
	}),
)

type Links = z.infer<typeof linksSchema>
type Link = Links[number]

export function getLinks() {
	try {
		const raw = localStorage.getItem(linksKey)
		invariant(raw, 'No links')
		const json = JSON.parse(raw)
		return linksSchema.parse(json)
	} catch {
		return []
	}
}

export function createLink(link: Link) {
	const links = getLinks()
	localStorage.setItem(
		linksKey,
		JSON.stringify([...links, link] satisfies Links),
	)
}
