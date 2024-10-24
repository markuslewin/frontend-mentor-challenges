/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import {
	Game,
	GameOver,
	GameOverDescription,
	GameOverOptions,
	GameOverTitle,
} from '#app/components/game'
import { useGame } from '#app/utils/game'
import '@testing-library/jest-dom/vitest'

vi.mock(import('#app/utils/memory'), async (importOriginal) => {
	return {
		...(await importOriginal()),
		createTiles() {
			return [
				[1, 1, 2, 2],
				[3, 3, 4, 4],
				[5, 5, 6, 6],
				[7, 7, 8, 8],
			]
		},
	} satisfies Awaited<ReturnType<typeof importOriginal>>
})

// Debug tiles
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Tiles() {
	const game = useGame()

	return game.tiles
		.flatMap((r) => r)
		.map((tile, i) => {
			return <p key={i}>{tile}</p>
		})
}

test('displays game over dialog', async () => {
	const title = 'Game over'
	const description = 'Game over description'

	const user = userEvent.setup()

	function TestComponent() {
		const game = useGame()

		return (
			<>
				{Array(4)
					.fill(null)
					.map((_, y) =>
						Array(4)
							.fill(null)
							.map((_, x) => {
								return (
									<button
										key={`${x},${y}`}
										type="button"
										onClick={() => {
											game.selectTile([x, y])
										}}
									>
										selectTile({x}, {y})
									</button>
								)
							}),
					)}
			</>
		)
	}
	render(
		<Game theme="numbers" size="4x4">
			<TestComponent />
			<GameOver>
				<GameOverTitle>{title}</GameOverTitle>
				<GameOverDescription>{description}</GameOverDescription>
				<GameOverOptions />
			</GameOver>
		</Game>,
	)

	expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()

	for (const button of screen.getAllByRole('button')) {
		await user.click(button)
	}

	expect(screen.getByRole('alertdialog')).toHaveAccessibleName(title)
	expect(screen.getByRole('alertdialog')).toHaveAccessibleDescription(
		description,
	)
})

test.todo('game over dialog restarts the game', () => {
	// const onNewGame = vi.fn()
	// const onRestart = vi.fn()
	// <Game
	// 	theme="numbers"
	// 	size="4x4"
	// 	onNewGame={onNewGame}
	// 	onRestart={onRestart}
	// />
	// await user.click(screen.getByRole('button', { name: /restart/i }))
	// expect(onRestart).toHaveBeenCalledOnce()
})
test.todo('game over dialog navigates to new game', () => {
	// await user.click(screen.getByRole('button', { name: /new game/i }))
	// expect(onNewGame).toHaveBeenCalledOnce()
})
test.todo('tile button exposes name on flip')
test.todo('incorrect move auto-flips tiles')
test.todo('tracks score')
