import { invariantResponse } from '@epic-web/invariant'
import { useActionData, useLoaderData } from '@remix-run/react'
import {
	type LoaderFunctionArgs,
	json,
	type ActionFunctionArgs,
	redirect,
} from '@remix-run/server-runtime'
import { useId } from 'react'
import { z } from 'zod'
import { quizzes } from '#app/data/data.json'
import { Icon } from '../../components/ui/icon'

export function loader({ params }: LoaderFunctionArgs) {
	const { subject } = params
	invariantResponse(subject, 'Missing subject')
	const quiz = quizzes.find(
		q => q.title.toLowerCase() === subject.toLowerCase(),
	)
	invariantResponse(quiz, 'Quiz not found', { status: 404 })
	const questionData = quiz.questions[0]
	return json({
		number: 1,
		question: questionData.question,
		options: questionData.options,
	})
}

const OptionSchema = z.object({
	option: z.string(),
})

export async function action({ request, params }: ActionFunctionArgs) {
	const { subject } = params
	invariantResponse(subject, 'Missing subject')
	const quiz = quizzes.find(
		q => q.title.toLowerCase() === subject.toLowerCase(),
	)
	invariantResponse(quiz, 'Quiz not found', { status: 404 })
	const formData = await request.formData()
	const result = OptionSchema.parse(Object.fromEntries(formData))
	const questionData = quiz.questions[0]
	if (result.option !== questionData.answer) {
		return json({ incorrect: result.option, correct: questionData.answer })
	}
	return redirect(`/${quiz.title.toLowerCase()}`)
}

export default function SubjectRoute() {
	const loaderData = useLoaderData<typeof loader>()
	const actionData = useActionData<typeof action>()
	console.log({ loaderData, actionData })
	const completed = false
	return (
		<main>
			<div className="mx-auto box-content max-w-default px-6 tablet:px-16 desktop:grid desktop:grid-cols-2 desktop:gap-16">
				{completed ? (
					<>
						<h1>Quiz completed</h1>
						<p>You scored...</p>
						<p>{'score'} out of 10</p>
						<form>
							<button type="submit">Play Again</button>
						</form>
					</>
				) : (
					<>
						<div>
							<h1 className="text-[0.875rem] italic text-foreground-questionNumber tablet:text-body-s">
								Question {loaderData.number} of 10
							</h1>
							<p className="mt-3 text-[1.25rem] leading-tight text-foreground-question tablet:mt-7 tablet:text-heading-m">
								{loaderData.question}
							</p>
							{/* todo: timer */}
						</div>
						<form className="mt-10 tablet:mt-16 desktop:mt-0" method="post">
							{loaderData.options.map((option, i) => {
								const letter = (['A', 'B', 'C', 'D'] as const)[i]
								return <Option key={i} letter={letter} name={option} />
							})}
							<button
								className="mt-3 block w-full rounded-xl border-3 border-transparent bg-purple p-[calc(1.1875rem-3px)] text-[1.125rem] capitalize leading-none text-pure-white shadow-default shadow-card-shadow transition-colors hover:bg-[hsl(277_91%_78%)] focus-visible:bg-[hsl(277_91%_78%)] tablet:mt-8 tablet:rounded-3xl tablet:p-[calc(2rem-3px)] tablet:text-heading-s"
								type="submit"
							>
								Submit answer
							</button>
						</form>
					</>
				)}
			</div>
		</main>
	)
}

function Option({
	letter,
	name,
	state,
}: {
	letter: 'A' | 'B' | 'C' | 'D'
	name: string
	state?: 'correct' | 'incorrect'
}) {
	const id = useId()
	const letterContent = {
		A: "before:content-['A']",
		B: "before:content-['B']",
		C: "before:content-['C']",
		D: "before:content-['D']",
	}[letter]
	const stateIcon = {
		correct: (
			<Icon
				className="text-green size-8 forced-color-adjust-auto"
				name="icon-correct"
			/>
		),
		incorrect: (
			<Icon
				className="text-red size-8 forced-color-adjust-auto"
				name="icon-incorrect"
			/>
		),
		default: null,
	}[state ?? 'default']
	return (
		<div className="mt-3 leading-none first:mt-0 tablet:mt-6 tablet:first:mt-0">
			<input
				className="peer sr-only"
				type="radio"
				name="option"
				value={name}
				id={id}
			/>
			<label
				className={`${letterContent} data-[state=correct]:border-green data-[state=incorrect]:before:bg-red data-[state=correct]:before:bg-green data-[state=incorrect]:border-red grid grid-cols-[max-content_1fr] items-center gap-4 rounded-xl border-3 border-transparent bg-card px-[calc(1.25rem-3px)] py-[calc(1.125rem-3px)] text-card-foreground shadow-default shadow-card-shadow transition-colors before:grid before:size-10 before:place-items-center before:rounded-md before:bg-light-grey before:text-[1.125rem] before:font-medium before:text-grey-navy before:transition-colors hover:before:bg-[hsl(278_100%_95%)] hover:before:text-purple peer-checked:border-purple peer-checked:before:bg-purple peer-checked:before:text-pure-white peer-focus-visible:outline data-[state=correct]:grid-cols-[max-content_1fr_max-content] data-[state=incorrect]:grid-cols-[max-content_1fr_max-content] data-[state=correct]:before:text-pure-white data-[state=incorrect]:before:text-pure-white tablet:gap-8 tablet:rounded-3xl tablet:before:size-14 tablet:before:rounded-xl tablet:before:text-heading-s desktop:before:rounded-lg`}
				htmlFor={id}
				data-state={state}
			>
				{name}
				{stateIcon}
			</label>
		</div>
	)
}
