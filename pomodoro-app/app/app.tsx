import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useEffect, useId, useState } from 'react'
import { z } from 'zod'
import { AnnouncementProvider, Announcer } from '#app/components/announcer'
import { Icon } from '#app/components/icon'
import * as Landmark from '#app/components/landmark'
import { colors } from '#app/utils/colors'
import { fontFamily } from '#app/utils/fonts'

export function App() {
	const pomodoro = usePomodoro()
	const [progress, setProgress] = useState(0)
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)

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
					<fieldset className="mt-11 grid h-16 grid-cols-3 items-center rounded-full bg-dark-blue px-2 text-center text-light-blue/40 tablet:mt-14">
						<legend className="sr-only">Type of timer</legend>
						<label>
							<input
								className="peer sr-only"
								type="radio"
								checked={pomodoro.type === 'pomodoro'}
								onChange={() => {
									pomodoro.changeType('pomodoro')
								}}
							/>
							<span className="grid h-12 items-center rounded-full transition-colors peer-checked:bg-accent peer-checked:text-blue hocus:text-light-blue peer-checked:hocus:text-blue">
								pomodoro
							</span>
						</label>
						<label>
							<input
								className="peer sr-only"
								type="radio"
								checked={pomodoro.type === 'short-break'}
								onChange={() => {
									pomodoro.changeType('short-break')
								}}
							/>
							<span className="grid h-12 items-center rounded-full transition-colors peer-checked:bg-accent peer-checked:text-blue hocus:text-light-blue peer-checked:hocus:text-blue">
								short break
							</span>
						</label>
						<label>
							<input
								className="peer sr-only"
								type="radio"
								checked={pomodoro.type === 'long-break'}
								onChange={() => {
									pomodoro.changeType('long-break')
								}}
							/>
							<span className="grid h-12 items-center rounded-full transition-colors peer-checked:bg-accent peer-checked:text-blue hocus:text-light-blue peer-checked:hocus:text-blue">
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
								<div className="absolute inset-0 -z-10 p-[3.7%] text-accent">
									<Progress value={progress} />
								</div>
								<div className="row-start-2">
									<p className="text-h1 leading-none">{pomodoro.time}</p>
									<p className="mt-3 tablet:mt-5">
										<button
											className="text-h3 uppercase transition-colors hocus:text-accent"
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
					<Dialog.Root open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
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
										<SettingsForm
											defaultValue={pomodoro.settings}
											onApply={(settings) => {
												pomodoro.applySettings(settings)
												setIsSettingsOpen(false)
											}}
										/>
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

