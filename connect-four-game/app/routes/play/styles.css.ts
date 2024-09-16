import { style } from '@vanilla-extract/css'
import { media } from '#app/utils/screens'
import {
	colors,
	transition,
	rem,
	hocus,
	headingXs,
	headingS,
	headingL,
} from '#app/utils/style'

export const logo = style({
	width: rem(46),
	height: rem(49),
	'@media': {
		[media.tablet]: {
			width: rem(58),
			height: rem(61),
		},
	},
})

export const button = style({
	...headingXs,
	...transition('color'),
	...hocus({
		background: colors.red,
	}),
	borderRadius: 9999,
	paddingBlock: rem(9),
	paddingInline: rem(20),
	textTransform: 'uppercase',
	background: colors['dark-purple'],
	color: colors.white,
})

export const scoreCard = style({
	border: `${rem(3)} solid ${colors.black}`,
	borderRadius: rem(20),
	padding: rem(10),
	background: colors.white,
	color: colors.black,
	boxShadow: `0 ${rem(10)} ${colors.black}`,
	'@media': {
		[media.tablet]: {
			paddingBlock: rem(15),
			paddingInline: rem(20),
		},
		[media.desktop]: {
			paddingBlock: rem(17),
			paddingInline: rem(28),
		},
	},
})

export const playerAvatar = style({
	width: rem(54),
	height: rem(59),
})

export const playerName = style({
	...headingXs,
	textTransform: 'uppercase',
	'@media': {
		[media.tablet]: {
			...headingS,
		},
	},
})

export const score = style({
	fontSize: rem(32),
	fontWeight: 700,
	lineHeight: rem(41),
	'@media': {
		[media.tablet]: {
			...headingL,
		},
	},
})

export const board = style({
	position: 'relative',
})

export const boardBack = style({
	width: '100%',
	height: 'auto',
})

export const boardFront = style({
	position: 'absolute',
	inset: '0 0 auto 0',
	width: '100%',
	height: 'auto',
})

export const counter = style({
	width: rem(41),
	height: rem(46),
	'@media': {
		[media.tablet]: {
			width: rem(70),
			height: rem(75),
		},
	},
})

export const marker = style({
	width: rem(38),
	height: rem(36),
})

export const turnBackground = style({
	width: rem(197),
	height: rem(165),
})

export const turn = style({
	...headingXs,
	textTransform: 'uppercase',
	// todo: Red background?
	color: colors.white,
})

export const timer = style({
	...headingL,
	// todo: Red background?
	color: colors.white,
})
