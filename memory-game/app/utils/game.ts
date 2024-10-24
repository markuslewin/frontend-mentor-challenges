import { invariant } from '@epic-web/invariant'
import { createContext, useContext } from 'react'
import { type Cursor } from '#app/utils/cursor'
import { type Size, type Tile } from '#app/utils/memory'
import { type Position, type Table } from '#app/utils/table'

export const GameContext = createContext<{
	isFinished: boolean
	size: Size
	tiles: Table<Tile>
	tileResetKey: boolean
	cursor: Cursor
	newGame(): void
	restart(): void
	selectTile(position: Position): void
	getCanFlip(position: Position): boolean
	getIsFlipped(position: Position): boolean
	getIsHighlighted(position: Position): boolean
} | null>(null)

export function useGame() {
	const value = useContext(GameContext)
	invariant(value !== null, '`useGame` must be used inside of `GameContext`')

	return value
}
