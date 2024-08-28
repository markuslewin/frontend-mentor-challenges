import { Link } from 'react-router-dom'
import { Img } from '#app/components/picture'

export function Home() {
	return (
		<main>
			<h1>
				<Img
					alt="The Hangman Game"
					priority
					src="/assets/images/logo.svg"
					width="374"
					height="185"
				/>
			</h1>
			<ul role="list">
				<li>
					<Link to="/categories">
						<Img
							alt="Play"
							src="/assets/images/icon-play.svg"
							width="67"
							height="64"
						/>
					</Link>
				</li>
				<li>
					<Link to="/instructions">How to play</Link>
				</li>
			</ul>
		</main>
	)
}
