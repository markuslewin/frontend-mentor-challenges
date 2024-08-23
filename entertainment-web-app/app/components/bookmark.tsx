import * as Toggle from '@radix-ui/react-toggle'
import { cx } from 'class-variance-authority'
import { type ComponentPropsWithRef } from 'react'
import { Icon } from '#app/components/icon'

interface BookmarkProps extends ComponentPropsWithRef<'button'> {
	title: string
	isBookmarked: boolean
	onIsBookmarkedChange(isBookmarked: boolean): void
}

export function Bookmark({
	className,
	title,
	isBookmarked,
	onIsBookmarkedChange,
	...props
}: BookmarkProps) {
	return (
		<Toggle.Root
			className={cx(
				'inline-grid size-8 place-items-center rounded-full bg-dark-blue/50 text-pure-white transition-colors hocus:bg-pure-white hocus:text-dark-blue',
				className,
			)}
			pressed={isBookmarked}
			onPressedChange={onIsBookmarkedChange}
			{...props}
		>
			{isBookmarked ? (
				<Icon className="h-[0.875rem] w-3" name="icon-bookmark-full" />
			) : (
				<Icon className="h-[0.875rem] w-3" name="icon-bookmark-empty" />
			)}
			<span className="sr-only">Bookmark "{title}"</span>
		</Toggle.Root>
	)
}
