import { test, expect } from '@playwright/test'

test('filters jobs', async ({ page }) => {
	await page.goto('/')

	const filtersRegion = page.getByRole('region', { name: 'search filters' })
	const filters = filtersRegion.getByRole('listitem')
	const jobs = page.getByTestId('job')

	await expect(filtersRegion).toHaveText(/no search filters/i)
	await expect(filters).toHaveCount(0)
	await expect(jobs).toHaveCount(10)

	await jobs.first().getByRole('button', { name: 'frontend' }).click()

	await expect(filtersRegion).not.toHaveText(/no search filters/i)
	await expect(filters).toHaveCount(1)
	await expect(filtersRegion).toHaveText(/frontend/i)
	await expect(jobs).toHaveCount(6)
	for (const job of await jobs.all()) {
		await expect(job.getByRole('button', { name: 'frontend' })).toBeAttached()
	}

	await jobs.first().getByRole('button', { name: 'css' }).click()

	await expect(filters).toHaveCount(2)
	await expect(filtersRegion).toHaveText(/frontend/i)
	await expect(filtersRegion).toHaveText(/css/i)
	await expect(jobs).toHaveCount(2)
	for (const job of await jobs.all()) {
		await expect(job.getByRole('button', { name: 'frontend' })).toBeAttached()
		await expect(job.getByRole('button', { name: 'css' })).toBeAttached()
	}

	await filtersRegion
		.getByRole('button', { name: 'remove filter "frontend"' })
		.click()

	await expect(filters).toHaveCount(1)
	await expect(filtersRegion).not.toHaveText(/frontend/i)
	await expect(filtersRegion).toHaveText(/css/i)
	await expect(jobs).toHaveCount(2)
	for (const job of await jobs.all()) {
		await expect(job.getByRole('button', { name: 'css' })).toBeAttached()
	}

	await filtersRegion.getByRole('button', { name: 'clear' }).click()

	await expect(filters).toHaveCount(0)
	await expect(jobs).toHaveCount(10)
})
