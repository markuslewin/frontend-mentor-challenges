import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { Form, Link, useActionData, useLoaderData } from 'react-router-dom'
import { Icon } from '#app/components/icon'
import * as Landmark from '#app/components/landmark'
import { Img, Picture, Source } from '#app/components/picture'
import { type loader } from '#app/routes/home/routing'
import { media } from '#app/utils/screens'
import { shortenRequestSchema } from '#app/utils/shortener'
import { type IconName } from '@/icon-name'

export function Home() {
	const { urls } = useLoaderData() as ReturnType<typeof loader>
	const lastResult = useActionData() as any
	const [form, fields] = useForm({
		constraint: getZodConstraint(shortenRequestSchema),
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: shortenRequestSchema })
		},
	})

	return (
		<>
			<div className="overflow-hidden pb-40 center-[69.375rem] tablet:pb-[9.5rem]">
				<div className="grid gap-9 tablet:grid-cols-[665fr_445fr] tablet:gap-0">
					<Img
						className="h-[21.0625rem] w-auto min-w-0 max-w-none tablet:order-1 tablet:h-[30.125rem]"
						alt=""
						src="/images/illustration-working.svg"
						width="733"
						height="482"
						priority
					/>
					<div className="grid max-w-[35.625rem] text-center tablet:grid-rows-[61fr_auto_70fr] tablet:text-start">
						<div className="tablet:row-start-2">
							<h1 className="text-very-dark-blue text-h1">
								More than just shorter links
							</h1>
							<p className="text-body-1 mt-4 max-w-[33.75rem] tablet:mt-1">
								Build your brand’s recognition and get detailed insights on how
								your links are performing.
							</p>
							<p className="mt-8 tablet:mt-10">
								<GetStartedButton />
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="bg-whiteish">
				<Landmark.Root className="center-[69.375rem]">
					<Landmark.Label>
						<h2 className="sr-only">Shorten links</h2>
					</Landmark.Label>
					<div className="bg-dark-violet text-white relative isolate -mt-20 overflow-hidden rounded shape-p-6 tablet:-mt-[5.25rem] tablet:shape-px-16 tablet:shape-py-[3.25rem]">
						<Picture>
							<Source
								media={media.tablet}
								srcSet="/images/bg-shorten-desktop.svg"
								width="1110"
								height="168"
							/>
							<Img
								className="absolute inset-0 -z-10 size-full object-cover"
								alt=""
								src="/images/bg-shorten-mobile.svg"
								width="237"
								height="128"
							/>
						</Picture>
						<Form
							{...getFormProps(form)}
							className="grid gap-4 tablet:grid-cols-[1fr_max-content] tablet:gap-6"
							method="post"
						>
							<div>
								<label className="sr-only" htmlFor={fields.url.id}>
									Link:
								</label>
								<input
									{...getInputProps(fields.url, { type: 'url' })}
									className="bg-white placeholder:text-very-dark-blue/50 text-very-dark-blue h-12 w-full rounded text-input shape-px-4 shape-py-[0.375rem] shape-border-[0.1875rem] tablet:h-16 tablet:shape-px-8 tablet:shape-py-[0.875rem]"
									placeholder="Shorten a link here..."
								/>
								<div>
									<p id={fields.url.errorId}>{fields.url.errors}</p>
									<p id={form.errorId}>{form.errors}</p>
								</div>
							</div>
							<button className="bg-cyan hocus:bg-light-cyan text-white inline-grid h-12 items-center whitespace-nowrap rounded text-button transition-colors shape-px-10 tablet:h-16">
								Shorten It!
							</button>
						</Form>
					</div>
					<h3 className="sr-only">Shortened links</h3>
					{/* todo */}
					<ul className="mt-6 grid gap-6 tablet:gap-4" role="list">
						{urls.map((link, i) => (
							<li className="bg-white text-very-dark-blue rounded-sm" key={i}>
								{link}
							</li>
						))}
					</ul>
				</Landmark.Root>
				<div className="center-[69.375rem]">
					<div>
						<div className="mx-auto max-w-[33.75rem] text-center">
							<h2 className="text-h2 text-very-dark-blue mt-20 tablet:mt-[7.5rem]">
								Advanced Statistics
							</h2>
							<p className="text-body-2 mt-4 tablet:mt-[1.125rem]">
								Track how your links are performing across the web with our
								advanced statistics dashboard.
							</p>
						</div>
						<div className="mt-[5.75rem] grid gap-[5.75rem] text-center tablet:mt-[6.25rem] tablet:grid-cols-3 tablet:grid-rows-[2.75rem_2.75rem_auto_2.75rem_2.75rem] tablet:gap-x-[1.875rem] tablet:gap-y-0 tablet:text-start">
							<div className="bg-white text-grayish-violet rounded-sm shape-pb-10 shape-px-8 tablet:col-start-1 tablet:row-span-3">
								<div className="bg-dark-violet text-cyan mx-auto -mt-[2.75rem] grid size-[5.5rem] place-items-center rounded-full border border-[transparent] tablet:mx-0">
									<Icon className="size-10" name="icon-brand-recognition" />
								</div>
								<h3 className="text-very-dark-blue text-h3 mt-8">
									Brand Recognition
								</h3>
								<p className="mt-3">
									Boost your brand recognition with each click. Generic links
									don’t mean a thing. Branded links help instil confidence in
									your content.
								</p>
							</div>
							<div className="bg-white text-grayish-violet rounded-sm shape-pb-10 shape-px-8 tablet:col-start-2 tablet:row-span-3 tablet:row-start-2">
								<div className="bg-dark-violet text-cyan mx-auto -mt-[2.75rem] grid size-[5.5rem] place-items-center rounded-full border border-[transparent] tablet:mx-0">
									<Icon className="size-10" name="icon-detailed-records" />
								</div>
								<h3 className="text-very-dark-blue text-h3 mt-8">
									Detailed Records
								</h3>
								<p className="mt-3">
									Gain insights into who is clicking your links. Knowing when
									and where people engage with your content helps inform better
									decisions.
								</p>
							</div>
							<div className="bg-white text-grayish-violet rounded-sm shape-pb-10 shape-px-8 tablet:col-start-3 tablet:row-span-3 tablet:row-start-3">
								<div className="bg-dark-violet text-cyan mx-auto -mt-[2.75rem] grid size-[5.5rem] place-items-center rounded-full border border-[transparent] tablet:mx-0">
									<Icon className="size-12" name="icon-fully-customizable" />
								</div>
								<h3 className="text-very-dark-blue text-h3 mt-8">
									Fully Customizable
								</h3>
								<p className="mt-3">
									Improve brand awareness and content discoverability through
									customizable links, supercharging audience engagement.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-dark-violet text-white relative isolate mt-20 py-24 text-center tablet:mt-[7.5rem] tablet:py-14">
					<Picture>
						<Source
							media={media.tablet}
							srcSet="/images/bg-boost-desktop.svg"
							width="1440"
							height="250"
						/>
						<Img
							className="absolute inset-0 -z-10 size-full object-cover"
							alt=""
							src="/images/bg-boost-mobile.svg"
							width="375"
							height="300"
						/>
					</Picture>
					<div className="center-[69.375rem]">
						<div>
							<h2 className="text-h2">Boost your links today</h2>
							<p className="mt-4 tablet:mt-8">
								<GetStartedButton />
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

function GetStartedButton() {
	return (
		<Link
			className="bg-cyan hocus:bg-light-cyan text-white inline-grid h-14 items-center whitespace-nowrap rounded-full text-button transition-colors shape-px-10"
			to="#"
		>
			Get Started
		</Link>
	)
}
