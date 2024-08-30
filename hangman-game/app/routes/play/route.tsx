import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Dialog from '@radix-ui/react-dialog'
import { cx } from 'class-variance-authority'
import { Form, Link } from 'react-router-dom'
import { Icon } from '#app/components/icon'
import * as Landmark from '#app/components/landmark'
import { Img } from '#app/components/picture'
import { PinkButtonOverlay } from '#app/components/pink-button'
import { center, pinkButton, shadowyBlue } from '#app/utils/styles.js'

const playableLetter = cx(
	'grid h-[4.125rem] w-10 place-items-center rounded-[0.75rem] tablet:h-28 tablet:w-[5.5rem] tablet:rounded-[2rem] desktop:h-32 desktop:w-28 desktop:rounded-[2.5rem]',
	shadowyBlue,
)

const maxLives = 8

export function Play() {
	const lives = 4
	const guesses = ['M', 'A', 'D', 'W', 'O', 'R', 'L', 'D']

	return (
		<div className="flex min-h-screen flex-col">
			<div className="min-h-[2.875rem] grow-[60]" />
			<header className={cx(center)}>
				<div className="flex flex-wrap items-center justify-between gap-4">
					<div className="flex flex-wrap items-center gap-4 tablet:gap-8 desktop:gap-[3.5625rem]">
						<nav>
							<Dialog.Root>
								<Dialog.Trigger className={pinkButton({ elementCenter: true })}>
									<PinkButtonOverlay />
									<Icon
										className="h-auto w-[40.42553191489362%]"
										name="icon-menu"
										width="38"
										height="32"
									/>
									<span className="sr-only">Menu</span>
								</Dialog.Trigger>
								<Dialog.Portal>
									{/* <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" /> */}
									<Dialog.Content
										// className="data-[state=open]:animate-contentShow bg-white fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
										aria-describedby={undefined}
									>
										<Dialog.Title
										// className="text-mauve12 m-0 text-[17px] font-medium"
										>
											Paused
										</Dialog.Title>
										<ul>
											<li>
												<Dialog.Close>Continue</Dialog.Close>
											</li>
											<li>
												<Link to="/categories">New category</Link>
											</li>
											<li>
												<Link to="/">Quit game</Link>
											</li>
										</ul>
									</Dialog.Content>
								</Dialog.Portal>
							</Dialog.Root>
						</nav>
						<h1 className="text-40 -tracking-05 tablet:text-48 tablet:uppercase tablet:tracking-5 desktop:text-88 desktop:normal-case desktop:tracking-0">
							Countries
						</h1>
					</div>
					<p className="flex basis-[6.25rem] flex-wrap items-center gap-4 tablet:basis-[15.8125rem] tablet:gap-10 desktop:basis-[20.8125rem]">
						<span className="block grow rounded-full bg-white p-1 tablet:px-[0.6875rem] tablet:py-[0.5625rem]">
							<span
								className="block w-4 rounded-full border-t-[0.5rem] text-dark-navy tablet:border-t-[0.8125rem]"
								style={{ width: `${(lives / maxLives) * 100}%` }}
							/>
						</span>
						<span className="sr-only">
							You have {lives} out of {maxLives} lives left
						</span>
						<Img
							className="h-6 w-auto tablet:h-[3.125rem]"
							alt=""
							src="/assets/images/icon-heart.svg"
							width="54"
							height="50"
						/>
					</p>
				</div>
			</header>
			<div className="min-h-[4.875rem] grow-[88]" />
			<main className={cx(center, 'grow-[692]')}>
				<div className="flex flex-col">
					<Landmark.Root>
						<Landmark.Label>
							<h2 className="sr-only">Secret words</h2>
						</Landmark.Label>
						<div className="flex flex-wrap justify-center gap-3 tablet:gap-4">
							{[
								{
									type: 'word' as const,
									value: [
										{ type: 'solved' as const, value: 'u' },
										{ type: 'solved' as const, value: 'n' },
										{ type: 'solved' as const, value: 'i' },
										{ type: 'blank' as const },
										{ type: 'blank' as const },
										{ type: 'solved' as const, value: 'd' },
									],
								},
								{ type: 'space' as const },
								{
									type: 'word' as const,
									value: [
										{ type: 'blank' as const },
										{ type: 'solved' as const, value: 'i' },
										{ type: 'solved' as const, value: 'n' },
										{ type: 'blank' as const },
										{ type: 'solved' as const, value: 'd' },
										{ type: 'solved' as const, value: 'o' },
										{ type: 'blank' as const },
									],
								},
							].map((wordOrSpace, i) =>
								wordOrSpace.type === 'space' ? (
									<p className="sr-only" key={i} tabIndex={0}>
										Space
									</p>
								) : (
									<div
										className="flex gap-2 tablet:gap-3 desktop:gap-4"
										key={i}
									>
										{wordOrSpace.value.map((solvedOrBlank, y) =>
											solvedOrBlank.type === 'blank' ? (
												<p
													className={cx('opacity-25', playableLetter)}
													key={y}
													tabIndex={0}
												>
													<span className="sr-only">Blank</span>
												</p>
											) : (
												<p
													className={cx(
														'text-40 uppercase tablet:text-64 desktop:text-88 desktop:tracking-0',
														playableLetter,
													)}
													key={y}
													tabIndex={0}
												>
													{solvedOrBlank.value}
												</p>
											),
										)}
									</div>
								),
							)}
						</div>
					</Landmark.Root>
					<div className="min-h-[7.5rem] grow-[120]" />
					<Landmark.Root>
						<Landmark.Label>
							<h2 className="sr-only">Keyboard</h2>
						</Landmark.Label>
						<Form method="post">
							<fieldset>
								<legend className="sr-only">Pick a letter</legend>
								<ol
									className="grid grid-cols-9 gap-x-2 gap-y-6 tablet:gap-4 desktop:gap-6"
									role="list"
								>
									{[
										'A',
										'B',
										'C',
										'D',
										'E',
										'F',
										'G',
										'H',
										'I',
										'J',
										'K',
										'L',
										'M',
										'N',
										'O',
										'P',
										'Q',
										'R',
										'S',
										'T',
										'U',
										'V',
										'W',
										'X',
										'Y',
										'Z',
									].map((letter) => (
										<li className="grid" key={letter}>
											<button
												className="rounded-[0.5rem] bg-white py-[0.625rem] text-center text-24 leading-150 -tracking-2 text-dark-navy transition-colors aria-disabled:opacity-25 hocus:aria-[disabled=false]:bg-blue hocus:aria-[disabled=false]:text-white tablet:rounded-[1.5rem] tablet:py-[0.8125rem] tablet:text-48 tablet:leading-120 tablet:tracking-5"
												name="letter"
												value={letter}
												aria-disabled={guesses.includes(letter)}
											>
												{letter}
											</button>
										</li>
									))}
								</ol>
							</fieldset>
						</Form>
					</Landmark.Root>
					<AlertDialog.Root open={false} onOpenChange={() => {}}>
						<AlertDialog.Portal>
							{/* <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" /> */}
							<AlertDialog.Content
								// className="data-[state=open]:animate-contentShow bg-white fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
								aria-describedby={undefined}
							>
								<AlertDialog.Title
								// className="text-mauve12 m-0 text-[17px] font-medium"
								>
									You Win/You Lose
								</AlertDialog.Title>
								<ul>
									<li>
										<Form>
											<button>Play again!</button>
										</Form>
									</li>
									<li>
										<Link to="/categories">New category</Link>
									</li>
									<li>
										<Link to="/">Quit game</Link>
									</li>
								</ul>
							</AlertDialog.Content>
						</AlertDialog.Portal>
					</AlertDialog.Root>
				</div>
			</main>
			<div className="min-h-[4.875rem] grow-[78]" />
		</div>
	)
}
