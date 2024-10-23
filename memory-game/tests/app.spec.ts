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

test('has clickable tiles', async ({ page }) => {
	await page.goto('/')
	await start(
		{
			theme: 'numbers',
			players: '1',
			grid: '4x4',
		},
		page,
	)

	await expect(page.getByRole('grid').getByRole('button').first()).toHaveText(
		/tile/i,
	)

	await page.getByRole('grid').getByRole('button').first().click()

	await expect(
		page.getByRole('grid').getByRole('button').first(),
	).not.toHaveText(/tile/i)
})

test('creates 4x4 grid', async ({ page }) => {
	await page.goto('/')
	await start(
		{
			theme: 'numbers',
			players: '1',
			grid: '4x4',
		},
		page,
	)

	await expect(
		page.getByRole('grid').getByRole('button', { name: 'tile' }),
	).toHaveCount(4 * 4)
})

test('creates 6x6 grid', async ({ page }) => {
	await page.goto('/')
	await start(
		{
			theme: 'numbers',
			players: '1',
			grid: '6x6',
		},
		page,
	)

	await expect(
		page.getByRole('grid').getByRole('button', { name: 'tile' }),
	).toHaveCount(6 * 6)
})

test('starts timer', async ({ page }) => {
	await page.clock.setFixedTime('2024-10-23T17:15:00')
	await page.goto('/')
	await start(
		{
			theme: 'numbers',
			players: '1',
			grid: '4x4',
		},
		page,
	)
	await page.getByRole('button', { name: 'tile' }).first().click()
	await page.clock.setFixedTime('2024-10-23T17:15:15')

	await expect(page.getByTestId('time')).toHaveText('0:15')
})

test('tracks moves', async ({ page }) => {
	await page.goto('/')
	await start(
		{
			theme: 'numbers',
			players: '1',
			grid: '4x4',
		},
		page,
	)
	await page.getByRole('button', { name: 'tile' }).first().click()
	await page.getByRole('button', { name: 'tile' }).last().click()

	await expect(page.getByTestId('moves')).toHaveText('1')
})

test('changes current player', async ({ page }) => {
	await page.goto('/')
	await start(
		{
			theme: 'numbers',
			players: '2',
			grid: '4x4',
		},
		page,
	)

	await expect(
		page
			.getByRole('region', { name: 'score' })
			.getByRole('listitem')
			.filter({ hasText: 'player 1' }),
	).toHaveAttribute('aria-current', 'true')
	await expect(
		page
			.getByRole('region', { name: 'score' })
			.getByRole('listitem')
			.filter({ hasText: 'player 2' }),
	).toHaveAttribute('aria-current', 'false')

	await page.getByRole('button', { name: 'tile' }).first().click()
	await page.getByRole('button', { name: 'tile' }).last().click()

	await expect(
		page
			.getByRole('region', { name: 'score' })
			.getByRole('listitem')
			.filter({ hasText: 'player 1' }),
	).toHaveAttribute('aria-current', 'false')
	await expect(
		page
			.getByRole('region', { name: 'score' })
			.getByRole('listitem')
			.filter({ hasText: 'player 2' }),
	).toHaveAttribute('aria-current', 'true')
})

test('restarts game', async ({ page }) => {
	await page.clock.setFixedTime('2024-10-23T17:15:00')
	await page.goto('/')
	await start(
		{
			theme: 'numbers',
			players: '1',
			grid: '4x4',
		},
		page,
	)
	await page.getByRole('button', { name: 'tile' }).first().click()
	await page.getByRole('button', { name: 'tile' }).last().click()
	await page.getByTestId('moves').filter({ hasText: '1' }).waitFor()
	await page.clock.setFixedTime('2024-10-23T17:15:15')
	await page.getByTestId('time').filter({ hasText: '0:15' }).waitFor()
	await page.getByRole('button', { name: 'restart' }).click()

	await expect(page.getByTestId('time')).toHaveText('0:00')
	await expect(page.getByTestId('moves')).toHaveText('0')
	await expect(
		page.getByRole('grid').getByRole('button', { name: 'tile' }),
	).toHaveCount(4 * 4)
})

test('navigates to main menu', async ({ page }) => {
	await page.goto('/')
	await start(
		{
			theme: 'numbers',
			players: '1',
			grid: '4x4',
		},
		page,
	)
	await page.getByRole('button', { name: 'new game' }).click()

	await expect(page.getByRole('button', { name: 'start' })).toBeAttached()
})

test.describe('mobile menu', () => {
	test.use({ viewport: { width: 375, height: 667 } })

	test('restarts game', async ({ page }) => {
		await page.clock.setFixedTime('2024-10-23T17:15:00')
		await page.goto('/')
		await start(
			{
				theme: 'numbers',
				players: '1',
				grid: '4x4',
			},
			page,
		)
		await page.getByRole('button', { name: 'tile' }).first().click()
		await page.getByRole('button', { name: 'tile' }).last().click()
		await page.getByTestId('moves').filter({ hasText: '1' }).waitFor()
		await page.clock.setFixedTime('2024-10-23T17:15:15')
		await page.getByTestId('time').filter({ hasText: '0:15' }).waitFor()
		await page.getByRole('button', { name: 'menu' }).click()
		await page.getByRole('button', { name: 'restart' }).click()

		await expect(page.getByTestId('time')).toHaveText('0:00')
		await expect(page.getByTestId('moves')).toHaveText('0')
		await expect(
			page.getByRole('grid').getByRole('button', { name: 'tile' }),
		).toHaveCount(4 * 4)
	})

	test('navigates to main menu', async ({ page }) => {
		await page.goto('/')
		await start(
			{
				theme: 'numbers',
				players: '1',
				grid: '4x4',
			},
			page,
		)
		await page.getByRole('button', { name: 'menu' }).click()
		await page.getByRole('button', { name: 'new game' }).click()

		await expect(page.getByRole('button', { name: 'start' })).toBeAttached()
	})

	test('resumes game', async ({ page }) => {
		await page.clock.setFixedTime('2024-10-23T17:15:00')
		await page.goto('/')
		await start(
			{
				theme: 'numbers',
				players: '1',
				grid: '4x4',
			},
			page,
		)
		await page.getByRole('button', { name: 'tile' }).first().click()
		await page.getByRole('button', { name: 'tile' }).last().click()
		await page.getByTestId('moves').filter({ hasText: '1' }).waitFor()
		await page.clock.setFixedTime('2024-10-23T17:15:15')
		await page.getByTestId('time').filter({ hasText: '0:15' }).waitFor()
		await page.getByRole('button', { name: 'menu' }).click()
		await page.getByRole('dialog', { name: 'menu' }).waitFor()
		await page.getByRole('button', { name: 'resume game' }).click()

		await expect(page.getByRole('dialog', { name: 'menu' })).not.toBeAttached()
		await expect(page.getByTestId('time')).toHaveText('0:15')
		await expect(page.getByTestId('moves')).toHaveText('1')
	})
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
