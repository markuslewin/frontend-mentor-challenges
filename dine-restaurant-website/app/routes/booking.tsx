import {
	getFieldsetProps,
	getFormProps,
	getInputProps,
	getSelectProps,
	useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { invariant } from '@epic-web/invariant'
import * as Select from '@radix-ui/react-select'
import { cx } from 'class-variance-authority'
import { type ReactNode, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'
// @ts-expect-error Search params
import heroBgDesktop from '#app/assets/booking/hero-bg-desktop.jpg?as=metadata'
// @ts-expect-error Search params
import heroBgDesktop2x from '#app/assets/booking/hero-bg-desktop@2x.jpg?as=metadata'
// @ts-expect-error Search params
import heroBgMobile from '#app/assets/booking/hero-bg-mobile.jpg?as=metadata'
// @ts-expect-error Search params
import heroBgMobile2x from '#app/assets/booking/hero-bg-mobile@2x.jpg?as=metadata'
// @ts-expect-error Search params
import heroBgTablet from '#app/assets/booking/hero-bg-tablet.jpg?as=metadata'
// @ts-expect-error Search params
import heroBgTablet2x from '#app/assets/booking/hero-bg-tablet@2x.jpg?as=metadata'
import { Icon } from '#app/components/icon'
import { DensityImage, DensitySource, Picture } from '#app/components/picture'
import * as Button from '#app/components/ui/button'
import { Logo } from '#app/components/ui/logo'
import { CurveBottomRight, Lines } from '#app/components/ui/patterns'
import { TextField } from '#app/components/ui/text-field'
import { center, outerCenter } from '#app/utils/layout.js'
import { screens } from '#app/utils/screens'

const minPeopleAmount = 1

function useAmountOfPeople() {
	const [value, setValue] = useState(4)

	return {
		value,
		decrement() {
			setValue(Math.max(minPeopleAmount, value - 1))
		},
		increment() {
			setValue(value + 1)
		},
	}
}

const bookingSchema = z.object({
	name: z.string({ required_error: 'This field is required' }),
	email: z
		.string({ required_error: 'This field is required' })
		.email({ message: 'Please use a valid email address' }),
	date: z.object({
		day: z
			.number({ required_error: 'This field is incomplete' })
			.gte(1)
			.lte(31),
		month: z
			.number({ required_error: 'This field is incomplete' })
			.gte(1)
			.lte(12),
		year: z
			.number({ required_error: 'This field is incomplete' })
			.gte(2024)
			.lte(2026),
	}),
	time: z.object({
		hour: z
			.number({ required_error: 'This field is incomplete' })
			.gte(1)
			.lte(12),
		minute: z
			.number({ required_error: 'This field is incomplete' })
			.gte(0)
			.lte(59),
		period: z.enum(['am', 'pm']),
	}),
})

type Booking = z.infer<typeof bookingSchema>
type BookingTimePeriod = Booking['time']['period']

export function Booking() {
	const dateLabelId = useId()
	const timeLabelId = useId()
	const [form, fields] = useForm({
		constraint: getZodConstraint(bookingSchema),
		defaultValue: {
			time: {
				period: 'am' satisfies BookingTimePeriod,
			},
		},
		shouldValidate: 'onBlur',
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: bookingSchema })
		},
		onSubmit(event, { submission }) {
			event.preventDefault()

			if (submission?.status !== 'success') return

			// todo: Does date exist?
			// todo: Is date X amount of hours into the future?
			console.log('Booking successful!', { data: submission.value })
		},
	})
	const amountOfPeople = useAmountOfPeople()

	const date = fields.date.getFieldset()
	const time = fields.time.getFieldset()

	const periodProps = getSelectProps(time.period)
	invariant(
		typeof periodProps.defaultValue === 'string',
		'Default value of period must be a string',
	)

	const errors = {
		name: Boolean(fields.name.errors?.length),
		email: Boolean(fields.email.errors?.length),
		date: Boolean(
			date.day.errors?.length ||
				date.month.errors?.length ||
				date.year.errors?.length,
		),
		time: Boolean(time.hour.errors?.length || time.minute.errors?.length),
	}

	return (
		<main>
			<div className="isolate grid text-white">
				<div className="isolate -z-10 col-start-1 row-start-1 grid overflow-hidden">
					<Picture>
						<DensitySource
							media={`(min-width: ${screens.desktop})`}
							images={[
								{ density: '1x', image: heroBgDesktop },
								{ density: '2x', image: heroBgDesktop2x },
							]}
						/>
						<DensitySource
							media={`(min-width: ${screens.tablet})`}
							images={[
								{ density: '1x', image: heroBgTablet },
								{ density: '2x', image: heroBgTablet2x },
							]}
						/>
						<DensityImage
							className="h-[37.5rem] w-full bg-cod-gray object-cover"
							alt=""
							images={[
								{ density: '1x', image: heroBgMobile },
								{ density: '2x', image: heroBgMobile2x },
							]}
						/>
					</Picture>
					<CurveBottomRight className="hidden -translate-x-[13.9375rem] justify-self-center desktop:block" />
				</div>
				<div className="col-start-1 row-start-1 pt-14 desktop:pt-16">
					<div className={outerCenter}>
						<header role="banner">
							<Link to="/">
								<Logo />
							</Link>
						</header>
					</div>
					<div
						className={cx('mt-11 tablet:mt-16 desktop:mt-[9.5625rem]', center)}
					>
						<div className="grid desktop:grid-cols-[445fr_125fr_540fr]">
							<div className="text-center desktop:text-start">
								<h1 className="text-heading-xl">Reservations</h1>
								<p className="mt-3 desktop:mt-5">
									We can’t wait to host you. If you have any special
									requirements please feel free to call on the phone number
									below. We’ll be happy to accommodate you.
								</p>
							</div>
							{/* <Lines /> */}
							<form
								{...getFormProps(form)}
								className="mx-auto mb-20 mt-44 max-w-[33.75rem] border-[transparent] bg-white text-cod-gray shadow shape-p-8 shape-border tablet:mb-32 tablet:mt-10 tablet:shape-p-12 desktop:col-start-3 desktop:mx-0 desktop:mb-0 desktop:mt-0 desktop:max-w-none"
							>
								<div className={cx('', errors.name ? 'text-red' : '')}>
									<p>
										<label className="sr-only" htmlFor={fields.name.id}>
											Name:
										</label>
										<TextField
											{...getInputProps(fields.name, { type: 'text' })}
											className="w-full"
											variant={errors.name ? 'error' : 'normal'}
											placeholder="Name"
											autoComplete="name"
										/>
									</p>
									<p className="mt-3 px-4 text-error" id={fields.name.errorId}>
										{fields.name.errors}
									</p>
								</div>
								<div className={cx('mt-8', errors.email ? 'text-red' : '')}>
									<p>
										<label className="sr-only" htmlFor={fields.email.id}>
											Email:
										</label>
										<TextField
											{...getInputProps(fields.email, { type: 'email' })}
											className="w-full"
											variant={errors.email ? 'error' : 'normal'}
											placeholder="Email"
											autoComplete="email"
										/>
									</p>
									<p className="mt-3 px-4 text-error" id={fields.email.errorId}>
										{fields.email.errors}
									</p>
								</div>
								<fieldset
									{...getFieldsetProps(fields.date)}
									className={cx(
										'mt-8 grid grid-cols-[73fr_73fr_88fr] items-center gap-4 tablet:grid-cols-[139fr_80fr_80fr_97fr]',
										errors.date ? 'text-red' : '',
									)}
									aria-labelledby={dateLabelId}
								>
									<div className="col-span-full tablet:col-span-1">
										<p id={dateLabelId}>Pick a date</p>
										{/* Screen readers get specific error messages for each input */}
										<p className="text-error" aria-hidden="true">
											{date.month.errors ?? date.day.errors ?? date.year.errors}
										</p>
									</div>
									<div>
										<p>
											<label className="sr-only" htmlFor={date.month.id}>
												Month:
											</label>
											<TextField
												{...getInputProps(date.month, {
													type: 'number',
												})}
												className="w-full"
												variant={errors.date ? 'error' : 'normal'}
												placeholder="MM"
												autoComplete="off"
											/>
										</p>
										<p className="sr-only" id={date.month.errorId}>
											{date.month.errors}
										</p>
									</div>
									<div>
										<p>
											<label className="sr-only" htmlFor={date.day.id}>
												Day:
											</label>
											<TextField
												{...getInputProps(date.day, {
													type: 'number',
												})}
												className="w-full"
												variant={errors.date ? 'error' : 'normal'}
												placeholder="DD"
												autoComplete="off"
											/>
										</p>
										<p className="sr-only" id={date.day.errorId}>
											{date.day.errors}
										</p>
									</div>
									<div>
										<p>
											<label className="sr-only" htmlFor={date.year.id}>
												Year:
											</label>
											<TextField
												{...getInputProps(date.year, {
													type: 'number',
												})}
												className="w-full"
												variant={errors.date ? 'error' : 'normal'}
												placeholder="YYYY"
												autoComplete="off"
											/>
										</p>
										<p className="sr-only" id={date.year.errorId}>
											{date.year.errors}
										</p>
									</div>
								</fieldset>
								<fieldset
									{...getFieldsetProps(fields.time)}
									className={cx(
										'mt-8 grid grid-cols-[73fr_73fr_88fr] items-center gap-4 tablet:grid-cols-[139fr_80fr_80fr_97fr]',
									)}
									aria-labelledby={timeLabelId}
								>
									<div
										className={cx(
											'col-span-full tablet:col-span-1',
											errors.time ? 'text-red' : '',
										)}
									>
										<p id={timeLabelId}>Pick a time</p>
										{/* Screen readers get specific error messages for each input */}
										<p className="text-error" aria-hidden="true">
											{time.hour.errors ?? time.minute.errors}
										</p>
									</div>
									<div>
										<p>
											<label className="sr-only" htmlFor={time.hour.id}>
												Hour:
											</label>
											<TextField
												{...getInputProps(time.hour, {
													type: 'number',
												})}
												className={cx('w-full', errors.time ? 'text-red' : '')}
												variant={errors.time ? 'error' : 'normal'}
												placeholder="09"
												autoComplete="off"
											/>
										</p>
										<p className="sr-only" id={time.hour.errorId}>
											{time.hour.errors}
										</p>
									</div>
									<div>
										<p>
											<label className="sr-only" htmlFor={time.minute.id}>
												Minute:
											</label>
											<TextField
												{...getInputProps(time.minute, {
													type: 'number',
												})}
												className={cx('w-full', errors.time ? 'text-red' : '')}
												variant={errors.time ? 'error' : 'normal'}
												placeholder="00"
												autoComplete="off"
											/>
										</p>
										<p className="sr-only" id={time.minute.errorId}>
											{time.minute.errors}
										</p>
									</div>
									<div>
										<p>
											<label className="sr-only" htmlFor={time.period.id}>
												Period:
											</label>
											<Select.Root
												name={periodProps.name}
												defaultValue={periodProps.defaultValue}
												required={periodProps.required}
											>
												<Select.Trigger
													className="group grid w-full grid-cols-[auto_auto] items-center justify-between gap-1 border-b border-[hsl(0_0%_56%)] px-4 pb-[0.875rem] transition-colors hocus:border-cod-gray"
													id={periodProps.id}
													aria-describedby={periodProps['aria-describedby']}
													aria-invalid={periodProps['aria-invalid']}
												>
													<Select.Value />
													<Select.Icon className="text-beaver">
														<Icon
															className="h-[0.6875rem] w-[1.125rem] -translate-y-[0.125rem] transition-transform group-data-[state=open]:rotate-180"
															name="icon-arrow"
														/>
													</Select.Icon>
												</Select.Trigger>
												<Select.Portal>
													<Select.Content
														className="max-h-[var(--radix-select-content-available-height)] w-[6.625rem] overflow-y-auto bg-white text-cod-gray shadow-sm"
														position="popper"
														sideOffset={8}
													>
														<Select.Viewport className="pb-[0.8125rem] pt-[1.125rem]">
															<SelectItem value="am">AM</SelectItem>
															<SelectItem value="pm">PM</SelectItem>
														</Select.Viewport>
													</Select.Content>
												</Select.Portal>
											</Select.Root>
										</p>
										<p className="sr-only" id={time.period.errorId}>
											{time.period.errors}
										</p>
									</div>
								</fieldset>
								<fieldset className="mt-9 grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-[hsl(0_0%_56%)] px-5 pb-4 tablet:px-8">
									<legend className="sr-only">Amount of people</legend>
									<button
										className="text-beaver transition-colors clickable-12 hocus:text-beaver/50"
										type="button"
										onClick={() => {
											amountOfPeople.decrement()
										}}
									>
										<Icon
											className="h-[0.1875rem] w-[0.4375rem]"
											name="icon-minus"
										/>
										<span className="sr-only">Decrement quantity</span>
									</button>
									<p
										className="text-center text-heading-m"
										aria-live="assertive"
									>
										{amountOfPeople.value} people
									</p>
									<button
										className="text-beaver transition-colors clickable-12 hocus:text-beaver/50"
										type="button"
										onClick={() => {
											amountOfPeople.increment()
										}}
									>
										<Icon
											className="h-[0.6875rem] w-[0.625rem]"
											name="icon-plus"
										/>
										<span className="sr-only">Increment quantity</span>
									</button>
								</fieldset>
								<p className="mt-8">
									<Button.Root className="w-full">
										<Button.Text>Make reservation</Button.Text>
									</Button.Root>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

interface SelectItemProps {
	children: ReactNode
	value: BookingTimePeriod
}

function SelectItem({ children, value }: SelectItemProps) {
	return (
		<Select.Item
			className="mt-4 grid select-none grid-cols-[26fr_48fr] items-center px-4 -outline-offset-1 first:mt-0"
			value={value}
		>
			<Select.ItemIndicator className="text-beaver">
				<Icon
					className="h-[0.6875rem] w-[0.8125rem] -translate-y-[0.125rem]"
					name="icon-check"
				/>
			</Select.ItemIndicator>
			<Select.ItemText asChild>
				<span className="col-start-2">{children}</span>
			</Select.ItemText>
		</Select.Item>
	)
}
