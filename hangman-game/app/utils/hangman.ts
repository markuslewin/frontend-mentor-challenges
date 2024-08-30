import { invariant } from '@epic-web/invariant'
import { z } from 'zod'
import { categories as categoriesData } from '#app/data/data.json'
import { alphabet } from '#app/utils/alphabet'

const stateSchema = z.object({
	secret: z.string(),
	guesses: z.array(z.enum(alphabet)),
})

export type State = z.infer<typeof stateSchema>
export type Category = keyof typeof categoriesData

export const categories = Object.keys(categoriesData) as Category[]

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

export function newGame(category: Category) {
	const values = categoriesData[category].map((v) => v.name)
	const secret = values[Math.floor(Math.random() * values.length)]
	invariant(typeof secret === 'string', 'Out of range')

	localStorage.setItem(
		'state',
		JSON.stringify({
			secret,
			guesses: [],
		} satisfies State),
	)
}
