/**
 * @vitest-environment jsdom
 */
import { render, screen, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { App } from '#app/app'
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

beforeEach(() => {
	// Advance time so that user events can run
	vi.useFakeTimers({ shouldAdvanceTime: true })
})

afterEach(() => {
	vi.useRealTimers()
})

test('displays single-player stats when game is over', async () => {
	const user = userEvent.setup()

	render(<App />)

	vi.setSystemTime('2024-10-25T19:45:00')
	await user.click(screen.getByRole('button', { name: /start/i }))
	const tiles = screen.getAllByRole('button', { name: /tile/i })
	for (const tile of tiles.slice(0, -1)) {
		await user.click(tile)
	}
	vi.setSystemTime('2024-10-25T19:46:53')
	await waitFor(async () =>
		expect(await screen.findByTestId('time')).toHaveTextContent('1:53'),
	)
	await user.click(tiles.slice(-1)[0]!)

	const alert = screen.getByRole('alertdialog')
	const time = within(alert).getByTestId('time')
	const moves = within(alert).getByTestId('moves')

	expect(time).toHaveTextContent('1:53')
	expect(moves).toHaveTextContent('8')
})

test('tracks multiplayer scores', async () => {
	const user = userEvent.setup()

	render(<App />)

	await user.click(
		within(screen.getByRole('group', { name: /players/i })).getByRole('radio', {
			name: '4',
		}),
	)
	await user.click(screen.getByRole('button', { name: /start/i }))
	const tiles = screen.getAllByRole('button', { name: /tile/i })

	// P1 correct
	await user.click(tiles[0]!)
	await user.click(tiles[1]!)
	// P2 incorrect
	await user.click(tiles[2]!)
	await user.click(tiles[4]!)
	// P3 correct
	await user.click(tiles[3]!)
	await user.click(tiles[2]!)
	// P4 incorrect
	await user.click(tiles[4]!)
	await user.click(tiles[6]!)
	// P1 correct
	await user.click(tiles[5]!)
	await user.click(tiles[4]!)
	// P2 incorrect
	await user.click(tiles[6]!)
	await user.click(tiles[10]!)
	// P3 correct
	await user.click(tiles[8]!)
	await user.click(tiles[9]!)
	// P4 correct
	await user.click(tiles[10]!)
	await user.click(tiles[11]!)
	// P1 correct
	await user.click(tiles[12]!)
	await user.click(tiles[13]!)
	// P2 incorrect
	await user.click(tiles[6]!)
	await user.click(tiles[14]!)
	// P3 correct
	await user.click(tiles[7]!)
	await user.click(tiles[6]!)
	// P4 ...
	await user.click(tiles[14]!)

	const scores = within(
		screen.getByRole('region', { name: /score/i }),
	).getAllByTestId('player')
	expect(scores[0]).toHaveTextContent('Player 1: 3')
	expect(scores[1]).toHaveTextContent('Player 2: 0')
	expect(scores[2]).toHaveTextContent('Player 3: 3')
	expect(scores[3]).toHaveTextContent('Player 4: 1')

	// P4 correct
	await user.click(tiles[15]!)

	const dialog = screen.getByRole('alertdialog')
	const results = within(dialog).getAllByRole('listitem')
	expect(results[0]).toHaveTextContent('Player 1: 3')
	expect(results[1]).toHaveTextContent('Player 3: 3')
	expect(results[2]).toHaveTextContent('Player 4: 2')
	expect(results[3]).toHaveTextContent('Player 2: 0')
})

test.todo('tile button exposes name on flip')
test.todo('incorrect move auto-flips tiles')
