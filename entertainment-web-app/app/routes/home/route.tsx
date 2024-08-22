import { cx } from 'class-variance-authority'
import { type ComponentPropsWithoutRef } from 'react'
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
			<h1 className="sr-only">Entertainment App</h1>
			<Landmark.Root className="mt-6 tablet:mt-8">
				<Landmark.Label>
					<h2 className="sr-only">Search shows</h2>
				</Landmark.Label>
				<form className="grid grid-cols-[auto_1fr] items-start gap-4 tablet:gap-6">
					<button className="text-pure-white">
						<Icon className="size-6 tablet:size-8" name="icon-search" />
						<span className="sr-only">Search</span>
					</button>
					<input
						className="w-full border-b border-transparent bg-transparent pb-[0.625rem] text-heading-m text-pure-white transition-colors placeholder:text-pure-white/50 hocus:border-greyish-blue tablet:pb-[0.875rem]"
						type="search"
						name="q"
						placeholder="Search for movies or TV series"
					/>
				</form>
			</Landmark.Root>
			<Landmark.Root className="mt-4 tablet:mt-5">
				<Landmark.Label>
					<h2 className="sr-only">Shows</h2>
				</Landmark.Label>
				<h3 className="text-heading-l text-pure-white">Trending</h3>
				<ul
					className="mt-4 flex gap-4 overflow-x-auto tablet:mt-6 tablet:gap-10"
					role="list"
				>
					{shows
						.filter((s) => s.isTrending)
						.map((show) => (
							<li
								className="relative isolate flex h-[8.75rem] w-60 shrink-0 flex-col p-4 tablet:h-[14.375rem] tablet:w-[29.375rem] tablet:p-6"
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
									className="grid place-items-center rounded-sm bg-[hsl(0_0%_0%/50%)] opacity-0 transition-opacity layer-[-10] peer-hocus:opacity-100"
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
								<form className="z-10 order-1 self-end">
									<Bookmark
										title={show.title}
										isBookmarked={show.isBookmarked}
									/>
								</form>
							</li>
						))}
				</ul>
				<h3 className="mt-6 text-heading-l text-pure-white tablet:mt-10">
					Recommended for you
				</h3>
				<ul
					className="mt-6 gap-4 the-grid-[10.25rem] tablet:gap-x-8 tablet:gap-y-6 tablet:the-grid-[13.75rem] desktop:mt-8 desktop:gap-x-8 desktop:gap-y-10 desktop:the-grid-[17.5rem]"
					role="list"
				>
					{shows
						.filter((s) => !s.isTrending)
						.map((show, i) => (
							<li key={show.title}>
								<h4 className="text-heading-xs text-pure-white">
									{show.title}
								</h4>
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
											className="w-full rounded-sm"
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
									<Play />
								</Link>
								<form>
									<Bookmark
										title={show.title}
										isBookmarked={show.isBookmarked}
									/>
								</form>
								<Meta
									year={show.year}
									category={show.category}
									rating={show.rating}
								/>
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

interface BookmarkProps {
	title: string
	isBookmarked: boolean
}

function Bookmark({ title, isBookmarked }: BookmarkProps) {
	return (
		<button className="inline-grid size-8 place-items-center rounded-full bg-dark-blue/50 text-pure-white transition-colors hocus:bg-pure-white hocus:text-dark-blue">
			{isBookmarked ? (
				<>
					<Icon className="h-[0.875rem] w-3" name="icon-bookmark-full" />
					<span className="sr-only">Remove "{title}" from bookmarks</span>
				</>
			) : (
				<>
					<Icon className="h-[0.875rem] w-3" name="icon-bookmark-empty" />
					<span className="sr-only">Add "{title}" to bookmarks</span>
				</>
			)}
		</button>
	)
}

interface PlayProps extends ComponentPropsWithoutRef<'div'> {}

function Play({ className, ...props }: PlayProps) {
	return (
		<div
			className={cx(
				'inline-grid grid-cols-[auto_1fr] items-center gap-[1.1875rem] rounded-full bg-pure-white/25 py-[0.5625rem] pl-[0.5625rem] pr-6 text-heading-xs text-pure-white',
				className,
			)}
			{...props}
		>
			<Icon className="size-[1.875rem]" name="icon-play" />
			Play
		</div>
	)
}

interface MetaProps extends ComponentPropsWithoutRef<'ul'> {
	year: number
	category: Category
	rating: string
}

function Meta({ year, category, rating, className, ...props }: MetaProps) {
	return (
		<ul
			className={cx('flex flex-wrap items-center gap-2', className)}
			role="list"
			{...props}
		>
			<li>{year}</li>
			<li className="flex flex-wrap items-center gap-2">
				<Dot />
				<span className="flex items-center gap-[0.375rem]">
					<Icon className="size-3" name={getCategoryIconName(category)} />{' '}
					{category}
				</span>
			</li>
			<li className="flex flex-wrap items-center gap-2">
				<Dot />
				{rating}
			</li>
		</ul>
	)
}

function Dot() {
	return (
		<span className="block size-[0.1875rem] rounded-full border-t-[0.1875rem]" />
	)
}
