import { cx } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import { Icon } from '#app/components/icon'

const center = 'center-[76rem] center-gutter-6 tablet:center-gutter-10'

export function Instructions() {
	return (
		<div className="flex min-h-screen flex-col">
			<div className="min-h-8 grow-[80]" />
			<header className={cx(center, '')}>
				<div className="grid grid-cols-[1fr_auto] items-center tablet:grid-cols-[1fr_auto_1fr]">
					<div>
						<Link
							className="group relative inline-grid size-10 place-items-center rounded-full bg-gradient-to-b from-pink from-15% to-light-blue pb-1 shadow-[inset_0_-0.3125rem_0_-0.0625rem_hsl(274_91%_57%/25%)] tablet:size-16 tablet:pb-[0.8125rem] tablet:shadow-[inset_0_-0.375rem_0_0.4375rem_hsl(274_91%_57%/25%)] desktop:size-[5.875rem]"
							to="/"
						>
							<span className="rounded-inherit bg-white/25 opacity-0 transition-opacity layer-0 group-hocus:opacity-100" />
							<Icon
								className="h-auto w-[43.61702127659574%]"
								name="icon-back"
								width="41"
								height="39"
							/>
							<span className="sr-only">Back</span>
						</Link>
					</div>
					<h1 className="text-48 tablet:text-104 tablet:-tracking-5 desktop:text-136">
						How to Play
					</h1>
				</div>
			</header>
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
	return (
		<div className="text-light-navy items-center rounded-[1.25rem] bg-white p-8 tablet:grid tablet:grid-cols-[auto_1fr] tablet:gap-10 tablet:rounded-[2.5rem] tablet:px-10 desktop:block desktop:px-12 desktop:py-[3.75rem] desktop:text-center">
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
		</div>
	)
}
