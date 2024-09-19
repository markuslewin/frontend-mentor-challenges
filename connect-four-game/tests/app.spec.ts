import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'
import { type State } from '#app/utils/connect-four'

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
