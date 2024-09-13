import { style } from '@vanilla-extract/css'
import { media } from '#app/utils/screens'
import {
	baseColors,
	colors,
	headingL,
	headingS,
	headingXs,
	hocus,
	rem,
	transition,
} from '#app/utils/style'

export const mainContainer = style({
	minHeight: '100vh',
	padding: rem(17),
	display: 'grid',
	gridTemplateColumns: `minmax(auto, ${rem(486)})`,
	placeContent: 'center',
})

export const card = style({
	marginBlockEnd: `-${rem(38)}`,
	border: `${rem(3)} solid ${colors.black}`,
	borderRadius: rem(40),
	paddingBlockStart: rem(30),
	paddingInline: rem(20),
	paddingBlockEnd: rem(61),
	background: colors.white,
	color: `hsl(${baseColors.black} / 66.11%)`,
	boxShadow: `0 ${rem(10)} ${colors.black}`,
	'@media': {
		[media.tablet]: {
			paddingBlockStart: rem(30),
			paddingInline: rem(34),
			paddingBlockEnd: rem(54),
		},
	},
})

export const h1 = style({
	...headingL,
	textAlign: 'center',
	textTransform: 'uppercase',
	color: colors.black,
})

export const h1Body = style({
	marginBlockStart: rem(29),
})

export const h2Section = style({
	marginBlockStart: rem(33),
	'@media': {
		[media.tablet]: {
			marginBlockStart: rem(29),
		},
	},
})

export const h2 = style({
	...headingS,
	textTransform: 'uppercase',
	color: colors.purple,
})

export const h2Body = style({
	marginBlockStart: rem(16),
})

export const howToPlay = style([h2Section, h2])

export const instructions = style([
	h2Body,
	{
		display: 'grid',
		gap: rem(10),
	},
])

export const instruction = style({
	display: 'grid',
	gridTemplateColumns: `${rem(27)} 1fr`,
})

export const instructionNumber = style({
	...headingXs,
	color: colors.black,
})

export const mainMenuLinkContainer = style({
	display: 'flex',
	justifyContent: 'center',
})

export const mainMenuLink = style({
	borderRadius: 9999,
	color: colors.black,
	...transition('color'),
	...hocus({
		color: colors['dark-purple'],
	}),
})

export const check = style({
	width: rem(70),
	height: rem(75),
})

export const srOnly = style({
	position: 'absolute',
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: 'hidden',
	clip: 'rect(0, 0, 0, 0)',
	whiteSpace: 'nowrap',
	borderWidth: 0,
})
