import { Form, Link } from 'react-router-dom'
import { Icon } from '#app/components/icon'

export function Categories() {
	return (
		<>
			<header>
				<Link to="/">
					<Icon name="icon-back" />
					<span>Back</span>
				</Link>
				<h1>Pick a Category</h1>
			</header>
			<main>
				<Form method="post">
					<fieldset>
						<legend>Pick a category</legend>
						<ul role="list">
							<li>
								<button name="category" value="movies">
									Movies
								</button>
							</li>
							<li>
								<button name="category" value="tv-shows">
									TV Shows
								</button>
							</li>
							<li>
								<button name="category" value="countries">
									Countries
								</button>
							</li>
							<li>
								<button name="category" value="capital-cities">
									Capital Cities
								</button>
							</li>
							<li>
								<button name="category" value="animals">
									Animals
								</button>
							</li>
							<li>
								<button name="category" value="sports">
									Sports
								</button>
							</li>
						</ul>
					</fieldset>
				</Form>
			</main>
		</>
	)
}
