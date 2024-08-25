import { cx } from 'class-variance-authority'
import * as Landmark from '#app/components/landmark'
import { Search } from '#app/components/search'
import { ShowGrid, ShowItem, ShowItemHeading } from '#app/components/show-grid'
import { queryName, queryShows, useQuery } from '#app/utils/query'
import { useShows } from '#app/utils/shows'

export function TvSeriesRoute() {
	const { shows, setIsBookmarked } = useShows()
	const tvSeries = shows.filter((s) => s.category === 'TV Series')
	const query = useQuery()

	const state = query
		? ({
				type: 'search',
				query,
				tvSeries: queryShows(tvSeries, query),
			} as const)
		: ({ type: 'overview', tvSeries } as const)

	return (
		<>
			<h1 className="sr-only">Entertainment App TV series</h1>
			<Landmark.Root className="mt-6 tablet:mt-8">
				<Landmark.Label>
					<h2 className="sr-only">Search TV series</h2>
				</Landmark.Label>
				<Search
					name={queryName}
					defaultValue={query ?? undefined}
					placeholder="Search for TV series"
				/>
			</Landmark.Root>
			<Landmark.Root className="mt-4 tablet:mt-5">
				<div aria-live="polite" aria-atomic="true">
					<Landmark.Label>
						<h2 className="text-heading-l text-pure-white">
							{state.type === 'overview' ? (
								<>TV Series</>
							) : (
								<>
									Found {state.tvSeries.length} results for ‘{state.query}’
								</>
							)}
						</h2>
					</Landmark.Label>
				</div>
				<ShowGrid
					className={cx(
						'mt-6',
						state.type === 'overview' ? 'desktop:mt-10' : 'desktop:mt-8',
					)}
				>
					{state.tvSeries.map((tvSeries, i) => (
						<ShowItem
							key={tvSeries.title}
							show={tvSeries}
							priority={i < 16}
							onIsBookmarkedChange={(value) => {
								setIsBookmarked(tvSeries.title, value)
							}}
						>
							<ShowItemHeading asChild>
								<h3>{tvSeries.title}</h3>
							</ShowItemHeading>
						</ShowItem>
					))}
				</ShowGrid>
			</Landmark.Root>
		</>
	)
}
