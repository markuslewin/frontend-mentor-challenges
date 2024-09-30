import { invariant } from '@epic-web/invariant'
import { useLocalStorage } from '@uidotdev/usehooks'
import { produce } from 'immer'
import { useMemo, useRef, useState } from 'react'
import { z } from 'zod'

const colors = ['red', 'yellow'] as const
const colorSchema = z.enum(colors)
export type Color = z.infer<typeof colorSchema>

const counters = [...colors, 'empty'] as const
const counterSchema = z.enum(counters)
export type Counter = z.infer<typeof counterSchema>

const stateSchema = z.object({
	starter: colorSchema,
	counters: z.array(z.array(counterSchema)),
	score: z.object({
		red: z.number(),
		yellow: z.number(),
	}),
})
export type State = z.infer<typeof stateSchema>

function assertCounter(value: any): asserts value is Counter {
	invariant(counters.includes(value), `Invalid counter: ${value}`)
}

export type Table = Counter[][]
export type Position = [number, number]
export type Positions = Position[]
export type Status =
	| { type: 'ongoing' }
	| { type: 'draw' }
	| { type: 'win'; winner: Color; counters: Positions }

export const stateKey = 'state'

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
const initialTimeLeft = 30_000

function useGameState() {
	const [json, setState] = useLocalStorage<unknown>(stateKey, initialState)
	const state = useMemo(() => {
		const result = stateSchema.safeParse(json)
		if (result.success) {
			return result.data
		} else {
			return initialState
		}
	}, [json])

	return [
		state,
		setState as ReturnType<typeof useLocalStorage<State>>[1],
	] as const
}

export function useConnectFour() {
	const [state, setState] = useGameState()
	const [timeLeft, setTimeLeft] = useState(initialTimeLeft)
	const counterRef = useRef<ReturnType<typeof setInterval>>()
	const playerHasMovedRef = useRef(false)

	function getColumn(index: number) {
		return state.counters.map((r) => {
			const x = r[index]
			assertCounter(x)
			return x
		})
	}

	function startCounter(ms: number) {
		stopCounter()
		const turnStart = new Date()
		setTimeLeft(ms)
		counterRef.current = setInterval(() => {
			const freshState = getState()
			const nextTimeLeft = Math.max(
				0,
				ms - (new Date().getTime() - turnStart.getTime()),
			)
			setTimeLeft(nextTimeLeft)
			if (nextTimeLeft === 0) {
				stopCounter()
				const winner = getOtherColor(
					getCurrentColor(freshState.starter, freshState.counters),
				)
				++freshState.score[winner]
				setState(freshState)
			}
		}, 100)
	}

	function stopCounter() {
		clearInterval(counterRef.current)
	}

	function resetCounter() {
		playerHasMovedRef.current = false
		stopCounter()
		setTimeLeft(initialTimeLeft)
	}

	const currentColor = getCurrentColor(state.starter, state.counters)

	const status: Status =
		timeLeft <= 0
			? {
					type: 'win',
					winner: getOtherColor(currentColor),
					counters: [],
				}
			: parseCounters(state.counters)

	return {
		...state,
		timeLeft,
		currentColor,
		status,
		canMakeMove(index: number) {
			return (
				status.type === 'ongoing' &&
				!getColumn(index).every((c) => c !== 'empty')
			)
		},
		isWinningCounter(x: number, y: number) {
			return (
				status.type === 'win' &&
				status.counters.find((p) => p[0] === x && p[1] === y) !== undefined
			)
		},
		newGame() {
			resetCounter()
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

					const nextStatus = parseCounters(draft.counters)
					stopCounter()
					if (nextStatus.type === 'win') {
						++draft.score[nextStatus.winner]
					} else if (nextStatus.type === 'ongoing') {
						startCounter(initialTimeLeft)
					}
				}),
			)
			playerHasMovedRef.current = true
		},
		playAgain() {
			resetCounter()
			setState(
				produce((draft) => {
					draft.starter = getOtherColor(state.starter)
					draft.counters = initialState.counters
				}),
			)
		},
		pause() {
			stopCounter()
		},
		resume() {
			if (status.type === 'ongoing' && playerHasMovedRef.current) {
				startCounter(timeLeft)
			}
		},
	}
}

function getCurrentColor(starter: Color, counters: Table) {
	return counters.flatMap((r) => r).filter((c) => c !== 'empty').length % 2 ===
		0
		? starter
		: getOtherColor(starter)
}

function getOtherColor(color: Color): Color {
	return (
		{
			red: 'yellow',
			yellow: 'red',
		} satisfies Record<Color, Color>
	)[color]
}

function getState() {
	const item = localStorage.getItem(stateKey)
	invariant(typeof item === 'string', 'Expected string')
	const json = JSON.parse(item)
	return stateSchema.parse(json)
}

export function parseCounters(table: Table): Status {
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
		if (!table.flatMap((r) => r).some((c) => c === 'empty')) {
			return {
				type: 'draw',
			}
		} else {
			return {
				type: 'ongoing',
			}
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
