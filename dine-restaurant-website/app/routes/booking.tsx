import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import * as Select from '@radix-ui/react-select'
import { cx } from 'class-variance-authority'
import { useState } from 'react'
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
	email: z.string({ required_error: 'This field is required' }).email(),
	day: z.number(),
	month: z.number(),
	year: z.number(),
	hour: z.number(),
	minute: z.number(),
})

export function Booking() {
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

	const errors = {
		name: Boolean(fields.name.errors?.length),
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
					<div className={cx('group', errors.name ? 'text-red' : '')}>
						<p>
							<label>
								<span className="sr-only">Name:</span>
								<TextField
									{...getInputProps(fields.name, { type: 'text' })}
									className="w-full"
									variant={errors.name ? 'error' : 'normal'}
									placeholder="Name"
									autoComplete="name"
								/>
							</label>
						</p>
						<p className="text-error mt-3 px-4">{fields.name.errors}</p>
					</div>
					<p>
						<label>
							Email:
							<input type="email" autoComplete="email" />
						</label>
					</p>
					<fieldset>
						<legend>Pick a date</legend>
						<label>
							Month:
							<input type="number" autoComplete="off" />
						</label>
						<label>
							Day:
							<input type="number" autoComplete="off" />
						</label>
						<label>
							Year:
							<input type="number" autoComplete="off" />
						</label>
					</fieldset>
					<fieldset>
						<legend>Pick a time</legend>
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
