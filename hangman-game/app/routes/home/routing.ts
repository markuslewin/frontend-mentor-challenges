import { defer } from 'react-router-dom'
import { type AnnouncementHandle } from '#app/components/route-announcer'
import { getTime } from '#app/utils/time'

export const handle = {
	announcement() {
		return 'Home'
	},
} satisfies AnnouncementHandle

export function loader() {
	return defer({
		time: getTime(),
	})
}
