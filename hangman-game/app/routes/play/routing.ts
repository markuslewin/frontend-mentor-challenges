import { type ActionFunctionArgs, redirect } from 'react-router-dom'
import { z } from 'zod'
import { type AnnouncementHandle } from '#app/components/route-announcer'
import { letterSchema } from '#app/utils/alphabet'
import { getState, guess, playAgain } from '#app/utils/hangman'

export const handle = {
	announcement() {
		return 'Play'
	},
} satisfies AnnouncementHandle

export function loader() {
	try {
		const state = getState()
		return { state }
	} catch {
		throw redirect('/categories')
	}
}

const schema = z.discriminatedUnion('intent', [
	z.object({
		intent: z.literal('guess'),
		data: letterSchema,
	}),
	z.object({
		intent: z.literal('play-again'),
	}),
])

type Schema = z.infer<typeof schema>

type IntentKey = Extract<keyof Schema, 'intent'>
type Intent = Schema[IntentKey]

export function getIntentProps(intent: Intent): {
	name: IntentKey
	value: Intent
} {
	return {
		name: 'intent',
		value: intent,
	}
}

type GuessSchema = Schema extends infer S
	? S extends { [K in IntentKey]: 'guess' }
		? S
		: never
	: never
type DataKey = Extract<keyof GuessSchema, 'data'>
type GuessData = GuessSchema[DataKey]

export function getGuessDataProps(value: GuessData): {
	name: DataKey
	value: GuessData
} {
	return {
		name: 'data',
		value,
	}
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const result = schema.parse(Object.fromEntries(formData))

	if (result.intent === 'guess') {
		guess(result.data)
		return redirect('/play')
	} else if (result.intent === 'play-again') {
		playAgain()
		return redirect('/play')
	}
}
