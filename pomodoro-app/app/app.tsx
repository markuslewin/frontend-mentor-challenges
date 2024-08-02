import { invariant } from '@epic-web/invariant'
import * as Dialog from '@radix-ui/react-dialog'
import { AnnouncementProvider, Announcer } from '#app/components/announcer'
import { Icon } from '#app/components/icon'
import * as Landmark from '#app/components/landmark'

export function App() {
	return (
		<AnnouncementProvider>
			<main>
				<h1>
					<Icon name="logo" />
					<span>Pomodoro</span>
				</h1>
				<fieldset
					onChange={(e) => {
						invariant(
							e.target instanceof HTMLInputElement,
							'Expected radio input',
						)
						console.log('todo: Change type', e.target.value)
					}}
				>
					<legend>Type of timer</legend>
					<label>
						<input type="radio" name="type" value="pomodoro" defaultChecked />
						pomodoro
					</label>
					<label>
						<input type="radio" name="type" value="short-break" />
						short break
					</label>
					<label>
						<input type="radio" name="type" value="long-break" />
						long break
					</label>
				</fieldset>
				<Landmark.Root>
					<Landmark.Label>
						<h2>Timer</h2>
					</Landmark.Label>
					<p>17:59</p>
					<p>
						<button
							type="button"
							onClick={() => {
								console.log('todo: Start timer')
							}}
						>
							Start
						</button>
					</p>
				</Landmark.Root>
				<p>
					<Dialog.Root>
						<Dialog.Trigger>
							<Icon name="icon-settings" />
							<span>Settings</span>
						</Dialog.Trigger>
						<Dialog.Portal>
							<Dialog.Overlay />
							<Dialog.Content asChild aria-labelledby={undefined}>
								<article>
									<header>
										<Dialog.Title>Settings</Dialog.Title>
										<Dialog.Close>
											<Icon name="icon-close" />
											<span>Close</span>
										</Dialog.Close>
									</header>
									<form
										onSubmit={(e) => {
											e.preventDefault()
											console.log(
												'todo: Apply settings',
												Object.fromEntries(new FormData(e.currentTarget)),
											)
										}}
									>
										<fieldset>
											<legend>Time (minutes)</legend>
											<label>
												pomodoro
												<input
													type="number"
													name="pomodoro"
													defaultValue="25"
													min="1"
													required
												/>
											</label>
											<label>
												short break
												<input
													type="number"
													name="short-break"
													defaultValue="5"
													min="1"
													required
												/>
											</label>
											<label>
												long break
												<input
													type="number"
													name="long-break"
													defaultValue="15"
													min="1"
													required
												/>
											</label>
										</fieldset>
										<fieldset>
											<legend>Font</legend>
											<label>
												<input
													type="radio"
													name="font"
													value="kumbh-sans"
													defaultChecked
													required
												/>
												Kumbh Sans
											</label>
											<label>
												<input type="radio" name="font" value="roboto-slab" />
												Roboto Slab
											</label>
											<label>
												<input type="radio" name="font" value="space-mono" />
												Space Mono
											</label>
										</fieldset>
										<fieldset>
											<legend>Color</legend>
											<label>
												<input
													type="radio"
													name="color"
													value="red"
													defaultChecked
													required
												/>
												Red
											</label>
											<label>
												<input type="radio" name="color" value="cyan" />
												Cyan
											</label>
											<label>
												<input type="radio" name="color" value="purple" />
												Purple
											</label>
										</fieldset>
										<p>
											<button>Apply</button>
										</p>
									</form>
								</article>
							</Dialog.Content>
						</Dialog.Portal>
					</Dialog.Root>
				</p>
			</main>
			<Announcer />
		</AnnouncementProvider>
	)
}
