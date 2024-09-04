import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'
import { alphabet } from '#app/utils/alphabet'
import { type SerializableState } from '#app/utils/hangman'

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

test('handles loss', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(async () => {
		// Can't use `stateKey`. Playwright/Node can't import JSON
		// todo: Rearrange `hangman.ts` exports and imports
		const stateKey = 'state'

		localStorage.setItem(
			stateKey,
			JSON.stringify({
				category: 'Animals',
				secret: ['h', 'a', 'h', 'a'],
				guesses: [],
			} satisfies SerializableState),
		)
	})
	await page.goto('/play')

	await expect(page.getByTestId('lives')).toHaveText('8')
	await expect(
		page
			.getByRole('region', { name: 'secret words' })
			.getByTestId('secret-letter'),
	).toHaveText(['Blank', 'Blank', 'Blank', 'Blank'])
	await expect(
		page
			.getByRole('region', { name: 'keyboard' })
			.getByRole('button', { disabled: false }),
	).toHaveCount(alphabet.length)
	await expect(
		page
			.getByRole('region', { name: 'keyboard' })
			.getByRole('button', { disabled: true }),
	).toHaveCount(0)

	await page
		.getByRole('region', { name: 'keyboard' })
		.getByRole('button', { name: 'b' })
		.click()

	await expect(page.getByTestId('lives')).toHaveText('7')
	await expect(
		page
			.getByRole('region', { name: 'secret words' })
			.getByTestId('secret-letter'),
	).toHaveText(['Blank', 'Blank', 'Blank', 'Blank'])
	await expect(
		page
			.getByRole('region', { name: 'keyboard' })
			.getByRole('button', { disabled: false }),
	).toHaveCount(alphabet.length - 1)
	await expect(
		page
			.getByRole('region', { name: 'keyboard' })
			.getByRole('button', { disabled: true }),
	).toHaveCount(1)

	await page
		.getByRole('region', { name: 'keyboard' })
		.getByRole('button', { name: 'a' })
		.click()

	await expect(page.getByTestId('lives')).toHaveText('7')
	await expect(
		page
			.getByRole('region', { name: 'secret words' })
			.getByTestId('secret-letter'),
	).toHaveText(['Blank', 'a', 'Blank', 'a'])
	await expect(
		page
			.getByRole('region', { name: 'keyboard' })
			.getByRole('button', { disabled: false }),
	).toHaveCount(alphabet.length - 2)
	await expect(
		page
			.getByRole('region', { name: 'keyboard' })
			.getByRole('button', { disabled: true }),
	).toHaveCount(2)

	await page
		.getByRole('region', { name: 'keyboard' })
		.getByRole('button', { name: 'c' })
		.click()
	await page
		.getByRole('region', { name: 'keyboard' })
		.getByRole('button', { name: 'd' })
		.click()
	await page
		.getByRole('region', { name: 'keyboard' })
		.getByRole('button', { name: 'e' })
		.click()
	await page
		.getByRole('region', { name: 'keyboard' })
		.getByRole('button', { name: 'f' })
		.click()
	await page
		.getByRole('region', { name: 'keyboard' })
		.getByRole('button', { name: 'g' })
		.click()
	await page
		.getByRole('region', { name: 'keyboard' })
		.getByRole('button', { name: 'i' })
		.click()
	await page
		.getByRole('region', { name: 'keyboard' })
		.getByRole('button', { name: 'j' })
		.click()

	await expect(page.getByTestId('lives')).toHaveText('0')
	await expect(
		page.getByRole('alertdialog', { name: 'you lose' }),
	).toBeAttached()
})

test('handles win', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(async () => {
		const stateKey = 'state'

		localStorage.setItem(
			stateKey,
			JSON.stringify({
				category: 'TV Shows',
				secret: ['b', 'r', 'e', 'a', 'k', 'i', 'n', 'g', null, 'b', 'a', 'd'],
				// Missing 'd'
				guesses: ['b', 'r', 'e', 'a', 'k', 'i', 'n', 'g'],
			} satisfies SerializableState),
		)
	})
	await page.goto('/play')

	await expect(page.getByTestId('lives')).toHaveText('8')
	await expect(
		page
			.getByRole('region', { name: 'secret words' })
			.getByTestId('secret-letter'),
	).toHaveText(['b', 'r', 'e', 'a', 'k', 'i', 'n', 'g', 'b', 'a', 'Blank'])

	await page
		.getByRole('region', { name: 'keyboard' })
		.getByRole('button', { name: 'd' })
		.click()

	await expect(
		page.getByRole('alertdialog', { name: 'you win' }),
	).toBeAttached()
})

test('can play again', async ({ page }) => {
	await page.goto('/')
	await page.evaluate(async () => {
		localStorage.setItem(
			'state',
			JSON.stringify({
				category: 'Animals',
				secret: ['a', 'p', 'e'],
				guesses: ['t', 'a', 'p', 'e'],
			} satisfies SerializableState),
		)
	})
	await page.goto('/play')
	await page.getByRole('button', { name: 'play again' }).click()

	await expect(page.getByRole('heading', { level: 1 })).toHaveText(/animals/i)
	await expect(page.getByTestId('lives')).toHaveText('8')
	await expect(
		page
			.getByRole('region', { name: 'keyboard' })
			.getByRole('button', { disabled: false }),
	).toHaveCount(alphabet.length)
})

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
