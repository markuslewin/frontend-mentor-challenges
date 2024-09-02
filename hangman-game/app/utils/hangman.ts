import { invariant } from '@epic-web/invariant'
import { z } from 'zod'
// todo: 	Can't type `Object.keys` `as const` array.
//				Would be better to create the data object from an `as const` array,
//				but this requires the data to go from `.json` to `.ts`.
import { categories as secretsByCategory } from '#app/data/data.json'
import { alphabet, type Letter } from '#app/utils/alphabet'

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
	secret: z.string(),
	guesses: z.array(z.enum(alphabet)).transform((val) => new Set(val)),
})

export type State = z.infer<typeof stateSchema>
export type Category = keyof typeof secretsByCategory

export const categories = Object.keys(secretsByCategory)

export function assertIsCategory(value: any): asserts value is Category {
	invariant(categories.includes(value), `Invalid category "${value}"`)
}

export function getState() {
	const item = localStorage.getItem('state')
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
		'state',
		JSON.stringify({ ...state, guesses: [...state.guesses] } satisfies Omit<
			State,
			'guesses'
		> & {
			guesses: SetGeneric<State['guesses']>[]
		}),
	)
}

export function newGame(category: Category) {
	const values = secretsByCategory[category].map((s) => s.name)
	const secret = values[Math.floor(Math.random() * values.length)]
	invariant(typeof secret === 'string', 'Out of range')

	setState({
		category,
		secret,
		guesses: new Set(),
	})
}

export function guess(letter: Letter) {
	const state = getState()
	state.guesses.add(letter)
	setState(state)
}
