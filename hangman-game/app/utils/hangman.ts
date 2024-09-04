import { invariant } from '@epic-web/invariant'
import { z } from 'zod'
// todo: 	Can't type `Object.keys` `as const` array.
//				Would be better to create the data object from an `as const` array,
//				but this requires the data to go from `.json` to `.ts`.
import { categories as secretsByCategory } from '#app/data/data.json'
import {
	alphabetSchema,
	letterSchema,
	type Word,
	type Letter,
	isLetter,
} from '#app/utils/alphabet'

const stateSchema = z.object({
	category: z.string().transform((val, ctx) => {
		try {
			assertIsCategory(val)
			return val
		} catch {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `Invalid category "${val}"`,
			})
			return z.NEVER
		}
	}),
	secret: z.array(letterSchema.nullable()),
	guesses: alphabetSchema.transform((val) => new Set(val)),
})

export type State = z.infer<typeof stateSchema>
export type SerializableState = Omit<State, 'guesses'> & {
	guesses: SetGeneric<State['guesses']>[]
}
export type Category = keyof typeof secretsByCategory
export type Secret = State['secret']

export const categories = Object.keys(secretsByCategory)

export function assertIsCategory(value: any): asserts value is Category {
	invariant(categories.includes(value), `Invalid category "${value}"`)
}

export const stateKey = 'state'

export function getState() {
	const item = localStorage.getItem(stateKey)
	invariant(typeof item === 'string', 'No state')

	try {
		const state = stateSchema.parse(JSON.parse(item))
		return state
	} catch {
		throw new Error('Invalid state')
	}
}

type SetGeneric<T> = T extends Set<infer U> ? U : never

function setState(state: State) {
	localStorage.setItem(
		stateKey,
		JSON.stringify({
			...state,
			guesses: [...state.guesses],
		} satisfies SerializableState),
	)
}

export function newGame(category: Category) {
	const values = secretsByCategory[category].map((s) => s.name)
	const name = values[Math.floor(Math.random() * values.length)]
	invariant(typeof name === 'string', 'Out of range')

	setState({
		category,
		secret: createSecret(name),
		guesses: new Set(),
	})
}

export function guess(letter: Letter) {
	const state = getState()
	state.guesses.add(letter)
	setState(state)
}

export function playAgain() {
	const state = getState()
	newGame(state.category)
}

export function createSecret(name: string) {
	const secret: Secret = []
	for (const char of name) {
		if (char === ' ') {
			secret.push(null)
		} else {
			const c = char.toLowerCase()
			if (isLetter(c)) {
				secret.push(c)
			} else {
				console.warn(`Create secret: Dropping character "${char}"`)
			}
		}
	}
	return secret
}

export function parseWords(secret: Secret) {
	const words: Word[] = []
	let word: Word = []
	for (const char of secret) {
		if (char === null) {
			if (word.length > 0) {
				words.push(word)
				word = []
			}
		} else {
			word.push(char)
		}
	}
	if (word.length > 0) {
		words.push(word)
	}
	return words
}
