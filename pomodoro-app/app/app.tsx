import {
	getCollectionProps,
	getFormProps,
	getInputProps,
	useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useLocalStorage } from '@uidotdev/usehooks'
import { cx } from 'class-variance-authority'
import {
	type ComponentPropsWithoutRef,
	forwardRef,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react'
import { z } from 'zod'
import { useAnnouncer } from '#app/components/announcer'
import { Icon } from '#app/components/icon'
import * as Landmark from '#app/components/landmark'
import { playSuccess } from '#app/utils/audio.js'
import { base } from '#app/utils/colors'
import { fontFamily } from '#app/utils/fonts'

export function App() {
	const pomodoro = usePomodoro()
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)

	const timeLeft = pomodoro.settings[pomodoro.type] - pomodoro.elapsed
	const minutes = Math.floor(timeLeft / 1000 / 60)
	const seconds = (timeLeft / 1000) % 60

	return (
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
							name="timer"
							checked={pomodoro.type === 'pomodoro'}
							onChange={() => {
								pomodoro.changeType('pomodoro')
							}}
						/>
						<span className="grid h-12 items-center rounded-full transition-colors peer-checked:bg-accent peer-checked:text-blue peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[white] hocus:text-light-blue peer-checked:hocus:text-blue">
							pomodoro
						</span>
					</label>
					<label>
						<input
							className="peer sr-only"
							type="radio"
							name="timer"
							checked={pomodoro.type === 'short-break'}
							onChange={() => {
								pomodoro.changeType('short-break')
							}}
						/>
						<span className="grid h-12 items-center rounded-full transition-colors peer-checked:bg-accent peer-checked:text-blue peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[white] hocus:text-light-blue peer-checked:hocus:text-blue">
							short break
						</span>
					</label>
					<label>
						<input
							className="peer sr-only"
							type="radio"
							name="timer"
							checked={pomodoro.type === 'long-break'}
							onChange={() => {
								pomodoro.changeType('long-break')
							}}
						/>
						<span className="grid h-12 items-center rounded-full transition-colors peer-checked:bg-accent peer-checked:text-blue peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[white] hocus:text-light-blue peer-checked:hocus:text-blue">
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
						<div className="relative isolate grid aspect-square grid-rows-[127fr_auto_91fr] rounded-[inherit] bg-dark-blue">
							<div className="absolute inset-0 -z-10 p-[3.7%] text-accent">
								<Progress value={timeLeft / pomodoro.settings[pomodoro.type]} />
							</div>
							<div className="row-start-2">
								<p className="text-h1 leading-none" data-testid="timer">
									{minutes.toString().padStart(2, '0')}:
									{seconds.toString().padStart(2, '0')}
								</p>
								<p className="mt-5 tablet:mt-7">
									<button
										className="text-h3 uppercase transition-colors hocus:text-accent"
										type="button"
										onClick={() => {
											pomodoro.execAction()
										}}
									>
										<span className="inline-block translate-x-[0.5em]">
											{getButtonName(pomodoro.status)}
										</span>
									</button>
								</p>
							</div>
						</div>
					</div>
				</Landmark.Root>
			</div>
			<p className="mt-20 grid justify-center tablet:mt-36 desktop:mt-16">
				<Dialog.Root open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
					<Dialog.Trigger className="text-light-blue/50 transition-colors clickable-12 hocus:text-light-blue">
						<Icon className="size-7" name="icon-settings" />
						<span className="sr-only">Settings</span>
					</Dialog.Trigger>
					<Dialog.Portal>
						<Settings
							defaultValue={{
								...pomodoro.settings,
								pomodoro: pomodoro.settings.pomodoro / 1000 / 60,
								'short-break': pomodoro.settings['short-break'] / 1000 / 60,
								'long-break': pomodoro.settings['long-break'] / 1000 / 60,
							}}
							onApply={(settings) => {
								pomodoro.applySettings(settings)
								setIsSettingsOpen(false)
							}}
						/>
					</Dialog.Portal>
				</Dialog.Root>
			</p>
		</main>
	)
}

function getFontName(value: string) {
	if (isFont(value)) {
		if (value === 'kumbh-sans') {
			return 'Kumbh Sans'
		} else if (value === 'roboto-slab') {
			return 'Roboto Slab'
		} else if (value === 'space-mono') {
			return 'Space Mono'
		}
	}
	throw new Error(`Invalid value "${value}"`)
}

function getColorName(value: string) {
	if (isColor(value)) {
		if (value === 'cyan') {
			return 'Cyan'
		} else if (value === 'purple') {
			return 'Purple'
		} else if (value === 'red') {
			return 'Red'
		}
	}
	throw new Error(`Invalid value "${value}"`)
}

function getButtonName(status: PomodoroStatus) {
	if (status === 'idle') {
		return 'Start'
	} else if (status === 'pending') {
		return 'Pause'
	} else if (status === 'resolved') {
		return 'Restart'
	} else {
		throw new Error(`Invalid status "${status}"`)
	}
}

