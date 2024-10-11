import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'
import { urls as worldtimeapiUrls } from '#app/utils/time'
import { createMockResponse as createWorldtimeapiResponse } from '#tests/mocks/worldtimeapi.js'

test.beforeEach(async ({ context }) => {
	// Append * to include requests containing search params
	await context.route(`${worldtimeapiUrls.ip}*`, async (route) => {
		const json = createWorldtimeapiResponse()
		await route.fulfill({
			json,
		})
	})
})

test('has title', async ({ page }) => {
	await page.goto('/')

	await expect(page).toHaveTitle(/my react template/i)
})

test('receives data from function', async ({ page }) => {
	await page.goto('/')

	await page
		.getByRole('button', { name: 'post to serverless function' })
		.click()

	await expect(page.getByTestId('server-message')).toHaveText(
		/\"message\": \"hello world!\"/i,
	)
})

test('has api endpoint landmark', async ({ page }) => {
	await page.goto('/')

	await expect(
		page.getByRole('region', { name: 'api endpoint' }),
	).toBeAttached()
})

test('has timer', async ({ page }) => {
	// Prefer `setFixedTime` over `page.clock.install({ time: '' })` and `page.clock.fastForward(5_000)`
	await page.clock.setFixedTime('2024-10-08T21:00:00')
	await page.goto('/')

	await expect(page.getByTestId('left')).toHaveText('10')

	await page.clock.setFixedTime('2024-10-08T21:00:05')

	await expect(page.getByTestId('left')).toHaveText('5')

	await page.clock.setFixedTime('2024-10-08T21:00:10')

	await expect(page.getByTestId('timer')).toHaveText(/time's up/i)
})

test.describe('passes a11y checks', () => {
	test('home', async ({ page }) => {
		await page.goto('/')

		const results = await new AxeBuilder({ page }).analyze()
		expect(results.violations).toEqual([])
	})

	test('nested routes', async ({ page }) => {
		await page.goto('/nested-routes')

		let results = await new AxeBuilder({ page }).analyze()
		expect(results.violations).toEqual([])

		await page.getByRole('link', { name: 'add' }).click()

		results = await new AxeBuilder({ page }).analyze()
		expect(results.violations).toEqual([])

		await page.getByRole('link', { name: 'messages' }).click()
		await page.getByRole('link', { name: 'one' }).click()

		results = await new AxeBuilder({ page }).analyze()
		expect(results.violations).toEqual([])
	})
})
