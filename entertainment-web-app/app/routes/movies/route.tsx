import { ShowGrid, ShowItem, ShowItemHeading } from '#app/components/show-grid'
import { shows } from '#app/utils/shows'

export function MoviesRoute() {
	return (
		<>
			{/* todo: Search for movies */}
			<h1 className="text-heading-l text-pure-white">Movies</h1>
			<ShowGrid className="mt-6 desktop:mt-10">
				{shows
					.filter((s) => s.category === 'Movie')
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
								<h2>{show.title}</h2>
							</ShowItemHeading>
						</ShowItem>
					))}
			</ShowGrid>
		</>
	)
}
