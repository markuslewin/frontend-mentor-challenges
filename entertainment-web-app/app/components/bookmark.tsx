import { Icon } from '#app/components/icon'

interface BookmarkProps {
	title: string
	isBookmarked: boolean
}

export function Bookmark({ title, isBookmarked }: BookmarkProps) {
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
