import { expect, test } from 'vitest'
import { formatTime } from '#app/utils/format'
import { type AutocompleteEach } from '#app/utils/type'

test.each<AutocompleteEach<typeof formatTime>>([
	[0, '0:00'],
	[999, '0:00'],
	[1000, '0:01'],
	[59 * 1000 + 999, '0:59'],
	[60 * 1000, '1:00'],
	// Up for debate
	[60 * 60 * 1000, '60:00'],
	[100 * 60 * 1000, '100:00'],
])('formatTime(%i) -> %s', (ms, expected) => {
	expect(formatTime(ms)).toBe(expected)
})
