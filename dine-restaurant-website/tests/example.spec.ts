import { test, expect } from '@playwright/test'

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
