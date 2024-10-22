import { invariant } from '@epic-web/invariant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css, cx } from '@linaria/core'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Dialog from '@radix-ui/react-dialog'
import { useMediaQuery } from '@uidotdev/usehooks'
import {
	createContext,
	type ReactNode,
	type RefObject,
	useContext,
	useId,
	useRef,
	useState,
} from 'react'
import * as Landmark from '#app/components/landmark'
import { type Cursor, useCursor } from '#app/utils/cursor'
import {
	type Theme,
	type Size,
	type NumberId,
	type IconId,
	createTiles,
	iconsData,
} from '#app/utils/memory'
import { media } from '#app/utils/screens'
import { hocus } from '#app/utils/style'
import { areEqual, getCell, type Position, type Table } from '#app/utils/table'

function rem(px: number) {
	return `${px / 16}rem`
}

function percentage(fraction: number) {
	return `${fraction * 100}%`
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

const GameContext = createContext<{
	isFinished: boolean
	size: Size
	tiles: Table<NumberId | IconId>
	cursor: Cursor
	newGame(): void
	restart(): void
	selectTile(position: Position): void
	getIsFlipped(position: Position): boolean
	getIsHighlighted(position: Position): boolean
} | null>(null)

function useGame() {
	const value = useContext(GameContext)
	invariant(value !== null, '`useGame` must be used inside of `GameContext`')

	return value
}

interface GameProps {
	theme: Theme
	size: Size
	children: ReactNode
	onRestart(): void
	onNewGame(): void
	onSelectTile?(
		result:
			| { type: 'flip' }
			| { type: 'move'; success: true; isLast: boolean }
			| { type: 'move'; success: false },
	): void
}

export function Game({
	theme,
	size,
	children,
	onRestart,
	onNewGame,
	onSelectTile,
}: GameProps) {
	// todo: 6x6
	const cursor = useCursor(4, 4)

	// todo: 6x6
	const [tiles, setTiles] = useState(() => createTiles(4, 4, theme))
	const [tile1, setTile1] = useState<Position | null>(null)
	const [tile2, setTile2] = useState<Position | null>(null)
	const [highlightedTiles, setHighlightedTiles] = useState<
		[Position, Position] | null
	>(null)
	const [solvedTiles, setSolvedTiles] = useState<(IconId | number)[]>([])
	const pairsLeft = tiles.flatMap((r) => r).length / 2 - solvedTiles.length
	const resetSelectedTilesTimerRef = useRef<ReturnType<typeof setTimeout>>()

	const isFinished = pairsLeft === 0

	function getIsFlipped(position: Position) {
		const id = getCell(position, tiles)

		return (
			(tile1 !== null && areEqual(position, tile1)) ||
			(tile2 !== null && areEqual(position, tile2)) ||
			solvedTiles.includes(id)
		)
	}

	function getIsHighlighted(position: Position) {
		return (
			highlightedTiles !== null &&
			highlightedTiles.find((t) => areEqual(t, position)) !== undefined
		)
	}

	function selectTile(position: Position) {
		if (getIsFlipped(position)) {
			return
		}

		clearTimeout(resetSelectedTilesTimerRef.current)
		resetSelectedTilesTimerRef.current = undefined

		if (tile1 === null) {
			setTile1(position)
			onSelectTile?.({ type: 'flip' })
		} else if (tile2 === null) {
			const id = getCell(position, tiles)
			setTile2(position)
			if (getCell(tile1, tiles) === id) {
				setSolvedTiles([...solvedTiles, id])
				setHighlightedTiles([tile1, position])
				// The pair just found was the last one
				if (pairsLeft === 1) {
					onSelectTile?.({ type: 'move', success: true, isLast: true })
				} else {
					onSelectTile?.({ type: 'move', success: true, isLast: false })
				}
			} else {
				setHighlightedTiles(null)
				resetSelectedTilesTimerRef.current = setTimeout(() => {
					setTile1(null)
					setTile2(null)
				}, 2000)
				onSelectTile?.({ type: 'move', success: false })
			}
		} else {
			setTile1(position)
			setTile2(null)
			onSelectTile?.({ type: 'flip' })
		}
	}

	function restart() {
		cursor.reset()
		// todo: 6x6
		setTiles(createTiles(4, 4, theme))
		setTile1(null)
		setTile2(null)
		setHighlightedTiles(null)
		setSolvedTiles([])
		clearTimeout(resetSelectedTilesTimerRef.current)
		resetSelectedTilesTimerRef.current = undefined
		onRestart()
	}

	return (
		<GameContext.Provider
			value={{
				isFinished,
				size,
				tiles,
				cursor,
				newGame: onNewGame,
				restart,
				selectTile,
				getIsFlipped,
				getIsHighlighted,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}

export function Header() {
	const game = useGame()
	const tabletMatches = useMediaQuery(media.tablet)

	return (
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
							onClick={() => {
								game.restart()
							}}
						>
							Restart
						</button>
					</li>
					<li>
						<button
							className={cx(headerButton, secondaryButton)}
							type="button"
							onClick={() => {
								game.newGame()
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
										<Dialog.Close
											className={cx(dialogButton, primaryButton)}
											type="button"
											onClick={() => {
												game.restart()
											}}
										>
											Restart
										</Dialog.Close>
									</li>
									<li>
										<button
											className={cx(dialogButton, secondaryButton)}
											type="button"
											onClick={() => {
												game.newGame()
											}}
										>
											New Game
										</button>
									</li>
									<li>
										<Dialog.Close className={cx(dialogButton, secondaryButton)}>
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
	)
}

export function Main({ children }: { children: ReactNode }) {
	return (
		<main
			className={css`
				display: grid;
				grid-template-rows: 1fr auto;
				gap: var(--layout-gap);
			`}
		>
			{children}
		</main>
	)
}

export function Grid() {
	const { size, tiles, cursor, getIsFlipped, getIsHighlighted, selectTile } =
		useGame()
	const gridInstructionsId = useId()

	return (
		<>
			<h2 className="sr-only">Tiles</h2>
			<p className="sr-only" id={gridInstructionsId}>
				Use the arrow keys to browse the tiles.
			</p>
			<div
				className={cx(
					css`
						align-self: center;
						display: grid;
						grid-template-columns: minmax(auto, var(--grid-size));
						justify-content: center;
					`,
					size === '4x4'
						? css`
								--grid-columns: 4;
								--grid-size: ${rem(532)};
								--grid-gap: ${percentage(20 / 532)};
							`
						: null,
					size === '6x6'
						? css`
								--grid-columns: 6;
								--grid-size: ${rem(572)};
								--grid-gap: ${percentage(16 / 572)};
							`
						: null,
				)}
			>
				<div
					{...cursor.gridProps}
					className={css`
						display: grid;
						aspect-ratio: 1;
						align-content: space-between;
					`}
					role="grid"
					aria-describedby={gridInstructionsId}
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
								const position = [x, y] as const
								const isFlipped = getIsFlipped(position)
								const isHighlighted = getIsHighlighted(position)
								const name =
									typeof tile === 'number' ? tile : iconsData[tile].name
								const display =
									typeof tile === 'number' ? (
										<span
											className={cx(
												size === '4x4' ? 'text-game-tile-4x4' : null,
												size === '6x6' ? 'text-game-tile-6x6' : null,
											)}
											aria-hidden="true"
										>
											{tile}
										</span>
									) : (
										<FontAwesomeIcon
											className={css`
												width: ${percentage(56 / 118)};
												height: auto;
												aspect-ratio: 1;
											`}
											icon={iconsData[tile].icon}
										/>
									)

								return (
									<div key={x} role="gridcell">
										<button
											{...cursor.getButtonProps(position)}
											className={cx(
												'group',
												css`
													border-radius: 9999px;
													width: 100%;
												`,
											)}
											type="button"
											onClick={() => {
												selectTile(position)
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
														{isFlipped ? name : <>Tile</>}
													</span>
													{display}
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
		</>
	)
}

export function Score({ children }: { children: ReactNode }) {
	return (
		<Landmark.Root>
			<Landmark.Label>
				<h2 className="sr-only">Score</h2>
			</Landmark.Label>
			{children}
		</Landmark.Root>
	)
}

const GameOverContext = createContext<{
	titleRef: RefObject<HTMLHeadingElement>
	restart(): void
	newGame(): void
} | null>(null)

function useGameOver() {
	const value = useContext(GameOverContext)
	invariant(
		value !== null,
		'`useGameOver` must be used inside of `GameOverContext`',
	)

	return value
}

interface GameOverProps {
	children: ReactNode
}

export function GameOver({ children }: GameOverProps) {
	const { isFinished, newGame, restart } = useGame()
	const titleRef = useRef<HTMLHeadingElement>(null)

	return (
		<GameOverContext.Provider
			value={{
				titleRef,
				restart,
				newGame,
			}}
		>
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
								titleRef.current!.focus()
							}}
						>
							{children}
						</AlertDialog.Content>
					</AlertDialog.Overlay>
				</AlertDialog.Portal>
			</AlertDialog.Root>
		</GameOverContext.Provider>
	)
}

interface GameOverTitleProps {
	children: ReactNode
}

export function GameOverTitle({ children }: GameOverTitleProps) {
	const { titleRef } = useGameOver()

	return (
		<AlertDialog.Title
			className={cx(
				'text-dialog-title text-152938',
				css`
					text-align: center;
				`,
			)}
			ref={titleRef}
			tabIndex={-1}
		>
			{children}
		</AlertDialog.Title>
	)
}

interface GameOverDescriptionProps {
	children: ReactNode
}

export function GameOverDescription({ children }: GameOverDescriptionProps) {
	return (
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
			{children}
		</AlertDialog.Description>
	)
}

export function GameOverOptions() {
	const { restart, newGame } = useGameOver()

	return (
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
				<AlertDialog.Cancel
					className={cx(dialogButton, primaryButton)}
					type="button"
					onClick={() => {
						restart()
					}}
				>
					Restart
				</AlertDialog.Cancel>
			</li>
			<li>
				<button
					className={cx(dialogButton, secondaryButton)}
					type="button"
					onClick={() => {
						newGame()
					}}
				>
					Setup New Game
				</button>
			</li>
		</ul>
	)
}
