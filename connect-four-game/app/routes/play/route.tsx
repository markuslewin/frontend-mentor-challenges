import { invariant } from '@epic-web/invariant'
import * as Dialog from '@radix-ui/react-dialog'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Fragment, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import boardLayerBlackLarge from '#app/assets/board-layer-black-large.svg'
import boardLayerBlackSmall from '#app/assets/board-layer-black-small.svg'
import boardLayerWhiteLarge from '#app/assets/board-layer-white-large.svg'
import boardLayerWhiteSmall from '#app/assets/board-layer-white-small.svg'
import counterRedLarge from '#app/assets/counter-red-large.svg'
import counterRedSmall from '#app/assets/counter-red-small.svg'
import counterYellowLarge from '#app/assets/counter-yellow-large.svg'
import counterYellowSmall from '#app/assets/counter-yellow-small.svg'
import logoUrl from '#app/assets/logo.svg'
import markerRed from '#app/assets/marker-red.svg'
import markerYellow from '#app/assets/marker-yellow.svg'
import playerOneUrl from '#app/assets/player-one.svg'
import playerTwoUrl from '#app/assets/player-two.svg'
import turnBackgroundRed from '#app/assets/turn-background-red.svg'
import turnBackgroundYellow from '#app/assets/turn-background-yellow.svg'
import * as Landmark from '#app/components/landmark'
import { Img, Picture, Source } from '#app/components/picture'
import {
	board,
	boardBack,
	boardContainer,
	boardFront,
	button,
	center,
	counter,
	gameLayout,
	headerGrid,
	headerLayout,
	headerRightSide,
	headerSide,
	logo,
	logoContainer,
	marker,
	playerName,
	playerOneCard,
	playerTwoCard,
	score,
	turnTimer,
	turnPlayer,
	turnBackground,
	turn,
	turnText,
	backgroundLight,
	playerOneAvatar,
	playerTwoAvatar,
	counters,
	dialogOverlay,
	dialogContent,
	dialogTitle,
	dialogOptions,
	dialogOption,
	whiteDialogButton,
	redDialogButton,
	markerTrack,
	markerSlots,
	bottomSpacer,
	middleSpacer,
	main,
	topSpacer,
	screenContainer,
	counterButtons,
	counterButton,
	counterButtonsRow,
	counterButtonsCell,
	winningColor,
	winner,
	winnerWins,
	winnerPlayer,
	winningCircle,
} from '#app/routes/play/styles.css'
import { srOnly } from '#app/styles.css'
import {
	type Status,
	type Color,
	type Counter,
	createTable,
	columns,
	rows,
	useConnectFour,
} from '#app/utils/connect-four'
import { media } from '#app/utils/screens'
import { colors } from '#app/utils/style'

