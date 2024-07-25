import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { getShortenedUrl, shortenRequestSchema } from '#app/utils/shortener'

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
	const links = localStorage.getItem(linksKey)
	if (!links) {
		return []
	}
	return linksSchema.parse(JSON.parse(links))
}

export function createLink(link: Link) {
	const links = getLinks()
	localStorage.setItem(
		linksKey,
		JSON.stringify([...links, link] satisfies Links),
	)
}

export function useLinks() {
	const queryClient = useQueryClient()
	const query = useQuery({
		queryKey: ['links'],
		queryFn: getLinks,
		initialData: getLinks(),
	})
	const create = useMutation({
		mutationFn: async (formData: FormData) => {
			const vars = shortenRequestSchema.parse(Object.fromEntries(formData))
			const result = await getShortenedUrl({ link: vars.link })
			if ('error' in result) {
				throw new Error(result.error)
			}

			createLink({ long: vars.link, short: result.result_url })
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['links'] })
		},
	})

	return { data: query.data, create }
}
