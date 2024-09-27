import { style, type StyleRule } from '@vanilla-extract/css'
import { transitionBase, transitionPropsByGroup } from '#app/utils/style'

// Only import from `*.css.ts` files. Don't include in build output
export function transition(
	...properties: (keyof typeof transitionPropsByGroup)[]
) {
	return style({
		...transitionBase,
		transitionProperty: properties
			.flatMap((g) => transitionPropsByGroup[g])
			.join(', '),
	})
}

export function hocus(rule: StyleRule) {
	return style({
		':hover': rule,
		':focus-visible': rule,
	})
}

type Media = NonNullable<StyleRule['@media']>
type Size = StyleRule['width']

export function clickable(options: {
	size: Size
	'@media'?: Record<keyof Media, { size: Size }>
}) {
	return style({
		position: 'relative',
		isolation: 'isolate',
		'::before': {
			content: "''",
			display: 'block',
			width: options.size,
			height: options.size,
			position: 'absolute',
			zIndex: -1,
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
		},
		'@media': options['@media']
			? Object.fromEntries(
					Object.entries(options['@media']).map(([query, queryOptions]) => [
						query,
						{
							'::before': {
								width: queryOptions.size,
								height: queryOptions.size,
							},
						} satisfies Media[keyof Media],
					]),
				)
			: undefined,
	})
}
