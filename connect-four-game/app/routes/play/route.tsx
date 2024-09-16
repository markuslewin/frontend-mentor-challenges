import * as Dialog from '@radix-ui/react-dialog'
import boardLayerBlackLarge from '#app/assets/board-layer-black-large.svg'
import boardLayerBlackSmall from '#app/assets/board-layer-black-small.svg'
import boardLayerWhiteLarge from '#app/assets/board-layer-white-large.svg'
import boardLayerWhiteSmall from '#app/assets/board-layer-white-small.svg'
// import counterRedLarge from '#app/assets/counter-red-large.svg'
// import counterRedSmall from '#app/assets/counter-red-small.svg'
// import counterYellowLarge from '#app/assets/counter-yellow-large.svg'
// import counterYellowSmall from '#app/assets/counter-yellow-small.svg'
import logoUrl from '#app/assets/logo.svg'
// import markerRed from '#app/assets/marker-red.svg'
// import markerYellow from '#app/assets/marker-yellow.svg'
import playerOneUrl from '#app/assets/player-one.svg'
import playerTwoUrl from '#app/assets/player-two.svg'
import turnBackgroundRed from '#app/assets/turn-background-red.svg'
// import turnBackgroundYellow from '#app/assets/turn-background-yellow.svg'
import * as Landmark from '#app/components/landmark'
import { Img, Picture, Source } from '#app/components/picture'
import {
	board,
	boardBack,
	boardContainer,
	boardFront,
	button,
	center,
	// counter,
	gameLayout,
	headerGrid,
	headerLayout,
	headerRightSide,
	headerSide,
	logo,
	logoContainer,
	// marker,
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
} from '#app/routes/play/styles.css'
import { srOnly } from '#app/styles.css'
import { media } from '#app/utils/screens'

export function PlayRoute() {
	return (
		<>
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
										<Dialog.Overlay className="fixed inset-0 overflow-y-auto">
											<Dialog.Content>
												<Dialog.Title>Pause</Dialog.Title>
												<Dialog.Description>
													What do you want to do?
												</Dialog.Description>
												<ul role="list">
													<li>
														<Dialog.Close>Continue game</Dialog.Close>
													</li>
													<li>
														<button
															type="button"
															onClick={() => {
																console.log('todo: Restart game')
															}}
														>
															Restart
														</button>
													</li>
													<li>
														<button
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
			<main>
				<div className={center}>
					<div className={gameLayout}>
						<h2 className={srOnly}>Score</h2>
						<div className={playerOneCard}>
							<h3 className={playerName}>Player 1</h3>
							<Img
								className={playerOneAvatar}
								alt=""
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
								alt=""
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
								{/* <p>
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
								</p>
								<p>
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
								</p>
								<Img
									className={marker}
									alt=""
									src={markerRed}
									priority
									width="38"
									height="36"
								/>
								<Img
									className={marker}
									alt=""
									src={markerYellow}
									priority
									width="38"
									height="36"
								/> */}
							</div>
						</Landmark.Root>
					</div>
				</div>
				<div className={backgroundLight}>
					<h3 className={srOnly}>Turn</h3>
					<div className={turn}>
						<Img
							className={turnBackground}
							alt=""
							src={turnBackgroundRed}
							priority
							width="197"
							height="165"
						/>
						{/* <Img
									className={turnBackground}
									alt=""
									src={turnBackgroundYellow}
									priority
									width="197"
									height="165"
									/> */}
						<div className={turnText}>
							<p className={turnPlayer}>Player 1’s turn</p>
							<p className={turnTimer}>15s</p>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
