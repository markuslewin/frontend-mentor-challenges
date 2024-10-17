import { getCollectionProps, getFormProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { invariant } from '@epic-web/invariant'
import {
	faAnchor,
	faBug,
	faFlask,
	faFutbolBall,
	faHandSpock,
	faMoon,
	faSnowflake,
	faSun,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css, cx } from '@linaria/core'
import * as Dialog from '@radix-ui/react-dialog'
import { useMediaQuery } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { AnnouncementProvider } from '#app/components/announcer'
import * as Landmark from '#app/components/landmark'
import { media } from '#app/utils/screens'

function rem(px: number) {
	return `${px / 16}rem`
}

const hocus = '&:hover, &:focus-visible'

const values = css`
	margin-top: ${rem(16)};
	display: flex;
	gap: var(--values-gap, ${rem(11)});

	& > * {
		flex: 1 0 0;
	}

	@media ${media.tablet} {
		gap: var(--values-gap, ${rem(30)});
	}
`

const value = css`
	display: block;
	border-radius: 9999px;
	padding: ${rem(10)};
	text-align: center;

	input:focus-visible + & {
		outline: ${rem(2)} solid black;
		outline-offset: ${rem(2)};
	}
`

const button = css`
	height: ${rem(40)};
	border-radius: 9999px;
	padding-inline: ${rem(24)};
	white-space: nowrap;

	@media ${media.tablet} {
		height: ${rem(52)};
	}
`

const meta = cx(
	'text-304859',
	css`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: ${rem(2)};
		border-radius: ${rem(5)};
		padding-block: ${rem(16)};
		background: hsl(203 25% 90%);
		@media ${media.tablet} {
			align-items: start;
			gap: ${rem(5)};
			border-radius: ${rem(10)};
			padding-inline: ${rem(24)};
		}
		@media ${media.desktop} {
			flex-direction: row;
			align-items: center;
			gap: 0;
		}
	`,
)
const metaLabel = cx('text-game-meta-label text-7191A5')
const metaValue = cx('text-game-meta-value')

const themes = ['numbers', 'icons'] as const
const themeSchema = z.enum(themes)

function isTheme(val: any): val is Theme {
	return themes.includes(val)
}

function assertTheme(val: any): asserts val is Theme {
	invariant(isTheme(val), `Invalid theme: ${val}`)
}

const players = ['1', '2', '3', '4'] as const
const playersSchema = z.enum(players)

const grids = ['4x4', '6x6'] as const
const gridSchema = z.enum(grids)

const startGameSchema = z.object({
	theme: themeSchema,
	players: playersSchema,
	grid: gridSchema,
})

type Theme = z.infer<typeof themeSchema>
type Options = z.infer<typeof startGameSchema>
type Screen = { type: 'start-game' } | { type: 'play'; options: Options }

type Position = [number, number]

type Writeable<T> = { -readonly [K in keyof T]: T[K] }

function getThemeName(id: Theme) {
	if (id === 'icons') {
		return 'Icons'
	} else if (id === 'numbers') {
		return 'Numbers'
	} else {
		throw new Error(`Invalid ID: ${id}`)
	}
}

function Memory() {
	const [screen, setScreen] = useState<Screen>({ type: 'start-game' })
	const tabletMatches = useMediaQuery(media.tablet)
	const desktopMatches = useMediaQuery(media.desktop)
	const [form, fields] = useForm({
		constraint: getZodConstraint(startGameSchema),
		defaultValue: {
			theme: 'numbers',
			players: '1',
			grid: '4x4',
		} satisfies Options,
		onSubmit(event, { formData }) {
			event.preventDefault()

			const submission = parseWithZod(formData, { schema: startGameSchema })
			invariant(
				submission.status === 'success',
				`Invalid form submission: ${JSON.stringify(submission.reply())}`,
			)

			setScreen({
				type: 'play',
				options: submission.value,
			})
		},
	})
	const tiles = [
		[
			{ id: 'futbol-ball', name: 'Futbol ball', icon: faFutbolBall },
			{ id: 'anchor', name: 'Anchor', icon: faAnchor },
			{ id: 'flask', name: 'Flask', icon: faFlask },
			{ id: 'sun', name: 'Sun', icon: faSun },
		],
		[
			{ id: 'moon', name: 'Moon', icon: faMoon },
			{ id: 'snowflake', name: 'Snowflake', icon: faSnowflake },
			{ id: 'hand-spock', name: 'Spock hand', icon: faHandSpock },
			{ id: 'bug', name: 'Bug', icon: faBug },
		],
		[
			{ id: 'futbol-ball', name: 'Futbol ball', icon: faFutbolBall },
			{ id: 'anchor', name: 'Anchor', icon: faAnchor },
			{ id: 'flask', name: 'Flask', icon: faFlask },
			{ id: 'sun', name: 'Sun', icon: faSun },
		],
		[
			{ id: 'moon', name: 'Moon', icon: faMoon },
			{ id: 'snowflake', name: 'Snowflake', icon: faSnowflake },
			{ id: 'hand-spock', name: 'Spock hand', icon: faHandSpock },
			{ id: 'bug', name: 'Bug', icon: faBug },
		],
		// faCar,
		// faLiraSign,
	] as const
	const [tile1, setTile1] = useState<Position | null>(null)
	const [tile2, setTile2] = useState<Position | null>(null)
	const [highlightedTiles, setHighlightedTiles] = useState<
		[Position, Position] | null
	>(null)
	const [solvedTiles, setSolvedTiles] = useState<
		Partial<Record<(typeof tiles)[number][number]['id'], 'p1'>>
	>({})

	useEffect(() => {
		document.body.dataset['screen'] = screen.type
		return () => {
			delete document.body.dataset['screen']
		}
	}, [screen.type])

	if (screen.type === 'start-game') {
		return (
			<main
				className={css`
					min-height: 100vh;
					padding: ${rem(24)};
					display: grid;
					grid-template-columns: minmax(auto, ${rem(654)});
					place-content: center;
				`}
			>
				<h1
					className={cx(
						'text-new-title',
						css`
							text-align: center;
						`,
					)}
				>
					memory
				</h1>
				<form
					{...getFormProps(form)}
					className={cx(
						'bg-FCFCFC text-7191A5',
						css`
							margin-top: ${rem(45)};
							border-radius: ${rem(10)};
							padding: ${rem(24)};
							@media ${media.tablet} {
								margin-top: ${rem(78)};
								border-radius: ${rem(20)};
								padding: ${rem(56)};
							}
						`,
					)}
				>
					<fieldset>
						<legend className="text-new-label">Select Theme</legend>
						<div className={values}>
							{getCollectionProps(fields.theme, {
								type: 'radio',
								options: themes as Writeable<typeof themes>,
								value: true,
							}).map((props) => {
								const { key, ...ps } = props
								assertTheme(props.value)

								return (
									<label key={key}>
										<input {...ps} className="peer sr-only" />
										<span
											className={cx(
												'bg-BCCED9 text-new-value text-FCFCFC transition-colors peer-checked:bg-304859 hocus:bg-6395B8',
												value,
											)}
										>
											{getThemeName(props.value)}
										</span>
									</label>
								)
							})}
						</div>
					</fieldset>
					<fieldset
						className={css`
							margin-top: ${rem(24)};
							@media ${media.tablet} {
								margin-top: ${rem(32)};
							}
						`}
					>
						<legend className="text-new-label">Number of Players</legend>
						<div
							className={cx(
								values,
								css`
									--values-gap: ${rem(10)};
									@media ${media.tablet} {
										--values-gap: ${rem(21)};
									}
								`,
							)}
						>
							{getCollectionProps(fields.players, {
								type: 'radio',
								options: players as Writeable<typeof players>,
								value: true,
							}).map((props) => {
								const { key, ...ps } = props

								return (
									<label key={key}>
										<input {...ps} className="peer sr-only" />
										<span
											className={cx(
												'bg-BCCED9 text-new-value text-FCFCFC transition-colors peer-checked:bg-304859 hocus:bg-6395B8',
												value,
											)}
										>
											{ps.value}
										</span>
									</label>
								)
							})}
						</div>
					</fieldset>
					<fieldset
						className={css`
							margin-top: ${rem(24)};
							@media ${media.tablet} {
								margin-top: ${rem(32)};
							}
						`}
					>
						<legend className="text-new-label">Grid Size</legend>
						<div className={values}>
							{getCollectionProps(fields.grid, {
								type: 'radio',
								options: grids as Writeable<typeof grids>,
								value: true,
							}).map((props) => {
								const { key, ...ps } = props

								return (
									<label key={key}>
										<input {...ps} className="peer sr-only" />
										<span
											className={cx(
												'bg-BCCED9 text-new-value text-FCFCFC transition-colors peer-checked:bg-304859 hocus:bg-6395B8',
												value,
											)}
										>
											{ps.value}
										</span>
									</label>
								)
							})}
						</div>
					</fieldset>
					<button
						className={cx(
							'bg-FDA214 text-new-start text-FCFCFC transition-colors',
							css`
								display: block;
								margin-top: ${rem(32)};
								width: 100%;
								border-radius: 9999px;
								padding: ${rem(13)};
								${hocus} {
									&:focus-visible,
									&:hover {
										background: hsl(37 100% 65%);
									}
								}
								@media ${media.tablet} {
									padding: ${rem(15)};
								}
							`,
						)}
						type="submit"
					>
						Start Game
					</button>
				</form>
			</main>
		)
	} else if (screen.type === 'play') {
		const isSinglePlayer = screen.options && screen.options.players === '1'
		const scores = [4, 4, 2, 0].slice(0, parseInt(screen.options.players))
		const currentPlayer = 1

		function getIsFlipped(x: number, y: number) {
			const tile = tiles[y]![x]!

			return (
				(tile1 !== null && tile1[0] === x && tile1[1] === y) ||
				(tile2 !== null && tile2[0] === x && tile2[1] === y) ||
				solvedTiles[tile.id] !== undefined
			)
		}

		function selectTile(x: number, y: number) {
			if (getIsFlipped(x, y)) {
				return
			}

			setHighlightedTiles(null)
			if (tile1 === null) {
				setTile1([x, y])
			} else if (tile2 === null) {
				const id = tiles[y]![x]!.id
				setTile2([x, y])
				if (tiles[tile1[1]]![tile1[0]]!.id === id) {
					setHighlightedTiles([tile1, [x, y]])
					// todo: Typing
					setSolvedTiles({ ...solvedTiles, [id]: '123' })
				}
			} else {
				setTile1([x, y])
				setTile2(null)
			}
		}

		return (
			<div
				className={css`
					display: grid;
					grid-template-columns: minmax(auto, ${rem(1110)});
					justify-content: center;
					min-height: 100vh;
					padding: ${rem(24)};
					@media ${media.tablet} {
						padding: ${rem(40)};
					}
				`}
			>
				<div
					className={css`
						--layout-gap: 2rem;
						display: grid;
						grid-template-rows: auto 1fr;
						gap: var(--layout-gap);
					`}
				>
					<header
						className={css`
							display: flex;
							justify-content: space-between;
							align-items: center;
							flex-wrap: wrap;
						`}
					>
						<h1 className="text-game-title">memory</h1>
						{tabletMatches ? (
							<ul
								className={css`
									display: flex;
									align-items: center;
									gap: ${rem(16)};
									flex-wrap: wrap;
								`}
								role="list"
							>
								<li>
									<button
										className={cx(
											'bg-FDA214 text-game-option text-FCFCFC transition-colors',
											button,
											css`
												${hocus} {
													background: hsl(37 100% 67%);
												}
											`,
										)}
										type="button"
									>
										Restart
									</button>
								</li>
								<li>
									<button
										className={cx(
											'text-game-option text-304859 transition-colors hocus:bg-6395B8 hocus:text-FCFCFC',
											button,
											css`
												background: hsl(203 25% 90%);
											`,
										)}
										type="button"
										onClick={() => {
											setScreen({ type: 'start-game' })
										}}
									>
										New Game
									</button>
								</li>
							</ul>
						) : (
							<Dialog.Root>
								<Dialog.Trigger className="rounded bg-white text-violet11 shadow-blackA4 hover:bg-mauve3 focus:shadow-black inline-flex h-[35px] items-center justify-center px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:outline-none">
									Menu
								</Dialog.Trigger>
								<Dialog.Portal>
									<Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
									<Dialog.Content className="rounded-md bg-white data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
										<Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
											Menu
										</Dialog.Title>
										<Dialog.Description className="text-mauve11 mb-5 mt-2.5 text-[15px] leading-normal">
											What do you want to do?
										</Dialog.Description>
										<ul role="list">
											<li>
												<button type="button">Restart</button>
											</li>
											<li>
												<button
													type="button"
													onClick={() => {
														setScreen({ type: 'start-game' })
													}}
												>
													New Game
												</button>
											</li>
											<li>
												<Dialog.Close>Resume Game</Dialog.Close>
											</li>
										</ul>
									</Dialog.Content>
								</Dialog.Portal>
							</Dialog.Root>
						)}
					</header>
					<main
						className={css`
							display: grid;
							grid-template-rows: 1fr auto;
							gap: var(--layout-gap);
						`}
					>
						<h2 className="sr-only">Tiles</h2>
						<div
							className={cx(
								css`
									align-self: center;
									display: grid;
									grid-template-columns: minmax(auto, var(--grid-size));
									justify-content: center;
									gap: var(--grid-gap);
								`,
								screen.options.grid === '4x4'
									? css`
											--grid-columns: 4;
											--grid-size: ${rem(532)};
											--grid-gap: ${rem(20)};
										`
									: null,
								screen.options.grid === '6x6'
									? css`
											--grid-columns: 6;
											--grid-size: ${rem(572)};
											--grid-gap: ${rem(16)};
										`
									: null,
							)}
						>
							<div
								className={css`
									display: grid;
									gap: var(--grid-gap);
								`}
								role="grid"
							>
								{tiles.map((row, y) => (
									<div
										className={css`
											display: grid;
											grid-template-columns: repeat(var(--grid-columns), 1fr);
											gap: var(--grid-gap);
										`}
										key={y}
										role="row"
									>
										{row.map((tile, x) => {
											const isFlipped = getIsFlipped(x, y)
											const isHighlighted =
												highlightedTiles !== null &&
												highlightedTiles.find(
													(t) => t[0] === x && t[1] === y,
												) !== undefined

											return (
												<div key={x} role="gridcell">
													<button
														className={cx(
															'group',
															css`
																border-radius: 9999px;
																width: 100%;
															`,
														)}
														type="button"
														onClick={() => {
															selectTile(x, y)
														}}
													>
														<span
															className={cx(
																'transition-transform',
																css`
																	position: relative;
																	display: block;
																	border-radius: inherit;
																	transform-style: preserve-3d;
																`,
																!isFlipped
																	? css`
																			transform: rotateY(0.5turn);
																		`
																	: null,
															)}
														>
															<span
																className={cx(
																	'text-FCFCFC transition-colors',
																	css`
																		display: grid;
																		place-items: center;
																		border-radius: inherit;
																		aspect-ratio: 1;
																		backface-visibility: hidden;
																	`,
																	isHighlighted ? 'bg-FDA214' : 'bg-BCCED9',
																)}
															>
																<span className="sr-only">
																	{isFlipped ? tile.name : <>Tile</>}
																</span>
																{/* todo: Numbers */}
																{/* <span aria-hidden="true">{value}</span> */}
																<FontAwesomeIcon
																	className={css`
																		width: ${(56 / 118) * 100}%;
																		height: auto;
																		aspect-ratio: 1;
																	`}
																	icon={tile.icon}
																/>
															</span>
															<span
																className={cx(
																	'bg-304859 transition-colors group-hocus:bg-6395B8',
																	css`
																		position: absolute;
																		display: block;
																		inset: 0;
																		width: 100%;
																		height: 100%;
																		border-radius: inherit;
																		transform: rotateY(0.5turn);
																		backface-visibility: hidden;
																	`,
																)}
															/>
														</span>
													</button>
												</div>
											)
										})}
									</div>
								))}
							</div>
						</div>
						<Landmark.Root>
							<Landmark.Label>
								<h2 className="sr-only">Score</h2>
							</Landmark.Label>
							{isSinglePlayer ? (
								<div
									className={css`
										display: flex;
										justify-content: center;
										gap: ${rem(25)};
										& > * {
											flex: 0 1 ${rem(255)};
										}
										@media ${media.tablet} {
											gap: ${rem(30)};
										}
									`}
								>
									<div className={meta}>
										<h3 className={metaLabel}>Time</h3>
										<p className={metaValue}>1:53</p>
									</div>
									<div className={meta}>
										<h3 className={metaLabel}>Moves</h3>
										<p className={metaValue}>39</p>
									</div>
								</div>
							) : (
								<ul
									className={css`
										display: flex;
										justify-content: center;
										gap: ${rem(24)};
										& > * {
											flex: 0 1 ${rem(255)};
										}
										@media ${media.tablet} {
											gap: ${rem(11)};
										}
										@media ${media.desktop} {
											gap: ${rem(24)};
										}
									`}
									role="list"
								>
									{scores.map((score, i) => {
										const player = i + 1
										const isCurrentPlayer = currentPlayer === i

										return (
											<li key={i} aria-current={isCurrentPlayer}>
												<div className={meta}>
													<span className={metaLabel}>
														{tabletMatches ? (
															<>Player {player}</>
														) : (
															<>P{player}</>
														)}
														<span className="sr-only">:</span>
													</span>{' '}
													<span className={metaValue}>{score}</span>
												</div>
												{desktopMatches && isCurrentPlayer ? (
													<p
														className={cx(
															'text-game-meta-current',
															css`
																margin-top: ${rem(24)};
																text-align: center;
																text-transform: uppercase;
															`,
														)}
													>
														Current turn
													</p>
												) : null}
											</li>
										)
									})}
								</ul>
							)}
						</Landmark.Root>
					</main>
				</div>
			</div>
		)
	} else {
		throw new Error(`Invalid screen: ${screen}`)
	}
}

export function App() {
	return (
		<AnnouncementProvider>
			<Memory />
		</AnnouncementProvider>
	)
}
