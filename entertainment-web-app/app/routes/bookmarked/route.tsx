import * as Landmark from '#app/components/landmark'
import { ShowGrid, ShowItem, ShowItemHeading } from '#app/components/show-grid'
import { shows } from '#app/utils/shows'

export function BookmarkedRoute() {
	return (
		<>
			<h1 className="sr-only">Bookmarked shows</h1>
			<Landmark.Root>
				<Landmark.Label>
					<h2 className="sr-only">Search bookmarked shows</h2>
				</Landmark.Label>
				{/* todo: Search for bookmarked shows */}
			</Landmark.Root>
			<Landmark.Root className="mt-4 tablet:mt-5">
				<Landmark.Label>
					<h2 className="sr-only">Shows</h2>
				</Landmark.Label>
				<h3 className="text-heading-l text-pure-white">Bookmarked Movies</h3>
				<ShowGrid className="mt-6 desktop:mt-10">
					{shows
						.filter((s) => s.isBookmarked && s.category === 'Movie')
						.map((show, i) => (
							<ShowItem
								key={show.title}
								show={show}
								priority={i < 16}
								onIsBookmarkedChange={(value) => {
									console.log('todo: Toggle bookmark', { value })
								}}
							>
								<ShowItemHeading asChild>
									<h4>{show.title}</h4>
								</ShowItemHeading>
							</ShowItem>
						))}
				</ShowGrid>
				<h3 className="mt-6 text-heading-l text-pure-white tablet:mt-12 desktop:mt-10">
					Bookmarked TV Series
				</h3>
				<ShowGrid className="mt-6 desktop:mt-10">
					{shows
						.filter((s) => s.isBookmarked && s.category === 'TV Series')
						.map((show) => (
							<ShowItem
								key={show.title}
								show={show}
								onIsBookmarkedChange={(value) => {
									console.log('todo: Toggle bookmark', { value })
								}}
							>
								<ShowItemHeading asChild>
									<h4>{show.title}</h4>
								</ShowItemHeading>
							</ShowItem>
						))}
				</ShowGrid>
			</Landmark.Root>
		</>
	)
}
