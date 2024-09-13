import { Link } from 'react-router-dom'
import { headingL } from '#app/styles.css'

export function RulesRoute() {
	return (
		<>
			<h1 className={headingL}>RulesRoute</h1>
			<Link to="/">Main menu</Link>
		</>
	)
}
