import { cx } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import { Icon } from '#app/components/icon'
import { center } from '#app/utils/styles'

interface HeaderProps {
	heading: string
}

export function Header({ heading }: HeaderProps) {
	return (
		<header className={cx(center, '')}>
			<div className="grid grid-cols-[1fr_auto] items-center tablet:grid-cols-[1fr_auto_1fr]">
				<div>
					<Link
						className="group relative inline-grid size-10 place-items-center rounded-full bg-gradient-to-b from-pink from-15% to-light-blue pb-1 shadow-[inset_0_-0.3125rem_0_-0.0625rem_hsl(274_91%_57%/25%)] tablet:size-16 tablet:pb-[0.8125rem] tablet:shadow-[inset_0_-0.375rem_0_0.4375rem_hsl(274_91%_57%/25%)] desktop:size-[5.875rem]"
						to="/"
					>
						<span className="rounded-inherit bg-white/25 opacity-0 transition-opacity layer-0 group-hocus:opacity-100" />
						<Icon
							className="h-auto w-[43.61702127659574%]"
							name="icon-back"
							width="41"
							height="39"
						/>
						<span className="sr-only">Back</span>
					</Link>
				</div>
				<h1 className="text-48 tablet:text-104 tablet:-tracking-5 desktop:text-136">
					{heading}
				</h1>
			</div>
		</header>
	)
}
