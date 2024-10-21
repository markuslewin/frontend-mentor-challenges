export type Table<T> = T[][]

export function createTable<T>(
	columns: number,
	rows: number,
	value: T,
): Table<T> {
	return Array(rows)
		.fill(null)
		.map(() =>
			Array(columns)
				.fill(null)
				.map(() => value),
		)
}

export function getCell<T>(position: Position, table: Table<T>) {
	const [x, y] = position
	return table[y]![x]!
}

export type Position = readonly [number, number]

export function areEqual(a: Position, b: Position) {
	return a[0] === b[0] && a[1] === b[1]
}
