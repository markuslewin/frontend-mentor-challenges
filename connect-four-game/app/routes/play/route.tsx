import { invariant } from '@epic-web/invariant'
import * as Dialog from '@radix-ui/react-dialog'
import { useLocalStorage } from '@uidotdev/usehooks'
import { produce } from 'immer'
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
} from '#app/routes/play/styles.css'
import { srOnly } from '#app/styles.css'
import { media } from '#app/utils/screens'
import { colors } from '#app/utils/style'

export function PlayRoute() {
	const [state, setState] = useLocalStorage('state', {
		starter: 'red',
		counters: createBoard(),
	} satisfies {
		starter: Color
		counters: Counter[][]
	})

	const currentColor: Color =
		state.counters.flatMap((r) => r).filter((c) => c !== 'empty').length % 2 ===
		0
			? state.starter
			: getOtherColor(state.starter)

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
								<Dialog.Root>
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
																console.log('todo: Restart game')
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
																console.log('todo: Quit game')
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
										console.log('todo: Restart game')
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
							<div />
							<div />
							<div />
							<Img
								key={currentColor}
								className={marker}
								alt=""
								src={
									(
										{
											red: markerRed,
											yellow: markerYellow,
										} satisfies Record<Color, string>
									)[currentColor]
								}
								priority
								width="38"
								height="36"
							/>
							<div />
							<div />
							<div />
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
							<p className={score}>12</p>
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
							<p className={score}>23</p>
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
									{state.counters.flatMap((row, y) =>
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
									{state.counters.map((row, y) => (
										<div className={counterButtonsRow} key={y} role="row">
											{row.map((counter, x) => (
												<div
													className={counterButtonsCell}
													key={x}
													role="gridcell"
												>
													<button
														className={counterButton}
														key={`${y}-${x}`}
														type="button"
														aria-disabled={counter !== 'empty'}
														onClick={() => {
															if (counter !== 'empty') {
																return
															}
															setState(
																produce((draft) => {
																	const row = draft.counters[y]
																	invariant(
																		row !== undefined,
																		`Invalid row number ${y}`,
																	)
																	invariant(
																		row[x] !== undefined,
																		`Invalid column number ${x}`,
																	)
																	row[x] = currentColor
																}),
															)
														}}
													>
														{
															(
																{
																	empty: 'Empty',
																	red: 'Red',
																	yellow: 'Yellow',
																} satisfies Record<Counter, string>
															)[counter]
														}
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
				<div className={backgroundLight}>
					<h3 className={srOnly}>Turn</h3>
					<div
						className={turn}
						style={{
							color: (
								{ red: colors.white, yellow: colors.black } satisfies Record<
									Color,
									string
								>
							)[currentColor],
						}}
					>
						<Img
							className={turnBackground}
							key={currentColor}
							alt=""
							src={
								(
									{
										red: turnBackgroundRed,
										yellow: turnBackgroundYellow,
									} satisfies Record<Color, string>
								)[currentColor]
							}
							priority
							width="197"
							height="165"
						/>
						<div className={turnText}>
							<p className={turnPlayer}>
								{
									(
										{ red: 'Player 1', yellow: 'Player 2' } satisfies Record<
											Color,
											string
										>
									)[currentColor]
								}
								’s turn
							</p>
							<p className={turnTimer}>15s</p>
						</div>
					</div>
					<div className={bottomSpacer} />
				</div>
			</main>
		</div>
	)
}

type Color = 'red' | 'yellow'
type Counter = Color | 'empty'

function createBoard() {
	return Array<Counter[]>(6).fill(Array<Counter>(7).fill('empty'))
}

function getOtherColor(color: Color): Color {
	return (
		{
			red: 'yellow',
			yellow: 'red',
		} satisfies Record<Color, Color>
	)[color]
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
