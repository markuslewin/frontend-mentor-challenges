import { useAnnouncer } from '#app/components/announcer'
import { srOnly } from '#app/styles.css'

export function Announcer() {
	const { announcements } = useAnnouncer()

	return (
		<div className={srOnly} aria-live="assertive">
			{announcements.map((announcement) => (
				<p key={announcement.id}>{announcement.message}</p>
			))}
		</div>
	)
}
