import { invariantResponse } from '@epic-web/invariant'
import { createCookieSessionStorage, redirect } from '@remix-run/node'
import { z } from 'zod'
import { quizzes } from '#app/data/data.json'

export const quizSessionStorage = createCookieSessionStorage({
	cookie: {
		name: 'en_quiz',
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
		secrets: process.env.SESSION_SECRET.split(','),
		secure: process.env.NODE_ENV === 'production',
	},
})

const OptionSchema = z.object({
	option: z.string(),
})

const QuizSchema = z.discriminatedUnion('type', [
	z.object({
		type: z.literal('question'),
		subject: z.string(),
		index: z.coerce.number(),
	}),
	z.object({
		type: z.literal('review'),
		subject: z.string(),
		index: z.coerce.number(),
		option: z.string(),
	}),
	z.object({
		type: z.literal('complete'),
		subject: z.string(),
		points: z.coerce.number(),
		maxPoints: z.coerce.number(),
	}),
])

export async function getQuizState(request: Request, subject: string) {
	const quizSession = await quizSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const result = QuizSchema.safeParse(quizSession.get('state'))
	if (!result.success || result.data.subject !== subject) {
		return {
			type: 'question',
			subject,
			index: 9,
		} satisfies z.infer<typeof QuizSchema>
	}
	return result.data
}

export async function handleAnswer(request: Request, subject: string) {
	const formData = await request.formData()
	const quizSession = await quizSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const state = await getQuizState(request, subject)

	if (state.type === 'question') {
		const result = OptionSchema.safeParse(Object.fromEntries(formData))
		invariantResponse(result.success, 'Missing option.')
		quizSession.set('state', {
			...state,
			type: 'review',
			option: result.data.option,
		} satisfies z.infer<typeof QuizSchema>)
		return redirect(`/${subject}`, {
			headers: {
				'set-cookie': await quizSessionStorage.commitSession(quizSession),
			},
		})
	}
	if (state.type === 'review') {
		const quiz = quizzes.find(
			q => q.title.toLowerCase() === subject.toLowerCase(),
		)
		invariantResponse(quiz, 'Quiz not found.', { status: 404 })
		if (state.index + 1 === quiz.questions.length) {
			quizSession.set('state', {
				...state,
				type: 'complete',
				points: 8,
				maxPoints: quiz.questions.length,
			} satisfies z.infer<typeof QuizSchema>)
			return redirect(`/${subject}`, {
				headers: {
					'set-cookie': await quizSessionStorage.commitSession(quizSession),
				},
			})
		}
		quizSession.set('state', {
			...state,
			type: 'question',
			index: state.index + 1,
		} satisfies z.infer<typeof QuizSchema>)
		return redirect(`/${subject}`, {
			headers: {
				'set-cookie': await quizSessionStorage.commitSession(quizSession),
			},
		})
	}
	if (state.type === 'complete') {
		quizSession.set('state', {
			type: 'question',
			subject,
			index: 0,
		} satisfies z.infer<typeof QuizSchema>)
		return redirect(`/${subject}`, {
			headers: {
				'set-cookie': await quizSessionStorage.commitSession(quizSession),
			},
		})
	}
}
