import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { Suspense, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import {
	Await,
	useAsyncError,
	useAsyncValue,
	useLoaderData,
} from 'react-router-dom'
import { z } from 'zod'
// @ts-expect-error Search params
import mobileImg from '#app/assets/nattu-adnan-vvHRdOwqHcg-unsplash.jpg?format=webp&w=300&as=metadata'
// @ts-expect-error Search params
import tabletImg from '#app/assets/nattu-adnan-vvHRdOwqHcg-unsplash.jpg?format=webp&w=768&as=metadata'
import { Button } from '#app/components/button'
import { Input } from '#app/components/input'
import * as Landmark from '#app/components/landmark'
import { Picture, Source, Image } from '#app/components/picture'
import { type AnnouncementHandle } from '#app/components/route-announcer'
import { clientEnv } from '#app/utils/env/client'
import { useSubmitInput } from '#app/utils/message'
import { screens } from '#app/utils/screens'
import { type TimeResponse } from '#app/utils/time'

export const handle = {
	announcement() {
		return 'Home'
	},
} satisfies AnnouncementHandle

const FavoriteColorSchema = z.object({
	color: z
		.string({ required_error: 'Color is required' })
		.refine((val) => val.toLowerCase() === 'blue', {
			message: 'Color must be "blue"',
		}),
})

export function Home() {
	return (
		<>
			<h1 className="text-heading-l">My React template</h1>
			<p className="mt-8">This is my React template.</p>
			<h2 className="mt-24 text-heading-m">Mocked API</h2>
			<MockedApi />
			<h2 className="mt-24 text-heading-m">Environment variables</h2>
			<EnvVariables />
			<h2 className="mt-24 text-heading-m">Form validation</h2>
			<FormValidation />
			<h2 className="mt-24 text-heading-m">Optimized image</h2>
			<OptimizedImage />
			<Landmark.Root>
				<Landmark.Label>
					<h2 className="mt-24 text-heading-m">API endpoint</h2>
				</Landmark.Label>
				<ApiEndpoint />
			</Landmark.Root>
		</>
	)
}

function MockedApi() {
	const data = useLoaderData() as { time: TimeResponse }

	return (
		<div className="mt-8">
			<Suspense fallback={<pre>Loading time data...</pre>}>
				<Await resolve={data.time} errorElement={<TimeError />}>
					<TimeResolve />
				</Await>
			</Suspense>
		</div>
	)
}

function TimeResolve() {
	const time = useAsyncValue()

	return <pre>{JSON.stringify(time, undefined, '\t')}</pre>
}

function TimeError() {
	const error = useAsyncError()

	return <pre>{JSON.stringify(error, undefined, '\t')}</pre>
}

function EnvVariables() {
	return (
		<div className="mt-8 grid gap-8">
			<p>Environment variables for the client:</p>
			<pre>{JSON.stringify(clientEnv, undefined, '\t')}</pre>
		</div>
	)
}

function FormValidation() {
	const outputRef = useRef<HTMLParagraphElement>(null)
	const [favoriteColor, setFavoriteColor] = useState('')
	const [form, fields] = useForm({
		constraint: getZodConstraint(FavoriteColorSchema),
		shouldValidate: 'onBlur',
		// shouldRevalidate: "onInput",
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: FavoriteColorSchema })
		},
		onSubmit(event, { submission }) {
			event.preventDefault()

			if (submission?.status !== 'success') return

			flushSync(() => {
				setFavoriteColor(submission.value.color)
			})
			outputRef.current?.focus()
		},
	})

	return (
		<>
			<p className="mt-8">This form is validated with Conform and Zod.</p>
			<form className="mt-8 max-w-sm" {...getFormProps(form)}>
				<div>
					<label className="block" htmlFor={fields.color.id}>
						Favorite color:
					</label>
					<Input {...getInputProps(fields.color, { type: 'text' })} />
					<p className="mt-1 text-error-foreground" id={fields.color.errorId}>
						{fields.color.errors}
					</p>
				</div>
				<Button type="submit">Submit</Button>
			</form>
			<p className="mt-6" ref={outputRef} tabIndex={-1}>
				{favoriteColor
					? `Your favorite color is ${favoriteColor.toLowerCase()}!`
					: null}
			</p>
		</>
	)
}

function OptimizedImage() {
	return (
		<>
			<p className="mt-8">
				The original image was <strong>3.5 MB</strong>, but the following image
				is <strong>163 kB</strong>.
			</p>
			<Picture>
				<Source media={`(min-width: ${screens.tablet})`} image={tabletImg} />
				<Image
					className="mt-6 w-full bg-[hsl(189_90%_31%)]"
					alt="The optimized image"
					image={mobileImg}
				/>
			</Picture>
		</>
	)
}

function ApiEndpoint() {
	const { fetcher, submit } = useSubmitInput()

	return (
		<>
			<p className="mt-8">
				<Button
					type="button"
					aria-disabled={fetcher.state !== 'idle'}
					onClick={() => {
						submit({ input: 'Some data' })
					}}
				>
					Post to serverless function
				</Button>
			</p>
			<pre className="mt-4" data-testid="server-message">
				{fetcher.data === undefined
					? 'Data will be displayed here.'
					: JSON.stringify(fetcher.data, undefined, '\t')}
			</pre>
		</>
	)
}
