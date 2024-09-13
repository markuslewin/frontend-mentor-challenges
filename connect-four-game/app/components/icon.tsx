import { type SVGProps } from 'react'
import spriteHref from '#app/components/icons/sprite.svg'
import { type IconName } from '@/icon-name'

export function Icon({
	name,
	...props
}: SVGProps<SVGSVGElement> & {
	name: IconName
}) {
	return (
		<svg focusable="false" aria-hidden="true" {...props}>
			<use href={`${spriteHref}#${name}`} />
		</svg>
	)
}
