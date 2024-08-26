import { test, expect } from '@playwright/test'

const shows = [
	{
		title: 'Beyond Earth',
		category: 'Movie',
		isBookmarked: false,
		isTrending: true,
	},
	{
		title: 'Bottom Gear',
		category: 'Movie',
		isBookmarked: false,
		isTrending: true,
	},
	{
		title: 'Undiscovered Cities',
		category: 'TV Series',
		isBookmarked: false,
		isTrending: true,
	},
	{
		title: '1998',
		category: 'Movie',
		isBookmarked: false,
		isTrending: true,
	},
	{
		title: 'Dark Side of the Moon',
		category: 'TV Series',
		isBookmarked: true,
		isTrending: true,
	},
	{
		title: 'The Great Lands',
		category: 'Movie',
		isBookmarked: false,
		isTrending: false,
	},
	{
		title: 'The Diary',
		category: 'TV Series',
		isBookmarked: false,
		isTrending: false,
	},
	{
		title: 'Earth’s Untouched',
		category: 'Movie',
		isBookmarked: true,
		isTrending: false,
	},
	{
		title: 'No Land Beyond',
		category: 'Movie',
		isBookmarked: false,
		isTrending: false,
	},
	{
		title: 'During the Hunt',
		category: 'TV Series',
		isBookmarked: false,
		isTrending: false,
	},
	{
		title: 'Autosport the Series',
		category: 'TV Series',
		isBookmarked: false,
		isTrending: false,
	},
	{
		title: 'Same Answer II',
		category: 'Movie',
		isBookmarked: false,
		isTrending: false,
	},
	{
		title: 'Below Echo',
		category: 'TV Series',
		isBookmarked: false,
		isTrending: false,
	},
	{
		title: 'The Rockies',
		category: 'TV Series',
		isBookmarked: true,
		isTrending: false,
	},
	{
		title: 'Relentless',
		category: 'Movie',
		isBookmarked: true,
		isTrending: false,
	},
	{
		title: 'Community of Ours',
		category: 'TV Series',
		isBookmarked: false,
		isTrending: false,
	},
	{
		title: 'Van Life',
		category: 'Movie',
		isBookmarked: false,
		isTrending: false,
	},
	{
		title: 'The Heiress',
		category: 'Movie',
		isBookmarked: true,
		isTrending: false,
	},
	{
		title: 'Off the Track',
		category: 'Movie',
		isBookmarked: true,
		isTrending: false,
	},
	{
		title: 'Whispering Hill',
		category: 'Movie',
		isBookmarked: false,
		isTrending: false,
	},
	{
		title: '112',
		category: 'TV Series',
		isBookmarked: false,
		isTrending: false,
	},
	{
		title: 'Lone Heart',
		category: 'Movie',
		isBookmarked: true,
		isTrending: false,
	},
	{
		title: 'Production Line',
		category: 'TV Series',
		isBookmarked: false,
		isTrending: false,
	},
	{
		title: 'Dogs',
		category: 'TV Series',
		isBookmarked: true,
		isTrending: false,
	},
	{
		title: 'Asia in 24 Days',
		category: 'TV Series',
		isBookmarked: false,
		isTrending: false,
	},
	{
		title: 'The Tasty Tour',
		category: 'TV Series',
		isBookmarked: false,
		isTrending: false,
	},
	{
		title: 'Darker',
		category: 'Movie',
		isBookmarked: true,
		isTrending: false,
	},
	{
		title: 'Unresolved Cases',
		category: 'TV Series',
		isBookmarked: false,
		isTrending: false,
	},
	{
		title: 'Mission: Saturn',
		category: 'Movie',
		isBookmarked: true,
		isTrending: false,
	},
] as const

const trendingShows = shows.filter((s) => s.isTrending)
const nonTrendingShows = shows.filter((s) => !s.isTrending)
const movies = shows.filter((s) => s.category === 'Movie')
const tvSeries = shows.filter((s) => s.category === 'TV Series')
const bookmarkedMovies = shows.filter(
	(s) => s.category === 'Movie' && s.isBookmarked,
)
const bookmarkedTvSeries = shows.filter(
	(s) => s.category === 'TV Series' && s.isBookmarked,
)

