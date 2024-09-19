import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'
import { type State } from '#app/utils/connect-four'

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

test.fixme('alternates starter', async ({ page }) => {})
test.fixme('resets game', async ({ page }) => {
	// todo: Play game, go to main menu, click "play"
	// todo: Expect reset grid
})
test.fixme('restarts game from header', async ({ page }) => {})
test.fixme('restarts game from menu', async ({ page }) => {})
test.fixme('continues game', async ({ page }) => {})
test.fixme('quits game', async ({ page }) => {})

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
