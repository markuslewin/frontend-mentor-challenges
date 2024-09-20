import { invariant } from '@epic-web/invariant'
import { useLocalStorage } from '@uidotdev/usehooks'
import { produce } from 'immer'

const colors = ['red', 'yellow'] as const

const counters = [...colors, 'empty'] as const

function assertCounter(value: any): asserts value is Counter {
	invariant(counters.includes(value), `Invalid counter: ${value}`)
}

export type Color = (typeof colors)[number]
export type Counter = (typeof counters)[number]
export type Table = Counter[][]
export type Position = [number, number]
export type Positions = Position[]
export type State = {
	starter: Color
	counters: Table
	score: Record<Color, number>
}
export type Status =
	| { type: 'ongoing' }
	| { type: 'draw' }
	| { type: 'win'; winner: Color; counters: Positions }

export const rows = 6
export const columns = 7

export function createTable<T>(value: T) {
	return Array(rows)
		.fill(undefined)
		.map(() => Array(columns).fill(value)) as T[][]
}

const initialState: State = {
	starter: 'red',
	counters: createTable('empty'),
	score: {
		red: 0,
		yellow: 0,
	},
}

export function useConnectFour() {
	const [state, setState] = useLocalStorage<State>('state', initialState)

	function getColumn(index: number) {
		return state.counters.map((r) => {
			const x = r[index]
			assertCounter(x)
			return x
		})
	}

	const currentColor: Color =
		state.counters.flatMap((r) => r).filter((c) => c !== 'empty').length % 2 ===
		0
			? state.starter
			: getOtherColor(state.starter)
	const status = parseStatus(state.counters)

	return {
		...state,
		currentColor,
		status,
		canMakeMove(index: number) {
			return (
				status.type === 'ongoing' &&
				!getColumn(index).every((c) => c !== 'empty')
			)
		},
		newGame() {
			setState(initialState)
		},
		selectColumn(index: number) {
			if (status.type !== 'ongoing') {
				return
			}
			const bottom = getColumn(index).lastIndexOf('empty')
			if (bottom === -1) {
				return
			}
			setState(
				produce((draft) => {
					const counter = draft.counters[bottom]?.[index]
					assertCounter(counter)
					draft.counters[bottom]![index] = currentColor

					const nextStatus = parseStatus(draft.counters)
					if (nextStatus.type === 'win') {
						++draft.score[nextStatus.winner]
					}
				}),
			)
		},
		playAgain() {
			setState(
				produce((draft) => {
					draft.starter = getOtherColor(state.starter)
					draft.counters = initialState.counters
				}),
			)
		},
	}
}

function getOtherColor(color: Color): Color {
	return (
		{
			red: 'yellow',
			yellow: 'red',
		} satisfies Record<Color, Color>
	)[color]
}

export function parseStatus(table: Table): Status {
	let winner: Color | null = null
	const counters: Positions = []

	// Horizontal wins
	for (let y = 0; y < 6; ++y) {
		for (let x = 0; x < 7 - 3; ++x) {
			const one = x
			const two = x + 1
			const three = x + 2
			const four = x + 3

			for (const color of colors)
				if (
					// @ts-expect-error: What if position doesn't exist?
					[table[y][one], table[y][two], table[y][three], table[y][four]].every(
						(c) => c === color,
					)
				) {
					winner = color
					pushUnique(counters, [one, y])
					pushUnique(counters, [two, y])
					pushUnique(counters, [three, y])
					pushUnique(counters, [four, y])
				}
		}
	}

	// Vertical wins
	for (let y = 0; y < 6 - 3; ++y) {
		for (let x = 0; x < 7; ++x) {
			const one = y
			const two = y + 1
			const three = y + 2
			const four = y + 3

			for (const color of colors) {
				if (
					// @ts-expect-error: What if position doesn't exist?
					[table[one][x], table[two][x], table[three][x], table[four][x]].every(
						(c) => c === color,
					)
				) {
					winner = color
					pushUnique(counters, [x, one])
					pushUnique(counters, [x, two])
					pushUnique(counters, [x, three])
					pushUnique(counters, [x, four])
				}
			}
		}
	}

	// Diagonal wins, top-left to bottom-right
	for (let y = 0; y < 6 - 3; ++y) {
		for (let x = 0; x < 7 - 3; ++x) {
			const oneX = x
			const twoX = x + 1
			const threeX = x + 2
			const fourX = x + 3
			const oneY = y
			const twoY = y + 1
			const threeY = y + 2
			const fourY = y + 3

			for (const color of colors) {
				if (
					[
						// @ts-expect-error: What if position doesn't exist?
						table[oneY][oneX],
						// @ts-expect-error: What if position doesn't exist?
						table[twoY][twoX],
						// @ts-expect-error: What if position doesn't exist?
						table[threeY][threeX],
						// @ts-expect-error: What if position doesn't exist?
						table[fourY][fourX],
					].every((c) => c === color)
				) {
					winner = color
					pushUnique(counters, [oneX, oneY])
					pushUnique(counters, [twoX, twoY])
					pushUnique(counters, [threeX, threeY])
					pushUnique(counters, [fourX, fourY])
				}
			}
		}
	}

	// Diagonal wins, bottom-left to top-right
	for (let y = 0; y < 6 - 3; ++y) {
		for (let x = 0; x < 7 - 3; ++x) {
			const oneX = x + 3
			const twoX = x + 2
			const threeX = x + 1
			const fourX = x
			const oneY = y
			const twoY = y + 1
			const threeY = y + 2
			const fourY = y + 3

			for (const color of colors) {
				if (
					[
						// @ts-expect-error: What if position doesn't exist?
						table[oneY][oneX],
						// @ts-expect-error: What if position doesn't exist?
						table[twoY][twoX],
						// @ts-expect-error: What if position doesn't exist?
						table[threeY][threeX],
						// @ts-expect-error: What if position doesn't exist?
						table[fourY][fourX],
					].every((c) => c === color)
				) {
					winner = color
					pushUnique(counters, [oneX, oneY])
					pushUnique(counters, [twoX, twoY])
					pushUnique(counters, [threeX, threeY])
					pushUnique(counters, [fourX, fourY])
				}
			}
		}
	}

	if (winner === null) {
		return {
			type: 'ongoing',
		}
	} else {
		return {
			type: 'win',
			winner,
			counters,
		}
	}
}

function pushUnique(positions: Positions, value: Position) {
	const found = positions.find((p) => p[0] === value[0] && p[1] === value[1])
	if (found === undefined) {
		positions.push(value)
	}
}
