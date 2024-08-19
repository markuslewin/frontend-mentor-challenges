import { test, expect, type Page } from '@playwright/test'

test('initial state', async ({ page }) => {
	const timerType = getTimerType(page)
	const timerTypes = timerType.getByRole('radio')
	const timer = getTimer(page)
	const playButton = getStartButton(page)

	await page.goto('/')

	await expect(timerTypes.nth(0)).toHaveAccessibleName('pomodoro')
	await expect(timerTypes.nth(1)).toHaveAccessibleName('short break')
	await expect(timerTypes.nth(2)).toHaveAccessibleName('long break')
	await expect(timerType.getByRole('radio', { name: 'pomodoro' })).toBeChecked()
	await expect(timer).toHaveText('25:00')
	await expect(playButton).toBeAttached()
})

test('has settings', async ({ page }) => {
	const timeGroup = page.getByRole('group', { name: 'time' })

	await page.goto('/')
	await page.getByRole('button', { name: 'settings' }).click()

	await expect(page.getByRole('dialog', { name: 'settings' })).toBeAttached()
	await expect(
		timeGroup.getByRole('spinbutton', { name: 'pomodoro' }),
	).toHaveValue('25')
	await expect(
		timeGroup.getByRole('spinbutton', { name: 'short break' }),
	).toHaveValue('5')
	await expect(
		timeGroup.getByRole('spinbutton', { name: 'long break' }),
	).toHaveValue('15')
	await expect(
		page
			.getByRole('group', { name: 'font' })
			.getByRole('radio', { name: 'Kumbh Sans' }),
	).toBeChecked()
	await expect(
		page
			.getByRole('group', { name: 'color' })
			.getByRole('radio', { name: 'Red' }),
	).toBeChecked()

	await page.getByRole('button', { name: 'apply' }).click()

	await expect(
		page.getByRole('dialog', { name: 'settings' }),
	).not.toBeAttached()
})

test('starts timer', async ({ page }) => {
	const timer = getTimer(page)
	const playButton = getStartButton(page)
	const pauseButton = getPauseButton(page)

	await page.clock.install({ time: new Date('2024-02-02T08:00:00') })
	await page.goto('/')

	await expect(timer).toHaveText('25:00')

	await page.clock.fastForward('10:00')

	await expect(timer).toHaveText('25:00')

	await playButton.click()

	await expect(playButton).not.toBeAttached()
	await expect(pauseButton).toBeAttached()

	await page.clock.fastForward('10:00')

	await expect(timer).toHaveText('15:00')

	await page.clock.fastForward('16:00')

	await expect(timer).toHaveText('00:00')
})

test('pauses timer', async ({ page }) => {
	const timer = getTimer(page)
	const playButton = getStartButton(page)
	const pauseButton = getPauseButton(page)

	await page.clock.install({ time: new Date('2024-02-02T08:00:00') })
	await page.goto('/')

	await expect(timer).toHaveText('25:00')

	await playButton.click()
	await page.clock.fastForward('10:00')

	await expect(timer).toHaveText('15:00')

	await pauseButton.click()
	await page.clock.fastForward('10:00')

	await expect(timer).toHaveText('15:00')

	await playButton.click()
	await page.clock.fastForward('10:00')

	await expect(timer).toHaveText('05:00')
})

test('resets when changing type', async ({ page }) => {
	const timerTypes = getTimerType(page)
	const timer = getTimer(page)
	const playButton = getStartButton(page)

	await page.clock.install({ time: new Date('2024-02-02T08:00:00') })
	await page.goto('/')

	await expect(timer).toHaveText('25:00')

	await playButton.click()
	await page.clock.fastForward('10:00')

	await expect(timer).toHaveText('15:00')

	await timerTypes
		.getByRole('radio', { name: 'short break' })
		.check({ force: true })
	await timerTypes
		.getByRole('radio', { name: 'pomodoro' })
		.check({ force: true })

	await expect(timer).toHaveText('25:00')
})

test('resets when applying time-related settings', async ({ page }) => {
	await page.clock.install({ time: new Date('2024-02-02T08:00:00') })
	await page.goto('/')

	await expect(page.getByTestId('timer')).toHaveText('25:00')

	await page.getByRole('button', { name: 'start' }).click()
	await page.clock.fastForward('10:00')

	await expect(page.getByTestId('timer')).toHaveText('15:00')

	await page.getByRole('button', { name: 'settings' }).click()
	await page.getByRole('radio', { name: 'cyan' }).check({ force: true })
	await page.getByRole('button', { name: 'apply' }).click()

	await expect(page.getByTestId('timer')).toHaveText('15:00')

	await page.getByRole('button', { name: 'settings' }).click()
	await page.getByRole('spinbutton', { name: 'pomodoro' }).fill('20')
	await page.getByRole('button', { name: 'apply' }).click()

	await expect(page.getByTestId('timer')).toHaveText('20:00')
	await expect(page.getByRole('button', { name: 'start' })).toBeAttached()
})

function getTimerType(page: Page) {
	return page.getByRole('group', { name: 'type of timer' })
}

function getTimer(page: Page) {
	return page.getByTestId('timer')
}

function getStartButton(page: Page) {
	return page.getByRole('button', { name: 'start' })
}

function getPauseButton(page: Page) {
	return page.getByRole('button', { name: 'pause' })
}
