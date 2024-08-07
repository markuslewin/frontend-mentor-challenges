import { invariant } from '@epic-web/invariant'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useId, useState } from 'react'
import { AnnouncementProvider, Announcer } from '#app/components/announcer'
import { Icon } from '#app/components/icon'
import * as Landmark from '#app/components/landmark'

export function App() {
	const timeLabelId = useId()
	const fontLabelId = useId()
	const colorLabelId = useId()
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const id = setInterval(() => {
			setProgress(Math.random())
		}, 10000)

		return () => {
			clearInterval(id)
		}
	})

	return (
		<AnnouncementProvider>
			<main className="min-h-screen px-6 pb-12 pt-8 tablet:pb-28 tablet:pt-20 desktop:pb-14 desktop:pt-12">
				<h1 className="grid justify-center">
					<Icon
						className="h-6 w-auto tablet:h-8"
						name="logo"
						width="153"
						height="32"
					/>
					<span className="sr-only">Pomodoro</span>
				</h1>
				<div className="center-[23.3125rem]">
					<fieldset
						className="mt-11 grid h-16 grid-cols-3 items-center rounded-full bg-dark-blue px-2 text-center text-light-blue/40 tablet:mt-14"
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
					<Landmark.Root className="mx-auto mt-12 max-w-[25.625rem] text-center tablet:mt-28 desktop:mt-11">
						<Landmark.Label>
							<h2 className="sr-only">Timer</h2>
						</Landmark.Label>
						<div className="rounded-full bg-gradient-to-tl from-[hsl(234_33%_27%)] to-[hsl(235_49%_11%)] p-[5.4%] shadow-[-3.125rem_-3.125rem_6.25rem_hsl(234_40%_25%),3.125rem_3.125rem_6.25rem_hsl(235_45%_13%)]">
							<div className="relative isolate grid aspect-square grid-rows-[161fr_auto_113fr] rounded-[inherit] bg-dark-blue">
								<div className="absolute inset-0 -z-10 p-[3.7%] text-red">
									<Progress value={progress} />
								</div>
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
							</div>
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
							<Dialog.Overlay className="fixed inset-0 items-center overflow-y-auto bg-[hsl(234_47%_8%/50%)] py-12 center-[33.75rem] center-gutter-6">
								<Dialog.Content
									className="rounded-sm bg-white text-dark-blue tablet:rounded"
									asChild
									aria-labelledby={undefined}
								>
									<article>
										<header className="flex flex-wrap items-end justify-between gap-4 px-6 pb-7 pt-6 tablet:px-10 tablet:py-8">
											<Dialog.Title className="text-h2">Settings</Dialog.Title>
											<Dialog.Close className="text-[hsl(0_0%_59%)]">
												<Icon className="size-[0.875rem]" name="icon-close" />
												<span className="sr-only">Close</span>
											</Dialog.Close>
										</header>
										<form
											className="border-t border-[hsl(0_2%_89%)] px-6 pt-6 tablet:px-10"
											onSubmit={(e) => {
												e.preventDefault()
												console.log(
													'todo: Apply settings',
													Object.fromEntries(new FormData(e.currentTarget)),
												)
											}}
										>
											<fieldset aria-labelledby={timeLabelId}>
												<p
													className="text-center text-h4 uppercase tablet:text-start"
													id={timeLabelId}
												>
													Time (minutes)
												</p>
												<div className="mt-5 grid gap-2 tablet:mt-[1.625rem] tablet:grid-cols-3 tablet:gap-5">
													<label className="grid grid-cols-2 items-center text-dark-blue/40 tablet:grid-cols-1 tablet:gap-[0.625rem]">
														pomodoro
														<input
															className="h-10 w-full rounded-xs bg-gray px-4 text-dark-blue tablet:h-12"
															type="number"
															name="pomodoro"
															defaultValue="25"
															min="1"
															required
														/>
													</label>
													<label className="grid grid-cols-2 items-center text-dark-blue/40 tablet:grid-cols-1 tablet:gap-[0.625rem]">
														short break
														<input
															className="h-10 w-full rounded-xs bg-gray px-4 text-dark-blue tablet:h-12"
															type="number"
															name="short-break"
															defaultValue="5"
															min="1"
															required
														/>
													</label>
													<label className="grid grid-cols-2 items-center text-dark-blue/40 tablet:grid-cols-1 tablet:gap-[0.625rem]">
														long break
														<input
															className="h-10 w-full rounded-xs bg-gray px-4 text-dark-blue tablet:h-12"
															type="number"
															name="long-break"
															defaultValue="15"
															min="1"
															required
														/>
													</label>
												</div>
											</fieldset>
											<fieldset
												className="mt-6 flex flex-col items-center justify-center gap-[1.125rem] border-t border-[hsl(0_2%_89%)] pt-6 tablet:flex-row tablet:justify-between"
												aria-labelledby={fontLabelId}
											>
												<p
													className="text-center text-h4 uppercase"
													id={fontLabelId}
												>
													Font
												</p>
												<div className="flex flex-wrap gap-4">
													<label>
														<input
															className="peer sr-only"
															type="radio"
															name="font"
															value="kumbh-sans"
															defaultChecked
															required
														/>
														<span className="sr-only">Kumbh Sans</span>
														<span
															className="grid size-10 place-items-center rounded-full bg-gray font-kumbh-sans text-[0.9375rem] transition-colors peer-checked:bg-dark-blue peer-checked:text-white"
															aria-hidden="true"
														>
															Aa
														</span>
													</label>
													<label>
														<input
															className="peer sr-only"
															type="radio"
															name="font"
															value="roboto-slab"
														/>
														<span className="sr-only">Roboto Slab</span>
														<span
															className="grid size-10 place-items-center rounded-full bg-gray font-roboto-slab text-[0.9375rem] transition-colors peer-checked:bg-dark-blue peer-checked:text-white"
															aria-hidden="true"
														>
															Aa
														</span>
													</label>
													<label>
														<input
															className="peer sr-only"
															type="radio"
															name="font"
															value="space-mono"
														/>
														<span className="sr-only">Space Mono</span>
														<span
															className="grid size-10 place-items-center rounded-full bg-gray font-space-mono text-[0.9375rem] transition-colors peer-checked:bg-dark-blue peer-checked:text-white"
															aria-hidden="true"
														>
															Aa
														</span>
													</label>
												</div>
											</fieldset>
											<fieldset
												className="mt-6 flex flex-col items-center justify-center gap-[1.125rem] border-t border-[hsl(0_2%_89%)] pt-4 tablet:flex-row tablet:justify-between tablet:pt-6"
												aria-labelledby={colorLabelId}
											>
												<p
													className="text-center text-h4 uppercase"
													id={colorLabelId}
												>
													Color
												</p>
												<div className="flex flex-wrap gap-4">
													<label>
														<input
															className="peer sr-only"
															type="radio"
															name="color"
															value="red"
															defaultChecked
															required
														/>
														<span className="sr-only">Red</span>
														<span className="grid size-10 place-items-center rounded-full bg-red before:h-[0.8125rem] before:w-[0.4375rem] before:-translate-y-[0.0625rem] before:rotate-45 before:border-b-[0.125rem] before:border-r-[0.125rem] before:opacity-0 before:transition-opacity peer-checked:before:opacity-100" />
													</label>
													<label>
														<input
															className="peer sr-only"
															type="radio"
															name="color"
															value="cyan"
														/>
														<span className="sr-only">Cyan</span>
														<span className="grid size-10 place-items-center rounded-full bg-cyan before:h-[0.8125rem] before:w-[0.4375rem] before:-translate-y-[0.0625rem] before:rotate-45 before:border-b-[0.125rem] before:border-r-[0.125rem] before:opacity-0 before:transition-opacity peer-checked:before:opacity-100" />
													</label>
													<label>
														<input
															className="peer sr-only"
															type="radio"
															name="color"
															value="purple"
														/>
														<span className="sr-only">Purple</span>
														<span className="grid size-10 place-items-center rounded-full bg-purple before:h-[0.8125rem] before:w-[0.4375rem] before:-translate-y-[0.0625rem] before:rotate-45 before:border-b-[0.125rem] before:border-r-[0.125rem] before:opacity-0 before:transition-opacity peer-checked:before:opacity-100" />
													</label>
												</div>
											</fieldset>
											<p className="mt-8">
												<button className="min-w-[8.75rem] rounded-full bg-red text-white">
													Apply
												</button>
											</p>
										</form>
									</article>
								</Dialog.Content>
							</Dialog.Overlay>
						</Dialog.Portal>
					</Dialog.Root>
				</p>
			</main>
			<Announcer />
		</AnnouncementProvider>
	)
}

const d = 339
const strokeWidth = 11
const r = (d - strokeWidth) / 2
const radius = d / 2
const c = 2 * 3.14 * r

interface ProgressProps {
	value: number
}

function Progress({ value }: ProgressProps) {
	return (
		<svg className="-rotate-90" viewBox={`0 0 ${d} ${d}`}>
			<circle
				className="transition-all duration-[2000ms]"
				r={r}
				cx={radius}
				cy={radius}
				fill="transparent"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeDasharray={c}
				style={{ strokeDashoffset: c * (1 - value) }}
			></circle>
		</svg>
	)
}
