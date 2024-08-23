import * as Landmark from '#app/components/landmark'
import { Search } from '#app/components/search'
import { ShowGrid, ShowItem, ShowItemHeading } from '#app/components/show-grid'
import { useShows } from '#app/utils/shows'

export function MoviesRoute() {
	const { shows, setIsBookmarked } = useShows()

	return (
		<>
			<h1 className="sr-only">Entertainment App movies</h1>
			<Landmark.Root className="mt-6 tablet:mt-8">
				<Landmark.Label>
					<h2 className="sr-only">Search movies</h2>
				</Landmark.Label>
				<Search placeholder="Search for movies" />
			</Landmark.Root>
			<Landmark.Root className="mt-4 tablet:mt-5">
				<Landmark.Label>
					<h2 className="text-heading-l text-pure-white">Movies</h2>
				</Landmark.Label>
				<ShowGrid className="mt-6 desktop:mt-10">
					{shows
						.filter((s) => s.category === 'Movie')
						.map((show, i) => (
							<ShowItem
								key={show.title}
								show={show}
								priority={i < 16}
								onIsBookmarkedChange={(value) => {
									setIsBookmarked(show.title, value)
								}}
							>
								<ShowItemHeading asChild>
									<h3>{show.title}</h3>
								</ShowItemHeading>
							</ShowItem>
						))}
				</ShowGrid>
			</Landmark.Root>
		</>
	)
}
