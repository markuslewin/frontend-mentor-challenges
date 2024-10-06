import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'
import {
	createTable,
	type Table,
	type State,
	stateKey,
} from '#app/utils/connect-four'

test('has rules', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('link', { name: 'rules' }).click()

	await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(
		/rules/i,
	)

	await page.getByRole('link', { name: 'main menu' }).click()

	await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName(
		/connect four/i,
	)
})

test('keeps score', async ({ page }) => {
	await page.goto('/play')

	await expect(page.getByTestId('score-red')).toHaveText('0')
	await expect(page.getByTestId('score-yellow')).toHaveText('0')

	await page.goto('/')
	await page.evaluate(
		async ([stateKey]) => {
			localStorage.setItem(
				stateKey,
				JSON.stringify({
					vs: 'player',
					starter: 'red',
					counters: [
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
					],
					score: { red: 1, yellow: 2 },
				} satisfies State),
			)
		},
		[stateKey] as const,
	)
	await page.goto('/play')

	await expect(page.getByTestId('score-red')).toHaveText('1')
	await expect(page.getByTestId('score-yellow')).toHaveText('2')

	await page.getByTestId('0,2').click()

	await expect(page.getByTestId('score-red')).toHaveText('2')
	await expect(page.getByTestId('score-yellow')).toHaveText('2')

	await page.goto('/')
	await page.evaluate(
		async ([stateKey]) => {
			localStorage.setItem(
				stateKey,
				JSON.stringify({
					vs: 'player',
					starter: 'red',
					counters: [
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'yellow', 'red', 'empty', 'empty', 'empty', 'empty'],
					],
					score: { red: 2, yellow: 2 },
				} satisfies State),
			)
		},
		[stateKey] as const,
	)
	await page.goto('/play')

	await expect(page.getByTestId('score-red')).toHaveText('2')
	await expect(page.getByTestId('score-yellow')).toHaveText('2')

	await page.getByTestId('1,0').click()

	await expect(page.getByTestId('score-red')).toHaveText('2')
	await expect(page.getByTestId('score-yellow')).toHaveText('3')

	await page.goto('/')
	await page.evaluate(
		async ([stateKey]) => {
			localStorage.setItem(
				stateKey,
				JSON.stringify({
					vs: 'player',
					starter: 'red',
					counters: [
						['empty', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
						['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
						['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'yellow'],
						['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'red'],
						['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
						['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
					],
					score: { red: 2, yellow: 3 },
				} satisfies State),
			)
		},
		[stateKey] as const,
	)
	await page.goto('/play')

	await expect(page.getByTestId('score-red')).toHaveText('2')
	await expect(page.getByTestId('score-yellow')).toHaveText('3')

	await page.getByTestId('0,0').click()

	await expect(page.getByTestId('score-red')).toHaveText('2')
	await expect(page.getByTestId('score-yellow')).toHaveText('3')
})

test('has correct initial state', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('button', { name: 'play vs player' }).click()

	await expect(page.getByTestId('score-red')).toHaveText('0')
	await expect(page.getByTestId('score-yellow')).toHaveText('0')
	await expect(page.getByRole('grid').getByRole('button')).toHaveText(
		Array(42).fill('Empty'),
	)
	await expect(page.getByTestId('turn')).toHaveText('Player 1’s turn')
	await expect(page.getByTestId('timer')).toHaveText('30s')
})

test('alternates starter', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(
		async ([stateKey]) => {
			localStorage.setItem(
				stateKey,
				JSON.stringify({
					vs: 'player',
					starter: 'red',
					counters: [
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
					],
					score: { red: 0, yellow: 0 },
				} satisfies State),
			)
		},
		[stateKey] as const,
	)
	await page.goto('/play')

	await expect(page.getByTestId('turn')).toHaveText('Player 1’s turn')

	await page.getByTestId('0,0').click()
	await page.getByRole('button', { name: 'play again' }).click()

	await expect(page.getByTestId('turn')).toHaveText('Player 2’s turn')

	// todo: Check timer win
})

test('resets game', async ({ page }) => {
	await page.clock.install({ time: new Date('2024-09-20T15:45:00') })
	await page.goto('/')
	await page.evaluate(
		async ([stateKey]) => {
			localStorage.setItem(
				stateKey,
				JSON.stringify({
					vs: 'player',
					starter: 'red',
					counters: [
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
					],
					score: { red: 10, yellow: 20 },
				} satisfies State),
			)
		},
		[stateKey] as const,
	)
	await page.goto('/play')
	await page.getByTestId('0,0').click()
	await page.clock.fastForward(5_000)
	await page.goto('/')
	await page.getByRole('button', { name: 'play vs player' }).click()

	await expect(page.getByRole('grid').getByRole('button')).toHaveText(
		Array(42).fill(/empty/i),
		// todo: These tests are getting slow in `env.DEV`
		{ timeout: 10_000 },
	)
	await expect(page.getByTestId('score-red')).toHaveText('0')
	await expect(page.getByTestId('score-yellow')).toHaveText('0')
	await expect(page.getByTestId('timer')).toHaveText('30s')

	await page.clock.fastForward(5_000)

	await expect(page.getByTestId('timer')).toHaveText('30s')
})

test('restarts game from header', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(
		async ([stateKey]) => {
			localStorage.setItem(
				stateKey,
				JSON.stringify({
					vs: 'player',
					starter: 'red',
					counters: [
						['empty', 'empty', 'yellow', 'red', 'yellow', 'red', 'yellow'],
						['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
						['yellow', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
						['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'red'],
						['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
						['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
					],
					score: { red: 12, yellow: 34 },
				} satisfies State),
			)
		},
		[stateKey] as const,
	)
	await page.goto('/play')
	await page
		.getByRole('banner')
		.getByRole('button', { name: 'restart' })
		.click()

	await expect(page.getByTestId('score-red')).toHaveText('0')
	await expect(page.getByTestId('score-yellow')).toHaveText('0')
	await expect(page.getByRole('grid').getByRole('button')).toHaveText(
		Array(42).fill(/empty/i),
	)
	await expect(page.getByTestId('timer')).toHaveText('30s')
})

test('restarts game from menu', async ({ page }) => {
	await page.clock.install({ time: new Date('2024-09-20T15:45:00') })
	await page.goto('/')
	await page.evaluate(
		async ([stateKey]) => {
			localStorage.setItem(
				stateKey,
				JSON.stringify({
					vs: 'player',
					starter: 'red',
					counters: [
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'yellow'],
						['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'red'],
						['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
						['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
					],
					score: { red: 43, yellow: 21 },
				} satisfies State),
			)
		},
		[stateKey] as const,
	)
	await page.goto('/play')
	await page.getByTestId('1,0').click()
	await page.clock.fastForward(5_000)
	await page.getByRole('banner').getByRole('button', { name: 'menu' }).click()
	await page
		.getByRole('dialog', { name: 'pause' })
		.getByRole('button', { name: 'restart' })
		.click()

	await expect(page.getByRole('dialog', { name: 'pause' })).not.toBeAttached()
	await expect(page.getByTestId('score-red')).toHaveText('0')
	await expect(page.getByTestId('score-yellow')).toHaveText('0')
	await expect(page.getByRole('grid').getByRole('button')).toHaveText(
		Array(42).fill(/empty/i),
	)
	await expect(page.getByTestId('timer')).toHaveText('30s')

	await page.clock.fastForward(5_000)

	await expect(page.getByTestId('timer')).toHaveText('30s')
})

test('quits game', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(
		async ([stateKey]) => {
			localStorage.setItem(
				stateKey,
				JSON.stringify({
					vs: 'player',
					starter: 'red',
					counters: [
						['empty', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
						['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
						['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
						['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
						['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
						['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
					],
					score: { red: 11, yellow: 22 },
				} satisfies State),
			)
		},
		[stateKey] as const,
	)
	await page.goto('/play')
	await page.getByRole('banner').getByRole('button', { name: 'menu' }).click()
	await page
		.getByRole('dialog', { name: 'pause' })
		.getByRole('button', { name: 'quit' })
		.click()

	expect(new URL(page.url()).pathname).toBe('/')

	await page.goto('/play')

	await expect(page.getByTestId('score-red')).toHaveText('0')
	await expect(page.getByTestId('score-yellow')).toHaveText('0')
	await expect(page.getByRole('grid').getByRole('button')).toHaveText(
		Array(42).fill(/empty/i),
	)
})

test('plays again', async ({ page }) => {
	await page.clock.install({ time: new Date('2024-09-20T15:45:00') })
	await page.goto('/')
	await page.evaluate(
		async ([stateKey]) => {
			localStorage.setItem(
				stateKey,
				JSON.stringify({
					vs: 'player',
					starter: 'red',
					counters: [
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['yellow', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'red', 'red', 'empty', 'empty', 'empty', 'empty'],
					],
					score: { red: 0, yellow: 0 },
				} satisfies State),
			)
		},
		[stateKey] as const,
	)
	await page.goto('/play')
	await page.getByTestId('0,0').click()
	await page.getByTestId('0,0').click()
	await page.clock.fastForward(5_000)
	await page.getByTestId('3,0').click()
	await page.getByRole('button', { name: 'play again' }).click()

	await expect(page.getByRole('grid').getByRole('button')).toHaveText(
		Array(42).fill(/empty/i),
	)
	await expect(page.getByTestId('timer')).toHaveText('30s')

	await page.clock.fastForward(5_000)

	await expect(page.getByTestId('timer')).toHaveText('30s')
})

test('drops counter', async ({ page }) => {
	const counters: Table = createTable('empty')

	await page.goto('/play')
	await page.getByTestId('0,0').click()
	counters[5]![0] = 'red'
	await page.getByTestId('1,0').click()
	counters[5]![1] = 'yellow'
	await page.getByTestId('2,1').click()
	counters[5]![2] = 'red'
	await page.getByTestId('3,3').click()
	counters[5]![3] = 'yellow'
	await page.getByTestId('4,5').click()
	counters[5]![4] = 'red'
	await page.getByTestId('0,5').click({ clickCount: 5 })
	counters[4]![0] = 'yellow'
	counters[3]![0] = 'red'
	counters[2]![0] = 'yellow'
	counters[1]![0] = 'red'
	counters[0]![0] = 'yellow'
	// Shouldn't change anything. Force click, because button is disabled
	await page.getByTestId('0,5').click({ force: true })

	await expect(page.getByRole('grid').getByRole('button')).toHaveText(
		counters.flatMap((r) => r.map((c) => new RegExp(c, 'i'))),
	)
})

test("doesn't allow moves when game is finished", async ({ page }) => {
	await page.goto('/')
	const counters = await page.evaluate(
		async ([stateKey]) => {
			const counters: Table = [
				['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
				['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
				['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
				['empty', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
				['yellow', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
				['red', 'red', 'red', 'empty', 'empty', 'empty', 'empty'],
			]

			localStorage.setItem(
				stateKey,
				JSON.stringify({
					vs: 'player',
					starter: 'red',
					counters,
					score: { red: 0, yellow: 0 },
				} satisfies State),
			)

			return counters
		},
		[stateKey] as const,
	)
	await page.goto('/play')
	await page.getByTestId('3,0').click()
	counters[5]![3] = 'red'

	await expect(
		page.getByRole('grid').getByRole('button', { disabled: true }),
	).toHaveCount(42)

	// Shouldn't change anything
	await page.getByTestId('0,0').click({ force: true })
	await page.getByTestId('1,1').click({ force: true })
	await page.getByTestId('2,2').click({ force: true })
	await page.getByTestId('3,3').click({ force: true })
	await page.getByTestId('4,4').click({ force: true })
	await page.getByTestId('5,5').click({ force: true })

	await expect(page.getByRole('grid').getByRole('button')).toHaveText(
		counters.flatMap((r) => r.map((c) => new RegExp(c, 'i'))),
	)
})

test('announces player 1 win', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(
		async ([stateKey]) => {
			localStorage.setItem(
				stateKey,
				JSON.stringify({
					vs: 'player',
					starter: 'red',
					counters: [
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['yellow', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'red', 'red', 'empty', 'empty', 'empty', 'empty'],
					],
					score: { red: 0, yellow: 0 },
				} satisfies State),
			)
		},
		[stateKey] as const,
	)
	await page.goto('/play')
	await page.getByTestId('3,0').click()

	await expect(page.getByTestId('outcome')).toContainText(/player 1/i)
	await expect(page.getByTestId('outcome')).toContainText(/wins/i)
})

test('announces player 2 win', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(
		async ([stateKey]) => {
			localStorage.setItem(
				stateKey,
				JSON.stringify({
					vs: 'player',
					starter: 'red',
					counters: [
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['yellow', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'red', 'red', 'empty', 'empty', 'empty', 'empty'],
					],
					score: { red: 0, yellow: 0 },
				} satisfies State),
			)
		},
		[stateKey] as const,
	)
	await page.goto('/play')
	await page.getByTestId('1,0').click()

	await expect(page.getByTestId('outcome')).toContainText(/player 2/i)
	await expect(page.getByTestId('outcome')).toContainText(/wins/i)
})

test('announces draw', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(
		async ([stateKey]) => {
			localStorage.setItem(
				stateKey,
				JSON.stringify({
					vs: 'player',
					starter: 'red',
					counters: [
						['empty', 'red', 'yellow', 'yellow', 'red', 'yellow', 'red'],
						['red', 'yellow', 'red', 'red', 'yellow', 'red', 'yellow'],
						['yellow', 'red', 'yellow', 'yellow', 'yellow', 'red', 'red'],
						['yellow', 'yellow', 'red', 'red', 'red', 'yellow', 'red'],
						['red', 'red', 'red', 'yellow', 'red', 'yellow', 'yellow'],
						['yellow', 'yellow', 'yellow', 'red', 'yellow', 'red', 'red'],
					],
					score: { red: 0, yellow: 0 },
				} satisfies State),
			)
		},
		[stateKey] as const,
	)
	await page.goto('/play')
	await page.getByTestId('0,0').click()

	await expect(page.getByTestId('outcome')).toContainText(/draw/i)
})

test('turn has time limit', async ({ page }) => {
	await page.clock.install({ time: new Date('2024-09-20T15:45:00') })
	await page.goto('/play')

	await expect(page.getByTestId('timer')).toHaveText('30s')

	await page.clock.fastForward(5_000)

	await expect(page.getByTestId('timer')).toHaveText('30s')

	await page.getByTestId('0,0').click()

	await expect(page.getByTestId('timer')).toHaveText('30s')

	await page.clock.fastForward(5_000)

	await expect(page.getByTestId('timer')).toHaveText('25s')

	await page.clock.fastForward(25_000)

	await expect(page.getByTestId('outcome')).toHaveText(/player 1 wins/i)
	await expect(page.getByTestId('score-red')).toHaveText('1')
	await expect(page.getByTestId('score-yellow')).toHaveText('0')
})

test('resets timer between turns', async ({ page }) => {
	await page.clock.install({ time: new Date('2024-09-20T15:45:00') })

	await page.goto('/play')
	await page.getByTestId('0,0').click()

	await expect(page.getByTestId('timer')).toHaveText('30s')

	await page.clock.fastForward(5_000)

	await expect(page.getByTestId('timer')).toHaveText('25s')

	await page.getByTestId('0,0').click()

	await expect(page.getByTestId('timer')).toHaveText('30s')

	await page.clock.fastForward(5_000)

	await expect(page.getByTestId('timer')).toHaveText('25s')

	await page.getByTestId('0,0').click()

	await expect(page.getByTestId('timer')).toHaveText('30s')

	await page.clock.fastForward(5_000)

	await expect(page.getByTestId('timer')).toHaveText('25s')
})

test('pauses game', async ({ page }) => {
	await page.clock.install({ time: new Date('2024-09-30T15:04:00') })
	await page.goto('/play')
	await page.getByTestId('0,0').click()
	await page.getByRole('button', { name: 'menu' }).click()
	await page.clock.fastForward(10_000)
	await page.getByRole('button', { name: 'continue' }).click()

	await expect(page.getByTestId('timer')).toHaveText('30s')
})

test("counter doesn't start in resolved game status", async ({ page }) => {
	await page.clock.install({ time: new Date('2024-09-30T15:04:00') })
	await page.goto('/play')
	await page.getByTestId('0,0').click()
	// Win by time
	await page.clock.fastForward(30_000)
	await page.clock.runFor(1_000)
	await page.getByRole('button', { name: 'menu' }).click()
	// Shouldn't trigger an instant win
	await page.getByRole('button', { name: 'continue' }).click()
	await page.clock.runFor(1_000)

	await expect(page.getByTestId('score-red')).toHaveText('1')
	await expect(page.getByTestId('score-yellow')).toHaveText('0')
})

test("counter doesn't start until player has made a move", async ({ page }) => {
	await page.clock.install({ time: new Date('2024-09-30T15:04:00') })
	await page.goto('/play')
	await page.getByRole('button', { name: 'menu' }).click()
	await page.getByRole('button', { name: 'continue' }).click()
	await page.clock.fastForward(5_000)

	await expect(page.getByTestId('timer')).toHaveText('30s')

	await page.getByTestId('0,0').click()
	await page.getByRole('button', { name: 'restart' }).click()
	await page.getByRole('button', { name: 'menu' }).click()
	await page.getByRole('button', { name: 'continue' }).click()
	await page.clock.fastForward(5_000)

	await expect(page.getByTestId('timer')).toHaveText('30s')

	await page.getByTestId('0,0').click()
	await page.getByRole('button', { name: 'menu' }).click()
	await page.getByRole('button', { name: 'restart' }).click()
	await page.getByRole('button', { name: 'menu' }).click()
	await page.getByRole('button', { name: 'continue' }).click()
	await page.clock.fastForward(5_000)
})

test('counter resumes when dialog closes', async ({ page }) => {
	await page.clock.install({ time: new Date('2024-09-30T15:04:00') })
	await page.goto('/play')
	await page.getByTestId('0,0').click()
	await page.getByRole('button', { name: 'menu' }).click()
	await page.getByRole('button', { name: 'continue' }).click()
	await page.clock.fastForward(5_000)

	await expect(page.getByTestId('timer')).toHaveText('25s')

	await page.getByRole('button', { name: 'menu' }).click()
	await page.keyboard.down('Escape')
	await page.clock.fastForward(5_000)

	await expect(page.getByTestId('timer')).toHaveText('20s')

	await page.getByRole('button', { name: 'menu' }).click()
	// Close the dialog by clicking outside
	await page.mouse.click(0, 0)
	await page.clock.fastForward(5_000)

	await expect(page.getByTestId('timer')).toHaveText('15s')
})

test('shows winning counters', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(
		async ([stateKey]) => {
			localStorage.setItem(
				stateKey,
				JSON.stringify({
					vs: 'player',
					starter: 'red',
					counters: [
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'yellow', 'empty', 'empty', 'empty', 'empty', 'empty'],
						['red', 'yellow', 'empty', 'empty', 'yellow', 'empty', 'empty'],
						['red', 'red', 'empty', 'empty', 'yellow', 'empty', 'empty'],
					],
					score: { red: 0, yellow: 0 },
				} satisfies State),
			)
		},
		[stateKey] as const,
	)
	await page.goto('/play')

	await expect(page.getByTestId('0,0')).not.toHaveAccessibleDescription(
		/winning/i,
	)
	await expect(page.getByTestId('0,1')).not.toHaveAccessibleDescription(
		/winning/i,
	)
	await expect(page.getByTestId('0,2')).toHaveAccessibleDescription(/winning/i)
	await expect(page.getByTestId('0,3')).toHaveAccessibleDescription(/winning/i)
	await expect(page.getByTestId('0,4')).toHaveAccessibleDescription(/winning/i)
	await expect(page.getByTestId('0,5')).toHaveAccessibleDescription(/winning/i)
	await expect(page.getByTestId('1,0')).not.toHaveAccessibleDescription(
		/winning/i,
	)
	await expect(page.getByTestId('1,1')).not.toHaveAccessibleDescription(
		/winning/i,
	)
	await expect(page.getByTestId('1,2')).not.toHaveAccessibleDescription(
		/winning/i,
	)
	await expect(page.getByTestId('1,3')).not.toHaveAccessibleDescription(
		/winning/i,
	)
	await expect(page.getByTestId('1,4')).not.toHaveAccessibleDescription(
		/winning/i,
	)
	await expect(page.getByTestId('1,5')).not.toHaveAccessibleDescription(
		/winning/i,
	)
})

test('shows correct player names', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(async () => {
		const stateKey = 'state'

		localStorage.setItem(
			stateKey,
			JSON.stringify({
				vs: 'player',
				starter: 'red',
				counters: [
					['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
					['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
					['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
					['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
					['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
					['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
				],
				score: { red: 0, yellow: 0 },
			} satisfies State),
		)
	})
	await page.goto('/play')

	await expect(
		page.getByTestId('player-one-card').getByRole('heading'),
	).toHaveText(/player 1/i)
	await expect(
		page.getByTestId('player-one-card').getByRole('img'),
	).toHaveAccessibleName(/player 1 is red/i)
	await expect(
		page.getByTestId('player-two-card').getByRole('heading'),
	).toHaveText(/player 2/i)
	await expect(
		page.getByTestId('player-two-card').getByRole('img'),
	).toHaveAccessibleName(/player 2 is yellow/i)
	await expect(page.getByTestId('turn')).toHaveText(/player 1’s turn/i)

	await page.getByTestId('0,0').click()

	await expect(page.getByTestId('turn')).toHaveText(/player 2’s turn/i)

	await page.goto('/')
	await page.evaluate(async () => {
		const stateKey = 'state'

		localStorage.setItem(
			stateKey,
			JSON.stringify({
				vs: 'cpu',
				starter: 'red',
				counters: [
					['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
					['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
					['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
					['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
					['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
					['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
				],
				score: { red: 0, yellow: 0 },
			} satisfies State),
		)
	})
	await page.goto('/play')

	await expect(
		page.getByTestId('player-one-card').getByRole('heading'),
	).toHaveText(/you/i)
	await expect(
		page.getByTestId('player-one-card').getByRole('img'),
	).toHaveAccessibleName(/you are red/i)
	await expect(
		page.getByTestId('player-two-card').getByRole('heading'),
	).toHaveText(/cpu/i)
	await expect(
		page.getByTestId('player-two-card').getByRole('img'),
	).toHaveAccessibleName(/cpu is yellow/i)
	await expect(page.getByTestId('turn')).toHaveText(/your turn/i)

	await page.getByTestId('0,0').click()

	await expect(page.getByTestId('turn')).toHaveText(/cpu’s turn/i)
})

test('starts game vs cpu', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('button', { name: 'play vs cpu' }).click()

	await expect(
		page.getByTestId('player-two-card').getByRole('heading'),
	).toHaveText(/cpu/i)
})

test('derives timeout win on page refresh', async ({ page }) => {
	await page.clock.install({ time: new Date() })
	await page.goto('/play')
	await page.getByTestId('0,0').click()
	await page.clock.fastForward(31_000)
	await page.reload()

	await expect(page.getByTestId('outcome')).toHaveText(/player 1 wins/i)
})

test.fixme('cpu makes move after player', () => {})
test.fixme('cpu starts game', () => {})
test.fixme('resets counter after cpu move', () => {})
test.fixme("always starts in player's turn", () => {})

test.describe('passes a11y checks', () => {
	test('main menu', async ({ page }) => {
		await page.goto('/')

		const results = await new AxeBuilder({ page }).analyze()

		// The white-on-red of "Play vs CPU" has insufficient contrast
		expect(violationFingerprints(results)).toMatchSnapshot()
	})

	test('rules', async ({ page }) => {
		await page.goto('/rules')

		const results = await new AxeBuilder({ page }).analyze()
		expect(results.violations).toEqual([])
	})

	test('play', async ({ page }) => {
		await page.goto('/play')

		const results = await new AxeBuilder({ page }).analyze()

		// Turn's white-on-red has insufficient contrast
		expect(violationFingerprints(results)).toMatchSnapshot()
	})
})

type AxeResults = Awaited<
	ReturnType<InstanceType<typeof AxeBuilder>['analyze']>
>

// https://playwright.dev/docs/accessibility-testing#using-snapshots-to-allow-specific-known-issues
function violationFingerprints(accessibilityScanResults: AxeResults) {
	const violationFingerprints = accessibilityScanResults.violations.map(
		(violation) => ({
			rule: violation.id,
			// These are CSS selectors which uniquely identify each element with
			// a violation of the rule in question.
			targets: violation.nodes.map((node) => node.target),
		}),
	)

	return JSON.stringify(violationFingerprints, null, 2)
}
