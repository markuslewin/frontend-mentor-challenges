import { invariantResponse } from '@epic-web/invariant'
import { Form, useLoaderData, useNavigation } from '@remix-run/react'
import {
	type LoaderFunctionArgs,
	json,
	type ActionFunctionArgs,
} from '@remix-run/server-runtime'
import { useEffect, useId, useRef } from 'react'
import { quizzes } from '#app/data/data.json'
import { Icon } from '../../components/ui/icon'
import { useAnnouncer } from '../../utils/announcer'
import { getQuizState, handleAnswer } from '../../utils/quiz.server'

export async function loader({ params, request }: LoaderFunctionArgs) {
	const { subject } = params
	invariantResponse(subject, 'Missing subject.')
	const quiz = quizzes.find(
		q => q.title.toLowerCase() === subject.toLowerCase(),
	)
	invariantResponse(quiz, 'Quiz not found.', { status: 404 })
	const state = await getQuizState(request, subject)
	if (state.type === 'complete') {
		return json({
			type: state.type,
			points: state.points,
			maxPoints: state.maxPoints,
		})
	}
	const questionData = quiz.questions[state.index]
	invariantResponse(questionData, 'Question not found.', { status: 404 })
	return json(
		state.type === 'question'
			? {
					type: state.type,
					index: state.index,
					questionsLength: quiz.questions.length,
					question: questionData.question,
					options: questionData.options,
				}
			: {
					type: state.type,
					index: state.index,
					questionsLength: quiz.questions.length,
					question: questionData.question,
					options: questionData.options,
					answer: questionData.answer,
					option: state.option,
				},
	)
}

export async function action({ request, params }: ActionFunctionArgs) {
	const { subject } = params
	invariantResponse(subject, 'Missing subject.')
	return await handleAnswer(request, subject)
}

export default function SubjectRoute() {
	const loaderData = useLoaderData<typeof loader>()
	const navigation = useNavigation()
	const { announce } = useAnnouncer()
	const headingRef = useRef<HTMLHeadingElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		if (navigation.state === 'idle') {
			if (loaderData.type === 'review') {
				buttonRef.current?.focus()
			} else {
				headingRef.current?.focus()
			}
		}
	}, [loaderData.type, navigation.state])

	return (
		<main>
			<div className="mx-auto box-content max-w-default px-6 tablet:px-16 desktop:grid desktop:grid-cols-main-desktop desktop:justify-between desktop:gap-16">
				{loaderData.type === 'complete' ? (
					<>
						<div className="text-[2.5rem] font-light leading-none text-foreground-heading tablet:text-heading-l">
							<h1 ref={headingRef} tabIndex={-1}>
								Quiz completed
							</h1>
							<p className="mt-2 font-medium">You scored...</p>
						</div>
						<div className="text-center">
							<p className="mt-10 rounded-xl bg-card p-8 text-[1.125rem] text-card-foreground-body shadow-default shadow-card-shadow tablet:mt-16 tablet:rounded-3xl tablet:p-12 tablet:text-body-m desktop:mt-0">
								<strong className="mb-4 block text-[5.5rem] leading-none text-card-foreground tablet:text-display">
									{loaderData.points}
								</strong>{' '}
								out of {loaderData.maxPoints}
							</p>
							<Form method="post">
								<button
									className="mt-3 block w-full rounded-xl border-3 border-transparent bg-purple p-[calc(1.1875rem-3px)] text-[1.125rem] capitalize leading-none text-pure-white shadow-default shadow-card-shadow transition-colors hover:bg-[hsl(277_91%_78%)] focus-visible:bg-[hsl(277_91%_78%)] tablet:mt-8 tablet:rounded-3xl tablet:p-[calc(2rem-3px)] tablet:text-heading-s"
									type="submit"
									disabled={navigation.state !== 'idle'}
									onClick={() => {
										announce('Loading quiz...')
									}}
								>
									Play again
								</button>
							</Form>
						</div>
					</>
				) : (
					<>
						<div>
							<h1
								className="text-[0.875rem] italic text-foreground-questionNumber tablet:text-body-s"
								ref={headingRef}
								tabIndex={-1}
							>
								Question {loaderData.index + 1} of {loaderData.questionsLength}
							</h1>
							<p className="mt-3 text-[1.25rem] leading-tight text-foreground-question tablet:mt-7 tablet:text-heading-m">
								{loaderData.question}
							</p>
							{/* todo: timer */}
						</div>
						<Form className="mt-10 tablet:mt-16 desktop:mt-0" method="post">
							<fieldset>
								<legend className="sr-only">Choose an answer</legend>
								<div>
									{loaderData.options.map((option, i) => {
										const letter = (['A', 'B', 'C', 'D'] as const)[i]
										return (
											<Option
												key={i}
												letter={letter}
												name={option}
												state={
													loaderData.type === 'review'
														? option === loaderData.answer
															? 'correct'
															: option === loaderData.option
																? 'incorrect'
																: undefined
														: undefined
												}
											/>
										)
									})}
								</div>
							</fieldset>
							<button
								className="mt-3 block w-full rounded-xl border-3 border-transparent bg-purple p-[calc(1.1875rem-3px)] text-[1.125rem] capitalize leading-none text-pure-white shadow-default shadow-card-shadow transition-colors hover:bg-[hsl(277_91%_78%)] focus-visible:bg-[hsl(277_91%_78%)] disabled:opacity-50 tablet:mt-8 tablet:rounded-3xl tablet:p-[calc(2rem-3px)] tablet:text-heading-s"
								type="submit"
								ref={buttonRef}
								disabled={navigation.state !== 'idle'}
								onClick={() => {
									announce(
										loaderData.type === 'question'
											? 'Submitting answer...'
											: 'Loading...',
									)
								}}
							>
								{loaderData.type === 'question'
									? 'Submit answer'
									: 'Next question'}
							</button>
						</Form>
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
				className="size-8 text-green forced-color-adjust-auto"
				name="icon-correct"
			/>
		),
		incorrect: (
			<Icon
				className="size-8 text-red forced-color-adjust-auto"
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
				className={`${letterContent} grid grid-cols-[max-content_1fr] items-center gap-4 rounded-xl border-3 border-transparent bg-card px-[calc(1.25rem-3px)] py-[calc(1.125rem-3px)] text-card-foreground shadow-default shadow-card-shadow transition-colors before:grid before:size-10 before:place-items-center before:rounded-md before:bg-light-grey before:text-[1.125rem] before:font-medium before:text-grey-navy before:transition-colors hover:before:bg-[hsl(278_100%_95%)] hover:before:text-purple peer-checked:border-purple peer-checked:before:bg-purple peer-checked:before:text-pure-white peer-focus-visible:outline data-[state=correct]:grid-cols-[max-content_1fr_max-content] data-[state=incorrect]:grid-cols-[max-content_1fr_max-content] data-[state=correct]:border-green data-[state=incorrect]:border-red data-[state=correct]:before:bg-green data-[state=incorrect]:before:bg-red data-[state=correct]:before:text-pure-white data-[state=incorrect]:before:text-pure-white tablet:gap-8 tablet:rounded-3xl tablet:before:size-14 tablet:before:rounded-xl tablet:before:text-heading-s desktop:before:rounded-lg`}
				htmlFor={id}
				data-state={state}
			>
				{name}
				{stateIcon}
			</label>
		</div>
	)
}
