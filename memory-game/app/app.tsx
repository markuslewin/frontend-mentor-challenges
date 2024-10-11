import { AnnouncementProvider } from '#app/components/announcer'

function Memory() {
	return (
		<>
			<h1 className="text-game-title">memory</h1>
			<p className="text-game-meta-current">CURRENT TURN</p>
		</>
	)
}

export function App() {
	return (
		<AnnouncementProvider>
			<Memory />
		</AnnouncementProvider>
	)
}
