import { invariant } from '@epic-web/invariant'
import * as Dialog from '@radix-ui/react-dialog'
import { AnnouncementProvider, Announcer } from '#app/components/announcer'
import { Icon } from '#app/components/icon'
import * as Landmark from '#app/components/landmark'

export function App() {
	return (
		<AnnouncementProvider>
			<main className="px-6 pb-12 pt-8 tablet:pb-28 tablet:pt-20 desktop:pb-14 desktop:pt-12">
				<h1 className="grid justify-center">
					<Icon
						className="h-6 w-auto tablet:h-8"
						name="logo"
						width="153"
						height="32"
					/>
					<span className="sr-only">Pomodoro</span>
				</h1>
				<div className="grid justify-center">
					<fieldset
						className="mt-11 flex h-16 items-center rounded-full bg-dark-blue px-2 text-light-blue/40 tablet:mt-14"
						onChange={(e) => {
							invariant(
								e.target instanceof HTMLInputElement,
								'Expected radio input',
							)
							console.log('todo: Change type', e.target.value)
						}}
					>
						<legend className="sr-only">Type of timer</legend>
						<label>
							<input
								className="peer sr-only"
								type="radio"
								name="type"
								value="pomodoro"
								defaultChecked
							/>
							<span className="grid h-12 items-center rounded-full transition-colors peer-checked:bg-red peer-checked:text-blue hocus:text-light-blue peer-checked:hocus:text-blue">
								pomodoro
							</span>
						</label>
						<label>
							<input
								className="peer sr-only"
								type="radio"
								name="type"
								value="short-break"
							/>
							<span className="grid h-12 items-center rounded-full transition-colors peer-checked:bg-red peer-checked:text-blue hocus:text-light-blue peer-checked:hocus:text-blue">
								short break
							</span>
						</label>
						<label>
							<input
								className="peer sr-only"
								type="radio"
								name="type"
								value="long-break"
							/>
							<span className="grid h-12 items-center rounded-full transition-colors peer-checked:bg-red peer-checked:text-blue hocus:text-light-blue peer-checked:hocus:text-blue">
								long break
							</span>
						</label>
					</fieldset>
				</div>
				<div>
					<Landmark.Root className="mx-auto mt-12 grid aspect-square max-w-[25.625rem] grid-rows-[161fr_auto_113fr] rounded-full bg-dark-blue text-center tablet:mt-28 desktop:mt-11">
						<Landmark.Label>
							<h2 className="sr-only">Timer</h2>
						</Landmark.Label>
						<div className="row-start-2">
							<p className="text-h1 leading-none">17:59</p>
							<p className="mt-3 tablet:mt-5">
								<button
									className="text-h3 uppercase transition-colors hocus:text-red"
									type="button"
									onClick={() => {
										console.log('todo: Start timer')
									}}
								>
									Start
								</button>
							</p>
						</div>
					</Landmark.Root>
				</div>
				<p className="mt-20 grid justify-center tablet:mt-36 desktop:mt-16">
					<Dialog.Root>
						<Dialog.Trigger className="text-light-blue/50 transition-colors hocus:text-light-blue">
							<Icon className="size-7" name="icon-settings" />
							<span className="sr-only">Settings</span>
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
