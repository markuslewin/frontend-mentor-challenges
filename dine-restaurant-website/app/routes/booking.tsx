import {
	getFieldsetProps,
	getFormProps,
	getInputProps,
	useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import * as Select from '@radix-ui/react-select'
import { cx } from 'class-variance-authority'
import { useId, useState } from 'react'
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
import { screens } from '#app/utils/screens'

function useAmountOfPeople() {
	const [value, setValue] = useState(4)

	return {
		value,
		decrement() {
			setValue(Math.max(0, value - 1))
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
		day: z.number({ required_error: 'This field is incomplete' }),
		month: z.number({ required_error: 'This field is incomplete' }),
		year: z.number({ required_error: 'This field is incomplete' }),
	}),
	hour: z.number({ required_error: 'This field is incomplete' }),
	minute: z.number({ required_error: 'This field is incomplete' }),
})

export function Booking() {
	const dateLabelId = useId()
	const timeLabelId = useId()
	const [form, fields] = useForm({
		constraint: getZodConstraint(bookingSchema),
		shouldValidate: 'onBlur',
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: bookingSchema })
		},
		onSubmit(event, { submission }) {
			event.preventDefault()

			if (submission?.status !== 'success') return

			// todo: Check valid date
			console.log('Booking successful!', { data: submission.value })
		},
	})
	const amountOfPeople = useAmountOfPeople()

	const date = fields.date.getFieldset()

	const errors = {
		name: Boolean(fields.name.errors?.length),
		email: Boolean(fields.email.errors?.length),
		date: Boolean(
			date.day.errors?.length ||
				date.month.errors?.length ||
				date.year.errors?.length,
		),
	}

	return (
		<>
			<header>
				<Link to="/">
					<Logo />
				</Link>
			</header>
			{/* todo: Tmp bg */}
			<main className="bg-beaver">
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
						alt=""
						images={[
							{ density: '1x', image: heroBgMobile },
							{ density: '2x', image: heroBgMobile2x },
						]}
					/>
				</Picture>
				<h1>Reservations</h1>
				<p>
					We can’t wait to host you. If you have any special requirements please
					feel free to call on the phone number below. We’ll be happy to
					accommodate you.
				</p>
				<Lines />
				{/* todo: tmp max width */}
				<form
					{...getFormProps(form)}
					className="mx-auto max-w-xl border-[transparent] bg-white text-cod-gray shape-p-12 shape-border"
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
						<p className="text-error mt-3 px-4" id={fields.name.errorId}>
							{fields.name.errors}
						</p>
					</div>
					<div className={cx('', errors.email ? 'text-red' : '')}>
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
						<p className="text-error mt-3 px-4" id={fields.email.errorId}>
							{fields.email.errors}
						</p>
					</div>
					<fieldset
						{...getFieldsetProps(fields.date)}
						className={cx(
							'grid grid-cols-[73fr_73fr_88fr] items-center gap-4 tablet:grid-cols-[155fr_80fr_80fr_97fr]',
							errors.date ? 'text-red' : '',
						)}
						aria-labelledby={dateLabelId}
					>
						<div>
							<p className="col-span-full tablet:col-span-1" id={dateLabelId}>
								Pick a date
							</p>
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
					<fieldset aria-labelledby={timeLabelId}>
						<p id={timeLabelId}>Pick a time</p>
						<label>
							Hour:
							<input type="number" autoComplete="off" />
						</label>
						<label>
							Minute:
							<input type="number" autoComplete="off" />
						</label>
						<label>
							Period:
							<Select.Root defaultValue="am">
								<Select.Trigger>
									<Select.Value />
									<Select.Icon asChild>
										<Icon
											className="h-[0.6875rem] w-[1.125rem]"
											name="icon-arrow"
										/>
									</Select.Icon>
								</Select.Trigger>
								<Select.Portal>
									<Select.Content position="popper">
										<Select.Viewport>
											<Select.Item value="am">
												<Select.ItemText>AM</Select.ItemText>
												<Select.ItemIndicator />
											</Select.Item>
											<Select.Item value="pm">
												<Select.ItemText>PM</Select.ItemText>
												<Select.ItemIndicator />
											</Select.Item>
										</Select.Viewport>
									</Select.Content>
								</Select.Portal>
							</Select.Root>
						</label>
					</fieldset>
					<fieldset>
						<legend>Amount of people</legend>
						<button
							type="button"
							onClick={() => {
								amountOfPeople.decrement()
							}}
						>
							<Icon className="h-[0.1875rem] w-[0.4375rem]" name="icon-minus" />
							Decrement quantity
						</button>
						<span aria-live="assertive">{amountOfPeople.value} people</span>
						<button
							type="button"
							onClick={() => {
								amountOfPeople.increment()
							}}
						>
							<Icon className="h-[0.6875rem] w-[0.625rem]" name="icon-plus" />
							Increment quantity
						</button>
					</fieldset>
					<p>
						<Button.Root className="w-full">
							<Button.Text>Make reservation</Button.Text>
						</Button.Root>
					</p>
				</form>
				<CurveBottomRight />
			</main>
		</>
	)
}
