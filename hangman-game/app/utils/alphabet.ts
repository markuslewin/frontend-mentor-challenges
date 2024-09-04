import { invariant } from '@epic-web/invariant'
import { z } from 'zod'

export const alphabet = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
] as const

export const letterSchema = z.enum(alphabet)
export const alphabetSchema = z.array(letterSchema)

export type Letter = (typeof alphabet)[number]
export type Word = Letter[]

export function isLetter(value: any): value is Letter {
	return alphabet.includes(value)
}

export function assertIsLetter(value: any): asserts value is Letter {
	invariant(isLetter(value), `Invalid letter "${value}"`)
}
