import { type AnnouncementHandle } from '#app/components/route-announcer'

export const handle = {
	announcement() {
		return 'The Hangman Game'
	},
} satisfies AnnouncementHandle
