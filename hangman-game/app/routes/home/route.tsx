import { cx } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import { Img } from '#app/components/picture'
import { PinkButtonOverlay } from '#app/components/pink-button'
import { blueButton, dialog } from '#app/utils/styles'

export function Home() {
	return (
		<main className="min-h-screen items-center p-6 center-[37rem]">
			<div>
				<h1 className="flex justify-center px-8">
					<Img
						className="h-auto w-[23.375rem]"
						alt="The Hangman Game"
						priority
						src="/assets/images/logo.svg"
						width="374"
						height="185"
					/>
				</h1>
				<ul
					className={cx(
						dialog,
						'-mt-20 px-8 pb-16 pt-36 tablet:-mt-[4.6875rem] tablet:pt-[8.0625rem]',
					)}
					role="list"
				>
					<li className="flex justify-center">
						<Link
							className="group relative isolate inline-grid size-40 place-items-center rounded-full bg-gradient-to-b from-pink from-[1.5rem] to-light-blue tablet:size-[12.5rem] tablet:from-[2rem]"
							to="/categories"
						>
							<PinkButtonOverlay />
							<span className="rounded-inherit shadow-[inset_0_-0.25rem_0_0.3125rem_hsl(215_29%_20%),inset_0_-0.75rem_0_0.6875rem_hsl(274_91%_57%)] layer-0" />
							<Img
								className="z-10 h-[3.25rem] w-auto tablet:h-16"
								alt="Play"
								src="/assets/images/icon-play.svg"
								width="67"
								height="64"
							/>
						</Link>
					</li>
					<li className="mt-14 flex justify-center">
						<Link
							className={cx(
								'basis-[16.25rem] rounded-full p-3 text-center text-32 uppercase',
								blueButton,
							)}
							to="/instructions"
						>
							How to play
						</Link>
					</li>
				</ul>
			</div>
		</main>
	)
}
