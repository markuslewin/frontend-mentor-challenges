import { invariantResponse } from '@epic-web/invariant'
import {
	Form,
	useActionData,
	useLoaderData,
	useNavigation,
} from '@remix-run/react'
import {
	type LoaderFunctionArgs,
	json,
	type ActionFunctionArgs,
} from '@remix-run/server-runtime'
import { forwardRef, useEffect, useId, useRef, useState } from 'react'
import { Progress } from '#app/components/ui/progress'
import { quizzes } from '#app/data/data.json'
import { ThemeSwitch } from '../../components/theme-switcher'
import { Icon } from '../../components/ui/icon'
import { useAnnouncer } from '../../utils/announcer'
import { getQuizState, handleAnswer } from '../../utils/quiz.server'
import { SubjectsSchema, subjects } from '../../utils/subjects/subjects'

export async function loader({ params, request }: LoaderFunctionArgs) {
	const { subject } = params
	const result = SubjectsSchema.safeParse(subject)
	invariantResponse(result.success, 'Subject not found.', { status: 404 })
	const quiz = quizzes.find(q => q.title.toLowerCase() === result.data)
	invariantResponse(quiz, 'Quiz not found.', { status: 404 })
	const state = await getQuizState(request, result.data)
	if (state.type === 'complete') {
		return json({
			subject: result.data,
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
					subject: result.data,
					type: state.type,
					index: state.index,
					questionsLength: quiz.questions.length,
					question: questionData.question,
					options: questionData.options,
				}
			: {
					subject: result.data,
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
	const actionData = useActionData<typeof action>()
	const navigation = useNavigation()
	const { announce } = useAnnouncer()
	const headingRef = useRef<HTMLHeadingElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)
	const buttonDescId = useId()
	const [noValidate, setNoValidate] = useState(false)
	const radioRef = useRef<HTMLInputElement>(null)
	const errorId = useId()

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout>
		if (navigation.state === 'idle') {
			if (loaderData.type === 'review') {
				buttonRef.current?.focus()
			} else {
				if (actionData?.error) {
					radioRef.current?.blur()
					timeoutId = setTimeout(() => {
						radioRef.current?.focus()
					}, 300)
				} else {
					headingRef.current?.focus()
				}
			}
		}
		return () => {
			clearTimeout(timeoutId)
		}
	}, [actionData?.error, loaderData.type, navigation.state])

	useEffect(() => {
		setNoValidate(true)
	}, [])

	return (
		<>
			<header className="py-4 text-[1.125rem] font-medium text-foreground-heading tablet:py-10 tablet:text-heading-s desktop:py-[5.1875rem]">
				<div className="mx-auto box-content flex max-w-default flex-wrap items-center justify-between gap-4 px-6 tablet:px-16">
					{subjects[loaderData.subject].tag}
					<ThemeSwitch />
				</div>
			</header>
			<div className="mt-8 flex-1 tablet:mt-2 desktop:mt-1">
				<main>
					<div className="mx-auto box-content max-w-default px-6 tablet:px-16 desktop:grid desktop:grid-cols-main-desktop desktop:items-start desktop:justify-between desktop:gap-16">
						{loaderData.type === 'complete' ? (
							<>
								<div className="text-[2.5rem] font-light leading-none text-foreground-heading tablet:text-heading-l">
									<h1 ref={headingRef} tabIndex={-1}>
										Quiz completed
									</h1>
									<p className="mt-2 font-medium">You scored...</p>
								</div>
								<div className="mt-10 tablet:mt-16 desktop:mt-0">
									<div className="grid justify-center rounded-xl border-3 border-transparent bg-card p-[calc(2rem-3px)] text-[1.125rem] text-card-foreground-body shadow-default shadow-card-shadow tablet:rounded-3xl tablet:p-[calc(3rem-3px)] tablet:text-body-m">
										<p className="text-[1.125rem] font-medium text-card-foreground tablet:text-heading-s">
											{subjects[loaderData.subject].tag}
										</p>
										<p className="mt-4 text-center tablet:mt-10">
											<strong className="mb-4 block text-[5.5rem] leading-none text-card-foreground tablet:text-display">
												{loaderData.points}
											</strong>{' '}
											out of {loaderData.maxPoints}
										</p>
									</div>
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
								<div className="flex flex-col justify-between desktop:min-h-[28.25rem]">
									<div>
										<h1
											className="text-[0.875rem] italic text-foreground-questionNumber tablet:text-body-s"
											ref={headingRef}
											tabIndex={-1}
										>
											Question {loaderData.index + 1} of{' '}
											{loaderData.questionsLength}
										</h1>
										<p className="mt-3 text-[1.25rem] leading-tight text-foreground-question tablet:mt-7 tablet:text-heading-m">
											{loaderData.question}
										</p>
									</div>
									<Progress
										className="mt-6 tablet:mt-10"
										max={loaderData.questionsLength}
										value={loaderData.index + 1}
										getValueLabel={(value, max) => {
											return `${value} of ${max}`
										}}
									/>
								</div>
								{loaderData.type === 'question' ? (
									<Form
										className="mt-10 tablet:mt-16 desktop:mt-0"
										method="post"
										noValidate={noValidate}
									>
										<fieldset
											aria-required
											aria-invalid={!!actionData?.error}
											aria-describedby={errorId}
										>
											<legend className="sr-only">Choose an answer</legend>
											<div>
												{loaderData.options.map((option, i) => {
													const letter = (['A', 'B', 'C', 'D'] as const)[i]
													return (
														<Option
															key={i}
															letter={letter}
															name={option}
															ref={i === 0 ? radioRef : null}
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
												announce('Submitting answer...')
											}}
										>
											Submit answer
										</button>
										<p
											className="mt-4 grid grid-cols-[max-content_auto] items-center justify-center gap-2 text-[1.125rem] leading-none text-foreground-error tablet:mt-8 tablet:text-body-m"
											id={errorId}
										>
											{actionData?.error ? (
												<>
													<Icon
														className="size-8 text-red forced-color-adjust-auto tablet:size-10"
														name="icon-error"
													/>
													{actionData.error}
												</>
											) : null}
										</p>
									</Form>
								) : (
									<div>
										<ul className="mt-10 tablet:mt-16 desktop:mt-0">
											{loaderData.options.map((option, i) => {
												const letter = (['A', 'B', 'C', 'D'] as const)[i]
												return (
													<li
														className="mt-3 leading-none first:mt-0 tablet:mt-6 tablet:first:mt-0"
														key={i}
													>
														<OptionReview
															letter={letter}
															name={option}
															correct={option === loaderData.answer}
															selected={option === loaderData.option}
														/>
													</li>
												)
											})}
										</ul>
										<Form method="post">
											<button
												className="mt-3 block w-full rounded-xl border-3 border-transparent bg-purple p-[calc(1.1875rem-3px)] text-[1.125rem] capitalize leading-none text-pure-white shadow-default shadow-card-shadow transition-colors hover:bg-[hsl(277_91%_78%)] focus-visible:bg-[hsl(277_91%_78%)] disabled:opacity-50 tablet:mt-8 tablet:rounded-3xl tablet:p-[calc(2rem-3px)] tablet:text-heading-s"
												type="submit"
												ref={buttonRef}
												disabled={navigation.state !== 'idle'}
												aria-describedby={buttonDescId}
												onClick={() => {
													announce('Loading...')
												}}
											>
												Next question
											</button>
											<p className="sr-only" id={buttonDescId}>
												{loaderData.option === loaderData.answer
													? "That's correct!"
													: `That's incorrect. The correct answer was ${loaderData.answer}.`}
											</p>
										</Form>
									</div>
								)}
							</>
						)}
					</div>
				</main>
			</div>
		</>
	)
}

type OptionProps = {
	letter: 'A' | 'B' | 'C' | 'D'
	name: string
}

const Option = forwardRef<HTMLInputElement, OptionProps>(function (
	{ letter, name },
	ref,
) {
	const id = useId()
	const letterContent = {
		A: "before:content-['A']",
		B: "before:content-['B']",
		C: "before:content-['C']",
		D: "before:content-['D']",
	}[letter]
	return (
		<div className="mt-3 leading-none first:mt-0 tablet:mt-6 tablet:first:mt-0">
			<input
				className="peer sr-only"
				type="radio"
				name="option"
				value={name}
				id={id}
				ref={ref}
			/>
			<label
				className={`${letterContent} grid grid-cols-[max-content_1fr] items-center gap-4 rounded-xl border-3 border-transparent bg-card px-[calc(1.25rem-3px)] py-[calc(1.125rem-3px)] text-card-foreground shadow-default shadow-card-shadow transition-colors before:grid before:size-10 before:place-items-center before:rounded-md before:bg-light-grey before:text-[1.125rem] before:font-medium before:text-grey-navy before:transition-colors hover:before:bg-[hsl(278_100%_95%)] hover:before:text-purple peer-checked:border-purple peer-checked:before:bg-purple peer-checked:before:text-pure-white peer-focus-visible:outline tablet:gap-8 tablet:rounded-3xl tablet:before:size-14 tablet:before:rounded-xl tablet:before:text-heading-s desktop:before:rounded-lg forced-colors:peer-checked:border-[SelectedItem]`}
				htmlFor={id}
			>
				{name}
			</label>
		</div>
	)
})

function OptionReview({
	letter,
	name,
	correct,
	selected,
}: {
	letter: 'A' | 'B' | 'C' | 'D'
	name: string
	correct: boolean
	selected: boolean
}) {
	const letterContent = {
		A: "before:content-['A']",
		B: "before:content-['B']",
		C: "before:content-['C']",
		D: "before:content-['D']",
	}[letter]
	return (
		<div>
			{correct ? (
				<p className="sr-only">Correct answer:</p>
			) : selected ? (
				<p className="sr-only">Incorrect answer:</p>
			) : null}
			<p
				className={`${letterContent} grid grid-cols-[max-content_1fr] items-center gap-4 rounded-xl border-3 border-transparent bg-card px-[calc(1.25rem-3px)] py-[calc(1.125rem-3px)] text-card-foreground shadow-default shadow-card-shadow before:grid before:size-10 before:place-items-center before:rounded-md before:bg-light-grey before:text-[1.125rem] before:font-medium before:text-grey-navy data-[correct=true]:grid-cols-[max-content_1fr_max-content] data-[selected=true]:grid-cols-[max-content_1fr_max-content] data-[correct=false]:data-[selected=true]:border-red data-[correct=true]:data-[selected=true]:border-green data-[correct=false]:data-[selected=true]:before:bg-red data-[correct=true]:data-[selected=true]:before:bg-green data-[correct=false]:data-[selected=true]:before:text-pure-white data-[correct=true]:data-[selected=true]:before:text-pure-white tablet:gap-8 tablet:rounded-3xl tablet:before:size-14 tablet:before:rounded-xl tablet:before:text-heading-s desktop:before:rounded-lg`}
				data-correct={correct}
				data-selected={selected}
			>
				{name}
				{correct ? (
					<Icon
						className="size-8 text-green forced-color-adjust-auto"
						name="icon-correct"
					/>
				) : selected ? (
					<Icon
						className="size-8 text-red forced-color-adjust-auto"
						name="icon-incorrect"
					/>
				) : null}
			</p>
		</div>
	)
}
