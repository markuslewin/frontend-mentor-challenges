import { invariant } from '@epic-web/invariant'
import { z } from 'zod'
// todo: 	Can't type `Object.keys` `as const` array.
//				Would be better to create the data object from an `as const` array,
//				but this requires the data to go from `.json` to `.ts`.
import { categories as secretsByCategory } from '#app/data/data.json'
import {
	alphabetSchema,
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
	playedNames: z.array(z.string()).transform((val) => new Set(val)),
	name: z.string(),
	guesses: alphabetSchema.transform((val) => new Set(val)),
})

export type State = z.infer<typeof stateSchema>
export type SerializableState = Omit<State, 'playedNames' | 'guesses'> & {
	playedNames: SetGeneric<State['playedNames']>[]
	guesses: SetGeneric<State['guesses']>[]
}
export type Category = keyof typeof secretsByCategory

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
			playedNames: [...state.playedNames],
			guesses: [...state.guesses],
		} satisfies SerializableState),
	)
}

export function newGame(category: Category) {
	const name = getRandomName(getNames(category))
	setState({
		category,
		name,
		playedNames: new Set([name]),
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
	const allNames = getNames(state.category)
	const names = allNames.filter((n) => !state.playedNames.has(n))
	if (names.length <= 0) {
		const name = getRandomName(allNames.filter((n) => n !== state.name))
		setState({
			...state,
			name,
			playedNames: new Set([state.name]),
			guesses: new Set(),
		})
	} else {
		const name = getRandomName(names)
		state.playedNames.add(name)
		setState({
			...state,
			name,
			guesses: new Set(),
		})
	}
}

function getNames(category: Category) {
	return secretsByCategory[category].map((s) => s.name)
}

function getRandomName(names: string[]) {
	const name = names[Math.floor(Math.random() * names.length)]
	invariant(typeof name === 'string', 'Out of range')
	return name
}

export type Secret = (Letter | null)[]

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
