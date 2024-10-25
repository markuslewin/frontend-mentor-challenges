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

test.todo('tracks score')
test.todo('displays multiplayer scoreboard when game is over')
test.todo('tile button exposes name on flip')
test.todo('incorrect move auto-flips tiles')
