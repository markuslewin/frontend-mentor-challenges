import { cx } from 'class-variance-authority'
import { type ComponentPropsWithoutRef } from 'react'
import { Icon } from '#app/components/icon'
import { type Category } from '#app/utils/shows'
import { type IconName } from '@/icon-name'

interface MetaProps extends ComponentPropsWithoutRef<'ul'> {
	year: number
	category: Category
	rating: string
}

export function Meta({
	year,
	category,
	rating,
	className,
	...props
}: MetaProps) {
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

function getCategoryIconName(category: Category): IconName {
	if (category === 'Movie') {
		return 'icon-category-movie'
	} else if (category === 'TV Series') {
		return 'icon-category-tv'
	}
	throw new Error(`Invalid category "${category}"`)
}