function usePomodoro() {
	const [type, setType] = useState<TimerType>('pomodoro')
	const [time, setTime] = useState(25)
	const [settings, setSettings] = useLocalStorage<Settings>('settings', {
		pomodoro: 25,
		'short-break': 5,
		'long-break': 15,
		font: 'kumbh-sans',
		color: 'red',
	})

	useEffect(() => {
		document.documentElement.style.setProperty(
			'--font-main',
			fontFamily[settings.font],
		)
		return () => {
			document.documentElement.style.removeProperty('--font-main')
		}
	}, [settings.font])

	useEffect(() => {
		document.documentElement.style.setProperty(
			'--color-accent',
			colors[settings.color],
		)
		return () => {
			document.documentElement.style.removeProperty('--color-accent')
		}
	}, [settings.color])

	return {
		settings,
		time,
		type,
		applySettings(settings: Settings) {
			setSettings(settings)
			setTime(settings[type])
		},
		changeType(type: TimerType) {
			setType(type)
			setTime(settings[type])
		},
	}
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

const settingsSchema = z.object({
	pomodoro: z.number().gt(0),
	'short-break': z.number().gt(0),
	'long-break': z.number().gt(0),
	font: z.enum(['kumbh-sans', 'roboto-slab', 'space-mono']),
	color: z.enum(['red', 'cyan', 'purple']),
})

type Settings = z.infer<typeof settingsSchema>
type TimerType = 'pomodoro' | 'short-break' | 'long-break'

interface SettingsFormProps {
	defaultValue: Settings
	onApply(settings: Settings): void
}

function SettingsForm({ defaultValue, onApply }: SettingsFormProps) {
	const timeLabelId = useId()
	const fontLabelId = useId()
	const colorLabelId = useId()
	const [form, fields] = useForm({
		constraint: getZodConstraint(settingsSchema),
		defaultValue,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: settingsSchema })
		},
		onSubmit(event, { submission }) {
			event.preventDefault()

			if (submission?.status !== 'success') return

			onApply(submission.value)
		},
	})

	return (
		<form
			{...getFormProps(form)}
			className="border-t border-[hsl(0_2%_89%)] px-6 pt-6 tablet:px-10"
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
							{...getInputProps(fields.pomodoro, { type: 'number' })}
							className="h-10 w-full rounded-xs bg-gray px-4 text-dark-blue tablet:h-12"
						/>
					</label>
					<label className="grid grid-cols-2 items-center text-dark-blue/40 tablet:grid-cols-1 tablet:gap-[0.625rem]">
						short break
						<input
							{...getInputProps(fields['short-break'], { type: 'number' })}
							className="h-10 w-full rounded-xs bg-gray px-4 text-dark-blue tablet:h-12"
						/>
					</label>
					<label className="grid grid-cols-2 items-center text-dark-blue/40 tablet:grid-cols-1 tablet:gap-[0.625rem]">
						long break
						<input
							{...getInputProps(fields['long-break'], { type: 'number' })}
							className="h-10 w-full rounded-xs bg-gray px-4 text-dark-blue tablet:h-12"
						/>
					</label>
				</div>
			</fieldset>
			<fieldset
				className="mt-6 flex flex-col items-center justify-center gap-[1.125rem] border-t border-[hsl(0_2%_89%)] pt-6 tablet:flex-row tablet:justify-between"
				aria-labelledby={fontLabelId}
			>
				<p className="text-center text-h4 uppercase" id={fontLabelId}>
					Font
				</p>
				<div className="flex flex-wrap gap-4">
					<label>
						<input
							{...getInputProps(fields.font, {
								type: 'radio',
								value: 'kumbh-sans',
							})}
							className="peer sr-only"
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
							{...getInputProps(fields.font, {
								type: 'radio',
								value: 'roboto-slab',
							})}
							className="peer sr-only"
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
							{...getInputProps(fields.font, {
								type: 'radio',
								value: 'space-mono',
							})}
							className="peer sr-only"
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
				<p className="text-center text-h4 uppercase" id={colorLabelId}>
					Color
				</p>
				<div className="flex flex-wrap gap-4">
					<label>
						<input
							{...getInputProps(fields.color, {
								type: 'radio',
								value: 'red',
							})}
							className="peer sr-only"
						/>
						<span className="sr-only">Red</span>
						<span className="grid size-10 place-items-center rounded-full bg-red before:h-[0.8125rem] before:w-[0.4375rem] before:-translate-y-[0.0625rem] before:rotate-45 before:border-b-[0.125rem] before:border-r-[0.125rem] before:opacity-0 before:transition-opacity peer-checked:before:opacity-100" />
					</label>
					<label>
						<input
							{...getInputProps(fields.color, {
								type: 'radio',
								value: 'cyan',
							})}
							className="peer sr-only"
						/>
						<span className="sr-only">Cyan</span>
						<span className="grid size-10 place-items-center rounded-full bg-cyan before:h-[0.8125rem] before:w-[0.4375rem] before:-translate-y-[0.0625rem] before:rotate-45 before:border-b-[0.125rem] before:border-r-[0.125rem] before:opacity-0 before:transition-opacity peer-checked:before:opacity-100" />
					</label>
					<label>
						<input
							{...getInputProps(fields.color, {
								type: 'radio',
								value: 'purple',
							})}
							className="peer sr-only"
						/>
						<span className="sr-only">Purple</span>
						<span className="grid size-10 place-items-center rounded-full bg-purple before:h-[0.8125rem] before:w-[0.4375rem] before:-translate-y-[0.0625rem] before:rotate-45 before:border-b-[0.125rem] before:border-r-[0.125rem] before:opacity-0 before:transition-opacity peer-checked:before:opacity-100" />
					</label>
				</div>
			</fieldset>
			<p className="mt-8">
				<button className="min-w-[8.75rem] rounded-full bg-accent text-white">
					Apply
				</button>
			</p>
		</form>
	)
}
