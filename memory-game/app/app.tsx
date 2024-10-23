import { useEffect, useState } from 'react'
import { AnnouncementProvider } from '#app/components/announcer'
import { Menu } from '#app/screens/menu'
import { Play } from '#app/screens/play'
import { type Options } from '#app/utils/memory'

type Screen = 'start-game' | 'play'

function Memory() {
	const [screen, setScreen] = useState<Screen>('start-game')
	const [options, setOptions] = useState<Options>({
		theme: 'numbers',
		players: '1',
		grid: '4x4',
	})

	useEffect(() => {
		document.body.dataset['screen'] = screen
		return () => {
			delete document.body.dataset['screen']
		}
	}, [screen])

	if (screen === 'start-game') {
		return (
			<Menu
				defaultOptions={options}
				onStartGame={(options) => {
					setOptions(options)
					setScreen('play')
				}}
			/>
		)
	} else if (screen === 'play') {
		return (
			<Play
				options={options}
				onNewGame={() => {
					setScreen('start-game')
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
