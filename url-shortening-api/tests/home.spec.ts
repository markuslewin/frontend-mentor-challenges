import { faker } from '@faker-js/faker'
import { test, expect, type Page } from '@playwright/test'
import {
	urls as cleanuriUrls,
	type ShortenResponse,
} from '#app/utils/shortener'
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

function getTextbox(page: Page) {
	return page.getByRole('textbox', { name: 'link' })
}

function getShortenButton(page: Page) {
	return page.getByRole('button', { name: 'shorten' })
}

function getShortenedLinks(page: Page) {
	return page
		.getByRole('list', { name: 'shortened links' })
		.getByRole('listitem')
}

test('displays error messages', async ({ page }) => {
	const textbox = getTextbox(page)
	const shortenButton = getShortenButton(page)
	const links = getShortenedLinks(page)
	const invalidLink = 'not a valid link'

	await page.goto('/')
	await textbox.press('Enter')
	await expect(textbox).toHaveValue('')
	await expect(textbox).toHaveAttribute('aria-invalid', 'true')
	await expect(textbox).toHaveAccessibleDescription(/please add a link/i)
	await expect(links).toHaveCount(0)

	await textbox.fill(invalidLink)
	await shortenButton.click()

	await expect(textbox).toHaveValue(invalidLink)
	await expect(textbox).toHaveAttribute('aria-invalid', 'true')
	await expect(textbox).toHaveAccessibleDescription(/invalid url/i)
	await expect(links).toHaveCount(0)
})

test('shortens link', async ({ page, context }) => {
	const shortLink = faker.internet.url()
	await context.route(`${cleanuriUrls.shorten}*`, async (route) => {
		await route.fulfill({
			json: {
				result_url: shortLink,
			} satisfies ShortenResponse,
		})
	})

	const textbox = getTextbox(page)
	const shortenButton = getShortenButton(page)
	const links = getShortenedLinks(page)
	const longLink = faker.internet.url()

	await page.goto('/')
	await textbox.fill(longLink)
	await shortenButton.click()

	await expect(textbox).toHaveValue('')
	await expect(links).toHaveText([new RegExp(longLink)])
	await expect(links).toHaveText([new RegExp(shortLink)])

	await links.first().getByRole('button', { name: 'copy' }).click()

	await expect(
		links.first().getByRole('button', { name: 'copied' }),
	).toBeAttached()
	expect(await page.evaluate(() => window.navigator.clipboard.readText())).toBe(
		shortLink,
	)
})

test('persists links', async ({ page }) => {
	const textbox = getTextbox(page)
	const shortenButton = getShortenButton(page)
	const links = getShortenedLinks(page)
	const longLinks = [
		faker.internet.url(),
		faker.internet.url(),
		faker.internet.url(),
	]

	await page.goto('/')
	for (const link of longLinks) {
		await textbox.fill(link)
		await shortenButton.click()
	}

	await expect(links).toHaveText(longLinks.map((l) => new RegExp(l)))

	await page.reload()

	await expect(links).toHaveText(longLinks.map((l) => new RegExp(l)))
})
