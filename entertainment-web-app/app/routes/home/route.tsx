import { Link } from 'react-router-dom'
import { getAsset } from '#app/assets'
import { Icon } from '#app/components/icon'
import * as Landmark from '#app/components/landmark'
import { Img, Picture, Source } from '#app/components/picture'
import { media } from '#app/utils/screens'
import { type Category, shows } from '#app/utils/shows'
import { type IconName } from '@/icon-name'

export function HomeRoute() {
	return (
		<>
			<h1>Entertainment App</h1>
			<Landmark.Root>
				<Landmark.Label>
					<h2>Search shows</h2>
				</Landmark.Label>
				<form>
					<button>
						<Icon name="icon-search" />
						<span>Search</span>
					</button>
					<input
						type="search"
						name="q"
						placeholder="Search for movies or TV series"
					/>
				</form>
			</Landmark.Root>
			<Landmark.Root>
				<Landmark.Label>
					<h2>Shows</h2>
				</Landmark.Label>
				<h3>Trending</h3>
				<ul role="list">
					{shows
						.filter((s) => s.isTrending)
						.map((show) => (
							<li key={show.title}>
								<h4>{show.title}</h4>
								<Link to="#">
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
											alt={`Play "${show.title}"`}
											images={[
												{
													metadata: getAsset(show.thumbnail.trending.small),
													density: '1x',
												},
											]}
											priority
										/>
									</Picture>
									<div aria-hidden="true">
										<Icon name="icon-play" />
										Play
									</div>
								</Link>
								<ul role="list">
									<li>{show.year}</li>
									<li>
										<Icon name={getCategoryIconName(show.category)} />{' '}
										{show.category}
									</li>
									<li>{show.rating}</li>
								</ul>
								<form>
									<button>
										{show.isBookmarked ? (
											<>
												<Icon name="icon-bookmark-full" />
												<span>Remove "{show.title}" from bookmarks</span>
											</>
										) : (
											<>
												<Icon name="icon-bookmark-empty" />
												<span>Add "{show.title}" to bookmarks</span>
											</>
										)}
									</button>
								</form>
							</li>
						))}
				</ul>
				<h3>Recommended for you</h3>
				<ul role="list">
					{shows
						.filter((s) => !s.isTrending)
						.map((show, i) => (
							<li key={show.title}>
								<h4>{show.title}</h4>
								<Link to="#">
									<Picture>
										<Source
											media={media.desktop}
											images={[
												{
													metadata: getAsset(show.thumbnail.regular.large),
													density: '1x',
												},
											]}
										/>
										<Source
											media={media.tablet}
											images={[
												{
													metadata: getAsset(show.thumbnail.regular.medium),
													density: '1x',
												},
											]}
										/>
										<Img
											alt={`Play ${show.title}`}
											images={[
												{
													metadata: getAsset(show.thumbnail.regular.small),
													density: '1x',
												},
											]}
											priority={i <= 8}
										/>
									</Picture>
									<div aria-hidden="true">
										<Icon name="icon-play" />
										Play
									</div>
								</Link>
								<form>
									<button>
										{show.isBookmarked ? (
											<>
												<Icon name="icon-bookmark-full" />
												<span>Remove "{show.title}" from bookmarks</span>
											</>
										) : (
											<>
												<Icon name="icon-bookmark-empty" />
												<span>Add "{show.title}" to bookmarks</span>
											</>
										)}
									</button>
								</form>
								<ul role="list">
									<li>{show.year}</li>
									<li>
										<Icon name={getCategoryIconName(show.category)} />{' '}
										{show.category}
									</li>
									<li>{show.rating}</li>
								</ul>
							</li>
						))}
				</ul>
			</Landmark.Root>
		</>
	)
}

function getCategoryIconName(category: Category): IconName {
	if (category === 'Movie') {
		return 'icon-category-movie'
	} else if (category === 'TV Series') {
		return 'icon-category-tv'
	}
	throw new Error(`Invalid category "${category}"`)
}
