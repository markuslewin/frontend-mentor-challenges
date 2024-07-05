import { invariant } from '@epic-web/invariant'
import { useContext } from 'react'
import { context } from '#app/components/announcer/common'

export function useAnnouncer() {
	const value = useContext(context)
	invariant(value !== null, 'Value of announcer context was null')

	return value
}
