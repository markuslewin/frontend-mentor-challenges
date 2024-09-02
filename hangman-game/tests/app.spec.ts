import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'

test('has instructions', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('link', { name: 'how to play' }).click()

	await expect(page.getByRole('heading', { level: 2 })).toHaveText([
		/choose a category/i,
		/guess letters/i,
		/win or lose/i,
	])
})

test('picks category', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('link', { name: /^play/i }).click()
	await page
		.getByRole('group', { name: 'pick a category' })
		.getByRole('button', { name: 'countries' })
		.click()

	await expect(page.getByRole('heading', { level: 1 })).toHaveText(/countries/i)

	await page.getByRole('button', { name: 'menu' }).click()
	await page.getByRole('link', { name: 'new category' }).click()
	await page
		.getByRole('group', { name: 'pick a category' })
		.getByRole('button', { name: 'movies' })
		.click()

	await expect(page.getByRole('heading', { level: 1 })).toHaveText(/movies/i)
})

test('has game menu', async ({ page }) => {
	await page.goto('/')
	await page.getByRole('link', { name: /^play/i }).click()
	await page
		.getByRole('group', { name: 'pick a category' })
		.getByRole('button', { name: 'sports' })
		.click()

	await expect(page.getByRole('heading', { level: 1 })).toHaveText(/sports/i)

	await page.getByRole('button', { name: 'menu' }).click()

	await expect(
		page.getByRole('dialog', { name: 'paused' }).getByRole('listitem'),
	).toHaveText([/continue/i, /new category/i, /quit game/i])

	await page.getByRole('button', { name: 'continue' }).click()

	await expect(page.getByRole('dialog')).not.toBeAttached()
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(/sports/i)

	await page.getByRole('button', { name: 'menu' }).click()
	await page.getByRole('link', { name: 'new category' }).click()

	await expect(page.getByRole('heading', { level: 1 })).toHaveText(
		/pick a category/i,
	)

	await page.getByRole('button', { name: 'tv shows' }).click()
	await page.getByRole('button', { name: 'menu' }).click()
	await page.getByRole('link', { name: 'quit game' }).click()

	await expect(
		page.getByRole('heading', { name: 'the hangman game' }),
	).toBeAttached()
})

test.fixme('updates health', () => {})
test.fixme('handles win', () => {})
test.fixme('handles loss', () => {})

test.describe('passes a11y checks', () => {
	test('home', async ({ page }) => {
		await page.goto('/')

		const results = await new AxeBuilder({ page }).analyze()
		expect(results.violations).toEqual([])
	})

	test('instructions', async ({ page }) => {
		await page.goto('/instructions')

		const results = await new AxeBuilder({ page }).analyze()
		expect(results.violations).toEqual([])
	})

	test('categories', async ({ page }) => {
		await page.goto('/categories')

		const results = await new AxeBuilder({ page }).analyze()
		expect(results.violations).toEqual([])
	})

	test('play', async ({ page }) => {
		await page.goto('/play')

		const results = await new AxeBuilder({ page }).analyze()
		expect(results.violations).toEqual([])
	})
})
