import { type AnnouncementHandle } from '#app/components/route-announcer'

export const handle = {
	announcement() {
		return 'Bookmarked shows'
	},
} satisfies AnnouncementHandle