test.describe('displays shows', () => {
	test('home', async ({ page }) => {
		await page.goto('/')

		await expect(page.getByTestId('trending').getByRole('heading')).toHaveText(
			trendingShows.map((s) => s.title),
		)
		await expect(page.getByTestId('shows').getByRole('heading')).toHaveText(
			nonTrendingShows.map((s) => s.title),
		)
	})

	test('movies', async ({ page }) => {
		await page.goto('/movies')

		await expect(page.getByTestId('shows').getByRole('heading')).toHaveText(
			movies.map((s) => s.title),
		)
	})

	test('tv series', async ({ page }) => {
		await page.goto('/tv-series')

		await expect(page.getByTestId('shows').getByRole('heading')).toHaveText(
			tvSeries.map((s) => s.title),
		)
	})

	test('bookmarked', async ({ page }) => {
		await page.goto('/bookmarked')

		await expect(page.getByTestId('movies').getByRole('heading')).toHaveText(
			bookmarkedMovies.map((m) => m.title),
		)
		await expect(page.getByTestId('tv-series').getByRole('heading')).toHaveText(
			bookmarkedTvSeries.map((t) => t.title),
		)
	})
})

test.describe('search', () => {
	test('home', async ({ page }) => {
		await page.goto('/')
		await page.getByRole('searchbox', { name: 'search shows' }).fill('earth')
		await page.getByRole('button', { name: 'search' }).click()

		await expect(page.getByTestId('trending')).not.toBeAttached()
		await expect(page.getByTestId('shows')).not.toBeAttached()
		await expect(
			page.getByRole('heading', { name: 'Found 2 results for ‘earth’' }),
		).toBeAttached()
		await expect(page.getByTestId('result').getByRole('heading')).toHaveText([
			'Beyond Earth',
			'Earth’s Untouched',
		])

		await page.getByRole('searchbox', { name: 'search shows' }).fill('earthh')
		await page.getByRole('button', { name: 'search' }).click()

		await expect(
			page.getByRole('heading', { name: 'Found 0 results for ‘earthh’' }),
		).toBeAttached()

		await page.getByRole('searchbox', { name: 'search shows' }).fill('')
		await page.getByRole('button', { name: 'search' }).click()

		await expect(page.getByTestId('trending')).toBeAttached()
		await expect(page.getByTestId('shows')).toBeAttached()
		await expect(
			page.getByRole('heading', { name: 'Found 2 results for ‘earth’' }),
		).not.toBeAttached()
		await expect(page.getByTestId('result')).not.toBeAttached()
	})

	test('movies', async ({ page }) => {
		await page.goto('/movies')
		await page.getByRole('searchbox', { name: 'search shows' }).fill('the')
		await page.getByRole('button', { name: 'search' }).click()

		await expect(
			page.getByRole('heading', { name: 'Found 3 results for ‘the’' }),
		).toBeAttached()
		await expect(page.getByTestId('shows').getByRole('heading')).toHaveText([
			'The Great Lands',
			'The Heiress',
			'Off the Track',
		])

		await page.getByRole('searchbox', { name: 'search shows' }).fill('')
		await page.getByRole('button', { name: 'search' }).click()

		await expect(
			page.getByRole('heading', { name: 'Found 3 results for ‘the’' }),
		).not.toBeAttached()
		await expect(
			page.getByRole('heading', { name: 'Movies', exact: true }),
		).toBeAttached()
	})

	test('tv series', async ({ page }) => {
		await page.goto('/tv-series')
		await page.getByRole('searchbox', { name: 'search shows' }).fill('the')
		await page.getByRole('button', { name: 'search' }).click()

		await expect(
			page.getByRole('heading', { name: 'Found 6 results for ‘the’' }),
		).toBeAttached()
		await expect(page.getByTestId('shows').getByRole('heading')).toHaveText([
			'Dark Side of the Moon',
			'The Diary',
			'During the Hunt',
			'Autosport the Series',
			'The Rockies',
			'The Tasty Tour',
		])

		await page.getByRole('searchbox', { name: 'search shows' }).fill('')
		await page.getByRole('button', { name: 'search' }).click()

		await expect(
			page.getByRole('heading', { name: 'Found 6 results for ‘the’' }),
		).not.toBeAttached()
		await expect(
			page.getByRole('heading', { name: 'TV Series', exact: true }),
		).toBeAttached()
	})

	test('bookmarked', async ({ page }) => {
		await page.goto('/bookmarked')
		await page.getByRole('searchbox', { name: 'search shows' }).fill('the')
		await page.getByRole('button', { name: 'search' }).click()

		await expect(page.getByTestId('movies')).not.toBeAttached()
		await expect(page.getByTestId('tv-series')).not.toBeAttached()
		await expect(
			page.getByRole('heading', { name: 'Found 4 results for ‘the’' }),
		).toBeAttached()
		await expect(page.getByTestId('result').getByRole('heading')).toHaveText([
			'Dark Side of the Moon',
			'The Rockies',
			'The Heiress',
			'Off the Track',
		])

		await page.getByRole('searchbox', { name: 'search shows' }).fill('')
		await page.getByRole('button', { name: 'search' }).click()

		await expect(page.getByTestId('movies')).toBeAttached()
		await expect(page.getByTestId('tv-series')).toBeAttached()
		await expect(
			page.getByRole('heading', { name: 'Found 4 results for ‘the’' }),
		).not.toBeAttached()
		await expect(page.getByTestId('result')).not.toBeAttached()
	})
})

