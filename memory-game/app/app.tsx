import {
	faAnchor,
	faBug,
	faCar,
	faFlask,
	faFutbolBall,
	faHandSpock,
	faLiraSign,
	faMoon,
	faSnowflake,
	faSun,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnnouncementProvider } from '#app/components/announcer'
import { Icon } from '#app/components/icon'

const iconStyle = { width: 'auto', height: '3.5rem' }

function Memory() {
	return (
		<>
			<h1 className="text-game-title">
				<Icon name="logo" /> memory
			</h1>
			<p className="text-game-meta-label">Player 1</p>
			<p className="text-game-meta-value">4</p>
			<p className="grid grid-cols-5">
				<FontAwesomeIcon icon={faFutbolBall} style={iconStyle} />
				<FontAwesomeIcon icon={faAnchor} style={iconStyle} />
				<FontAwesomeIcon icon={faFlask} style={iconStyle} />
				<FontAwesomeIcon icon={faSun} style={iconStyle} />
				<FontAwesomeIcon icon={faHandSpock} style={iconStyle} />
				<FontAwesomeIcon icon={faBug} style={iconStyle} />
				<FontAwesomeIcon icon={faMoon} style={iconStyle} />
				<FontAwesomeIcon icon={faSnowflake} style={iconStyle} />
				<FontAwesomeIcon icon={faLiraSign} style={iconStyle} />
				<FontAwesomeIcon icon={faCar} style={iconStyle} />
			</p>
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

// <!-- Game setup start -->

// Select Theme
// Numbers
// Icons

// Number of Players
// 1
// 2
// 3
// 4

// Grid Size
// 4x4
// 6x6

// Start Game

// <!-- Game setup end -->

// <!-- Game board start -->

// Restart
// New Game

// <!-- Multiplayer scores start -->

// Player 1
// <!-- P1 score -->
// Current Turn

// Player 2
// <!-- P2 score -->
// Current Turn

// Player 3
// <!-- P3 score -->
// Current Turn

// Player 4
// <!-- P4 score -->
// Current Turn

// <!-- Multiplayer scores start -->

// <!-- Solo game time and moves counter start -->

// Time
// <!-- Time elapsed -->

// Moves
// <!-- Moves total -->

// <!-- Solo game time and moves counter end -->

// <!-- Game board end -->
