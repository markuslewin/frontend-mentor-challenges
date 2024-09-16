import { Link } from 'react-router-dom'
import { Icon } from '#app/components/icon'
import {
	card,
	check,
	h1,
	h1Body,
	h2,
	h2Body,
	howToPlay,
	instruction,
	instructionNumber,
	instructions,
	mainContainer,
	mainMenuLink,
	mainMenuLinkContainer,
} from '#app/routes/rules/styles.css'
import { srOnly } from '#app/styles.css'

export function RulesRoute() {
	return (
		<main className={mainContainer}>
			<div className={card}>
				<h1 className={h1}>Rules</h1>
				<div className={h1Body}>
					<h2 className={h2}>Objective</h2>
					<p className={h2Body}>
						Be the first player to connect 4 of the same colored discs in a row
						(either vertically, horizontally, or diagonally).
					</p>
					<h2 className={howToPlay}>How to play</h2>
					<ol className={instructions}>
						<li className={instruction}>
							<span className={instructionNumber}>
								1<span className={srOnly}>.</span>{' '}
							</span>
							Red goes first in the first game.
						</li>
						<li className={instruction}>
							<span className={instructionNumber}>
								2<span className={srOnly}>.</span>{' '}
							</span>
							Players must alternate turns, and only one disc can be dropped in
							each turn.
						</li>
						<li className={instruction}>
							<span className={instructionNumber}>
								3<span className={srOnly}>.</span>{' '}
							</span>
							The game ends when there is a 4-in-a-row or a stalemate.
						</li>
						<li className={instruction}>
							<span className={instructionNumber}>
								4<span className={srOnly}>.</span>{' '}
							</span>
							The starter of the previous game goes second on the next game.
						</li>
					</ol>
				</div>
			</div>
			<p className={mainMenuLinkContainer}>
				<Link className={mainMenuLink} to="/">
					<Icon className={check} name="icon-check" />
					<span className={srOnly}>Main menu</span>
				</Link>
			</p>
		</main>
	)
}