test('bookmarks shows', async ({ page }) => {
	await page.goto('/bookmarked')

	await expect(page.getByTestId('movies').getByRole('heading')).toHaveText(
		bookmarkedMovies.map((m) => m.title),
	)

	for (const movie of bookmarkedMovies) {
		const button = page
			.getByTestId('movies')
			.getByRole('listitem')
			.filter({ has: page.getByRole('heading', { name: movie.title }) })
			.getByRole('button', { name: 'bookmark' })

		await expect(button).toHaveAttribute('aria-pressed', 'true')

		await button.click()

		// Hold dirty unbookmarked show in case of a misclick
		await expect(button).toHaveAttribute('aria-pressed', 'false')
	}
	// Get fresh shows
	await page.reload()

	await expect(page.getByTestId('movies')).toBeEmpty()
	await expect(page.getByTestId('tv-series').getByRole('heading')).toHaveText(
		bookmarkedTvSeries.map((t) => t.title),
	)

	for (const tvSeries of bookmarkedTvSeries) {
		const button = page
			.getByTestId('tv-series')
			.getByRole('listitem')
			.filter({ has: page.getByRole('heading', { name: tvSeries.title }) })
			.getByRole('button', { name: 'bookmark' })

		await expect(button).toHaveAttribute('aria-pressed', 'true')

		await button.click()

		// Hold dirty unbookmarked show in case of a misclick
		await expect(button).toHaveAttribute('aria-pressed', 'false')
	}
	// Get fresh shows
	await page.reload()

	await expect(page.getByTestId('tv-series')).toBeEmpty()

	await page.getByRole('navigation').getByRole('link', { name: 'home' }).click()
	await page
		.getByRole('listitem')
		.filter({ has: page.getByRole('heading', { name: 'beyond earth' }) })
		.getByRole('button', { name: 'bookmark', pressed: false })
		.click()
	await page
		.getByRole('listitem')
		.filter({ has: page.getByRole('heading', { name: 'the great lands' }) })
		.getByRole('button', { name: 'bookmark', pressed: false })
		.click()
	await page
		.getByRole('navigation')
		.getByRole('link', { name: 'movies' })
		.click()
	await page
		.getByRole('listitem')
		.filter({ has: page.getByRole('heading', { name: 'bottom gear' }) })
		.getByRole('button', { name: 'bookmark', pressed: false })
		.click()
	await page
		.getByRole('navigation')
		.getByRole('link', { name: 'tv series' })
		.click()
	await page
		.getByRole('listitem')
		.filter({ has: page.getByRole('heading', { name: 'undiscovered cities' }) })
		.getByRole('button', { name: 'bookmark', pressed: false })
		.click()
	await page
		.getByRole('navigation')
		.getByRole('link', { name: 'bookmarked' })
		.click()

	await expect(page.getByTestId('movies').getByRole('heading')).toHaveText([
		'Beyond Earth',
		'Bottom Gear',
		'The Great Lands',
	])
	await expect(page.getByTestId('tv-series').getByRole('heading')).toHaveText([
		'Undiscovered Cities',
	])
})
