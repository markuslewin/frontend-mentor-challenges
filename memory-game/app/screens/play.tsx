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
import { css } from '@linaria/core'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Dialog from '@radix-ui/react-dialog'
import { useMediaQuery } from '@uidotdev/usehooks'
import { cx } from 'class-variance-authority'
import { useState, useRef } from 'react'
import * as Landmark from '#app/components/landmark'
import { useCursor } from '#app/utils/cursor'
import { type Options } from '#app/utils/memory'
import { media } from '#app/utils/screens'
import { hocus } from '#app/utils/style'
import { areEqual, getCell, type Position, type Table } from '#app/utils/table'

const icons = {
	'futbol-ball': { name: 'Futbol ball', icon: faFutbolBall },
	anchor: { name: 'Anchor', icon: faAnchor },
	flask: { name: 'Flask', icon: faFlask },
	sun: { name: 'Sun', icon: faSun },
	moon: { name: 'Moon', icon: faMoon },
	snowflake: { name: 'Snowflake', icon: faSnowflake },
	'hand-spock': { name: 'Spock hand', icon: faHandSpock },
	bug: { name: 'Bug', icon: faBug },
	// faCar,
	// faLiraSign,
}

type IconId = keyof typeof icons

const tiles = [
	['futbol-ball', 'anchor', 'flask', 'sun'],
	['moon', 'snowflake', 'hand-spock', 'bug'],
	['futbol-ball', 'anchor', 'flask', 'sun'],
	['moon', 'snowflake', 'hand-spock', 'bug'],
] satisfies Table<IconId>

function rem(px: number) {
	return `${px / 16}rem`
}

const button = css`
	border-radius: 9999px;
	white-space: nowrap;
`

const primaryButton = cx(
	'bg-FDA214 text-FCFCFC transition-colors',
	css`
		${hocus} {
			background: hsl(37 100% 67%);
		}
	`,
)

const secondaryButton = cx(
	'text-304859 transition-colors hocus:bg-6395B8 hocus:text-FCFCFC',
	css`
		background: hsl(203 25% 90%);
	`,
)

const headerButton = cx(
	'text-game-option',
	button,
	css`
		height: ${rem(40)};
		padding-inline: ${rem(24)};
		@media ${media.tablet} {
			height: ${rem(52)};
		}
	`,
)

const dialogButton = cx(
	'text-dialog-button',
	button,
	css`
		height: ${rem(48)};
		@media ${media.tablet} {
			height: ${rem(52)};
		}
	`,
)

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

const dialogOverlay = css`
	position: fixed;
	inset: 0;
	overflow-y: auto;
	padding: ${rem(24)};
	display: grid;
	grid-template-columns: minmax(auto, ${rem(654)});
	justify-content: center;
	align-items: center;
	background: hsl(0 0% 0% / 0.5);
`

const stat = cx(
	'text-304859',
	css`
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: ${rem(48)};
		border-radius: ${rem(5)};
		padding-inline: ${rem(16)};
		background: hsl(203 25% 90%);
		@media ${media.tablet} {
			height: ${rem(72)};
			border-radius: ${rem(10)};
			padding-inline: ${rem(32)};
		}
	`,
)

const statLabel = cx('text-dialog-label text-7191A5')

interface PlayProps {
	options: Options
	onNewGame(): void
}

