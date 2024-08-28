import { redirect } from 'react-router-dom'
import { type AnnouncementHandle } from '#app/components/route-announcer'

export const handle = {
	announcement() {
		return 'Play'
	},
} satisfies AnnouncementHandle

export function action() {
	// todo: Update state in `localStorage`
	return redirect('/play')
}
