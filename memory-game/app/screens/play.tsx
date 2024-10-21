import { css } from '@linaria/core'
import { useMediaQuery } from '@uidotdev/usehooks'
import { cx } from 'class-variance-authority'
import { useState, useRef } from 'react'
import {
	Game,
	GameOverDialog,
	Grid,
	Header,
	Main,
	Score,
} from '#app/components/game'
import { type Players, type Options } from '#app/utils/memory'
import { media } from '#app/utils/screens'

function rem(px: number) {
	return `${px / 16}rem`
}

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
	const isSinglePlayer = options.players === '1'

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
					{isSinglePlayer ? (
						<SinglePlayer size={options.grid} onNewGame={onNewGame} />
					) : (
						<Multiplayer
							players={options.players}
							size={options.grid}
							onNewGame={onNewGame}
						/>
					)}
				</div>
			</div>
		</>
	)
}

interface SinglePlayerProps {
	size: Size
	onNewGame(): void
}

function SinglePlayer({ size, onNewGame }: SinglePlayerProps) {
	const [moves, setMoves] = useState(0)
	const [startTime, setStartTime] = useState<number | null>(null)
	const [now, setNow] = useState<number | null>(null)
	const elapsedTimerRef = useRef<ReturnType<typeof setInterval>>()
	const elapsedTime = startTime === null || now === null ? 0 : now - startTime
	const elapsedSeconds = elapsedTime / 1000
	const time = `${Math.floor(elapsedSeconds / 60)}:${Math.floor(
		elapsedSeconds % 60,
	)
		.toString()
		.padStart(2, '0')}`

	return (
		<Game
			size={size}
			onNewGame={onNewGame}
			onStart={() => {
				const now = Date.now()
				setStartTime(now)
				setNow(now)
				elapsedTimerRef.current = setInterval(() => {
					setNow(Date.now())
				}, 1000)
			}}
			onMove={() => {
				setMoves(moves + 1)
			}}
			onEnd={() => {
				clearInterval(elapsedTimerRef.current)
			}}
		>
			<Header />
			<Main>
				<Grid />
				<Score>
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
							<p className={metaValue}>{time}</p>
						</div>
						<div className={meta}>
							<h3 className={metaLabel}>Moves</h3>
							<p className={metaValue}>{moves}</p>
						</div>
					</div>
				</Score>
			</Main>
			<GameOverDialog time={time} moves={moves} />
		</Game>
	)
}

interface MultiplayerProps {
	players: Players
	size: Size
	onNewGame(): void
}

function Multiplayer({ players, size, onNewGame }: MultiplayerProps) {
	const tabletMatches = useMediaQuery(media.tablet)
	const desktopMatches = useMediaQuery(media.desktop)

	const [currentPlayer, setCurrentPlayer] = useState<number>(0)
	const playerCount = parseInt(players, 10)

	// todo: Track somehow
	const solvedTiles = {}

	return (
		<Game
			size={size}
			onNewGame={onNewGame}
			onMove={() => {
				setCurrentPlayer((currentPlayer + 1) % playerCount)
			}}
		>
			<Header />
			<Main>
				<Grid />
				<Score>
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
									<li className="group" key={i} aria-current={isCurrentPlayer}>
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
												{tabletMatches ? <>Player {player}</> : <>P{player}</>}
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
				</Score>
			</Main>
			<GameOverDialog time="N/A" moves={0} />
		</Game>
	)
}

type Size = '4x4' | '6x6'
