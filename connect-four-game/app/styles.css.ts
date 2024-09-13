import { globalStyle, style, type StyleRule } from '@vanilla-extract/css'
import { media } from '#app/utils/screens'
import { dataRoute, rem } from '#app/utils/style'

export const colors = {
	black: 'hsl(0 0% 0%)',
	'dark-purple': 'hsl(257 67% 51%)',
	purple: 'hsl(257 100% 64%)',
	red: 'hsl(347 97% 70%)',
	yellow: 'hsl(41 100% 70%)',
	white: 'hsl(0 0% 100%)',
}

const body = {
	fontSize: rem(16),
	fontWeight: 500,
	lineHeight: rem(21),
} satisfies StyleRule

// https://tailwindcss.com/docs/transition-property
const transitionBase = {
	transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
	transitionDuration: '150ms',
} satisfies StyleRule

export const transitionShadow = {
	...transitionBase,
	transitionProperty: 'box-shadow',
} satisfies StyleRule

export const transitionColor = {
	...transitionBase,
	transitionProperty:
		'color, background-color, border-color, text-decoration-color, fill, stroke',
} satisfies StyleRule

globalStyle('body', {
	...body,
	...transitionColor,
	fontFamily: "'Space Grotesk Variable', sans-serif",
	background: colors.purple,
})
globalStyle(`body[${dataRoute('main-menu')}]`, {
	'@media': {
		[media.tablet]: {
			background: colors['dark-purple'],
		},
	},
})

export const headingL = style({
	fontSize: rem(56),
	fontWeight: 700,
	lineHeight: rem(71),
})

export const headingM = {
	fontSize: rem(24),
	fontWeight: 700,
	lineHeight: rem(31),
} satisfies StyleRule

export const headingS = style({
	fontSize: rem(20),
	fontWeight: 700,
	lineHeight: rem(26),
})

export const headingXs = style({
	fontSize: rem(16),
	fontWeight: 700,
	lineHeight: rem(21),
})