export function Play({ options, onNewGame }: PlayProps) {
	const finishDialogTitleRef = useRef<HTMLHeadingElement>(null)

	const tabletMatches = useMediaQuery(media.tablet)
	const desktopMatches = useMediaQuery(media.desktop)

	// todo: 6x6
	const cursor = useCursor(4, 4)
	const [tile1, setTile1] = useState<Position | null>(null)
	const [tile2, setTile2] = useState<Position | null>(null)
	const [highlightedTiles, setHighlightedTiles] = useState<
		[Position, Position] | null
	>(null)
	const [solvedTiles, setSolvedTiles] = useState<
		Partial<Record<IconId, number>>
	>({})
	const [currentPlayer, setCurrentPlayer] = useState<number>(0)
	const resetSelectedTilesTimerRef = useRef<ReturnType<typeof setTimeout>>()

	const isSinglePlayer = options && options.players === '1'
	const isFinished =
		Object.keys(solvedTiles).length === tiles.flatMap((r) => r).length / 2
	const playerCount = parseInt(options.players, 10)

	const onMove = isSinglePlayer
		? () => {
				console.log('todo: Increment move count')
			}
		: () => {
				setCurrentPlayer((currentPlayer + 1) % playerCount)
			}

	function getIsFlipped(position: Position) {
		const id = getCell(position, tiles)

		return (
			(tile1 !== null && areEqual(position, tile1)) ||
			(tile2 !== null && areEqual(position, tile2)) ||
			solvedTiles[id] !== undefined
		)
	}

	function selectTile(x: number, y: number) {
		if (getIsFlipped([x, y])) {
			return
		}

		clearTimeout(resetSelectedTilesTimerRef.current)
		setHighlightedTiles(null)

		if (tile1 === null) {
			setTile1([x, y])
		} else if (tile2 === null) {
			const id = getCell([x, y], tiles)
			setTile2([x, y])
			if (getCell(tile1, tiles) === id) {
				setHighlightedTiles([tile1, [x, y]])
				// TS doesn't check computed properties?
				// https://github.com/microsoft/TypeScript/issues/36920
				setSolvedTiles({
					...solvedTiles,
					[id]: currentPlayer satisfies (typeof solvedTiles)[keyof typeof solvedTiles],
				})
			} else {
				resetSelectedTilesTimerRef.current = setTimeout(() => {
					setTile1(null)
					setTile2(null)
				}, 2000)
			}
			onMove()
		} else {
			setTile1([x, y])
			setTile2(null)
		}
	}

	return (
		<>
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
										className={cx(headerButton, primaryButton)}
										type="button"
									>
										Restart
									</button>
								</li>
								<li>
									<button
										className={cx(headerButton, secondaryButton)}
										type="button"
										onClick={() => {
											onNewGame()
										}}
									>
										New Game
									</button>
								</li>
							</ul>
						) : (
							<Dialog.Root>
								<Dialog.Trigger
									className={cx(
										'text-game-option',
										button,
										primaryButton,
										css`
											padding: ${rem(10)} ${rem(19)};
										`,
									)}
								>
									Menu
								</Dialog.Trigger>
								<Dialog.Portal>
									<Dialog.Overlay className={dialogOverlay}>
										<Dialog.Content
											className={cx(
												'bg-F2F2F2 text-7191A5',
												css`
													border-radius: ${rem(10)};
													padding: ${rem(24)};
												`,
											)}
										>
											<Dialog.Title className="sr-only">Menu</Dialog.Title>
											<Dialog.Description className="sr-only">
												What do you want to do?
											</Dialog.Description>
											<ul
												className={css`
													display: grid;
													gap: ${rem(16)};
													& > * {
														display: grid;
													}
												`}
												role="list"
											>
												<li>
													<button
														className={cx(dialogButton, primaryButton)}
														type="button"
													>
														Restart
													</button>
												</li>
												<li>
													<button
														className={cx(dialogButton, secondaryButton)}
														type="button"
														onClick={() => {
															onNewGame()
														}}
													>
														New Game
													</button>
												</li>
												<li>
													<Dialog.Close
														className={cx(dialogButton, secondaryButton)}
													>
														Resume Game
													</Dialog.Close>
												</li>
											</ul>
										</Dialog.Content>
									</Dialog.Overlay>
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
								options.grid === '4x4'
									? css`
											--grid-columns: 4;
											--grid-size: ${rem(532)};
											--grid-gap: ${rem(20)};
										`
									: null,
								options.grid === '6x6'
									? css`
											--grid-columns: 6;
											--grid-size: ${rem(572)};
											--grid-gap: ${rem(16)};
										`
									: null,
							)}
						>
							<div
								{...cursor.gridProps}
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
											const isFlipped = getIsFlipped([x, y])
											const isHighlighted =
												highlightedTiles !== null &&
												highlightedTiles.find((t) => areEqual(t, [x, y])) !==
													undefined

											return (
												<div key={x} role="gridcell">
													<button
														{...cursor.getButtonProps([x, y])}
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
																	{isFlipped ? icons[tile].name : <>Tile</>}
																</span>
																{/* todo: Numbers */}
																{/* <span aria-hidden="true">{value}</span> */}
																<FontAwesomeIcon
																	className={css`
																		width: ${(56 / 118) * 100}%;
																		height: auto;
																		aspect-ratio: 1;
																	`}
																	icon={icons[tile].icon}
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
									{Array(playerCount)
										.fill(null)
										.map((_, i) => {
											const player = i + 1
											const isCurrentPlayer = currentPlayer === i
											const score = Object.values(solvedTiles).filter(
												(p) => p === i,
											).length

											return (
												<li
													className="group"
													key={i}
													aria-current={isCurrentPlayer}
												>
													<div
														className={cx(
															'transition-colors group-aria-[current="true"]:bg-FDA214',
															meta,
														)}
													>
														<span
															className={cx(
																'group-aria-[current="true"]:text-FCFCFC',
																metaLabel,
															)}
														>
															{tabletMatches ? (
																<>Player {player}</>
															) : (
																<>P{player}</>
															)}
															<span className="sr-only">:</span>
														</span>{' '}
														<span
															className={cx(
																'group-aria-[current="true"]:text-FCFCFC',
																metaValue,
															)}
														>
															{score}
														</span>
													</div>
													{desktopMatches ? (
														<p
															className={cx(
																'text-game-meta-current transition-opacity',
																css`
																	margin-top: ${rem(24)};
																	text-align: center;
																	text-transform: uppercase;
																`,
																isCurrentPlayer
																	? css`
																			opacity: 1;
																		`
																	: css`
																			opacity: 0;
																		`,
															)}
															aria-hidden={!isCurrentPlayer}
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
			<AlertDialog.Root open={isFinished}>
				<AlertDialog.Portal>
					<AlertDialog.Overlay className={dialogOverlay}>
						<AlertDialog.Content
							className={cx(
								'bg-F2F2F2 text-7191A5',
								css`
									border-radius: ${rem(10)};
									padding: ${rem(24)};
									padding-top: ${rem(32)};
									@media ${media.tablet} {
										border-radius: ${rem(20)};
										padding-top: ${rem(51)};
										padding-inline: ${rem(56)};
										padding-bottom: ${rem(69)};
									}
								`,
							)}
							onOpenAutoFocus={(e) => {
								// We don't have any good buttons to focus
								e.preventDefault()
								finishDialogTitleRef.current!.focus()
							}}
						>
							<AlertDialog.Title
								className={cx(
									'text-dialog-title text-152938',
									css`
										text-align: center;
									`,
								)}
								ref={finishDialogTitleRef}
								tabIndex={-1}
							>
								You did it!
							</AlertDialog.Title>
							<AlertDialog.Description
								className={cx(
									'text-dialog-body',
									css`
										margin-top: ${rem(9)};
										text-align: center;
										@media ${media.tablet} {
											margin-top: ${rem(16)};
										}
									`,
								)}
							>
								Game over! Here’s how you got on…
							</AlertDialog.Description>
							<ul
								className={css`
									margin-top: ${rem(24)};
									display: grid;
									gap: ${rem(8)};
									@media ${media.tablet} {
										margin-top: ${rem(40)};
										gap: ${rem(16)};
									}
								`}
								role="list"
							>
								<li className={stat}>
									<span className={statLabel}>
										Time Elapsed<span className="sr-only">:</span>{' '}
									</span>{' '}
									<span className="text-dialog-value">1:53</span>
								</li>
								<li className={stat}>
									<span className={statLabel}>
										Moves Taken<span className="sr-only">:</span>{' '}
									</span>{' '}
									<span className="text-dialog-value">39 Moves</span>
								</li>
							</ul>
							<ul
								className={css`
									margin-top: ${rem(24)};
									display: flex;
									flex-direction: column;
									gap: ${rem(16)};
									& > * {
										flex: 1 0 0;
										display: grid;
									}
									@media ${media.tablet} {
										margin-top: ${rem(40)};
										flex-direction: row;
										gap: ${rem(14)};
									}
								`}
								role="list"
							>
								<li>
									<button
										className={cx(dialogButton, primaryButton)}
										type="button"
									>
										Restart
									</button>
								</li>
								<li>
									<button
										className={cx(dialogButton, secondaryButton)}
										type="button"
										onClick={() => {
											onNewGame()
										}}
									>
										Setup New Game
									</button>
								</li>
							</ul>
						</AlertDialog.Content>
					</AlertDialog.Overlay>
				</AlertDialog.Portal>
			</AlertDialog.Root>
		</>
	)
}
