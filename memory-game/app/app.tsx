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

const iconStyle = { width: 'auto', height: '3.5rem' }

function Memory() {
	return (
		<>
			<h1 className="text-game-title">memory</h1>
			<p className="text-game-meta-current">CURRENT TURN</p>
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
