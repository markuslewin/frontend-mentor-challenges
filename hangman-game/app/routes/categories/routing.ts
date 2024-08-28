import { redirect } from 'react-router-dom'
import { type AnnouncementHandle } from '#app/components/route-announcer'

export const handle = {
	announcement() {
		return 'Categories'
	},
} satisfies AnnouncementHandle

export function action() {
	// todo: Set state in `localStorage`
	return redirect('/play')
}
