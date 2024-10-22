import { invariant } from '@epic-web/invariant'
import {
	faFutbolBall,
	faAnchor,
	faFlask,
	faSun,
	faMoon,
	faSnowflake,
	faHandSpock,
	faBug,
	faCar,
	faLiraSign,
	faGhost,
	faCube,
	type IconDefinition,
	faLemon,
	faDragon,
	faFish,
	faAppleWhole,
	faHippo,
	faWorm,
} from '@fortawesome/free-solid-svg-icons'
import { z } from 'zod'
import { createTable, type Table } from '#app/utils/table'
import { type Item } from '#app/utils/type'

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

const icons = [
	'futbol-ball',
	'anchor',
	'flask',
	'sun',
	'moon',
	'snowflake',
	'hand-spock',
	'bug',
	'car',
	'lira-sign',
	'ghost',
	'cube',
	'lemon',
	'dragon',
	'fish',
	'apple',
	'hippo',
	'worm',
] as const
export type IconId = Item<typeof icons>

export const iconsData = {
	'futbol-ball': { name: 'Futbol ball', icon: faFutbolBall },
	anchor: { name: 'Anchor', icon: faAnchor },
	flask: { name: 'Flask', icon: faFlask },
	sun: { name: 'Sun', icon: faSun },
	moon: { name: 'Moon', icon: faMoon },
	snowflake: { name: 'Snowflake', icon: faSnowflake },
	'hand-spock': { name: 'Spock hand', icon: faHandSpock },
	bug: { name: 'Bug', icon: faBug },
	car: { name: 'Car', icon: faCar },
	'lira-sign': { name: 'Lira', icon: faLiraSign },
	ghost: { name: 'Ghost', icon: faGhost },
	cube: { name: 'Cube', icon: faCube },
	lemon: { name: 'Lemon', icon: faLemon },
	dragon: { name: 'Dragon', icon: faDragon },
	fish: { name: 'Fish', icon: faFish },
	apple: { name: 'Apple', icon: faAppleWhole },
	hippo: { name: 'Hippo', icon: faHippo },
	worm: { name: 'Worm', icon: faWorm },
} satisfies Record<IconId, { name: string; icon: IconDefinition }>

const numbers = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
] as const
export type NumberId = Item<typeof numbers>

export function createTiles(columns: number, rows: number, theme: Theme) {
	const variantsCount = (columns * rows) / 2
	let collection = null
	if (theme === 'icons') {
		collection = icons
	} else if (theme === 'numbers') {
		collection = numbers
	} else {
		throw new Error(`Invalid theme: ${theme}`)
	}
	invariant(
		collection.length >= variantsCount,
		'Not enough variants in collection',
	)
	const variants = collection.slice(0, variantsCount)
	const values = [...variants, ...variants]
	const table = createTable<any>(columns, rows, null)
	for (let y = 0; y < rows; ++y) {
		for (let x = 0; x < columns; ++x) {
			table[y]![x] = values.splice(
				Math.floor(Math.random() * values.length),
				1,
			)[0]
		}
	}
	return table as Table<IconId | NumberId>
}

export const sizes = {
	'4x4': { columns: 4, rows: 4 },
	'6x6': { columns: 6, rows: 6 },
} satisfies Record<Size, { columns: number; rows: number }>
