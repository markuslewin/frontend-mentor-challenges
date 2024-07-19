import { test, expect } from '@playwright/test'
import { urls as cleanuriUrls } from '#app/utils/shortener'
import { createMockResponse as createCleanuriResponse } from '#tests/mocks/cleanuri'

test.beforeEach(async ({ context }) => {
	// Append * to include requests containing search params
	await context.route(`${cleanuriUrls.shorten}*`, async (route) => {
		const json = createCleanuriResponse()
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
