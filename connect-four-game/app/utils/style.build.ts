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
