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
			<div className="overflow-hidden center-[69.375rem]">
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
								<Link
									className="bg-cyan hocus:bg-light-cyan text-white inline-grid h-14 items-center whitespace-nowrap rounded-full text-button transition-colors shape-px-10"
									to="#"
								>
									Get Started
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
			<Landmark.Root>
				<Picture>
					<Source
						media={media.tablet}
						srcSet="/images/bg-shorten-desktop.svg"
						width="1110"
						height="168"
					/>
					<Img
						alt=""
						src="/images/bg-shorten-mobile.svg"
						width="237"
						height="128"
					/>
				</Picture>
				<Landmark.Label>
					<h2>Shorten links</h2>
				</Landmark.Label>
				<Form {...getFormProps(form)} method="post">
					<div>
						<label htmlFor={fields.url.id}>Link:</label>
						<input
							{...getInputProps(fields.url, { type: 'url' })}
							placeholder="Shorten a link here..."
						/>
						<p id={fields.url.errorId}>{fields.url.errors}</p>
						<p id={form.errorId}>{form.errors}</p>
					</div>
					<button>Shorten It!</button>
				</Form>
				<h3>Shortened links</h3>
				{/* todo */}
				<ul>
					{urls.map((link, i) => (
						<li key={i}>{link}</li>
					))}
				</ul>
			</Landmark.Root>
			<h2>Advanced Statistics</h2>
			<p>
				Track how your links are performing across the web with our advanced
				statistics dashboard.
			</p>
			<StatCard
				icon="icon-brand-recognition"
				heading="Brand Recognition"
				body="Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content."
			/>
			<StatCard
				icon="icon-detailed-records"
				heading="Detailed Records"
				body="Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions."
			/>
			<StatCard
				icon="icon-fully-customizable"
				heading="Fully Customizable"
				body="Improve brand awareness and content discoverability through customizable links, supercharging audience engagement."
			/>
			<div>
				<Picture>
					<Source
						media={media.tablet}
						srcSet="/images/bg-boost-desktop.svg"
						width="1440"
						height="250"
					/>
					<Img
						alt=""
						src="/images/bg-boost-mobile.svg"
						width="375"
						height="300"
					/>
				</Picture>
				<h2>Boost your links today</h2>
				<p>
					<Link to="#">Get Started</Link>
				</p>
			</div>
		</>
	)
}

interface StatCardProps {
	icon: IconName
	heading: string
	body: string
}

function StatCard({ body, heading, icon }: StatCardProps) {
	return (
		<div>
			<Icon name={icon} />
			<h3>{heading}</h3>
			<p>{body}</p>
		</div>
	)
}
