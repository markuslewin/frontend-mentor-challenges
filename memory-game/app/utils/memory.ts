import { invariant } from '@epic-web/invariant'
import { z } from 'zod'

export const themes = ['numbers', 'icons'] as const
const themeSchema = z.enum(themes)

export type Theme = z.infer<typeof themeSchema>

function isTheme(val: any): val is Theme {
	return themes.includes(val)
}

export function assertTheme(val: any): asserts val is Theme {
	invariant(isTheme(val), `Invalid theme: ${val}`)
}

export const players = ['1', '2', '3', '4'] as const
const playersSchema = z.enum(players)
export type Players = z.infer<typeof playersSchema>

// todo: sizes
export const grids = ['4x4', '6x6'] as const
const gridSchema = z.enum(grids)
export type Size = z.infer<typeof gridSchema>

export const optionsSchema = z.object({
	theme: themeSchema,
	players: playersSchema,
	grid: gridSchema,
})

export type Options = z.infer<typeof optionsSchema>
