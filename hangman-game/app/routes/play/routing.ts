import { redirect } from 'react-router-dom'
import { type AnnouncementHandle } from '#app/components/route-announcer'
import { getState } from '#app/utils/hangman'

export const handle = {
	announcement() {
		return 'Play'
	},
} satisfies AnnouncementHandle

export function loader() {
	try {
		const state = getState()
		return { state }
	} catch {
		throw redirect('/categories')
	}
}

export function action() {
	// todo: Update state in `localStorage`
	return redirect('/play')
}
