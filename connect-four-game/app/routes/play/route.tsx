import * as Dialog from '@radix-ui/react-dialog'
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
import { media } from '#app/utils/screens'

export function PlayRoute() {
	return (
		<>
			<header>
				<h1>
					<Img
						alt="Connect Four"
						src={logoUrl}
						priority
						width="58"
						height="61"
					/>
				</h1>
				<p>
					<Dialog.Root>
						<Dialog.Trigger>Menu</Dialog.Trigger>
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
				<p>
					<button
						type="button"
						onClick={() => {
							console.log('todo: Restart game')
						}}
					>
						Restart game
					</button>
				</p>
			</header>
			<main>
				<h2>Score</h2>
				<div>
					<h3>Player 1</h3>
					<Img alt="" src={playerOneUrl} priority width="54" height="59" />
					<p>12</p>
				</div>
				<div>
					<h3>Player 2</h3>
					<Img alt="" src={playerTwoUrl} priority width="54" height="59" />
					<p>23</p>
				</div>
				<Landmark.Root>
					<Landmark.Label>
						<h2>Game</h2>
					</Landmark.Label>
					<div>
						<Picture>
							<Source
								media={media.tablet}
								srcSet={boardLayerBlackLarge}
								width="632"
								height="594"
							/>
							<Img
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
								alt=""
								src={boardLayerWhiteSmall}
								priority
								width="335"
								height="310"
							/>
						</Picture>
						<p>
							<Picture>
								<Source
									media={media.tablet}
									srcSet={counterRedLarge}
									width="70"
									height="75"
								/>
								<Img
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
									alt="Yellow"
									src={counterYellowSmall}
									priority
									width="41"
									height="46"
								/>
							</Picture>
						</p>
						<Img alt="" src={markerRed} priority width="38" height="36" />
						<Img alt="" src={markerYellow} priority width="38" height="36" />
					</div>
					<h3>Turn</h3>
					<div>
						<Img
							alt=""
							src={turnBackgroundRed}
							priority
							width="197"
							height="165"
						/>
						<Img
							alt=""
							src={turnBackgroundYellow}
							priority
							width="197"
							height="165"
						/>
						<p>Player 1’s turn</p>
						<p>15s</p>
					</div>
				</Landmark.Root>
			</main>
		</>
	)
}
