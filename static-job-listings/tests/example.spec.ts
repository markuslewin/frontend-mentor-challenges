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
