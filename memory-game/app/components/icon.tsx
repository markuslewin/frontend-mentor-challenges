import { forwardRef, type SVGProps } from 'react'
import spriteHref from '#app/components/icons/sprite.svg'
import { type IconName } from '@/icon-name'

interface IconProps extends SVGProps<SVGSVGElement> {
	name: IconName
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
	({ name, ...props }, ref) => {
		return (
			<svg ref={ref} focusable="false" aria-hidden="true" {...props}>
				<use href={`${spriteHref}#${name}`} />
			</svg>
		)
	},
)
