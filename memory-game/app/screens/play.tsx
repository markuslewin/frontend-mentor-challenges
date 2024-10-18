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

interface PlayProps {
	options: Options
	onNewGame(): void
}

export function Play({ options, onNewGame }: PlayProps) {
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
										onNewGame()
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
													onNewGame()
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
	)
}
