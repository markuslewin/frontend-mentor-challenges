import { Slot } from '@radix-ui/react-slot'
import { cx } from 'class-variance-authority'
import { type ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'
import { getAsset } from '#app/assets'
import { Bookmark } from '#app/components/bookmark'
import { Meta } from '#app/components/meta'
import { Img, Picture, Source } from '#app/components/picture'
import { Play } from '#app/components/play'
import { media } from '#app/utils/screens'
import { type Show } from '#app/utils/shows'

interface ShowGridProps extends ComponentPropsWithoutRef<'ul'> {}

export function ShowGrid({ className, ...props }: ShowGridProps) {
	return (
		<ul
			className={cx(
				'gap-4 the-grid-[10.25rem] tablet:gap-x-8 tablet:gap-y-6 tablet:the-grid-[13.75rem] desktop:gap-x-10 desktop:gap-y-8 desktop:the-grid-[17.5rem]',
				className,
			)}
			role="list"
			{...props}
		>
			{}
		</ul>
	)
}

interface ShowItemProps extends ComponentPropsWithoutRef<'li'> {
	show: Show
	// Prioritize image
	// todo: Create `ShowItemImage`
	priority?: boolean
	onIsBookmarkedChange(value: boolean): void
}

export function ShowItem({
	className,
	children,
	show,
	priority,
	onIsBookmarkedChange,
	...props
}: ShowItemProps) {
	return (
		<li className={cx('relative isolate grid', className)} {...props}>
			{children}
			<Link className="group relative isolate" to="#">
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
						priority={priority}
					/>
				</Picture>
				<div
					className="grid place-items-center rounded-sm bg-[hsl(0_0%_0%/50%)] opacity-0 transition-opacity layer-10 group-hocus:opacity-100"
					// Decorative layer, `group` has a11y name
					aria-hidden="true"
				>
					<Play />
				</div>
			</Link>
			<p className="absolute right-2 top-2 tablet:right-4 tablet:top-4">
				<Bookmark
					title={show.title}
					isBookmarked={show.isBookmarked}
					onIsBookmarkedChange={onIsBookmarkedChange}
				/>
			</p>
			<Meta
				className="mt-2 text-body-s"
				year={show.year}
				category={show.category}
				rating={show.rating}
			/>
		</li>
	)
}

interface ShowItemHeadingProps extends ComponentPropsWithoutRef<'h1'> {
	asChild?: boolean
}

export function ShowItemHeading({ asChild, ...props }: ShowItemHeadingProps) {
	const Comp = asChild ? Slot : 'h1'
	return (
		<Comp className="order-1 mt-1 text-heading-xs text-pure-white" {...props} />
	)
}
