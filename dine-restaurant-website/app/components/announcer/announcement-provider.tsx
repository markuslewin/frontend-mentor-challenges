import { createId } from '@paralleldrive/cuid2'
import { type ReactNode, useState } from 'react'
import { type Announcement, context } from '#app/components/announcer/common'

const DELETION_DELAY = 7000

export interface AnnouncementProviderProps {
	children: ReactNode
}

export function AnnouncementProvider({ children }: AnnouncementProviderProps) {
	const [announcements, setAnnouncements] = useState<Announcement[]>([])

	return (
		<context.Provider
			value={{
				announcements,
				announce(message) {
					const id = createId()
					setAnnouncements([...announcements, { id, message }])
					setTimeout(() => {
						setAnnouncements((announcements) =>
							announcements.filter((announcement) => announcement.id !== id),
						)
					}, DELETION_DELAY)
				},
			}}
		>
			{children}
		</context.Provider>
	)
}
