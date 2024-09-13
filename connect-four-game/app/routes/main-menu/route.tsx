import { Link, useNavigate } from 'react-router-dom'
import { headingL } from '#app/styles.css'

export function MainMenuRoute() {
	const navigate = useNavigate()

	return (
		<>
			<h1 className={headingL}>MainMenuRoute</h1>
			<button
				type="button"
				onClick={() => {
					navigate('/play')
				}}
			>
				Play vs player
			</button>
			<Link to="/rules">Game rules</Link>
		</>
	)
}
