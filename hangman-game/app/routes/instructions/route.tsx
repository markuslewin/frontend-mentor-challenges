import { useMediaQuery } from '@uidotdev/usehooks'
import { cx } from 'class-variance-authority'
import { Squircle } from 'corner-smoothing'
import { Header } from '#app/components/header'
import { media } from '#app/utils/screens'
import { center } from '#app/utils/styles'

export function Instructions() {
	return (
		<div className="flex min-h-screen flex-col">
			<div className="min-h-8 grow-[80]" />
			<Header heading="How to Play" />
			<div className="min-h-16 grow-[64]" />
			<main className={cx(center, '')}>
				<div className="grid gap-6 tablet:gap-8 desktop:grid-cols-3">
					<Card
						number="01"
						heading="Choose a category"
						body="First, choose a word category, like animals or movies. The computer
					then randomly selects a secret word from that topic and shows you
					blanks for each letter of the word."
					/>
					<Card
						number="02"
						heading="Guess letters"
						body="Take turns guessing letters. The computer fills in the relevant blank
					spaces if your guess is correct. If it's wrong, you lose some health,
					which empties after eight incorrect guesses."
					/>
					<Card
						number="03"
						heading="Win or lose"
						body="You win by guessing all the letters in the word before your health
					runs out. If the health bar empties before you guess the word, you
					lose."
					/>
				</div>
			</main>
			<div className="min-h-[3.75rem] grow-[167]" />
		</div>
	)
}

interface CardProps {
	number: string
	heading: string
	body: string
}

function Card({ number, heading, body }: CardProps) {
	const tabletMatches = useMediaQuery(media.tablet)

	return (
		<Squircle
			className="items-center bg-white p-8 text-light-navy tablet:grid tablet:grid-cols-[auto_1fr] tablet:gap-10 tablet:px-10 desktop:block desktop:px-12 desktop:py-[3.75rem] desktop:text-center"
			cornerRadius={tabletMatches ? 40 : 20}
		>
			<p
				className="hidden text-24 text-blue tablet:block tablet:text-88 tablet:tracking-0"
				aria-hidden="true"
			>
				{number}
			</p>
			<div className="desktop:mt-10">
				<h2 className="flex gap-4 tablet:block">
					<span
						className="text-24 text-blue tablet:hidden tablet:text-88 tablet:tracking-0"
						aria-hidden="true"
					>
						{number}
					</span>
					<span className="text-24 text-dark-navy tablet:text-40 desktop:text-48">
						{heading}
					</span>
				</h2>
				<p className="mt-4 desktop:mt-10">{body}</p>
			</div>
		</Squircle>
	)
}
