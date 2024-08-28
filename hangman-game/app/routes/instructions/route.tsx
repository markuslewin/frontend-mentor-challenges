import { Link } from 'react-router-dom'

export function Instructions() {
	return (
		<>
			<header>
				<Link to="/">Back</Link>
				<h1>How to Play</h1>
			</header>
			<main>
				<h2>
					<div>01</div>
					Choose a category
				</h2>
				<p>
					First, choose a word category, like animals or movies. The computer
					then randomly selects a secret word from that topic and shows you
					blanks for each letter of the word.
				</p>
				<h2>
					<div>02</div>
					Guess letters
				</h2>
				<p>
					Take turns guessing letters. The computer fills in the relevant blank
					spaces if your guess is correct. If it's wrong, you lose some health,
					which empties after eight incorrect guesses.
				</p>
				<h2>
					<div>03</div>
					Win or lose
				</h2>
				<p>
					You win by guessing all the letters in the word before your health
					runs out. If the health bar empties before you guess the word, you
					lose.
				</p>
			</main>
		</>
	)
}
