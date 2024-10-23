import AxeBuilder from '@axe-core/playwright'
import { test, expect, type Page } from '@playwright/test'
import { type Options } from '#app/utils/memory'

async function start(options: Options, page: Page) {
	await page
		.getByRole('group', { name: 'theme' })
		.getByRole('radio', { name: options.theme })
		.check({ force: true })
	await page
		.getByRole('group', { name: 'players' })
		.getByRole('radio', { name: options.players })
		.check({ force: true })
	await page
		.getByRole('group', { name: 'size' })
		.getByRole('radio', { name: options.grid })
		.check({ force: true })
	await page.getByRole('button', { name: 'start' }).click()
}

test('starts single-player game', async ({ page }) => {
	await page.goto('/')
	await start(
		{
			theme: 'numbers',
			players: '1',
			grid: '4x4',
		},
		page,
	)

	await expect(page.getByRole('heading', { name: 'time' })).toBeAttached()
	await expect(page.getByTestId('time')).toHaveText('0:00')
	await expect(page.getByRole('heading', { name: 'moves' })).toBeAttached()
	await expect(page.getByTestId('moves')).toHaveText('0')
})

test('starts multiplayer game', async ({ page }) => {
	await page.goto('/')
	await start(
		{
			theme: 'numbers',
			players: '4',
			grid: '4x4',
		},
		page,
	)

	await expect(
		page
			.getByRole('region', { name: 'score' })
			.getByRole('listitem')
			.getByTestId('player'),
	).toHaveText(['Player 1: 0', 'Player 2: 0', 'Player 3: 0', 'Player 4: 0'])
})

test.fixme('starts timer', async ({ page }) => {
	// Prefer `setFixedTime` over `page.clock.install({ time: '' })` and `page.clock.fastForward(5_000)`
	await page.clock.setFixedTime('2024-10-08T21:00:00')
})

test.describe('passes a11y checks', () => {
	test('menu', async ({ page }) => {
		await page.goto('/')

		const results = await new AxeBuilder({ page }).analyze()

		// Unchecked radios and button have insufficient color contrast
		expect(violationFingerprints(results)).toMatchSnapshot()
	})

	test('play', async ({ page }) => {
		await page.goto('/')
		await page.getByRole('button', { name: 'start' }).click()

		const results = await new AxeBuilder({ page }).analyze()

		// Restart button and meta labels have insufficient color contrast
		expect(violationFingerprints(results)).toMatchSnapshot()
	})
})

type AxeResults = Awaited<
	ReturnType<InstanceType<typeof AxeBuilder>['analyze']>
>

// https://playwright.dev/docs/accessibility-testing#using-snapshots-to-allow-specific-known-issues
function violationFingerprints(accessibilityScanResults: AxeResults) {
	const violationFingerprints = accessibilityScanResults.violations.map(
		(violation) => ({
			rule: violation.id,
			// These are CSS selectors which uniquely identify each element with
			// a violation of the rule in question.
			targets: violation.nodes.map((node) => node.target),
		}),
	)

	return JSON.stringify(violationFingerprints, null, 2)
}
