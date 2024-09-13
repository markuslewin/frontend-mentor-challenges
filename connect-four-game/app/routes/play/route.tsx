import { Link } from 'react-router-dom'
import { headingL } from '#app/styles.css'

export function PlayRoute() {
	return (
		<>
			<h1 className={headingL}>PlayRoute</h1>
			<Link to="/">Main menu</Link>
		</>
	)
}
