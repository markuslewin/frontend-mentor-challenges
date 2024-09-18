import { expect, test } from 'vitest'
import { parseStatus } from '#app/utils/connect-four'

// test('adds 1 + 2 to equal 3', () => {
// 	expect(sum(1, 2)).toBe(3)
// })

type GetWinner = typeof parseStatus

test.each<[Parameters<GetWinner>[0], ReturnType<GetWinner>]>([
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{ type: 'ongoing' },
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['red', 'red', 'red', 'red', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'red',
			counters: [
				[0, 5],
				[1, 5],
				[2, 5],
				[3, 5],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'yellow', 'yellow', 'yellow', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'yellow',
			counters: [
				[0, 5],
				[1, 5],
				[2, 5],
				[3, 5],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['red', 'empty', 'red', 'red', 'empty', 'empty', 'empty'],
		],
		{
			type: 'ongoing',
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'red', 'red', 'red', 'red'],
		],
		{
			type: 'win',
			winner: 'red',
			counters: [
				[3, 5],
				[4, 5],
				[5, 5],
				[6, 5],
			],
		},
	],
	[
		[
			['empty', 'empty', 'red', 'red', 'red', 'red', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'red',
			counters: [
				[2, 0],
				[3, 0],
				[4, 0],
				[5, 0],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'yellow', 'yellow', 'yellow', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'yellow',
			counters: [
				[0, 3],
				[1, 3],
				[2, 3],
				[3, 3],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['red', 'red', 'red', 'red', 'red', 'red', 'red'],
		],
		{
			type: 'win',
			winner: 'red',
			counters: [
				[0, 5],
				[1, 5],
				[2, 5],
				[3, 5],
				[4, 5],
				[5, 5],
				[6, 5],
			],
		},
	],
])('Horizontal wins', (table, expected) => {
	expect(parseStatus(table)).toStrictEqual(expected)
})

test.each<[Parameters<GetWinner>[0], ReturnType<GetWinner>]>([
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{ type: 'ongoing' },
	],
	[
		[
			['red', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['red', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['red', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['red', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'red',
			counters: [
				[0, 0],
				[0, 1],
				[0, 2],
				[0, 3],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['red', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['red', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['red', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['red', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'red',
			counters: [
				[0, 1],
				[0, 2],
				[0, 3],
				[0, 4],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'yellow',
			counters: [
				[0, 1],
				[0, 2],
				[0, 3],
				[0, 4],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'ongoing',
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'yellow',
			counters: [
				[0, 2],
				[0, 3],
				[0, 4],
				[0, 5],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'yellow', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'yellow', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'yellow', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'yellow', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'yellow',
			counters: [
				[2, 1],
				[2, 2],
				[2, 3],
				[2, 4],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'red'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'red'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'red'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'red'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'red',
			counters: [
				[6, 0],
				[6, 1],
				[6, 2],
				[6, 3],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'yellow'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'yellow'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'yellow'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'yellow'],
		],
		{
			type: 'win',
			winner: 'yellow',
			counters: [
				[6, 2],
				[6, 3],
				[6, 4],
				[6, 5],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'red', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'red', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'red', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'red', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'red', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'red', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'red',
			counters: [
				[3, 0],
				[3, 1],
				[3, 2],
				[3, 3],
				[3, 4],
				[3, 5],
			],
		},
	],
])('Vertical wins', (table, expected) => {
	expect(parseStatus(table)).toStrictEqual(expected)
})

test.each<[Parameters<GetWinner>[0], ReturnType<GetWinner>]>([
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{ type: 'ongoing' },
	],
	[
		[
			['red', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'red', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'red', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'red', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'red',
			counters: [
				[0, 0],
				[1, 1],
				[2, 2],
				[3, 3],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'red', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'red', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'red'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'ongoing',
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'yellow', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'yellow', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'yellow', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'yellow'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'yellow',
			counters: [
				[3, 0],
				[4, 1],
				[5, 2],
				[6, 3],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'red', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'red', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'red', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'red'],
		],
		{
			type: 'win',
			winner: 'red',
			counters: [
				[3, 2],
				[4, 3],
				[5, 4],
				[6, 5],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'yellow', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'yellow', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'yellow',
			counters: [
				[0, 2],
				[1, 3],
				[2, 4],
				[3, 5],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'red', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'red', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'red', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['red', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'red',
			counters: [
				[3, 2],
				[2, 3],
				[1, 4],
				[0, 5],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'yellow', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'ongoing',
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'yellow'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'yellow', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'yellow', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'yellow', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'yellow',
			counters: [
				[6, 2],
				[5, 3],
				[4, 4],
				[3, 5],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'red'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'red', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'red', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'red', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'red',
			counters: [
				[6, 0],
				[5, 1],
				[4, 2],
				[3, 3],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'red', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'red', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'red', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'red', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'red', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['red', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'red',
			counters: [
				[5, 0],
				[4, 1],
				[3, 2],
				[2, 3],
				[1, 4],
				[0, 5],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'red', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'red', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'red', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'red', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['red', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
		],
		{
			type: 'ongoing',
		},
	],
	[
		[
			['empty', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'yellow', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'yellow', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'yellow', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'yellow', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'yellow'],
		],
		{
			type: 'win',
			winner: 'yellow',
			counters: [
				[1, 0],
				[2, 1],
				[3, 2],
				[4, 3],
				[5, 4],
				[6, 5],
			],
		},
	],
	[
		[
			['empty', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'yellow', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'yellow', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'yellow', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'yellow'],
		],
		{
			type: 'ongoing',
		},
	],
])('Diagonal wins', (table, expected) => {
	expect(parseStatus(table)).toStrictEqual(expected)
})

test.each<[Parameters<GetWinner>[0], ReturnType<GetWinner>]>([
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'yellow', 'yellow', 'empty', 'empty', 'empty', 'empty'],
			['red', 'red', 'red', 'yellow', 'empty', 'empty', 'empty'],
			['red', 'red', 'red', 'yellow', 'empty', 'empty', 'empty'],
			['red', 'red', 'red', 'yellow', 'empty', 'empty', 'empty'],
		],
		{ type: 'ongoing' },
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'yellow', 'yellow', 'yellow', 'empty', 'empty', 'empty'],
			['red', 'red', 'red', 'yellow', 'empty', 'empty', 'empty'],
			['red', 'red', 'red', 'yellow', 'empty', 'empty', 'empty'],
			['red', 'red', 'red', 'yellow', 'empty', 'empty', 'empty'],
		],
		{
			type: 'win',
			winner: 'yellow',
			counters: [
				[0, 2],
				[1, 2],
				[2, 2],
				[3, 2],
				[3, 3],
				[3, 4],
				[3, 5],
			],
		},
	],
	[
		[
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['empty', 'empty', 'empty', 'red', 'empty', 'empty', 'empty'],
			['yellow', 'empty', 'red', 'red', 'red', 'empty', 'empty'],
			['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
			['red', 'yellow', 'yellow', 'red', 'yellow', 'yellow', 'red'],
		],
		{
			type: 'win',
			winner: 'red',
			counters: [
				[3, 2],
				[3, 3],
				[3, 4],
				[3, 5],
				[4, 3],
				[5, 4],
				[6, 5],
				[2, 3],
				[1, 4],
				[0, 5],
			],
		},
	],
	[
		[
			['red', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['red', 'red', 'empty', 'empty', 'empty', 'empty', 'empty'],
			['yellow', 'yellow', 'red', 'empty', 'empty', 'yellow', 'yellow'],
			['red', 'red', 'yellow', 'red', 'red', 'red', 'red'],
			['yellow', 'yellow', 'red', 'yellow', 'red', 'yellow', 'yellow'],
			['yellow', 'yellow', 'red', 'yellow', 'red', 'yellow', 'yellow'],
		],
		{
			type: 'win',
			winner: 'red',
			counters: [
				[3, 3],
				[4, 3],
				[5, 3],
				[6, 3],
				[0, 0],
				[1, 1],
				[2, 2],
				[4, 4],
			],
		},
	],
])('Mixed wins', (table, expected) => {
	expect(parseStatus(table)).toStrictEqual(expected)
})
