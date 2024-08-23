import { useSearchParams } from 'react-router-dom'
import { type Shows } from '#app/utils/shows'

export const queryName = 'q'

export function useQuery() {
	const [searchParams] = useSearchParams()
	return searchParams.get(queryName)
}

export function queryShows(shows: Shows, query: string | null) {
	return shows.filter((s) =>
		query ? s.title.toLowerCase().includes(query.toLowerCase()) : true,
	)
}
