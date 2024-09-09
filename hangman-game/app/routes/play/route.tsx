import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Dialog from '@radix-ui/react-dialog'
import { cx } from 'class-variance-authority'
import React, { useMemo } from 'react'
import { Form, Link, useLoaderData } from 'react-router-dom'
import { Icon } from '#app/components/icon'
import * as Landmark from '#app/components/landmark'
import { MenuItemSpace } from '#app/components/menu-item'
import { Img } from '#app/components/picture'
import { PinkButtonOverlay } from '#app/components/pink-button'
import { ShadowText } from '#app/components/text-shadow'
import {
	getGuessDataProps,
	getIntentProps,
	type loader,
} from '#app/routes/play/routing'
import { alphabet } from '#app/utils/alphabet'
import { createSecret, parseWords } from '#app/utils/hangman'
import {
	blueButton,
	center,
	dialog,
	menuItem,
	menuItemButton,
	pinkButton,
	pinkCircleButton,
	shadowyBlue,
} from '#app/utils/styles'

const initialLives = 8

export function Play() {
	const data = useLoaderData() as ReturnType<typeof loader>
	const secret = useMemo(() => createSecret(data.state.name), [data.state.name])
	const words = useMemo(() => parseWords(secret), [secret])

	const lives = Math.max(
		0,
		initialLives -
			[...data.state.guesses].filter((g) => !secret.includes(g)).length,
	)

	const status: Status =
		lives <= 0
			? 'loss'
			: secret.every((c) => c === null || data.state.guesses.has(c))
				? 'win'
				: 'playing'

	return (
		<div className="flex min-h-screen flex-col">
			<div className="min-h-[2.875rem] grow-[60]" />
			<header className={cx(center)}>
				<div className="flex flex-wrap items-center justify-between gap-4">
					<div className="flex flex-wrap items-center gap-4 tablet:gap-8 desktop:gap-[3.5625rem]">
						<nav>
							<Dialog.Root>
								<Dialog.Trigger
									className={pinkCircleButton({ elementCenter: true })}
								>
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
									<Dialog.Overlay className={cx('', overlay)}>
										<Dialog.Content aria-describedby={undefined}>
											<Dialog.Title className={cx('', title)}>
												<ShadowText text="Paused" />
											</Dialog.Title>
											<ul className={cx('', options)} role="list">
												<li className={cx('', menuItem)}>
													<Dialog.Close
														className={cx('', menuItemButton, blueButton)}
													>
														<MenuItemSpace />
														Continue
														<MenuItemSpace />
													</Dialog.Close>
												</li>
												<li className={cx('', menuItem)}>
													<NewCategory />
												</li>
												<li className={cx('', menuItem)}>
													<QuitGame />
												</li>
											</ul>
										</Dialog.Content>
									</Dialog.Overlay>
								</Dialog.Portal>
							</Dialog.Root>
						</nav>
						<h1 className="text-40 -tracking-05 tablet:text-48 tablet:uppercase tablet:tracking-5 desktop:text-88 desktop:normal-case desktop:tracking-0">
							{data.state.category}
						</h1>
					</div>
					<p
						className="flex basis-[6.25rem] flex-wrap items-center gap-4 tablet:basis-[15.8125rem] tablet:gap-10 desktop:basis-[20.8125rem]"
						aria-live="polite"
						aria-atomic="true"
					>
						<span className="block grow rounded-full bg-white p-1 tablet:px-[0.6875rem] tablet:py-[0.5625rem]">
							<span className="block overflow-hidden rounded-full">
								<span
									className="block rounded-full border-t-[0.5rem] text-dark-navy transition-transform tablet:border-t-[0.8125rem]"
									style={{
										transform: `translateX(-${(1 - lives / initialLives) * 100}%)`,
									}}
								/>
							</span>
						</span>
						<span className="sr-only">
							You have <span data-testid="lives">{lives}</span> lives left
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
			<main className={cx(center, 'grow-[120]')}>
				<div className="flex flex-col">
					<Landmark.Root>
						<Landmark.Label>
							<h2 className="sr-only">Secret words</h2>
						</Landmark.Label>
						<div
							className="flex flex-wrap justify-center gap-x-10 gap-y-3 tablet:gap-x-[5.5rem] tablet:gap-y-4 desktop:gap-x-28"
							aria-live="polite"
						>
							{words.map((word, i) => (
								<React.Fragment key={i}>
									{i !== 0 ? (
										<p className="sr-only" tabIndex={0}>
											Space
										</p>
									) : null}
									<div className="flex flex-wrap justify-center gap-x-2 gap-y-1 tablet:gap-x-3 desktop:gap-x-4">
										{word.map((letter, y) => {
											const isGuessed = data.state.guesses.has(letter)

											return (
												<p
													className={cx(
														'grid h-[4.125rem] w-10 place-items-center rounded-[0.75rem] text-40 uppercase tablet:h-28 tablet:w-[5.5rem] tablet:rounded-[2rem] tablet:text-64 desktop:h-32 desktop:w-28 desktop:rounded-[2.5rem] desktop:text-88 desktop:tracking-0',
														shadowyBlue,
														!isGuessed ? 'opacity-25' : '',
													)}
													key={y}
													tabIndex={0}
													data-testid="secret-letter"
												>
													{isGuessed ? (
														letter
													) : (
														<span className="sr-only">Blank</span>
													)}
												</p>
											)
										})}
									</div>
								</React.Fragment>
							))}
						</div>
					</Landmark.Root>
					<div className="min-h-[7.5rem] grow" />
					<Landmark.Root>
						<Landmark.Label>
							<h2 className="sr-only">Keyboard</h2>
						</Landmark.Label>
						<Form method="post" preventScrollReset>
							<input type="hidden" {...getIntentProps('guess')} />
							<fieldset>
								<legend className="sr-only">Pick a letter</legend>
								<ol
									className="grid grid-cols-9 gap-x-2 gap-y-6 tablet:gap-4 desktop:gap-6"
									role="list"
								>
									{alphabet.map((letter) => (
										<li className="grid" key={letter}>
											<button
												className="rounded-[0.5rem] bg-white py-[0.625rem] text-center text-24 uppercase leading-150 -tracking-2 text-dark-navy transition-colors aria-disabled:opacity-25 hocus:aria-[disabled=false]:bg-blue hocus:aria-[disabled=false]:text-white tablet:rounded-[1.5rem] tablet:py-[0.8125rem] tablet:text-48 tablet:leading-120 tablet:tracking-5"
												{...getGuessDataProps(letter)}
												aria-disabled={data.state.guesses.has(letter)}
											>
												{letter}
											</button>
										</li>
									))}
								</ol>
							</fieldset>
						</Form>
					</Landmark.Root>
					<AlertDialog.Root open={status !== 'playing'}>
						<AlertDialog.Portal>
							{status === 'loss' || status === 'win' ? (
								<AlertDialog.Overlay className={cx('', overlay)}>
									<AlertDialog.Content>
										<AlertDialog.Title className={cx('', title)}>
											<ShadowText text={getAlertTitle(status)} />
										</AlertDialog.Title>
										<AlertDialog.Description className="sr-only">
											What do you want to do?
										</AlertDialog.Description>
										<ul className={cx('', options)} role="list">
											<li className="grid">
												<Form className={menuItem} method="post">
													{/* Cancel button is focused when `AlertDialog` opens */}
													<AlertDialog.Cancel asChild type="submit">
														<button
															className={cx('', menuItemButton, blueButton)}
															{...getIntentProps('play-again')}
														>
															<MenuItemSpace />
															Play again!
															<MenuItemSpace />
														</button>
													</AlertDialog.Cancel>
												</Form>
											</li>
											<li className={cx('', menuItem)}>
												<NewCategory />
											</li>
											<li className={cx('', menuItem)}>
												<QuitGame />
											</li>
										</ul>
									</AlertDialog.Content>
								</AlertDialog.Overlay>
							) : null}
						</AlertDialog.Portal>
					</AlertDialog.Root>
				</div>
			</main>
			<div className="min-h-[4.875rem] grow-[78]" />
		</div>
	)
}

