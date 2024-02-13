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
							<h1>Question {loaderData.number} of 10</h1>
							<p>{loaderData.question}</p>
							{/* todo: timer */}
						</div>
						<form method="post">
							{loaderData.options.map((option, i) => {
								return <Option key={i} name={option} />
							})}
							<button type="submit">Submit answer</button>
						</form>
					</>
				)}
			</div>
		</main>
	)
}

function Option({ name }: { name: string }) {
	const id = useId()
	return (
		<div>
			<input type="radio" name="option" value={name} id={id} />
			<label htmlFor={id}>{name}</label>
		</div>
	)
}
