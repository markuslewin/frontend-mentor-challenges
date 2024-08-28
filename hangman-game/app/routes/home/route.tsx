import { Link } from 'react-router-dom'
import { Img } from '#app/components/picture'

export function Home() {
	return (
		<main className="min-h-screen items-center p-6 center-[37rem]">
			<div>
				<h1 className="flex justify-center px-8">
					<Img
						className=""
						alt="The Hangman Game"
						priority
						src="/assets/images/logo.svg"
						width="374"
						height="185"
					/>
				</h1>
				<ul
					className="-mt-20 rounded-[3rem] bg-gradient-to-b from-[hsl(230_56%_47%)] to-[hsl(230_100%_24%/83%)] px-8 pb-16 pt-36 shadow-[inset_0_-0.5rem_0_0.25rem_hsl(244_76%_23%),inset_0_0.375rem_0_0.5rem_hsl(223_100%_57%)] tablet:-mt-[4.6875rem] tablet:pt-[8.0625rem]"
					role="list"
				>
					<li className="flex justify-center">
						<Link
							className="bg-pink-gradient inline-grid size-40 place-items-center rounded-full shadow-[inset_0_-0.25rem_0_0.3125rem_hsl(215_29%_20%),inset_0_-0.75rem_0_0.6875rem_hsl(274_91%_57%)] tablet:size-[12.5rem]"
							to="/categories"
						>
							<Img
								className="h-[3.25rem] w-auto tablet:h-16"
								alt="Play"
								src="/assets/images/icon-play.svg"
								width="67"
								height="64"
							/>
						</Link>
					</li>
					<li className="mt-14 flex justify-center">
						<Link
							className="bg-blue text-white text-32 basis-[16.25rem] rounded-full p-3 text-center uppercase shadow-[inset_0_-0.125rem_0_0.1875rem_hsl(244_76%_23%),inset_0_0.0625rem_0_0.375rem_hsl(223_100%_62%)]"
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
