import { useAnnouncer } from '#app/components/announcer'

export function Announcer() {
	const { announcements } = useAnnouncer()

	return (
		<div className="sr-only" aria-live="assertive">
			{announcements.map((announcement) => (
				<p key={announcement.id}>{announcement.message}</p>
			))}
		</div>
	)
}
