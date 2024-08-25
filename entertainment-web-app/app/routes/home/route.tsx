import { Link } from 'react-router-dom'
import { getAsset } from '#app/assets'
import { Bookmark } from '#app/components/bookmark'
import * as Landmark from '#app/components/landmark'
import { Meta } from '#app/components/meta'
import { Img, Picture, Source } from '#app/components/picture'
import { Play } from '#app/components/play'
import { Search } from '#app/components/search'
import { ShowGrid, ShowItem, ShowItemHeading } from '#app/components/show-grid'
import { queryName, queryShows, useQuery } from '#app/utils/query'
import { media } from '#app/utils/screens'
import { useShows } from '#app/utils/shows'

export function HomeRoute() {
	const { shows, setIsBookmarked } = useShows()
	const query = useQuery()

	const state = query
		? ({ type: 'search', query, shows: queryShows(shows, query) } as const)
		: ({ type: 'overview', shows: shows } as const)

	return (
		<>
			<h1 className="sr-only">Entertainment App</h1>
			<Landmark.Root className="mt-6 tablet:mt-8">
				<Landmark.Label>
					<h2 className="sr-only">Search shows</h2>
				</Landmark.Label>
				<Search
					name={queryName}
					defaultValue={query ?? undefined}
					placeholder="Search for movies or TV series"
				/>
			</Landmark.Root>
			<Landmark.Root className="mt-4 tablet:mt-5">
				<div aria-live="polite" aria-atomic="true">
					<Landmark.Label>
						{state.type === 'overview' ? (
							<h2 className="sr-only">Shows</h2>
						) : (
							<h2 className="text-heading-l text-pure-white">
								Found {state.shows.length} results for ‘{state.query}’
							</h2>
						)}
					</Landmark.Label>
				</div>
				{state.type === 'overview' ? (
					<>
						<h3 className="text-heading-l text-pure-white">Trending</h3>
						<ul
							className="scrollbar-none -mx-4 flex overflow-x-auto py-4 after:shrink-0 after:basis-4 tablet:-mx-6 tablet:py-6 tablet:after:basis-6 desktop:-mr-8 desktop:ml-0 desktop:after:basis-8"
							role="list"
							data-testid="trending"
						>
							{state.shows
								.filter((s) => s.isTrending)
								.map((show) => (
									<li
										className="relative isolate ml-4 flex h-[8.75rem] w-60 shrink-0 flex-col p-4 first:ml-4 tablet:ml-10 tablet:h-[14.375rem] tablet:w-[29.375rem] tablet:p-6 tablet:first:ml-6 desktop:first:ml-0"
										key={show.title}
									>
										<Picture>
											<Source
												media={media.tablet}
												images={[
													{
														metadata: getAsset(show.thumbnail.trending.large),
														density: '1x',
													},
												]}
											/>
											<Img
												className="rounded-sm object-cover layer-[-10]"
												alt=""
												images={[
													{
														metadata: getAsset(show.thumbnail.trending.small),
														density: '1x',
													},
												]}
												priority
											/>
										</Picture>
										<div className="rounded-sm bg-gradient-to-t from-[hsl(0_0%_0%/75%)] to-transparent to-[6.25rem] layer-[-10]" />
										<h4 className="order-3 mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-heading-s text-pure-white">
											{show.title}
										</h4>
										<Link className="peer rounded-sm layer-[10]" to="#">
											<span className="sr-only">Play "{show.title}"</span>
										</Link>
										<div
											className="hidden place-items-center rounded-sm bg-[hsl(0_0%_0%/50%)] opacity-0 transition-opacity layer-[-10] peer-hocus:opacity-100 tablet:grid"
											// Decorative layer, `peer` has a11y name
											aria-hidden="true"
										>
											<Play />
										</div>
										<Meta
											className="order-2 mt-auto"
											year={show.year}
											category={show.category}
											rating={show.rating}
										/>
										<p className="z-10 order-1 self-end">
											<Bookmark
												title={show.title}
												isBookmarked={show.isBookmarked}
												onIsBookmarkedChange={(value) => {
													setIsBookmarked(show.title, value)
												}}
											/>
										</p>
									</li>
								))}
						</ul>
						<h3 className="mt-2 text-heading-l text-pure-white tablet:mt-4">
							Recommended for you
						</h3>
						<ShowGrid className="mt-6 desktop:mt-8" data-testid="shows">
							{state.shows
								.filter((s) => !s.isTrending)
								.map((show, i) => (
									<ShowItem
										key={show.title}
										show={show}
										priority={i < 8}
										onIsBookmarkedChange={(value) => {
											setIsBookmarked(show.title, value)
										}}
									>
										<ShowItemHeading asChild>
											<h4>{show.title}</h4>
										</ShowItemHeading>
									</ShowItem>
								))}
						</ShowGrid>
					</>
				) : (
					<ShowGrid className="mt-6 desktop:mt-8" data-testid="result">
						{state.shows.map((show, i) => (
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
				)}
			</Landmark.Root>
		</>
	)
}
