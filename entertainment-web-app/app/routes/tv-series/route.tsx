import * as Landmark from '#app/components/landmark'
import { Search } from '#app/components/search'
import { ShowGrid, ShowItem, ShowItemHeading } from '#app/components/show-grid'
import { useShows } from '#app/utils/shows'

export function TvSeriesRoute() {
	const { shows, setIsBookmarked } = useShows()

	return (
		<>
			<h1 className="sr-only">Entertainment App TV series</h1>
			<Landmark.Root className="mt-6 tablet:mt-8">
				<Landmark.Label>
					<h2 className="sr-only">Search TV series</h2>
				</Landmark.Label>
				<Search placeholder="Search for TV series" />
			</Landmark.Root>
			<Landmark.Root className="mt-4 tablet:mt-5">
				<Landmark.Label>
					<h2 className="text-heading-l text-pure-white">TV Series</h2>
				</Landmark.Label>
				<ShowGrid className="mt-6 desktop:mt-10">
					{shows
						.filter((s) => s.category === 'TV Series')
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
