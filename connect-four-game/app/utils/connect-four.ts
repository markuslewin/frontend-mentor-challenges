export type Color = 'red' | 'yellow'
export type Counter = Color | 'empty'
export type Table = Counter[][]
export type Position = [number, number]
export type Positions = Position[]

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
			if (
				// @ts-expect-error: What if position doesn't exist?
				[table[y][one], table[y][two], table[y][three], table[y][four]].every(
					(c) => c === 'red',
				)
			) {
				winner = 'red'
				pushUnique(counters, [one, y])
				pushUnique(counters, [two, y])
				pushUnique(counters, [three, y])
				pushUnique(counters, [four, y])
			} else if (
				// @ts-expect-error: What if position doesn't exist?
				[table[y][x], table[y][x + 1], table[y][x + 2], table[y][x + 3]].every(
					(c) => c === 'yellow',
				)
			) {
				winner = 'yellow'
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
			if (
				// @ts-expect-error: What if position doesn't exist?
				[table[one][x], table[two][x], table[three][x], table[four][x]].every(
					(c) => c === 'red',
				)
			) {
				winner = 'red'
				pushUnique(counters, [x, one])
				pushUnique(counters, [x, two])
				pushUnique(counters, [x, three])
				pushUnique(counters, [x, four])
			} else if (
				// @ts-expect-error: What if position doesn't exist?
				[table[one][x], table[two][x], table[three][x], table[four][x]].every(
					(c) => c === 'yellow',
				)
			) {
				winner = 'yellow'
				pushUnique(counters, [x, one])
				pushUnique(counters, [x, two])
				pushUnique(counters, [x, three])
				pushUnique(counters, [x, four])
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
