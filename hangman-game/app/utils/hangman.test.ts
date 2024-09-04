import { expect, test } from 'vitest'
import { type Word } from '#app/utils/alphabet'
import { createSecret, parseWords, type Secret } from '#app/utils/hangman'

test.each<[Secret, Word[]]>([
	[[], []],
	[[null], []],
	[['a'], [['a']]],
	[
		['a', null, 'b'],
		[['a'], ['b']],
	],
	[
		['a', 'b', null, 'c'],
		[['a', 'b'], ['c']],
	],
	[
		['a', 'b', null, 'c', 'd'],
		[
			['a', 'b'],
			['c', 'd'],
		],
	],
])('Parse words: %o -> %o', (secret, expected) => {
	expect(parseWords(secret)).toStrictEqual(expected)
})

test.each<[string, Word[]]>([
	[
		'Game of Thrones',
		[
			['g', 'a', 'm', 'e'],
			['o', 'f'],
			['t', 'h', 'r', 'o', 'n', 'e', 's'],
		],
	],
	[
		'Orange Is the New Black',
		[
			['o', 'r', 'a', 'n', 'g', 'e'],
			['i', 's'],
			['t', 'h', 'e'],
			['n', 'e', 'w'],
			['b', 'l', 'a', 'c', 'k'],
		],
	],
	[
		'The Simpsons',
		[
			['t', 'h', 'e'],
			['s', 'i', 'm', 'p', 's', 'o', 'n', 's'],
		],
	],
	['Succession', [['s', 'u', 'c', 'c', 'e', 's', 's', 'i', 'o', 'n']]],
])('Parse data words: %s -> %o', (secret, expected) => {
	expect(parseWords(createSecret(secret))).toStrictEqual(expected)
})

test.each<[string, Secret]>([
	['', []],
	['a', ['a']],
	['ab', ['a', 'b']],
	['a b', ['a', null, 'b']],
	[
		'The Dark Knight',
		[
			't',
			'h',
			'e',
			null,
			'd',
			'a',
			'r',
			'k',
			null,
			'k',
			'n',
			'i',
			'g',
			'h',
			't',
		],
	],
	[
		"Schindler's List",
		[
			's',
			'c',
			'h',
			'i',
			'n',
			'd',
			'l',
			'e',
			'r',
			's',
			null,
			'l',
			'i',
			's',
			't',
		],
	],
	['Toy Story', ['t', 'o', 'y', null, 's', 't', 'o', 'r', 'y']],
	['Alien', ['a', 'l', 'i', 'e', 'n']],
])('Create secret: %s -> %o', (secret, expected) => {
	expect(createSecret(secret)).toStrictEqual(expected)
})
