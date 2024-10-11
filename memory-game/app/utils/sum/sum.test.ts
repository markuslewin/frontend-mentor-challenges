import { expect, test } from 'vitest'
import { sum } from './sum'

test('adds 1 + 2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3)
})

test.each<Autocomplete<typeof sum>>([
	[1, 1, 2],
	[1, 2, 3],
	[2, 2, 4],
])('sum(%i, %i) -> %i', (a, b, expected) => {
	expect(sum(a, b)).toBe(expected)
})

type Autocomplete<T extends (...args: any) => any> = [
	...Parameters<T>,
	ReturnType<T>,
]
