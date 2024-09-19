const colors = ['red', 'yellow'] as const

export type Color = (typeof colors)[number]
export type Counter = Color | 'empty'
export type Table = Counter[][]
export type Position = [number, number]
export type Positions = Position[]
export type State = {
	starter: Color
	counters: Table
	score: Record<Color, number>
}

export const rows = 6
export const columns = 7

export function createTable<T>(value: T) {
	return Array(rows)
		.fill(undefined)
		.map(() => Array(columns).fill(value)) as T[][]
}

export function parseStatus(
	table: Table,
):
	| { type: 'ongoing' }
	| { type: 'draw' }
	| { type: 'win'; winner: Color; counters: Positions } {
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

export type Status = ReturnType<typeof parseStatus>
