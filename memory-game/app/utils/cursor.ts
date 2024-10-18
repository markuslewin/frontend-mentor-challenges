import {
	useState,
	useRef,
	type ComponentPropsWithoutRef,
	type ComponentPropsWithRef,
} from 'react'
import { areEqual, createTable, type Position } from '#app/utils/table'

const initialPosition: Position = [0, 0]

// todo: Implicit dimensions from `getButtonProps` calls?
export function useCursor(columns: number, rows: number) {
	const [_position, setPosition] = useState<Position>(initialPosition)
	const buttonsRef = useRef<(HTMLButtonElement | null)[][]>(
		createTable(columns, rows, null),
	)

	return {
		gridProps: {
			onKeyDown(e) {
				const [x, y] = _position
				if (e.key === 'ArrowUp') {
					const nextY = Math.max(0, y - 1)
					setPosition([x, nextY])
					buttonsRef.current[nextY]![x]!.focus()
				} else if (e.key === 'ArrowRight') {
					const nextX = Math.min(columns - 1, x + 1)
					setPosition([nextX, y])
					buttonsRef.current[y]![nextX]!.focus()
				} else if (e.key === 'ArrowDown') {
					const nextY = Math.min(rows - 1, y + 1)
					setPosition([x, nextY])
					buttonsRef.current[nextY]![x]!.focus()
				} else if (e.key === 'ArrowLeft') {
					const nextX = Math.max(0, x - 1)
					setPosition([nextX, y])
					buttonsRef.current[y]![nextX]!.focus()
				}
			},
		} satisfies ComponentPropsWithoutRef<'div'>,
		getButtonProps(position: Position) {
			const [x, y] = position
			return {
				tabIndex: areEqual(position, _position) ? 0 : -1,
				ref(node) {
					buttonsRef.current[y]![x] = node
				},
			} satisfies ComponentPropsWithRef<'button'>
		},
		reset() {
			setPosition(initialPosition)
		},
	}
}