type PomodoroStatus = 'idle' | 'pending' | 'resolved'

function usePomodoro() {
	const { announce } = useAnnouncer()
	const [type, setType] = useState<TimerType>('pomodoro')
	const [settings, setSettings] = useLocalStorage<Settings>('settings', {
		pomodoro: 25 * 60 * 1000,
		'short-break': 5 * 60 * 1000,
		'long-break': 15 * 60 * 1000,
		font: 'kumbh-sans',
		color: 'red',
	})
	const [elapsed, _setElapsed] = useState(0)
	const [status, setStatus] = useState<PomodoroStatus>('idle')
	const timerRef = useRef<ReturnType<typeof setInterval>>()
	const elapsedRef = useRef(0)

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
			base[settings.color],
		)
		return () => {
			document.documentElement.style.removeProperty('--color-accent')
		}
	}, [settings.color])

	function startTimer() {
		timerRef.current = setInterval(() => {
			// todo: Calculate actual elapsed time with `Date.now`
			const e = Math.min(elapsedRef.current + 1000, settings[type])
			setElapsed(e)
			if (e === settings[type]) {
				stopTimer()
				setStatus('resolved')
				playSuccess()
			}
		}, 1000)
		setStatus('pending')
	}

	function stopTimer() {
		clearInterval(timerRef.current)
		timerRef.current = undefined
	}

	function resetTimer() {
		stopTimer()
		setElapsed(0)
		setStatus('idle')
	}

	function setElapsed(elapsed: number) {
		elapsedRef.current = elapsed
		_setElapsed(elapsed)
	}

	return {
		settings,
		status,
		elapsed,
		type,
		applySettings(settings: Settings) {
			setSettings(settings)
			resetTimer()
		},
		changeType(type: TimerType) {
			resetTimer()
			setType(type)
		},
		execAction() {
			if (status === 'idle') {
				startTimer()
				announce('Timer started')
			} else if (status === 'pending') {
				stopTimer()
				setStatus('idle')
				announce('Timer paused')
			} else if (status === 'resolved') {
				setElapsed(0)
				startTimer()
				announce('Timer started')
			}
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
				className="transition-[color,stroke-dashoffset] duration-[150ms,1s] ease-[cubic-bezier(0.4,0,1,1),linear]"
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

const fonts = ['kumbh-sans', 'roboto-slab', 'space-mono'] as const
const colors = ['red', 'cyan', 'purple'] as const

const settingsSchema = z.object({
	pomodoro: z
		.number()
		.gt(0)
		.transform((minutes) => minutes * 60 * 1000),
	'short-break': z
		.number()
		.gt(0)
		.transform((minutes) => minutes * 60 * 1000),
	'long-break': z
		.number()
		.gt(0)
		.transform((minutes) => minutes * 60 * 1000),
	font: z.enum(fonts),
	color: z.enum(colors),
})

type Settings = z.infer<typeof settingsSchema>
type Font = Settings['font']
type Color = Settings['color']

type TimerType = 'pomodoro' | 'short-break' | 'long-break'

function isFont(value: any): value is Font {
	return fonts.includes(value)
}

function isColor(value: any): value is Color {
	return colors.includes(value)
}

interface SettingsProps {
	defaultValue: Settings
	onApply(settings: Settings): void
}

const Settings = forwardRef<HTMLDivElement, SettingsProps>(
	({ defaultValue, onApply }, ref) => {
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
			<Dialog.Overlay
				className="fixed inset-0 items-center overflow-y-auto bg-[hsl(234_47%_8%/50%)] py-12 center-[33.75rem] center-gutter-6"
				ref={ref}
			>
				<Dialog.Content aria-describedby={undefined}>
					<form {...getFormProps(form)}>
						<article>
							<div className="rounded-sm bg-white text-dark-blue tablet:rounded">
								<header className="flex flex-wrap items-end justify-between gap-4 px-6 pb-7 pt-6 tablet:px-10 tablet:py-8">
									<Dialog.Title className="text-h2">Settings</Dialog.Title>
									<Dialog.Close className="text-blue/50 transition-colors clickable-12 hocus:text-blue">
										<Icon className="size-[0.875rem]" name="icon-close" />
										<span className="sr-only">Close</span>
									</Dialog.Close>
								</header>
								<div className="border-t border-[hsl(0_2%_89%)] px-6 pb-[3.75rem] pt-6 tablet:px-10">
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
												<TimeInput
													{...getInputProps(fields.pomodoro, {
														type: 'number',
														value: false,
													})}
													defaultValue={defaultValue.pomodoro}
												/>
											</label>
											<label className="grid grid-cols-2 items-center text-dark-blue/40 tablet:grid-cols-1 tablet:gap-[0.625rem]">
												short break
												<TimeInput
													{...getInputProps(fields['short-break'], {
														type: 'number',
														value: false,
													})}
													defaultValue={defaultValue['short-break']}
												/>
											</label>
											<label className="grid grid-cols-2 items-center text-dark-blue/40 tablet:grid-cols-1 tablet:gap-[0.625rem]">
												long break
												<TimeInput
													{...getInputProps(fields['long-break'], {
														type: 'number',
														value: false,
													})}
													defaultValue={defaultValue['long-break']}
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
											{getCollectionProps(fields.font, {
												type: 'radio',
												options: [
													'kumbh-sans',
													'roboto-slab',
													'space-mono',
												] satisfies Font[],
											}).map((props) => (
												<label key={props.id}>
													<input {...props} className="peer sr-only" />
													<span className="sr-only">
														{getFontName(props.value)}
													</span>
													<span
														className={cx(
															'grid size-10 place-items-center rounded-full bg-gray font-kumbh-sans text-[0.9375rem] transition-all peer-checked:bg-dark-blue peer-checked:text-white peer-hover:ring-1 peer-hover:ring-gray peer-hover:ring-offset-4 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[black]',
															isFont(props.value)
																? props.value === 'kumbh-sans'
																	? 'font-kumbh-sans'
																	: props.value === 'roboto-slab'
																		? 'font-roboto-slab'
																		: props.value === 'space-mono'
																			? 'font-space-mono'
																			: ''
																: '',
														)}
														aria-hidden="true"
													>
														Aa
													</span>
												</label>
											))}
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
											{getCollectionProps(fields.color, {
												type: 'radio',
												options: ['red', 'cyan', 'purple'] satisfies Color[],
											}).map((props) => (
												<label key={props.id}>
													<input {...props} className="peer sr-only" />
													<span className="sr-only">
														{getColorName(props.value)}
													</span>
													<span
														className={cx(
															'grid size-10 place-items-center rounded-full transition-shadow before:h-[0.8125rem] before:w-[0.4375rem] before:-translate-y-[0.0625rem] before:rotate-45 before:border-b-[0.125rem] before:border-r-[0.125rem] before:opacity-0 before:transition-opacity peer-checked:before:opacity-100 peer-hover:ring-1 peer-hover:ring-gray peer-hover:ring-offset-4 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[black]',
															isColor(props.value)
																? props.value === 'red'
																	? 'bg-red'
																	: props.value === 'cyan'
																		? 'bg-cyan'
																		: props.value === 'purple'
																			? 'bg-purple'
																			: ''
																: '',
														)}
													/>
												</label>
											))}
										</div>
									</fieldset>
								</div>
							</div>
							<p className="-mt-7 text-center">
								<button className="group relative isolate min-w-[8.75rem] rounded-full bg-accent px-3 py-[1.125rem] text-white">
									<span className="absolute inset-0 -z-10 rounded-[inherit] bg-white/0 transition-colors group-hocus:bg-white/20" />
									Apply
								</button>
							</p>
						</article>
					</form>
				</Dialog.Content>
			</Dialog.Overlay>
		)
	},
)

interface TimeInputProps extends ComponentPropsWithoutRef<'input'> {
	defaultValue: number
}

function TimeInput({ defaultValue, ...props }: TimeInputProps) {
	const [value, setValue] = useState(defaultValue.toString())

	return (
		<div className="relative">
			<input
				{...props}
				className="h-10 w-full rounded-xs bg-gray pl-4 pr-9 text-dark-blue tablet:h-12"
				value={value}
				onChange={(e) => {
					setValue(e.target.value)
				}}
			/>
			<SpinButton value={value} min={props.min} onValueChange={setValue} />
		</div>
	)
}

interface SpinButtonProps {
	value: string
	min?: string | number
	onValueChange(value: string): void
}

function SpinButton({ value, min: _min, onValueChange }: SpinButtonProps) {
	// todo: Move out of `SpinButton`
	const min =
		typeof _min === 'number'
			? _min
			: typeof _min === 'string'
				? parseFloat(_min)
				: null

	return (
		<div
			className="absolute inset-y-0 right-4 grid content-center gap-2"
			// The spinbutton is an enhancement for pointer devices - hide from keyboard
			aria-hidden="true"
		>
			<button
				className="text-blue/25 transition-colors hover:text-blue"
				type="button"
				tabIndex={-1}
				onClick={() => {
					const parsed = parseInt(value, 10)
					const current = isNaN(parsed) ? 0 : parsed
					onValueChange((current + 1).toString())
				}}
			>
				<Icon className="h-[0.4375rem] w-[0.875rem]" name="icon-arrow-up" />
			</button>
			<button
				className="text-blue/25 transition-colors hover:text-blue"
				type="button"
				tabIndex={-1}
				onClick={() => {
					const parsed = parseInt(value, 10)
					const current = isNaN(parsed) ? 0 : parsed
					const next = current - 1
					onValueChange((min === null ? next : Math.max(min, next)).toString())
				}}
			>
				<Icon className="h-[0.4375rem] w-[0.875rem]" name="icon-arrow-down" />
			</button>
		</div>
	)
}
