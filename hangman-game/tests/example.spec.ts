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
