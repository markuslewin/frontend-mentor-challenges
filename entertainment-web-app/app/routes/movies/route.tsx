import { cx } from 'class-variance-authority'
import * as Landmark from '#app/components/landmark'
import { Search } from '#app/components/search'
import { ShowGrid, ShowItem, ShowItemHeading } from '#app/components/show-grid'
import { queryName, queryShows, useQuery } from '#app/utils/query'
import { useShows } from '#app/utils/shows'

export function MoviesRoute() {
	const { shows, setIsBookmarked } = useShows()
	const movies = shows.filter((s) => s.category === 'Movie')
	const query = useQuery()

	const state = query
		? ({ type: 'search', query, movies: queryShows(movies, query) } as const)
		: ({ type: 'overview', movies } as const)

	return (
		<>
			<h1 className="sr-only">Entertainment App movies</h1>
			<Landmark.Root className="mt-6 tablet:mt-8">
				<Landmark.Label>
					<h2 className="sr-only">Search movies</h2>
				</Landmark.Label>
				<Search
					name={queryName}
					defaultValue={query ?? undefined}
					placeholder="Search for movies"
				/>
			</Landmark.Root>
			<Landmark.Root className="mt-4 tablet:mt-5">
				<div aria-live="polite" aria-atomic="true">
					<Landmark.Label>
						<h2 className="text-heading-l text-pure-white">
							{state.type === 'overview' ? (
								<>Movies</>
							) : (
								<>
									Found {state.movies.length} results for ‘{state.query}’
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
					data-testid="shows"
				>
					{state.movies.map((movie, i) => (
						<ShowItem
							key={movie.title}
							show={movie}
							priority={i < 16}
							onIsBookmarkedChange={(value) => {
								setIsBookmarked(movie.title, value)
							}}
						>
							<ShowItemHeading asChild>
								<h3>{movie.title}</h3>
							</ShowItemHeading>
						</ShowItem>
					))}
				</ShowGrid>
			</Landmark.Root>
		</>
	)
}
