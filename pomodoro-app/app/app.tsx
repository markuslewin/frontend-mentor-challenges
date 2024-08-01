import { AnnouncementProvider, Announcer } from '#app/components/announcer'

export function App() {
	return (
		<AnnouncementProvider>
			<main>
				<h1>Pomodoro</h1>
			</main>
			<Announcer />
		</AnnouncementProvider>
	)
}
