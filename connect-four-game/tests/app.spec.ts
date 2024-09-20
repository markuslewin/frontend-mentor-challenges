import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'
import { createTable, type Table, type State } from '#app/utils/connect-four'

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
	await page.evaluate(async () => {
		const stateKey = 'state'

		localStorage.setItem(
			stateKey,
			JSON.stringify({
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
	})
	await page.goto('/play')

	await expect(page.getByTestId('score-red')).toHaveText('1')
	await expect(page.getByTestId('score-yellow')).toHaveText('2')

	await page.getByTestId('0,2').click()

	await expect(page.getByTestId('score-red')).toHaveText('2')
	await expect(page.getByTestId('score-yellow')).toHaveText('2')

	await page.goto('/')
	await page.evaluate(async () => {
		const stateKey = 'state'

		localStorage.setItem(
			stateKey,
			JSON.stringify({
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
	})
	await page.goto('/play')

	await expect(page.getByTestId('score-red')).toHaveText('2')
	await expect(page.getByTestId('score-yellow')).toHaveText('2')

	await page.getByTestId('1,0').click()

	await expect(page.getByTestId('score-red')).toHaveText('2')
	await expect(page.getByTestId('score-yellow')).toHaveText('3')

	await page.goto('/')
	await page.evaluate(async () => {
		const stateKey = 'state'

		localStorage.setItem(
			stateKey,
			JSON.stringify({
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
	})
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
	await page.evaluate(async () => {
		const stateKey = 'state'

		localStorage.setItem(
			stateKey,
			JSON.stringify({
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
	})
	await page.goto('/play')

	await expect(page.getByTestId('turn')).toHaveText('Player 1’s turn')

	await page.getByTestId('0,0').click()
	await page.getByRole('button', { name: 'play again' }).click()

	await expect(page.getByTestId('turn')).toHaveText('Player 2’s turn')

	// todo: Check timer win
})

test('resets game', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(async () => {
		const stateKey = 'state'

		localStorage.setItem(
			stateKey,
			JSON.stringify({
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
	})
	await page.getByRole('button', { name: 'play vs player' }).click()

	await expect(page.getByRole('grid').getByRole('button')).toHaveText(
		Array(42).fill(/empty/i),
	)
	await expect(page.getByTestId('score-red')).toHaveText('0')
	await expect(page.getByTestId('score-yellow')).toHaveText('0')
})

test('restarts game from header', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(async () => {
		const stateKey = 'state'

		localStorage.setItem(
			stateKey,
			JSON.stringify({
				starter: 'red',
				counters: [
					['empty', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
					['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
					['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
					['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
					['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
					['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
				],
				score: { red: 12, yellow: 34 },
			} satisfies State),
		)
	})
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
})

test('restarts game from menu', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(async () => {
		const stateKey = 'state'

		localStorage.setItem(
			stateKey,
			JSON.stringify({
				starter: 'red',
				counters: [
					['empty', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
					['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
					['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
					['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
					['yellow', 'red', 'yellow', 'red', 'yellow', 'red', 'yellow'],
					['red', 'yellow', 'red', 'yellow', 'red', 'yellow', 'red'],
				],
				score: { red: 43, yellow: 21 },
			} satisfies State),
		)
	})
	await page.goto('/play')
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
})

test('quits game', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(async () => {
		const stateKey = 'state'

		localStorage.setItem(
			stateKey,
			JSON.stringify({
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
	})
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
	await page.goto('/')
	await page.evaluate(async () => {
		const stateKey = 'state'

		localStorage.setItem(
			stateKey,
			JSON.stringify({
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
	})
	await page.goto('/play')
	await page.getByTestId('3,0').click()
	await page.getByRole('button', { name: 'play again' }).click()

	await expect(page.getByRole('grid').getByRole('button')).toHaveText(
		Array(42).fill(/empty/i),
	)
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
	const counters = await page.evaluate(async () => {
		const stateKey = 'state'
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
				starter: 'red',
				counters,
				score: { red: 0, yellow: 0 },
			} satisfies State),
		)

		return counters
	})
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
	await page.evaluate(async () => {
		const stateKey = 'state'

		localStorage.setItem(
			stateKey,
			JSON.stringify({
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
	})
	await page.goto('/play')
	await page.getByTestId('3,0').click()

	await expect(page.getByTestId('outcome')).toContainText(/player 1/i)
	await expect(page.getByTestId('outcome')).toContainText(/wins/i)
})

test('announces player 2 win', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(async () => {
		const stateKey = 'state'

		localStorage.setItem(
			stateKey,
			JSON.stringify({
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
	})
	await page.goto('/play')
	await page.getByTestId('1,0').click()

	await expect(page.getByTestId('outcome')).toContainText(/player 2/i)
	await expect(page.getByTestId('outcome')).toContainText(/wins/i)
})

test('announces draw', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(async () => {
		const stateKey = 'state'

		localStorage.setItem(
			stateKey,
			JSON.stringify({
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
	})
	await page.goto('/play')
	await page.getByTestId('0,0').click()

	await expect(page.getByTestId('outcome')).toContainText(/draw/i)
})

test.fixme('has time limit', async ({ page }) => {})
test.fixme('pauses game', async ({ page }) => {
	// todo: Check counter
})

test.describe('passes a11y checks', () => {
	test('main menu', async ({ page }) => {
		await page.goto('/')

		const results = await new AxeBuilder({ page }).analyze()
		expect(results.violations).toEqual([])
	})

	test('rules', async ({ page }) => {
		await page.goto('/rules')

		const results = await new AxeBuilder({ page }).analyze()
		expect(results.violations).toEqual([])
	})

	test('play', async ({ page }) => {
		await page.goto('/play')

		const results = await new AxeBuilder({ page }).analyze()
		expect(results.violations).toEqual([])
	})
})