export function PlayRoute() {
	const navigate = useNavigate()
	const connectFour = useConnectFour()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const counterButtonsRef = useRef<(HTMLButtonElement | null)[][]>(
		createTable(null),
	)
	const [cursor, setCursor] = useState<[number, number]>([0, 0])
	const [markerCol, setMarkerCol] = useState(cursor[0])
	const winningCounterDesc = useId()

	return (
		<div className={screenContainer}>
			<div className={topSpacer} />
			<header>
				<div className={center}>
					<div className={headerGrid}>
						<div className={headerLayout}>
							<h1 className={logoContainer}>
								<Img
									className={logo}
									alt="Connect Four"
									src={logoUrl}
									priority
									width="58"
									height="61"
								/>
							</h1>
							<p className={headerSide}>
								<Dialog.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
									<Dialog.Trigger className={button}>Menu</Dialog.Trigger>
									<Dialog.Portal>
										<Dialog.Overlay className={dialogOverlay}>
											<Dialog.Content className={dialogContent}>
												<Dialog.Title className={dialogTitle}>
													Pause
												</Dialog.Title>
												<Dialog.Description className={srOnly}>
													What do you want to do?
												</Dialog.Description>
												<ul className={dialogOptions} role="list">
													<li className={dialogOption}>
														<Dialog.Close className={whiteDialogButton}>
															Continue game
														</Dialog.Close>
													</li>
													<li className={dialogOption}>
														<button
															className={whiteDialogButton}
															type="button"
															onClick={() => {
																connectFour.newGame()
																setIsMenuOpen(false)
															}}
														>
															Restart
														</button>
													</li>
													<li className={dialogOption}>
														<button
															className={redDialogButton}
															type="button"
															onClick={() => {
																navigate('/')
																connectFour.newGame()
															}}
														>
															Quit game
														</button>
													</li>
												</ul>
											</Dialog.Content>
										</Dialog.Overlay>
									</Dialog.Portal>
								</Dialog.Root>
							</p>
							<p className={headerRightSide}>
								<button
									className={button}
									type="button"
									onClick={() => {
										connectFour.newGame()
									}}
								>
									Restart
								</button>
							</p>
						</div>
					</div>
				</div>
			</header>
			<div className={middleSpacer} />
			<main className={main}>
				<div className={center}>
					<div className={markerTrack}>
						<div className={markerSlots}>
							{Array(columns)
								.fill(null)
								.map((_, i) => (
									<Fragment key={i}>
										{i === markerCol ? (
											<Img
												key={connectFour.currentColor}
												className={marker}
												alt=""
												src={
													(
														{
															red: markerRed,
															yellow: markerYellow,
														} satisfies Record<Color, string>
													)[connectFour.currentColor]
												}
												priority
												width="38"
												height="36"
											/>
										) : (
											<div />
										)}
									</Fragment>
								))}
						</div>
					</div>
					<div className={gameLayout}>
						<h2 className={srOnly}>Score</h2>
						<div className={playerOneCard}>
							<h3 className={playerName}>Player 1</h3>
							<Img
								className={playerOneAvatar}
								alt="Player 1 is red"
								src={playerOneUrl}
								priority
								width="54"
								height="59"
							/>
							<p className={score} data-testid="score-red">
								{connectFour.score.red}
							</p>
						</div>
						<div className={playerTwoCard}>
							<h3 className={playerName}>Player 2</h3>
							<Img
								className={playerTwoAvatar}
								alt="Player 2 is yellow"
								src={playerTwoUrl}
								priority
								width="54"
								height="59"
							/>
							<p className={score} data-testid="score-yellow">
								{connectFour.score.yellow}
							</p>
						</div>
						<Landmark.Root className={boardContainer}>
							<Landmark.Label>
								<h2 className={srOnly}>Game</h2>
							</Landmark.Label>
							<div className={board}>
								<Picture>
									<Source
										media={media.tablet}
										srcSet={boardLayerBlackLarge}
										width="632"
										height="594"
									/>
									<Img
										className={boardBack}
										alt=""
										src={boardLayerBlackSmall}
										priority
										width="335"
										height="320"
									/>
								</Picture>
								<div className={counters}>
									{connectFour.counters.flatMap((row, y) =>
										row.map((counter, x) => (
											<Counter key={`${y}-${x}`} value={counter} />
										)),
									)}
								</div>
								<Picture>
									<Source
										media={media.tablet}
										srcSet={boardLayerWhiteLarge}
										width="632"
										height="584"
									/>
									<Img
										className={boardFront}
										alt=""
										src={boardLayerWhiteSmall}
										priority
										width="335"
										height="310"
									/>
								</Picture>
								<div className={counterButtons} role="grid">
									{connectFour.counters.map((row, y) => (
										<div className={counterButtonsRow} key={y} role="row">
											{row.map((counter, x) => (
												<div
													className={counterButtonsCell}
													key={x}
													role="gridcell"
												>
													<button
														className={counterButton}
														ref={(node) => {
															counterButtonsRef.current[y]![x] = node
														}}
														type="button"
														tabIndex={
															cursor[0] === x && cursor[1] === y ? 0 : -1
														}
														aria-disabled={!connectFour.canMakeMove(x)}
														aria-describedby={
															connectFour.isWinningCounter(x, y)
																? winningCounterDesc
																: undefined
														}
														data-testid={`${x},${y}`}
														onClick={() => {
															connectFour.selectColumn(x)
														}}
														onMouseEnter={() => {
															setMarkerCol(x)
														}}
														onKeyDown={(e) => {
															const [cursorX, cursorY] = cursor
															if (e.key === 'ArrowUp') {
																const nextY = Math.max(0, cursorY - 1)
																setCursor([cursorX, nextY])
																setMarkerCol(cursorX)
																const nextButton =
																	counterButtonsRef.current[nextY]?.[cursorX]
																invariant(nextButton, 'Expected button')
																nextButton.focus()
															} else if (e.key === 'ArrowRight') {
																const nextX = Math.min(columns - 1, cursorX + 1)
																setCursor([nextX, cursorY])
																setMarkerCol(nextX)
																const nextButton =
																	counterButtonsRef.current[cursorY]?.[nextX]
																invariant(nextButton, 'Expected button')
																nextButton.focus()
															} else if (e.key === 'ArrowDown') {
																const nextY = Math.min(rows - 1, cursorY + 1)
																setCursor([cursorX, nextY])
																setMarkerCol(cursorX)
																const nextButton =
																	counterButtonsRef.current[nextY]?.[cursorX]
																invariant(nextButton, 'Expected button')
																nextButton.focus()
															} else if (e.key === 'ArrowLeft') {
																const nextX = Math.max(0, cursorX - 1)
																setCursor([nextX, cursorY])
																setMarkerCol(nextX)
																const nextButton =
																	counterButtonsRef.current[cursorY]?.[nextX]
																invariant(nextButton, 'Expected button')
																nextButton.focus()
															}
														}}
													>
														<span className={srOnly}>
															{
																(
																	{
																		empty: 'Empty',
																		red: 'Red',
																		yellow: 'Yellow',
																	} satisfies Record<Counter, string>
																)[counter]
															}
														</span>
														{connectFour.isWinningCounter(x, y) ? (
															<span className={winningCircle} />
														) : null}
													</button>
												</div>
											))}
										</div>
									))}
								</div>
							</div>
						</Landmark.Root>
					</div>
				</div>
				<div
					className={backgroundLight}
					style={assignInlineVars({
						[winningColor]:
							connectFour.status.type === 'win'
								? getColor(connectFour.status.winner)
								: undefined,
					})}
				>
					<div className={center}>
						<div>
							<h3 className={srOnly}>Turn</h3>
							{connectFour.status.type === 'ongoing' ? (
								<div
									className={turn}
									style={{
										color: (
											{
												red: colors.white,
												yellow: colors.black,
											} satisfies Record<Color, string>
										)[connectFour.currentColor],
									}}
								>
									<Img
										className={turnBackground}
										key={connectFour.currentColor}
										alt=""
										src={
											(
												{
													red: turnBackgroundRed,
													yellow: turnBackgroundYellow,
												} satisfies Record<Color, string>
											)[connectFour.currentColor]
										}
										priority
										width="197"
										height="165"
									/>
									<div className={turnText}>
										<p className={turnPlayer} data-testid="turn">
											{
												(
													{
														red: 'Player 1',
														yellow: 'Player 2',
													} satisfies Record<Color, string>
												)[connectFour.currentColor]
											}
											’s turn
										</p>
										<p className={turnTimer} data-testid="timer">
											{Math.ceil(connectFour.timeLeft / 1000)}s
										</p>
									</div>
								</div>
							) : (
								<div className={winner}>
									<Outcome status={connectFour.status} />
									<p>
										<button
											className={button}
											type="button"
											onClick={() => {
												connectFour.playAgain()
												setCursor([0, 0])
												const firstCell = counterButtonsRef.current[0]?.[0]
												invariant(firstCell, 'Expected counter button')
												firstCell.focus()
											}}
										>
											Play again
										</button>
									</p>
								</div>
							)}
						</div>
					</div>
					<div className={bottomSpacer} />
					{connectFour.status.type === 'win' ? (
						<p className={srOnly} id={winningCounterDesc}>
							Winning counter
						</p>
					) : null}
				</div>
			</main>
		</div>
	)
}