const overlay =
	'fixed inset-0 items-center overflow-y-auto bg-gradient-to-b from-[hsl(264_87%_12%/75%)] via-[hsl(242_74%_27%/75%)] via-70% to-[hsl(253_69%_28%/75%)] p-6 center-[37rem]'

const title = 'px-6 text-center text-94 -tracking-05 tablet:text-134'

const options = cx(
	'-mt-[3.8125rem] flex flex-col items-center gap-[2.125rem] px-6 pb-20 pt-[6.5rem] tablet:-mt-[4.5rem] tablet:pb-[4.4375rem] tablet:pt-[7.5rem]',
	dialog,
)

function NewCategory() {
	return (
		<Link className={cx('', blueButton, menuItemButton)} to="/categories">
			<MenuItemSpace />
			New category
			<MenuItemSpace />
		</Link>
	)
}

function QuitGame() {
	return (
		<Link
			className={cx('group relative isolate', pinkButton, menuItemButton)}
			to="/"
		>
			<PinkButtonOverlay />
			<span className="rounded-inherit shadow-[inset_0_-0.125rem_0_0.1875rem_hsl(244_76%_23%),inset_0_0.0625rem_0_0.375rem_hsl(283_96%_62%)] layer-0" />
			<MenuItemSpace />
			Quit game
			<MenuItemSpace />
		</Link>
	)
}

type Status = 'win' | 'loss' | 'playing'

function getAlertTitle(status: 'win' | 'loss'): string {
	if (status === 'loss') {
		return 'You Lose'
	} else if (status === 'win') {
		return 'You Win'
	}
	throw new Error(`Invalid status "${status}"`)
}
