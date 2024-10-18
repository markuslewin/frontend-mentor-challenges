import { useEffect, useState } from 'react'
import { AnnouncementProvider } from '#app/components/announcer'
import { Menu } from '#app/screens/menu'
import { Play } from '#app/screens/play'
import { type Options } from '#app/utils/memory'

type Screen = { type: 'start-game' } | { type: 'play'; options: Options }

function Memory() {
	const [screen, setScreen] = useState<Screen>({ type: 'start-game' })

	useEffect(() => {
		document.body.dataset['screen'] = screen.type
		return () => {
			delete document.body.dataset['screen']
		}
	}, [screen.type])

	if (screen.type === 'start-game') {
		return (
			<Menu
				onStartGame={(options) => {
					setScreen({ type: 'play', options })
				}}
			/>
		)
	} else if (screen.type === 'play') {
		return (
			<Play
				options={screen.options}
				onNewGame={() => {
					setScreen({ type: 'start-game' })
				}}
			/>
		)
	} else {
		throw new Error(`Invalid screen: ${screen}`)
	}
}

export function App() {
	return (
		<AnnouncementProvider>
			<Memory />
		</AnnouncementProvider>
	)
}