interface OutcomeProps {
	status: Status
}

function Outcome({ status }: OutcomeProps) {
	if (status.type === 'draw') {
		return (
			<p data-testid="outcome">
				<span className={winnerPlayer}>It's a </span>
				<span className={winnerWins}>draw</span>
			</p>
		)
	} else if (status.type === 'win') {
		return (
			<p data-testid="outcome">
				<span className={winnerPlayer}>{getName(status.winner)} </span>
				<span className={winnerWins}>wins</span>
			</p>
		)
	} else {
		throw new Error(`Invalid type: ${status.type}`)
	}
}

function getColor(color: Color) {
	return (
		{
			red: colors.red,
			yellow: colors.yellow,
		} satisfies Record<Color, string>
	)[color]
}

function getName(color: Color) {
	if (color === 'red') {
		return 'Player 1'
	} else if (color === 'yellow') {
		return 'Player 2'
	} else {
		throw new Error(`Invalid color: ${color}`)
	}
}

interface CounterProps {
	value: Counter
}

function Counter({ value }: CounterProps) {
	return (
		{
			empty: <div />,
			red: (
				<Picture>
					<Source
						media={media.tablet}
						srcSet={counterRedLarge}
						width="70"
						height="75"
					/>
					<Img
						className={counter}
						alt="Red"
						src={counterRedSmall}
						priority
						width="41"
						height="46"
					/>
				</Picture>
			),
			yellow: (
				<Picture>
					<Source
						media={media.tablet}
						srcSet={counterYellowLarge}
						width="70"
						height="75"
					/>
					<Img
						className={counter}
						alt="Yellow"
						src={counterYellowSmall}
						priority
						width="41"
						height="46"
					/>
				</Picture>
			),
		} satisfies Record<Counter, JSX.Element>
	)[value]
}