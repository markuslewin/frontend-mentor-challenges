import { cx } from 'class-variance-authority'
import { type ComponentPropsWithoutRef } from 'react'
import { Icon } from '#app/components/icon'

interface PlayProps extends ComponentPropsWithoutRef<'div'> {}

export function Play({ className, ...props }: PlayProps) {
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
