import { invariant } from '@epic-web/invariant'
import { type Draft, produce } from 'immer'
import { useRef, useState } from 'react'
import { z } from 'zod'
import { useCounter } from '#app/utils/use-counter'

const colors = ['red', 'yellow'] as const
const colorSchema = z.enum(colors)
export type Color = z.infer<typeof colorSchema>

const counters = [...colors, 'empty'] as const
const counterSchema = z.enum(counters)
export type Counter = z.infer<typeof counterSchema>

const stateSchema = z.object({
	vs: z.enum(['player', 'cpu']),
	starter: colorSchema,
	counters: z.array(z.array(counterSchema)),
	score: z.object({
		red: z.number(),
		yellow: z.number(),
	}),
})
export type State = z.infer<typeof stateSchema>
export type Vs = State['vs']

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
	vs: 'player',
	starter: 'red',
	counters: createTable('empty'),
	score: {
		red: 0,
		yellow: 0,
	},
}

function useGameState() {
	const [state, setState] = useState(() => {
		const state = getLocalStorageState()
		const currentColor = getCurrentColor(state.starter, state.counters)
		if (isCpuTurn(state.vs, currentColor)) {
			// Start in player's turn
			drop('yellow', decide(state.counters), state.counters)
		}
		return state
	})
	const stateRef = useRef(state)

	return {
		// Use for rendering
		value: state,
		// Use in event handlers
		ref: stateRef,
		set(updater: State | ((draft: Draft<State>) => void)) {
			const state =
				typeof updater === 'function'
					? produce(stateRef.current, updater)
					: updater
			stateRef.current = state
			setState(state)
			setLocalStorageState(state)
		},
	}
}

export function useConnectFour() {
	const gameState = useGameState()
	const counter = useCounter(() => {
		resolve({
			type: 'win',
			winner: getOtherColor(
				getCurrentColor(
					gameState.ref.current.starter,
					gameState.ref.current.counters,
				),
			),
			counters: [],
		})
	})
	const playerHasMovedRef = useRef(false)
	const [isCpuThinking, _setIsCpuThinking] = useState(false)
	const isCpuThinkingRef = useRef(isCpuThinking)
	const cpuTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

	function setIsCpuThinking(val: boolean) {
		_setIsCpuThinking(val)
		isCpuThinkingRef.current = val
	}

	function resolve(status: Exclude<Status, { type: 'ongoing' }>) {
		counter.stop()
		clearTimeout(cpuTimeoutRef.current)
		if (status.type === 'win') {
			gameState.set((draft) => {
				++draft.score[status.winner]
			})
		}
	}

	function beforeTurn(state: State) {
		// todo: Remove state, check `gameState`
		const currentColor = getCurrentColor(state.starter, state.counters)
		if (isCpuTurn(state.vs, currentColor)) {
			setTimeout(() => {
				setIsCpuThinking(true)
				cpuTimeoutRef.current = setTimeout(
					() => {
						const color = getCurrentColor(
							gameState.ref.current.starter,
							gameState.ref.current.counters,
						)
						gameState.set((draft) => {
							drop(color, decide(draft.counters), draft.counters)
						})
						const status = parseCounters(gameState.ref.current.counters)
						if (status.type === 'ongoing') {
							counter.reset()
							counter.start()
						} else {
							resolve(status)
						}
						setIsCpuThinking(false)
					},
					getRandomInt(1000, 2000),
				)
			})
		}
	}

	const currentColor = getCurrentColor(
		gameState.value.starter,
		gameState.value.counters,
	)

	const status: Status =
		counter.timeLeft <= 0
			? {
					type: 'win',
					winner: getOtherColor(currentColor),
					counters: [],
				}
			: parseCounters(gameState.value.counters)

	return {
		...gameState.value,
		timeLeft: counter.timeLeft,
		currentColor,
		status,
		canMakeMove(index: number) {
			return (
				status.type === 'ongoing' &&
				!getColumn(index, gameState.value.counters).every(
					(c) => c !== 'empty',
				) &&
				!isCpuThinking
			)
		},
		isWinningCounter(x: number, y: number) {
			return (
				status.type === 'win' &&
				status.counters.find((p) => p[0] === x && p[1] === y) !== undefined
			)
		},
		newGame({ vs }: { vs: Vs }) {
			counter.reset()
			playerHasMovedRef.current = false
			const state = { ...initialState, vs }
			beforeTurn(state)
			gameState.set(state)
		},
		restart() {
			this.newGame({ vs: gameState.ref.current.vs })
		},
		quit() {
			localStorage.removeItem(stateKey)
		},
		selectColumn(columnId: number) {
			if (status.type !== 'ongoing' || isCpuThinkingRef.current) {
				return
			}

			const color = getCurrentColor(
				gameState.ref.current.starter,
				gameState.ref.current.counters,
			)
			gameState.set((draft) => {
				drop(color, columnId, draft.counters)
			})
			const _status = parseCounters(gameState.ref.current.counters)
			if (_status.type === 'ongoing') {
				counter.reset()
				counter.start()
				beforeTurn(gameState.ref.current)
			} else {
				resolve(_status)
			}
			playerHasMovedRef.current = true
		},
		playAgain() {
			counter.reset()
			playerHasMovedRef.current = false
			gameState.set((draft) => {
				draft.starter = getOtherColor(draft.starter)
				draft.counters = initialState.counters
			})
			beforeTurn(gameState.ref.current)
		},
		pause() {
			counter.stop()
		},
		resume() {
			if (status.type === 'ongoing' && playerHasMovedRef.current) {
				counter.start()
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

function isCpuTurn(vs: Vs, currentColor: Color) {
	return vs === 'cpu' && currentColor === 'yellow'
}

function getLocalStorageState() {
	try {
		const item = localStorage.getItem(stateKey)
		invariant(typeof item === 'string', 'Expected string')
		const json = JSON.parse(item)
		return stateSchema.parse(json)
	} catch (e) {
		console.warn('Failed to get state', e)
		return initialState
	}
}

function setLocalStorageState(state: State) {
	localStorage.setItem(stateKey, JSON.stringify(state))
}

export function getColumn(index: number, table: Table) {
	return table.map((r) => {
		const x = r[index]
		assertCounter(x)
		return x
	})
}

function drop(counter: Counter, columnId: number, table: Table) {
	const bottom = getColumn(columnId, table).lastIndexOf('empty')
	invariant(bottom !== -1, 'Column is full')
	table[bottom]![columnId] = counter
}

function decide(table: Table) {
	const possibleCols = Array(columns)
		.fill(undefined)
		.map((_, i) => i)
		.filter((i) => getColumn(i, table).some((c) => c === 'empty'))
	invariant(possibleCols.length > 0, 'No possible columns found')

	const columnId = possibleCols[getRandomInt(0, possibleCols.length)]
	invariant(typeof columnId === 'number', 'Random column out of range')

	return columnId
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

function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min
}
